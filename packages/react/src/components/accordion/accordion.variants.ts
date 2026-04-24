import { tv } from 'tailwind-variants'

export const accordionItemVariants = tv({
  base: 'border-b border-border',
})

export const accordionTriggerVariants = tv({
  base: [
    'flex w-full cursor-pointer select-none items-center justify-between rounded-md px-accordion-trigger-x py-accordion-trigger-y text-left text-accordion-trigger font-accordion-trigger text-foreground',
    'transition-[background-color,color] duration-150 hover:bg-muted/60 hover:text-primary',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40',
    '[&>svg]:size-accordion-trigger-icon [&>svg]:shrink-0 [&>svg]:transition-transform',
    'data-[state=open]:[&>svg]:rotate-180',
  ],
})

export const accordionContentVariants = tv({
  base: 'overflow-hidden text-accordion-content text-muted-foreground',
})
