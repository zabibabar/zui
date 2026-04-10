import type { ComponentPropsWithRef, HTMLAttributes, Ref } from 'react'
import type { ControllerProps, FieldPath, FieldValues } from 'react-hook-form'
import { Slot } from '@radix-ui/react-slot'
import { createContext, use, useId } from 'react'
import { Controller, FormProvider, useFormContext, useFormState } from 'react-hook-form'
import { cn } from '../../utils/cn'
import { Label } from '../label/label'

const Form = FormProvider

interface FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  name: TName
}

const FormFieldContext = createContext<FormFieldContextValue>({} as FormFieldContextValue)

const FormItemContext = createContext<{ id: string }>({ id: '' })

function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ ...props }: ControllerProps<TFieldValues, TName>) {
  return (
    <FormFieldContext value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext>
  )
}

function useFormField() {
  const fieldContext = use(FormFieldContext)
  const itemContext = use(FormItemContext)
  const { getFieldState } = useFormContext()
  const formState = useFormState({ name: fieldContext.name })
  const fieldState = getFieldState(fieldContext.name, formState)

  if (!fieldContext.name) {
    throw new Error('useFormField must be used within <FormField>')
  }

  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  }
}

function FormItem({
  className,
  ref,
  ...props
}: HTMLAttributes<HTMLDivElement> & { ref?: Ref<HTMLDivElement> }) {
  const id = useId()
  return (
    <FormItemContext value={{ id }}>
      <div ref={ref} className={cn('space-y-2', className)} {...props} />
    </FormItemContext>
  )
}
FormItem.displayName = 'FormItem'

function FormLabel({ className, ref, ...props }: ComponentPropsWithRef<typeof Label>) {
  const { error, formItemId } = useFormField()
  return (
    <Label
      ref={ref}
      className={cn(error && 'text-danger', className)}
      htmlFor={formItemId}
      {...props}
    />
  )
}
FormLabel.displayName = 'FormLabel'

function FormControl({ ref, ...props }: ComponentPropsWithRef<typeof Slot>) {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()
  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={!error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`}
      aria-invalid={!!error}
      {...props}
    />
  )
}
FormControl.displayName = 'FormControl'

function FormDescription({
  className,
  ref,
  ...props
}: HTMLAttributes<HTMLParagraphElement> & { ref?: Ref<HTMLParagraphElement> }) {
  const { formDescriptionId } = useFormField()
  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  )
}
FormDescription.displayName = 'FormDescription'

function FormMessage({
  className,
  children,
  ref,
  ...props
}: HTMLAttributes<HTMLParagraphElement> & { ref?: Ref<HTMLParagraphElement> }) {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error.message) : children
  if (!body) return null
  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn('text-sm font-medium text-danger', className)}
      {...props}
    >
      {body}
    </p>
  )
}
FormMessage.displayName = 'FormMessage'

export {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useFormField,
}
