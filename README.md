# Playwright Login Flow Test

## Overview
Automated end‑to‑end test that validates a successful login and dashboard navigation.

## Prerequisites
- Node.js >= 18
- Playwright browsers (`npx playwright install`)

## Setup
```bash
npm ci
npx playwright install
```

## Environment Variables
| Variable | Description |
|----------|-------------|
| `TEST_USER_EMAIL` | Email of a valid test user |
| `TEST_USER_PASSWORD` | Password for the test user |
| `TEST_USER_NAME` | Expected display name after login |
| `CI` | Set to any value in CI to enable retries |

## Running the Tests
```bash
npx playwright test
```

Run on a specific browser:
```bash
npx playwright test --project=Chromium
```

## CI Integration
The configuration is ready for GitHub Actions, GitLab CI, etc. Use the default `playwright.config.ts` which runs tests in parallel across Chromium, Firefox, and WebKit.

## Reporting
HTML report is generated in `playwright-report/`. Open with:
```bash
npx playwright show-report
```
===END===