import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Toggle } from './toggle'

const meta = {
  title: 'Components/Toggle',
  component: Toggle,
  tags: ['autodocs'],
} satisfies Meta<typeof Toggle>

export default meta
type Story = StoryObj<typeof meta>

function ToggleDemo() {
  const [on, setOn] = useState(false)
  return (
    <Toggle pressed={on} onPressedChange={setOn} aria-label="Toggle">
      {on ? 'On' : 'Off'}
    </Toggle>
  )
}

export const Default: Story = {
  render: () => <ToggleDemo />,
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Toggle size="sm" aria-label="Small">
        SM
      </Toggle>
      <Toggle size="default" aria-label="Default">
        MD
      </Toggle>
      <Toggle size="lg" aria-label="Large">
        LG
      </Toggle>
    </div>
  ),
}
