import { userModel } from "@/models/user-model";
import {
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from "@/utils/data-util";

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

export {
  changePassword,
  changePhoto,
  createUser,
  findUserByCredentials,
  getAllUsers,
  updateUser,
};
