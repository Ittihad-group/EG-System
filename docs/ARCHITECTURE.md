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

1. `features/*` may import from `shared` and `app/config` / public app hooks (`@app/providers`, `@app/router/navigation`).
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

### Routing & permissions

One build, one origin (`app.<domain>`). Modules are URL paths
(`/sales/orders`, `/finance/overview`, …) and every page requires one permission
key (`<module>.<resource>.<action>`). Users may hold several roles; the sidebar,
routes and widgets all derive from the merged permission list.

- Each feature declares its pages in `features/<name>/module.js`
- `app/config/modules.js` registers them; router + sidebar are generated from it
- The hostname is never read by the app

Full details: [ROUTING_AND_PERMISSIONS.md](ROUTING_AND_PERMISSIONS.md) · domain strategy: [DOMAINS.md](DOMAINS.md)
