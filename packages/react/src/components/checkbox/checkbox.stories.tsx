import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Checkbox } from './checkbox'

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

function CheckboxDemo() {
  const [checked, setChecked] = useState(false)
  return (
    <label className="flex items-center gap-2 text-sm">
      <Checkbox checked={checked} onCheckedChange={(value) => setChecked(value === true)} />
      Enable notifications
    </label>
  )
}

export const Default: Story = {
  render: () => <CheckboxDemo />,
}

export const Disabled: Story = {
  render: () => (
    <label className="flex items-center gap-2 text-sm text-muted-foreground">
      <Checkbox disabled checked />
      Disabled checked
    </label>
  ),
}
