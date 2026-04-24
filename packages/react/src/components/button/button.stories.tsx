import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './button'

const meta = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'outline', 'ghost', 'link'],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'danger', 'info', 'success', 'warning', 'neutral'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    disabled: { control: 'boolean' },
  },
  args: {
    children: 'Button',
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Solid: Story = {
  args: { variant: 'solid' },
}

export const Outline: Story = {
  args: { variant: 'outline' },
}

export const Ghost: Story = {
  args: { variant: 'ghost' },
}

export const Link: Story = {
  args: { variant: 'link' },
}

export const Danger: Story = {
  args: { color: 'danger' },
}

export const Secondary: Story = {
  args: { color: 'secondary' },
}

export const Info: Story = {
  args: { color: 'info' },
}

export const Success: Story = {
  args: { color: 'success' },
}

export const Warning: Story = {
  args: { color: 'warning' },
}

export const Neutral: Story = {
  args: { color: 'neutral' },
}

export const Disabled: Story = {
  args: { disabled: true },
}

const VARIANTS = ['solid', 'outline', 'ghost', 'link'] as const
const COLORS = ['primary', 'secondary', 'danger', 'info', 'success', 'warning', 'neutral'] as const
const SIZES = ['xs', 'sm', 'md', 'lg', 'xl'] as const

export const AllVariantsByColor: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      {VARIANTS.map((variant) => (
        <div key={variant}>
          <p className="mb-2 text-sm font-medium text-muted-foreground capitalize">{variant}</p>
          <div className="flex flex-wrap items-center gap-2">
            {COLORS.map((color) => (
              <Button key={color} variant={variant} color={color}>
                {color}
              </Button>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-end gap-3">
      {SIZES.map((size) => (
        <Button key={size} size={size}>
          {size.toUpperCase()}
        </Button>
      ))}
    </div>
  ),
}

export const AllSizesOutline: Story = {
  render: () => (
    <div className="flex flex-wrap items-end gap-3">
      {SIZES.map((size) => (
        <Button key={size} variant="outline" size={size}>
          {size.toUpperCase()}
        </Button>
      ))}
    </div>
  ),
}
