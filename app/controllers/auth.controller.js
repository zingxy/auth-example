import SECRET_KEY from "../config/auth.config.js";
import CODE from "../constant/code.js";

import db from "../models/index.js";

import jwt from "jsonwebtoken";

/* 注册逻辑 */
export function signup(req, res) {
  const user = new db.User({
    username: req.body.username,
    password: req.body.password,
  });

  user.save((err) => {
    if (err) {
      return res.status(200).send({
        code: CODE.DB_ERROR,
        msg: "数据库错误",
      });
    }

    /* 添加role */
    if (req.body.isAdmin) {
      db.Role.findOne({ name: "admin" }, (err, role) => {
        if (err) {
          return res.status(200).send({
            code: CODE.DB_ERROR,
            msg: "数据库错误",
          });
        }

        user.roles = [role];
        user.save((err) => {
          if (err) {
            return res.status(200).send({
              code: CODE.DB_ERROR,
              msg: "数据库错误",
            });
          }
          return res.status(200).send({
            code: CODE.SUCCESS,
            msg: "用户注册成功",
          });
        });
      });
    } else {
      db.Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          return res.status(200).send({
            code: CODE.DB_ERROR,
            msg: "数据库错误",
          });
        }

        user.roles = [role];
        user.save((err) => {
          if (err) {
            return res.status(200).send({
              code: CODE.DB_ERROR,
              msg: "数据库错误",
            });
          }
          return res.status(200).send({
            code: CODE.SUCCESS,
            msg: "用户注册成功",
          });
        });
      });
    }
  });
}

/* 登录逻辑 */
export function signin(req, res) {
  db.User.findOne({ username: req.body.username }, (err, user) => {
    if (err) {
      return res.status(200).send({
        code: CODE.DB_ERROR,
        msg: "数据库错误",
      });
    }
    if (!user) {
      return res.status(200).send({
        code: CODE.USER_NOT_EXISTED,
        msg: "用户不存在",
      });
    }
    if (user.password !== req.body.password) {
      return res.status(200).send({
        code: CODE.PASSWORD_ERROR,
        msg: "密码错误",
      });
    }
    /* 登录成功 */

    const token = jwt.sign({ id: user.id }, SECRET_KEY, {
      expiresIn: 3 * 60,
    });
    // 设置cookie

    res.status(200).send({
      code: CODE.SUCCESS,
      msg: "登录成功",
      id: user.id,
      username: user.username,
      token,
    });
  });
}

/* 注销逻辑 */
export function signout(req, res) {
  req.session = null;
  return res.status(200).send({
    code: CODE.SUCCESS,
    msg: "注销成功",
  });
}

/* Resource */
