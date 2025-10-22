"use server";
import {
  changePassword,
  changePhoto,
  createUser,
  findUserByCredentials,
  getAllUsers,
  updateUser,
} from "@/db/queries";
import { dbConnect } from "@/services/mongo";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signIn } from "next-auth/react";
import { cookies } from "next/headers";

async function registerUser(formData) {
  await dbConnect();
  const created = await createUser(formData);
  redirect("/login");
}

async function signInWithGoogle() {
  const response = await signIn("google");
  return response;
}

async function getAllUsers2() {
  try {
    await dbConnect();
    const users = await getAllUsers();
    return users;
  } catch (error) {
    throw error;
  }
}

// ✅ YOUR ORIGINAL WORKING LOGIN - UNCHANGED!
async function performLogin(formData) {
  await dbConnect();
  try {
    const found = await findUserByCredentials(formData);
    return found;
  } catch (error) {
    throw error;
  }
}

async function callUpdateUser(email, name, firstTimeLogin) {
  await dbConnect();
  try {
    await updateUser(email, name, firstTimeLogin);
    revalidatePath("/");
  } catch (error) {
    throw error;
  }
}

async function callChangePassword(email, password) {
  await dbConnect();
  try {
    await changePassword(email, password);
    redirect("/");
  } catch (error) {
    throw error;
  }
}

async function callChangePhoto(email, photo) {
  await dbConnect();
  try {
    await changePhoto(email, photo);
    redirect("/profile");
  } catch (error) {
    throw error;
  }
}

export {
  callChangePassword,
  callChangePhoto,
  callUpdateUser,
  getAllUsers2,
  performLogin,
  registerUser,
  signInWithGoogle,
};