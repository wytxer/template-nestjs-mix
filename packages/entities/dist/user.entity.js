"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEntity = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const swagger_1 = require("@nestjs/swagger");
const domains_1 = require("domains");
const defaultAvatarUrl = 'https://static.bszhct.com/common/default-avatar.jpg';
let UserEntity = class UserEntity extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        comment: 'id'
    }),
    (0, swagger_1.ApiProperty)({ description: 'id', example: 1 }),
    __metadata("design:type", Number)
], UserEntity.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        primaryKey: true,
        defaultValue: sequelize_typescript_1.DataType.UUIDV4,
        comment: '用户 id'
    }),
    (0, swagger_1.ApiProperty)({ description: '用户 id', example: '2aa256bf-dae6-48b2-a236-f87cf62a5ecf' }),
    __metadata("design:type", String)
], UserEntity.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
        comment: '同微信的 unionid'
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "unionId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
        comment: '同微信的 openid'
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "openId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(16),
        allowNull: false,
        comment: '用户昵称'
    }),
    (0, swagger_1.ApiProperty)({ description: '用户昵称', example: '张三' }),
    __metadata("design:type", String)
], UserEntity.prototype, "nickname", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
        defaultValue: defaultAvatarUrl,
        comment: '用户头像访问地址'
    }),
    (0, swagger_1.ApiProperty)({
        description: '用户头像访问地址',
        example: defaultAvatarUrl
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "avatarUrl", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(64),
        allowNull: true,
        comment: '电话号码'
    }),
    (0, swagger_1.ApiProperty)({ description: '电话号码', example: '13722822221' }),
    __metadata("design:type", String)
], UserEntity.prototype, "phone", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(64),
        allowNull: false,
        defaultValue: domains_1.GenderEnum.unknown,
        comment: domains_1.Gender.toComment()
    }),
    (0, swagger_1.ApiProperty)({
        description: domains_1.Gender.toComment(),
        enum: domains_1.GenderEnum,
        example: domains_1.GenderEnum.unknown
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "gender", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(64),
        allowNull: false,
        defaultValue: domains_1.ClientSourceEnum.pc,
        comment: domains_1.ClientSource.toComment()
    }),
    (0, swagger_1.ApiProperty)({
        description: domains_1.ClientSource.toComment(),
        enum: domains_1.ClientSourceEnum,
        example: domains_1.ClientSourceEnum.pc
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "clientSource", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(64),
        allowNull: false,
        defaultValue: domains_1.UserTypeEnum.common,
        comment: domains_1.UserType.toComment()
    }),
    (0, swagger_1.ApiProperty)({
        description: domains_1.UserType.toComment(),
        enum: domains_1.UserTypeEnum,
        example: domains_1.UserTypeEnum.common
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "userType", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE(3),
        allowNull: true,
        comment: '最后登录时间，每次更新登录日志时更新'
    }),
    (0, swagger_1.ApiProperty)({ description: '最后登录时间', example: '2020-01-01 00:00:00' }),
    __metadata("design:type", String)
], UserEntity.prototype, "loggedAt", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE(3),
        allowNull: false
    }),
    (0, swagger_1.ApiProperty)({ description: '创建时间', example: '2020-01-01 00:00:00' }),
    __metadata("design:type", String)
], UserEntity.prototype, "createdAt", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE(3),
        allowNull: false
    }),
    (0, swagger_1.ApiProperty)({ description: '更新时间', example: '2020-01-01 00:00:00' }),
    __metadata("design:type", String)
], UserEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE(3),
        allowNull: true
    }),
    (0, swagger_1.ApiProperty)({ description: '删除时间', example: '2020-01-01 00:00:00' }),
    __metadata("design:type", String)
], UserEntity.prototype, "deletedAt", void 0);
UserEntity = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'user',
        comment: '用户表'
    })
], UserEntity);
exports.UserEntity = UserEntity;
