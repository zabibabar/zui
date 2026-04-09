import { tv } from 'tailwind-variants'

export const tableContainerVariants = tv({
  base: 'w-full overflow-auto rounded-md border border-border',
})

export const tableVariants = tv({
  base: 'w-full caption-bottom text-sm',
})

export const tableHeaderVariants = tv({
  base: '[&_tr]:border-b [&_tr]:border-border',
})

export const tableBodyVariants = tv({
  base: '[&_tr:last-child]:border-0',
})

export const tableRowVariants = tv({
  base: 'border-b border-border transition-colors hover:bg-muted/50',
})

export const tableHeadVariants = tv({
  base: 'h-10 px-3 text-left align-middle text-xs font-semibold text-muted-foreground',
})

export const tableCellVariants = tv({
  base: 'p-3 align-middle text-foreground',
})

export const tableCaptionVariants = tv({
  base: 'mt-2 text-xs text-muted-foreground',
})
