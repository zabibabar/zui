import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '../button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from './drawer'

const meta = {
  title: 'Components/Drawer',
  component: Drawer,
} satisfies Meta<typeof Drawer>

export default meta
type Story = StoryObj<typeof meta>

export const Right: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" color="neutral">
          Open drawer
        </Button>
      </DrawerTrigger>
      <DrawerContent side="right">
        <DrawerHeader>
          <DrawerTitle>Drawer</DrawerTitle>
          <DrawerDescription>Slides from the right.</DrawerDescription>
        </DrawerHeader>
        <DrawerClose asChild>
          <Button className="mt-auto w-full" variant="outline" color="neutral">
            Close
          </Button>
        </DrawerClose>
      </DrawerContent>
    </Drawer>
  ),
}

export const Left: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" color="neutral">
          From left
        </Button>
      </DrawerTrigger>
      <DrawerContent side="left">
        <DrawerHeader>
          <DrawerTitle>Left drawer</DrawerTitle>
          <DrawerDescription>Slides from the left.</DrawerDescription>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  ),
}
