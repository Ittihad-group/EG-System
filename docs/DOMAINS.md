# Domains & subdomain routing

## Goal

Serve **one** React build on multiple hostnames and scope the shell to the relevant ERP module.

## Example hosts

| Host | Module |
|------|--------|
| `app.abc.com` | Full ERP |
| `sales.abc.com` | Sales-focused |
| `production.abc.com` | Production-focused |
| `warehouse.abc.com` | Inventory / warehouse |
| `finance.abc.com` | Finance-focused |
| `hr.abc.com` | HR-focused |

Replace `abc.com` with your real base domain via `VITE_BASE_DOMAIN`.

## Configuration

- `VITE_BASE_DOMAIN` — base domain without protocol (e.g. `abc.com` or `localhost`)
- Mapping tables: `src/app/config/domains.js`
- Resolver: `src/app/router/subdomain.js`

## Local development

- Default `localhost` → full `app` module
- Optional: `sales.localhost:5173` (browsers that resolve `*.localhost` to loopback)

```bash
cp .env.example .env
# VITE_BASE_DOMAIN=localhost
npm run dev
```

## Auth vs hostname

Hostname routing only filters navigation and default home path.  
Login / roles / permissions remain separate and must still be enforced by the product/API.

## DNS (manual ops)

Point each subdomain A/AAAA (or CNAME) at the same frontend origin. TLS is terminated by the hosting layer.
