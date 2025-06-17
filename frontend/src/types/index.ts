import React from 'react'

export type EnvInfo = {
  app_name: string
  app_version: string
  build: string
  platform: string
  arch: string
}

export type modalType = {
  title?: string
  width?: string
  open: boolean
  onClose: (refresh?: boolean) => void
  onOk?: (data?: any) => void
  children?: React.ReactNode
  options?: React.ReactNode
}

export type TaskItem = {
  id: string
  title: string
  isAlert: boolean
  isFinish: boolean
  createTime: string
  finishTime: string
  estimatedTime: string
}

export type TaskData = {
  records: TaskItem[]
}
