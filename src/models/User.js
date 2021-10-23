import bcrypt from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  avatarUrl: String,
  isGithub: { type: Boolean, default: false },
  email: { type: String, required: true, unique: true },
  password: { type: String, bcrypt: true },
});

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 4);
  }
});

const User = mongoose.model("User", userSchema);
export default User;
