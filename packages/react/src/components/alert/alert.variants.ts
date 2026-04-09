import type { VariantProps } from 'tailwind-variants'
import { tv } from 'tailwind-variants'

export const alertVariants = tv({
  base: 'flex gap-3 rounded-lg border p-4 text-foreground',
  variants: {
    intent: {
      info: 'border-info-border bg-info-subtle [&_[data-slot=alert-title]]:text-info',
      success: 'border-success-border bg-success-subtle [&_[data-slot=alert-title]]:text-success',
      warning: 'border-warning-border bg-warning-subtle [&_[data-slot=alert-title]]:text-warning',
      danger: 'border-danger-border bg-danger-subtle [&_[data-slot=alert-title]]:text-danger',
    },
  },
})

export type AlertIntent = NonNullable<VariantProps<typeof alertVariants>['intent']>
