/// <reference types="node" />
import { ConfigService } from '@nestjs/config';
import { FileClient } from './file.client';
export declare class QiniuClient extends FileClient {
    constructor(config: ConfigService);
    private logger;
    private mac;
    private bucketManager;
    createToken(): string;
    stream(key: string, stream: NodeJS.ReadableStream): Promise<any>;
    multipart(key: string, file: string): Promise<any>;
    delete(key: string): Promise<any>;
}
