import type { ComponentPropsWithoutRef } from 'react'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { cn } from '../../utils/cn'
import {
  accordionContentVariants,
  accordionItemVariants,
  accordionTriggerVariants,
} from './accordion.variants'

export const Accordion = AccordionPrimitive.Root

export function AccordionItem({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>) {
  return <AccordionPrimitive.Item className={cn(accordionItemVariants(), className)} {...props} />
}

function ChevronDownIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M3.5 6.5 8 11 12.5 6.5" />
    </svg>
  )
}

export function AccordionTrigger({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger className={cn(accordionTriggerVariants(), className)} {...props}>
        {children}
        <ChevronDownIcon />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

export function AccordionContent({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content className={cn(accordionContentVariants(), className)} {...props}>
      <div className="pb-4">{children}</div>
    </AccordionPrimitive.Content>
  )
}
