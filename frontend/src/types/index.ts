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
  is_alert: boolean
  is_finish: boolean
  create_time: string
  finish_time: string
  estimated_time: string
}

export type TaskData = {
  records: TaskItem[]
}
