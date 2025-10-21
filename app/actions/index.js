"use server";
import {
  changePassword,
  changePhoto,
  createUser,
  findUserByCredentials,
  getAllUsers,
  updateUser,
  createPost,
  getAllPosts,
  deletePost,
  updatePost,
  addCommentToPost,
  upvotePost as upvoteQuery,     // ← ONLY THIS CHANGE
  downvotePost as downvoteQuery, // ← ONLY THIS CHANGE
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

async function createBlogPost(formData) {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("next-auth.session-token")?.value ||
                      cookieStore.get("__Secure-next-auth.session-token")?.value ||
                      cookieStore.get("authjs.session-token")?.value ||
                      cookieStore.get("__Secure-authjs.session-token")?.value;
  
  if (!sessionToken) {
    return { success: false, message: "Unauthorized - please login" };
  }

  await dbConnect();
  try {
    const { title, content } = Object.fromEntries(formData);
    
    if (!title || !content) {
      return { success: false, message: "Title and content required" };
    }

    const post = await createPost({
      title,
      content,
      author: "User",
      upvotes: 0,
      downvotes: 0,
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

async function deleteBlogPost(formData) {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("next-auth.session-token")?.value ||
                      cookieStore.get("__Secure-next-auth.session-token")?.value ||
                      cookieStore.get("authjs.session-token")?.value ||
                      cookieStore.get("__Secure-authjs.session-token")?.value;
  
  if (!sessionToken) {
    return { success: false, message: "Unauthorized - please login" };
  }

  await dbConnect();
  try {
    const { id } = Object.fromEntries(formData);
    
    if (!id) {
      return { success: false, message: "Post ID required" };
    }

    const deletedPost = await deletePost(id);
    
    if (!deletedPost) {
      return { success: false, message: "Post not found" };
    }

    revalidatePath("/blogs");
    return { success: true, message: "Post deleted successfully" };
  } catch (error) {
    console.error("Delete post error:", error);
    return { success: false, message: "Server error" };
  }
}

async function updateBlogPost(formData) {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("next-auth.session-token")?.value ||
                      cookieStore.get("__Secure-next-auth.session-token")?.value ||
                      cookieStore.get("authjs.session-token")?.value ||
                      cookieStore.get("__Secure-authjs.session-token")?.value;
  
  if (!sessionToken) {
    return { success: false, message: "Unauthorized - please login" };
  }

  await dbConnect();
  try {
    const { id, title, content } = Object.fromEntries(formData);
    
    if (!id || !title || !content) {
      return { success: false, message: "All fields required" };
    }

    const updatedPost = await updatePost(id, title, content);
    
    if (!updatedPost) {
      return { success: false, message: "Post not found" };
    }

    revalidatePath("/blogs");
    return { success: true, message: "Post updated successfully" };
  } catch (error) {
    console.error("Update post error:", error);
    return { success: false, message: "Server error" };
  }
}

async function addComment(formData) {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("next-auth.session-token")?.value ||
                      cookieStore.get("__Secure-next-auth.session-token")?.value ||
                      cookieStore.get("authjs.session-token")?.value ||
                      cookieStore.get("__Secure-authjs.session-token")?.value;
  
  if (!sessionToken) {
    return { success: false, message: "Unauthorized - please login" };
  }

  await dbConnect();
  try {
    const { postId, text } = Object.fromEntries(formData);
    
    if (!postId || !text || text.trim().length < 3) {
      return { success: false, message: "Comment must be at least 3 characters" };
    }

    const updatedPost = await addCommentToPost(postId, text.trim(), "User");
    
    if (!updatedPost) {
      return { success: false, message: "Post not found" };
    }

    revalidatePath("/blogs");
    return { success: true, message: "Comment added successfully", post: updatedPost };
  } catch (error) {
    console.error("Add comment error:", error);
    return { success: false, message: "Server error" };
  }
}

// ← NEW VOTE ACTIONS
async function upvotePost(formData) {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("next-auth.session-token")?.value ||
                      cookieStore.get("__Secure-next-auth.session-token")?.value ||
                      cookieStore.get("authjs.session-token")?.value ||
                      cookieStore.get("__Secure-authjs.session-token")?.value;
  
  if (!sessionToken) {
    return { success: false, message: "Unauthorized - please login" };
  }

  await dbConnect();
  try {
    const { id } = Object.fromEntries(formData);
    const updatedPost = await upvoteQuery(id);
    
    if (!updatedPost) {
      return { success: false, message: "Post not found" };
    }

    revalidatePath("/blogs");
    return { success: true, message: "Upvoted successfully", post: updatedPost };
  } catch (error) {
    console.error("Upvote error:", error);
    return { success: false, message: "Server error" };
  }
}

async function downvotePost(formData) {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("next-auth.session-token")?.value ||
                      cookieStore.get("__Secure-next-auth.session-token")?.value ||
                      cookieStore.get("authjs.session-token")?.value ||
                      cookieStore.get("__Secure-authjs.session-token")?.value;
  
  if (!sessionToken) {
    return { success: false, message: "Unauthorized - please login" };
  }

  await dbConnect();
  try {
    const { id } = Object.fromEntries(formData);
    const updatedPost = await downvoteQuery(id);
    
    if (!updatedPost) {
      return { success: false, message: "Post not found" };
    }

    revalidatePath("/blogs");
    return { success: true, message: "Downvoted successfully", post: updatedPost };
  } catch (error) {
    console.error("Downvote error:", error);
    return { success: false, message: "Server error" };
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
  getAllBlogPosts,
  deleteBlogPost,
  updateBlogPost,
  addComment,
  upvotePost,
  downvotePost,
};