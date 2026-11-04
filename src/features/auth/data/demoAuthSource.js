import { permissionsForRoles } from '@shared/auth/permissions'
import * as seed from '@shared/services/seedData'

const SESSION_KEY = 'eg-erp-user'

/** Shape a seed user exactly like the backend's `/auth/me` response. */
function toDto(user) {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    roles: user.roles,
    permissions: permissionsForRoles(user.roles, seed.roles),
  }
}

function readSessionId() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null')?.id ?? null
  } catch {
    return null
  }
}

/**
 * Demo / prototype auth backed by seed data. Same contract as `apiAuthSource`.
 * Only the user id is kept in localStorage; permissions are always recomputed,
 * so editing storage can't grant access.
 */
export const demoAuthSource = {
  async me() {
    const id = readSessionId()
    const user = id ? seed.users.find((u) => u.id === id) : null
    return user ? toDto(user) : null
  },

  async login(email, password) {
    const user = seed.users.find((u) => u.email === email && u.password === password)
    if (!user) throw Object.assign(new Error('Invalid credentials'), { status: 401 })
    localStorage.setItem(SESSION_KEY, JSON.stringify({ id: user.id }))
    return toDto(user)
  },

  async logout() {
    localStorage.removeItem(SESSION_KEY)
  },
}
