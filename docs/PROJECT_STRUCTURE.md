# Project structure

```
EG-System/
├── src/
│   ├── app/                 # App shell & composition
│   │   ├── router/          # Routes, subdomain resolution
│   │   ├── providers/       # React context providers
│   │   ├── layouts/         # Authenticated shell layout
│   │   └── config/          # env, domains, navigation
│   ├── features/            # ERP modules (feature-based)
│   ├── shared/              # Cross-cutting UI & utilities
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/        # seed data + API client
│   │   ├── utils/           # i18n, formatters
│   │   └── types/
│   ├── assets/
│   ├── App.jsx              # Providers + router wiring
│   ├── main.jsx             # Vite entry
│   └── index.css
├── public/                  # Static public assets
├── docs/                    # Architecture & ops docs
├── infrastructure/
│   ├── docker/              # Docker notes
│   └── nginx/               # SPA nginx config
├── Dockerfile
├── docker-compose.yml
├── package.json
├── vite.config.js
├── index.html
├── .env.example
└── README.md
```

## Responsibilities

| Path | Responsibility |
|------|----------------|
| `src/app` | Bootstrap, routing, layout, hostname config |
| `src/features/*` | Module-owned pages and domain logic |
| `src/shared` | Reusable primitives shared by features |
| `docs` | Human documentation |
| `infrastructure` | Deploy helpers (nginx, docker notes) |
| Root Docker files | Frontend production packaging |

This repository intentionally has **no** `apps/web`, `apps/api`, or backend service.
