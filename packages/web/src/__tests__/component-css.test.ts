import { defaultComponentTokens } from '@zui/core'
import { describe, expect, it } from 'vitest'
import { renderComponentTokensCss } from '../component-css'

const css = renderComponentTokensCss()

describe('renderComponentTokensCss', () => {
  it('returns a non-empty string', () => {
    expect(css.length).toBeGreaterThan(0)
  })

  it('uses default tokens when called with no arguments', () => {
    expect(renderComponentTokensCss()).toBe(renderComponentTokensCss(defaultComponentTokens))
  })

  // ── Naming: button → btn ──

  it('abbreviates button to btn', () => {
    expect(css).toContain('--spacing-btn-gap:')
    expect(css).toContain('--font-weight-btn:')
    expect(css).toContain('--spacing-btn-md:')
    expect(css).not.toContain('--spacing-button-')
  })

  // ── Naming: input → input-field ──

  it('maps input to input-field to avoid color collision', () => {
    expect(css).toContain('--spacing-input-field:')
    expect(css).toContain('--font-size-input-field:')
    expect(css).toContain('--radius-input-field:')
    expect(css).not.toMatch(/--spacing-input[^-]/)
  })

  // ── Naming: description → desc ──

  it('abbreviates description sub-part to desc', () => {
    expect(css).toContain('--font-size-card-desc:')
    expect(css).toContain('--font-size-dialog-desc:')
    expect(css).not.toContain('--font-size-card-description:')
  })

  // ── Spacing values ──

  it('formats spacing values as calc(var(--spacing) * N)', () => {
    expect(css).toContain('--spacing-btn-gap: calc(var(--spacing) * 2);')
    expect(css).toContain('--spacing-btn-md: calc(var(--spacing) * 9);')
    expect(css).toContain('--spacing-btn-xs-x: calc(var(--spacing) * 2.5);')
  })

  // ── Scale references ──

  it('formats font-size refs as var(--text-*)', () => {
    expect(css).toContain('--font-size-btn-xs: var(--text-xs);')
    expect(css).toContain('--font-size-btn-md: var(--text-sm);')
    expect(css).toContain('--font-size-card-title: var(--text-lg);')
  })

  it('formats radius refs as var(--radius-*)', () => {
    expect(css).toContain('--radius-btn-xs: var(--radius-sm);')
    expect(css).toContain('--radius-btn-md: var(--radius-md);')
    expect(css).toContain('--radius-card: var(--radius-lg);')
  })

  it('formats shadow refs as var(--shadow-*)', () => {
    expect(css).toContain('--shadow-dialog-content: var(--shadow-xl);')
    expect(css).toContain('--shadow-tooltip: var(--shadow-md);')
  })

  it('formats font-weight refs as var(--font-weight-*)', () => {
    expect(css).toContain('--font-weight-btn: var(--font-weight-medium);')
    expect(css).toContain('--font-weight-card-title: var(--font-weight-semibold);')
  })

  it('formats tracking refs as var(--tracking-*)', () => {
    expect(css).toContain('--tracking-card-title: var(--tracking-tight);')
    expect(css).toContain('--tracking-dialog-title: var(--tracking-tight);')
  })

  // ── Rem values ──

  it('formats maxWidthRem as {value}rem', () => {
    expect(css).toContain('--max-width-dialog-content: 32rem;')
  })

  it('formats minWidthRem as {value}rem', () => {
    expect(css).toContain('--min-width-dropdown-menu-content: 10rem;')
  })

  it('formats maxHeightRem as {value}rem', () => {
    expect(css).toContain('--max-height-command-list: 18rem;')
  })

  // ── Skipped properties ──

  it('does not emit transitionMs or animationMs', () => {
    expect(css).not.toContain('transitionMs')
    expect(css).not.toContain('animationMs')
    expect(css).not.toContain('transition-ms')
    expect(css).not.toContain('animation-ms')
  })

  // ── Compound property names (heading prefix) ──

  it('splits compound heading* properties into sub-part', () => {
    expect(css).toContain('--spacing-command-group-heading-x:')
    expect(css).toContain('--spacing-command-group-heading-y:')
    expect(css).toContain('--font-size-command-group-heading:')
    expect(css).toContain('--font-weight-command-group-heading:')
  })

  // ── Size variants ──

  it('emits all button size variants', () => {
    for (const size of ['xs', 'sm', 'md', 'lg', 'xl']) {
      expect(css).toContain(`--spacing-btn-${size}:`)
      expect(css).toContain(`--spacing-btn-${size}-x:`)
      expect(css).toContain(`--font-size-btn-${size}:`)
      expect(css).toContain(`--radius-btn-${size}:`)
    }
  })

  it('emits avatar size variants', () => {
    for (const size of ['sm', 'md', 'lg']) {
      expect(css).toContain(`--spacing-avatar-${size}:`)
      expect(css).toContain(`--font-size-avatar-${size}:`)
    }
  })

  // ── Sub-parts ──

  it('emits card sub-part tokens', () => {
    expect(css).toContain('--radius-card:')
    expect(css).toContain('--spacing-card-header:')
    expect(css).toContain('--spacing-card-header-gap:')
    expect(css).toContain('--spacing-card-content-x:')
    expect(css).toContain('--spacing-card-content-b:')
    expect(css).toContain('--spacing-card-footer-x:')
    expect(css).toContain('--spacing-card-footer-b:')
  })

  // ── Nested sub-parts (menubar.menu.content) ──

  it('handles nested sub-parts', () => {
    expect(css).toContain('--radius-menubar-menu-content:')
    expect(css).toContain('--shadow-menubar-menu-content:')
    expect(css).toContain('--spacing-menubar-menu-item-x:')
  })

  // ── Section comments ──

  it('includes section header comments for each component', () => {
    expect(css).toContain('/* ── Button ── */')
    expect(css).toContain('/* ── Card ── */')
    expect(css).toContain('/* ── Context Menu ── */')
    expect(css).toContain('/* ── Toggle Group ── */')
    expect(css).toContain('/* ── Typography ── */')
  })

  // ── Typography variants ──

  it('emits typography variant tokens', () => {
    expect(css).toContain('--font-size-typography-h1:')
    expect(css).toContain('--font-weight-typography-h1:')
    expect(css).toContain('--tracking-typography-h1:')
  })

  it('emits responsive font-size with -resp suffix', () => {
    expect(css).toContain('--font-size-typography-h1-resp: var(--text-3xl);')
  })

  it('skips textTransform and leadingNone', () => {
    expect(css).not.toContain('text-transform')
    expect(css).not.toContain('leading-none')
  })

  // ── All declarations are valid ──

  it('all declarations end with semicolons', () => {
    const decls = css.split('\n').filter((l) => l.trim().startsWith('--'))
    for (const d of decls) {
      expect(d).toMatch(/;\s*$/)
    }
  })
})
