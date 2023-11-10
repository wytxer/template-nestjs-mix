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
exports.QiniuClient = void 0;
const common_1 = require("@nestjs/common");
const qiniu = require("qiniu");
const file_client_1 = require("./file.client");
class QiniuClient extends file_client_1.FileClient {
    constructor(config) {
        super(config);
        this.logger = new common_1.Logger(QiniuClient.name);
        const accessKey = config.get('oss.qiniu.config.accessKey');
        const secretKey = config.get('oss.qiniu.config.secretKey');
        qiniu.conf.ACCESS_KEY = accessKey;
        qiniu.conf.SECRET_KEY = secretKey;
        const qiniuConfig = new qiniu.conf.Config();
        qiniuConfig.zone = qiniu.zone.Zone_z2;
        qiniuConfig.useCdnDomain = true;
        this.config = config;
        this.mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
        this.bucketManager = new qiniu.rs.BucketManager(this.mac, config);
    }
    createToken() {
        return new qiniu.rs.PutPolicy({
            scope: this.config.get('oss.qiniu.config.scope')
        }).uploadToken(this.mac);
    }
    stream(key, stream) {
        return __awaiter(this, void 0, void 0, function* () {
            const formUploader = new qiniu.form_up.FormUploader(this.config);
            const putExtra = new qiniu.form_up.PutExtra();
            return new Promise((resolve, reject) => {
                formUploader.putStream(this.createToken(), key, stream, putExtra, (error, body, res) => {
                    if (error) {
                        return reject(error);
                    }
                    if (+res.statusCode === 200) {
                        resolve({ code: 0, body });
                    }
                    else {
                        this.logger.log(JSON.stringify(body));
                        this.logger.log(JSON.stringify(res));
                        reject(new Error(res));
                    }
                });
            });
        });
    }
    multipart(key, file) {
        return __awaiter(this, void 0, void 0, function* () {
            const formUploader = new qiniu.form_up.FormUploader(this.config);
            const putExtra = new qiniu.form_up.PutExtra();
            return new Promise((resolve, reject) => {
                formUploader.putFile(this.createToken(), key, file, putExtra, (error, body, res) => {
                    if (error) {
                        reject(error);
                    }
                    if (+res.statusCode === 200) {
                        resolve({ code: 0, body });
                    }
                    else {
                        this.logger.log(JSON.stringify(body));
                        this.logger.log(JSON.stringify(res));
                        reject(new Error(res));
                    }
                });
            });
        });
    }
    delete(key) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.bucketManager.delete(this.config.get('oss.qiniu.config.scope'), key, (error, body, res) => {
                    if (error) {
                        reject(error);
                    }
                    if (+res.statusCode === 200) {
                        resolve({ code: 0, body });
                    }
                    else {
                        this.logger.log('删除七牛空间资源失败');
                        this.logger.log(JSON.stringify(body));
                        this.logger.log(JSON.stringify(res));
                        const code = res.statusCode;
                        if (code === 612) {
                            resolve({ code: 0 });
                        }
                        else {
                            reject(new Error(res));
                        }
                    }
                });
            });
        });
    }
}
exports.QiniuClient = QiniuClient;
