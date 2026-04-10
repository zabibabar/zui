import { describe, expect, it } from 'vitest'
import {
  BUTTON_SIZES,
  COMPACT_SIZES,
  COMPONENT_NAMES,
  defaultAccordionTokens,
  defaultAlertTokens,
  defaultAvatarTokens,
  defaultBadgeTokens,
  defaultBreadcrumbTokens,
  defaultButtonTokens,
  defaultCardTokens,
  defaultCheckboxTokens,
  defaultCommandTokens,
  defaultComponentTokens,
  defaultDialogTokens,
  defaultDrawerTokens,
  defaultInputTokens,
  defaultLabelTokens,
  defaultMenubarTokens,
  defaultOverlayMenuTokens,
  defaultPaginationTokens,
  defaultPopoverTokens,
  defaultProgressTokens,
  defaultRadioTokens,
  defaultScrollAreaTokens,
  defaultSelectTokens,
  defaultSeparatorTokens,
  defaultSidebarTokens,
  defaultSkeletonTokens,
  defaultSliderTokens,
  defaultSpinnerTokens,
  defaultSwitchTokens,
  defaultTableTokens,
  defaultTabsTokens,
  defaultTextareaTokens,
  defaultToggleGroupTokens,
  defaultToggleTokens,
  defaultToolbarTokens,
  defaultTooltipTokens,
  defaultTypographyTokens,
  TYPOGRAPHY_VARIANTS,
} from '../component-tokens/index'

describe('defaultComponentTokens', () => {
  it('aggregates all component defaults', () => {
    expect(defaultComponentTokens.accordion).toBe(defaultAccordionTokens)
    expect(defaultComponentTokens.alert).toBe(defaultAlertTokens)
    expect(defaultComponentTokens.avatar).toBe(defaultAvatarTokens)
    expect(defaultComponentTokens.badge).toBe(defaultBadgeTokens)
    expect(defaultComponentTokens.breadcrumb).toBe(defaultBreadcrumbTokens)
    expect(defaultComponentTokens.button).toBe(defaultButtonTokens)
    expect(defaultComponentTokens.card).toBe(defaultCardTokens)
    expect(defaultComponentTokens.checkbox).toBe(defaultCheckboxTokens)
    expect(defaultComponentTokens.command).toBe(defaultCommandTokens)
    expect(defaultComponentTokens.contextMenu).toBe(defaultOverlayMenuTokens)
    expect(defaultComponentTokens.dialog).toBe(defaultDialogTokens)
    expect(defaultComponentTokens.drawer).toBe(defaultDrawerTokens)
    expect(defaultComponentTokens.dropdownMenu).toBe(defaultOverlayMenuTokens)
    expect(defaultComponentTokens.input).toBe(defaultInputTokens)
    expect(defaultComponentTokens.label).toBe(defaultLabelTokens)
    expect(defaultComponentTokens.menubar).toBe(defaultMenubarTokens)
    expect(defaultComponentTokens.pagination).toBe(defaultPaginationTokens)
    expect(defaultComponentTokens.popover).toBe(defaultPopoverTokens)
    expect(defaultComponentTokens.progress).toBe(defaultProgressTokens)
    expect(defaultComponentTokens.radio).toBe(defaultRadioTokens)
    expect(defaultComponentTokens.scrollArea).toBe(defaultScrollAreaTokens)
    expect(defaultComponentTokens.select).toBe(defaultSelectTokens)
    expect(defaultComponentTokens.separator).toBe(defaultSeparatorTokens)
    expect(defaultComponentTokens.sidebar).toBe(defaultSidebarTokens)
    expect(defaultComponentTokens.skeleton).toBe(defaultSkeletonTokens)
    expect(defaultComponentTokens.slider).toBe(defaultSliderTokens)
    expect(defaultComponentTokens.spinner).toBe(defaultSpinnerTokens)
    expect(defaultComponentTokens.switch).toBe(defaultSwitchTokens)
    expect(defaultComponentTokens.table).toBe(defaultTableTokens)
    expect(defaultComponentTokens.tabs).toBe(defaultTabsTokens)
    expect(defaultComponentTokens.textarea).toBe(defaultTextareaTokens)
    expect(defaultComponentTokens.toggle).toBe(defaultToggleTokens)
    expect(defaultComponentTokens.toggleGroup).toBe(defaultToggleGroupTokens)
    expect(defaultComponentTokens.toolbar).toBe(defaultToolbarTokens)
    expect(defaultComponentTokens.tooltip).toBe(defaultTooltipTokens)
    expect(defaultComponentTokens.typography).toBe(defaultTypographyTokens)
  })

  it('has an entry for every COMPONENT_NAMES element', () => {
    for (const name of COMPONENT_NAMES) {
      expect(defaultComponentTokens[name]).toBeDefined()
    }
  })

  it('component names match the keys of defaultComponentTokens', () => {
    const keys = Object.keys(defaultComponentTokens).sort()
    const names = [...COMPONENT_NAMES].sort()
    expect(names).toEqual(keys)
  })
})

describe('button', () => {
  it('defines all size variants', () => {
    for (const size of BUTTON_SIZES) {
      const s = defaultButtonTokens.sizes[size]
      expect(s.height).toBeGreaterThan(0)
      expect(s.paddingX).toBeGreaterThan(0)
      expect(s.fontSize).toBeTypeOf('string')
      expect(s.radius).toBeTypeOf('string')
    }
  })

  it('button heights increase monotonically', () => {
    const heights = BUTTON_SIZES.map((s) => defaultButtonTokens.sizes[s].height)
    for (let i = 1; i < heights.length; i++) {
      expect(heights[i]).toBeGreaterThan(heights[i - 1])
    }
  })

  it('button paddingX increases monotonically', () => {
    const paddings = BUTTON_SIZES.map((s) => defaultButtonTokens.sizes[s].paddingX)
    for (let i = 1; i < paddings.length; i++) {
      expect(paddings[i]).toBeGreaterThan(paddings[i - 1])
    }
  })

  it('has default values matching the hardcoded React variants', () => {
    expect(defaultButtonTokens.sizes.md).toEqual({
      height: 9,
      paddingX: 4,
      fontSize: 'sm',
      radius: 'md',
    })
  })
})

describe('avatar', () => {
  it('defines all compact sizes', () => {
    for (const size of COMPACT_SIZES) {
      const s = defaultAvatarTokens.sizes[size]
      expect(s.size).toBeGreaterThan(0)
      expect(s.fontSize).toBeTypeOf('string')
    }
  })

  it('avatar sizes increase monotonically', () => {
    const sizes = COMPACT_SIZES.map((s) => defaultAvatarTokens.sizes[s].size)
    for (let i = 1; i < sizes.length; i++) {
      expect(sizes[i]).toBeGreaterThan(sizes[i - 1])
    }
  })
})

describe('toggle', () => {
  it('defines all compact sizes', () => {
    for (const size of COMPACT_SIZES) {
      const s = defaultToggleTokens.sizes[size]
      expect(s.height).toBeGreaterThan(0)
      expect(s.minWidth).toBeGreaterThan(0)
      expect(s.paddingX).toBeGreaterThan(0)
      expect(s.fontSize).toBeTypeOf('string')
    }
  })

  it('toggle heights increase monotonically', () => {
    const heights = COMPACT_SIZES.map((s) => defaultToggleTokens.sizes[s].height)
    for (let i = 1; i < heights.length; i++) {
      expect(heights[i]).toBeGreaterThan(heights[i - 1])
    }
  })
})

describe('spinner', () => {
  it('defines all compact sizes', () => {
    for (const size of COMPACT_SIZES) {
      expect(defaultSpinnerTokens.sizes[size].size).toBeGreaterThan(0)
    }
  })

  it('spinner sizes increase monotonically', () => {
    const sizes = COMPACT_SIZES.map((s) => defaultSpinnerTokens.sizes[s].size)
    for (let i = 1; i < sizes.length; i++) {
      expect(sizes[i]).toBeGreaterThan(sizes[i - 1])
    }
  })
})

describe('input and textarea share common field sizing', () => {
  it('input and textarea have matching paddingX/paddingY/fontSize', () => {
    expect(defaultInputTokens.paddingX).toBe(defaultTextareaTokens.paddingX)
    expect(defaultInputTokens.paddingY).toBe(defaultTextareaTokens.paddingY)
    expect(defaultInputTokens.fontSize).toBe(defaultTextareaTokens.fontSize)
    expect(defaultInputTokens.radius).toBe(defaultTextareaTokens.radius)
  })

  it('textarea has a larger minHeight than input', () => {
    expect(defaultTextareaTokens.minHeight).toBeGreaterThan(defaultInputTokens.minHeight)
  })
})

describe('select trigger matches input sizing', () => {
  it('shares minHeight, paddingX, paddingY, fontSize, and radius with input', () => {
    expect(defaultSelectTokens.trigger.minHeight).toBe(defaultInputTokens.minHeight)
    expect(defaultSelectTokens.trigger.paddingX).toBe(defaultInputTokens.paddingX)
    expect(defaultSelectTokens.trigger.paddingY).toBe(defaultInputTokens.paddingY)
    expect(defaultSelectTokens.trigger.fontSize).toBe(defaultInputTokens.fontSize)
    expect(defaultSelectTokens.trigger.radius).toBe(defaultInputTokens.radius)
  })
})

describe('overlay menus', () => {
  it('dropdown and context menus share the same default tokens', () => {
    expect(defaultComponentTokens.dropdownMenu).toBe(defaultComponentTokens.contextMenu)
  })

  it('menubar menu sub-tokens match the overlay menu defaults', () => {
    expect(defaultMenubarTokens.menu).toBe(defaultOverlayMenuTokens)
  })
})

describe('dialog and drawer share title/description sizing', () => {
  it('titles use the same fontSize, fontWeight, and tracking', () => {
    expect(defaultDialogTokens.title.fontSize).toBe(defaultDrawerTokens.title.fontSize)
    expect(defaultDialogTokens.title.fontWeight).toBe(defaultDrawerTokens.title.fontWeight)
    expect(defaultDialogTokens.title.tracking).toBe(defaultDrawerTokens.title.tracking)
  })

  it('descriptions use the same fontSize', () => {
    expect(defaultDialogTokens.description.fontSize).toBe(defaultDrawerTokens.description.fontSize)
  })

  it('headers use the same gap', () => {
    expect(defaultDialogTokens.header.gap).toBe(defaultDrawerTokens.header.gap)
  })
})

describe('switch', () => {
  it('thumb fits within the track', () => {
    const { root, thumb } = defaultSwitchTokens
    expect(thumb.size).toBeLessThan(root.height)
    expect(thumb.offsetOff + thumb.size / 4).toBeLessThan(root.width)
    expect(thumb.offsetOn + thumb.size / 4).toBeLessThanOrEqual(root.width)
  })
})

describe('typography', () => {
  it('defines all variant names', () => {
    for (const v of TYPOGRAPHY_VARIANTS) {
      const def = defaultTypographyTokens.variants[v]
      expect(def.fontSize).toBeTypeOf('string')
      expect(def.fontWeight).toBeTypeOf('string')
    }
  })

  it('overline has uppercase text transform', () => {
    expect(defaultTypographyTokens.variants.overline.textTransform).toBe('uppercase')
  })

  it('button variant has leadingNone', () => {
    expect(defaultTypographyTokens.variants.button.leadingNone).toBe(true)
  })

  it('h1 and h2 have responsive font sizes', () => {
    expect(defaultTypographyTokens.variants.h1.responsiveFontSize).toBeDefined()
    expect(defaultTypographyTokens.variants.h2.responsiveFontSize).toBeDefined()
  })

  it('body variants have no tracking override', () => {
    expect(defaultTypographyTokens.variants.body1.tracking).toBeUndefined()
    expect(defaultTypographyTokens.variants.body2.tracking).toBeUndefined()
  })
})

describe('progress and slider share track height', () => {
  it('both use the same track height', () => {
    expect(defaultProgressTokens.track.height).toBe(defaultSliderTokens.track.height)
  })
})

describe('checkbox and radio share indicator size', () => {
  it('both use the same size', () => {
    expect(defaultCheckboxTokens.size).toBe(defaultRadioTokens.size)
  })
})
