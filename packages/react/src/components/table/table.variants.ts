import { tv } from 'tailwind-variants'

export const tableContainerVariants = tv({
  base: 'w-full overflow-auto rounded-table-container border border-border',
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
  base: 'h-table-head px-table-head-x text-left align-middle text-table-head font-table-head text-muted-foreground',
})

export const tableCellVariants = tv({
  base: 'p-table-cell align-middle text-foreground',
})

export const tableCaptionVariants = tv({
  base: 'mt-table-caption-mt text-table-caption text-muted-foreground',
})
