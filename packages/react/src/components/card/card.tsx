import type { ComponentProps } from 'react'
import { cn } from '../../utils/cn'
import {
  cardContentVariants,
  cardDescriptionVariants,
  cardFooterVariants,
  cardHeaderVariants,
  cardTitleVariants,
  cardVariants,
} from './card.variants'

export function Card({ className, ...props }: ComponentProps<'div'>) {
  return <div className={cn(cardVariants(), className)} {...props} />
}

export function CardHeader({ className, ...props }: ComponentProps<'div'>) {
  return <div className={cn(cardHeaderVariants(), className)} {...props} />
}

export function CardTitle({ className, ...props }: ComponentProps<'h3'>) {
  return <h3 className={cn(cardTitleVariants(), className)} {...props} />
}

export function CardDescription({ className, ...props }: ComponentProps<'p'>) {
  return <p className={cn(cardDescriptionVariants(), className)} {...props} />
}

export function CardContent({ className, ...props }: ComponentProps<'div'>) {
  return <div className={cn(cardContentVariants(), className)} {...props} />
}

export function CardFooter({ className, ...props }: ComponentProps<'div'>) {
  return <div className={cn(cardFooterVariants(), className)} {...props} />
}
