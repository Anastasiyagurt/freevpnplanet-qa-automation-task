# FreeVPNPlanet QA Automation Task

E2E automation for the **Personal VPN (EN)** purchase flow on [personal.freevpnplanet.com](https://personal.freevpnplanet.com/).

## Stack

- Playwright + TypeScript
- Page Object Model (`pages/`) + Playwright fixtures (`fixtures/`)
- Allure reporter
- ESLint + TypeScript strict mode

## Covered scenarios

| Plan | Payment method | Expected checkout |
|------|----------------|-------------------|
| 1 month | Credit Card (Stripe) | `checkout.stripe.com` |
| 1 month | Cryptocurrency | `heleket.com` |
| 1 year | Credit Card (Stripe) | `checkout.stripe.com` |
| 1 year | Cryptocurrency | `heleket.com` |

Tests stop before completing a real payment.

## Prerequisites

- Node.js 20+
- npm 10+
- Java 8+ (required for Allure CLI to generate/open reports)

## Setup

```bash
git clone https://github.com/Anastasiyagurt/freevpnplanet-qa-automation-task.git
cd freevpnplanet-qa-automation-task

cp .env.example .env

npm install
npx playwright install chromium
```

## Run tests

```bash
# headless (default)
npm test

# headed mode (debug)
npm run test:headed

# debug mode
npm run test:debug

# UI mode
npm run test:ui

# generate and open Allure report
npm run test:report

# or step by step
npm run allure:generate
npm run allure:open
```

## Lint & typecheck

```bash
npm run lint
npm run typecheck
```

## Project structure

```
config/         # env, plan/gateway constants
pages/          # Page Objects (PersonalVpnPage, PaymentMethodPage, etc.)
fixtures/       # Playwright test fixture extension (DI only, index.ts)
utils/          # helpers (test email generator)
tests/
  personal-vpn-purchase.spec.ts
```

## Environment variables

| Variable | Default | Description |
|----------|---------|-------------|
| `BASE_URL` | `https://personal.freevpnplanet.com/` | Target site |
| `TEST_EMAIL` | - | Optional fixed email; tests generate unique emails by default |
| `HEADLESS` | `true` | Reserved for local runs |