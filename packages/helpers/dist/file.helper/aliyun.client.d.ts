import { ConfigService } from '@nestjs/config';
import { IFileOptions, FileClient } from './file.client';
export declare class AliyunClient extends FileClient {
    constructor(config: ConfigService);
    private logger;
    private client;
    private defaultHeaders;
    upload(file: IFileOptions): Promise<any>;
    private then;
    download(key: string): string;
}
