@AGENTS.md

## Package manager

Always use `bun` / `bunx` instead of `npm` / `npx`. The project uses a `bun.lock` lockfile; npm/npx will fail.

## Component library

shadcn/ui is the standard component library. Use shadcn components for all new UI. Do not write custom Tailwind component primitives (buttons, selects, inputs, etc.) when a shadcn equivalent exists.

## Agent skills

### Issue tracker

Issues live in GitHub Issues (`github.com/hyhydev/llb`). See `docs/agents/issue-tracker.md`.

### Triage labels

Default five-label vocabulary (`needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`). See `docs/agents/triage-labels.md`.

### Domain docs

Single-context repo — one `CONTEXT.md` + `docs/adr/` at the repo root. See `docs/agents/domain.md`.
