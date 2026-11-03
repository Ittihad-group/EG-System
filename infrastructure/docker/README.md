# Docker notes

Frontend-only image built from the repository root `Dockerfile`.

```bash
docker compose build
docker compose up -d
```

Build args / env:

| Variable | Purpose |
|----------|---------|
| `VITE_BASE_DOMAIN` | Base domain for subdomain routing |
| `VITE_API_BASE_URL` | External API origin |
| `VITE_APP_ENV` | Environment label |
| `WEB_PORT` | Host port mapped to container `:80` |

HTTPS terminates at the hosting reverse proxy / load balancer in front of this container.
