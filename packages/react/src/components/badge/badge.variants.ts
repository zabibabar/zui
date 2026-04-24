import { tv } from 'tailwind-variants'

export const badgeVariants = tv({
  base: 'inline-flex items-center justify-center gap-badge-gap rounded-badge border px-badge-x py-badge-y text-badge font-badge whitespace-nowrap',
  variants: {
    variant: {
      solid: 'border-transparent',
      soft: 'border-transparent',
      outline: 'bg-transparent',
    },
    color: {
      primary: '',
      secondary: '',
      danger: '',
      info: '',
      success: '',
      warning: '',
      neutral: '',
    },
  },
  compoundVariants: [
    {
      variant: 'solid',
      color: 'primary',
      class: 'bg-primary text-primary-foreground',
    },
    {
      variant: 'solid',
      color: 'secondary',
      class: 'bg-secondary text-secondary-foreground',
    },
    {
      variant: 'solid',
      color: 'danger',
      class: 'bg-danger text-danger-foreground',
    },
    {
      variant: 'solid',
      color: 'info',
      class: 'bg-info text-info-foreground',
    },
    {
      variant: 'solid',
      color: 'success',
      class: 'bg-success text-success-foreground',
    },
    {
      variant: 'solid',
      color: 'warning',
      class: 'bg-warning text-warning-foreground',
    },
    {
      variant: 'solid',
      color: 'neutral',
      class: 'bg-neutral text-neutral-foreground',
    },
    {
      variant: 'soft',
      color: 'primary',
      class: 'bg-primary-subtle text-foreground',
    },
    {
      variant: 'soft',
      color: 'secondary',
      class: 'bg-secondary-subtle text-secondary-subtle-foreground',
    },
    {
      variant: 'soft',
      color: 'danger',
      class: 'bg-danger-subtle text-foreground',
    },
    {
      variant: 'soft',
      color: 'info',
      class: 'bg-info-subtle text-foreground',
    },
    {
      variant: 'soft',
      color: 'success',
      class: 'bg-success-subtle text-foreground',
    },
    {
      variant: 'soft',
      color: 'warning',
      class: 'bg-warning-subtle text-foreground',
    },
    {
      variant: 'soft',
      color: 'neutral',
      class: 'bg-neutral-subtle text-neutral-subtle-foreground',
    },
    {
      variant: 'outline',
      color: 'primary',
      class: 'border border-primary-border text-primary',
    },
    {
      variant: 'outline',
      color: 'secondary',
      class: 'border border-secondary-border text-secondary',
    },
    {
      variant: 'outline',
      color: 'danger',
      class: 'border border-danger-border text-danger',
    },
    {
      variant: 'outline',
      color: 'info',
      class: 'border border-info-border text-info',
    },
    {
      variant: 'outline',
      color: 'success',
      class: 'border border-success-border text-success',
    },
    {
      variant: 'outline',
      color: 'warning',
      class: 'border border-warning-border text-warning',
    },
    {
      variant: 'outline',
      color: 'neutral',
      class: 'border border-neutral-border text-neutral',
    },
  ],
  defaultVariants: {
    variant: 'solid',
    color: 'primary',
  },
})
