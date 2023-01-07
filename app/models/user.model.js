import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  roles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Role" }],
});

const User = mongoose.model("user", UserSchema);

export default User;
