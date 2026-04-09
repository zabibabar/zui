import { tv } from 'tailwind-variants'

export const accordionItemVariants = tv({
  base: 'border-b border-border',
})

export const accordionTriggerVariants = tv({
  base: [
    'flex w-full items-center justify-between py-4 text-left text-sm font-medium text-foreground',
    'transition-colors hover:text-primary',
    '[&>svg]:h-4 [&>svg]:w-4 [&>svg]:shrink-0 [&>svg]:transition-transform',
    'data-[state=open]:[&>svg]:rotate-180',
  ],
})

export const accordionContentVariants = tv({
  base: 'overflow-hidden text-sm text-muted-foreground',
})
