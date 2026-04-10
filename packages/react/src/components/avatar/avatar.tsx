import type { ComponentPropsWithRef } from 'react'
import type { VariantProps } from 'tailwind-variants'
import * as AvatarPrimitive from '@radix-ui/react-avatar'
import { cn } from '../../utils/cn'
import { avatarFallbackVariants, avatarImageVariants, avatarRootVariants } from './avatar.variants'

type AvatarProps = ComponentPropsWithRef<typeof AvatarPrimitive.Root> &
  VariantProps<typeof avatarRootVariants>

export function Avatar({ className, size, ref, ...props }: AvatarProps) {
  return (
    <AvatarPrimitive.Root
      ref={ref}
      className={cn(avatarRootVariants({ size }), className)}
      {...props}
    />
  )
}
Avatar.displayName = AvatarPrimitive.Root.displayName

export function AvatarImage({
  className,
  ref,
  ...props
}: ComponentPropsWithRef<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image ref={ref} className={cn(avatarImageVariants(), className)} {...props} />
  )
}
AvatarImage.displayName = AvatarPrimitive.Image.displayName

export function AvatarFallback({
  className,
  ref,
  ...props
}: ComponentPropsWithRef<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      ref={ref}
      className={cn(avatarFallbackVariants(), className)}
      {...props}
    />
  )
}
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName
