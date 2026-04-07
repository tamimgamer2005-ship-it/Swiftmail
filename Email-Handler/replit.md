# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

## Artifacts

### SwiftMail (`artifacts/swiftmail`)
- **Type**: React + Vite frontend-only (no backend)
- **Preview path**: `/`
- **Description**: Gmail-inspired temporary email app using the mail.tm API
- **Key files**:
  - `src/pages/SwiftMail.tsx` — main app component with all UI and logic
  - `src/lib/mailtm.ts` — mail.tm API client
  - `src/lib/utils.ts` — utility helpers
- **Features**:
  - Domain fetching with fallback list for CORS robustness
  - Account creation (username + domain + generated password)
  - JWT token auth for inbox access
  - Inbox polling every 15 seconds
  - Email HTML/text rendering
  - One-click email copy with toast
  - Deep dark mode theme (bg: #09090b, cards: #18181b, accent: indigo-500)

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
