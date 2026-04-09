import type { ComponentPropsWithoutRef } from 'react'
import { cn } from '../../utils/cn'
import {
  tableBodyVariants,
  tableCaptionVariants,
  tableCellVariants,
  tableContainerVariants,
  tableHeaderVariants,
  tableHeadVariants,
  tableRowVariants,
  tableVariants,
} from './table.variants'

export function Table({ className, ...props }: ComponentPropsWithoutRef<'table'>) {
  return (
    <div className={tableContainerVariants()}>
      <table className={cn(tableVariants(), className)} {...props} />
    </div>
  )
}

export function TableHeader({ className, ...props }: ComponentPropsWithoutRef<'thead'>) {
  return <thead className={cn(tableHeaderVariants(), className)} {...props} />
}

export function TableBody({ className, ...props }: ComponentPropsWithoutRef<'tbody'>) {
  return <tbody className={cn(tableBodyVariants(), className)} {...props} />
}

export function TableRow({ className, ...props }: ComponentPropsWithoutRef<'tr'>) {
  return <tr className={cn(tableRowVariants(), className)} {...props} />
}

export function TableHead({ className, ...props }: ComponentPropsWithoutRef<'th'>) {
  return <th className={cn(tableHeadVariants(), className)} {...props} />
}

export function TableCell({ className, ...props }: ComponentPropsWithoutRef<'td'>) {
  return <td className={cn(tableCellVariants(), className)} {...props} />
}

export function TableCaption({ className, ...props }: ComponentPropsWithoutRef<'caption'>) {
  return <caption className={cn(tableCaptionVariants(), className)} {...props} />
}
