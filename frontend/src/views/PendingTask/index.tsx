import React, { useState } from 'react'
import { Box, Card, Flex, Switch, TextField } from '@radix-ui/themes'
import styles from './index.module.scss'
import { Button, Empty } from '@/components'

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

        {hasFocus && <div className={styles.extraLayout}>extra</div>}
      </div>

      <Card className={hasFocus ? styles.taskWrapperExtra : styles.taskWrapper}>
        <Empty title="无事件，享受每一天！" />
      </Card>
    </div>
  )
}
