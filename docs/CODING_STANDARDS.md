# Coding standards

## Naming

| Kind | Convention | Example |
|------|------------|---------|
| Components / pages | PascalCase | `SalesPage.jsx` |
| Hooks | `use` + camelCase | `useApp.js` |
| Usecases | verb camelCase | `calculateOrderTotal.js` |
| Config modules | camelCase | `domains.js` |
| CSS classes | kebab / BEM-ish existing | `.stat-card` |

## Imports

Prefer path aliases:

```js
import { useApp } from '@app/providers'
import { DataTable } from '@shared/components'
import { calculateOrderTotal } from '@features/sales/domain/usecases/calculateOrderTotal'
```

Order: external → `@app` → `@features` → `@shared` → relative.

Do not deep-import another feature’s `presentation/` from outside that feature.

## TypeScript / JS

The app is currently JavaScript + JSDoc. When migrating to TS:

- Strict mode
- Domain types in `domain/entities`
- DTOs separate from domain entities

## Components

- Pages orchestrate data + layout; extract repeated UI to feature or shared components
- Shared components stay presentational
- Prefer controlled inputs and explicit event handlers

## Error handling

- Surface user-facing errors in the page/form
- `apiClient` throws on non-OK responses — catch at the call site
- Never log secrets or tokens to the console in production paths

## i18n

Use `t('key')` or `t({ ar, en })` via `useApp()`. Add dictionary entries in `@shared/utils/i18n`.
