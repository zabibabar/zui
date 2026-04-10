import type { ComponentTokens } from './component-tokens/index'
import type { NonColorTokens } from './primitives/non-color'
import type { GeneratedTheme } from './types/theme'
import { defaultComponentTokens } from './component-tokens/index'
import { defaultNonColorTokens } from './primitives/non-color'

/**
 * A complete ZUI theme combining color, non-color, and component tokens.
 *
 * Use {@link buildFullTheme} to construct an instance with sensible defaults.
 */
export interface FullTheme {
  readonly colors: GeneratedTheme
  readonly tokens: NonColorTokens
  readonly components: ComponentTokens
}

/**
 * Build a {@link FullTheme} from a generated colour theme, filling in
 * non-color and component tokens with defaults when omitted.
 */
export function buildFullTheme(
  colors: GeneratedTheme,
  tokens: NonColorTokens = defaultNonColorTokens,
  components: ComponentTokens = defaultComponentTokens,
): FullTheme {
  return { colors, tokens, components }
}
