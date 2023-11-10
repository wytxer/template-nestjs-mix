import { Model, Table, Column, DataType } from 'sequelize-typescript'
import { ApiProperty } from '@nestjs/swagger'

@Table({
  tableName: 'admin',
  comment: '管理员表'
})
export class AdminEntity extends Model {
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    comment: 'id'
  })
  @ApiProperty({ description: 'id', example: 1 })
  id: number

  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
    comment: '管理员 id'
  })
  @ApiProperty({ description: '管理员 id', example: '2aa256bf-dae6-48b2-a236-f87cf62a5ecf' })
  adminId: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
    comment: '管理员名称'
  })
  @ApiProperty({ description: '管理员名称', example: '韩立' })
  name: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
    comment: '工号'
  })
  @ApiProperty({ description: '工号', example: 'root' })
  jobNumber: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
    comment: '登陆密码'
  })
  @ApiProperty({ description: '登陆密码', example: '123456' })
  password: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
    comment: '描述'
  })
  @ApiProperty({ description: '描述', example: '内部管理员' })
  description: string

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
    comment: '账号状态，true：启用，false：禁用'
  })
  @ApiProperty({ description: '账号状态，true：启用，false：禁用', enum: [true, false], example: true })
  isEnabled: boolean

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '最后登录时间'
  })
  @ApiProperty({ description: '最后登录时间，可能为空', example: '2020-01-01 00:00:00' })
  loggedAt?: string

  @Column({
    type: DataType.DATE,
    allowNull: false
  })
  @ApiProperty({ description: '创建时间', example: '2020-01-01 00:00:00' })
  createdAt: string

  @Column({
    type: DataType.DATE,
    allowNull: false
  })
  @ApiProperty({ description: '修改时间', example: '2020-01-01 00:00:00' })
  updatedAt: string

  @Column({
    type: DataType.DATE,
    allowNull: true
  })
  @ApiProperty({ description: '删除时间', example: '2020-01-01 00:00:00' })
  deletedAt?: string
}
