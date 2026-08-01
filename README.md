# originslynk.com

The public marketing site for **OriginsLynk** — role-specific automation systems by
Primitive Origins LLC.

Astro 7, static output, no server runtime, and no third-party scripts.

---

## This repository is public and contains no client data

That is a property, not a policy. This tree has never held client material and never
will: operational work lives in a separate private repository. Anything identifying a
client — a name, an employer, a client hostname, a metric from a live deployment —
does not belong in a commit here, including in a commit message.

A scanner in the ops repo checks the built site for client identifiers before deploy.
It is a backstop for mistakes, not permission to be careless.

## Develop

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # -> dist/
npm run preview    # serve the built output
```

Node 22.12+.

## Configuration

Copy `.env.example` to `.env`. Both variables are `PUBLIC_`-prefixed, meaning they are
embedded in the built HTML and visible to anyone. That is fine for what they hold.

**Never add a secret here.** The site is fully static — there is no server, so there
is nowhere for a secret to hide. Anything in this build is public.

| Variable | Purpose |
|---|---|
| `PUBLIC_FORM_ENDPOINT` | Where the workflow-review form posts. If unset, the form prepares an addressed email for the visitor to review and send. |
| `PUBLIC_CONTACT_EMAIL` | Fallback contact address, shown in the footer. |

Set the same variables in the Cloudflare Pages project settings for production.

## Structure

```
src/
  layouts/Base.astro       shell, metadata, Open Graph, JSON-LD
  components/              navigation, workflow visuals, representative appliance, service card
  data/services.ts         shared package names, pricing, scope, and boundaries
  pages/                   index, services, pricing, FAQ, trust, contact, 404
  styles/tokens.css        warm editorial design tokens
  styles/global.css        reset, typography, layout, components
public/                    favicon, og image, robots.txt, _headers
design/og-source.svg       source for the Open Graph image
```

## Design system

Everything visual comes from `src/styles/tokens.css`. The system uses warm white and
cream grounds, graphite text, and a deep muted green accent. Charcoal sections create
pace without turning the site into a dark dashboard. If a recurring color or spacing
value is needed, add a token instead of scattering literals across pages.

### Rules worth keeping

- **Green carries actions and connection lines.** It is restrained elsewhere so the
  workflow visuals remain operational instead of decorative.
- **Hardware stays honest.** `ApplianceVisual.astro` shows a representative form
  factor. The actual low-profile device is selected for each deployment, so the site
  does not promise a model or specification.
- **No webfonts.** System stacks only: no third-party origin, no layout shift.
- **Small first-party JavaScript only for site behavior.** The repository ships a
  lightweight event layer, accessible mobile navigation, FAQ filtering, and form-state
  handling as same-origin external scripts. Events are pushed to `window.dataLayer`
  and dispatched as `originslynk:analytics`; they contain event metadata, never form
  field values or FAQ queries. Cloudflare Pages may inject its own performance beacon
  when Web Analytics is enabled for the project.

## Deployment

Cloudflare Pages, connected to this repository. A push to `main` builds and deploys.

| Setting | Value |
|---|---|
| Build command | `npm run build` |
| Output directory | `dist` |
| Node version | 22.12 or later |

Response headers, including the Content-Security-Policy, are in `public/_headers`.
The `www` → apex redirect is a Cloudflare Redirect Rule, not a file here — see the
ops repo's `docs/CLOUDFLARE_CHECKLIST.md`.

## Accessibility

Held to WCAG 2.1 AA. What that means in practice here:

- Body and muted text both exceed 4.5:1 on their grounds
- Every interactive target is at least 44px tall
- Focus is always visible and never removed
- One `<h1>` per page, headings in order
- A skip link, landmarks, and `aria-current` on the active nav item
- `prefers-reduced-motion` respected

If you change a color, re-check contrast. If you add a control, check it with the
keyboard alone before merging.

---

© Primitive Origins LLC. All rights reserved. Not open source — this is a company
website, published for deployment rather than reuse.
