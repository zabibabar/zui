import { tv } from 'tailwind-variants'
import { fieldControlBase } from '../../styles/overlay-classes'

export const textareaVariants = tv({
  base: [
    'flex min-h-textarea w-full rounded-textarea border border-input bg-background',
    'px-textarea-x py-textarea-y',
    'text-textarea text-foreground',
    'placeholder:text-muted-foreground',
    'hover:bg-muted/20',
    ...fieldControlBase,
  ],
})
