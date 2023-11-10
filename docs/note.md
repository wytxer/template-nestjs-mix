# 项目笔记

## SQL

```sql
-- 创建指定数据库
CREATE DATABASE 数据库名 CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
FLUSH PRIVILEGES;

-- 修改用户插件
CREATE USER 'root'@'ip' IDENTIFIED WITH 'mysql_native_password' BY '密码';

-- 修改用户密码
ALTER USER 'root'@'localhost' IDENTIFIED BY '密码';

-- 开启远程访问
CREATE USER 'root'@'ip' IDENTIFIED WITH 'mysql_native_password' BY '密码';

-- 添加指定用户对指定数据库表的访问权限
GRANT ALL PRIVILEGES ON 表名.* TO 'root'@'ip';
```
