import { tv } from 'tailwind-variants'

export const breadcrumbListVariants = tv({
  base: [
    'flex flex-wrap items-center gap-breadcrumb-gap break-words text-breadcrumb',
    'text-muted-foreground',
  ],
})

export const breadcrumbLinkVariants = tv({
  base: [
    'transition-colors hover:text-foreground',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
  ],
})

export const breadcrumbPageVariants = tv({
  base: 'font-medium text-foreground',
})

export const breadcrumbSeparatorVariants = tv({
  base: '[&>svg]:size-breadcrumb-sep-icon',
})
