import React, { useEffect, useState } from 'react'
import { Card, Flex, IconButton, Switch, TextField } from '@radix-ui/themes'
import styles from './index.module.scss'
import {
  Button,
  CheckLineIcon,
  Empty,
  ResetIcon,
  TrashIcon,
} from '@/components'
import { toast, ReadConfig } from '@/utils'
import { TaskData, TaskItem } from '@/types'
import dayjs from 'dayjs'

/**
 * PendingTask page
 * @constructor
 */
export const PendingTask: React.FC = () => {
  const [hasFocus, setHasFocus] = useState<boolean>(false)
  const [tasks, setTasks] = useState<TaskData>()
  const [taskTitle, setTaskTitle] = useState<string>('')
  const [estimatedTime, setEstimatedTime] = useState<string>('')
  const [isAlert, setIsAlert] = useState<boolean>(false)

  useEffect(() => {
    ReadConfig()
      .then((res) => {
        if (res.flag) {
          setTasks(res.task_data)

          console.log(res.task_data)
        } else {
          toast(res.error, {
            type: 'warn',
          })
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }, [])

  const onCreate = () => {
    // const taskItem: TaskItem = {
    //   id: String(dayjs().valueOf()),
    //   title: taskTitle,
    //
    // }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.form}>
        <div className={styles.inputLayout}>
          <TextField.Root
            className={styles.input}
            placeholder="添加一条待办..."
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
            <div className={styles.extraOption}>
              <label>计划完成时间：</label>
              <input
                className={styles.timePicker}
                type="datetime-local"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  console.log(e.target.value)
                }}
              />
            </div>

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
          </div>
        )}
      </div>

      <div className={hasFocus ? styles.taskWrapperExtra : styles.taskWrapper}>
        {tasks?.records.length === 0 && <Empty title="无事件，享受每一天！" />}
        {tasks?.records.map((item: TaskItem) => (
          <Card
            style={{ marginBottom: 12 }}
            key={item.id}
          >
            <div className={styles.taskItem}>
              <div className={styles.info}>
                <div className={styles.taskTitle}>{item.title}</div>

                <div className={styles.taskDetail}>
                  <span>
                    <label>计划完成时间：</label>
                    {item.estimated_time}
                    <label>提醒：</label>
                    {item.is_alert ? '已启用' : '已禁用'}
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
                      toast('心想事成', {
                        type: 'success',
                      })
                    }}
                  >
                    <CheckLineIcon />
                  </IconButton>

                  <IconButton
                    size="1"
                    variant="soft"
                    title="删除"
                    onClick={() => {
                      toast('Error: Delete failed', {
                        type: 'warn',
                        duration: 5000,
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
    </div>
  )
}
