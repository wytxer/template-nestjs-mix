import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { AdminInfoVo } from '@vos/admin.vo'

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService, private readonly config: ConfigService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const token = request.cookies[this.config.get('cookie.key')]
    const admin = this.jwtService.decode(token) as AdminInfoVo
    request.admin = admin
    return true
  }
}
