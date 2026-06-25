# Feature: Project Content and Cards

## Objective

Featured projects grid with safe external links, image previews, and structured content from `data/projects.ts`.

## Affected Files

| File | Role |
| --- | --- |
| `data/projects.ts` | Project content contract |
| `components/ProjectGrid.tsx` | Grid layout |
| `components/ProjectCard.tsx` | Card rendering, URL safety, previews |
| `next.config.js` | Remote image patterns for mshots |

## Data Contract

```typescript
interface Project {
  title: string;
  url: string;
  description: string;
  outcome: string;
  tags: string[];
  preview?: string;
}
```

- `projects` array must have at least one entry.
- Each project must have non-empty `title`, `description`, `outcome`, and at least one `tag`.
- `url` should be HTTPS for linkable cards.

## Behavior Requirements

### ProjectGrid

- Section `id="projects"` via `FadeInSection`.
- Heading: "Featured Projects" with subtitle.
- Responsive grid: 1 col mobile, 2 col `md`, 3 col `lg`.
- Renders one `ProjectCard` per project in `<ul>` list semantics.

### ProjectCard

- **URL safety:** Only `https:` URLs become clickable links. HTTP or invalid URLs render as non-link `<article>`.
- **Preview resolution:**
  1. Use `preview` if it is a safe root-relative path (starts with `/`, matches `^/[a-zA-Z0-9/_.-]+$`, no `..` or `//`)
  2. Else use `preview` if valid HTTPS URL
  3. Else generate WordPress mshot from safe project URL
  4. Else fallback `/logo_favicon.svg`
- Local previews (e.g. `/logo512.png`) must live under `public/` so Next.js can serve them.
- Remote images use `unoptimized` when `src` starts with `http`.
- Link cards: `target="_blank"`, `rel="noopener noreferrer"`, `aria-label` includes "opens in a new tab".
- Tags rendered as pill list with `aria-label` per project.
- Hover scale on preview respects `motion-safe:` prefix.

## Acceptance Criteria

- [ ] Grid renders all projects from `data/projects.ts`
- [ ] HTTPS project URLs produce anchor cards with correct `href`
- [ ] Non-HTTPS or invalid URLs render without anchor wrapper
- [ ] Preview fallback chain works (explicit preview → mshot → local fallback)
- [ ] Unit tests cover URL safety and preview resolution logic
- [ ] E2E: at least one project link visible and points to HTTPS URL

## Edge Cases

- Missing `preview`: mshot or favicon fallback
- `preview: '/logo512.png'`: local asset from `public/`
- `preview: 'http://...'` or `preview: '//cdn...'`: rejected, fall through to mshot or favicon
- Empty `url`: card not clickable
- `http://` URL: not linked (security)
- Long titles/descriptions: layout wraps without overflow break

## Dependency Map

**Tests:**

- `data/projects.test.ts`
- `components/ProjectCard.test.tsx`
- `e2e/homepage.spec.ts` (projects section)

## Verification

- Unit tests for data contract and card behavior
- E2E assertion on project section and link

## Future Work (Out of Scope)

- Self-hosted screenshots under `public/projects/`
- Remove `s.wordpress.com` from CSP and `next.config.js`
