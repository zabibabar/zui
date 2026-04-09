import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { DatePicker } from './date-picker'

const meta = {
  title: 'Components/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
} satisfies Meta<typeof DatePicker>

export default meta
type Story = StoryObj<typeof meta>

function DatePickerControlled() {
  const [date, setDate] = useState<Date | undefined>(undefined)
  return <DatePicker date={date} onDateChange={setDate} />
}

export const Default: Story = {
  render: () => <DatePickerControlled />,
}
