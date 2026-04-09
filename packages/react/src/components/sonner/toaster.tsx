import type { ComponentProps } from 'react'
import { Toaster as SonnerToaster } from 'sonner'

export type ToasterProps = ComponentProps<typeof SonnerToaster>

/**
 * Mount once near the app root. Uses theme CSS variables for surfaces and text.
 */
export function Toaster({ className, toastOptions, ...props }: ToasterProps) {
  return (
    <SonnerToaster
      className={className}
      toastOptions={{
        ...toastOptions,
        classNames: {
          toast: 'group border border-border bg-popover text-popover-foreground shadow-lg',
          title: 'text-foreground',
          description: 'text-muted-foreground',
          actionButton: 'bg-primary text-primary-foreground',
          cancelButton: 'border border-border bg-background text-foreground',
          ...toastOptions?.classNames,
        },
      }}
      {...props}
    />
  )
}
