import React, { useEffect, useState } from 'react'
import styles from './index.module.scss'
import RubyBerry from '@/assets/images/RubyBerry.png'
import { GetEnv, toast } from '@/utils'
import { EnvInfo } from '@/types'
import { Button, UpdateIcon } from '@/components'

/**
 * About page
 * @constructor
 */
export const About: React.FC = () => {
  const [envInfo, setEnvInfo] = useState<EnvInfo>({
    app_name: '',
    app_version: '',
    arch: '',
    platform: '',
  })

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

        <p>Version: {envInfo.app_version}</p>

        <p>© 2025 unknown.</p>

        <p>May you shine like a ruby</p>
      </div>

      <div className={styles.optionButton}>
        <Button
          size="1"
          variant="soft"
          onClick={() => {
            toast('当前已是最新版本！', {
              type: 'success',
            })
          }}
        >
          <UpdateIcon />
          检查更新...
        </Button>
      </div>
    </div>
  )
}
