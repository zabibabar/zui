import { tv } from 'tailwind-variants'

export const cardVariants = tv({
  base: ['rounded-card border border-border', 'bg-card text-card-foreground'],
})

export const cardHeaderVariants = tv({
  base: 'flex flex-col gap-card-header-gap p-card-header',
})

export const cardTitleVariants = tv({
  base: 'text-card-title font-card-title tracking-card-title',
})

export const cardDescriptionVariants = tv({
  base: 'text-card-desc text-muted-foreground',
})

export const cardContentVariants = tv({
  base: 'px-card-content-x pb-card-content-b',
})

export const cardFooterVariants = tv({
  base: 'flex items-center px-card-footer-x pb-card-footer-b',
})
