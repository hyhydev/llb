# BetterAuth with Discord OAuth for user authentication

The LLB competitive community is centred on Discord — users universally have accounts there. We use Discord OAuth via BetterAuth so users can sign in without creating new credentials. BetterAuth was chosen over Auth.js (NextAuth) because it has a cleaner API for Next.js App Router, first-class Prisma adapter support, and avoids the configuration complexity of Auth.js v5's beta period at time of decision.

## Considered options

- **Auth.js (NextAuth v5)** — the established standard. Rejected: v5 was in beta with breaking changes; adapter ecosystem less mature for Prisma + App Router.
- **Clerk** — managed auth with a generous free tier. Rejected: third-party hosted user data, adds a paid dependency for scale.
- **Anonymous usernames** — no real auth, name stored in cookie. Rejected: gameable leaderboard, no persistent identity across devices.
