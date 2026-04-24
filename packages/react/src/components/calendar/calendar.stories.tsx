import type { Meta, StoryObj } from '@storybook/react'
import type { DateRange } from 'react-day-picker'
import { useState } from 'react'
import { Calendar } from './calendar'

const meta = {
  title: 'Components/Calendar',
  component: Calendar,
  tags: ['autodocs'],
} satisfies Meta<typeof Calendar>

export default meta
type Story = StoryObj<typeof meta>

function CalendarSingle() {
  const [selected, setSelected] = useState<Date | undefined>(undefined)
  return <Calendar mode="single" selected={selected} onSelect={setSelected} />
}

export const Single: Story = {
  render: () => <CalendarSingle />,
}

function CalendarRange() {
  const [range, setRange] = useState<DateRange | undefined>(undefined)
  return <Calendar mode="range" selected={range} onSelect={setRange} numberOfMonths={1} />
}

export const Range: Story = {
  render: () => <CalendarRange />,
}
