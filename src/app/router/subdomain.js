import { env } from '@app/config/env'
import {
  MODULES,
  MODULE_HOME_PATH,
  MODULE_ROUTE_KEYS,
  SUBDOMAIN_MODULE_MAP,
} from '@app/config/domains'
import { navItems } from '@app/config/navigation'

/**
 * Resolve the active ERP module from the current hostname.
 * Supports:
 * - sales.example.com
 * - sales.localhost:5173
 * - localhost / 127.0.0.1 → full app module
 */
export function resolveHostnameModule(hostname = window.location.hostname) {
  const host = String(hostname || '').toLowerCase().split(':')[0]
  const base = env.baseDomain.toLowerCase()

  if (!host || host === 'localhost' || host === '127.0.0.1' || host === '::1') {
    return MODULES.APP
  }

  if (host === base || host === `www.${base}`) {
    return MODULES.APP
  }

  let subdomain = null

  if (host.endsWith(`.${base}`)) {
    subdomain = host.slice(0, -(base.length + 1)).split('.')[0]
  } else if (host.endsWith('.localhost')) {
    subdomain = host.replace(/\.localhost$/, '').split('.')[0]
  }

  if (!subdomain || subdomain === 'www') {
    return MODULES.APP
  }

  return SUBDOMAIN_MODULE_MAP[subdomain] || MODULES.APP
}

export function getModuleHomePath(moduleId = resolveHostnameModule()) {
  return MODULE_HOME_PATH[moduleId] || '/'
}

export function getNavForModule(moduleId = resolveHostnameModule()) {
  const allowed = new Set(MODULE_ROUTE_KEYS[moduleId] || MODULE_ROUTE_KEYS[MODULES.APP])
  return navItems.filter((item) => allowed.has(item.key))
}

export function isPathAllowedForModule(pathname, moduleId = resolveHostnameModule()) {
  if (pathname === '/login') return true

  const allowed = MODULE_ROUTE_KEYS[moduleId] || MODULE_ROUTE_KEYS[MODULES.APP]
  const match = navItems.find((item) => {
    if (item.path === '/') return pathname === '/'
    return pathname === item.path || pathname.startsWith(`${item.path}/`)
  })

  if (!match) return moduleId === MODULES.APP
  return allowed.includes(match.key)
}
