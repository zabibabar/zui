import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '../button'
import { Input } from '../input'
import { Popover, PopoverContent, PopoverTrigger } from './popover'

const meta = {
  title: 'Components/Popover',
  component: Popover,
} satisfies Meta<typeof Popover>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" color="neutral">
          Open popover
        </Button>
      </PopoverTrigger>
      <PopoverContent className="space-y-2">
        <p className="text-sm font-medium">Quick edit</p>
        <Input defaultValue="https://zui.dev" />
      </PopoverContent>
    </Popover>
  ),
}
