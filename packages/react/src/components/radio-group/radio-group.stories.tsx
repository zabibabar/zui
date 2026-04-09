import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { RadioGroup, RadioGroupItem } from './radio-group'

const meta = {
  title: 'Components/Radio Group',
  component: RadioGroup,
} satisfies Meta<typeof RadioGroup>

export default meta
type Story = StoryObj<typeof meta>

function RadioGroupDemo() {
  const [value, setValue] = useState('standard')
  return (
    <RadioGroup value={value} onValueChange={setValue}>
      {['standard', 'pro', 'enterprise'].map((option) => (
        <label key={option} className="flex items-center gap-2 text-sm capitalize">
          <RadioGroupItem value={option} />
          {option}
        </label>
      ))}
    </RadioGroup>
  )
}

export const Default: Story = {
  render: () => <RadioGroupDemo />,
}
