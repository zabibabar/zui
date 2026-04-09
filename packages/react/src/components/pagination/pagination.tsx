import type { ComponentPropsWithoutRef } from 'react'
import { Slot } from '@radix-ui/react-slot'
import { forwardRef } from 'react'
import { cn } from '../../utils/cn'
import { buttonVariants } from '../button/button.variants'
import { paginationContentVariants } from './pagination.variants'

function Chevron({ dir }: { dir: 'left' | 'right' }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-4">
      {dir === 'left' ? <path d="M10 3 5 8l5 5" /> : <path d="M6 3l5 5-5 5" />}
    </svg>
  )
}

function Pagination({ className, ...props }: ComponentPropsWithoutRef<'nav'>) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      className={cn('mx-auto flex w-full justify-center', className)}
      {...props}
    />
  )
}

const PaginationContent = forwardRef<HTMLUListElement, ComponentPropsWithoutRef<'ul'>>(
  ({ className, ...props }, ref) => (
    <ul ref={ref} className={cn(paginationContentVariants(), className)} {...props} />
  ),
)
PaginationContent.displayName = 'PaginationContent'

const PaginationItem = forwardRef<HTMLLIElement, ComponentPropsWithoutRef<'li'>>(
  ({ className, ...props }, ref) => <li ref={ref} className={cn('', className)} {...props} />,
)
PaginationItem.displayName = 'PaginationItem'

type PaginationLinkProps = ComponentPropsWithoutRef<'a'> & {
  isActive?: boolean
  asChild?: boolean
}

const PaginationLink = forwardRef<HTMLAnchorElement, PaginationLinkProps>(
  ({ className, isActive, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'a'
    return (
      <Comp
        ref={ref}
        aria-current={isActive ? 'page' : undefined}
        className={cn(
          buttonVariants({ variant: 'outline', color: 'neutral', size: 'sm' }),
          'size-9 min-w-9 shrink-0 p-0',
          isActive && 'border-primary bg-primary-subtle text-primary',
          className,
        )}
        {...props}
      />
    )
  },
)
PaginationLink.displayName = 'PaginationLink'

const PaginationPrevious = forwardRef<HTMLAnchorElement, ComponentPropsWithoutRef<'a'>>(
  ({ className, ...props }, ref) => (
    <PaginationLink
      ref={ref}
      aria-label="Go to previous page"
      className={cn('gap-1 pr-2.5 pl-2', className)}
      {...props}
    >
      <Chevron dir="left" />
      <span className="hidden sm:inline">Previous</span>
    </PaginationLink>
  ),
)
PaginationPrevious.displayName = 'PaginationPrevious'

const PaginationNext = forwardRef<HTMLAnchorElement, ComponentPropsWithoutRef<'a'>>(
  ({ className, ...props }, ref) => (
    <PaginationLink
      ref={ref}
      aria-label="Go to next page"
      className={cn('gap-1 pr-2 pl-2.5', className)}
      {...props}
    >
      <span className="hidden sm:inline">Next</span>
      <Chevron dir="right" />
    </PaginationLink>
  ),
)
PaginationNext.displayName = 'PaginationNext'

function PaginationEllipsis({ className, ...props }: ComponentPropsWithoutRef<'span'>) {
  return (
    <span
      aria-hidden
      className={cn('flex size-9 items-center justify-center text-muted-foreground', className)}
      {...props}
    >
      …<span className="sr-only">More pages</span>
    </span>
  )
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
}
