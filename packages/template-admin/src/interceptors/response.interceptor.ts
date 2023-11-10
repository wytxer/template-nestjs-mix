import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { ConfigService } from '@nestjs/config'

export interface Response<T> {
  data: T
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  constructor(private readonly config: ConfigService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    const request = context.switchToHttp().getRequest()
    const whitelist: string[] = this.config.get('server.responseDataWhitelist') || []

    // 在白名单内的请求不包装响应结果
    if (whitelist.find((url) => url === request.route.path)) {
      return next.handle()
    }
    return next.handle().pipe(map((data) => ({ code: 0, data })))
  }
}
