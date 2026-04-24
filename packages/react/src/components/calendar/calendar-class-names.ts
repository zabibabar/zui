import type { ClassNames } from 'react-day-picker'
import { DayFlag, SelectionState, UI } from 'react-day-picker'

function navButtonClasses(): string {
  return [
    'inline-flex size-8 shrink-0 items-center justify-center rounded-md border border-border bg-background',
    'text-foreground transition-[background-color,box-shadow,color] duration-150',
    'hover:bg-muted hover:shadow-xs',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40',
    'disabled:pointer-events-none disabled:opacity-40',
  ].join(' ')
}

/**
 * Default Tailwind class map for react-day-picker v9, aligned with ZUI surfaces
 * and interaction tokens.
 */
export const defaultCalendarClassNames: Partial<ClassNames> = {
  [UI.Root]: [
    'rounded-lg border border-border bg-card p-3 text-card-foreground shadow-sm',
    'font-sans [--rdp-accent-color:var(--color-primary)] [--rdp-background-color:var(--color-card)]',
  ].join(' '),
  [UI.Months]: 'relative flex flex-col gap-4 md:flex-row',
  [UI.Month]: 'flex w-full flex-col gap-2',
  [UI.MonthCaption]: 'flex items-center justify-between gap-2 px-1',
  [UI.CaptionLabel]: 'text-sm font-semibold tracking-tight text-foreground',
  [UI.Nav]: 'flex items-center gap-1',
  [UI.PreviousMonthButton]: navButtonClasses(),
  [UI.NextMonthButton]: navButtonClasses(),
  [UI.MonthGrid]: 'mt-2 w-full border-collapse',
  [UI.Weekdays]: 'mb-1',
  [UI.Weekday]: 'h-8 w-9 p-0 text-center text-xs font-medium text-muted-foreground',
  [UI.Weeks]: '',
  [UI.Week]: '',
  [UI.Day]: 'relative p-0 text-center align-middle',
  [UI.DayButton]: [
    'mx-auto flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium',
    'text-foreground transition-[background-color,color,box-shadow] duration-150',
    'hover:bg-muted',
    'focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40',
    'disabled:pointer-events-none disabled:opacity-30',
    'aria-selected:bg-primary aria-selected:text-primary-foreground aria-selected:shadow-sm',
  ].join(' '),
  [UI.Chevron]: 'size-4 shrink-0 text-muted-foreground',
  [DayFlag.outside]: 'text-muted-foreground/50 [&_button]:text-muted-foreground/60',
  [DayFlag.disabled]: 'opacity-40',
  [DayFlag.today]: '[&_button]:font-semibold [&_button]:text-primary',
  [DayFlag.hidden]: 'hidden',
  [SelectionState.range_start]: 'rounded-l-md bg-primary/10',
  [SelectionState.range_middle]: 'bg-primary/10',
  [SelectionState.range_end]: 'rounded-r-md bg-primary/10',
}
