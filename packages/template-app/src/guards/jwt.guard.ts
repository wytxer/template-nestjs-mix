import { Injectable, UnauthorizedException, ExecutionContext } from '@nestjs/common'
import { Request } from 'express'
import { AuthGuard } from '@nestjs/passport'
import { ConfigService } from '@nestjs/config'
import { Observable } from 'rxjs'

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  constructor(private readonly config: ConfigService) {
    super()
  }

  // 指定路由开放场景值校验
  private backWhitelist: string[] = ['/api/v1/user/detail']

  handleRequest(error: string, user: any) {
    if (error || !user) {
      throw new UnauthorizedException('请登录后再操作')
    }
    return user
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest()
    const whitelist: string[] = this.config.get('server.authWhitelist') || []

    if (whitelist.find((url) => url === request.route.path)) {
      return true
    }
    if (this.backWhitelist.find((url) => url === request.route.path) && request.headers.scene === '1154') {
      return true
    }
    return super.canActivate(context)
  }
}
