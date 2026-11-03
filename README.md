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

```
admin@egerman-upvc.com / admin123
sales@egerman-upvc.com / sales123
```

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
- [docs/DOMAINS.md](docs/DOMAINS.md)
- [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)

## Modules

| Module | Routes |
|--------|--------|
| Auth | `/login` |
| Dashboard | `/` |
| Inventory / Products | `/inventory`, `/products` |
| Sales / Customers | `/sales`, `/customers` |
| Production | `/production` |
| Purchasing | `/purchases`, `/suppliers` |
| Finance | `/finance` |
| HR | `/hr` |
| Users / Settings | `/settings` |

## Subdomains

Same build on `app.`, `sales.`, `production.`, `warehouse.`, `finance.`, `hr.` + `VITE_BASE_DOMAIN`.

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
