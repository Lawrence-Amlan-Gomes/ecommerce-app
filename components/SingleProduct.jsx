"use client";
import { useTheme } from "@/app/hooks/useTheme";
import { useAuth } from "@/app/hooks/useAuth";
import { useResponse } from "@/app/hooks/useResponse";
import { callUpdateCart, updateProductInventoryAction } from "@/app/actions";
import Image from "next/image";
import Footer from "./Footer";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import { useState } from "react";

export default function SingleProduct({ id }) {
  const { theme } = useTheme();
  const { auth, setAuth } = useAuth();
  const { products, setProducts } = useResponse();
  const [error, setError] = useState("");
  const [outOfStockMessage, setOutOfStockMessage] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  // Convert id to number for consistency with schema
  const product = products.find((p) => p.id === Number(id));

  // Handle product not found
  if (!product) {
    return (
      <div
        className={`w-full pt-[20%] sm:pt-[13%] ${
          theme ? "bg-[#ffffff] text-[#aaaaaa]" : "bg-[#000000] text-[#eeeeee]"
        }`}
      >
        <div className="w-[90%] sm:w-[80%] md:w-[60%] mx-auto mb-[5%] px-[5%] sm:px-0 relative">
          <div className="text-center text-xl">Product not found</div>
        </div>
      </div>
    );
  }

  // Add to cart functionality (adapted from ProductCard)
  const handleAddToCart = () => {
    if (isAdding) return;

    if (!auth?.email) {
      setError("Please log in to add items to your cart.");
      setTimeout(() => setError(""), 3000);
      return;
    }

    if (!id || isNaN(id)) {
      setError("Invalid product ID.");
      console.error("SingleProduct: Invalid product ID:", id);
      setTimeout(() => setError(""), 3000);
      return;
    }

    setIsAdding(true);
    try {
      if (product.inventory <= 0) {
        setOutOfStockMessage(`${product.name} is out of stock`);
        setTimeout(() => setOutOfStockMessage(""), 3000);
        console.log("SingleProduct: Out of stock for product:", product.name);
        return;
      }

      // Client-side update: decrease inventory
      const newInventory = product.inventory - 1;
      if (newInventory < 0) {
        setError("Cannot add: insufficient inventory.");
        console.error(
          "SingleProduct: Negative inventory prevented for product:",
          id
        );
        setTimeout(() => setError(""), 3000);
        return;
      }
      setProducts(
        products.map((p) =>
          p.id === Number(id) ? { ...p, inventory: newInventory } : p
        )
      );
      console.log("SingleProduct: Client-side inventory updated:", {
        id,
        newInventory,
      });

      // Client-side update: update cart
      const currentCart = Array.isArray(auth?.cart)
        ? auth.cart.filter(
            (item) =>
              item &&
              typeof item === "object" &&
              "id" in item &&
              typeof item.id === "number" &&
              "quantity" in item &&
              typeof item.quantity === "number" &&
              "date" in item &&
              typeof item.date === "string"
          )
        : [];
      const cartItemIndex = currentCart.findIndex(
        (item) => item.id === Number(id)
      );
      let updatedCartArray;
      if (cartItemIndex > -1) {
        updatedCartArray = currentCart.map((item, index) =>
          index === cartItemIndex
            ? {
                ...item,
                quantity: item.quantity + 1,
                date: new Date().toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                }),
              }
            : item
        );
      } else {
        updatedCartArray = [
          ...currentCart,
          {
            id: Number(id),
            quantity: 1,
            date: new Date().toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            }),
          },
        ];
      }
      setAuth({ ...auth, cart: updatedCartArray });
      console.log("SingleProduct: Client-side cart updated:", updatedCartArray);

      // Server update in background
      updateProductInventoryAction(id, newInventory).catch((err) => {
        console.error("SingleProduct: Server inventory update failed:", {
          message: err.message,
          stack: err.stack,
          id,
        });
        setError("Failed to sync inventory with server.");
        setTimeout(() => setError(""), 3000);
      });
      callUpdateCart(auth.email, updatedCartArray).catch((err) => {
        console.error("SingleProduct: Server cart update failed:", {
          message: err.message,
          stack: err.stack,
          id,
        });
        setError("Failed to sync cart with server.");
        setTimeout(() => setError(""), 3000);
      });
    } catch (error) {
      console.error("SingleProduct: Error adding to cart:", {
        message: error.message,
        stack: error.stack,
        id,
      });
      setError(`Failed to add to cart: ${error.message}`);
      setTimeout(() => setError(""), 3000);
    } finally {
      setIsAdding(false);
    }
  };

  // Calculate discounted price
  const discountedPrice =
    product.discount > 0
      ? (product.price * (1 - product.discount / 100)).toFixed(2)
      : null;

  return (
    <div
      className={`w-full pt-[20%] sm:pt-[13%] ${
        theme ? "bg-[#ffffff] text-[#aaaaaa]" : "bg-[#000000] text-[#eeeeee]"
      }`}
    >
      <div className="w-[90%] sm:w-[80%] md:w-[60%] mx-auto mb-[5%] px-[5%] sm:px-0 relative">
        {/* Error and Out of Stock Messages */}
        {error && (
          <div
            className={`absolute top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-md text-white bg-red-600 text-sm z-50`}
          >
            {error}
          </div>
        )}
        {outOfStockMessage && (
          <div
            className={`absolute top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-md text-white bg-red-600 text-sm z-50`}
          >
            {outOfStockMessage}
          </div>
        )}

        {/* Product Header */}
        <div className="mb-12">
          <div
            className={`flex items-center mb-5 gap-4 ${
              theme ? "text-[#333333]" : "text-[#dddddd]"
            }`}
          >
            <h1
              className={`text-3xl sm:text-4xl lg:text-5xl tracking-wide font-bold mb-2 ${
                theme ? "text-[#333333]" : "text-[#dddddd]"
              }`}
            >
              {product.name}
            </h1>
          </div>
          {/* Product Details */}
          <div className="flex flex-col gap-2">
            <p
              className={`text-sm sm:text-base lg:text-md ${
                theme ? "text-[#666666]" : "text-[#aaaaaa]"
              }`}
            >
              {product.description}
            </p>
            <p
              className={`text-sm sm:text-base lg:text-md ${
                theme ? "text-[#666666]" : "text-[#aaaaaa]"
              }`}
            >
              {product.discount > 0 ? (
                <>
                  <span className="line-through">${product.price.toFixed(2)}</span>{" "}
                  <span className="text-red-600">${discountedPrice}</span> (
                  {product.discount}% off)
                </>
              ) : (
                <span>${product.price.toFixed(2)}</span>
              )}
            </p>
            <p
              className={`text-sm sm:text-base lg:text-md ${
                theme ? "text-[#666666]" : "text-[#aaaaaa]"
              }`}
            >
              In Stock: {product.inventory}
            </p>
            {product.category && (
              <p
                className={`text-sm sm:text-base lg:text-md ${
                  theme ? "text-[#666666]" : "text-[#aaaaaa]"
                }`}
              >
                Category: {product.category}
              </p>
            )}
            <p
              className={`text-sm sm:text-base lg:text-md ${
                theme ? "text-[#666666]" : "text-[#aaaaaa]"
              }`}
            >
              SKU: {product.sku}
            </p>
          </div>
          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className={`text-sm px-4 py-2 rounded-md mt-4 w-fit ${
              theme
                ? "bg-orange-600 text-white hover:bg-orange-700"
                : "bg-orange-500 text-white hover:bg-orange-600"
              } ${isAdding ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={isAdding}
          >
            {isAdding ? "Adding..." : "Add to Cart"}
          </button>
        </div>

        {/* Product Image */}
        <div className="mb-12">
          <div
            className={`relative p-0 overflow-hidden border-[1px] mb-3 rounded-2xl ${
              theme ? "border-orange-800" : "border-orange-700"
            }`}
          >
            <Image
              src={product.image || "/placeholder-image.jpg"} // Fallback image
              alt={product.name}
              width={1200}
              height={600}
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="fixed right-[5%] md:right-[11%] top-[11%] sm:top-[15%] md:top-[33%] transform -translate-y-1/2 flex flex-row gap-3 md:flex-col sm:gap-4 z-50">
          <Link
            href="/products"
            className={`p-2 sm:p-3 rounded-full text-lg sm:text-xl md:hidden block ${
              theme
                ? "bg-[#ffffff] text-[#0a0a0a] border-[1px] border-orange-800 hover:bg-orange-800 hover:text-[#ffffff]"
                : "bg-[#1a1a1a] text-[#ebebeb] border-[1px] border-orange-700 hover:bg-orange-700 hover:text-[#ffffff]"
            }`}
            title="Back to Products"
          >
            <FaArrowLeft />
          </Link>
        </div>
        <div className="md:fixed hidden left-[26%] sm:left-[4%] top-[11%] sm:top-[20%] transform -translate-y-1/2 md:flex flex-col gap-3 sm:gap-4 z-50">
          <Link
            href="/products"
            className={`p-2 sm:p-3 rounded-full text-lg sm:text-xl ${
              theme
                ? "bg-[#ffffff] text-[#0a0a0a] border-[1px] border-orange-800 hover:bg-orange-800 hover:text-[#ffffff]"
                : "bg-[#1a1a1a] text-[#ebebeb] border-[1px] border-orange-700 hover:bg-orange-700 hover:text-[#ffffff]"
            }`}
            title="Back to Products"
          >
            <FaArrowLeft />
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}