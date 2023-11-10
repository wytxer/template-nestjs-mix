import { Module, Global } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
import getConfig from '@config/config'

const jwtModule = JwtModule.registerAsync({
  inject: [ConfigService],
  useFactory: async (config: ConfigService) => {
    return {
      secret: config.get('jwt.secret'),
      signOptions: {
        expiresIn: config.get('jwt.expires')
      }
    }
  }
})

const configModule = ConfigModule.forRoot({
  cache: true,
  load: [getConfig]
})

@Global()
@Module({
  imports: [configModule, jwtModule],
  exports: [configModule, jwtModule],
  providers: []
})
export class SharedModule {}
