import type { PlaygroundAppearance } from './build-theme-css'
import type { PlaygroundThemeState } from './theme-state'
import { Separator, toast, Toaster } from '@zui/react'
import tailwindThemeCss from '@zui/web/tailwind-theme.css?raw'
import { useEffect, useMemo, useState } from 'react'
import { buildThemeCss } from './build-theme-css'
import { exportThemeBundle } from './export-theme'
import { PlaygroundMockPreview } from './PlaygroundMockPreview'
import { PlaygroundThemeSidebar } from './PlaygroundThemeSidebar'
import { DEFAULT_PLAYGROUND_PRESET_ID, getPlaygroundPresetState } from './preset-themes'
import { defaultPlaygroundThemeState } from './theme-state'

function themeStatesEqual(a: PlaygroundThemeState, b: PlaygroundThemeState): boolean {
  return JSON.stringify(a) === JSON.stringify(b)
}

export function PlaygroundApp() {
  const [appearance, setAppearance] = useState<PlaygroundAppearance>('light')
  const [themeState, setThemeState] = useState<PlaygroundThemeState>(() =>
    defaultPlaygroundThemeState(),
  )
  const [selectedPresetId, setSelectedPresetId] = useState<string>(DEFAULT_PLAYGROUND_PRESET_ID)
  const [isExporting, setIsExporting] = useState(false)

  const themeCss = useMemo(() => buildThemeCss(themeState), [themeState])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', appearance)
  }, [appearance])

  useEffect(() => {
    document.documentElement.style.setProperty('--density', themeState.density)
  }, [themeState.density])

  useEffect(() => {
    document.documentElement.style.setProperty('--radius', themeState.radius)
  }, [themeState.radius])

  useEffect(() => {
    const el =
      document.getElementById('zui-runtime-theme') ??
      (() => {
        const s = document.createElement('style')
        s.id = 'zui-runtime-theme'
        document.head.appendChild(s)
        return s
      })()
    el.textContent = themeCss
  }, [themeCss])

  const handleSelectPreset = (id: string) => {
    if (id === 'custom') return

    setSelectedPresetId(id)
    setThemeState(getPlaygroundPresetState(id))
  }

  const handleThemeChange = (next: PlaygroundThemeState) => {
    setThemeState(next)
    if (selectedPresetId === 'custom') return

    const presetState = getPlaygroundPresetState(selectedPresetId)
    if (!themeStatesEqual(next, presetState)) setSelectedPresetId('custom')
  }

  const handleReset = () => {
    setSelectedPresetId(DEFAULT_PLAYGROUND_PRESET_ID)
    setThemeState(defaultPlaygroundThemeState())
    setAppearance('light')
  }

  const handleExport = () => {
    if (isExporting) return

    setIsExporting(true)
    try {
      exportThemeBundle({
        themeCss,
        tailwindThemeCss,
      })
      toast.success('Theme bundle exported')
    } catch {
      toast.error('Failed to export theme bundle')
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <>
      <Toaster richColors position="top-center" />
      <div className="flex h-screen min-h-0 flex-col bg-background font-sans text-foreground">
        <div className="flex min-h-0 flex-1">
          <aside className="flex w-[min(100%,380px)] shrink-0 flex-col">
            <PlaygroundThemeSidebar
              state={themeState}
              onChange={handleThemeChange}
              selectedPresetId={selectedPresetId}
              onSelectPreset={handleSelectPreset}
            />
          </aside>

          <div className="flex min-w-0 flex-1 flex-col">
            <header className="flex shrink-0 flex-wrap items-center gap-3 border-b border-border bg-card px-4 py-3">
              <span className="text-sm font-semibold">ZUI Playground</span>
              <Separator orientation="vertical" className="h-6" />
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setAppearance(appearance === 'light' ? 'dark' : 'light')}
                  className="rounded-md border border-border bg-background px-3 py-1.5 text-sm font-medium"
                >
                  {appearance === 'light' ? 'Dark' : 'Light'} mode
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="rounded-md border border-border bg-background px-3 py-1.5 text-sm font-medium"
                >
                  Reset
                </button>
                <button
                  type="button"
                  onClick={() => {
                    void handleExport()
                  }}
                  disabled={isExporting}
                  className="rounded-md border border-border bg-background px-3 py-1.5 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isExporting ? 'Exporting...' : 'Export'}
                </button>
              </div>
              {selectedPresetId === 'custom' && (
                <span className="ml-auto text-xs text-muted-foreground">Custom theme</span>
              )}
            </header>

            <main className="min-h-0 flex-1 overflow-auto p-6 md:p-8">
              <PlaygroundMockPreview />
            </main>
          </div>
        </div>
      </div>
    </>
  )
}
