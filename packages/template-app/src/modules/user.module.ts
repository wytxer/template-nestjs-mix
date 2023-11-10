import { Module, Inject, forwardRef, Injectable, UnauthorizedException } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'
import { Request } from 'express'
import { ConfigService } from '@nestjs/config'
import { PassportModule, PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { SequelizeModule } from '@nestjs/sequelize'
import { WechatAppModule } from 'nestjs-wechat-open-api'

import { UserEntity } from 'entities'
import { UserService } from '@services/user.service'
import { UserController } from '@controllers/user.controller'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly config: ConfigService
  ) {
    super({
      ignoreExpiration: false,
      secretOrKey: config.get('jwt.secret'),
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request.cookies[this.config.get('cookie.key')]
        }
      ])
    })
  }

  // 校验当前用户是否存在
  async validate(user: any) {
    const hasUser = await this.userService.validateUser(user?.userId)
    if (!hasUser) throw new UnauthorizedException('用户不存在')
    return user
  }
}

@Module({
  imports: [
    SequelizeModule.forFeature([UserEntity]),
    HttpModule,
    PassportModule,
    WechatAppModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.get('wechat.wechatApp')
    })
  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
  exports: [UserService]
})
export class UserModule {}
