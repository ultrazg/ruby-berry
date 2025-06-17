import React, { useEffect, useState } from 'react'
import styles from './root.module.scss'
import RubyBerry from '@/assets/images/RubyBerry.png'
import { version, name } from '../../package.json'
import { CheckIcon, MinusIcon, InfoIcon, SettingIcon } from '@/components'
import { Launcher } from '@/views'
import { NavLink, Outlet } from 'react-router-dom'

/**
 * root layout component
 * @constructor
 */
export const Root: React.FC = () => {
  const [hasNewVersion, setHasNewVersion] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 2500)
  }, [])

  return (
    <>
      {loading ? (
        <Launcher />
      ) : (
        <div className={styles.wrapper}>
          <div className={styles.nav}>
            <div className={styles.appLogo}>
              <img
                src={RubyBerry}
                alt="app_logo"
              />
            </div>

            <div className={styles.appName}>{name}</div>

            <div className={styles.navList}>
              <NavLink
                className={({ isActive }) =>
                  isActive ? styles.navItemActive : styles.navItem
                }
                to="/"
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
                <span
                  title="点击升级到最新版本"
                  className={styles.newVersionTag}
                >
                  发现新版本
                </span>
              )}
            </div>
          </div>

          <div className={styles.content}>
            <Outlet />
          </div>
        </div>
      )}
    </>
  )
}
