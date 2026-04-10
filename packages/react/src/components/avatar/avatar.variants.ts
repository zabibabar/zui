import { tv } from 'tailwind-variants'

export const avatarRootVariants = tv({
  base: ['relative flex shrink-0 overflow-hidden rounded-full', 'border border-border bg-muted'],
  variants: {
    size: {
      sm: 'size-avatar-sm text-avatar-sm',
      md: 'size-avatar-md text-avatar-md',
      lg: 'size-avatar-lg text-avatar-lg',
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
