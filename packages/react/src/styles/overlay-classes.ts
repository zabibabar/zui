/**
 * Shared class fragments for popover-like surfaces and menu/list content.
 *
 * Dimensional classes (radius, font-size, padding) are omitted here and
 * added per-component using token-based Tailwind utilities so that changes
 * to component tokens in @zui/core auto-propagate.
 */
export const overlaySurfaceBase = [
  'border border-border bg-popover',
  'text-popover-foreground',
] as const

export const overlayInteractiveItemBase = [
  'relative flex cursor-pointer select-none items-center outline-none',
  'transition-colors duration-150',
  'hover:bg-muted/70 hover:text-foreground',
  'focus:bg-muted focus:text-foreground',
  'data-[highlighted]:bg-muted data-[highlighted]:text-foreground',
  'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
] as const

export const fieldControlBase = [
  'transition-[background-color,border-color,color,box-shadow] duration-150',
  'hover:border-ring/50',
  'focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30',
  'disabled:cursor-not-allowed disabled:opacity-50',
] as const

export const pressableControlBase = [
  'cursor-pointer select-none',
  'transition-[background-color,border-color,color,box-shadow] duration-150',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40',
  'disabled:cursor-not-allowed disabled:opacity-50',
] as const

export const overlayLabelBase = 'text-muted-foreground'

export const overlaySeparatorBase = '-mx-1 my-1 h-px bg-border'
