"use server";
import {
  changePassword,
  changePhoto,
  createUser,
  findUserByCredentials,
  getAllUsers,
  updateUser,
  createPost,
  getAllPosts
} from "@/db/queries";
import { dbConnect } from "@/services/mongo";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signIn } from "../auth";

async function registerUser(formData) {
  await dbConnect();
  const created = await createUser(formData);
  redirect("/login");
}


async function signInWithGoogle() {
  const response = await signIn("google"); // Prevent automatic redirect
  return response; // Return the response object
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

async function createBlogPost(formData) {
  await dbConnect();
  try {
    const { title, content, author } = Object.fromEntries(formData);
    
    if (!title || !content || !author) {
      return { success: false, message: "Title, content, and author required" };
    }

    const post = await createPost({
      title,
      content,
      author,
    });

    revalidatePath("/blogs");
    return { success: true, message: "Post created", post };
  } catch (error) {
    console.error("Create post error:", error);
    return { success: false, message: "Server error" };
  }
}

async function getAllBlogPosts() {
  await dbConnect();
  try {
    const posts = await getAllPosts();
    return posts;
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
  createBlogPost,
  getAllBlogPosts
};