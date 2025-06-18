import React, { useEffect, useState } from 'react'
import { Card, Flex, IconButton, Switch, TextField } from '@radix-ui/themes'
import styles from './index.module.scss'
import { Button, CheckLineIcon, Empty, TrashIcon, Modal } from '@/components'
import {
  toast,
  generateNowTimestamp,
  timestampToDate,
  ReadTaskData,
  AddTaskData,
  DeleteTaskData,
  UpdateTaskData,
} from '@/utils'
import { TaskItem } from '@/types'
import dayjs from 'dayjs'

/**
 * PendingTask page
 * @constructor
 */
export const PendingTask: React.FC = () => {
  const [hasFocus, setHasFocus] = useState<boolean>(false)
  const [tasks, setTasks] = useState<TaskItem[]>()
  const [taskTitle, setTaskTitle] = useState<string>('')
  const [estimatedTime, setEstimatedTime] = useState<string>('')
  const [isAlert, setIsAlert] = useState<boolean>(false)
  const [modalInfo, setModalInfo] = useState({
    open: false,
    id: '',
    title: '',
  })

  const getTaskData = () => {
    ReadTaskData()
      .then((res) => {
        if (res.flag) {
          const taskList: TaskItem[] = []

          res.task_data.records.forEach((item) => {
            if (!item.isFinish) {
              return taskList.push({
                ...item,
                createTime: timestampToDate(Number(item.createTime)),
                estimatedTime: timestampToDate(Number(item.estimatedTime)),
                finishTime: timestampToDate(Number(item.finishTime)),
              })
            }
          })

          setTasks(taskList)
        } else {
          toast(res.error, {
            type: 'warn',
          })
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }

  const onFinish = (taskItem: TaskItem) => {
    console.log('taskItem', taskItem)

    const newTaskItem: TaskItem = {
      ...taskItem,
      isFinish: true,
      finishTime: String(generateNowTimestamp()),
    }

    console.log('newTaskItem', newTaskItem)

    UpdateTaskData(taskItem.id, newTaskItem)
      .then((res) => {
        if (res.flag) {
          toast('已完成', {
            type: 'success',
          })

          getTaskData()
        } else {
          toast(res.error, {
            type: 'warn',
          })
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }

  const onCreate = () => {
    const taskItem: TaskItem = {
      id: String(generateNowTimestamp()),
      title: taskTitle,
      isAlert: isAlert,
      isFinish: false,
      estimatedTime: estimatedTime,
      createTime: String(generateNowTimestamp()),
      finishTime: '',
    }

    AddTaskData(taskItem)
      .then((res) => {
        if (!res) {
          toast('已添加', {
            type: 'success',
          })

          getTaskData()
        } else {
          toast(res, {
            type: 'warn',
          })
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }

  const onDelete = (id: string) => {
    DeleteTaskData(id)
      .then((res) => {
        if (res) {
          toast(res, {
            type: 'warn',
          })
        } else {
          setModalInfo({
            open: false,
            id: '',
            title: '',
          })

          toast('已删除', {
            type: 'success',
          })

          getTaskData()
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }

  useEffect(() => {
    getTaskData()
  }, [])

  return (
    <div className={styles.wrapper}>
      <div className={styles.form}>
        <div className={styles.inputLayout}>
          <TextField.Root
            className={styles.input}
            placeholder="添加一条待办任务..."
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTaskTitle(e.target.value)
            }
          />

          <div className={styles.button}>
            <Button
              disabled={!taskTitle}
              onClick={() => {
                onCreate()
              }}
            >
              添 加
            </Button>
            <Button
              disabled={!taskTitle}
              variant="soft"
              onClick={() => {
                setHasFocus(!hasFocus)
              }}
            >
              {hasFocus ? '收 起' : '展 开'}
            </Button>
          </div>
        </div>

        {hasFocus && (
          <div className={styles.extraLayout}>
            <div
              className={styles.extraOption}
              title="将在任务计划完成时间前一小时发出系统提醒"
            >
              <label>是否提醒：</label>
              <Switch
                checked={isAlert}
                onCheckedChange={(checked: boolean) => setIsAlert(checked)}
              />
            </div>

            {isAlert && (
              <div className={styles.extraOption}>
                <label>计划完成时间：</label>
                <input
                  className={styles.timePicker}
                  type="datetime-local"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const time = String(
                      Math.floor(dayjs(e.target.value).valueOf() / 1000),
                    )
                    setEstimatedTime(time)
                  }}
                />
              </div>
            )}
          </div>
        )}
      </div>

      <div className={hasFocus ? styles.taskWrapperExtra : styles.taskWrapper}>
        {tasks?.length === 0 && <Empty title="无事件，享受每一天！" />}
        {tasks?.map((item: TaskItem) => (
          <Card
            style={{ marginBottom: 12 }}
            key={item.id}
          >
            <div className={styles.taskItem}>
              <div className={styles.info}>
                <div
                  className={styles.taskTitle}
                  title={item.title}
                >
                  {item.title}
                </div>

                <div className={styles.taskDetail}>
                  <span>
                    <label>提醒：</label>
                    {item.isAlert ? '启用' : '禁用'}

                    <label>计划完成时间：</label>
                    {item.estimatedTime || '--'}
                  </span>
                </div>
              </div>

              <div className={styles.options}>
                <Flex gap="2">
                  <IconButton
                    color="green"
                    size="1"
                    variant="soft"
                    title="标记为完成"
                    onClick={() => {
                      onFinish(item)
                    }}
                  >
                    <CheckLineIcon />
                  </IconButton>

                  <IconButton
                    size="1"
                    variant="soft"
                    title="删除"
                    onClick={() => {
                      setModalInfo({
                        open: true,
                        id: item.id,
                        title: item.title,
                      })
                    }}
                  >
                    <TrashIcon />
                  </IconButton>
                </Flex>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Modal
        title="提示"
        width="400px"
        open={modalInfo.open}
        options={
          <>
            <Button
              variant="soft"
              onClick={() => {
                onDelete(modalInfo.id)
              }}
            >
              确定
            </Button>
          </>
        }
        onClose={(r) => {
          setModalInfo({
            open: false,
            id: '',
            title: '',
          })

          if (r) {
            getTaskData()
          }
        }}
      >
        <p>确定要删除任务：{modalInfo.title} 吗？</p>
      </Modal>
    </div>
  )
}
