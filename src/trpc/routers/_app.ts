import { z } from 'zod'
import { createTRPCRouter, protectedProcedure } from '../init'
export const appRouter = createTRPCRouter({
  hello: protectedProcedure
    .input(
      z.object({
        text: z.string(),
      }),
    )
    .query((opts) => {
      // throw new TRPCError({ code: 'BAD_REQUEST' }) // test: error boundary and suspense
      // console.log(`🔎 🔍 ~ .query ~ clerkUserId from trpc context:`, opts.ctx.clerkUserId) // test: clerkUserId
      console.log(`🔎 🔍 ~ .query ~ user from trpc context:`, opts.ctx.user) // test: clerkUserId

      return {
        greeting: `hello ${opts.input.text}`,
      }
    }),
})
// export type definition of API
export type AppRouter = typeof appRouter
