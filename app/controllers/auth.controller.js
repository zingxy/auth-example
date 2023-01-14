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
      return res.status(503).send({
        msg: "数据库错误",
      });
    }

    /* 添加role */
    if (req.body.isAdmin) {
      db.Role.findOne({ name: "admin" }, (err, role) => {
        if (err) {
          return res.status(503).send({
            msg: "数据库错误",
          });
        }

        user.roles = [role];
        user.save((err) => {
          if (err) {
            return res.status(503).send({
              msg: "数据库错误",
            });
          }
          return res.status(200).send({
            msg: "用户注册成功",
          });
        });
      });
    } else {
      db.Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          return res.status(503).send({
            msg: "数据库错误",
          });
        }

        user.roles = [role];
        user.save((err) => {
          if (err) {
            return res.status(503).send({
              msg: "数据库错误",
            });
          }

          return res.status(200).send({
            msg: "用户注册成功",
          });
        });
      });
    }
  });
}

/* 登录逻辑 */
export function signin(req, res) {
  db.User.findOne({ username: req.body.username }, async (err, user) => {
    if (err) {
      return res.status(503).send({
        code: CODE.DB_ERROR,
        msg: "数据库错误",
      });
    }
    if (!user) {
      return res.status(400).send({
        msg: "用户不存在",
      });
    }
    if (user.password !== req.body.password) {
      return res.status(400).send({
        msg: "密码错误",
      });
    }

    /* 登录成功 */
    const accessToken = jwt.sign({ id: user.id }, SECRET_KEY, {
      expiresIn: 5 * 60,
    });
    const refreshToken = await db.RefreshToken.createToken(user);

    db.Role.find({ _id: { $in: user.roles } }, (err, roles) => {
      if (err) {
        return res.status(500).send({
          msg: "请重试",
        });
      }

      return res.status(200).send({
        msg: "登录成功",
        id: user._id,
        username: user.username,
        roles: roles.map((r) => r.name),
        accessToken,
        refreshToken,
      });
    });

    // 设置cookie
  });
}

/* 注销逻辑 */
export function signout(req, res) {
  // TODO 注销逻辑
  return res.status(200).send({
    msg: "注销成功",
  });
}

/* refreshToken */

export async function refreshToken(req, res) {
  /**
   * @var {clientRefreshToken} db.RefreshToken
   */
  debugger;
  const clientRefreshTokenID = req.body.refreshToken;
  if (!clientRefreshTokenID) {
    return res.status(403).json({
      msg: "未登录",
    });
  }
  /**
   * refreshToken存在db中，因此可以服务端注销的功能
   */

  const refreshToken = await db.RefreshToken.findById(clientRefreshTokenID);

  if (db.RefreshToken.verifyExpiration(refreshToken)) {
    refreshToken.delete();
    return res.status(403).json({
      msg: "未登录",
    });
  }

  /* 创建新的accesstoken */
  const newAccessToken = jwt.sign(
    {
      id: clientRefreshTokenID.userId,
    },
    SECRET_KEY,
    {
      expiresIn: 5 * 60,
    }
  );

  return res.status(200).json({
    newAccessToken,
    refreshToken: refreshToken._id,
  });
}
