import { Module, Injectable, forwardRef, Inject, UnauthorizedException } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { Request } from 'express'
import { JwtModule } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { PassportModule, PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

import { AdminEntity } from 'entities'
import { CryptoService } from '@services/crypto.service'
import { AdminService } from '@services/admin.service'
import { AdminController } from '@controllers/admin.controller'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly config: ConfigService,

    @Inject(forwardRef(() => AdminService))
    private readonly adminService: AdminService
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

  // 校验当前管理员是否存在
  async validate(admin) {
    const hasAdmin = await this.adminService.validateAdmin(admin)
    if (!hasAdmin) throw new UnauthorizedException('管理员不存在')
    return admin
  }
}

@Module({
  imports: [
    SequelizeModule.forFeature([AdminEntity]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get('jwt.secret'),
          signOptions: { expiresIn: config.get('jwt.expires') }
        }
      }
    }),
    PassportModule
  ],
  controllers: [AdminController],
  providers: [CryptoService, AdminService, JwtStrategy],
  exports: [AdminService]
})
export class AdminModule {}
