import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '../button'
import { Typography } from '../typography'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './card'

const meta = {
  title: 'Components/Card',
  component: Card,
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>Title</CardTitle>
        <CardDescription>Description using muted foreground.</CardDescription>
      </CardHeader>
      <CardContent>
        <Typography variant="body2">Content</Typography>
      </CardContent>
      <CardFooter className="justify-end gap-2">
        <Button variant="outline" color="neutral" size="sm">
          Cancel
        </Button>
        <Button size="sm">OK</Button>
      </CardFooter>
    </Card>
  ),
}
