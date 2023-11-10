/* eslint-disable @typescript-eslint/no-unused-vars */
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator'

// 表情包符号
export const regexEmoji =
  /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/gi
// 手机号（宽松校验）
export const regexPhone = /^(\+)?\d{7,20}$/
// 特殊字符
export const regexSpecialChat = /[`~!@#$%^&*()+=|{}':;',\[\].<>/?~！@#￥%……&*（）——+|{}【】‘；：”“’。，、？•·]/gi
// 中文字符
export const regexChineseChat = /^[\u4e00-\u9fa5]+$/
// 中文字符大小写字母数字和下划线组合
export const regexCnEnNumberOrUnderlineChat = /^[\u4e00-\u9fa50-9A-Za-z_]+$/
// 8 至 16 位大小写字母数字下划线特殊字符组合（密码）
export const regexPassword = /^[a-zA-Z0-9_`~!@#$%^&*()_+<>?:"{},.\\/;'[\]]{8,16}$/

// 不包含表情符号
@ValidatorConstraint({ name: 'NotIncludedEmoji', async: false })
export class NotIncludedEmoji implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    return !regexEmoji.test(text)
  }
  defaultMessage(args: ValidationArguments) {
    return 'Text ($value) emoji not supported'
  }
}

// 全球手机号
@ValidatorConstraint({ name: 'IsGlobalPhone', async: false })
export class IsGlobalPhone implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    return regexPhone.test(text)
  }
  defaultMessage(args: ValidationArguments) {
    return 'Text ($value) format error'
  }
}

// 不包含特殊字符
@ValidatorConstraint({ name: 'NotIncludedSpecialChat', async: false })
export class NotIncludedSpecialChat implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    return !regexSpecialChat.test(text)
  }
  defaultMessage(args: ValidationArguments) {
    return 'Text ($value) special characters are not supported'
  }
}

// 中文字符
@ValidatorConstraint({ name: 'IsChineseChat', async: false })
export class IsChineseChat implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    return regexChineseChat.test(text)
  }
  defaultMessage(args: ValidationArguments) {
    return 'Text ($value) must be chinese characters'
  }
}

// 中文字符大小写字母数字和下划线组合
@ValidatorConstraint({ name: 'IsCnEnNumberOrUnderlineChat', async: false })
export class IsCnEnNumberOrUnderlineChat implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    return regexCnEnNumberOrUnderlineChat.test(text)
  }
  defaultMessage(args: ValidationArguments) {
    return 'Text ($value) must be chinese, english, number or underline characters'
  }
}

// 密码
@ValidatorConstraint({ name: 'IsPassword', async: false })
export class IsPassword implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    return regexPassword.test(text)
  }
  defaultMessage(args: ValidationArguments) {
    return 'Text ($value) must be a combination of 8 to 16 uppercase and lowercase alphanumeric underscore special characters'
  }
}
