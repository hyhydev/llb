---
name: Use bun, not npm/npx
description: This project uses bun as the package manager and runtime, not npm or npx
type: feedback
---

Always use `bun` instead of `npm` or `npx` for running scripts, tests, and installing packages.

**Why:** The project is set up with bun. npm/npx will fail.

**How to apply:** `bun test`, `bun run dev`, `bun add <pkg>`, etc.
