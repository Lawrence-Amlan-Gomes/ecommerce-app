import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  upvotes: { type: Number, default: 0 },      // ← NEW
  downvotes: { type: Number, default: 0 },    // ← NEW
  comments: [{
    text: { type: String, required: true },
    author: { type: String, default: "User" },
    createdAt: { type: Date, default: Date.now }
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const postModel = mongoose.models.Post || mongoose.model("Post", postSchema);