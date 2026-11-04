# Feature development

## Create a new feature

1. Add `src/features/<name>/` only when you have real screens or logic.
2. Prefer this layout when the feature grows:

```
src/features/<name>/
  data/
    datasources/
    models/
    repositories/
  domain/
    entities/
    repositories/
    usecases/
  presentation/
    pages/
    components/
    hooks/
    state/
  index.js          # public exports only
```

3. Export pages/hooks from `index.js`. Other features import **only** that public surface (prefer routing through `app/router` instead of cross-feature imports).

## Routing & permissions

You never edit the router or the sidebar by hand. To add a page:

1. **URL** — add it to `src/app/config/paths.js`, shaped `/<module>/<resource>`:

   ```js
   quality: Object.freeze({ root: '/quality', inspections: '/quality/inspections' }),
   ```

2. **Permission** — add the key to `src/app/config/permissions.js`:

   ```js
   QUALITY_INSPECTIONS_READ: 'quality.inspections.read',
   ```

3. **Manifest** — declare the page in `src/features/<name>/module.js`:

   ```js
   import { lazy } from 'react'
   import { PATHS } from '@app/config/paths'
   import { PERMISSIONS } from '@app/config/permissions'

   export const qualityModule = {
     id: 'quality',
     labelKey: 'quality',
     icon: '✓',
     root: PATHS.quality.root,
     pages: [
       {
         id: 'inspections',
         path: PATHS.quality.inspections,
         labelKey: 'inspections',
         permission: PERMISSIONS.QUALITY_INSPECTIONS_READ,
         Component: lazy(() => import('./presentation/pages/InspectionsPage')),
       },
     ],
   }
   ```

4. **New module only** — register it in `src/app/config/modules.js` (array order = sidebar order).
   Import `module.js`, not the feature `index.js`, so the page stays lazy.
5. **Labels** — add `labelKey`s to `src/shared/utils/i18n.js`.
6. **Roles** — grant the permission to the right roles (prototype: `roles` in
   `seedData.js`; production: backend).

Inside pages:

- Links: `<Link to={PATHS.sales.orders}>` — never a string literal.
- Conditional UI: `const { can } = useApp(); can(PERMISSIONS.SALES_ORDERS_APPROVE) && <ApproveButton/>`.
- The backend must enforce the same permission on the matching endpoint.

See [ROUTING_AND_PERMISSIONS.md](ROUTING_AND_PERMISSIONS.md).

## Services & state

- Shared HTTP: `@shared/services/apiClient` (sends the session cookie; a 401 signs the user out)
- Prototype data: `@shared/services/seedData`
- App-wide UI state (lang, session): `@app/providers`
- Feature UI state: colocate under `presentation/state` or hooks

## Testing (when added)

- Domain usecases: pure unit tests (no React)
- Presentation: component tests with providers
- Keep API mocks in `data/` tests

## Checklist

- [ ] URL added to `PATHS` (`/<module>/<resource>`), no hardcoded paths in pages
- [ ] Moved/renamed a URL? Old one added to `LEGACY_REDIRECTS`
- [ ] Every page has a permission; new keys added to `PERMISSIONS` and granted to roles
- [ ] Page declared in the feature's `module.js` (module registered in `app/config/modules.js`)
- [ ] No imports from another feature’s internals
- [ ] Lazy-loaded if the route is a major module
- [ ] Domain free of React
- [ ] Env-based API URL only
