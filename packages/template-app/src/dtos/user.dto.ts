import { IsNotEmpty, IsUUID, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

/**
 * 用户 id
 */
export class UserUserIdDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  @ApiProperty({ description: '用户 id', example: 'dc9608af-6cfd-4493-851d-8de6f8d25576' })
  userId: string
}

/**
 * 用户微信授权登录接口参数
 */
export class UserWechatLoginDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: '微信授权登录凭证', example: 'code' })
  code: string
}

/**
 * 用户微信授权获取手机号接口参数
 */
export class UserWechatGetPhoneDto extends UserUserIdDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: '微信授权手机号凭证', example: 'code' })
  code: string
}
