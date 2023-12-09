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
exports.AdminEntity = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const swagger_1 = require("@nestjs/swagger");
let AdminEntity = class AdminEntity extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER.UNSIGNED,
        unique: true,
        autoIncrement: true,
        comment: 'id'
    }),
    (0, swagger_1.ApiProperty)({ description: 'id', example: 1 }),
    __metadata("design:type", Number)
], AdminEntity.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        primaryKey: true,
        defaultValue: sequelize_typescript_1.DataType.UUIDV4,
        comment: '管理员 id'
    }),
    (0, swagger_1.ApiProperty)({ description: '管理员 id', example: '2aa256bf-dae6-48b2-a236-f87cf62a5ecf' }),
    __metadata("design:type", String)
], AdminEntity.prototype, "adminId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
        comment: '管理员名称'
    }),
    (0, swagger_1.ApiProperty)({ description: '管理员名称', example: '韩立' }),
    __metadata("design:type", String)
], AdminEntity.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(32),
        allowNull: false,
        comment: '手机号'
    }),
    (0, swagger_1.ApiProperty)({ description: '手机号', example: '13011112222' }),
    __metadata("design:type", String)
], AdminEntity.prototype, "phone", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
        comment: '登陆密码'
    }),
    (0, swagger_1.ApiProperty)({ description: '登陆密码', example: '123456' }),
    __metadata("design:type", String)
], AdminEntity.prototype, "password", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
        comment: '描述'
    }),
    (0, swagger_1.ApiProperty)({ description: '描述', example: '内部管理员' }),
    __metadata("design:type", String)
], AdminEntity.prototype, "description", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        comment: '账号状态，true：启用，false：禁用'
    }),
    (0, swagger_1.ApiProperty)({ description: '账号状态，true：启用，false：禁用', enum: [true, false], example: true }),
    __metadata("design:type", Boolean)
], AdminEntity.prototype, "isEnabled", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: true,
        type: sequelize_typescript_1.DataType.DATE,
        comment: '最后登录时间'
    }),
    (0, swagger_1.ApiProperty)({ description: '最后登录时间，可能为空', example: '2020-01-01 00:00:00' }),
    __metadata("design:type", String)
], AdminEntity.prototype, "loggedAt", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: false
    }),
    (0, swagger_1.ApiProperty)({ description: '创建时间', example: '2020-01-01 00:00:00' }),
    __metadata("design:type", String)
], AdminEntity.prototype, "createdAt", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: false
    }),
    (0, swagger_1.ApiProperty)({ description: '修改时间', example: '2020-01-01 00:00:00' }),
    __metadata("design:type", String)
], AdminEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: true
    }),
    (0, swagger_1.ApiProperty)({ description: '删除时间', example: '2020-01-01 00:00:00' }),
    __metadata("design:type", String)
], AdminEntity.prototype, "deletedAt", void 0);
AdminEntity = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'admin',
        comment: '管理员表'
    })
], AdminEntity);
exports.AdminEntity = AdminEntity;
