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
    build: '',
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

        <p>
          Version: {envInfo.app_version}（{envInfo.build}）
        </p>

        <p>© {new Date().getFullYear()} unknown.</p>

        <p>May you shine like a ruby.</p>
      </div>

      <div className={styles.optionButton}>
        <Button
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
