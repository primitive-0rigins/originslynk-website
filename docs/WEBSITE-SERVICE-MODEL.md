# OriginsLynk website service model

Internal editing reference for the public website. This file is not imported by Astro and
must not be copied into `public/` or a client-facing download.

## Current tier definitions

| Tier | Public name | Price | Responsibility label | Operating boundary |
|---|---|---:|---|---|
| 1 | Personal AI Agent Setup | $750 one-time | You direct it. | The client starts tasks, reviews work, and approves consequential actions. OriginsLynk provides setup, training, and 14 days of setup support. |
| 2 | Role Automation System | $1,200 one-time | You operate it. | The client operates three to four implemented workflows and maintains subscriptions and authorization. OriginsLynk provides the agreed implementation and 30 days of setup support. |
| 3 | Managed Automation Appliance | Starting at $2,800 setup plus $250/month | We maintain it. | OriginsLynk owns and remotely administers one dedicated on-site appliance. The client provides power, internet, physical access, account authorization, and output review. |

Tier 1 includes two reusable client-run skills, task systems, or templates and one compatible
existing AI account. It does not include continuous operation, monitoring, dedicated managed
infrastructure, or an unattended-workflow guarantee.

Tier 2 includes full role and workflow discovery, role-specific configuration, three to four
defined workflows, supported integrations when in scope, documentation, testing, training,
and 30 days of setup support. Ongoing maintenance is separate.

Tier 3 includes the dedicated OriginsLynk-owned appliance, isolated environment, initial
agreed workflow implementation, remote administration, automated monitoring, backup
verification, routine maintenance, failure investigation, a monthly service report,
business-hours support, a 30-day launch stabilization period, and up to 30 minutes of minor
workflow adjustments per month. The appliance is returned when managed service ends.

## Additional work

Display: **Additional templated workflows from $300.**

That price applies only when the work uses the existing environment and supported
integrations, follows an established OriginsLynk pattern, requires no major custom
development, and is expected to take about two to three implementation hours.

New systems, unsupported integrations, complex authentication, browser automation,
scraping, custom software development, major workflow redesign, business-critical
migration, and high-risk or regulated work are quoted separately.

## Monthly-plan boundaries

The $250 monthly plan includes appliance rental, automated monitoring, backup verification,
routine maintenance, failure investigation, a monthly service report, business-hours
support, and up to 30 minutes of minor workflow adjustments.

It excludes new workflows, new integrations, major workflow changes, vendor migrations,
custom development, after-hours emergency response, guaranteed uptime, third-party
subscriptions, and usage-based charges.

## Approved public terminology

- AI agent
- Role-specific AI agent
- Personal AI Agent
- AI-assisted workflow system
- Role Automation System
- Managed Automation Appliance
- Dedicated workflow environment
- Supported business integrations
- Managed workflow infrastructure
- Human-approved automation

Use the progression: **You direct it → You operate it → We maintain it**.

## Prohibited public vendor names

Do not place these names in visible copy, metadata, structured data, image text or alt text,
public source comments, public configuration, or downloadable materials:

- Codex
- Claude
- ChatGPT
- OpenAI
- Anthropic
- n8n
- Docker
- Tailscale
- Any other internal implementation product unless the owner explicitly approves it

Internal engineering documentation may identify tools when necessary, but must never be
imported into the website build or copied into public assets.

## Disclosure and claim rules

Approved general disclosure:

> OriginsLynk configures and manages systems that may use selected third-party software,
> AI services, integrations, and infrastructure. Specific providers may change according
> to compatibility, availability, security, and client requirements.

- Do not claim OriginsLynk created an underlying foundational model or every software component.
- Do not guarantee uptime, flawless output, failure detection, savings, revenue, or business outcomes.
- Keep human approval visible for consequential business actions.
- State that client subscriptions and usage-based charges are separate unless a proposal says otherwise.
- State that providers and required subscriptions are disclosed during proposal and onboarding.
- Obtain appropriate review before adding future contract terms or service-disclaimer pages.

## Page inventory

| Route | Purpose |
|---|---|
| `/` | Homepage, three-tier overview, workflow pattern, process, founder |
| `/services` | Detailed tier scope, progression, examples, integration policy, appliance explanation |
| `/pricing` | Exact prices, operating comparison, monthly scope, add-on boundaries |
| `/contact` | Discovery form and direct-email fallback |
| `/faq` | Buyer questions, ownership, providers, limitations, care and cancellation |
| `/trust` | Approval, access, testing, monitoring, backups, limitations, offboarding |
| `/privacy` | Actual website collection, analytics, processors, retention, privacy requests |
| `/accessibility` | Accessibility features and feedback route |
| `/404` | Not-found response |

## Future-editing checklist

1. Change prices and tier scope in `src/data/services.ts` first.
2. Search all source and generated files for the prior name, price, support limit, and responsibility label.
3. Keep provider names out of the public bundle and metadata.
4. Update the contact Worker and tests whenever form fields change.
5. Run `npm run check`, `npm run test:contact-worker`, and `npm run build`.
6. Link-check `dist/`, audit generated copy, and test desktop and 390px mobile layouts.
7. Keep legal or contract language out of new pages until it has received appropriate review.
