"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileClient = exports.OssClient = void 0;
class OssClient {
}
exports.OssClient = OssClient;
class FileClient {
    constructor(config) {
        this.config = config;
    }
    putStreamNetwork(options) {
        throw new Error('方法未实现');
    }
    putBuffer(options) {
        throw new Error('方法未实现');
    }
    upload(options) {
        throw new Error('方法未实现');
    }
    download(key) {
        throw new Error('方法未实现');
    }
    createToken() {
        throw new Error('方法未实现');
    }
    stream(key, stream) {
        throw new Error('方法未实现');
    }
    multipart(key, file) {
        throw new Error('方法未实现');
    }
    delete(key) {
        throw new Error('方法未实现');
    }
}
exports.FileClient = FileClient;
