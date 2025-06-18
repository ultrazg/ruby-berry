import React, { useEffect, useState } from 'react'
import styles from './index.module.scss'
import { Card, Flex, IconButton } from '@radix-ui/themes'
import { Button, Empty, Modal, ResetIcon, TrashIcon } from '@/components'
import {
  DeleteTaskData,
  generateNowTimestamp,
  ReadTaskData,
  timestampToDate,
  toast,
  UpdateTaskData,
} from '@/utils'
import { TaskItem } from '@/types'

/**
 * FinishedTask page
 * @constructor
 */
export const FinishedTask: React.FC = () => {
  const [tasks, setTasks] = useState<TaskItem[]>()
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

          console.log('MAYDAY', res.task_data)

          res.task_data.records.forEach((item) => {
            if (item.isFinish) {
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

  const onReset = (taskItem: TaskItem) => {
    const newTaskItem: TaskItem = {
      ...taskItem,
      isFinish: false,
      finishTime: String(generateNowTimestamp()),
    }

    UpdateTaskData(taskItem.id, newTaskItem)
      .then((res) => {
        if (res.flag) {
          toast('已重置', {
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
      {tasks?.length === 0 && <Empty />}

      {tasks?.map((item) => (
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
                <span>计划完成：{item.estimatedTime || '--'}</span>
                <span>实际完成：{item.finishTime || '--'}</span>
              </div>
            </div>

            <div className={styles.options}>
              <Flex gap="2">
                <IconButton
                  size="1"
                  variant="soft"
                  title="重置为待办"
                  onClick={() => {
                    onReset(item)
                  }}
                >
                  <ResetIcon />
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
