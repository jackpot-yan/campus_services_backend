# 错误解决
1. 提示代码错误代码1251
一 cmd登录数据库
二 输入   ALTER USER 'root'@'localhost' IDENTIFIED BY '旧密码' PASSWORD EXPIRE NEVER;
三 输入 ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '新密码';
四 输入 FLUSH PRIVILEGES;
