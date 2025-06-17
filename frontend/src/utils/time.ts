import dayjs from 'dayjs'

/**
 * 获取当前时间戳（秒）
 */
export const generateNowTimestamp = () => Math.floor(dayjs().valueOf() / 1000)

/**
 * 时间戳转日期
 * @param timestamp 时间戳（秒）
 */
export const timestampToDate = (timestamp: number) => {
  if (timestamp === 0) {
    return ''
  }

  return dayjs(timestamp * 1000).format('YYYY-MM-DD HH:mm:ss')
}
