import { ConfigService } from '@nestjs/config';
import { IFileOptions, FileClient } from './file.client';
import { TencentClient } from './tencent.client';
import { AliyunClient } from './aliyun.client';
import { QiniuClient } from './qiniu.client';
import { LocalClient } from './local.client';
export { IFileOptions, FileClient };
export declare const fileHelper: (config: ConfigService) => TencentClient | AliyunClient | QiniuClient | LocalClient;
