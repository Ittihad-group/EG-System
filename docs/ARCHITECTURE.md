# Architecture

EG-System is a **frontend-only** React + Vite ERP SPA. The backend is external and reached via `VITE_API_BASE_URL`.

## Layers

```
src/
  app/        → composition root (router, providers, layouts, config)
  features/   → ERP modules (feature-based + Clean Architecture where useful)
  shared/     → reusable UI, hooks, services, utils
```

### Dependency rules

1. `features/*` may import from `shared` and `app/config` / public app hooks.
2. Features must **not** import internal files from other features.
3. `shared` must not import from `features`.
4. Domain code (`features/*/domain`) must not import React or infrastructure.
5. Presentation should not encode business rules that belong in domain/usecases.

### Clean Architecture (per feature)

When complexity justifies it:

```
features/<name>/
  data/          → API adapters, DTOs, repository implementations
  domain/        → entities, repository contracts, usecases
  presentation/  → pages, components, hooks, UI state
```

Simple list screens may keep only `presentation/` and read shared seed/API services until real business logic appears.

### Feature map

| Feature | Owns |
|---------|------|
| `auth` | Login |
| `dashboard` | KPI home |
| `sales` | Sales orders, customers |
| `inventory` | Stock, products (SKU master) |
| `production` | Work orders |
| `purchasing` | POs, suppliers |
| `finance` | Cash / AR / AP summary |
| `hr` | Employees |
| `users` | Settings / admin surface |

`quality` is reserved for a future module — not scaffolded empty.

### Subdomain routing

One build serves all hosts. Hostname → module mapping lives in `src/app/config/domains.js` and is resolved in `src/app/router/subdomain.js`. Authorization (roles) is independent of hostname scoping.
