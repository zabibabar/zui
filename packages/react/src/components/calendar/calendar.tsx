import type { DayPickerProps } from 'react-day-picker'
import { DayPicker } from 'react-day-picker'
import { cn } from '../../utils/cn'

export type CalendarProps = DayPickerProps

export function Calendar({ className, ...props }: CalendarProps) {
  return <DayPicker className={cn(className)} {...props} />
}
