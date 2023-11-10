"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserType = exports.UserTypeEnum = exports.Gender = exports.GenderEnum = void 0;
var GenderEnum;
(function (GenderEnum) {
    GenderEnum["unknown"] = "UNKNOWN";
    GenderEnum["male"] = "MALE";
    GenderEnum["female"] = "FEMALE";
})(GenderEnum = exports.GenderEnum || (exports.GenderEnum = {}));
class Gender {
    static values() {
        return [
            {
                label: '未知',
                value: GenderEnum.unknown
            },
            {
                label: '男',
                value: GenderEnum.male
            },
            {
                label: '女',
                value: GenderEnum.female
            }
        ];
    }
    static getLabelByValue(value) {
        var _a;
        return (_a = Gender.values().find((item) => item.value === value)) === null || _a === void 0 ? void 0 : _a.label;
    }
    static toComment() {
        return `性别枚举，${Gender.values()
            .map((item) => `${item.value}：${item.label}`)
            .join('，')}`;
    }
}
exports.Gender = Gender;
var UserTypeEnum;
(function (UserTypeEnum) {
    UserTypeEnum["common"] = "COMMON";
    UserTypeEnum["vip"] = "VIP";
    UserTypeEnum["svip"] = "SVIP";
})(UserTypeEnum = exports.UserTypeEnum || (exports.UserTypeEnum = {}));
class UserType {
    static values() {
        return [
            {
                label: '普通用户',
                value: UserTypeEnum.common
            },
            {
                label: 'VIP',
                value: UserTypeEnum.vip
            },
            {
                label: 'SVIP',
                value: UserTypeEnum.svip
            }
        ];
    }
    static getLabelByValue(value) {
        var _a;
        return (_a = UserType.values().find((item) => item.value === value)) === null || _a === void 0 ? void 0 : _a.label;
    }
    static toComment() {
        return `用户类型列表，${UserType.values()
            .map((item) => `${item.value}：${item.label}`)
            .join('，')}`;
    }
}
exports.UserType = UserType;
