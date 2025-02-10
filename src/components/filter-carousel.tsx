'use client'

import { useEffect, useState } from 'react'

import { Badge } from '@/components/ui/badge'
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

interface FilterCarouselProps {
  value?: string | null
  isLoading?: boolean
  onSelect: (value: string | null) => void
  data: {
    value: string
    label: string
  }[]
}

export const FilterCarousel = ({ value, onSelect, data, isLoading }: FilterCarouselProps) => {
  // REFACTOR: remove the dirty logic below, should be css only without an react hooks

  // for ScrollSnap only
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!api) return

    setCount(api.scrollSnapList().length)
    const updateScrollSnap = () => setCurrent(api.selectedScrollSnap() + 1)

    updateScrollSnap()
    api.on('select', updateScrollSnap)
    return () => {
      api.off('select', updateScrollSnap) // clean off the event
    }
  }, [api])

  return (
    <div className='relative w-full'>
      <Carousel
        setApi={setApi}
        opts={{
          align: 'start',
          dragFree: true,
        }}
        className='w-full px-12'
      >
        <CarouselContent className='-ml-3'>
          {/* loading skeleton items */}
          {isLoading &&
            Array.from({ length: 14 }).map((_, index) => (
              <CarouselItem key={index} className='basis-auto pl-3'>
                <Skeleton className='h-full w-[100px] rounded-lg px-3 py-1 text-sm font-semibold'>
                  &nbsp;
                </Skeleton>
              </CarouselItem>
            ))}

          {/* the static item All */}
          {!isLoading && (
            <CarouselItem onClick={() => onSelect(null)} className='basis-auto pl-3'>
              <Badge
                variant={!value ? 'default' : 'secondary'}
                className='cursor-pointer whitespace-nowrap rounded-lg px-3 py-1 text-sm'
              >
                All
              </Badge>
            </CarouselItem>
          )}
          {/* the dynamic items from fetch data */}
          {!isLoading &&
            data.map((item) => (
              <CarouselItem
                key={item.value}
                className='basis-auto pl-3'
                onClick={() => onSelect(item.value)}
              >
                <Badge
                  variant={value === item.value ? 'default' : 'secondary'}
                  className='cursor-pointer whitespace-nowrap rounded-lg px-3 py-1 text-sm'
                >
                  {item.label}
                </Badge>
              </CarouselItem>
            ))}
        </CarouselContent>

        {/* prev and next control */}
        <CarouselPrevious className='left-0 z-20' />
        <CarouselNext className='right-0 z-20' />
      </Carousel>

      {/* better left and right fading UI based on carousel scroll position */}
      <div
        className={cn(
          'pointer-events-none absolute bottom-0 left-12 top-0 z-10 w-12 bg-gradient-to-r from-white to-transparent',
          current === 1 && 'hidden',
        )}
      />
      <div
        className={cn(
          'pointer-events-none absolute bottom-0 right-12 top-0 z-10 w-12 bg-gradient-to-l from-white to-transparent',
          current === count && 'hidden',
        )}
      />
    </div>
  )
}
