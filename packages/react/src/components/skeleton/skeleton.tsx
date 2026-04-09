import type { HTMLAttributes } from 'react'
import { cn } from '../../utils/cn'
import { skeletonVariants } from './skeleton.variants'

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return <div className={cn(skeletonVariants(), className)} {...props} />
}
