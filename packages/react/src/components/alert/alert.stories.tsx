import type { Meta, StoryObj } from '@storybook/react'
import { Alert, AlertDescription, AlertTitle } from './alert'

const meta = {
  title: 'Components/Alert',
  component: Alert,
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<typeof meta>

export const Info: Story = {
  args: {
    intent: 'info',
    icon: <span aria-hidden>ℹ</span>,
    children: (
      <>
        <AlertTitle>Info</AlertTitle>
        <AlertDescription>Description text.</AlertDescription>
      </>
    ),
  },
}

export const AllIntents: Story = {
  args: { intent: 'info' },
  render: () => (
    <div className="flex max-w-xl flex-col gap-3">
      {(['info', 'success', 'warning', 'danger'] as const).map((intent) => (
        <Alert key={intent} intent={intent} icon={<span aria-hidden>●</span>}>
          <AlertTitle>{intent}</AlertTitle>
          <AlertDescription>Supporting copy for {intent}.</AlertDescription>
        </Alert>
      ))}
    </div>
  ),
}
