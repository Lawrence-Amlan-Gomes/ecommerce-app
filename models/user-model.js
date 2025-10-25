import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    photo: { type: String },
    firstTimeLogin: { type: Boolean, default: true },
    cart: { type: Array, default: [] },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    isAdmin: {type: Boolean, default: false}
  },
  { versionKey: false } // Disable __v for the document
);

export const userModel =
  mongoose.models?.users || mongoose.model("users", UserSchema);
