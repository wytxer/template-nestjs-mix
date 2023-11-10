import { ConfigService } from '@nestjs/config'

import { IFileOptions, FileClient } from './file.client'
import { TencentClient } from './tencent.client'
import { AliyunClient } from './aliyun.client'
import { QiniuClient } from './qiniu.client'
import { LocalClient } from './local.client'

export { IFileOptions, FileClient }

export const fileHelper = (config: ConfigService) => {
  if (config.get('oss.tencent.enable')) {
    return new TencentClient(config)
  }
  if (config.get('oss.aliyun.enable')) {
    return new AliyunClient(config)
  }
  if (config.get('oss.qiniu.enable')) {
    return new QiniuClient(config)
  }
  return new LocalClient(config)
}
