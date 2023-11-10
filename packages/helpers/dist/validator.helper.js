"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsPassword = exports.IsCnEnNumberOrUnderlineChat = exports.IsChineseChat = exports.NotIncludedSpecialChat = exports.IsGlobalPhone = exports.NotIncludedEmoji = exports.regexPassword = exports.regexCnEnNumberOrUnderlineChat = exports.regexChineseChat = exports.regexSpecialChat = exports.regexPhone = exports.regexEmoji = void 0;
const class_validator_1 = require("class-validator");
exports.regexEmoji = /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/gi;
exports.regexPhone = /^(\+)?\d{7,20}$/;
exports.regexSpecialChat = /[`~!@#$%^&*()+=|{}':;',\[\].<>/?~！@#￥%……&*（）——+|{}【】‘；：”“’。，、？•·]/gi;
exports.regexChineseChat = /^[\u4e00-\u9fa5]+$/;
exports.regexCnEnNumberOrUnderlineChat = /^[\u4e00-\u9fa50-9A-Za-z_]+$/;
exports.regexPassword = /^[a-zA-Z0-9_`~!@#$%^&*()_+<>?:"{},.\\/;'[\]]{8,16}$/;
let NotIncludedEmoji = class NotIncludedEmoji {
    validate(text, args) {
        return !exports.regexEmoji.test(text);
    }
    defaultMessage(args) {
        return 'Text ($value) emoji not supported';
    }
};
NotIncludedEmoji = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'NotIncludedEmoji', async: false })
], NotIncludedEmoji);
exports.NotIncludedEmoji = NotIncludedEmoji;
let IsGlobalPhone = class IsGlobalPhone {
    validate(text, args) {
        return exports.regexPhone.test(text);
    }
    defaultMessage(args) {
        return 'Text ($value) format error';
    }
};
IsGlobalPhone = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'IsGlobalPhone', async: false })
], IsGlobalPhone);
exports.IsGlobalPhone = IsGlobalPhone;
let NotIncludedSpecialChat = class NotIncludedSpecialChat {
    validate(text, args) {
        return !exports.regexSpecialChat.test(text);
    }
    defaultMessage(args) {
        return 'Text ($value) special characters are not supported';
    }
};
NotIncludedSpecialChat = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'NotIncludedSpecialChat', async: false })
], NotIncludedSpecialChat);
exports.NotIncludedSpecialChat = NotIncludedSpecialChat;
let IsChineseChat = class IsChineseChat {
    validate(text, args) {
        return exports.regexChineseChat.test(text);
    }
    defaultMessage(args) {
        return 'Text ($value) must be chinese characters';
    }
};
IsChineseChat = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'IsChineseChat', async: false })
], IsChineseChat);
exports.IsChineseChat = IsChineseChat;
let IsCnEnNumberOrUnderlineChat = class IsCnEnNumberOrUnderlineChat {
    validate(text, args) {
        return exports.regexCnEnNumberOrUnderlineChat.test(text);
    }
    defaultMessage(args) {
        return 'Text ($value) must be chinese, english, number or underline characters';
    }
};
IsCnEnNumberOrUnderlineChat = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'IsCnEnNumberOrUnderlineChat', async: false })
], IsCnEnNumberOrUnderlineChat);
exports.IsCnEnNumberOrUnderlineChat = IsCnEnNumberOrUnderlineChat;
let IsPassword = class IsPassword {
    validate(text, args) {
        return exports.regexPassword.test(text);
    }
    defaultMessage(args) {
        return 'Text ($value) must be a combination of 8 to 16 uppercase and lowercase alphanumeric underscore special characters';
    }
};
IsPassword = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'IsPassword', async: false })
], IsPassword);
exports.IsPassword = IsPassword;
