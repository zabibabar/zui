import type { FontWeightName, RadiusStep, TypeScaleStep } from '../primitives/non-color'

export interface SidebarTokens {
  readonly width: number
  readonly header: {
    readonly padding: number
  }
  readonly section: {
    readonly padding: number
    readonly gap: number
  }
  readonly sectionTitle: {
    readonly paddingX: number
    readonly paddingY: number
    readonly fontSize: TypeScaleStep
    readonly fontWeight: FontWeightName
  }
  readonly navItem: {
    readonly paddingX: number
    readonly paddingY: number
    readonly fontSize: TypeScaleStep
    readonly radius: RadiusStep
  }
}

export const defaultSidebarTokens: SidebarTokens = {
  width: 64,
  header: { padding: 4 },
  section: { padding: 2, gap: 1 },
  sectionTitle: { paddingX: 2, paddingY: 1.5, fontSize: 'xs', fontWeight: 'semibold' },
  navItem: { paddingX: 3, paddingY: 2, fontSize: 'sm', radius: 'md' },
}
