import { checkSignup, checkToken, checkAdmin } from "../middlewares/index.js";
import * as controller from "../controllers/auth.controller.js";

import express from "express";

const router = express.Router();

router.post("/api/auth/signup", [checkSignup], controller.signup);
router.post("/api/auth/signin", controller.signin);
router.post("/api/auth/signout", controller.signout);
export default router;
