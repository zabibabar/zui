import { format } from 'date-fns'
import { useState } from 'react'
import { cn } from '../../utils/cn'
import { Button } from '../button/button'
import { Calendar } from '../calendar/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '../popover/popover'

export interface DatePickerProps {
  date?: Date
  onDateChange?: (date: Date | undefined) => void
  placeholder?: string
  className?: string
  disabled?: boolean
}

export function DatePicker({
  date,
  onDateChange,
  placeholder = 'Pick a date',
  className,
  disabled,
}: DatePickerProps) {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          color="neutral"
          disabled={disabled}
          className={cn(
            'min-h-input-field min-w-[11rem] w-full justify-start text-left font-normal shadow-xs',
            !date && 'text-muted-foreground',
            className,
          )}
        >
          {date ? format(date, 'PPP') : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(d) => {
            onDateChange?.(d)
            setOpen(false)
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
