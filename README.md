# Barber-Membership-Management-System
Barber Membership Management System Node_TEST
## sqlite数据库 + NodeJs 
## 安装

```
npm install body-parser
npm install cors
npm install express
npm install sqlite3
```

## 运行

```
node app.js
```




日期20250114

## 字段

```apl
id		name	start	  end		note
编号	   姓名     办理时间	 到期时间	备注信息	
```

## 获取普通用户列表

```
/api/getUserList
GET
```

## 普通登录接口

```
/api/login
POST
{ name, password }
```

## 普通注册接口

```
/api/register
POST
{ name, password }
```

## 获取会员列表

```
/api/getVipUserList
GET
```

## 添加会员接口

```
/api/vip_add
POST
{ name, start, end, note }
```

```
例子
请求地址
http://192.168.133.128:8080/api/vip_add
请求类型
POST
协议头
User-Agent: Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.87 Safari/537.36
请求内容
id=1&name=test&start=2025-01-01&end=2026-01-01&note=hello
```

## 修改会员接口

```
/api/vip_update
POST
{ id, name, start, end, note }
```

```
例子
请求地址
http://192.168.133.128:8080/api/vip_delete
请求类型
POST
协议头
User-Agent: Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.87 Safari/537.36
请求内容
id=2&name=test&start=2025-01-01&end=2026-01-01&note=hello
```

## 删除会员接口

```
/api/vip_delete
POST
{ id }
```

```
例子
请求地址
http://192.168.133.128:8080/api/vip_delete
请求类型
POST
协议头
User-Agent: Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.87 Safari/537.36
请求内容
id=1
```

