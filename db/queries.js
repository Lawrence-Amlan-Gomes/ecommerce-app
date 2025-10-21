import { userModel } from "@/models/user-model";
import { postModel } from "@/models/post-model";
import { replaceMongoIdInArray, replaceMongoIdInObject } from "@/utils/data-util";

async function getAllUsers() {
  const allUsers = await userModel.find().lean();
  return replaceMongoIdInArray(allUsers);
}

async function createUser(user) {
  return await userModel.create(user);
}

async function findUserByCredentials(credentials) {
  const user = await userModel.findOne(credentials).lean();
  if (user) return replaceMongoIdInObject(user);
  return null;
}

async function updateUser(email, name, firstTimeLogin) {
  await userModel.updateOne({ email }, { $set: { name, firstTimeLogin } });
}

async function changePassword(email, password) {
  await userModel.updateOne({ email }, { $set: { password } });
}

async function changePhoto(email, photo) {
  await userModel.updateOne({ email }, { $set: { photo } });
}

async function createPost(postData) {
  return await postModel.create(postData);
}

async function getAllPosts() {
  const allPosts = await postModel.find().sort({ createdAt: -1 }).lean();
  return replaceMongoIdInArray(allPosts);
}

async function deletePost(id) {
  return await postModel.findByIdAndDelete(id);
}

async function updatePost(id, title, content) {
  return await postModel.findByIdAndUpdate(id, { title, content, updatedAt: new Date() }, { new: true });
}

async function addCommentToPost(postId, commentText, commentAuthor) {
  const updatedPost = await postModel.findByIdAndUpdate(
    postId,
    {
      $push: { comments: { text: commentText, author: commentAuthor, createdAt: new Date() } },
      $set: { updatedAt: new Date() }
    },
    { new: true }
  ).lean();
  return updatedPost ? replaceMongoIdInObject(updatedPost) : null;
}

// ✅ FIXED VOTE QUERIES - REAL VOTING LOGIC
async function upvotePost(postId) {
  const updatedPost = await postModel.findByIdAndUpdate(
    postId,
    { $inc: { upvotes: 1 }, $set: { updatedAt: new Date() } },  // ← ONLY +1 UPVOTE
    { new: true }
  ).lean();
  return updatedPost ? replaceMongoIdInObject(updatedPost) : null;
}

async function downvotePost(postId) {
  const updatedPost = await postModel.findByIdAndUpdate(
    postId,
    { $inc: { downvotes: 1 }, $set: { updatedAt: new Date() } }, // ← ONLY +1 DOWNVOTE
    { new: true }
  ).lean();
  return updatedPost ? replaceMongoIdInObject(updatedPost) : null;
}

export {
  changePassword, changePhoto, createUser, findUserByCredentials, getAllUsers,
  updateUser, createPost, getAllPosts, deletePost, updatePost, addCommentToPost,
  upvotePost, downvotePost,
};