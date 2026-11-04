# EG-System ERP

Frontend-only React ERP for **المصرية الألمانية لتصنيع منتجات WPC & PVC** — Gamasa, Dakahlia.

One repository · one Vite app · feature-based Clean Architecture · Docker SPA deploy.

## Quick start

```bash
cp .env.example .env
npm install
npm run dev
```

```bash
npm run build
npm run preview
npm run lint
```

## Demo login

Default `VITE_AUTH_MODE=demo` (no backend needed). Real deployments use `api`.

| User | Password | Roles | Sees |
|------|----------|-------|------|
| `admin@egerman-upvc.com` | `admin123` | admin | everything |
| `sales@egerman-upvc.com` | `sales123` | sales_manager | sales + products/stock |
| `accounts@egerman-upvc.com` | `accounts123` | accountant + purchasing_officer | finance + purchasing + stock |

## Architecture

```
src/app        → router, providers, layouts, config
src/features   → auth, dashboard, sales, inventory, …
src/shared     → components, services, utils
```

See:

- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)
- [docs/FEATURE_DEVELOPMENT.md](docs/FEATURE_DEVELOPMENT.md)
- [docs/CODING_STANDARDS.md](docs/CODING_STANDARDS.md)
- [docs/PROJECT_STRUCTURE.md](docs/PROJECT_STRUCTURE.md)
- [docs/ROUTING_AND_PERMISSIONS.md](docs/ROUTING_AND_PERMISSIONS.md)
- [docs/DOMAINS.md](docs/DOMAINS.md)
- [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)

## Modules

| Module | Routes |
|--------|--------|
| Auth | `/login` |
| Dashboard | `/` |
| Sales | `/sales/orders`, `/sales/customers` |
| Inventory | `/inventory/stock`, `/inventory/products` |
| Production | `/production/work-orders` |
| Purchasing | `/purchasing/orders`, `/purchasing/suppliers` |
| Finance | `/finance/overview` |
| HR | `/hr/employees` |
| Settings | `/settings/general` |

## URLs & access

One app on one host (`app.<domain>`); modules are paths, not subdomains.
Every page needs a permission (`sales.orders.read`, …); users can hold several
roles and see all their modules in one sidebar. See
[docs/ROUTING_AND_PERMISSIONS.md](docs/ROUTING_AND_PERMISSIONS.md).

## Docker (frontend only)

```bash
docker compose up -d --build
```

Opens on `http://localhost:8080` by default (`WEB_PORT`).

## Stack

- React 19 + Vite 8
- React Router 7
- Local seed data (prototype) + configurable external API URL
- Bilingual Arabic (RTL) / English
