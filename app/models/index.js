import mongoose from "mongoose";
import User from "./user.model.js";
import Role from "./role.model.js";
import { RefreshToken } from "./refresh.model.js";

const db = {
  mongoose,
  User,
  Role,
  RefreshToken,
};

export default db;
 