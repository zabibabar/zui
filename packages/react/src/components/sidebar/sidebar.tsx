import type { ComponentProps } from 'react'
import { cn } from '../../utils/cn'
import {
  sidebarHeaderVariants,
  sidebarNavItemVariants,
  sidebarSectionTitleVariants,
  sidebarSectionVariants,
  sidebarVariants,
} from './sidebar.variants'

export function Sidebar({ className, ...props }: ComponentProps<'aside'>) {
  return <aside className={cn(sidebarVariants(), className)} {...props} />
}

export function SidebarHeader({ className, ...props }: ComponentProps<'div'>) {
  return <div className={cn(sidebarHeaderVariants(), className)} {...props} />
}

export function SidebarSection({ className, ...props }: ComponentProps<'div'>) {
  return <div className={cn(sidebarSectionVariants(), className)} {...props} />
}

export function SidebarSectionTitle({ className, ...props }: ComponentProps<'div'>) {
  return <div className={cn(sidebarSectionTitleVariants(), className)} {...props} />
}

export interface SidebarNavItemProps extends ComponentProps<'button'> {
  active?: boolean
}

export function SidebarNavItem({ active, className, ...props }: SidebarNavItemProps) {
  return (
    <button
      type="button"
      className={cn(sidebarNavItemVariants({ active }), className)}
      {...props}
    />
  )
}
