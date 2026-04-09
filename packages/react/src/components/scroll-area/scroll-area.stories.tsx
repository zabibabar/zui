import type { Meta, StoryObj } from '@storybook/react'
import { ScrollArea } from './scroll-area'

const meta = {
  title: 'Components/ScrollArea',
  component: ScrollArea,
  tags: ['autodocs'],
} satisfies Meta<typeof ScrollArea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <ScrollArea className="h-36 w-full max-w-sm rounded-md border border-border">
      <div className="p-4 text-sm text-muted-foreground">
        {Array.from({ length: 24 }, (_, i) => (
          <p key={i} className="py-1">
            Line {i + 1} — scroll inside the bordered region.
          </p>
        ))}
      </div>
    </ScrollArea>
  ),
}
