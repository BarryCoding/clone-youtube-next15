'use client'

import { trpc } from '@/trpc/client'

export const Client = () => {
  // should matching with prefetch by the RSC
  const [data] = trpc.categories.getMany.useSuspenseQuery()
  return <div>client: {data.map((c) => c.name).join(' ')}</div>
}
