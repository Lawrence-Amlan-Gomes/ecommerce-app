import mongoose, { Schema } from "mongoose";

     const productSchema = new Schema({
       name: {
         type: String,
         required: true,
       },
       price: {
         type: Number,
         required: true,
       },
       image: {
         type: String,
         required: false,
       },
     });

     export const productModel = mongoose.models.products ?? mongoose.model("products", productSchema);