import { userModel } from "@/models/user-model";
import { messageModel } from "@/models/message";

import {
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from "@/utils/data-util";
import { Imprima } from "next/font/google";

async function getAllUsers() {
  const allUsers = await userModel.find().lean();
  return replaceMongoIdInArray(allUsers);
}

async function getAllMessages() {
  const allMessages = await messageModel.find().lean();
  return replaceMongoIdInArray(allMessages);
}

async function createUser(user) {
  return await userModel.create(user);
}

async function createMessage(user) {
  return await messageModel.create(user);
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

async function updateMessage(email, message) {
  await messageModel.updateOne(
    { email: email },
    { $set: { message:message } }
  );
}

async function changePassword(email, password) {
  await userModel.updateOne({ email: email }, { $set: { password: password } });
}

async function changePhoto(email, photo) {
  await userModel.updateOne({ email: email }, { $set: { photo: photo } });
}

export {
  changePassword,
  changePhoto,
  createUser,
  findUserByCredentials,
  getAllUsers,
  updateUser,
  createMessage,
  getAllMessages,
  updateMessage,
};