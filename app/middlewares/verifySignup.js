import db from "../models/index.js";

import CODE from "../constant/code.js";
/* 用户注册 */
export function checkSignup(req, res, next) {
  const username = req.body.username;
  db.User.findOne({ username }, (err, user) => {
    if (err) {
      res.status(503).send({
        msg: "数据库异常",
      });
      return;
    }
    if (user) {
      res.status(400).send({
        msg: "用户已存在",
      });
      return;
    }
    /* 正常注册才能往下走 */
    next();
  });
}
