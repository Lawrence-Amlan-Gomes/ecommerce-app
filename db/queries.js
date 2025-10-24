import { userModel } from "@/models/user-model";
import { productModel } from "@/models/product-model";
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

async function updateCart(email, cart) {
  await userModel.updateOne(
    { email: email },
    { $set: { cart: cart } }
  );
}

async function changePassword(email, password) {
  await userModel.updateOne({ email: email }, { $set: { password: password } });
}

async function changePhoto(email, photo) {
  await userModel.updateOne({ email: email }, { $set: { photo: photo } });
}

async function getAllProducts() {
  const products = await productModel.find().lean();
  return replaceMongoIdInArray(products);
}

async function createProduct(product) {
  const createdProduct = await productModel.create(product);
  const plainProduct = createdProduct.toObject(); // Convert to plain object
  return replaceMongoIdInObject(plainProduct); // Replace MongoDB _id
}

async function productExistsById(id) {
  const product = await productModel.findOne({ id }).lean();
  return !!product;
}

async function productExistsBySku(sku) {
  const product = await productModel.findOne({ sku }).lean();
  return !!product;
}

export {
  changePassword,
  changePhoto,
  createUser,
  findUserByCredentials,
  getAllUsers,
  updateUser,
  getAllProducts,
  createProduct,
  productExistsById,
  productExistsBySku,
  updateCart,
};