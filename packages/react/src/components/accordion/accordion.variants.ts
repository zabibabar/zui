import { tv } from 'tailwind-variants'

export const accordionItemVariants = tv({
  base: 'border-b border-border',
})

export const accordionTriggerVariants = tv({
  base: [
    'flex w-full items-center justify-between py-accordion-trigger-y text-left text-accordion-trigger font-accordion-trigger text-foreground',
    'transition-colors hover:text-primary',
    '[&>svg]:size-accordion-trigger-icon [&>svg]:shrink-0 [&>svg]:transition-transform',
    'data-[state=open]:[&>svg]:rotate-180',
  ],
})

export const accordionContentVariants = tv({
  base: 'overflow-hidden text-accordion-content text-muted-foreground',
})
