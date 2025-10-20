import { userModel } from "@/models/user-model";
import { postModel } from "@/models/post-model";

import {
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from "@/utils/data-util";
import { Imprima } from "next/font/google";

async function getAllUsers() {
  const allUsers = await userModel.find().lean();
  return replaceMongoIdInArray(allUsers);
}

async function createUser(user) {
  return await userModel.create(user);
}


async function findUserByCredentials(credentials) {
  const user = await userModel.findOne(credentials).lean();
  if (user) {
    return replaceMongoIdInObject(user);
  }
  return null;
}

async function updateUser(email, name, firstTimeLogin) {
  await userModel.updateOne(
    { email: email },
    { $set: { name: name, firstTimeLogin: firstTimeLogin } }
  );
}


async function changePassword(email, password) {
  await userModel.updateOne({ email: email }, { $set: { password: password } });
}

async function changePhoto(email, photo) {
  await userModel.updateOne({ email: email }, { $set: { photo: photo } });
}

async function createPost(postData) {
  return await postModel.create(postData);
}

async function getAllPosts() {
  const allPosts = await postModel.find().sort({ createdAt: -1 }).lean();
  return replaceMongoIdInArray(allPosts);
}

export {
  changePassword,
  changePhoto,
  createUser,
  findUserByCredentials,
  getAllUsers,
  updateUser,
  createPost,
  getAllPosts,
};