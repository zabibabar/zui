import { tv } from 'tailwind-variants'

export const toggleVariants = tv({
  base: [
    'inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium',
    'border border-transparent bg-transparent text-foreground',
    'transition-colors duration-150',
    'hover:bg-muted',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40',
    'disabled:pointer-events-none disabled:opacity-50',
    'data-[state=on]:border-border data-[state=on]:bg-muted',
  ],
  variants: {
    size: {
      default: 'h-9 min-w-9 px-2',
      sm: 'h-8 min-w-8 px-1.5 text-xs',
      lg: 'h-10 min-w-10 px-2.5',
    },
  },
  defaultVariants: { size: 'default' },
})
