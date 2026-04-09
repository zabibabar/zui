import type { Meta, StoryObj } from '@storybook/react'
import { Input } from '../input/input'
import { Label } from './label'

const meta = {
  title: 'Components/Label',
  component: Label,
  tags: ['autodocs'],
} satisfies Meta<typeof Label>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="flex max-w-sm flex-col gap-2">
      <Label htmlFor="story-label-email">Email</Label>
      <Input id="story-label-email" type="email" placeholder="you@example.com" />
    </div>
  ),
}
