import type { ComponentProps, ReactNode } from 'react'
import type { AlertIntent } from './alert.variants'
import { cn } from '../../utils/cn'
import { alertVariants } from './alert.variants'

export type { AlertIntent } from './alert.variants'

export interface AlertProps extends ComponentProps<'div'> {
  intent: AlertIntent
  icon?: ReactNode
}

export function Alert({ intent, icon, className, children, ...props }: AlertProps) {
  return (
    <div role="alert" className={cn(alertVariants({ intent }), className)} {...props}>
      {icon ? <span className="mt-0.5 shrink-0 [&_svg]:size-4">{icon}</span> : null}
      <div className="min-w-0 flex-1 space-y-1">{children}</div>
    </div>
  )
}

export function AlertTitle({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div data-slot="alert-title" className={cn('font-medium leading-none', className)} {...props} />
  )
}

export function AlertDescription({ className, ...props }: ComponentProps<'div'>) {
  return <div className={cn('text-sm text-muted-foreground', className)} {...props} />
}
