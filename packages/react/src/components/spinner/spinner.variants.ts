import { tv } from 'tailwind-variants'

export const spinnerVariants = tv({
  base: 'size-4 animate-[spin_0.8s_linear_infinite] text-muted-foreground',
  variants: {
    size: {
      sm: 'size-3',
      md: 'size-4',
      lg: 'size-6',
    },
  },
  defaultVariants: { size: 'md' },
})
