/**
 * Pure permission matching — no React, no app imports.
 *
 * A grant matches a required key when every segment is equal, or when the
 * grant ends in `*` and its earlier segments match:
 *   '*'              → matches anything
 *   'sales.*'        → matches 'sales.orders.read', 'sales.customers.read'
 *   'sales.orders.*' → matches 'sales.orders.read', 'sales.orders.approve'
 */
export function grantMatches(grant, required) {
  if (grant === '*' || grant === required) return true

  const g = grant.split('.')
  const r = required.split('.')

  for (let i = 0; i < g.length; i += 1) {
    if (g[i] === '*') return i === g.length - 1
    if (g[i] !== r[i]) return false
  }
  return g.length === r.length
}

/** True when any granted permission covers `required`. Empty `required` is always allowed. */
export function hasPermission(granted, required) {
  if (!required) return true
  if (!granted?.length) return false
  return granted.some((grant) => grantMatches(grant, required))
}

/** Expand role ids into a de-duplicated permission list using a role → permissions map. */
export function permissionsForRoles(roleIds, roleMap) {
  const set = new Set()
  for (const id of roleIds || []) {
    for (const perm of roleMap[id]?.permissions || []) set.add(perm)
  }
  return [...set]
}
