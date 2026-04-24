import { tv } from 'tailwind-variants'

export const buttonVariants = tv({
  base: [
    'inline-flex items-center justify-center gap-btn-gap',
    'font-btn whitespace-nowrap',
    'transition-[background-color,border-color,color,box-shadow,transform] duration-150',
    'focus-visible:outline-2 focus-visible:outline-offset-2',
    'active:translate-y-px',
    'disabled:cursor-not-allowed disabled:opacity-50 disabled:active:translate-y-0',
    'cursor-pointer',
  ],
  variants: {
    variant: {
      solid: 'shadow-sm hover:shadow-md',
      outline: 'bg-background shadow-xs hover:shadow-sm',
      ghost: [],
      link: ['underline-offset-4', 'hover:underline', 'p-0', 'h-auto'],
    },
    color: {
      primary: 'focus-visible:outline-primary',
      secondary: 'focus-visible:outline-secondary',
      danger: 'focus-visible:outline-danger',
      info: 'focus-visible:outline-info',
      success: 'focus-visible:outline-success',
      warning: 'focus-visible:outline-warning',
      neutral: 'focus-visible:outline-neutral',
    },
    size: {
      xs: 'h-btn-xs px-btn-xs-x text-btn-xs rounded-btn-xs',
      sm: 'h-btn-sm px-btn-sm-x text-btn-sm rounded-btn-sm',
      md: 'h-btn-md px-btn-md-x text-btn-md rounded-btn-md',
      lg: 'h-btn-lg px-btn-lg-x text-btn-lg rounded-btn-lg',
      xl: 'h-btn-xl px-btn-xl-x text-btn-xl rounded-btn-xl',
    },
  },
  compoundVariants: [
    {
      variant: 'solid',
      color: 'primary',
      class: 'bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-active',
    },
    {
      variant: 'solid',
      color: 'secondary',
      class:
        'bg-secondary text-secondary-foreground hover:bg-secondary-hover active:bg-secondary-active',
    },
    {
      variant: 'solid',
      color: 'danger',
      class: 'bg-danger text-danger-foreground hover:bg-danger-hover active:bg-danger-active',
    },
    {
      variant: 'solid',
      color: 'info',
      class: 'bg-info text-info-foreground hover:bg-info-hover active:bg-info-active',
    },
    {
      variant: 'solid',
      color: 'success',
      class: 'bg-success text-success-foreground hover:bg-success-hover active:bg-success-active',
    },
    {
      variant: 'solid',
      color: 'warning',
      class: 'bg-warning text-warning-foreground hover:bg-warning-hover active:bg-warning-active',
    },
    {
      variant: 'solid',
      color: 'neutral',
      class: 'bg-neutral text-neutral-foreground hover:bg-neutral-hover active:bg-neutral-active',
    },
    {
      variant: 'outline',
      color: 'primary',
      class:
        'border border-primary-border text-primary hover:bg-primary-subtle active:bg-primary-subtle/80',
    },
    {
      variant: 'outline',
      color: 'secondary',
      class:
        'border border-secondary-border text-secondary hover:bg-secondary-subtle active:bg-secondary-subtle/80',
    },
    {
      variant: 'outline',
      color: 'danger',
      class:
        'border border-danger-border text-danger hover:bg-danger-subtle active:bg-danger-subtle/80',
    },
    {
      variant: 'outline',
      color: 'info',
      class: 'border border-info-border text-info hover:bg-info-subtle active:bg-info-subtle/80',
    },
    {
      variant: 'outline',
      color: 'success',
      class:
        'border border-success-border text-success hover:bg-success-subtle active:bg-success-subtle/80',
    },
    {
      variant: 'outline',
      color: 'warning',
      class:
        'border border-warning-border text-warning hover:bg-warning-subtle active:bg-warning-subtle/80',
    },
    {
      variant: 'outline',
      color: 'neutral',
      class:
        'border border-neutral-border text-neutral hover:bg-neutral-subtle active:bg-neutral-subtle/80',
    },
    {
      variant: 'ghost',
      color: 'primary',
      class: 'text-primary hover:bg-primary-subtle active:bg-primary-subtle/80',
    },
    {
      variant: 'ghost',
      color: 'secondary',
      class: 'text-secondary hover:bg-secondary-subtle active:bg-secondary-subtle/80',
    },
    {
      variant: 'ghost',
      color: 'danger',
      class: 'text-danger hover:bg-danger-subtle active:bg-danger-subtle/80',
    },
    {
      variant: 'ghost',
      color: 'info',
      class: 'text-info hover:bg-info-subtle active:bg-info-subtle/80',
    },
    {
      variant: 'ghost',
      color: 'success',
      class: 'text-success hover:bg-success-subtle active:bg-success-subtle/80',
    },
    {
      variant: 'ghost',
      color: 'warning',
      class: 'text-warning hover:bg-warning-subtle active:bg-warning-subtle/80',
    },
    {
      variant: 'ghost',
      color: 'neutral',
      class: 'text-neutral hover:bg-neutral-subtle active:bg-neutral-subtle/80',
    },
    { variant: 'link', color: 'primary', class: 'text-primary' },
    { variant: 'link', color: 'secondary', class: 'text-secondary' },
    { variant: 'link', color: 'danger', class: 'text-danger' },
    { variant: 'link', color: 'info', class: 'text-info' },
    { variant: 'link', color: 'success', class: 'text-success' },
    { variant: 'link', color: 'warning', class: 'text-warning' },
    { variant: 'link', color: 'neutral', class: 'text-neutral' },
  ],
  defaultVariants: {
    variant: 'solid',
    color: 'primary',
    size: 'md',
  },
})
