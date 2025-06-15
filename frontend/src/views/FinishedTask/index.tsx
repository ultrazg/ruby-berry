import React from 'react'
import styles from './index.module.scss'
import { Card, Flex, IconButton } from '@radix-ui/themes'
import { ResetIcon, TrashIcon } from '@/components'
import { toast } from '@/utils'

/**
 * FinishedTask page
 * @constructor
 */
export const FinishedTask: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <Card style={{ marginBottom: 12 }}>
        <div className={styles.taskItem}>
          <div className={styles.info}>
            <div className={styles.taskTitle}>吃饭</div>

            <div className={styles.taskDetail}>
              <span>计划完成：2025-06-13 11:41</span>
              <span>实际完成：2025-06-13 11:41</span>
            </div>
          </div>

          <div className={styles.options}>
            <Flex gap="2">
              <IconButton
                size="1"
                variant="soft"
                title="重置为待办"
                onClick={() => {
                  toast('心想事成', {
                    type: 'success',
                  })
                }}
              >
                <ResetIcon />
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
  )
}
