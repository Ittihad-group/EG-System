# Domains

## Decision

The ERP runs on **one hostname**. Modules are paths (`/sales`, `/finance`, …),
not subdomains. Subdomains are reserved for things with a **different audience,
deployment or security boundary**.

| Host | What | Repo |
|------|------|------|
| `www.<domain>` | Public marketing website (SEO) | `EG-public-Website` |
| `app.<domain>` | The ERP (this repo) — all modules | `EG-System` |
| `api.<domain>` | Backend API (web + `EG-Mobile`) | external |
| `admin.<domain>` | *(optional, later)* back-office with stricter security | — |

### Why not `sales.<domain>`, `finance.<domain>`, …

- Each subdomain is a separate browser origin: `localStorage` and in-memory
  sessions aren't shared, so users would sign in per module and every module
  switch is a full reload.
- Users who work across modules (accountant + purchasing, plant manager, admins)
  are common in an ERP; they need one session and one sidebar.
- The same page would end up reachable at several URLs, which breaks shared
  links and bookmarks.
- Access is a **permission** concern, not a hostname concern. See
  [ROUTING_AND_PERMISSIONS.md](ROUTING_AND_PERMISSIONS.md).

## Optional: friendly module hostnames

If staff want to type `sales.<domain>`, add **redirects at the reverse proxy**
(the app itself never reads the hostname):

```nginx
# Reverse proxy in front of the app (needs DNS + TLS for these names)
server {
    listen 443 ssl;
    server_name ~^(?<mod>sales|inventory|production|purchasing|finance|hr)\.example\.com$;
    return 301 https://app.example.com/$mod;
}
```

## Future-proofing for multi-company

The system is single-plant today. To keep adding companies/plants cheap later:

**Frontend (already in place)**

- All URLs come from `PATHS`; child routes are relative → adding `/:company` is local.
- All API calls go through `@shared/services/apiClient` → one place to send the company.

**Backend (do this from day one — this is the expensive part to retrofit)**

- Put `company_id` (and `plant_id` where relevant) on every business table,
  even while there is only one row.
- Scope every query by it.
- Keep the `/me` permissions shape extendable to per-company permissions.

## Local development

`npm run dev` → `http://localhost:5173`. No hosts-file or subdomain setup needed.
