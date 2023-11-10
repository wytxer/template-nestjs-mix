import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { UserInfoVo } from '@vos/user.vo'

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService, private readonly config: ConfigService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const token = request.cookies[this.config.get('cookie.key')]
    request.user = this.jwtService.decode(token) as UserInfoVo
    return true
  }
}
