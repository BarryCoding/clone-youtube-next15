import Image from 'next/image'

export default function Home() {
  return (
    <div className='flex text-rose-500'>
      <Image src={'/logo.svg'} width={100} height={100} alt='logo' />
      <p className='text-xl font-semibold tracking-tight'>new tube</p>
    </div>
  )
}
