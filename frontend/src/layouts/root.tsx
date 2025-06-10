import React from 'react'
import styles from './root.module.scss'
import RubyBerry from '@/assets/images/RubyBerry.png'
import { version } from '../../package.json'

/**
 * root layout component
 * @constructor
 */
export const Root: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.nav}>
        <div className={styles.appLogo}>
          <img
            src={RubyBerry}
            alt="app_logo"
          />
        </div>
        <div className={styles.appName}>RubyBerry</div>

        <div className={styles.version}>v{version}</div>
      </div>
      <div className={styles.content}>right</div>
    </div>
  )
}
