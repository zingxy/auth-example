import process from "node:process";
import express from "express";
import cors from "cors";

import dbConfig from "./app/config/db.config.js";
import db from "./app/models/index.js";

import authRouter from "./app/routes/auth.routes.js";
import userRouter from "./app/routes/user.routes.js";

/* 连接数据库 */
db.mongoose.set("strictQuery", "false");
db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`)
  .then(() => {
    console.log("数据库连接成功");
  })
  .catch(() => {
    console.log("数据库连接失败");
    process.exit();
  });

const app = express();

/* 配置跨源 */
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"],
    sameSite: "none",
  })
);

/* application/json*/
app.use(express.json());

/* application/x-www-form-urlencoded */
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRouter);
app.use("/api/test", userRouter);

app.use((req, res, next) => {
  res.status(404).send({
    msg: "not founded",
  });
});

app.listen(3456, () => {
  console.log("server:http://localhost:3456");
});
