import jwt from "jsonwebtoken";

import SECRET_KEY from "../config/auth.config.js";
import CODE from "../constant/code.js";
import db from "../models/index.js";

export function checkToken(req, res, next) {
  // const token = req.session.token;
  // 改用jwt来做
  const token = req.headers.authorization;

  debugger;
  if (!token) {
    return res.status(200).send({
      code: CODE.NOT_SIGN_IN,
      msg: "用户没有登录",
    });
  }
  jwt.verify(token, SECRET_KEY, (err, payload) => {
    if (err) {
      return res.status(200).send({
        code: CODE.TOKEN_EXPIRED,
        msg: "登录过期",
      });
    }
    /* 我们把用户id放在token里面 */
    req.userId = payload.id;
    next();
  });
}
/* checkToken-> judge role */
/* 判断用户的角色， 有些路由必须要admin */
export function checkAdmin(req, res, next) {
  db.User.findById(req.userId, (err, user) => {
    if (err) {
      return res.status(200).send({
        code: CODE.DB_ERROR,
        msg: "数据库错误",
      });
    }
    db.Role.find({ _id: { $in: user.roles } }, (err, roles) => {
      if (err) {
        return res.status(200).send({
          code: CODE.DB_ERROR,
          msg: "数据库错误",
        });
      }
      for (const role of roles) {
        /* 是admin */
        if (role.name === "admin") {
          next();
          return;
        }
      }
      // 这个时候说明中间件不能往下走了
      res.status(200).send({
        code: CODE.NOT_ALLOWED,
        msg: "需要admin权限",
      });
      return;
    });
  });
}
