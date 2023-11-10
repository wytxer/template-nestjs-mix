import { v4 } from 'uuid'
import * as moment from 'moment'
import { randomBytes } from 'crypto'

interface ICreateAtIntervalOptions {
  startAt: string
  endAt: string
  interval?: number
  startIndex?: number
  endOffset?: number
}

interface ICreateAtIntervalTime {
  hour: string
  time: string
  [key: string]: number | string
}

/**
 * 对象转字符串
 * @param data
 * @returns
 */
export const objectToString = (data: Record<string, string | boolean | number>): string => {
  return Object.entries(data)
    .map(([key, value]) => `${key}=${value}`)
    .join('&')
}

/**
 * 生成 uuid
 * @returns
 */
export const createUuid = (): string => v4()

/**
 * 组装树状结构的数据
 * @param data
 * @param parentKey
 * @param parentId
 * @return
 */
export const toTreeData = (data: any[], parentKey: string, parentId = 0) => {
  if (data.length <= 0) return []
  function traverse(id: number | string) {
    const res = []
    const items = data.filter((item) => item[parentKey] === id)
    if (items.length <= 0) return null
    items.forEach((item) => {
      const newItem: Record<string, any> = { ...item }
      const children = traverse(item.id)
      if (children && children.length) newItem.children = children
      res.push(newItem)
    })
    return res
  }
  return traverse(parentId)
}

/**
 * 指定时间范围下生成指定时间间隔的数组数据
 * @param options.startAt 开始时间
 * @param options.endAt 结束时间
 * @param options.interval 间隔值
 * @param options.startIndex 开始循坏的下标
 * @param options.endOffset 结束循坏的下标
 * @returns
 */
export const createAtInterval = (options: ICreateAtIntervalOptions): ICreateAtIntervalTime[] => {
  const { startAt, endAt, interval = 60, startIndex = 0, endOffset = 1 } = options
  const starTime = moment(startAt)
  const endTime = moment(endAt)
  const diff = endTime.diff(starTime, 'minutes')
  const sum = Math.ceil(diff / interval)
  const times = []

  for (let i = startIndex; i <= sum - endOffset; i += 1) {
    const t = starTime.clone().add(i * interval, 'minutes')
    times.push({
      time: t.format('YYYY-MM-DD')
    })
  }
  return times
}

/**
 * 生成指定长度的随机字符串
 * @param length 长度
 * @return
 */
export const cryptoRandomCharacter = (length = 8): string => {
  return randomBytes(Math.ceil(length / 2))
    .toString('hex')
    .slice(0, length)
}
