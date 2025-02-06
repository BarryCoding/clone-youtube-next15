/**
 *  LEARN  DYNAMIC ROUTES
 * @link https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes
 */
interface PageProps {
  params: Promise<{ videoId: string }>
}

/**
 * only server component can be async
 */
export default async function Page({ params }: PageProps) {
  console.log('videoId Page')
  const { videoId } = await params

  return <div>video {videoId}</div>
}
