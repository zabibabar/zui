import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Slider } from './slider'

const meta = {
  title: 'Components/Slider',
  component: Slider,
  tags: ['autodocs'],
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

function SliderControlled() {
  const [v, setV] = useState([40])
  return (
    <div className="w-full max-w-xs space-y-2">
      <Slider value={v} onValueChange={setV} max={100} step={1} />
      <p className="text-sm text-muted-foreground tabular-nums">{v[0]}</p>
    </div>
  )
}

export const Default: Story = {
  render: () => <SliderControlled />,
}
