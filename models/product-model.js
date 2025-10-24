import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
  id:{
    type:Number,
    required:true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  image: {
    type: String,
    required: false,
  },
  discount: {
    type: Number,
    required: false,
    min: 0,
    max: 100,
    default: 0,
  },
  inventory: {
    type: Number,
    required: true,
    min: 0,
    default: 0,
  },
  description: {
    type: String,
    required: false,
    trim: true,
  },
  category: {
    type: String,
    required: false,
    trim: true,
  },
  sku: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  createdAt: {
    type:String,
    required: false,
  },
  updatedAt: {
    type:String,
    required: false,
  },
});

export const productModel =
  mongoose.models.products ?? mongoose.model("products", productSchema);
