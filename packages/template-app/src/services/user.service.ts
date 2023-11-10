import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import * as moment from 'moment'
import { WechatAppService } from 'nestjs-wechat-open-api'
import { UserEntity } from 'entities'
import { UserWechatLoginDto, UserWechatGetPhoneDto } from '@dtos/user.dto'
import { UserInfoVo } from '@vos/user.vo'

@Injectable()
export class UserService {
  constructor(
    private readonly wechatAppService: WechatAppService,

    @InjectModel(UserEntity)
    private readonly userRepo: typeof UserEntity
  ) {}

  /**
   * 获取当前时间
   * @returns
   */
  private getNowAt(): string {
    return moment().format('YYYY-MM-DD HH:mm:ss')
  }

  /**
   * 生成随机的用户昵称
   * @returns
   */
  private generateRandomNickname() {
    return `用户${Math.floor(Math.random() * 9000) + 1000}`
  }

  /**
   * 验证用户是否存在
   * @returns
   */
  async validateUser(userId: string) {
    const count = await this.userRepo.count({
      where: { userId }
    })
    return count > 0
  }

  /**
   * 微信授权登录
   * @param body
   */
  async wechatLogin(body: UserWechatLoginDto): Promise<UserInfoVo> {
    // 微信登录凭证校验，通过 code 换取用户信息，包含 openId 和 unionId
    let token: Record<string, any>
    try {
      token = await this.wechatAppService.code2Session(body.code)
    } catch (error) {
      throw new BadRequestException(error)
    }

    const { openid: openId, unionid: unionId } = token
    return await this.userRepo
      .findOne({
        where: { openId },
        attributes: ['id', 'userId', 'nickname', 'avatarUrl', 'phone']
      })
      .then(async (user) => {
        const loggedAt = this.getNowAt()
        // 更新用户信息
        if (user) {
          await user.update({ loggedAt })
          const { userId, nickname, avatarUrl, phone } = user
          return { userId, nickname, avatarUrl, phone, loggedAt }
        }
        // 新增用户
        const nickname = this.generateRandomNickname()
        return await this.userRepo
          .create({ openId, unionId, nickname, loggedAt })
          .then(({ userId, avatarUrl, phone }) => {
            return { userId, nickname, avatarUrl, phone, loggedAt }
          })
      })
  }

  /**
   * 微信授权获取手机号
   * @param body
   */
  async wechatGetPhone(body: UserWechatGetPhoneDto): Promise<UserInfoVo> {
    // 获取登录凭证
    const token = await this.wechatAppService.accessToken()
    // 获取授权手机号
    const phoneData = await this.wechatAppService.getPhoneNumber(token.access_token, body.code)
    if (!phoneData) {
      throw new BadRequestException('微信手机号授权失败')
    }

    // 更新用户的手机号
    return await this.userRepo
      .findOne({
        where: { userId: body.userId },
        attributes: ['id', 'userId', 'nickname', 'avatarUrl', 'phone']
      })
      .then(async (user) => {
        const phone = phoneData.phone_info.phoneNumber
        const loggedAt = this.getNowAt()
        await user.update({ phone, loggedAt })
        const { userId, nickname, avatarUrl } = user
        return { userId, nickname, avatarUrl, phone, loggedAt }
      })
  }

  /**
   * 获取用户信息
   * @param userId
   */
  async info(userId: string): Promise<UserInfoVo> {
    return this.userRepo
      .findOne({
        where: { userId },
        attributes: ['id', 'userId', 'nickname', 'avatarUrl', 'phone']
      })
      .then(async (user) => {
        const loggedAt = this.getNowAt()
        // 更新用户登录时间
        await user.update({ loggedAt })
        const { userId, nickname, avatarUrl, phone } = user
        return { userId, nickname, avatarUrl, phone, loggedAt }
      })
  }
}
