import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { ValidationPipe, VersioningType } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { Logger } from 'nestjs-pino'
import * as cookieParser from 'cookie-parser'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'

import { IS_TEST, IS_LOCAL } from 'helpers'

import { AppModule } from './app.module'
import { ResponseInterceptor } from '@interceptors/response.interceptor'
import { JwtGuard } from '@guards/jwt.guard'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true })
  const config = app.get(ConfigService)
  const port = config.get('server.port')
  const logger = app.get(Logger)

  // 自定义日志
  app.useLogger(logger)
  app.flushLogs()

  // 设置接口前缀
  app.setGlobalPrefix(config.get('server.apiPrefix'))

  // 中间件
  app.use(cookieParser(config.get('cookie.secret')))
  // 防范暴力攻击
  if (config.get('rateLimit.enable')) {
    app.use(
      rateLimit({
        windowMs: config.get('rateLimit.windowMs'),
        max: config.get('rateLimit.max')
      })
    )
  }

  // 全局守卫
  app.useGlobalGuards(new JwtGuard(config))

  app.useGlobalPipes(
    new ValidationPipe({
      /**
       * 完整配置文档
       * @link https://docs.nestjs.cn/9/techniques?id=%e9%aa%8c%e8%af%81
       */
      skipNullProperties: false,
      stopAtFirstError: true,
      transform: true,
      whitelist: true
    })
  )

  // 添加全局数据响应拦截器
  app.useGlobalInterceptors(new ResponseInterceptor(config))

  // 版本号配置
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1'
  })

  // 接口文档配置
  if (IS_TEST || IS_LOCAL) {
    const options = new DocumentBuilder().setTitle('接口文档').setDescription('完善中').build()
    const document = SwaggerModule.createDocument(app, options)
    SwaggerModule.setup('docs', app, document)
  }

  // 防范基础 Web 漏洞
  app.use(helmet())

  // 跨域配置
  const allowlist = config.get('server.allowlist')
  app.enableCors((req, callback) => {
    let corsOptions: Record<string, any> = {}
    if (allowlist.indexOf(req.header('Origin')) !== -1) {
      corsOptions = { credentials: true, methods: '*', origin: true }
    } else {
      corsOptions = { origin: false }
    }
    callback(null, corsOptions)
  })

  // 启动服务
  await app.listen(port, config.get('server.hostname'), async () => {
    logger.log(`[template-admin] 服务启动成功：${await app.getUrl()}`)
  })
}
bootstrap()
