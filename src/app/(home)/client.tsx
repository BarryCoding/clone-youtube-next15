'use client'

import { trpc } from '@/trpc/client'

export const Client = () => {
  // should matching with prefetch by the RSC
  const [data] = trpc.hello.useSuspenseQuery({ text: 'my first client TRPC' })
  return <div>client: {data.greeting}</div>
}
