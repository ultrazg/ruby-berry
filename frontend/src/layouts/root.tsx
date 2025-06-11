import React from 'react'
import styles from './root.module.scss'
import RubyBerry from '@/assets/images/RubyBerry.png'
import { version } from '../../package.json'
import { CheckIcon, MinusIcon } from '@/components'
import { NavLink, Outlet } from 'react-router-dom'

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

        <div className={styles.navList}>
          <NavLink
            className={({ isActive }) =>
              isActive ? styles.navItemActive : styles.navItem
            }
            to="pending"
          >
            <MinusIcon />
            待办事项
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              isActive ? styles.navItemActive : styles.navItem
            }
            to="finished"
          >
            <CheckIcon />
            已办事项
          </NavLink>
        </div>

        <div className={styles.version}>v{version}</div>
      </div>

      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  )
}
