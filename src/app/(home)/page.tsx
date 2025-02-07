import { HydrateClient, trpc } from '@/trpc/server'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Client } from './client'

export default async function Home() {
  void trpc.hello.prefetch({ text: 'my first trpc in RSC!' })
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
