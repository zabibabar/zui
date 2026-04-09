import { tv } from 'tailwind-variants'

export const tabsListVariants = tv({
  base: 'inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground',
})

export const tabsTriggerVariants = tv({
  base: [
    'inline-flex items-center justify-center whitespace-nowrap rounded-sm bg-transparent px-3 py-1.5 text-sm font-medium transition-colors',
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
