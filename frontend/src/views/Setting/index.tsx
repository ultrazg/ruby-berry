import React from 'react'
import styles from './index.module.scss'
import { Box, Card, Flex, Separator, Switch } from '@radix-ui/themes'

/**
 * setting page
 * @constructor
 */
export const Setting = () => {
  return (
    <div className={styles.wrapper}>
      <Card>
        <Flex
          gap="3"
          align="center"
        >
          <Box style={{ width: '100%', fontSize: 14 }}>启动时自动检查更新</Box>
          <Box style={{ width: '100px', textAlign: 'right' }}>
            <Switch checked={true} />
          </Box>
        </Flex>

        {/*<Separator*/}
        {/*  my="3"*/}
        {/*  size="4"*/}
        {/*/>*/}
      </Card>
    </div>
  )
}
