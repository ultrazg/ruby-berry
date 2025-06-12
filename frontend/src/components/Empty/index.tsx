import React from 'react'
import EmptyIcon from '@/assets/images/empty.png'
import styles from './index.module.scss'

type IProps = {
  title?: string
}

export const Empty: React.FC<IProps> = ({ title }) => {
  return (
    <div className={styles.wrapper}>
      <img
        src={EmptyIcon}
        alt="empty"
      />

      <div className={styles.title}>{title || '暂无数据'}</div>
    </div>
  )
}
