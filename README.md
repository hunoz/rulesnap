# 🎲 RuleSnap

**Quick setup & play references for your favorite tabletop games.**

🔗 [rulesnap.com](https://rulesnap.com)

RuleSnap is a collection of plain-language board game guides designed to get you to the table faster. These aren't rulebook replacements — they're streamlined quick-start references that cover setup, gameplay, scoring, and key rules at a glance so you spend less time flipping pages and more time playing.

## Supported Games

| Game | Icon |
|------|------|
| The Castles of Burgundy | 🏰 |

More games coming soon.

## Features

- ⚡ **Fast Setup** — Streamlined setup steps so you're playing sooner
- 📋 **Play Reference** — Key rules at a glance, organized by section
- 🏆 **Scoring Cheat Sheets** — End-of-game scoring broken down into simple checks
- 🌐 **Internationalization** — Supports English and Spanish (Mexico) with auto-detection
- 📱 **Responsive** — Works on desktop and mobile with a collapsible side navigation

## Tech Stack

- **Framework:** React 19 with TypeScript
- **Routing:** TanStack Router (file-based, auto code-splitting)
- **State:** Zustand with Immer
- **i18n:** i18next with browser language detection
- **Build:** Vite 8
- **Infra:** AWS CDK (S3 + CloudFront)
- **Monorepo:** pnpm workspaces

## Project Structure

```
packages/
├── web/          # React SPA — game guides, components, i18n
│   └── src/
│       ├── components/   # Shared UI (SideNav, etc.)
│       ├── games/        # Per-game guide pages and sections
│       ├── i18n/         # Translation files per game and language
│       ├── pages/        # Top-level pages (Home)
│       ├── routes/       # TanStack Router file-based routes
│       ├── stores/       # Zustand stores
│       ├── types/        # Shared TypeScript types
│       └── utils/        # Constants and helpers
└── infra/        # AWS CDK stack (S3 + CloudFront SPA hosting)
```

## Getting Started

### Prerequisites

- Node.js
- [pnpm](https://pnpm.io/)

### Install

```bash
pnpm install
```

### Development

```bash
pnpm web:dev
```

### Build

```bash
pnpm web:build
```

### Deploy

Requires AWS credentials configured:

```bash
pnpm infra:deploy
```

## Adding a New Game

The game list, `GameId` type, and i18n namespaces are auto-discovered from the translation folders — no manual registration needed for those. To add a new game:

1. **Translations** — Create `packages/web/src/i18n/translations/<game-id>/en.json` (and any other locales). The JSON must include an `app` object with at least `title` and `icon`:
   ```json
   {
     "app": {
       "title": "My Game",
       "icon": "🎯",
       ...
     },
     ...
   }
   ```
2. **Schema** — Create `packages/web/src/i18n/translations/<game-id>/schema.ts` exporting a type that matches your JSON structure.
3. **Type declaration** — Add the schema import and resource entry in `packages/web/src/i18n/i18next.d.ts` (two lines — needed for typed `useTranslation` calls).
4. **Game component** — Create `packages/web/src/games/<game-id>/index.tsx` with the game guide content.
5. **Route** — Create `packages/web/src/routes/<game-id>.tsx`:
   ```tsx
   import GameComponent from '@/games/<game-id>';
   import { createFileRoute } from '@tanstack/react-router';

   export const Route = createFileRoute('/<game-id>')({
     component: GameComponent,
   });
   ```

That's it. The game will automatically appear in the home page list and side navigation.

## License

This project is not affiliated with or endorsed by any board game publisher. All game names and trademarks belong to their respective owners.
