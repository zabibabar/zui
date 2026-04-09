import { tv } from 'tailwind-variants'

export const typographyVariants = tv({
  base: 'text-foreground',
  variants: {
    variant: {
      h1: ['text-2xl font-bold tracking-tight', 'sm:text-3xl'],
      h2: ['text-xl font-semibold tracking-tight', 'sm:text-2xl'],
      h3: ['text-lg font-semibold tracking-tight'],
      h4: ['text-base font-semibold tracking-tight'],
      h5: ['text-sm font-semibold tracking-tight'],
      h6: ['text-xs font-semibold tracking-tight'],
      subtitle1: ['text-lg font-normal'],
      subtitle2: ['text-sm font-medium'],
      body1: ['text-base font-normal'],
      body2: ['text-sm font-normal'],
      caption: ['text-xs font-normal'],
      overline: ['text-xs font-normal uppercase tracking-widest'],
      button: ['text-sm leading-none font-medium'],
    },
    tone: {
      default: '',
      muted: 'text-muted-foreground',
      primary: 'text-primary',
      danger: 'text-danger',
    },
  },
  defaultVariants: {
    variant: 'body2',
    tone: 'default',
  },
})

export const typographyWeightClasses = {
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
} as const

export type TypographyWeight = keyof typeof typographyWeightClasses
