# AstraCore / Amplifyr rebuild

The complete replacement application is in `rebuild/`. The existing root application is preserved while domain migration is prepared.

- Business plan: [rebuild/docs/BUSINESS-OPERATING-PLAN.md](rebuild/docs/BUSINESS-OPERATING-PLAN.md)
- Launch runbook: [rebuild/docs/LAUNCH-RUNBOOK.md](rebuild/docs/LAUNCH-RUNBOOK.md)
- Private review: https://astracore-amplifyr.famouslemon128.chatgpt.site

The new application requires Cloudflare Workers and D1; the existing GitHub Pages static workflow cannot run its server features. Do not switch the live domain until the runbook launch checks are complete.
