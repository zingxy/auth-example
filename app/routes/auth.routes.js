import { checkSignup, checkToken, checkAdmin } from "../middlewares/index.js";
import * as controller from "../controllers/auth.controller.js";

import express from "express";

const router = express.Router();

router.post("/signup", [checkSignup], controller.signup);
router.post("/signin", controller.signin);
router.post("/signout", controller.signout);
router.post("/refreshtoken", controller.refreshToken);

export default router;
