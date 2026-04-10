import { tv } from 'tailwind-variants'

export const sidebarVariants = tv({
  base: 'flex h-full w-sidebar-w flex-col border-r border-border bg-card text-card-foreground',
})

export const sidebarHeaderVariants = tv({
  base: 'border-b border-border p-sidebar-header',
})

export const sidebarSectionVariants = tv({
  base: 'flex flex-col gap-sidebar-section-gap p-sidebar-section',
})

export const sidebarSectionTitleVariants = tv({
  base: 'px-sidebar-section-title-x py-sidebar-section-title-y text-sidebar-section-title font-sidebar-section-title text-muted-foreground',
})

export const sidebarNavItemVariants = tv({
  base: [
    'w-full rounded-sidebar-nav-item px-sidebar-nav-item-x py-sidebar-nav-item-y text-left text-sidebar-nav-item transition-colors',
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
