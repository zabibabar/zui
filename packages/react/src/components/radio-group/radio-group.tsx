import type { ComponentPropsWithoutRef } from 'react'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { cn } from '../../utils/cn'
import {
  radioGroupVariants,
  radioIndicatorVariants,
  radioItemVariants,
} from './radio-group.variants'

export function RadioGroup({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>) {
  return <RadioGroupPrimitive.Root className={cn(radioGroupVariants(), className)} {...props} />
}

export function RadioGroupItem({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item className={cn(radioItemVariants(), className)} {...props}>
      <RadioGroupPrimitive.Indicator className={radioIndicatorVariants()}>
        <span className="block h-2.5 w-2.5 rounded-full bg-current" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
}
