import { tv } from 'tailwind-variants'

export const sidebarVariants = tv({
  base: 'flex h-full w-64 flex-col border-r border-border bg-card text-card-foreground',
})

export const sidebarHeaderVariants = tv({
  base: 'border-b border-border p-4',
})

export const sidebarSectionVariants = tv({
  base: 'flex flex-col gap-1 p-2',
})

export const sidebarSectionTitleVariants = tv({
  base: 'px-2 py-1.5 text-xs font-semibold text-muted-foreground',
})

export const sidebarNavItemVariants = tv({
  base: [
    'w-full rounded-md px-3 py-2 text-left text-sm transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
  ],
  variants: {
    active: {
      true: 'bg-muted font-medium text-foreground',
      false: 'text-muted-foreground hover:bg-muted/60 hover:text-foreground',
    },
  },
  defaultVariants: {
    active: false,
  },
})
