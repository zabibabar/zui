import { tv } from 'tailwind-variants'

export const toggleVariants = tv({
  base: [
    'inline-flex cursor-pointer select-none items-center justify-center gap-toggle-gap rounded-toggle font-toggle',
    'border border-transparent bg-transparent text-foreground',
    'transition-[background-color,border-color,color,box-shadow] duration-150',
    'hover:bg-muted hover:shadow-xs',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'data-[state=on]:border-border data-[state=on]:bg-muted data-[state=on]:shadow-sm',
  ],
  variants: {
    size: {
      default: 'h-toggle-md min-w-toggle-md-min-w px-toggle-md-x text-toggle-md',
      sm: 'h-toggle-sm min-w-toggle-sm-min-w px-toggle-sm-x text-toggle-sm',
      lg: 'h-toggle-lg min-w-toggle-lg-min-w px-toggle-lg-x text-toggle-lg',
    },
  },
  defaultVariants: { size: 'default' },
})
