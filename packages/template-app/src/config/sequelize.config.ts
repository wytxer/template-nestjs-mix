import { ConfigService } from '@nestjs/config'
import { Logger } from 'nestjs-pino'
import * as entities from 'entities'

const models = Object.values(entities)

export const loadSequelizeOptions = (config: ConfigService, logger: Logger) => {
  return {
    ...config.get('db.mysql'),
    dialect: 'mysql',
    logging: (sql: string) => logger.log(sql),
    // 全局配置
    define: {
      // 是否自动进行下划线转换（这里是因为 DB 默认的命名规则是下划线方式，而我们使用的大多数是驼峰方式）
      underscored: true,
      // 启用 sequelize 默认时间戳设置
      timestamps: true,
      // 禁用 sequelize 默认给表名设置复数
      freezeTableName: true,
      // 编码配置
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
      // 统一添加 deletedAt 字段
      paranoid: true
    },
    // 格式化返回的数据结构
    dialectOptions: {
      dateStrings: true,
      typeCast: true
    },
    models
  }
}
