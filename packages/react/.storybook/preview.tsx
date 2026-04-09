import type { Decorator, Preview } from '@storybook/react'
import * as React from 'react'
import { useEffect } from 'react'

import { Toaster } from '../src/components/sonner/toaster'
import '@zui/web/tailwind-theme.css'
import '@zui/web/styles/example-theme.css'
import '../src/styles/react.css'

const THEMES = ['light', 'dark'] as const
const DENSITIES = [
  { name: 'Compact', value: '0.85' },
  { name: 'Normal', value: '1' },
  { name: 'Relaxed', value: '1.15' },
] as const

function ThemeProvider({
  theme,
  density,
  children,
}: {
  theme: string
  density: string
  children: React.ReactNode
}) {
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    document.documentElement.style.setProperty('--density', density)
  }, [theme, density])

  return <>{children}</>
}

const withTheme: Decorator = (Story, context) => {
  const theme = (context.globals.theme as string) || 'light'
  const density = (context.globals.density as string) || '1'

  return (
    <ThemeProvider theme={theme} density={density}>
      <Toaster richColors position="top-center" />
      <Story />
    </ThemeProvider>
  )
}

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Theme',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: THEMES.map((t) => ({ value: t, title: t.charAt(0).toUpperCase() + t.slice(1) })),
        dynamicTitle: true,
      },
    },
    density: {
      description: 'Density',
      toolbar: {
        title: 'Density',
        icon: 'component',
        items: DENSITIES.map((d) => ({ value: d.value, title: d.name })),
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'light',
    density: '1',
  },
  decorators: [withTheme],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
