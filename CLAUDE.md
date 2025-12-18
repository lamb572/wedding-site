# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server with Turbopack
npm run build    # Production build
npm run lint     # Run ESLint
npm run start    # Start production server
```

## Architecture

This is a Next.js 16 wedding website using the App Router with TypeScript, MUI (Material UI), and Tailwind CSS.

### Data Sources

- **Sanity CMS**: Content management for pages (home, schedule, FAQs, registry, travel info). Client in `src/sanity/index.ts`, server queries in `src/sanity/server/`.
- **MongoDB**: Guest invite/RSVP data. Client in `src/server/mongodb/`.
- **NextAuth**: Admin authentication via Discord provider. Config in `src/auth.config.ts`.

### Directory Structure

- `src/app/` - App Router pages and API routes. Uses parallel routes (`@modal/`) for invite modal.
- `src/client/` - Client components (`'use client'`) including views and reusable components.
- `src/server/` - Server-side logic: invite management, cookies, form actions, Discord webhooks.
- `src/sanity/` - Sanity CMS client and server queries.
- `src/components/` - Shared components (Links, NavBarItem).
- `src/shared/` - Shared form options/schemas.

### Key Patterns

- Path alias: `@/*` maps to `./src/*`
- Invite flow: Guest visits with invite code -> stored in cookies -> unlocks schedule/travel/RSVP pages
- Server actions in `src/server/formActions/` handle form submissions
- Theme comes from Sanity (`getSanityTheme`) and wraps app via `ThemeWrapper`
- Sentry integration for error monitoring (configured in `next.config.ts`)

### Environment Variables

Required Sanity vars: `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `SANITY_VIEWER_TOKEN`, `NEXT_PUBLIC_SANITY_STUDIO_URL`

`NEXT_MAIN_SITE_FLAG` controls nav visibility.

### API Routes

- `/api/auth/[...nextauth]` - NextAuth handlers
- `/api/twilio/` - SMS message handling
- `/api/draft-mode/enable` - Sanity draft mode

## Code Style

- Do not add Claude commit signatures (no "Generated with Claude Code" or Co-Authored-By lines)
- Code should be self-explanatory; avoid unnecessary comments
- Use comments only for JSDoc documentation and when extra insight is genuinely required
- Prefer small, focused commits with descriptive messages
