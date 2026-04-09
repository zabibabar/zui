import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Button } from '../button/button'
import { Popover, PopoverContent, PopoverTrigger } from '../popover/popover'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './command'

const frameworks = ['Next.js', 'Remix', 'SvelteKit', 'Nuxt']

function ComboboxStory() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('')

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" color="neutral" className="w-[220px] justify-between font-normal">
          {value || 'Select framework…'}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
        <Command>
          <CommandInput placeholder="Search…" />
          <CommandList>
            <CommandEmpty>No results.</CommandEmpty>
            <CommandGroup heading="Suggested">
              {frameworks.map((f) => (
                <CommandItem
                  key={f}
                  value={f}
                  onSelect={(v) => {
                    const picked = frameworks.find((x) => x.toLowerCase() === v.toLowerCase()) ?? v
                    setValue(picked === value ? '' : picked)
                    setOpen(false)
                  }}
                >
                  {f}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

const meta = {
  title: 'Components/Command',
  component: Command,
  tags: ['autodocs'],
} satisfies Meta<typeof Command>

export default meta
type Story = StoryObj<typeof meta>

export const Inline: Story = {
  render: () => (
    <Command className="border border-border shadow-md">
      <CommandInput placeholder="Type a command…" />
      <CommandList>
        <CommandEmpty>No results.</CommandEmpty>
        <CommandGroup heading="Actions">
          <CommandItem>Profile</CommandItem>
          <CommandItem>Settings</CommandItem>
          <CommandItem>Log out</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
}

export const Combobox: Story = {
  render: () => <ComboboxStory />,
}
