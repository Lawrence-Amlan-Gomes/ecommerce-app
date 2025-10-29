"use client";

import { useTheme } from "@/app/hooks/useTheme";
import { useAuth } from "@/app/hooks/useAuth";
import { useResponse } from "@/app/hooks/useResponse";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import colors from "@/app/color/color";

export default function Cart() {
  const { theme } = useTheme();
  const { auth, setAuth } = useAuth();
  const { products, setProducts } = useResponse();
  const [isUpdating, setIsUpdating] = useState({});

  const handleUpdateQuantity = (productId, quantity, action) => {
    if (quantity < 1) return;

    if (!auth?.email) {
      alert("Please log in to update the cart.");
      return;
    }

    if (isUpdating[`${productId}-${action}`]) return;

    setIsUpdating((prev) => ({ ...prev, [`${productId}-${action}`]: true }));

    try {
      const product = products.find((p) => p.id === Number(productId));
      if (!product) {
        alert("Product not found.");
        return;
      }

      const isIncreasing = action === "increment";

      // OUT OF STOCK → ALERT ONLY
      if (isIncreasing && product.inventory <= 0) {
        alert(`${product.name} is out of stock.`);
        return;
      }

      const inventoryChange = isIncreasing ? -1 : 1;
      const newInventory = product.inventory + inventoryChange;

      if (newInventory < 0) {
        alert("Cannot update: insufficient inventory.");
        return;
      }

      // Update inventory
      setProducts(
        products.map((p) =>
          p.id === Number(productId) ? { ...p, inventory: newInventory } : p
        )
      );

      // Update cart
      const currentCart = Array.isArray(auth?.cart)
        ? auth.cart.filter(
            (item) =>
              item &&
              typeof item === "object" &&
              "id" in item &&
              "quantity" in item &&
              "date" in item
          )
        : [];

      const updatedCartArray = currentCart.map((item) =>
        item.id === Number(productId)
          ? {
              ...item,
              quantity,
              date: new Date().toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              }),
            }
          : item
      );

      setAuth({ ...auth, cart: updatedCartArray });
    } catch (error) {
      alert(`Failed to update quantity: ${error.message}`);
    } finally {
      setIsUpdating((prev) => ({ ...prev, [`${productId}-${action}`]: false }));
    }
  };

  const handleRemoveItem = (productId) => {
    if (!auth?.email) {
      alert("Please log in to remove items from the cart.");
      return;
    }

    if (isUpdating[`${productId}-remove`]) return;

    setIsUpdating((prev) => ({ ...prev, [`${productId}-remove`]: true }));

    try {
      const product = products.find((p) => p.id === Number(productId));
      if (!product) {
        alert("Product not found.");
        return;
      }

      const currentCart = Array.isArray(auth?.cart)
        ? auth.cart.filter(
            (item) =>
              item &&
              typeof item === "object" &&
              "id" in item &&
              "quantity" in item &&
              "date" in item
          )
        : [];

      const currentItem = currentCart.find(
        (item) => item.id === Number(productId)
      );
      if (!currentItem) {
        alert("Item not found in cart.");
        return;
      }

      const newInventory = product.inventory + currentItem.quantity;
      setProducts(
        products.map((p) =>
          p.id === Number(productId) ? { ...p, inventory: newInventory } : p
        )
      );

      const updatedCartArray = currentCart.filter(
        (item) => item.id !== Number(productId)
      );
      setAuth({ ...auth, cart: updatedCartArray });
    } catch (error) {
      alert(`Failed to remove item: ${error.message}`);
    } finally {
      setIsUpdating((prev) => ({ ...prev, [`${productId}-remove`]: false }));
    }
  };

  const getProductDetails = (productId) => {
    return products.find((p) => p.id === productId) || {};
  };

  const calculateTotal = () => {
    return (auth?.cart || [])
      .reduce((total, item) => {
        const product = getProductDetails(item.id);
        const price =
          product.discount > 0
            ? product.price * (1 - product.discount / 100)
            : product.price;
        return total + (price || 0) * item.quantity;
      }, 0)
      .toFixed(2);
  };

  const cartCount = (auth?.cart || []).reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  if (!auth?.email) {
    return (
      <div
        className={`px-[10%] py-8 w-full ${
          theme ? "bg-[#ffffff] text-[#333333]" : "bg-[#000000] text-[#dddddd]"
        }`}
      >
        <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
        <p className="text-red-600">Please log in to view your cart.</p>
        <Link href="/login">
          <button
            className={`mt-4 px-4 py-2 rounded-md text-white ${colors.keyColorBg} ${colors.keyColorHoverBg}`}
          >
            Log In
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div
      className={`px-[10%] py-8 mt-[15%] sm:mt-[10%] w-full ${
        theme ? "bg-[#ffffff] text-[#333333]" : "bg-[#000000] text-[#dddddd]"
      }`}
    >
      <h2 className="text-2xl font-bold mb-4">Your Cart ({cartCount})</h2>

      {/* NO TOASTS, NO POPUPS — ONLY ALERTS */}

      {!auth.cart || auth.cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {auth.cart.map((item) => {
            if (!item.id || !item.quantity || !item.date) return null;

            const product = getProductDetails(item.id);
            const discountedPrice =
              product.discount > 0
                ? (product.price * (1 - product.discount / 100)).toFixed(2)
                : product.price?.toFixed(2);

            return (
              <div key={item.id}>
                {/* Mobile */}
                <div
                  className={`flex flex-col sm:items-center gap-4 p-4 border-[1px] sm:hidden rounded-md ${colors.keyColorBorder}`}
                >
                  <Link
                    href={`/product/${product.id}`}
                    className="relative w-full h-[150px] flex-shrink-0"
                  >
                    <Image
                      src={product.image || "/placeholder.jpg"}
                      alt={product.name || "Product"}
                      fill
                      className="object-cover rounded-md"
                    />
                  </Link>
                  <div className="flex flex-col sm:flex sm:items-center sm:flex-grow gap-2 sm:gap-4">
                    <div className="flex-grow">
                      <h3 className="font-semibold">
                        {product.name || "Unknown Product"}
                      </h3>
                      <p
                        className={`text-sm ${
                          theme ? "text-[#666666]" : "text-[#aaaaaa]"
                        }`}
                      >
                        {product.discount > 0 ? (
                          <>
                            <span className="line-through">
                              ${product.price?.toFixed(2)}
                            </span>{" "}
                            <span className="text-red-600">
                              ${discountedPrice}
                            </span>{" "}
                            ({product.discount}% off)
                          </>
                        ) : (
                          <span>${product.price?.toFixed(2)}</span>
                        )}
                      </p>
                      <p
                        className={`text-sm ${
                          theme ? "text-[#666666]" : "text-[#aaaaaa]"
                        }`}
                      >
                        Added: {item.date}
                      </p>
                      <p
                        className={`text-sm ${
                          theme ? "text-[#666666]" : "text-[#aaaaaa]"
                        }`}
                      >
                        In Stock: {product.inventory || 0}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          handleUpdateQuantity(
                            item.id,
                            item.quantity - 1,
                            "decrement"
                          )
                        }
                        className={`px-2 py-1 rounded-md text-white ${
                          colors.keyColorBg
                        } ${colors.keyColorHoverBg} ${
                          isUpdating[`${item.id}-decrement`]
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}
                        disabled={
                          item.quantity <= 1 ||
                          isUpdating[`${item.id}-decrement`]
                        }
                      >
                        {isUpdating[`${item.id}-decrement`] ? "..." : "-"}
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() =>
                          handleUpdateQuantity(
                            item.id,
                            item.quantity + 1,
                            "increment"
                          )
                        }
                        className={`px-2 py-1 rounded-md text-white ${
                          colors.keyColorBg
                        } ${colors.keyColorHoverBg} ${
                          isUpdating[`${item.id}-increment`]
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}
                        disabled={isUpdating[`${item.id}-increment`]}
                      >
                        {isUpdating[`${item.id}-increment`] ? "..." : "+"}
                      </button>
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className={`text-sm px-4 py-2 rounded-md ${
                          theme
                            ? "bg-red-600 text-white hover:bg-red-700"
                            : "bg-red-500 text-white hover:bg-red-600"
                        } ${
                          isUpdating[`${item.id}-remove`]
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}
                        disabled={isUpdating[`${item.id}-remove`]}
                      >
                        {isUpdating[`${item.id}-remove`]
                          ? "Removing..."
                          : "Remove"}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Desktop */}
                <div
                  className={`sm:flex hidden items-center gap-4 p-4 border-[1px] rounded-md ${colors.keyColorBorder}`}
                >
                  <Link
                    href={`/product/${product.id}`}
                    className="relative w-24 h-24"
                  >
                    <Image
                      src={product.image || "/placeholder.jpg"}
                      alt={product.name || "Product"}
                      fill
                      className="object-cover rounded-md"
                    />
                  </Link>
                  <div className="flex-grow">
                    <h3 className="font-semibold">
                      {product.name || "Unknown Product"}
                    </h3>
                    <p
                      className={`text-sm ${
                        theme ? "text-[#666666]" : "text-[#aaaaaa]"
                      }`}
                    >
                      {product.discount > 0 ? (
                        <>
                          <span className="line-through">
                            ${product.price?.toFixed(2)}
                          </span>{" "}
                          <span className="text-red-600">
                            ${discountedPrice}
                          </span>{" "}
                          ({product.discount}% off)
                        </>
                      ) : (
                        <span>${product.price?.toFixed(2)}</span>
                      )}
                    </p>
                    <p
                      className={`text-sm ${
                        theme ? "text-[#666666]" : "text-[#aaaaaa]"
                      }`}
                    >
                      Added: {item.date}
                    </p>
                    <p
                      className={`text-sm ${
                        theme ? "text-[#666666]" : "text-[#aaaaaa]"
                      }`}
                    >
                      In Stock: {product.inventory || 0}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        handleUpdateQuantity(
                          item.id,
                          item.quantity - 1,
                          "decrement"
                        )
                      }
                      className={`px-2 py-1 rounded-md text-white ${
                        colors.keyColorBg
                      } ${colors.keyColorHoverBg} ${
                        isUpdating[`${item.id}-decrement`]
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                      disabled={
                        item.quantity <= 1 || isUpdating[`${item.id}-decrement`]
                      }
                    >
                      {isUpdating[`${item.id}-decrement`] ? "..." : "-"}
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() =>
                        handleUpdateQuantity(
                          item.id,
                          item.quantity + 1,
                          "increment"
                        )
                      }
                      className={`px-2 py-1 rounded-md text-white ${
                        colors.keyColorBg
                      } ${colors.keyColorHoverBg} ${
                        isUpdating[`${item.id}-increment`]
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                      disabled={isUpdating[`${item.id}-increment`]}
                    >
                      {isUpdating[`${item.id}-increment`] ? "..." : "+"}
                    </button>
                  </div>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className={`text-sm px-4 py-2 rounded-md ${
                      theme
                        ? "bg-red-600 text-white hover:bg-red-700"
                        : "bg-red-500 text-white hover:bg-red-600"
                    } ${
                      isUpdating[`${item.id}-remove`]
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    disabled={isUpdating[`${item.id}-remove`]}
                  >
                    {isUpdating[`${item.id}-remove`] ? "Removing..." : "Remove"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-4">
        <p className="text-lg font-semibold">Total: ${calculateTotal()}</p>
        <Link href="/billing">
          <button
            className={`mt-4 px-4 py-2 rounded-md text-white ${colors.keyColorBg} ${colors.keyColorHoverBg}`}
          >
            Proceed to Checkout
          </button>
        </Link>
      </div>
    </div>
  );
}
