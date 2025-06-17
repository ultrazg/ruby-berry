import {
  ReadConfig as ReadConfigGo,
  UpdateConfig as UpdateConfigGo,
} from 'wailsjs/go/main/App'
import { TaskItem } from '@/types'
import { toast } from '@/utils/toast'

export const ReadConfig = async () => await ReadConfigGo()

export const UpdateConfig = async (id: string, taskItem: TaskItem) =>
  await UpdateConfigGo(id, taskItem)
    .then((res) => {
      if (res.flag) {
        toast('更新成功', {
          type: 'success',
        })
      } else {
        toast(res.error, {
          type: 'warn',
        })
      }
    })
    .catch((err) => {
      console.error(err)
    })
