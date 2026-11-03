# Deployment

Frontend-only Docker deployment. No database or API containers in this repository.

## Environment variables

| Name | Build-time? | Description |
|------|-------------|-------------|
| `VITE_BASE_DOMAIN` | Yes | Base domain for subdomain detection |
| `VITE_API_BASE_URL` | Yes | External backend origin |
| `VITE_APP_ENV` | Yes | Label (`production`, etc.) |
| `WEB_PORT` | Runtime (compose) | Host port → container `80` |

Vite inlines `VITE_*` at **build** time. Rebuild the image when they change.

Do not put secrets in frontend env vars.

## Commands

```bash
# Local production build
npm run build
npm run preview

# Docker
docker compose build
docker compose up -d

# Custom env
VITE_BASE_DOMAIN=abc.com \
VITE_API_BASE_URL=https://api.abc.com \
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

1. Create records for `app`, `sales`, `production`, `warehouse`, `finance`, `hr` → same frontend target
2. Issue certificates for those names
3. Rebuild with the correct `VITE_BASE_DOMAIN`
4. Verify refresh on nested routes (`/sales`, `/inventory`, …)
