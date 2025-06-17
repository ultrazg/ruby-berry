import React, { useEffect, useState } from 'react'
import styles from './index.module.scss'
import RubyBerry from '@/assets/images/RubyBerry.png'
import { GetEnv, toast, ReadConfig, UpdateConfig } from '@/utils'
import { EnvInfo, TaskItem } from '@/types'
import { Button, UpdateIcon } from '@/components'

/**
 * About page
 * @constructor
 */
export const About: React.FC = () => {
  const [envInfo, setEnvInfo] = useState<EnvInfo>({
    app_name: '',
    app_version: '',
    build: '',
    arch: '',
    platform: '',
  })

  const onReadConfig = () => {
    ReadConfig()
      .then((res) => {
        if (res.flag) {
          console.log('true', res.task_data)
        } else {
          console.log('false', res.error)
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }

  const onUpdateConfig = async () => {
    const taskItem: TaskItem = {
      id: '1',
      title: '睡觉',
      is_alert: true,
      is_finish: true,
      create_time: '2023-01-02 03:04:05',
      finish_time: '2023-01-02 03:04:05',
      estimated_time: '2023-01-02 03:04:05',
    }

    await UpdateConfig('1', taskItem)
  }

  useEffect(() => {
    GetEnv()
      .then((res) => {
        setEnvInfo(res)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [])

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <img
          alt="app_logo"
          src={RubyBerry}
        />

        <p>{envInfo.app_name}</p>

        <p>
          Version: {envInfo.app_version}（{envInfo.build}）
        </p>

        <p>© {new Date().getFullYear()} unknown.</p>

        <p>May you shine like a ruby.</p>
      </div>

      <div className={styles.optionButton}>
        <Button
          variant="soft"
          onClick={async () => {
            // onReadConfig()
            await onUpdateConfig()
          }}
        >
          <UpdateIcon />
          检查更新...
        </Button>
      </div>
    </div>
  )
}
