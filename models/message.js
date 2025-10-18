import mongoose, { Schema } from "mongoose";

const schema = new Schema({
  email: {
    required: true,
    type: String,
  },
  message: {
    required: true,
    type: Array,
  },
});

export const messageModel =
  mongoose.models.messages ?? mongoose.model("messages", schema);
