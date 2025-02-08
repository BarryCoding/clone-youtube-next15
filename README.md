# Progress

> Hotter than Porn:
> 1. 🚀 Next.js 15 & React 19 & TS & ESlint & Prettier
> 2. 💅 TailwindCSS & ShadcnUI
> 3. 📦 Module-based architecture
> 4. 📱 Responsive design across devices
> 5. 🔐 Authentication system with Clerk
> 6. 🗄️ Neon PostgreSQL with DrizzleORM
> 7. 🤝 sync users data by Clerk Webhook (Ngrok)
> 8. 🛡️ tRPC for type-safe APIs
> 9. 🚦 rate limiting with upstash

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
> 📱 Responsive design across devices

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
> 🔐 Authentication system with Clerk

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

- integrate clerk to auth-button
  - alway redirect to / after log out
- useAuth on sidebar sections
- update middleware to protect specific routes

## database setup

> Achievements:  
> 🗄️ Neon PostgreSQL with DrizzleORM

```bash
npm show drizzle-orm version

bun add drizzle-orm@0.39.0 @neondatabase/serverless@0.10.4 dotenv@16.4.7
bun add -D drizzle-kit@0.30.3 tsx@4.19.2
```

- create a postgreSQL database at neon.tech
  - login to neon -> new project
  - copy postgreSQL connection string(secure!)
  - save it to .env
- [setup DrizzleORM with neon](https://orm.drizzle.team/docs/get-started/neon-new)
  - install deps
  - create src/db
  - create drizzle.config.ts

```bash
bunx drizzle-kit push   # ✅ apply changes to your database
bunx drizzle-kit studio # ✅ open local database studio
```

## webhook sync

> Achievements:  
> 🤝 sync users data by Clerk Webhook (Ngrok)

- create a ngrok account and login
  - [install ngrok](https://dashboard.ngrok.com/get-started/setup/macos) by homebrew and add auth token
  - [create a domain](https://dashboard.ngrok.com/domains)
  - start the tunnel after running local dev (match local port)

```bash
# first
bun run dev
# then
ngrok http --url=pumped-sunfish-crack.ngrok-free.app 3000
```
obtain a static domain https://pumped-sunfish-crack.ngrok-free.app/
- Q: ngrok DNS_PROBE_FINISHED_NXDOMAIN 🔴
- A: chrome settings -> privacy & security -> security:
  - Advanced: use secure DNS on -> select DNS provider from `OS default` to `OpenDNS` 🟢

- run both local dev and ngrok concurrently
- stop dev and ngrok
- update package.json script
  - dev:ngrok
  - dev:all

```bash
npm show concurrently version

bun add -D concurrently@9.1.2

bun run dev:all # ✅
```

- clerk dashboard (NewTube)
  - configure -> webhook
  - add endpoint: `https://pumped-sunfish-crack.ngrok-free.app/api/users/webhook`
  - subscribe to events: select `user`
  - click `create`
  - copy signing secret to env
  - reference [Clerk webhook guild](https://clerk.com/docs/webhooks/overview)
- connect to this webhook

```bash
npm show svix version

bun add svix@1.45.1
```

- create webhook api route
  - src/api/users/webhook/route 🔴(oh oh)
  - src/app/api/users/webhook/route 🟢(noice)
- events and database tests
  - user.created -> neon ✅ sign up with gmail
  - user.updated -> neon ✅ update avatar image
  - user.deleted -> neon ✅ delete user in Clerk dashboard

## tRPC

> Achievements:  
> 🛡️ tRPC for type-safe APIs
> 🚦 rate limiting with upstash

### tRPC setup 

follow tRPC setup [docs](https://trpc.io/docs/client/react/server-components)

1. Install deps

```bash
npm info @trpc/server
# or 
npm show @trpc/server@next version

npm show @tanstack/react-query
# or
npm show @tanstack/react-query version

bun add @trpc/server@11.0.0-rc.730 @trpc/client@11.0.0-rc.730 @trpc/react-query@11.0.0-rc.730

bun add @tanstack/react-query@5.56.1 zod@3.24.1 client-only@0.0.1 server-only@0.0.1

bun add react-error-boundary@5.0.0
```

2. Create a tRPC router (view sample backend)
   1. src/trpc/init
   2. src/trpc/routers/_app.ts
   3. src/app/api/trpc/\[trpc\]/route.ts (~ -> @)
3. Create a Query Client factory
   1. src/trpc/query-client.ts
4. Create a tPRC client for Client Components
   1. src/trpc/client.tsx
   2. update root layout src/app/layout
5. Create a tRPC caller for Server Components
   1. src/trpc/server.tsx

- Using tRPC prefetch with suspense and ErrorBoundary
  - update vscode settings [FAQ TS any](https://trpc.io/docs/faq)
  - server component src/app/(home)/page
  - client component src/app/(home)/client
  - testing throw trpc error in src/trpc/routers/_app.ts
    - trigger loading ✅
    - trigger error   ✅
- Clean Components Mindset
  - RSC for prefetching data
  - RCC for consuming prefetched data

### tRPC configuration

```bash
npm show superjson version

bun add superjson@2.2.2
```

- enable transformer by superjson
  - update 
    - src/trpc/init
    - src/trpc/query-client
    - src/trpc/client
- add auth to context
  - update src/trpc/init 
    - `createTRPCContext()` with clerkUserId
  - test src/trpc/routers/_app retrieve clerkUserId from `ctx` ✅

- add a protected procedure
  - update src/trpc/init by using a _authentication middleware_ to trpc procedure
    - handle authentication by clerk and user data from db
    - add user data to trpc context
  - test src/trpc/routers/_app retrieve user from `ctx` ✅


```bash
npm show @upstash/redis version

bun add @upstash/redis@1.34.3 @upstash/ratelimit@2.0.5
```

- add rate limiting by upstash
  - login to upstash (redis)
  - create database
  - add env variables
  - read [upstash rate limiting docs](https://upstash.com/docs/redis/sdks/ratelimit-ts/overview)
  - src/lib
    - create redis
    - create ratelimit
  - update src/trpc/init with ratelimit
- server prefetch diff from client useSuspenseQuery will trigger rate limit 
  - as the mismatch will retrigger fetch in the client component
  - when mismatched the view will be Client Side Rendering
- server prefetch same as client useSuspenseQuery will not trigger rate limit 
  - as the match will not trigger fetch in the client component
  - when matched the view will be Server Side Rendering
  - in browser network tab: no such fetch exist!!!

- extra: explicit request header from client
  - update src/trpc/client.tsx
    - mark trpcClient with header `{'x-trpc-source': 'nextjs-react'}`

## Extra Mile

- type safe env by bun
  - [reference bun docs typescript](https://bun.sh/docs/runtime/env#typescript)
  - `bun add -d @types/bun`
  - create bun.d.ts
  - remove ! from env variables