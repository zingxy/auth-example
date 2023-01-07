import * as middlewares from "../middlewares/index.js";
import * as controller from "../controllers/resource.controller.js";

import express from "express";

const router = express.Router();

router.get("/api/test/public", controller.publicAccess);
router.get("/api/test/user", [middlewares.checkToken], controller.userBoard);

router.get(
  "/api/test/admin",
  [middlewares.checkToken, middlewares.checkAdmin],
  controller.adminBoard
);
export default router;
