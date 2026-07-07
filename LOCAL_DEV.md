# Running VEEPEE Engineers Locally

## Stack
- **TanStack Start** (React 19 + Vite 7, SSR)
- **Tailwind CSS v4**
- **Supabase** (Lovable Cloud) — Postgres, Auth, Storage
- **Bun** as package manager / runtime (npm/pnpm also work)

## 1. Prerequisites
- Node.js **20+** (or Bun 1.1+)
- Git
- A code editor (VS Code recommended)

Install Bun (optional but preferred):
```bash
curl -fsSL https://bun.sh/install | bash
```

## 2. Clone the project
Use the **GitHub** button at the top-right of the Lovable editor to connect a repo, then:
```bash
git clone <your-repo-url>
cd <project-folder>
```

## 3. Install dependencies
```bash
bun install
# or: npm install
```

## 4. Environment variables
Create a `.env` file in the project root:
```env
VITE_SUPABASE_URL=https://ywvbiypsuotubzfxoven.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_MOnp4tVcUAtN8HPrvbP3Iw_gaGh3fTX
VITE_SUPABASE_PROJECT_ID=ywvbiypsuotubzfxoven

# Server-side (same values, without the VITE_ prefix)
SUPABASE_URL=https://ywvbiypsuotubzfxoven.supabase.co
SUPABASE_PUBLISHABLE_KEY=sb_publishable_MOnp4tVcUAtN8HPrvbP3Iw_gaGh3fTX
SUPABASE_PROJECT_ID=ywvbiypsuotubzfxoven
```
> `SUPABASE_SERVICE_ROLE_KEY` is managed by Lovable Cloud and is **not** available locally. Admin-only server functions that need it won't work outside the deployed environment — everything else does.

## 5. Run the dev server
```bash
bun run dev
# or: npm run dev
```
Open http://localhost:8080.

## 6. Useful scripts
| Command | Purpose |
|---|---|
| `bun run dev` | Start Vite dev server (HMR) |
| `bun run build` | Production build |
| `bun run preview` | Preview production build |
| `bun run lint` | ESLint |

## 7. Project layout
```
src/
  routes/            # File-based routing (TanStack Router)
    __root.tsx       # App shell
    index.tsx        # Home page
    services.$id.tsx # Service detail page
    admin.tsx        # Admin (auth required)
  components/        # UI components
  lib/               # Server functions (*.functions.ts) & utils
  integrations/
    supabase/        # Auto-generated Supabase client (don't edit)
  styles.css         # Tailwind v4 entrypoint
```

## 8. Editing routes
Add a file under `src/routes/`; the route tree regenerates automatically. Example:
```tsx
// src/routes/about.tsx
import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/about")({
  component: () => <h1>About</h1>,
});
```

## 9. Pushing changes back to Lovable
If you've connected GitHub, commits pushed to `main` sync automatically to the Lovable editor.

## 10. Troubleshooting
- **"Missing Supabase env"** → check `.env` values match §4.
- **Blank page / route errors** → delete `src/routeTree.gen.ts` and restart `dev` — the plugin will regenerate it.
- **Port 8080 in use** → set `PORT=3000 bun run dev`.
