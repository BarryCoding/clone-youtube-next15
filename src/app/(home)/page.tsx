import { HydrateClient, trpc } from '@/trpc/server'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Client } from './client'

export default async function Home() {
  // server prefetch params diff from client useSuspenseQuery will trigger rate limit
  // as client will retrigger api
  // void trpc.hello.prefetch({ text: 'my first trpc in RSC!' })

  // server prefetch same params as client useSuspenseQuery will not trigger rate limit
  void trpc.hello.prefetch({ text: 'my first client TRPC' })
  return (
    <main>
      <HydrateClient>
        <ErrorBoundary fallback={<div>Something went wrong</div>}>
          <Suspense fallback={<div>Loading...</div>}>
            <Client />
          </Suspense>
        </ErrorBoundary>
      </HydrateClient>
    </main>
  )
}
