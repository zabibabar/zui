import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '../button'
import { Toolbar } from './toolbar'

const meta = {
  title: 'Components/Toolbar',
  component: Toolbar,
} satisfies Meta<typeof Toolbar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Toolbar>
      <Button size="sm" variant="outline" color="neutral">
        One
      </Button>
      <Button size="sm" variant="outline" color="neutral">
        Two
      </Button>
      <Button size="sm">Primary</Button>
    </Toolbar>
  ),
}
