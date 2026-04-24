import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from './badge'

const meta = {
  title: 'Components/Badge',
  component: Badge,
  argTypes: {
    variant: { control: 'select', options: ['solid', 'soft', 'outline'] },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'danger', 'info', 'success', 'warning', 'neutral'],
    },
  },
  args: { children: 'Badge' },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const AllColors: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      {(['primary', 'secondary', 'danger', 'info', 'success', 'warning', 'neutral'] as const).map(
        (c) => (
          <Badge key={c} color={c}>
            {c}
          </Badge>
        ),
      )}
    </div>
  ),
}
