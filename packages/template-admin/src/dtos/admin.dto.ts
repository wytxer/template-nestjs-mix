import { IsNotEmpty, IsString, IsUUID, MaxLength, MinLength } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

/**
 * 管理员 id
 */
export class AdminAdminIdDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  @ApiProperty({ description: '管理员 id', example: 'dc9608af-6cfd-4493-851d-8de6f8d25576' })
  adminId: string
}

/**
 * 管理员登录接口参数
 */
export class AdminLoginDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(6)
  @ApiProperty({ description: '工号', example: 'root' })
  jobNumber: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: '密码',
    example:
      'Qlm0q9wk1EsSsVCjPbW2YK1wzhGNs0srWh/ZHn8HBPh8xBxKurd1+IoXZsozHkQ6Flfcc5HBo3I6U450ZdmuwXtijf3l3GiNm5WMKsbQzmzTO7PG9CjvmJGxRGmvgaxoqAxkQGeY74zKDZw8RESj0c4ygpXhEuWVPj5RGXfUhY8NFnWrjtCumsMJ0+LbzPLjeYUTmNC8IKPvnrOlsU+cTN/2lfVniFvRHYAGvSzScsC59ET3iGIk/DibNKwTe0XnNeeQhKzs823N2BOFeZXDbb8P3sOtmpxJ+iPyXLy55ZRwEvGB4AzLDZpd+9Zo4wZlB5kcsnVtiqP+tbclUbsBWQ=='
  })
  password: string
}
