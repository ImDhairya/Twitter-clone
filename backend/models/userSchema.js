import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
     
    username: {
      unique: true,
      type: String,
      required: true,
    },
    email: {
      unique: true,
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    followers: {
      type: Array,
      default: [],
    },
    following: {
      type: Array,
      default: [],
    },
  },
  {timestamps: true}
);

export const User = mongoose.model("User", userSchema);
