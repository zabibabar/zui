import { tv } from 'tailwind-variants'

export const typographyVariants = tv({
  base: 'text-foreground',
  variants: {
    variant: {
      h1: [
        'text-typography-h1 font-typography-h1 tracking-typography-h1',
        'sm:text-typography-h1-resp',
      ],
      h2: [
        'text-typography-h2 font-typography-h2 tracking-typography-h2',
        'sm:text-typography-h2-resp',
      ],
      h3: ['text-typography-h3 font-typography-h3 tracking-typography-h3'],
      h4: ['text-typography-h4 font-typography-h4 tracking-typography-h4'],
      h5: ['text-typography-h5 font-typography-h5 tracking-typography-h5'],
      h6: ['text-typography-h6 font-typography-h6 tracking-typography-h6'],
      subtitle1: ['text-typography-subtitle1 font-typography-subtitle1'],
      subtitle2: ['text-typography-subtitle2 font-typography-subtitle2'],
      body1: ['text-typography-body1 font-typography-body1'],
      body2: ['text-typography-body2 font-typography-body2'],
      caption: ['text-typography-caption font-typography-caption'],
      overline: [
        'text-typography-overline font-typography-overline uppercase tracking-typography-overline',
      ],
      button: ['text-typography-button leading-none font-typography-button'],
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
