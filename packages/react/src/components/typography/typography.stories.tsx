import type { Meta, StoryObj } from '@storybook/react'
import { Typography } from './typography'

const meta = {
  title: 'Components/Typography',
  component: Typography,
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'subtitle1',
        'subtitle2',
        'body1',
        'body2',
        'caption',
        'overline',
        'button',
      ],
    },
    tone: {
      control: 'select',
      options: ['default', 'muted', 'primary', 'danger'],
    },
    weight: {
      control: 'select',
      options: [undefined, 'normal', 'medium', 'semibold', 'bold'],
    },
  },
  args: {
    children: 'The quick brown fox jumps over the lazy dog.',
    variant: 'body2',
  },
} satisfies Meta<typeof Typography>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Headings: Story = {
  render: () => (
    <div className="space-y-2">
      <Typography variant="h1">h1 — Page title</Typography>
      <Typography variant="h2">h2 — Section</Typography>
      <Typography variant="h3">h3 — Subsection</Typography>
      <Typography variant="h4">h4 — Group label</Typography>
      <Typography variant="h5">h5 — Small heading</Typography>
      <Typography variant="h6">h6 — Micro heading</Typography>
    </div>
  ),
}

export const BodyAndSubtitles: Story = {
  render: () => (
    <div className="space-y-2">
      <Typography variant="subtitle1">subtitle1 — secondary title</Typography>
      <Typography variant="subtitle2">subtitle2 — smaller subtitle</Typography>
      <Typography variant="body1">body1 — primary body</Typography>
      <Typography variant="body2">body2 — dense body</Typography>
      <Typography variant="caption">caption — fine print</Typography>
      <Typography variant="overline">overline — label</Typography>
      <Typography variant="button">button — control label</Typography>
    </div>
  ),
}

export const Tones: Story = {
  render: () => (
    <div className="space-y-2">
      <Typography variant="body2" tone="default">
        Default foreground
      </Typography>
      <Typography variant="body2" tone="muted">
        Muted
      </Typography>
      <Typography variant="body2" tone="primary">
        Primary
      </Typography>
      <Typography variant="body2" tone="danger">
        Danger
      </Typography>
    </div>
  ),
}

export const PolymorphicAs: Story = {
  render: () => (
    <Typography variant="h2" as="p" className="border border-dashed p-2">
      Renders as &lt;p&gt; with h2 styles (use for accessible heading order).
    </Typography>
  ),
}

export const WeightOverride: Story = {
  args: {
    variant: 'body2',
    weight: 'semibold',
    children: 'body2 with semibold override',
  },
}
