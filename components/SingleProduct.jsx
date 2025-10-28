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

  const product = products.find((p) => p.id === Number(id));

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

  // === TOGGLE CART LOGIC (unchanged) ===
  const getCartQuantity = () => {
    if (!auth?.cart || !Array.isArray(auth.cart)) return 0;
    const item = auth.cart.find((item) => item.id === Number(id));
    return item?.quantity || 0;
  };

  const isInCart = getCartQuantity() > 0;

  const handleToggleCart = async () => {
    if (isAdding) return;

    if (!auth?.email) {
      setError("Please log in to manage your cart.");
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
      const currentQuantity = getCartQuantity();
      let newQuantity, newInventory;

      if (isInCart) {
        newQuantity = currentQuantity > 1 ? currentQuantity - 1 : 0;
        newInventory = product.inventory + 1;
      } else {
        if (product.inventory <= 0) {
          setOutOfStockMessage(`${product.name} is out of stock`);
          setTimeout(() => setOutOfStockMessage(""), 3000);
          return;
        }
        newQuantity = 1;
        newInventory = product.inventory - 1;
        if (newInventory < 0) {
          setError("Cannot add: insufficient inventory.");
          console.error("SingleProduct: Negative inventory prevented:", id);
          setTimeout(() => setError(""), 3000);
          return;
        }
      }

      setProducts(
        products.map((p) =>
          p.id === Number(id) ? { ...p, inventory: newInventory } : p
        )
      );

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

      updateProductInventoryAction(id, newInventory).catch((err) => {
        console.error("SingleProduct: Server inventory sync failed:", err);
        setError("Failed to sync inventory.");
        setTimeout(() => setError(""), 3000);
      });

      callUpdateCart(auth.email, updatedCartArray).catch((err) => {
        console.error("SingleProduct: Server cart sync failed:", err);
        setError("Failed to sync cart.");
        setTimeout(() => setError(""), 3000);
      });
    } catch (error) {
      console.error("SingleProduct: Cart toggle error:", error);
      setError(`Failed to update cart: ${error.message}`);
      setTimeout(() => setError(""), 3000);
    } finally {
      setIsAdding(false);
    }
  };

  const discountedPrice =
    product.discount > 0
      ? (product.price * (1 - product.discount / 100)).toFixed(2)
      : null;

  // === CLEAN DESCRIPTION: NO /n, NO \n VISIBLE ===
  const cleanDescription = product.description
    .replace(/\/n/g, "")
    .replace(/\\n/g, "\n")
    .replace(/\r\n/g, "\n")
    .replace(/\n+/g, "\n")
    .trim();

  const descriptionLines = cleanDescription
    .split("\n")
    .map(line => line.trim())
    .filter(line => line.length > 0);

  return (
    <div
      className={`w-full pt-[20%] sm:pt-[10%] md:pt-[8%] ${
        theme ? "bg-[#ffffff]" : "bg-[#000000]"
      }`}
    >
      <div className="w-[95%] sm:w-[90%] md:w-[85%] lg:w-[80%] mx-auto px-4 mb-[5%] sm:px-0">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 lg:gap-12">
          {/* IMAGE – 40% */}
          <div className="md:col-span-2">
            <div
              className={`relative overflow-hidden border-[1px] rounded-2xl ${
                theme ? "border-orange-800" : "border-orange-700"
              }`}
            >
              <Image
                src={product.image || "/placeholder-image.jpg"}
                alt={product.name}
                width={1200}
                height={800}
                className="w-full h-auto object-cover rounded-2xl"
                priority
                quality={95}
              />
            </div>
          </div>

          {/* DETAILS – 60% */}
          <div className="md:col-span-3 flex flex-col">
            {/* Back Button – Desktop */}
            <div className="hidden md:block mb-4">
              <Link
                href="/products"
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  theme
                    ? "bg-[#ffffff] text-[#0a0a0a] border border-orange-800 hover:bg-orange-800 hover:text-white"
                    : "bg-[#1a1a1a] text-[#ebebeb] border border-orange-700 hover:bg-orange-700 hover:text-white"
                }`}
              >
                <FaArrowLeft /> Back to Products
              </Link>
            </div>

            {/* TITLE: 14px (mobile), 18px (desktop) */}
            <h1
              className={`font-bold mb-3 tracking-wide text-[16px] md:text-[20px] ${
                theme ? "text-[#333333]" : "text-[#dddddd]"
              }`}
            >
              {product.name}
            </h1>

            {/* DESCRIPTION: 12px (mobile), 16px (desktop) */}
            <div className="mb-4">
              <p
                className={`leading-relaxed text-[12px] md:text-[16px] ${
                  theme ? "text-[#666666]" : "text-[#aaaaaa]"
                }`}
              >
                {descriptionLines.map((line, i) => (
                  <span key={i}>
                    {line}
                    {i < descriptionLines.length - 1 && <br />}
                  </span>
                ))}
              </p>
            </div>

            {/* PRICE & META: 12px (mobile), 16px (desktop) */}
            <div className="space-y-1 mb-5">
              <p
                className={`font-medium text-[12px] md:text-[16px] ${
                  theme ? "text-[#333333]" : "text-[#dddddd]"
                }`}
              >
                {product.discount > 0 ? (
                  <>
                    <span className="line-through text-[#999999] mr-2">
                      ${product.price.toFixed(2)}
                    </span>
                    <span className="text-red-600">${discountedPrice}</span>
                    <span className="text-green-600 ml-2 text-[10px] md:text-[14px]">
                      ({product.discount}% off)
                    </span>
                  </>
                ) : (
                  <span>${product.price.toFixed(2)}</span>
                )}
              </p>

              <p className={`text-[12px] md:text-[16px] ${theme ? "text-[#666666]" : "text-[#aaaaaa]"}`}>
                <strong>In Stock:</strong> {product.inventory}
              </p>

              {product.category && (
                <p className={`text-[12px] md:text-[16px] ${theme ? "text-[#666666]" : "text-[#aaaaaa]"}`}>
                  <strong>Category:</strong> {product.category}
                </p>
              )}

              <p className={`text-[12px] md:text-[16px] ${theme ? "text-[#666666]" : "text-[#aaaaaa]"}`}>
                <strong>SKU:</strong> {product.sku}
              </p>
            </div>

            {/* TOGGLE BUTTON */}
            <button
              onClick={handleToggleCart}
              disabled={isAdding}
              className={`w-full sm:w-auto px-6 py-3 rounded-lg font-medium text-white transition-all text-[12px] md:text-[14px] ${
                isInCart
                  ? "bg-red-600 hover:bg-red-700"
                  : theme
                  ? "bg-orange-600 hover:bg-orange-700"
                  : "bg-orange-500 hover:bg-orange-600"
              } ${isAdding ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {isAdding
                ? "Updating..."
                : isInCart
                ? `Remove from Cart (${getCartQuantity()})`
                : "Add to Cart"}
            </button>

            {/* Back Button – Mobile */}
            <div className="md:hidden mt-5">
              <Link
                href="/products"
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-[12px] sm:text-[16px] font-medium transition-all ${
                  theme
                    ? "bg-[#ffffff] text-[#0a0a0a] border border-orange-800 hover:bg-orange-800 hover:text-white"
                    : "bg-[#1a1a1a] text-[#ebebeb] border border-orange-700 hover:bg-orange-700 hover:text-white"
                }`}
              >
                <FaArrowLeft /> Back to Products
              </Link>
            </div>
          </div>
        </div>

        {/* TOAST MESSAGES */}
        {(error || outOfStockMessage) && (
          <div
            className={`fixed top-4 left-1/2 transform -translate-x-1/2 px-5 py-3 rounded-lg text-white text-sm font-medium shadow-lg z-50 transition-all animate-pulse ${
              error ? "bg-red-600" : "bg-orange-600"
            }`}
          >
            {error || outOfStockMessage}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}