import type { ComponentPropsWithoutRef } from 'react'
import * as SliderPrimitive from '@radix-ui/react-slider'
import { cn } from '../../utils/cn'
import { sliderRangeVariants, sliderThumbVariants, sliderTrackVariants } from './slider.variants'

export function Slider({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof SliderPrimitive.Root>) {
  return (
    <SliderPrimitive.Root
      className={cn('relative flex w-full touch-none select-none items-center', className)}
      {...props}
    >
      <SliderPrimitive.Track className={sliderTrackVariants()}>
        <SliderPrimitive.Range className={sliderRangeVariants()} />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className={sliderThumbVariants()} />
    </SliderPrimitive.Root>
  )
}
