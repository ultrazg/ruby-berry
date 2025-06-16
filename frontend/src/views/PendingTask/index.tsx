import React, { useState } from 'react'
import {
  Box,
  Card,
  Flex,
  IconButton,
  Switch,
  TextField,
} from '@radix-ui/themes'
import styles from './index.module.scss'
import {
  Button,
  CheckLineIcon,
  Empty,
  ResetIcon,
  TrashIcon,
} from '@/components'
import { toast } from '@/utils'

/**
 * PendingTask page
 * @constructor
 */
export const PendingTask: React.FC = () => {
  const [hasFocus, setHasFocus] = useState<boolean>(false)

  return (
    <div className={styles.wrapper}>
      <div className={styles.form}>
        <div className={styles.inputLayout}>
          <TextField.Root
            className={styles.input}
            placeholder="添加一条待办..."
          />

          <div className={styles.button}>
            <Button>添 加</Button>
            <Button
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
                  const localTime: string = new Date(
                    e.target.value,
                  ).toLocaleString('zh-CN', {
                    hour12: false,
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                  })

                  console.log(localTime)
                }}
              />
            </div>

            <div
              className={styles.extraOption}
              title="将在任务计划完成时间前一小时发出系统提醒"
            >
              <label>是否提醒：</label>
              <Switch />
            </div>
          </div>
        )}
      </div>

      <div className={hasFocus ? styles.taskWrapperExtra : styles.taskWrapper}>
        {/*<Empty title="无事件，享受每一天！" />*/}

        <Card style={{ marginBottom: 12 }}>
          <div className={styles.taskItem}>
            <div className={styles.info}>
              <div className={styles.taskTitle}>吃饭</div>

              <div className={styles.taskDetail}>
                <span>
                  <label>计划完成时间：</label>2025-06-13 11:41
                  <label>提醒：</label>已启用
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
      </div>
    </div>
  )
}
