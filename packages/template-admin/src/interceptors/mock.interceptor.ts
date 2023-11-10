import { CallHandler, ExecutionContext, Injectable, NestInterceptor, NotFoundException } from '@nestjs/common'
import { Request } from 'express'
import { Observable } from 'rxjs'
import { IS_ONLINE } from 'helpers'

@Injectable()
export class MockInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request: Request = context.switchToHttp().getRequest()
    const { method, url } = request

    // 线上关闭访问权限
    if (IS_ONLINE) {
      throw new NotFoundException(`Cannot ${method.toUpperCase()} ${url}`)
    }
    return next.handle()
  }
}
