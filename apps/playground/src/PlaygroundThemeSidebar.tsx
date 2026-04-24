import type { ColorSeed, FontFamilyName, OklchColor } from '@zui/core'
import type { ColorIntent, PlaygroundThemeState } from './theme-state'
import {
  assignForegrounds,
  generatePalette,
  hexToOklch,
  normalizeHex6,
  oklchToHex,
  presets,
  resolveChrome,
  resolveInk,
  resolveSurfaces,
} from '@zui/core'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Input,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Typography,
} from '@zui/react'
import { useMemo, useState } from 'react'
import { fontOptionsForName } from './font-options'
import { colorSeedFromHex, colorSeedToHex } from './playground-color'
import { PLAYGROUND_PRESET_DEFINITIONS } from './preset-themes'
import { COLOR_INTENTS } from './theme-state'

const PRESET_COLOR_NAMES = Object.keys(presets) as (keyof typeof presets)[]

const HEX6_FOR_PICKER = /^#[\da-f]{6}$/i

const SIDEBAR_SECTIONS: { id: string; label: string; keywords: string }[] = [
  ...COLOR_INTENTS.map((i) => ({
    id: i,
    label: i.charAt(0).toUpperCase() + i.slice(1),
    keywords: i,
  })),
  { id: 'ink', label: 'Ink', keywords: 'ink text foreground' },
  { id: 'surfaces', label: 'Surfaces', keywords: 'surface background card popover' },
  { id: 'chrome', label: 'Chrome', keywords: 'border input ring focus hairline' },
]

function matchesQuery(query: string, section: { label: string; keywords: string }) {
  if (!query.trim()) return true

  const q = query.toLowerCase()
  return section.label.toLowerCase().includes(q) || section.keywords.toLowerCase().includes(q)
}

function RgbColorPicker({
  idPrefix,
  hex,
  onHexChange,
}: {
  idPrefix: string
  hex: string
  onHexChange: (hex: string) => void
}) {
  const safeForPicker = HEX6_FOR_PICKER.test(hex) ? hex : '#888888'

  return (
    <div className="flex flex-wrap items-start gap-3">
      <div
        className="h-12 w-12 shrink-0 rounded-md border border-border shadow-inner"
        style={{ backgroundColor: safeForPicker }}
        aria-hidden
      />
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <label htmlFor={`${idPrefix}-picker`} className="sr-only">
          Color
        </label>
        <input
          id={`${idPrefix}-picker`}
          type="color"
          value={safeForPicker}
          onChange={(e) => {
            try {
              onHexChange(normalizeHex6(e.target.value))
            } catch {
              /* ignore */
            }
          }}
          className="h-10 w-full min-w-0 cursor-pointer rounded border border-border bg-background p-1"
        />
        <HexTextField key={hex} id={`${idPrefix}-hex`} hex={hex} onHexChange={onHexChange} />
      </div>
    </div>
  )
}

function HexTextField({
  id,
  hex,
  onHexChange,
}: {
  id: string
  hex: string
  onHexChange: (hex: string) => void
}) {
  const [draft, setDraft] = useState(hex)

  return (
    <Input
      id={id}
      spellCheck={false}
      value={draft}
      onChange={(e) => {
        setDraft(e.target.value)
      }}
      onFocus={() => setDraft(hex)}
      onBlur={() => {
        try {
          const next = normalizeHex6(draft)
          onHexChange(next)
          setDraft(next)
        } catch {
          setDraft(hex)
        }
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          try {
            const next = normalizeHex6(draft)
            onHexChange(next)
            setDraft(next)
          } catch {
            setDraft(hex)
          }
        }
      }}
      className="font-mono text-xs"
      placeholder="#rrggbb"
    />
  )
}

function fieldClass() {
  return 'rounded border border-border bg-background px-2 py-1.5 text-sm text-foreground'
}

function formatTrackingOffset(value: number) {
  const rounded = Number(value.toFixed(3))
  return `${rounded > 0 ? '+' : ''}${Object.is(rounded, -0) ? 0 : rounded}em`
}

function fontLabel(name: FontFamilyName) {
  switch (name) {
    case 'sans':
      return 'Sans'
    case 'serif':
      return 'Serif'
    case 'mono':
      return 'Monospace'
  }
}

function FontStackSelect({
  name,
  value,
  onChange,
}: {
  name: FontFamilyName
  value: string
  onChange: (next: string) => void
}) {
  const options = fontOptionsForName(name)
  const hasSelectedOption = options.some((option) => option.stack === value)

  return (
    <label className="grid gap-1 text-sm">
      <span className="text-muted-foreground">{fontLabel(name)}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} className={fieldClass()}>
        {!hasSelectedOption && <option value={value}>Custom</option>}
        {options.map((option) => (
          <option key={option.id} value={option.stack}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  )
}

export interface PlaygroundThemeSidebarProps {
  state: PlaygroundThemeState
  onChange: (next: PlaygroundThemeState) => void
  selectedPresetId: string
  onSelectPreset: (id: string) => void
}

export function PlaygroundThemeSidebar({
  state,
  onChange,
  selectedPresetId,
  onSelectPreset,
}: PlaygroundThemeSidebarProps) {
  const [colorQuery, setColorQuery] = useState('')

  const filteredSections = useMemo(
    () => SIDEBAR_SECTIONS.filter((s) => matchesQuery(colorQuery, s)),
    [colorQuery],
  )

  const resolvedInk = useMemo(() => resolveInk(state.ink), [state.ink])
  const surfaceFallbackLight = useMemo(
    () => resolveSurfaces('light', state.surfaces),
    [state.surfaces],
  )

  const chromeResolvedLight = useMemo(() => {
    const inkColors = resolveInk(state.ink)
    const surfaces = resolveSurfaces('light', state.surfaces)
    const primaryPal = assignForegrounds(generatePalette(state.seeds.primary), inkColors)
    return resolveChrome(surfaces, 'light', primaryPal, state.chrome)
  }, [state.seeds.primary, state.surfaces, state.ink, state.chrome])

  const setSeed = (intent: ColorIntent, seed: ColorSeed) => {
    onChange({
      ...state,
      seeds: { ...state.seeds, [intent]: { ...seed } },
    })
  }

  const clearSecondarySeed = () => {
    const seeds = { ...state.seeds }
    delete seeds.secondary
    onChange({ ...state, seeds })
  }

  const setInkField = (key: 'dark' | 'light', color: OklchColor) => {
    onChange({
      ...state,
      ink: { ...state.ink, [key]: color },
    })
  }

  const clearInkField = (key: 'dark' | 'light') => {
    const next = { ...state.ink }
    delete next[key]
    onChange({ ...state, ink: next })
  }

  const clearAllInk = () => {
    onChange({ ...state, ink: {} })
  }

  const setSurfaceField = (key: 'base' | 'raised' | 'overlay', color: OklchColor) => {
    onChange({
      ...state,
      surfaces: { ...state.surfaces, [key]: color },
    })
  }

  const clearSurfaceField = (key: 'base' | 'raised' | 'overlay') => {
    const next = { ...state.surfaces }
    delete next[key]
    onChange({ ...state, surfaces: next })
  }

  const clearAllSurfaces = () => {
    onChange({ ...state, surfaces: {} })
  }

  const setChromeField = (key: 'border' | 'input' | 'ring', color: OklchColor) => {
    onChange({
      ...state,
      chrome: { ...state.chrome, [key]: color },
    })
  }

  const clearChromeField = (key: 'border' | 'input' | 'ring') => {
    const next = { ...state.chrome }
    delete next[key]
    onChange({ ...state, chrome: next })
  }

  const clearAllChrome = () => {
    onChange({ ...state, chrome: {} })
  }

  const setFontStack = (name: FontFamilyName, stack: string) => {
    onChange({
      ...state,
      fonts: { ...state.fonts, [name]: stack },
    })
  }

  const setTrackingOffset = (trackingOffsetEm: number) => {
    onChange({ ...state, trackingOffsetEm })
  }

  const showIntent = (id: string) =>
    COLOR_INTENTS.includes(id as ColorIntent) && filteredSections.some((s) => s.id === id)

  return (
    <div className="flex h-full min-h-0 flex-col border-r border-border bg-card">
      <div className="shrink-0 space-y-3 border-b border-border p-3">
        <label className="grid gap-1">
          <Typography variant="caption" weight="semibold">
            Preset theme
          </Typography>
          <select
            value={selectedPresetId}
            onChange={(e) => onSelectPreset(e.target.value)}
            className={fieldClass()}
          >
            {selectedPresetId === 'custom' && <option value="custom">Custom (edited)</option>}
            {PLAYGROUND_PRESET_DEFINITIONS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <Tabs defaultValue="colors" className="flex min-h-0 flex-1 flex-col">
        <TabsList className="mx-3 mt-3 w-auto shrink-0 justify-start">
          <TabsTrigger value="colors">Colors</TabsTrigger>
          <TabsTrigger value="other">Other</TabsTrigger>
        </TabsList>

        <TabsContent
          value="colors"
          className="mt-0 min-h-0 flex-1 overflow-auto data-[state=inactive]:hidden"
        >
          <div className="p-3 pt-2">
            <Input
              placeholder="Search tokens…"
              value={colorQuery}
              onChange={(e) => setColorQuery(e.target.value)}
              className="mb-3"
            />

            <Accordion type="single" collapsible defaultValue="primary" className="space-y-1">
              {COLOR_INTENTS.map((intent) => {
                if (!showIntent(intent)) return null

                const seed = state.seeds[intent] ?? state.seeds.primary
                return (
                  <AccordionItem key={intent} value={intent}>
                    <AccordionTrigger className="py-2 text-sm">
                      {intent.charAt(0).toUpperCase() + intent.slice(1)}
                    </AccordionTrigger>
                    <AccordionContent className="space-y-3 pb-3">
                      {intent === 'secondary' && (
                        <div className="flex items-start justify-between gap-3">
                          <Typography variant="caption" tone="muted">
                            Optional accent color. Defaults to primary when unset.
                          </Typography>
                          {state.seeds.secondary && (
                            <button
                              type="button"
                              onClick={clearSecondarySeed}
                              className="shrink-0 text-xs text-muted-foreground underline"
                            >
                              Default to primary
                            </button>
                          )}
                        </div>
                      )}
                      <label className="grid gap-1 text-xs">
                        <span className="text-muted-foreground">Curve preset</span>
                        <select
                          value={
                            PRESET_COLOR_NAMES.find(
                              (n) =>
                                presets[n].hue === seed.hue &&
                                presets[n].chroma === seed.chroma &&
                                presets[n].anchorLightness === seed.anchorLightness,
                            ) ?? ''
                          }
                          onChange={(e) => {
                            const v = e.target.value as keyof typeof presets
                            if (v) setSeed(intent, presets[v])
                          }}
                          className={fieldClass()}
                        >
                          <option value="">Custom (RGB)</option>
                          {PRESET_COLOR_NAMES.map((n) => (
                            <option key={n} value={n}>
                              {n}
                            </option>
                          ))}
                        </select>
                      </label>
                      <Typography variant="caption" tone="muted">
                        Picker sets hue, chroma, and anchor lightness; other shades follow the curve
                        from that anchor.
                      </Typography>
                      <RgbColorPicker
                        idPrefix={`intent-${intent}`}
                        hex={colorSeedToHex(seed)}
                        onHexChange={(h) => setSeed(intent, colorSeedFromHex(h))}
                      />
                    </AccordionContent>
                  </AccordionItem>
                )
              })}

              {filteredSections.some((s) => s.id === 'ink') && (
                <AccordionItem value="ink">
                  <AccordionTrigger className="py-2 text-sm">Ink</AccordionTrigger>
                  <AccordionContent className="space-y-4 pb-3">
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={clearAllInk}
                        className="text-xs text-primary underline"
                      >
                        Use defaults (all)
                      </button>
                    </div>
                    {(['dark', 'light'] as const).map((key) => {
                      const effective = state.ink[key] ?? resolvedInk[key]
                      return (
                        <div key={key} className="space-y-2 rounded border border-border p-2">
                          <div className="flex items-center justify-between gap-2">
                            <Typography variant="caption" weight="semibold">
                              {key === 'dark' ? 'Ink dark' : 'Ink light'}
                            </Typography>
                            {state.ink[key] && (
                              <button
                                type="button"
                                onClick={() => clearInkField(key)}
                                className="text-xs text-muted-foreground underline"
                              >
                                Default
                              </button>
                            )}
                          </div>
                          <RgbColorPicker
                            idPrefix={`ink-${key}`}
                            hex={oklchToHex(effective)}
                            onHexChange={(h) => setInkField(key, hexToOklch(h))}
                          />
                        </div>
                      )
                    })}
                  </AccordionContent>
                </AccordionItem>
              )}

              {filteredSections.some((s) => s.id === 'surfaces') && (
                <AccordionItem value="surfaces">
                  <AccordionTrigger className="py-2 text-sm">Surfaces</AccordionTrigger>
                  <AccordionContent className="space-y-4 pb-3">
                    <Typography variant="caption" tone="muted">
                      Optional overrides cascade like the theme contract (raised/overlay derive when
                      omitted).
                    </Typography>
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={clearAllSurfaces}
                        className="text-xs text-primary underline"
                      >
                        Use defaults (all)
                      </button>
                    </div>
                    {(['base', 'raised', 'overlay'] as const).map((key) => {
                      const effective = state.surfaces[key] ?? surfaceFallbackLight[key]
                      return (
                        <div key={key} className="space-y-2 rounded border border-border p-2">
                          <div className="flex items-center justify-between gap-2">
                            <Typography variant="caption" weight="semibold">
                              {key.charAt(0).toUpperCase() + key.slice(1)}
                            </Typography>
                            {state.surfaces[key] && (
                              <button
                                type="button"
                                onClick={() => clearSurfaceField(key)}
                                className="text-xs text-muted-foreground underline"
                              >
                                Default
                              </button>
                            )}
                          </div>
                          <RgbColorPicker
                            idPrefix={`surface-${key}`}
                            hex={oklchToHex(effective)}
                            onHexChange={(h) => setSurfaceField(key, hexToOklch(h))}
                          />
                        </div>
                      )
                    })}
                  </AccordionContent>
                </AccordionItem>
              )}

              {filteredSections.some((s) => s.id === 'chrome') && (
                <AccordionItem value="chrome">
                  <AccordionTrigger className="py-2 text-sm">Chrome</AccordionTrigger>
                  <AccordionContent className="space-y-4 pb-3">
                    <Typography variant="caption" tone="muted">
                      Optional border, input, and focus ring. Defaults follow surfaces and primary
                      (light preview below).
                    </Typography>
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={clearAllChrome}
                        className="text-xs text-primary underline"
                      >
                        Use defaults (all)
                      </button>
                    </div>
                    {(['border', 'input', 'ring'] as const).map((key) => {
                      const effective = chromeResolvedLight[key]
                      return (
                        <div key={key} className="space-y-2 rounded border border-border p-2">
                          <div className="flex items-center justify-between gap-2">
                            <Typography variant="caption" weight="semibold">
                              {key.charAt(0).toUpperCase() + key.slice(1)}
                            </Typography>
                            {state.chrome[key] && (
                              <button
                                type="button"
                                onClick={() => clearChromeField(key)}
                                className="text-xs text-muted-foreground underline"
                              >
                                Default
                              </button>
                            )}
                          </div>
                          <RgbColorPicker
                            idPrefix={`chrome-${key}`}
                            hex={oklchToHex(effective)}
                            onHexChange={(h) => setChromeField(key, hexToOklch(h))}
                          />
                        </div>
                      )
                    })}
                  </AccordionContent>
                </AccordionItem>
              )}
            </Accordion>
          </div>
        </TabsContent>

        <TabsContent
          value="other"
          className="min-h-0 flex-1 overflow-auto p-3 data-[state=inactive]:hidden"
        >
          <div className="space-y-4">
            <div className="space-y-3 rounded border border-border p-3">
              <div className="space-y-1">
                <Typography variant="body2" weight="medium">
                  Typography
                </Typography>
                <Typography variant="caption" tone="muted">
                  Named web fonts need to be installed locally or loaded by the app.
                </Typography>
              </div>

              <FontStackSelect
                name="sans"
                value={state.fonts.sans}
                onChange={(next) => setFontStack('sans', next)}
              />
              <FontStackSelect
                name="serif"
                value={state.fonts.serif}
                onChange={(next) => setFontStack('serif', next)}
              />
              <FontStackSelect
                name="mono"
                value={state.fonts.mono}
                onChange={(next) => setFontStack('mono', next)}
              />

              <div className="space-y-1 rounded bg-muted/40 p-2 text-sm">
                <div className="font-sans">The quick brown fox jumps over the lazy dog.</div>
                <div className="font-serif">The quick brown fox jumps over the lazy dog.</div>
                <div className="font-mono text-xs">const theme = 'zui'</div>
              </div>

              <label className="grid gap-1 text-sm">
                <span className="text-muted-foreground">
                  Letter spacing ({formatTrackingOffset(state.trackingOffsetEm)})
                </span>
                <input
                  type="range"
                  min={-0.05}
                  max={0.05}
                  step={0.005}
                  value={state.trackingOffsetEm}
                  onChange={(e) => setTrackingOffset(Number.parseFloat(e.target.value))}
                  className="w-full"
                />
              </label>
            </div>

            <label className="grid gap-1 text-sm">
              <span className="text-muted-foreground">Density</span>
              <select
                value={state.density}
                onChange={(e) => onChange({ ...state, density: e.target.value })}
                className={fieldClass()}
              >
                <option value="0.85">Compact</option>
                <option value="1">Normal</option>
                <option value="1.15">Relaxed</option>
              </select>
            </label>
            <label className="grid gap-1 text-sm">
              <span className="text-muted-foreground">Radius ({state.radius})</span>
              <input
                type="range"
                min={0.25}
                max={1.25}
                step={0.0625}
                value={Number.parseFloat(state.radius)}
                onChange={(e) => onChange({ ...state, radius: `${e.target.value}rem` })}
                className="w-full"
              />
            </label>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
