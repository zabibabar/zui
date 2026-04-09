import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '../button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip'

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
} satisfies Meta<typeof Tooltip>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" color="neutral">
            Hover me
          </Button>
        </TooltipTrigger>
        <TooltipContent>Quick action details</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
}
