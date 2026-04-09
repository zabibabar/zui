/**
 * Shared class fragments for popover-like surfaces and menu/list content.
 * Keep these internal so component variants stay aligned over time.
 */
export const overlaySurfaceBase = [
  'rounded-md border border-border bg-popover',
  'text-popover-foreground',
] as const

export const overlayInteractiveItemBase = [
  'relative flex cursor-pointer select-none items-center rounded-sm text-sm outline-none',
  'focus:bg-muted focus:text-foreground',
  'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
] as const

export const overlayLabelBase = 'px-2 py-1.5 text-xs font-semibold text-muted-foreground'

export const overlaySeparatorBase = '-mx-1 my-1 h-px bg-border'
