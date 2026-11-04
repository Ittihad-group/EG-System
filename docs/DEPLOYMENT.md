# Deployment

Frontend-only Docker deployment. No database or API containers in this repository.

## Environment variables

| Name | Build-time? | Description |
|------|-------------|-------------|
| `VITE_API_BASE_URL` | Yes | External backend origin |
| `VITE_AUTH_MODE` | Yes | `demo` (seed users) or `api` (backend cookie session) — see [ROUTING_AND_PERMISSIONS.md](ROUTING_AND_PERMISSIONS.md#session--auth) |
| `VITE_APP_ENV` | Yes | Label (`production`, etc.) |
| `WEB_PORT` | Runtime (compose) | Host port → container `80` |

Vite inlines `VITE_*` at **build** time. Rebuild the image when they change.

Do not put secrets in frontend env vars.

> `demo` mode ships demo users and passwords inside the bundle. Use it only for
> prototypes/internal demos; real deployments must use `VITE_AUTH_MODE=api`.

## Commands

```bash
# Local production build
npm run build
npm run preview

# Docker
docker compose build
docker compose up -d

# Custom env
VITE_API_BASE_URL=https://api.abc.com \
VITE_AUTH_MODE=api \
WEB_PORT=8080 \
docker compose up -d --build
```

## Nginx

`infrastructure/nginx/default.conf` provides:

- SPA `try_files` fallback for client-side routes
- `/healthz` probe
- Static asset caching

## HTTPS

Terminate TLS at the reverse proxy / load balancer / CDN in front of the container. The container listens on HTTP `:80` by default.

## DNS checklist (manual)

1. Create `app.<domain>` → this frontend (see [DOMAINS.md](DOMAINS.md) for `www` / `api`)
2. Issue a certificate for `app.<domain>`
3. Build with the correct `VITE_API_BASE_URL`
4. Verify refresh on nested routes (`/sales/orders`, `/inventory/stock`, …)
5. *(Optional)* module shortcut hostnames → 301 redirects at the proxy, see DOMAINS.md
