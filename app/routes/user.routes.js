import * as middlewares from "../middlewares/index.js";
import * as controller from "../controllers/resource.controller.js";

import express from "express";

const router = express.Router();

router.get("/public", controller.publicAccess);
router.get("/user", [middlewares.checkToken], controller.userBoard);

router.get(
  "/admin",
  [middlewares.checkToken, middlewares.checkAdmin],
  controller.adminBoard
);
export default router;
