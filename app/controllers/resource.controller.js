import CODE from "../constant/code.js";

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
