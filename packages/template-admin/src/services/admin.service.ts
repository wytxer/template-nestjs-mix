import { Injectable, ForbiddenException, BadRequestException } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'

import * as moment from 'moment'
import { AdminEntity } from 'entities'
import { CryptoService } from './crypto.service'
import { AdminLoginDto } from '@dtos/admin.dto'
import { AdminInfoVo } from '@vos/admin.vo'

@Injectable()
export class AdminService {
  constructor(
    private readonly cryptoService: CryptoService,

    @InjectModel(AdminEntity)
    private readonly adminRepo: typeof AdminEntity
  ) {}

  /**
   * 验证管理员是否存在
   * @returns
   */
  async validateAdmin(admin: AdminInfoVo) {
    const count = await this.adminRepo.count({
      where: { adminId: admin.adminId }
    })
    return count > 0
  }

  /**
   * 登录
   * @param body
   */
  async login(body: AdminLoginDto): Promise<AdminInfoVo> {
    const admin = await this.adminRepo.findOne({
      where: { jobNumber: body.jobNumber },
      attributes: ['id', 'adminId', 'name', 'jobNumber', 'password', 'isEnabled', 'loggedAt', 'createdAt']
    })
    if (!admin) {
      throw new BadRequestException('账号或密码错误')
    }
    // 检查账号状态是否正常
    if (!admin.isEnabled) {
      throw new ForbiddenException('账号已被禁用，请联系管理员')
    }
    // 校验密码
    if (!this.cryptoService.passwordVerify(body.password, admin.password)) {
      throw new BadRequestException('账号或密码错误')
    }

    // 更新登录时间
    const loggedAt = moment().format('YYYY-MM-DD HH:mm:ss')
    await admin.update({ loggedAt })
    const { adminId, name, jobNumber, isEnabled, createdAt } = admin
    // 组装需要返回的数据
    return {
      adminId,
      name,
      jobNumber,
      isEnabled,
      loggedAt,
      createdAt
    }
  }

  /**
   * 获取管理员信息
   * @param adminId
   * @returns
   */
  async info(adminId: string): Promise<AdminInfoVo> {
    return this.adminRepo
      .findOne({
        where: { adminId },
        attributes: ['id', 'adminId', 'name', 'jobNumber', 'isEnabled', 'loggedAt', 'createdAt']
      })
      .then(async (admin) => {
        if (!admin) {
          throw new BadRequestException('管理员不存在')
        }
        // 检查账号状态是否正常
        if (!admin.isEnabled) {
          throw new ForbiddenException('账号已被禁用，请联系管理员')
        }
        // 更新登录时间
        const loggedAt = moment().format('YYYY-MM-DD HH:mm:ss')
        await admin.update({ loggedAt })
        const { adminId, name, jobNumber, isEnabled, createdAt } = admin
        // 组装需要返回的数据
        return {
          adminId,
          name,
          jobNumber,
          isEnabled,
          loggedAt,
          createdAt
        }
      })
  }
}
