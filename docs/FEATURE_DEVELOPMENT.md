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

## Routing

Register lazy routes in `src/app/router/routes.jsx`:

```jsx
const FooPage = lazy(() => import('@features/foo/presentation/pages/FooPage'))
// …
<Route path="foo" element={<FooPage />} />
```

Update:

- `src/app/config/navigation.js` — sidebar item
- `src/app/config/domains.js` — which subdomain modules expose the route
- `src/shared/utils/i18n.js` — labels

## Services & state

- Shared HTTP: `@shared/services/apiClient`
- Prototype data: `@shared/services/seedData`
- App-wide UI state (lang, session): `@app/providers`
- Feature UI state: colocate under `presentation/state` or hooks

## Testing (when added)

- Domain usecases: pure unit tests (no React)
- Presentation: component tests with providers
- Keep API mocks in `data/` tests

## Checklist

- [ ] No imports from another feature’s internals
- [ ] Lazy-loaded if the route is a major module
- [ ] Domain free of React
- [ ] Env-based API URL only
