import mongoose from "mongoose";

const RoleSchema = new mongoose.Schema({ name: String });

const Role = mongoose.model("role", RoleSchema);

export default Role;
