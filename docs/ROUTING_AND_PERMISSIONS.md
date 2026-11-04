# Routing & permissions

The ERP is **one app on one origin**. Modules are **URL paths**, never subdomains.
What a user can see is decided by **permissions**, never by the URL or hostname.

## URL shape

```
/<module>/<resource>[/<id>|/new]
```

| URL | Page | Permission |
|-----|------|------------|
| `/` | Dashboard | `dashboard.view` |
| `/sales/orders` | Sales orders | `sales.orders.read` |
| `/sales/customers` | Customers & dealers | `sales.customers.read` |
| `/inventory/stock` | Stock levels | `inventory.stock.read` |
| `/inventory/products` | Products (SKU master) | `inventory.products.read` |
| `/production/work-orders` | Work orders | `production.work-orders.read` |
| `/purchasing/orders` | Purchase orders | `purchasing.orders.read` |
| `/purchasing/suppliers` | Suppliers | `purchasing.suppliers.read` |
| `/finance/overview` | Finance overview | `finance.overview.read` |
| `/hr/employees` | Employees | `hr.employees.read` |
| `/settings/general` | General settings | `settings.general.manage` |
| `/login` | Sign in | public |

Rules:

1. **One page = one URL.** A page lives under the module that owns the data. If
   another team needs it, give them the permission — don't copy the page into
   their module.
2. **Module root redirects.** `/sales` sends the user to the first page inside
   Sales they may open. No access at all → 403.
3. **No hardcoded paths.** Every URL comes from `src/app/config/paths.js` (`PATHS`).
4. **URLs don't encode roles or teams.** No `/admin/sales`, no `/accountant/...`.
   Org charts change; URLs must stay stable for bookmarks and shared links.
5. **Never break a URL.** When a path moves, add the old one to `LEGACY_REDIRECTS`
   in `paths.js` (query string and hash are kept). Current legacy redirects:
   `/products`, `/customers`, `/suppliers`, `/purchases` → their new homes.

## Permissions

Format: `<module>.<resource>.<action>` — e.g. `sales.orders.read`,
`sales.orders.approve`, `hr.employees.manage`. Keys live in
`src/app/config/permissions.js` (`PERMISSIONS`).

- **Roles** are named bundles of permissions (`sales_manager`, `accountant`, …).
- A user can hold **several roles**; the session holds the **merged permission list**.
- Grants support wildcards: `*`, `sales.*`, `sales.orders.*`.
- Matching logic: `src/shared/auth/permissions.js` (pure, unit-testable).

### Users with access to several modules

This is the normal case, not an exception. Example demo user
`accounts@egerman-upvc.com` holds `accountant` + `purchasing_officer`:

- one login, one session, one sidebar showing Finance + Purchasing (+ stock)
- moving between modules is in-app navigation (no reload, no re-login)
- opening `/sales/orders` shows 403 at that URL

### Where checks happen

| Layer | Purpose |
|-------|---------|
| Sidebar (`buildNavigation`) | Hide modules/pages the user can't open |
| Route guard (`RequirePermission`) | Show 403 instead of the page |
| In-page (`can(...)`) | Hide widgets/buttons (e.g. dashboard cards, "Approve") |
| Data items | Records that carry a `permission` (e.g. activity feed events) are filtered with `can()` |
| **Backend API** | **The real enforcement.** Every endpoint checks the same keys |

Frontend checks are UX only. Never rely on them for security.

## How it's wired

```
features/<name>/module.js   → declares the module: root, pages, labels, permission, lazy page
app/config/modules.js       → registry (sidebar order)
app/router/routes.jsx       → builds all routes from the registry
app/router/guards.jsx       → RequireAuth, RequirePermission, ModuleIndexRedirect, HomeRoute
app/router/navigation.js    → buildNavigation(can), getHomePath(can)
app/providers/AppProvider   → session user { roles, permissions } + can(permission)
```

- Anonymous users hitting any URL go to `/login` and come **back to the same URL**
  after signing in (deep links in emails/WhatsApp keep working).
- Unknown URLs render a 404 inside the shell.

## Session & auth

All auth goes through `features/auth/data/authService.js`, which picks a source
by `VITE_AUTH_MODE`:

| Mode | Source | Session |
|------|--------|---------|
| `demo` (default) | `demoAuthSource` — seed users/roles | user **id only** in `localStorage`; permissions recomputed on every load, so editing storage can't grant access |
| `api` | `apiAuthSource` — the backend | **httpOnly, Secure cookie** set by the API. No token or user data in JS storage |

Switching to the real backend = build with `VITE_AUTH_MODE=api` and
`VITE_API_BASE_URL`. Nothing in the router, sidebar or pages changes.

### Backend contract (`api` mode)

| Endpoint | Success | Failure |
|----------|---------|---------|
| `GET /auth/me` | `200` user | `401` not signed in |
| `POST /auth/login` `{ email, password }` | `200` user + `Set-Cookie` | `401` bad credentials |
| `POST /auth/logout` | `204` + cookie cleared | — |

User JSON: `{ id, email, name: { ar, en }, roles: string[], permissions: string[] }`
(normalized by `features/auth/domain/sessionUser.js`; missing lists → no access).

Backend requirements:

- Cookie: `HttpOnly; Secure; SameSite=Lax; Path=/` — `api.<domain>` and
  `app.<domain>` are the same site, so it is sent with `credentials: 'include'`.
- CORS: `Access-Control-Allow-Origin: https://app.<domain>` (exact origin, not `*`)
  and `Access-Control-Allow-Credentials: true`.
- CSRF: reject state-changing requests whose `Origin` isn't `https://app.<domain>`.
- Enforce permissions on **every** endpoint, and filter list endpoints (e.g. the
  activity feed) to what the user may see.

### Session lifecycle in the app

- Boot: `loading` → `authService.restore()` (`/auth/me`) → `authenticated` | `anonymous`.
  Guards show a loader while `loading`, so there's no flash of the login page.
- Any `401` from `apiRequest` fires `eg:unauthorized` → session dropped → `/login`
  → after sign-in the user returns to the same page.
- Login errors: wrong credentials vs. server unreachable get different messages.

## Multi-company / multi-plant (planned, not built)

Today the system runs **one plant, one company**. When more are added:

- Company is **context**, not a permission → a company switcher in the topbar.
- URLs gain a prefix: `/:company/sales/orders/123`. Child routes are already
  relative, so this is a change in `routes.jsx` and `paths.js` only.
- The API receives the company via `apiClient` (one place).
- Permissions may become per-company (the `/me` response would carry them per company).
- Subdomain per company only if each company is a fully separate tenant (own data & settings).

What must be true **now** so that later step is cheap — see "Future-proofing" in
[DOMAINS.md](DOMAINS.md#future-proofing-for-multi-company).
