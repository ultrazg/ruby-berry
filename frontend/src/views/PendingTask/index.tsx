import React from 'react'
import { Box, Card, Flex, Switch, TextField } from '@radix-ui/themes'
import styles from './index.module.scss'
import { Button } from '@/components'

/**
 * PendingTask page
 * @constructor
 */
export const PendingTask: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.from}>
        <div className={styles.inputLayout}>
          <TextField.Root placeholder="添加一条待办" />
        </div>

        <div className={styles.buttonLayout}>
          <Button>添加</Button>
        </div>
      </div>

      <Card></Card>
    </div>
  )
}
