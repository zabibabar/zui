import type { DayPickerProps } from 'react-day-picker'
import { DayPicker } from 'react-day-picker'
import { cn } from '../../utils/cn'
import { defaultCalendarClassNames } from './calendar-class-names'

export type CalendarProps = DayPickerProps

export function Calendar({ className, classNames, ...props }: CalendarProps) {
  return (
    <DayPicker
      className={cn(className)}
      classNames={{ ...defaultCalendarClassNames, ...classNames }}
      {...props}
    />
  )
}
