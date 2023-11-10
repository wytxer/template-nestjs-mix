import { PickType } from '@nestjs/swagger'
import { AdminEntity } from 'entities'

/**
 * 管理员信息接口文档
 */
export class AdminInfoVo extends PickType(AdminEntity, [
  'adminId',
  'name',
  'jobNumber',
  'isEnabled',
  'loggedAt',
  'createdAt'
] as const) {}
