// app/action/index.js
'use server';

import {
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
  productInventoryUpdate,
  checkProductsAvailability,
} from '@/db/queries';
import { dbConnect } from '@/services/mongo';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '../auth';

async function registerUser(formData) {
  await dbConnect();
  const created = await createUser(formData);
  redirect('/login');
}

async function signInWithGoogle() {
  const response = await signIn('google');
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
    revalidatePath('/');
  } catch (error) {
    throw error;
  }
}

async function callUpdateCart(email, cart) {
  await dbConnect();
  try {
    await updateCart(email, cart);
    revalidatePath('/');
  } catch (error) {
    throw error;
  }
}

async function callChangePassword(email, password) {
  await dbConnect();
  try {
    await changePassword(email, password);
    redirect('/');
  } catch (error) {
    throw error;
  }
}

async function callChangePhoto(email, photo) {
  await dbConnect();
  try {
    await changePhoto(email, photo);
    redirect('/profile');
  } catch (error) {
    throw error;
  }
}

async function getAllProductsAction() {
  await dbConnect();
  try {
    const products = await getAllProducts();
    return products;
  } catch (error) {
    throw error;
  }
}

async function createProductAction(productData) {
  await dbConnect();
  try {
    const created = await createProduct(productData);
    revalidatePath('/admin');
    return created;
  } catch (error) {
    throw error;
  }
}

async function checkProductById(id) {
  await dbConnect();
  try {
    return await productExistsById(id);
  } catch (error) {
    throw error;
  }
}

async function checkProductBySku(sku) {
  await dbConnect();
  try {
    return await productExistsBySku(sku);
  } catch (error) {
    throw error;
  }
}

async function updateProductInventoryAction(id, inventory) {
  await dbConnect();
  try {
    await productInventoryUpdate(id, inventory);
    revalidatePath('/cart');
  } catch (error) {
    console.error('updateProductInventoryAction: Error updating inventory:', error);
    throw error;
  }
}

// Add this new server action
async function checkCartAvailabilityAction(cart) {
  await dbConnect();
  try {
    const result = await checkProductsAvailability(cart);
    const allAvailable = result.every(r => r.available);
    return { allAvailable, details: result };
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
  createProductAction,
  getAllProductsAction,
  checkProductById,
  checkProductBySku,
  callUpdateCart,
  updateProductInventoryAction,
  checkCartAvailabilityAction,
};