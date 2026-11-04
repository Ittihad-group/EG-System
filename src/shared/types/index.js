/**
 * Shared domain-ish type docs (JSDoc).
 * Prefer feature-local models when shapes belong to one module.
 *
 * @typedef {'ar' | 'en'} AppLang
 * @typedef {{ ar: string, en: string }} LocalizedString
 *
 * Session user — same shape the backend `/me` endpoint will return.
 * `permissions` are resolved from all of the user's roles.
 * @typedef {{
 *   id: string,
 *   email: string,
 *   name: LocalizedString,
 *   roles: string[],
 *   permissions: string[],
 * }} AppUser
 *
 * One page inside an ERP module (one URL, one permission).
 * @typedef {{
 *   id: string,
 *   path: string,
 *   labelKey: string,
 *   permission: string,
 *   Component: import('react').ComponentType,
 * }} ErpPage
 *
 * An ERP module as declared in `features/<name>/module.js`.
 * @typedef {{
 *   id: string,
 *   labelKey: string,
 *   icon: string,
 *   root: string,
 *   pages: ErpPage[],
 * }} ErpModule
 */

export {}
