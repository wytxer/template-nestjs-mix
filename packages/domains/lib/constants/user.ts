import type { IConstValue } from '../interfaces'

/**
 * 性别枚举
 */
export enum GenderEnum {
  unknown = 'UNKNOWN',
  male = 'MALE',
  female = 'FEMALE'
}
export class Gender {
  /**
   * 性别列表
   * @returns
   */
  static values(): IConstValue[] {
    return [
      {
        label: '未知',
        value: GenderEnum.unknown
      },
      {
        label: '男',
        value: GenderEnum.male
      },
      {
        label: '女',
        value: GenderEnum.female
      }
    ]
  }
  /**
   * 根据枚举值获取标签名称
   * @param value
   * @returns
   */
  static getLabelByValue(value: string): string {
    return Gender.values().find((item) => item.value === value)?.label
  }
  /**
   * 将枚举转换成注释
   * @returns
   */
  static toComment(): string {
    return `性别枚举，${Gender.values()
      .map((item) => `${item.value}：${item.label}`)
      .join('，')}`
  }
}

/**
 * 用户类型枚举
 */
export enum UserTypeEnum {
  common = 'COMMON',
  vip = 'VIP',
  svip = 'SVIP'
}
export class UserType {
  /**
   * 用户类型列表
   * @returns
   */
  static values(): IConstValue[] {
    return [
      {
        label: '普通用户',
        value: UserTypeEnum.common
      },
      {
        label: 'VIP',
        value: UserTypeEnum.vip
      },
      {
        label: 'SVIP',
        value: UserTypeEnum.svip
      }
    ]
  }
  /**
   * 根据枚举值获取标签名称
   * @param value
   * @returns
   */
  static getLabelByValue(value: string): string {
    return UserType.values().find((item) => item.value === value)?.label
  }
  /**
   * 将枚举转换成注释
   * @returns
   */
  static toComment(): string {
    return `用户类型列表，${UserType.values()
      .map((item) => `${item.value}：${item.label}`)
      .join('，')}`
  }
}
