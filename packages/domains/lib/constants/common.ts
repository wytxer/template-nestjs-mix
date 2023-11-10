import type { IConstValue } from '../interfaces'

/**
 * 排序方式枚举
 */
export enum SortOrderEnum {
  desc = 'DESC',
  asc = 'ASC'
}

/**
 * 客户端来源枚举
 */
export enum ClientSourceEnum {
  wechatApp = 'WECHAT_APP',
  pc = 'PC',
  unknown = 'UNKNOWN'
}
export class ClientSource {
  /**
   * 客户端来源列表
   * @returns
   */
  static values(): IConstValue[] {
    return [
      {
        label: '微信小程序',
        value: ClientSourceEnum.wechatApp
      },
      {
        label: '电脑端',
        value: ClientSourceEnum.pc
      },
      {
        label: '未知',
        value: ClientSourceEnum.unknown
      }
    ]
  }
  /**
   * 根据枚举值获取标签名称
   * @param value
   * @returns
   */
  static getLabelByValue(value: string): string {
    return ClientSource.values().find((item) => item.value === value)?.label
  }
  /**
   * 检查值是否有效
   * @returns
   */
  static valid(value: string): boolean {
    return !!ClientSource.values().find((item) => item.value === value)
  }
  /**
   * 将枚举转换成注释
   * @returns
   */
  static toComment(): string {
    return `客户端来源，${ClientSource.values()
      .map((item) => `${item.value}：${item.label}`)
      .join('，')}`
  }
}

/**
 * 产品标识枚举
 */
export enum ProductKeyEnum {
  admin = 'ADMIN',
  wechatApp = 'WECHAT_APP'
}
export class ProductKey {
  /**
   * 枚举列表
   * @returns
   */
  static values(): IConstValue[] {
    return [
      {
        label: '后台管理系统',
        value: ProductKeyEnum.admin
      },
      {
        label: '微信小程序',
        value: ProductKeyEnum.wechatApp
      }
    ]
  }
  /**
   * 根据枚举值获取标签名称
   * @param value
   * @returns
   */
  static getLabelByValue(value: string): string {
    return ProductKey.values().find((item) => item.value === value)?.label
  }
  /**
   * 将枚举转换成注释
   * @returns
   */
  static toComment(): string {
    return `产品，${ProductKey.values()
      .map((item) => `${item.value}：${item.label}`)
      .join('，')}`
  }
  /**
   * 检查值是否有效
   * @returns
   */
  static valid(value: string): boolean {
    return !!ProductKey.values().find((item) => item.value === value)
  }
}
