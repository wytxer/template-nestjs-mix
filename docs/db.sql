/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 80028
 Source Host           : localhost:3306
 Source Schema         : bszhct

 Target Server Type    : MySQL
 Target Server Version : 80028
 File Encoding         : 65001

 Date: 10/11/2023 12:48:15
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  `id` int unsigned NOT NULL AUTO_INCREMENT COMMENT 'id',
  `admin_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '管理员 id',
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL COMMENT '管理员名称',
  `phone` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '手机号',
  `password` varchar(255) COLLATE utf8mb4_general_ci NOT NULL COMMENT '登陆密码',
  `description` varchar(255) COLLATE utf8mb4_general_ci NOT NULL COMMENT '描述',
  `is_enabled` tinyint(1) NOT NULL DEFAULT '1' COMMENT '账号状态，true：启用，false：禁用',
  `logged_at` datetime DEFAULT NULL COMMENT '最后登录时间',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`admin_id`) USING BTREE,
  UNIQUE KEY `unique_id_constraint` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='管理员表';

-- ----------------------------
-- Records of admin
-- ----------------------------
BEGIN;
INSERT INTO `admin` (`id`, `admin_id`, `name`, `phone`, `password`, `description`, `is_enabled`, `logged_at`, `created_at`, `updated_at`, `deleted_at`) VALUES (1, '8ce186c4-d2f5-4519-8342-a3b97d42d04f', '超级管理员', '13011112222', 'd26bddd6d0a7fa78a7721fd278230e03$de74a30e323217c69b1d3d6debad157f27424f8e257c7214f6f2cbdec4ccbbf2ad9e7be4ca45c4ecb0d34d02e0d3098f1f0c11823245aa0ffd65dc7edfb7efb4', '拥有最高权限', 1, '2023-11-10 17:46:25', '2023-11-10 11:58:33', '2023-11-10 17:46:25', NULL);
COMMIT;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int unsigned NOT NULL AUTO_INCREMENT COMMENT 'id',
  `user_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '用户 id',
  `union_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '同微信的 unionid',
  `open_id` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '同微信的 openid',
  `nickname` varchar(16) COLLATE utf8mb4_general_ci NOT NULL COMMENT '用户昵称',
  `avatar_url` varchar(255) COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'http://static.bszhct.com/common/default-avatar.jpg' COMMENT '用户头像访问地址',
  `phone` varchar(64) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '电话号码',
  `gender` varchar(64) COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'UNKNOWN' COMMENT '性别枚举，UNKNOWN：未知，MALE：男，FEMALE：女',
  `client_source` varchar(64) COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'PC' COMMENT '客户端来源，WECHAT_APP：微信小程序，PC：电脑端，UNKNOWN：未知',
  `user_type` varchar(64) COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'COMMON' COMMENT '用户类型列表，COMMON：普通用户，VIP：VIP，SVIP：SVIP',
  `logged_at` datetime(3) DEFAULT NULL COMMENT '最后登录时间，每次更新登录日志时更新',
  `created_at` datetime(3) NOT NULL,
  `updated_at` datetime(3) NOT NULL,
  `deleted_at` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`id`,`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='用户表';

-- ----------------------------
-- Records of user
-- ----------------------------
BEGIN;
INSERT INTO `user` (`id`, `user_id`, `union_id`, `open_id`, `nickname`, `avatar_url`, `phone`, `gender`, `client_source`, `user_type`, `logged_at`, `created_at`, `updated_at`, `deleted_at`) VALUES (1, '205581f4-a7c6-41d7-a777-2ecb2ff90bfe', 'unionid', 'openid', '程序员未央', 'http://static.bszhct.com/common/default-avatar.jpg', NULL, 'UNKNOWN', 'PC', 'COMMON', '2023-11-10 15:34:21.000', '2023-11-10 14:24:12.000', '2023-11-10 15:34:21.319', NULL);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
