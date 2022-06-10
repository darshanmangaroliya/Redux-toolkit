import mongoose from "mongoose";

const userSchems = new mongoose.Schema(
  {
    username: { type: String, required: true ,unique:true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false, required: true },
    refreshToken: [String]

  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchems);
export default User;
