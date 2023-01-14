import process from "node:process";
import express from "express";
import cors from "cors";

import dbConfig from "./app/config/db.config.js";
import db from "./app/models/index.js";

import authRouter from "./app/routes/auth.routes.js";
import userRouter from "./app/routes/user.routes.js";

import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

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

/* SwaggerApi SwaggerUi */
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Hello World",
      version: "1.0.0",
    },
  },
  apis: ["./app/routes/*.routes.js"], // files containing annotations as above
};

const swaggerDocument = swaggerJSDoc(options);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

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
app.get(
  "/",
  (req, res, next) => {
    console.log("Middleware 1 start");
    next();
    console.log("Middleware 1 end");
  },
  (req, res, next) => {
    console.log("Middleware 2 start");
    req.middleware = 2;
    next();
    console.log("Middleware 2 end");
  },
  (req, res) => {
    console.log("endpoint start");
    req.endpoint = 3;
    res.status(200).send({
      code: 20000,
      msg: "sucess",
    });

    console.log("endpoint end");
  }
);

app.use((req, res, next) => {
  console.log(req.url);
  next();
});

app.use((req, res, next) => {
  res.status(404).send({
    msg: "not founded",
  });
});

app.listen(3456, () => {
  console.log("server:http://localhost:3456");
});
