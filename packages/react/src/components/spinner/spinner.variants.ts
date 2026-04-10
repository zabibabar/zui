import { tv } from 'tailwind-variants'

export const spinnerVariants = tv({
  base: 'animate-[spin_0.8s_linear_infinite] text-muted-foreground',
  variants: {
    size: {
      sm: 'size-spinner-sm',
      md: 'size-spinner-md',
      lg: 'size-spinner-lg',
    },
  },
  defaultVariants: { size: 'md' },
})
