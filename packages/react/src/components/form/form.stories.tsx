import type { Meta, StoryObj } from '@storybook/react'
import { useForm } from 'react-hook-form'
import { Button } from '../button/button'
import { Input } from '../input/input'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './form'

function FormValidationExample() {
  const form = useForm<{ username: string }>({
    defaultValues: { username: '' },
    mode: 'onChange',
  })

  return (
    <Form {...form}>
      <form className="w-full max-w-sm space-y-4" onSubmit={form.handleSubmit(() => {})}>
        <FormField
          control={form.control}
          name="username"
          rules={{
            required: 'Username is required',
            minLength: { value: 2, message: 'At least 2 characters' },
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="jane.doe" {...field} />
              </FormControl>
              <FormDescription>Visible to your team.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" size="sm">
          Submit
        </Button>
      </form>
    </Form>
  )
}

const meta = {
  title: 'Components/Form',
  component: FormValidationExample,
  tags: ['autodocs'],
} satisfies Meta<typeof FormValidationExample>

export default meta
type Story = StoryObj<typeof meta>

export const WithValidation: Story = {
  render: () => <FormValidationExample />,
}
