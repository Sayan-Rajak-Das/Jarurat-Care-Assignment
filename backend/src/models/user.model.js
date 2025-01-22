import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      required: true,
      enum: ["admin", "user"], // Restrict the values to "admin" or "user"
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
