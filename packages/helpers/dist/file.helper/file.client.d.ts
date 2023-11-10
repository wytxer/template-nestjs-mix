/// <reference types="node" />
/// <reference types="node" />
import { ConfigService } from '@nestjs/config';
export interface IFileOptions {
    key: string;
    url: string | Buffer;
    headers?: Record<string, any>;
}
export declare abstract class OssClient {
    abstract putStreamNetwork(options: IFileOptions): Promise<any>;
    abstract putBuffer(options: IFileOptions): Promise<any>;
    abstract upload(options: IFileOptions): Promise<any>;
    abstract download(key: string): string;
    abstract createToken(): string;
    abstract stream(key: string, stream: NodeJS.ReadableStream): Promise<any>;
    abstract multipart(key: string, file: string): Promise<any>;
    abstract delete(key: string): Promise<any>;
}
export declare class FileClient implements OssClient {
    protected config: ConfigService;
    constructor(config: ConfigService);
    putStreamNetwork(options: IFileOptions): Promise<any>;
    putBuffer(options: IFileOptions): Promise<any>;
    upload(options: IFileOptions): Promise<any>;
    download(key: string): string;
    createToken(): string;
    stream(key: string, stream: NodeJS.ReadableStream): Promise<any>;
    multipart(key: string, file: string): Promise<any>;
    delete(key: string): Promise<any>;
}
