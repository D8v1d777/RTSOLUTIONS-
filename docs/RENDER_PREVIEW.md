# RTSOLUTIONS Render Environments

## Current live service

- Service: `rtsolutions-site`
- URL: https://rtsolutions-site.onrender.com
- Dashboard: https://dashboard.render.com/web/srv-dbupvfgae00c73f96jtg
- Source repository: https://github.com/D8v1d777/RTSOLUTIONS-
- Source branch: `claude/fable-5-2-build`
- Auto-deploy: enabled on commits to the source branch
- Inspected live commit: `14ca098dbdd429b75098b43e447a4d87678eb0f8`
- Build command: `npm ci --no-audit --no-fund && npm run build`
- Start command: `npm start`
- Region/plan: Singapore / Free

This is the service currently serving the site. A merge into `claude/fable-5-2-build` can trigger an automatic Render deployment.

## Manual preview services

### `rtsolutions-preview-live`

- URL: https://rtsolutions-preview-live.onrender.com
- Dashboard: https://dashboard.render.com/web/srv-dbupu62jnfac73e06g3g
- Source branch: `claude/fable-5-2-build`
- Auto-deploy: disabled
- Inspected live commit: `2a001db51e3c4bafd11335adc23d407da8d7c2ed`
- Build command: `npm ci --no-audit --no-fund && npm run lint && npm run typecheck && npm run build`
- Start command: `npm start`

### `rtsolutions-preview`

- URL: https://rtsolutions-preview.onrender.com
- Dashboard: https://dashboard.render.com/web/srv-dbupnue8bjmc739iqjg0
- Source branch: `claude/fable-5-2-build`
- Auto-deploy: disabled
- Inspected live commit: `2a001db51e3c4bafd11335adc23d407da8d7c2ed`
- Build command: `npm ci && npm run lint && npm run typecheck && npm run build`
- Start command: `npm start`

## Contact configuration

The verified email, address, phone, and social URLs are intentionally blank. Keep `config.isPlaceholder` set to `true` until the owner supplies verified details. In this state the site must not expose placeholder mailto or social links or promise response times/business hours.

The form has no backend endpoint. When a verified recipient is configured, it prepares a mailto draft that the visitor must review and send manually. No message is sent or stored by the site in placeholder mode.

## Release safety

- The independent quality branch is `fix/quality-pass-2026-11-19`; it is not connected to any Render service.
- No Render deploy was triggered by the quality pass.
- No PR was merged.
- Do not merge PR #4 into `claude/fable-5-2-build` until the owner approves it; the live `rtsolutions-site` service auto-deploys commits to that branch.
- The manual preview services remain unchanged.
