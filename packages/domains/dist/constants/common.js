"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductKey = exports.ProductKeyEnum = exports.ClientSource = exports.ClientSourceEnum = exports.SortOrderEnum = void 0;
var SortOrderEnum;
(function (SortOrderEnum) {
    SortOrderEnum["desc"] = "DESC";
    SortOrderEnum["asc"] = "ASC";
})(SortOrderEnum = exports.SortOrderEnum || (exports.SortOrderEnum = {}));
var ClientSourceEnum;
(function (ClientSourceEnum) {
    ClientSourceEnum["wechatApp"] = "WECHAT_APP";
    ClientSourceEnum["pc"] = "PC";
    ClientSourceEnum["unknown"] = "UNKNOWN";
})(ClientSourceEnum = exports.ClientSourceEnum || (exports.ClientSourceEnum = {}));
class ClientSource {
    static values() {
        return [
            {
                label: '微信小程序',
                value: ClientSourceEnum.wechatApp
            },
            {
                label: '电脑端',
                value: ClientSourceEnum.pc
            },
            {
                label: '未知',
                value: ClientSourceEnum.unknown
            }
        ];
    }
    static getLabelByValue(value) {
        var _a;
        return (_a = ClientSource.values().find((item) => item.value === value)) === null || _a === void 0 ? void 0 : _a.label;
    }
    static valid(value) {
        return !!ClientSource.values().find((item) => item.value === value);
    }
    static toComment() {
        return `客户端来源，${ClientSource.values()
            .map((item) => `${item.value}：${item.label}`)
            .join('，')}`;
    }
}
exports.ClientSource = ClientSource;
var ProductKeyEnum;
(function (ProductKeyEnum) {
    ProductKeyEnum["admin"] = "ADMIN";
    ProductKeyEnum["wechatApp"] = "WECHAT_APP";
})(ProductKeyEnum = exports.ProductKeyEnum || (exports.ProductKeyEnum = {}));
class ProductKey {
    static values() {
        return [
            {
                label: '后台管理系统',
                value: ProductKeyEnum.admin
            },
            {
                label: '微信小程序',
                value: ProductKeyEnum.wechatApp
            }
        ];
    }
    static getLabelByValue(value) {
        var _a;
        return (_a = ProductKey.values().find((item) => item.value === value)) === null || _a === void 0 ? void 0 : _a.label;
    }
    static toComment() {
        return `产品，${ProductKey.values()
            .map((item) => `${item.value}：${item.label}`)
            .join('，')}`;
    }
    static valid(value) {
        return !!ProductKey.values().find((item) => item.value === value);
    }
}
exports.ProductKey = ProductKey;
