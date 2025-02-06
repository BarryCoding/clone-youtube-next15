# Progress

## 01 project setup

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