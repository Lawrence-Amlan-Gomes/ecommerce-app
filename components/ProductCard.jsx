"use client";
import { useTheme } from "@/app/hooks/useTheme";
import { useAuth } from "@/app/hooks/useAuth";
import { callUpdateCart } from "@/app/actions";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ProductCard({ id, name, price, image, discount, description, loading = false }) {
  const { theme } = useTheme();
  const { auth } = useAuth();
  const discountedPrice = discount > 0 ? (price * (1 - discount / 100)).toFixed(2) : null;

  if (loading) {
    return (
      <motion.div
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        className={`flex flex-col rounded-lg overflow-hidden border-[1px] ${
          theme
            ? "bg-[#ffffff] text-[#333333] border-orange-800"
            : "bg-[#000000] text-[#dddddd] border-orange-800"
        }`}
      >
        <div className="relative w-full h-[250px] px-6 pt-6 overflow-hidden">
          <div
            className={`relative h-full w-full rounded-md border-[1px] ${
              theme ? "border-[#dddddd] bg-gray-200" : "border-[#222222] bg-gray-700"
            }`}
          />
        </div>
        <div className="flex flex-col p-6 flex-grow">
          <div className={`h-6 w-3/4 rounded ${theme ? "bg-gray-200" : "bg-gray-700"} mb-3`} />
          <div className={`h-5 w-1/2 rounded ${theme ? "bg-gray-200" : "bg-gray-700"} mb-2`} />
          <div className={`h-4 w-full rounded ${theme ? "bg-gray-200" : "bg-gray-700"} mb-4`} />
          <div className={`h-10 w-1/3 rounded mt-auto ${theme ? "bg-gray-200" : "bg-gray-700"}`} />
        </div>
      </motion.div>
    );
  }

  const handleAddToCart = async () => {
    if (!auth?.email) {
      console.log("ProductCard: No user logged in"); // Debug
      alert("Please log in to add items to your cart.");
      return;
    }
    if (!id || isNaN(id)) {
      console.error("ProductCard: Invalid product ID:", id); // Debug
      alert("Cannot add product to cart: Invalid product ID.");
      return;
    }
    console.log("ProductCard: Adding to cart:", { email: auth.email, productId: id }); // Debug
    try {
      // Handle auth.cart being array or invalid
      const currentCart = Array.isArray(auth?.cart)
        ? auth.cart.filter((item) => item && typeof item === 'object' && 'id' in item && typeof item.id === 'number')
        : [];
      const cartItemIndex = currentCart.findIndex((item) => item.id === Number(id));
      let updatedCartArray;
      if (cartItemIndex > -1) {
        updatedCartArray = currentCart.map((item, index) =>
          index === cartItemIndex
            ? { ...item, quantity: item.quantity + 1, date: new Date().toISOString() }
            : item
        );
      } else {
        updatedCartArray = [
          ...currentCart,
          { id: Number(id), quantity: 1, date: new Date().toISOString() }
        ];
      }
      console.log("ProductCard: Updating cart with:", updatedCartArray); // Debug
      await callUpdateCart(auth.email, updatedCartArray);
    } catch (error) {
      console.error("ProductCard: Error adding to cart:", error.message); // Debug
      alert(`Failed to add product to cart: ${error.message}`);
    }
  };

  return (
    <div
      className={`flex flex-col rounded-lg overflow-hidden border-[1px] ${
        theme
          ? "bg-[#ffffff] hover:bg-[#fafafa] text-[#333333] border-orange-800"
          : "bg-[#000000] hover:bg-[#0a0a0a] text-[#dddddd] border-orange-800"
      }`}
    >
      <div className="relative w-full h-[250px] px-6 pt-6 overflow-hidden">
        <div
          className={`relative h-full w-full overflow-hidden rounded-md border-[1px] ${
            theme ? "border-[#dddddd]" : "border-[#222222]"
          }`}
        >
          <Link href="/products">
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
              <span className="text-red-600">${discountedPrice}</span> ({discount}% off)
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
          {description}
        </p>
        <button
          onClick={handleAddToCart}
          className={`text-sm px-4 py-2 rounded-md mt-auto ${
            theme
              ? "bg-orange-600 text-white hover:bg-orange-700"
              : "bg-orange-500 text-white hover:bg-orange-600"
          }`}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}