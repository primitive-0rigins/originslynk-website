# originslynk.com

The public marketing site for **OriginsLynk** — dependable workflow systems by
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
| `PUBLIC_FORM_ENDPOINT` | Optional override for the source-controlled production Worker URL. |
| `PUBLIC_CONTACT_EMAIL` | Fallback contact address, shown in the footer. |

Only set these in Cloudflare Pages when intentionally overriding the source defaults.
The post-build step derives the CSP form/fetch origin from the same configured endpoint
and rejects non-HTTPS endpoints, so an override cannot silently drift from `_headers`.

### Contact delivery Worker

The public form posts to the separately deployed `originslynk-contact` Worker. Its
private destination is stored in the `CONTACT_EMAIL` Worker secret and is not committed
to this public repository. Visitors cannot select or change that recipient. The Worker
validates the request origin and required fields, caps the actual request body and field
sizes, uses the form's hidden spam trap, rate-limits every allowed-origin POST before
parsing, sends plain text only, and never logs submitted field values.

```bash
npm run test:contact-worker
npx wrangler secret put CONTACT_EMAIL --config workers/contact/wrangler.jsonc
npx wrangler deploy --config workers/contact/wrangler.jsonc
```

The production Worker URL is the site's source default. `PUBLIC_FORM_ENDPOINT` can
override it for testing or a future endpoint move. The contact page retains its
prepared-email handoff if the Worker returns an error.

## Structure

```
src/
  layouts/Base.astro       shell, metadata, Open Graph, JSON-LD
  components/              navigation, workflow visuals, representative appliance, service card
  data/services.ts         canonical diagnostic and tier names, pricing, scope, and boundaries
  pages/                   marketing, pricing, discovery, trust, privacy, accessibility, and 404 routes
  styles/tokens.css        warm editorial design tokens
  styles/global.css        reset, typography, layout, components
public/                    favicon, og image, robots.txt, _headers
workers/contact/           validated form-to-email Worker and deployment configuration
design/og-source.svg       source for the Open Graph image
```

## Design system

Everything visual comes from `src/styles/tokens.css`. The system uses warm white and
cream grounds, deep teal text and trust sections, and a restrained burnt-orange action
color. Editorial system-serif headings add refinement without a webfont request or layout
shift. If a recurring color or spacing value is needed, add a token instead of scattering
literals across pages.

### Rules worth keeping

- **Orange carries primary actions; teal carries trust and structure.** Orange is kept
  scarce so the request button remains the strongest visual decision on the page.
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

## Public service model

The canonical diagnostic offer, three-tier model, and public-language rules are maintained in
`docs/WEBSITE-SERVICE-MODEL.md`. Update that file and `src/data/services.ts` together
whenever an approved offer changes.

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
