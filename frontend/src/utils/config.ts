import {
  ReadTaskData as ReadTaskDataGo,
  UpdateTaskData as UpdateTaskDataGo,
  AddTaskData as AddTaskDataGo,
} from 'wailsjs/go/main/App'
import { TaskItem } from '@/types'

export const ReadTaskData = async () => await ReadTaskDataGo()

export const UpdateTaskData = async (id: string, taskItem: TaskItem) =>
  await UpdateTaskDataGo(id, taskItem)

export const AddTaskData = async (taskItem: TaskItem) =>
  await AddTaskDataGo(taskItem)
