import CODE from "../constant/code.js";
import db from "../models/index.js";

export function publicAccess(req, res) {
  res.status(200).send({
    code: CODE.SUCCESS,
    data: "public",
    msg: "成功",
  });
}

export function userBoard(req, res) {
  res.status(200).send({
    code: CODE.SUCCESS,
    data: "user",
    msg: "成功",
  });
}

export function adminBoard(req, res) {
  res.status(200).send({
    code: CODE.SUCCESS,
    data: "admin",
    msg: "成功",
  });
}

/* 获取用户信息 */

export function gerUserProfile(req, res) {
  debugger;
  db.User.findById(req.userId, (err, user) => {
    if (err) {
      return res.status(500).send({
        msg: "请重试",
      });
    } else {
      db.Role.find({ _id: { $in: user.roles } }, (err, roles) => {
        if (err) {
          return res.status(500).send({
            msg: "请重试",
          });
        }
        return res.status(200).send({
          id: user._id,
          username: user.username,
          roles: roles.map((r) => r.name),
        });
      });
    }
  });
}
