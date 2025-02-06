# Progress

> Hotter than Porn:
> 1. 🚀 Next.js 15 & React 19 & TS & ESlint & Prettier
> 2. 💅 TailwindCSS & ShadcnUI
> 3. 📦 Module-based architecture

## project setup

> Achievements:  
> 🚀 Next.js 15 & React 19 & TS & ESlint & Prettier  
> 💅 TailwindCSS & ShadcnUI

- configure environment
  - runtime `bun`
  - package manager `bun`

- why bun?
  - run ts script and ESM
  - less deps issue regarding React19 (really?)

- basic bun commands
  - `bun add` === 'npm install'
  - `bunx` === 'npx' (still cause deps issue)

- create Next15 project
  - use exact version

```bash
bun -v # 1.20
node -v # 22.13.0
npm -v # 11.0.0

# next15
bunx create-next-app@latest --version
bunx create-next-app@15.1.6
# no turbopack
# yes to others

cd you-project
bun run dev # ✅

# shadcn
bunx --bun shadcn@latest --version
bunx --bun shadcn@2.1.8 init
bunx --bun shadcn@2.1.8 add --all

# if 'peer dep issue' happens 🚧
bun install # update bun.lock
bun run dev # ✅
```

- remove `package-lock.json`

### prettier

```bash
bun add -D prettier prettier-plugin-tailwindcss eslint-config-prettier
```
- create / update configurations
  - `.prettierrc`
  - `eslint.config.mjs` eslintConfig
  - `package.json` scripts

```bash
bun run p-check
bun run p-write
bun run p-check # ✅
```

- after installing new packages(prettier etc)
  - always run lint then build first
  - update `use-toast.ts` to solve lint errors

```bash
bun run lint  # ✅
bun run build # ✅
```

## basic layout

> Achievements:  
> 📦 Module-based architecture

- add logo svg
  - remove unused assets in public folder
- update root layout
  - change font to Latin
  - update metadata for better seo

- app router folders structure
  - page component 'use server' in default
    - can be async
  - page component 'use client' must be explicit
    - can use hooks
    - can not be async
  - layout component always has 'children' prop
    - share contents to all its pages
  - routes can be static, \[dynamic\], (grouped)
    - learn [dynamic-routes](https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes) [route-groups](https://nextjs.org/docs/app/building-your-application/routing/route-groups)

- src modules folder
  - put react logic and style into modules for corresponding app routes
  - app routes is only for core structure!

- modules/home/ui
  - layouts/home-layout
  - components/home-navbar
  - components/home-sidebar (provider and its trigger)
- modules/auth/ui/components/auth-button

## authentication

> Achievements:  
> ?

- **integrate Clerk**
  - login to Clerk dashboard -> new Application -> ✅ gmail
  - follow nextjs instructions

```bash
# check package version
npm show @clerk/nextjs version

bun add @clerk/nextjs@6.10.3
```

1. Install @clerk/nextjs
2. Set environment variables in `.env.local`
3. Create src/middleware.ts
4. Add ClerkProvider to root layout
5. [Next Step](https://clerk.com/docs/references/nextjs/custom-sign-in-or-up-page) **sign-in screens**
   - src/app/(auth)/
     - layout
     - `sign-in/[[...sign-in]]/page` ✅
     - `sign-up/[[...sign-up]]/page` ✅
   - update .env.local with `NEXT_PUBLIC_CLERK_SIGN_IN_URL`
