import mongoose from "mongoose";
import User from "./user.model.js";
import Role from "./role.model.js";

const db = {
  mongoose,
  User,
  Role,
};

export default db;
