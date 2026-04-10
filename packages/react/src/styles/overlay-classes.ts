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
  'focus:bg-muted focus:text-foreground',
  'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
] as const

export const overlayLabelBase = 'text-muted-foreground'

export const overlaySeparatorBase = '-mx-1 my-1 h-px bg-border'
