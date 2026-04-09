import { tv } from 'tailwind-variants'

export const commandRootVariants = tv({
  base: [
    'flex h-full w-full flex-col overflow-hidden rounded-md',
    'bg-popover text-popover-foreground',
  ],
})

export const commandInputVariants = tv({
  base: [
    'flex h-10 w-full border-b border-border bg-transparent px-3 py-2 text-sm',
    'text-foreground outline-none',
    'placeholder:text-muted-foreground',
  ],
})

export const commandListVariants = tv({
  base: 'max-h-[min(18rem,50vh)] overflow-y-auto overflow-x-hidden p-1',
})

export const commandEmptyVariants = tv({
  base: 'py-6 text-center text-sm text-muted-foreground',
})

export const commandGroupVariants = tv({
  base: 'overflow-hidden px-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground',
})

export const commandItemVariants = tv({
  base: [
    'relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none',
    'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
    'aria-selected:bg-muted aria-selected:text-foreground',
  ],
})

export const commandSeparatorVariants = tv({
  base: '-mx-1 my-1 h-px bg-border',
})

export const commandShortcutVariants = tv({
  base: 'ml-auto text-xs tracking-widest text-muted-foreground',
})
