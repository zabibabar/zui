import { tv } from 'tailwind-variants'

export const commandRootVariants = tv({
  base: [
    'flex h-full w-full flex-col overflow-hidden rounded-command-root',
    'bg-popover text-popover-foreground',
  ],
})

export const commandInputVariants = tv({
  base: [
    'flex h-command-input w-full border-b border-border bg-transparent px-command-input-x py-command-input-y text-command-input',
    'text-foreground outline-none',
    'placeholder:text-muted-foreground',
  ],
})

export const commandListVariants = tv({
  base: 'max-h-[min(var(--max-height-command-list),50vh)] overflow-y-auto overflow-x-hidden p-command-list',
})

export const commandEmptyVariants = tv({
  base: 'py-command-empty-y text-center text-command-empty text-muted-foreground',
})

export const commandGroupVariants = tv({
  base: [
    'overflow-hidden px-1 text-foreground',
    '[&_[cmdk-group-heading]]:px-command-group-heading-x [&_[cmdk-group-heading]]:py-command-group-heading-y [&_[cmdk-group-heading]]:text-command-group-heading [&_[cmdk-group-heading]]:font-command-group-heading [&_[cmdk-group-heading]]:text-muted-foreground',
  ],
})

export const commandItemVariants = tv({
  base: [
    'relative flex cursor-pointer select-none items-center rounded-command-item px-command-item-x py-command-item-y text-command-item outline-none',
    'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
    'aria-selected:bg-muted aria-selected:text-foreground',
  ],
})

export const commandSeparatorVariants = tv({
  base: '-mx-1 my-1 h-px bg-border',
})

export const commandShortcutVariants = tv({
  base: 'ml-auto text-command-shortcut tracking-command-shortcut text-muted-foreground',
})
