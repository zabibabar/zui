import { tv } from 'tailwind-variants'
import { fieldControlBase } from '../../styles/overlay-classes'

export const inputVariants = tv({
  base: [
    'flex w-full min-h-input-field rounded-input-field border border-input',
    'bg-background px-input-field-x py-input-field-y',
    'text-input-field text-foreground',
    'placeholder:text-muted-foreground',
    'hover:bg-muted/20',
    ...fieldControlBase,
  ],
})
