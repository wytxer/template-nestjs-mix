import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { SequelizeModule } from '@nestjs/sequelize'
import { LoggerModule, Logger, PinoLogger } from 'nestjs-pino'
import { Sequelize } from 'sequelize-typescript'

import { loggerOptions } from '@config/logger.config'
import { loadSequelizeOptions } from '@config/sequelize.config'
import { SharedModule } from '@modules/shared.module'

import { UserModule } from '@modules/user.module'
import { CommonModule } from '@modules/common.module'

const loggerModule = LoggerModule.forRoot(loggerOptions)

@Module({
  exports: [],
  imports: [
    SharedModule,
    SequelizeModule.forRootAsync({
      imports: [ConfigModule, loggerModule],
      inject: [ConfigService, Logger],
      useFactory: loadSequelizeOptions
    }),
    loggerModule,
    UserModule,
    CommonModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {
  constructor(private sequelize: Sequelize, private readonly logger: PinoLogger) {
    this.logger.setContext(AppModule.name)
  }

  onModuleInit() {
    this.logger.info('主模块初始化完成')
  }

  async onApplicationBootstrap() {
    this.logger.info('应用程序已完全启动')
    // 仅用于开发环境表结构更新
    await this.sequelize.sync({ force: false })
  }

  onApplicationShutdown() {
    this.logger.info('连接已关闭')
  }
}
