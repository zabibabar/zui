import type { Meta, StoryObj } from '@storybook/react'
import { Skeleton } from './skeleton'

const meta = {
  title: 'Components/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
} satisfies Meta<typeof Skeleton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Skeleton className="size-12 shrink-0 rounded-full" />
      <div className="grow space-y-2">
        <Skeleton className="h-4 w-4/5 max-w-[220px]" />
        <Skeleton className="h-3 w-3/5 max-w-[160px]" />
      </div>
    </div>
  ),
}
