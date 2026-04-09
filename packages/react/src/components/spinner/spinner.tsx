import type { SVGAttributes } from 'react'
import type { VariantProps } from 'tailwind-variants'
import { cn } from '../../utils/cn'
import { spinnerVariants } from './spinner.variants'

export type SpinnerProps = SVGAttributes<SVGSVGElement> & VariantProps<typeof spinnerVariants>

export function Spinner({ className, size, ...props }: SpinnerProps) {
  return (
    <svg
      role="status"
      aria-label="Loading"
      viewBox="0 0 24 24"
      fill="none"
      className={cn(spinnerVariants({ size }), className)}
      {...props}
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
      <path
        className="opacity-90"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  )
}
