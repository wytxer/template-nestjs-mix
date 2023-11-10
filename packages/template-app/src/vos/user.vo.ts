import { PickType } from '@nestjs/swagger'
import { UserEntity } from 'entities'

/**
 * 用户信息接口文档
 */
export class UserInfoVo extends PickType(UserEntity, [
  'userId',
  'nickname',
  'avatarUrl',
  'phone',
  'loggedAt'
] as const) {}
