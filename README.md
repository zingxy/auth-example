# Auth-example

面试的时候，前端问的比较多的问题：怎么做的登录？

如果自己没有动手写过一个比较完整的登录流程，这个问题不是特别好回答，遂写一个简单的 DEMO 加深理解

## Stack

- Express
- MongoDB
- Mongoose

## 流程

登录后，api 返回 token, 前端将 token 保存到 localStorage 中，请求时将其放在 HTTP 请求头`authorization: token`中

## Structure

```
AUTH-EXAMPLE\APP
├───config        数据库配置，jwt密钥等
├───constant      常量
├───controllers   controllers
├───middlewares   中间件, 如校验token等
├───models        MongoDB colletions类型定义
└───routes        路由
```

## TODOS

- [] 增加前端部分

- [] JWT Refresh Token
