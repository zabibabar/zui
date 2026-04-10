import type { TypeScaleStep } from '../primitives/non-color'

export interface BreadcrumbTokens {
  readonly gap: number
  readonly fontSize: TypeScaleStep
  readonly separatorIconSize: number
}

export const defaultBreadcrumbTokens: BreadcrumbTokens = {
  gap: 1.5,
  fontSize: 'sm',
  separatorIconSize: 3.5,
}
