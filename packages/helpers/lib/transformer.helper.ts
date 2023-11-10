import { TransformFnParams } from 'class-transformer'
import * as jsXss from 'xss'

const whiteList = {}
// 标签都支持 style 属性
Object.entries(jsXss.whiteList).forEach(([key, value]) => {
  whiteList[key] = ['style'].concat(value)
})
const xss = new jsXss.FilterXSS({
  css: false,
  whiteList
})

// 过滤 xss 脚本
export const transformText = (data: TransformFnParams) => xss.process(data.value)
