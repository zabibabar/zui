/**
 * Component-level design tokens.
 *
 * All dimensional values are expressed in **spacing units** — multiples of the
 * spacing base unit (0.25 rem at density 1). For example `height: 9` means
 * `9 × baseUnit = 2.25 rem` at default density.
 *
 * Properties suffixed with `Rem` are **fixed rem values** that do not scale
 * with density (e.g. container max-widths).
 *
 * Typographic, radius, shadow, tracking, and font-weight properties reference
 * the corresponding non-color token scale steps defined in `../primitives/non-color`.
 */

import type { AccordionTokens } from './accordion'
import type { AlertTokens } from './alert'
import type { AvatarTokens } from './avatar'
import type { BadgeTokens } from './badge'
import type { BreadcrumbTokens } from './breadcrumb'
import type { ButtonTokens } from './button'
import type { CardTokens } from './card'
import type { CheckboxTokens } from './checkbox'
import type { CommandTokens } from './command'
import type { DialogTokens } from './dialog'
import type { DrawerTokens } from './drawer'
import type { InputTokens } from './input'
import type { LabelTokens } from './label'
import type { MenubarTokens } from './menubar'
import type { OverlayMenuTokens } from './overlay-menu'
import type { PaginationTokens } from './pagination'
import type { PopoverTokens } from './popover'
import type { ProgressTokens } from './progress'
import type { RadioTokens } from './radio'
import type { ScrollAreaTokens } from './scroll-area'
import type { SelectTokens } from './select'
import type { SeparatorTokens } from './separator'
import type { SidebarTokens } from './sidebar'
import type { SkeletonTokens } from './skeleton'
import type { SliderTokens } from './slider'
import type { SpinnerTokens } from './spinner'
import type { SwitchTokens } from './switch'
import type { TableTokens } from './table'
import type { TabsTokens } from './tabs'
import type { TextareaTokens } from './textarea'
import type { ToggleTokens } from './toggle'
import type { ToggleGroupTokens } from './toggle-group'
import type { ToolbarTokens } from './toolbar'
import type { TooltipTokens } from './tooltip'
import type { TypographyTokens } from './typography'
import { defaultAccordionTokens } from './accordion'
import { defaultAlertTokens } from './alert'
import { defaultAvatarTokens } from './avatar'
import { defaultBadgeTokens } from './badge'
import { defaultBreadcrumbTokens } from './breadcrumb'
import { defaultButtonTokens } from './button'
import { defaultCardTokens } from './card'
import { defaultCheckboxTokens } from './checkbox'
import { defaultCommandTokens } from './command'
import { defaultDialogTokens } from './dialog'
import { defaultDrawerTokens } from './drawer'
import { defaultInputTokens } from './input'
import { defaultLabelTokens } from './label'
import { defaultMenubarTokens } from './menubar'
import { defaultOverlayMenuTokens } from './overlay-menu'
import { defaultPaginationTokens } from './pagination'
import { defaultPopoverTokens } from './popover'
import { defaultProgressTokens } from './progress'
import { defaultRadioTokens } from './radio'
import { defaultScrollAreaTokens } from './scroll-area'
import { defaultSelectTokens } from './select'
import { defaultSeparatorTokens } from './separator'
import { defaultSidebarTokens } from './sidebar'
import { defaultSkeletonTokens } from './skeleton'
import { defaultSliderTokens } from './slider'
import { defaultSpinnerTokens } from './spinner'
import { defaultSwitchTokens } from './switch'
import { defaultTableTokens } from './table'
import { defaultTabsTokens } from './tabs'
import { defaultTextareaTokens } from './textarea'
import { defaultToggleTokens } from './toggle'
import { defaultToggleGroupTokens } from './toggle-group'
import { defaultToolbarTokens } from './toolbar'
import { defaultTooltipTokens } from './tooltip'
import { defaultTypographyTokens } from './typography'

// ── Re-export all component token types and defaults ──

export type { AccordionTokens } from './accordion'
export { defaultAccordionTokens } from './accordion'

export type { AlertTokens } from './alert'
export { defaultAlertTokens } from './alert'

export type { AvatarSizeTokens, AvatarTokens } from './avatar'
export { defaultAvatarTokens } from './avatar'

export type { BadgeTokens } from './badge'
export { defaultBadgeTokens } from './badge'

export type { BreadcrumbTokens } from './breadcrumb'
export { defaultBreadcrumbTokens } from './breadcrumb'

export type { ButtonSizeTokens, ButtonTokens } from './button'
export { defaultButtonTokens } from './button'

export type { CardTokens } from './card'
export { defaultCardTokens } from './card'

export type { CheckboxTokens } from './checkbox'
export { defaultCheckboxTokens } from './checkbox'

export type { CommandTokens } from './command'
export { defaultCommandTokens } from './command'

export type { DialogTokens } from './dialog'
export { defaultDialogTokens } from './dialog'

export type { DrawerTokens } from './drawer'
export { defaultDrawerTokens } from './drawer'

export type { InputTokens } from './input'
export { defaultInputTokens } from './input'

export type { LabelTokens } from './label'
export { defaultLabelTokens } from './label'

export type { MenubarTokens } from './menubar'
export { defaultMenubarTokens } from './menubar'

export type { OverlayMenuTokens } from './overlay-menu'
export { defaultOverlayMenuTokens } from './overlay-menu'

export type { PaginationTokens } from './pagination'
export { defaultPaginationTokens } from './pagination'

export type { PopoverTokens } from './popover'
export { defaultPopoverTokens } from './popover'

export type { ProgressTokens } from './progress'
export { defaultProgressTokens } from './progress'

export type { RadioTokens } from './radio'
export { defaultRadioTokens } from './radio'

export type { ScrollAreaTokens } from './scroll-area'
export { defaultScrollAreaTokens } from './scroll-area'

export type { SelectTokens } from './select'
export { defaultSelectTokens } from './select'

export type { SeparatorTokens } from './separator'
export { defaultSeparatorTokens } from './separator'

export type { SidebarTokens } from './sidebar'
export { defaultSidebarTokens } from './sidebar'

export type { SkeletonTokens } from './skeleton'
export { defaultSkeletonTokens } from './skeleton'

export type { SliderTokens } from './slider'
export { defaultSliderTokens } from './slider'

export type { SpinnerSizeTokens, SpinnerTokens } from './spinner'
export { defaultSpinnerTokens } from './spinner'

export type { SwitchTokens } from './switch'
export { defaultSwitchTokens } from './switch'

export type { TableTokens } from './table'
export { defaultTableTokens } from './table'

export type { TabsTokens } from './tabs'
export { defaultTabsTokens } from './tabs'

export type { TextareaTokens } from './textarea'
export { defaultTextareaTokens } from './textarea'

export type { ToggleSizeTokens, ToggleTokens } from './toggle'
export { defaultToggleTokens } from './toggle'

export type { ToggleGroupTokens } from './toggle-group'
export { defaultToggleGroupTokens } from './toggle-group'

export type { ToolbarTokens } from './toolbar'
export { defaultToolbarTokens } from './toolbar'

export type { TooltipTokens } from './tooltip'
export { defaultTooltipTokens } from './tooltip'

export type { ButtonSize, CompactSize, TypographyVariant } from './types'
export { BUTTON_SIZES, COMPACT_SIZES, TYPOGRAPHY_VARIANTS } from './types'

export type { TypographyTokens, TypographyVariantTokens } from './typography'
export { defaultTypographyTokens } from './typography'

// ── Aggregate interface ──

export interface ComponentTokens {
  readonly accordion: AccordionTokens
  readonly alert: AlertTokens
  readonly avatar: AvatarTokens
  readonly badge: BadgeTokens
  readonly breadcrumb: BreadcrumbTokens
  readonly button: ButtonTokens
  readonly card: CardTokens
  readonly checkbox: CheckboxTokens
  readonly command: CommandTokens
  readonly contextMenu: OverlayMenuTokens
  readonly dialog: DialogTokens
  readonly drawer: DrawerTokens
  readonly dropdownMenu: OverlayMenuTokens
  readonly input: InputTokens
  readonly label: LabelTokens
  readonly menubar: MenubarTokens
  readonly pagination: PaginationTokens
  readonly popover: PopoverTokens
  readonly progress: ProgressTokens
  readonly radio: RadioTokens
  readonly scrollArea: ScrollAreaTokens
  readonly select: SelectTokens
  readonly separator: SeparatorTokens
  readonly sidebar: SidebarTokens
  readonly skeleton: SkeletonTokens
  readonly slider: SliderTokens
  readonly spinner: SpinnerTokens
  readonly switch: SwitchTokens
  readonly table: TableTokens
  readonly tabs: TabsTokens
  readonly textarea: TextareaTokens
  readonly toggle: ToggleTokens
  readonly toggleGroup: ToggleGroupTokens
  readonly toolbar: ToolbarTokens
  readonly tooltip: TooltipTokens
  readonly typography: TypographyTokens
}

/** Component names in the aggregate ComponentTokens interface. */
export const COMPONENT_NAMES = [
  'accordion',
  'alert',
  'avatar',
  'badge',
  'breadcrumb',
  'button',
  'card',
  'checkbox',
  'command',
  'contextMenu',
  'dialog',
  'drawer',
  'dropdownMenu',
  'input',
  'label',
  'menubar',
  'pagination',
  'popover',
  'progress',
  'radio',
  'scrollArea',
  'select',
  'separator',
  'sidebar',
  'skeleton',
  'slider',
  'spinner',
  'switch',
  'table',
  'tabs',
  'textarea',
  'toggle',
  'toggleGroup',
  'toolbar',
  'tooltip',
  'typography',
] as const satisfies readonly (keyof ComponentTokens)[]

/** Canonical ZUI component token defaults. */
export const defaultComponentTokens: ComponentTokens = {
  accordion: defaultAccordionTokens,
  alert: defaultAlertTokens,
  avatar: defaultAvatarTokens,
  badge: defaultBadgeTokens,
  breadcrumb: defaultBreadcrumbTokens,
  button: defaultButtonTokens,
  card: defaultCardTokens,
  checkbox: defaultCheckboxTokens,
  command: defaultCommandTokens,
  contextMenu: defaultOverlayMenuTokens,
  dialog: defaultDialogTokens,
  drawer: defaultDrawerTokens,
  dropdownMenu: defaultOverlayMenuTokens,
  input: defaultInputTokens,
  label: defaultLabelTokens,
  menubar: defaultMenubarTokens,
  pagination: defaultPaginationTokens,
  popover: defaultPopoverTokens,
  progress: defaultProgressTokens,
  radio: defaultRadioTokens,
  scrollArea: defaultScrollAreaTokens,
  select: defaultSelectTokens,
  separator: defaultSeparatorTokens,
  sidebar: defaultSidebarTokens,
  skeleton: defaultSkeletonTokens,
  slider: defaultSliderTokens,
  spinner: defaultSpinnerTokens,
  switch: defaultSwitchTokens,
  table: defaultTableTokens,
  tabs: defaultTabsTokens,
  textarea: defaultTextareaTokens,
  toggle: defaultToggleTokens,
  toggleGroup: defaultToggleGroupTokens,
  toolbar: defaultToolbarTokens,
  tooltip: defaultTooltipTokens,
  typography: defaultTypographyTokens,
}
