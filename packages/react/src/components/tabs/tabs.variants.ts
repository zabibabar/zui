import { tv } from 'tailwind-variants'

export const tabsListVariants = tv({
  base: 'inline-flex h-tabs-list items-center justify-center rounded-tabs-list bg-muted p-tabs-list-p text-muted-foreground',
})

export const tabsTriggerVariants = tv({
  base: [
    'inline-flex items-center justify-center whitespace-nowrap rounded-tabs-trigger bg-transparent px-tabs-trigger-x py-tabs-trigger-y text-tabs-trigger font-tabs-trigger transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
    'disabled:pointer-events-none disabled:opacity-50',
    'data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm',
  ],
})

export const tabsContentVariants = tv({
  base: [
    'text-card-foreground',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
  ],
})
