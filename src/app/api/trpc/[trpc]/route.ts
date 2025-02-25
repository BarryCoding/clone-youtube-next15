import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { createTRPCContext } from '@/trpc/init'
import { appRouter } from '@/trpc/routers/_app'
const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: '/api/trpc', // api-route: src/app/api/trpc/[trpc]/route.ts
    req,
    router: appRouter,
    createContext: createTRPCContext,
  })
export { handler as GET, handler as POST }
