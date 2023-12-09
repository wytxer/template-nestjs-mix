import { Model, Table, Column, DataType } from 'sequelize-typescript'
import { ApiProperty } from '@nestjs/swagger'
import { Gender, GenderEnum, ClientSource, ClientSourceEnum, UserType, UserTypeEnum } from 'domains'

const defaultAvatarUrl = 'https://static.bszhct.com/common/default-avatar.jpg'

@Table({
  tableName: 'user',
  comment: '用户表'
})
export class UserEntity extends Model {
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    unique: true,
    autoIncrement: true,
    comment: 'id'
  })
  @ApiProperty({ description: 'id', example: 1 })
  id: number

  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
    comment: '用户 id'
  })
  @ApiProperty({ description: '用户 id', example: '2aa256bf-dae6-48b2-a236-f87cf62a5ecf' })
  userId: string

  @Column({
    type: DataType.STRING,
    allowNull: true,
    comment: '同微信的 unionid'
  })
  unionId?: string

  @Column({
    type: DataType.STRING,
    allowNull: true,
    comment: '同微信的 openid'
  })
  openId?: string

  @Column({
    type: DataType.STRING(16),
    allowNull: false,
    comment: '用户昵称'
  })
  @ApiProperty({ description: '用户昵称', example: '张三' })
  nickname: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: defaultAvatarUrl,
    comment: '用户头像访问地址'
  })
  @ApiProperty({
    description: '用户头像访问地址',
    example: defaultAvatarUrl
  })
  avatarUrl: string

  @Column({
    type: DataType.STRING(64),
    allowNull: true,
    comment: '电话号码'
  })
  @ApiProperty({ description: '电话号码', example: '13722822221' })
  phone?: string

  /**
   * 微信授权已经获取不到真实性别等字段
   * @link https://developers.weixin.qq.com/community/develop/doc/00028edbe3c58081e7cc834705b801
   */
  @Column({
    type: DataType.STRING(64),
    allowNull: false,
    defaultValue: GenderEnum.unknown,
    comment: Gender.toComment()
  })
  @ApiProperty({
    description: Gender.toComment(),
    enum: GenderEnum,
    example: GenderEnum.unknown
  })
  gender: GenderEnum

  @Column({
    type: DataType.STRING(64),
    allowNull: false,
    defaultValue: ClientSourceEnum.pc,
    comment: ClientSource.toComment()
  })
  @ApiProperty({
    description: ClientSource.toComment(),
    enum: ClientSourceEnum,
    example: ClientSourceEnum.pc
  })
  clientSource: ClientSourceEnum

  @Column({
    type: DataType.STRING(64),
    allowNull: false,
    defaultValue: UserTypeEnum.common,
    comment: UserType.toComment()
  })
  @ApiProperty({
    description: UserType.toComment(),
    enum: UserTypeEnum,
    example: UserTypeEnum.common
  })
  userType: UserTypeEnum

  @Column({
    type: DataType.DATE(3),
    allowNull: true,
    comment: '最后登录时间，每次更新登录日志时更新'
  })
  @ApiProperty({ description: '最后登录时间', example: '2020-01-01 00:00:00' })
  loggedAt?: string

  @Column({
    type: DataType.DATE(3),
    allowNull: false
  })
  @ApiProperty({ description: '创建时间', example: '2020-01-01 00:00:00' })
  createdAt: string

  @Column({
    type: DataType.DATE(3),
    allowNull: false
  })
  @ApiProperty({ description: '更新时间', example: '2020-01-01 00:00:00' })
  updatedAt: string

  @Column({
    type: DataType.DATE(3),
    allowNull: true
  })
  @ApiProperty({ description: '删除时间', example: '2020-01-01 00:00:00' })
  deletedAt?: string
}
