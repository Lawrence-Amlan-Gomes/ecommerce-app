"use client";

import colors from "@/app/color/color";
import { useAuth } from "@/app/hooks/useAuth";
import { useResponse } from "@/app/hooks/useResponse";
import { useTheme } from "@/app/hooks/useTheme";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function ProductCard({
  id,
  name,
  price,
  image,
  discount,
  description,
  loading = false,
}) {
  const { theme } = useTheme();
  const { auth, setAuth } = useAuth();
  const { products, setProducts } = useResponse();
  const [error, setError] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const discountedPrice =
    discount > 0 ? (price * (1 - discount / 100)).toFixed(2) : null;

  // Helper: Get current quantity in cart
  const getCartQuantity = () => {
    if (!auth?.cart || !Array.isArray(auth.cart)) return 0;
    const item = auth.cart.find((item) => item.id === Number(id));
    return item?.quantity || 0;
  };

  const isInCart = getCartQuantity() > 0;

  const handleToggleCart = async () => {
    if (isAdding) return;

    if (!auth?.email) {
      alert("Please log in to manage your cart.");
      return;
    }

    if (!id || isNaN(id)) {
      setError("Invalid product ID.");
      console.error("ProductCard: Invalid product ID:", id);
      return;
    }

    setIsAdding(true);
    try {
      const product = products.find((p) => p.id === Number(id));
      if (!product) {
        setError("Product not found.");
        console.error("ProductCard: Product not found for id:", id);
        return;
      }

      const currentQuantity = getCartQuantity();
      let newQuantity, newInventory;

      if (isInCart) {
        // === REMOVE FROM CART ===
        if (currentQuantity <= 1) {
          newQuantity = 0;
        } else {
          newQuantity = currentQuantity - 1;
        }
        newInventory = product.inventory + 1; // return 1 to stock
      } else {
        // === ADD TO CART ===
        if (product.inventory <= 0) {
          alert("This product is out of stock.");
          return;
        }
        newQuantity = 1;
        newInventory = product.inventory - 1;
        if (newInventory < 0) {
          setError("Cannot add: insufficient inventory.");
          console.error("ProductCard: Negative inventory prevented for product:", id);
          return;
        }
      }

      // === CLIENT-SIDE: Update Inventory ===
      setProducts(
        products.map((p) =>
          p.id === Number(id) ? { ...p, inventory: newInventory } : p
        )
      );

      // === CLIENT-SIDE: Update Cart ===
      let updatedCartArray;
      if (newQuantity === 0) {
        updatedCartArray = auth.cart.filter((item) => item.id !== Number(id));
      } else {
        const existingIndex = auth.cart.findIndex((item) => item.id === Number(id));
        const newItem = {
          id: Number(id),
          quantity: newQuantity,
          date: new Date().toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          }),
        };

        if (existingIndex > -1) {
          updatedCartArray = auth.cart.map((item, idx) =>
            idx === existingIndex ? newItem : item
          );
        } else {
          updatedCartArray = [...auth.cart, newItem];
        }
      }

      setAuth({ ...auth, cart: updatedCartArray });
      console.log("ProductCard: Client-side cart updated:", updatedCartArray);
    } catch (error) {
      console.error("ProductCard: Error toggling cart:", error);
      setError(`Failed to update cart: ${error.message}`);
      setTimeout(() => setError(""), 3000);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div
      className={`flex flex-col rounded-lg overflow-hidden border-[1px] relative ${colors.keyColorBorder} ${
        theme
          ? "bg-[#ffffff] hover:bg-[#fafafa] text-[#333333]"
          : "bg-[#000000] hover:bg-[#0a0a0a] text-[#dddddd]"
      }`}
    >
      {loading ? (
        <motion.div
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className={`flex flex-col rounded-lg overflow-hidden border-[1px] ${colors.keyColorBorder} ${
            theme
              ? "bg-[#ffffff] text-[#333333]"
              : "bg-[#000000] text-[#dddddd]"
          }`}
        >
          <div className="relative w-full h-[200px] px-6 pt-6 overflow-hidden">
            <div
              className={`relative h-full w-full rounded-md border-[1px] ${
                theme
                  ? "border-[#dddddd] bg-gray-200"
                  : "border-[#222222] bg-gray-700"
              }`}
            />
          </div>
          <div className="flex flex-col p-6 flex-grow">
            <div
              className={`h-6 w-3/4 rounded ${
                theme ? "bg-gray-200" : "bg-gray-700"
              } mb-3`}
            />
            <div
              className={`h-5 w-1/2 rounded ${
                theme ? "bg-gray-200" : "bg-gray-700"
              } mb-2`}
            />
            <div
              className={`h-4 w-full rounded ${
                theme ? "bg-gray-200" : "bg-gray-700"
              } mb-4`}
            />
            <div
              className={`h-10 w-1/3 rounded mt-auto ${
                theme ? "bg-gray-200" : "bg-gray-700"
              }`}
            />
          </div>
        </motion.div>
      ) : (
        <>
          <div className="relative w-full h-[200px] px-6 pt-6 overflow-hidden">
            <div
              className={`relative h-full w-full overflow-hidden rounded-md border-[1px] ${
                theme ? "border-[#dddddd]" : "border-[#222222]"
              }`}
            >
              <Link href={`/product/${id}`} className="block w-full h-full">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="relative w-full h-full"
                >
                  <Image src={image} alt={name} fill className="object-cover" />
                </motion.div>
              </Link>
            </div>
          </div>
          <div className="flex flex-col p-6 flex-grow">
            <h2 className="md:text-lg font-semibold mb-3">{name}</h2>
            <p
              className={`text-sm mb-2 ${
                theme ? "text-[#666666]" : "text-[#aaaaaa]"
              }`}
            >
              {discount > 0 ? (
                <>
                  <span className="line-through">${price.toFixed(2)}</span>{" "}
                  <span className="text-green-600">${discountedPrice}</span> (
                  {discount}% off)
                </>
              ) : (
                <span>${price.toFixed(2)}</span>
              )}
            </p>
            <p
              className={`text-sm mb-4 ${
                theme ? "text-[#666666]" : "text-[#aaaaaa]"
              }`}
            >
              In Stock:{" "}
              {products.find((p) => p.id === Number(id))?.inventory || 0}
            </p>
            <button
              onClick={handleToggleCart}
              className={`text-sm px-4 py-2 rounded-md mt-auto text-white transition-all ${
                isInCart
                  ? "bg-red-600 hover:bg-red-700"
                  : `${colors.keyColorBg} ${colors.keyColorHoverBg} ${colors.keyColortBgHover}`
              } ${isAdding ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={isAdding}
            >
              {isAdding
                ? "Updating..."
                : isInCart
                ? "Remove from Cart"
                : "Add to Cart"}
            </button>
          </div>
        </>
      )}
      {error && (
        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-3 py-1 rounded-md shadow-md z-10 animate-pulse">
          {error}
        </div>
      )}
    </div>
  );
}