# RTSOLUTIONS Render Preview

- Service: `rtsolutions-preview`
- URL: https://rtsolutions-preview.onrender.com
- Dashboard: https://dashboard.render.com/web/srv-dbupnue8bjmc739iqjg0
- Workspace: My Workspace
- Region: Singapore
- Runtime: Node.js 22.23.4
- Source branch: `claude/fable-5-2-build`
- Auto-deploy: disabled; trigger a deploy only after reviewing the branch.
- Build command: `npm ci && npm run lint && npm run typecheck && npm run build`
- Start command: `npm start`

## Contact configuration

The public contact email and social profile URLs are intentionally blank. Keep `config.isPlaceholder` set to `true` until the owner provides verified details. In this state the website must not expose placeholder mailto or social links and must not promise response times or business hours.

The form does not submit to a backend. When a verified recipient is configured, it creates a mailto draft that the visitor must send manually.

## Release status

This is an isolated staging service, not a production launch. The initial Render build is still in progress and has not yet produced a live preview. Once the initial run settles, deploy the latest branch HEAD manually. The Render build command validates dependency installation, lint, TypeScript and the Next.js production build. Playwright must pass against the same deployed commit before merge; historical test reports are not evidence for later commits.
