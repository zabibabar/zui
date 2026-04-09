import type { Meta, StoryObj } from '@storybook/react'
import { toast } from 'sonner'
import { Button } from '../button/button'

const meta = {
  title: 'Components/Sonner',
  tags: ['autodocs'],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Triggers: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Button type="button" size="sm" onClick={() => toast.success('Saved successfully')}>
        Success
      </Button>
      <Button
        type="button"
        size="sm"
        variant="outline"
        color="neutral"
        onClick={() => toast.error('Something went wrong')}
      >
        Error
      </Button>
      <Button
        type="button"
        size="sm"
        variant="outline"
        color="neutral"
        onClick={() => toast.message('Update', { description: 'Secondary line of text.' })}
      >
        Default
      </Button>
    </div>
  ),
}
