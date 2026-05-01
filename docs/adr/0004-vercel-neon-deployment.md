# Vercel + Neon for hosting and database

The app is deployed on Vercel with a Neon serverless PostgreSQL database. Neon's Vercel marketplace integration handles environment variable wiring automatically, and its serverless connection pooling avoids cold-start latency issues that affect standard PostgreSQL on serverless runtimes.

## Considered options

- **Vercel + Supabase** — also strong Vercel integration but includes auth and storage features we don't need (BetterAuth handles auth).
- **Railway** — single platform for app and database, simpler billing. Rejected: less optimised for Next.js App Router serverless functions; no native Vercel integration.
