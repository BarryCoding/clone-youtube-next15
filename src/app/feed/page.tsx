'use client'

import { useState } from 'react'

/**
 * only client components can use hooks
 */
export default function Page() {
  console.log('Feed Page')
  const [count] = useState(1)
  return <div>Feed Page {count}</div>
}
