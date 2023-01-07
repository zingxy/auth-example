import db from "../models/index.js";

import CODE from "../constant/code.js";
/* 用户注册 */
export function checkSignup(req, res, next) {
  const username = req.body.username;
  db.User.findOne({ username }, (err, user) => {
    if (err) {
      res.status(200).send({
        code: CODE.DB_ERROR,
        msg: "数据库异常",
      });
      return;
    }
    if (user) {
      res.status(200).send({
        code: CODE.USER_ALREADY_EXISTED,
        msg: "用户已存在",
      });
      return;
    }
    /* 正常注册才能往下走 */
    next();
  });
}
