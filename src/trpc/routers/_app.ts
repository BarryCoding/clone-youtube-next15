import { z } from 'zod'
import { baseProcedure, createTRPCRouter } from '../init'
export const appRouter = createTRPCRouter({
  hello: baseProcedure
    .input(
      z.object({
        text: z.string(),
      }),
    )
    .query((opts) => {
      // throw new TRPCError({ code: 'BAD_REQUEST' }) // test: error boundary and suspense
      return {
        greeting: `hello ${opts.input.text}`,
      }
    }),
})
// export type definition of API
export type AppRouter = typeof appRouter
