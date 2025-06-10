import React from 'react'
import styles from './index.module.scss'
import { Spin } from '@/components'
import RubyBerry from '@/assets/images/RubyBerry.png'

/**
 * launcher page
 * @constructor
 */
export const Launcher: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.logo}>
          <img alt="app_logo" src={RubyBerry} />
        </div>
        <div className={styles.spin}>
          <Spin size="3"/>
        </div>
      </div>
    </div>
  )
}
