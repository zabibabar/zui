import type { ComponentPropsWithoutRef, ComponentPropsWithRef, ReactNode } from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '../../utils/cn'
import {
  breadcrumbLinkVariants,
  breadcrumbListVariants,
  breadcrumbPageVariants,
  breadcrumbSeparatorVariants,
} from './breadcrumb.variants'

function ChevronRight() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <path d="M6 3.5 10.5 8 6 12.5" />
    </svg>
  )
}

function Breadcrumb({ ...props }: ComponentPropsWithoutRef<'nav'>) {
  return <nav aria-label="breadcrumb" {...props} />
}

function BreadcrumbList({ className, ref, ...props }: ComponentPropsWithRef<'ol'>) {
  return <ol ref={ref} className={cn(breadcrumbListVariants(), className)} {...props} />
}
BreadcrumbList.displayName = 'BreadcrumbList'

function BreadcrumbItem({ className, ref, ...props }: ComponentPropsWithRef<'li'>) {
  return <li ref={ref} className={cn('inline-flex items-center gap-1.5', className)} {...props} />
}
BreadcrumbItem.displayName = 'BreadcrumbItem'

function BreadcrumbLink({
  asChild,
  className,
  ref,
  ...props
}: ComponentPropsWithRef<'a'> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'a'
  return <Comp ref={ref} className={cn(breadcrumbLinkVariants(), className)} {...props} />
}
BreadcrumbLink.displayName = 'BreadcrumbLink'

function BreadcrumbPage({ className, ref, ...props }: ComponentPropsWithRef<'span'>) {
  return (
    <span
      ref={ref}
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn(breadcrumbPageVariants(), className)}
      {...props}
    />
  )
}
BreadcrumbPage.displayName = 'BreadcrumbPage'

function BreadcrumbSeparator({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<'li'> & { children?: ReactNode }) {
  return (
    <li
      role="presentation"
      aria-hidden="true"
      className={cn(breadcrumbSeparatorVariants(), className)}
      {...props}
    >
      {children ?? <ChevronRight />}
    </li>
  )
}

function BreadcrumbEllipsis({ className, ...props }: ComponentPropsWithoutRef<'span'>) {
  return (
    <span
      role="presentation"
      aria-hidden="true"
      className={cn('flex size-7 items-center justify-center', className)}
      {...props}
    >
      <span className="sr-only">More</span>
      <svg viewBox="0 0 16 16" fill="currentColor" className="size-4">
        <circle cx="3" cy="8" r="1.2" />
        <circle cx="8" cy="8" r="1.2" />
        <circle cx="13" cy="8" r="1.2" />
      </svg>
    </span>
  )
}

export {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
}
