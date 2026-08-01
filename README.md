# originslynk.com

The public marketing site for **OriginsLynk** — role-specific automation systems by
Primitive Origins LLC.

Astro 7, static output, no server runtime, no third-party scripts, no analytics.

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
| `PUBLIC_FORM_ENDPOINT` | Where the consultation form posts. If unset, the contact page shows a direct-email fallback instead of a form that goes nowhere. |
| `PUBLIC_CONTACT_EMAIL` | Fallback contact address, shown in the footer. |

Set the same variables in the Cloudflare Pages project settings for production.

## Structure

```
src/
  layouts/Base.astro       shell, metadata, Open Graph, JSON-LD
  components/              Header, Footer, Diagram
  pages/                   index, services, pricing, trust, contact, 404
  styles/tokens.css        design tokens — both directions
  styles/global.css        reset, typography, layout, components
public/                    favicon, og image, robots.txt, _headers
design/og-source.svg       source for the Open Graph image
```

## Design system

Everything visual comes from `src/styles/tokens.css`. Two complete directions are
defined there:

- **Paper** (active) — warm off-white ground, serif headings, orange as the single
  accent, cyan reserved for diagram linework.
- **Field** (alternate) — cooler neutral ground, sans headings, blue in the secondary
  role.

Switch by changing one line in `src/layouts/Base.astro`:

```js
const direction = 'field';   // was 'paper'
```

No other file changes. If a color is needed that is not a token, add a token rather
than a literal — that is what keeps the swap working.

### Rules worth keeping

- **Orange leads.** Cyan and blue are secondary and never share a role on one surface.
- **Dark ink on orange buttons, not white.** White on `#ff7a18` is about 2.3:1 and
  fails contrast. The current pairing passes.
- **No webfonts.** System stacks only: no third-party origin, no layout shift.
- **No client-side JavaScript.** The site ships none today. Adding some is a decision,
  not a detail — it changes the CSP, the performance profile, and the failure modes.

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
