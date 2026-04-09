import { tv } from 'tailwind-variants'

export const avatarRootVariants = tv({
  base: [
    'relative flex size-10 shrink-0 overflow-hidden rounded-full',
    'border border-border bg-muted',
  ],
  variants: {
    size: {
      sm: 'size-8 text-xs',
      md: 'size-10 text-sm',
      lg: 'size-12 text-base',
    },
  },
  defaultVariants: { size: 'md' },
})

export const avatarImageVariants = tv({
  base: 'aspect-square h-full w-full object-cover',
})

export const avatarFallbackVariants = tv({
  base: [
    'flex h-full w-full items-center justify-center rounded-full',
    'bg-muted font-medium text-muted-foreground',
  ],
})
