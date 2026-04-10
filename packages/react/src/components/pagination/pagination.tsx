import type { ComponentPropsWithoutRef, ComponentPropsWithRef } from 'react'
import { Slot } from '@radix-ui/react-slot'
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

function PaginationContent({ className, ref, ...props }: ComponentPropsWithRef<'ul'>) {
  return <ul ref={ref} className={cn(paginationContentVariants(), className)} {...props} />
}
PaginationContent.displayName = 'PaginationContent'

function PaginationItem({ className, ref, ...props }: ComponentPropsWithRef<'li'>) {
  return <li ref={ref} className={cn('', className)} {...props} />
}
PaginationItem.displayName = 'PaginationItem'

type PaginationLinkProps = ComponentPropsWithRef<'a'> & {
  isActive?: boolean
  asChild?: boolean
}

function PaginationLink({ className, isActive, asChild, ref, ...props }: PaginationLinkProps) {
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
}
PaginationLink.displayName = 'PaginationLink'

function PaginationPrevious({ className, ref, ...props }: ComponentPropsWithRef<'a'>) {
  return (
    <PaginationLink
      ref={ref}
      aria-label="Go to previous page"
      className={cn('gap-1 pr-2.5 pl-2', className)}
      {...props}
    >
      <Chevron dir="left" />
      <span className="hidden sm:inline">Previous</span>
    </PaginationLink>
  )
}
PaginationPrevious.displayName = 'PaginationPrevious'

function PaginationNext({ className, ref, ...props }: ComponentPropsWithRef<'a'>) {
  return (
    <PaginationLink
      ref={ref}
      aria-label="Go to next page"
      className={cn('gap-1 pr-2 pl-2.5', className)}
      {...props}
    >
      <span className="hidden sm:inline">Next</span>
      <Chevron dir="right" />
    </PaginationLink>
  )
}
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
