"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileHelper = exports.FileClient = void 0;
const file_client_1 = require("./file.client");
Object.defineProperty(exports, "FileClient", { enumerable: true, get: function () { return file_client_1.FileClient; } });
const tencent_client_1 = require("./tencent.client");
const aliyun_client_1 = require("./aliyun.client");
const qiniu_client_1 = require("./qiniu.client");
const local_client_1 = require("./local.client");
const fileHelper = (config) => {
    if (config.get('oss.tencent.enable')) {
        return new tencent_client_1.TencentClient(config);
    }
    if (config.get('oss.aliyun.enable')) {
        return new aliyun_client_1.AliyunClient(config);
    }
    if (config.get('oss.qiniu.enable')) {
        return new qiniu_client_1.QiniuClient(config);
    }
    return new local_client_1.LocalClient(config);
};
exports.fileHelper = fileHelper;
