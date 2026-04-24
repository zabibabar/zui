import { tv } from 'tailwind-variants'

export const tabsListVariants = tv({
  base: 'inline-flex h-tabs-list items-center justify-center rounded-tabs-list bg-muted/80 p-tabs-list-p text-muted-foreground shadow-inner',
})

export const tabsTriggerVariants = tv({
  base: [
    'inline-flex cursor-pointer select-none items-center justify-center whitespace-nowrap rounded-tabs-trigger bg-transparent px-tabs-trigger-x py-tabs-trigger-y text-tabs-trigger font-tabs-trigger',
    'transition-[background-color,color,box-shadow] duration-150',
    'hover:bg-background/60 hover:text-foreground',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm',
  ],
})

export const tabsContentVariants = tv({
  base: [
    'text-card-foreground',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
  ],
})
