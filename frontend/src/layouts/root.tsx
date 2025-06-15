import React, { useState } from 'react'
import styles from './root.module.scss'
import RubyBerry from '@/assets/images/RubyBerry.png'
import { version, name } from '../../package.json'
import { CheckIcon, MinusIcon, InfoIcon, SettingIcon } from '@/components'
import { NavLink, Outlet } from 'react-router-dom'

/**
 * root layout component
 * @constructor
 */
export const Root: React.FC = () => {
  const [hasNewVersion, setHasNewVersion] = useState<boolean>(false)

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

          {/*<NavLink*/}
          {/*  className={({ isActive }) =>*/}
          {/*    isActive ? styles.navItemActive : styles.navItem*/}
          {/*  }*/}
          {/*  to="setting"*/}
          {/*>*/}
          {/*  <SettingIcon />*/}
          {/*  偏好设置*/}
          {/*</NavLink>*/}

          <NavLink
            className={({ isActive }) =>
              isActive ? styles.navItemActive : styles.navItem
            }
            to="about"
          >
            <InfoIcon />
            关于 {name}
          </NavLink>
        </div>

        <div className={styles.version}>
          v{version}
          {hasNewVersion && (
            <span className={styles.newVersionTag}>发现新版本</span>
          )}
        </div>
      </div>

      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  )
}
