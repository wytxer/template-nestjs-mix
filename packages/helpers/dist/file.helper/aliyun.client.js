"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AliyunClient = void 0;
const common_1 = require("@nestjs/common");
const AliossClient = require("ali-oss");
const urllib_1 = require("urllib");
const stream_1 = require("stream");
const file_client_1 = require("./file.client");
class AliyunClient extends file_client_1.FileClient {
    constructor(config) {
        super(config);
        this.logger = new common_1.Logger('[AliyunClient]');
        this.defaultHeaders = {
            'x-oss-storage-class': 'Standard',
            'x-oss-object-acl': 'private',
            'x-oss-forbid-overwrite': 'true'
        };
        this.client = new AliossClient(config.get('oss.aliyun.config'));
    }
    upload(file) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                headers: Object.assign(Object.assign({}, this.defaultHeaders), file.headers)
            };
            if (Buffer.isBuffer(file.url)) {
                const stream = new stream_1.Duplex();
                stream.push(file.url, 'base64');
                stream.push(null);
                return this.then(this.client.putStream(file.key, stream, config));
            }
            if (typeof file.url === 'string' && file.url.match(/^http(s)?:\/\/.+/)) {
                const stream = new stream_1.Duplex();
                const data = yield (0, urllib_1.request)(file.url);
                stream.push(data.data);
                stream.push(null);
                return this.then(this.client.putStream(file.key, stream, config));
            }
            if (typeof file.url === 'string' && file.url.match(/^\/.+/)) {
                return this.then(this.client.put(file.key, file.url, config));
            }
        });
    }
    then(promise) {
        return __awaiter(this, void 0, void 0, function* () {
            return promise
                .then((res) => {
                if (res.res.statusCode === 200) {
                    const { name, url } = res;
                    return {
                        name,
                        url
                    };
                }
                return res;
            })
                .catch((error) => {
                this.logger.error(error);
            });
        });
    }
    download(key) {
        return this.client.signatureUrl(key);
    }
}
exports.AliyunClient = AliyunClient;
