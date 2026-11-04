/**
 * Normalize whatever an auth source returns into the session user shape the
 * whole app relies on. Missing lists become empty — never "allow everything".
 *
 * Backend contract (`GET /auth/me`, `POST /auth/login`):
 *   { id, email, name: { ar, en } | string, roles: string[], permissions: string[] }
 *
 * @returns {import('@shared/types').AppUser}
 */
export function toSessionUser(dto) {
  return {
    id: String(dto.id),
    email: dto.email ?? '',
    name: dto.name ?? { ar: dto.email ?? '', en: dto.email ?? '' },
    roles: Array.isArray(dto.roles) ? dto.roles : [],
    permissions: Array.isArray(dto.permissions) ? dto.permissions : [],
  }
}
