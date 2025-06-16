import { main } from 'wailsjs/go/models'
import React from 'react'

export type EnvInfo = main.EnvInfo

export type modalType = {
  title?: string
  width?: string
  open: boolean
  onClose: (refresh?: boolean) => void
  onOk?: (data?: any) => void
  children?: React.ReactNode
  options?: React.ReactNode
}
