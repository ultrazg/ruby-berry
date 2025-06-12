import React from 'react'
import { Button as RButton } from '@radix-ui/themes'

type IProps = {
  size?: '1' | '2' | '3' | '4'
  disabled?: boolean
  variant?: 'classic' | 'solid' | 'soft' | 'surface' | 'outline' | 'ghost'
  children: React.ReactNode
  loading?: boolean
  onClick?: () => void
}

export const Button: React.FC<IProps> = ({
  children,
  size,
  disabled,
  variant,
  loading,
  onClick,
}) => {
  return (
    <RButton
      size={size}
      disabled={disabled}
      variant={variant}
      loading={loading}
      onClick={() => onClick?.()}
    >
      {children}
    </RButton>
  )
}
