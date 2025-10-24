"use client";
import { useTheme } from "@/app/hooks/useTheme";
import { useAuth } from "@/app/hooks/useAuth";
import { useEffect, useState } from "react";
import { getAllProductsAction, callUpdateCart } from "@/app/actions";
import Image from "next/image";
import Link from "next/link";

export default function Cart() {
  const { theme } = useTheme();
  const { auth } = useAuth();
  // Initialize localCart from auth.cart, filtering invalid values
  const [localCart, setLocalCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Sync localCart with auth.cart when auth.cart changes
  useEffect(() => {
    const cart = Array.isArray(auth?.cart)
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
    console.log("Cart: Syncing localCart with auth.cart:", {
      authCart: auth?.cart,
      localCart: cart,
      itemCount: cart.length,
    }); // Debug
    setLocalCart(cart);
  }, [auth?.cart]);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getAllProductsAction();
        console.log("Cart: Fetched products:", fetchedProducts); // Debug
        setProducts(fetchedProducts || []);
      } catch (err) {
        setError("Failed to load products.");
        console.error("Cart: Error fetching products:", err); // Debug
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Retry function for callUpdateCart
  const retryCallUpdateCart = async (email, cartArray, retries = 3, delay = 500) => {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        console.log(`Cart: Attempt ${attempt} to update cart for ${email}:`, cartArray); // Debug
        await callUpdateCart(email, cartArray);
        console.log("Cart: Database updated successfully:", cartArray); // Debug
        return true;
      } catch (error) {
        console.error(`Cart: Attempt ${attempt} failed:`, {
          message: error.message,
          stack: error.stack,
        }); // Debug
        if (attempt === retries) {
          throw new Error(`Failed to update cart after ${retries} attempts: ${error.message}`);
        }
        await new Promise((resolve) => setTimeout(resolve, delay)); // Wait before retry
      }
    }
  };

  const handleUpdateQuantity = async (productId, quantity) => {
    if (quantity < 1) return;
    if (!auth?.email) {
      setError("Please log in to update the cart.");
      console.error("Cart: No user logged in for update"); // Debug
      return;
    }
    try {
      const updatedCartArray = localCart.map((item) =>
        item.id === Number(productId)
          ? { ...item, quantity, date: new Date().toISOString() }
          : item
      );
      console.log("Cart: Updating quantity:", { productId, quantity, updatedCartArray }); // Debug
      setLocalCart(updatedCartArray); // Update UI immediately
      await retryCallUpdateCart(auth.email, updatedCartArray);
    } catch (error) {
      console.error("Cart: Error updating cart item:", {
        message: error.message,
        stack: error.stack,
      }); // Debug
      setError(`Failed to update quantity: ${error.message}`);
      // Revert localCart on failure
      const cart = Array.isArray(auth?.cart)
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
      console.log("Cart: Reverting localCart on error:", cart); // Debug
      setLocalCart(cart);
    }
  };

  const handleRemoveItem = async (productId) => {
    if (!auth?.email) {
      setError("Please log in to update the cart.");
      console.error("Cart: No user logged in for remove"); // Debug
      return;
    }
    try {
      const updatedCartArray = localCart.filter((item) => item.id !== Number(productId));
      console.log("Cart: Removing item:", { productId, updatedCartArray }); // Debug
      setLocalCart(updatedCartArray); // Update UI immediately
      await retryCallUpdateCart(auth.email, updatedCartArray);
    } catch (error) {
      console.error("Cart: Error removing from cart:", {
        message: error.message,
        stack: error.stack,
      }); // Debug
      setError(`Failed to remove item: ${error.message}`);
      // Revert localCart on failure
      const cart = Array.isArray(auth?.cart)
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
      console.log("Cart: Reverting localCart on error:", cart); // Debug
      setLocalCart(cart);
    }
  };

  const getProductDetails = (productId) => {
    const product = products.find((product) => product.id === productId) || {};
    console.log("Cart: Product details for id:", { productId, product }); // Debug
    return product;
  };

  const calculateTotal = () => {
    const total = localCart.reduce((total, item) => {
      const product = getProductDetails(item.id);
      const price = product.discount > 0
        ? product.price * (1 - product.discount / 100)
        : product.price;
      return total + (price || 0) * item.quantity;
    }, 0).toFixed(2);
    console.log("Cart: Calculated total:", { total, localCart }); // Debug
    return total;
  };

  const cartCount = localCart.reduce((sum, item) => sum + item.quantity, 0);

  if (!auth?.email) {
    console.log("Cart: No user logged in"); // Debug
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
            className={`mt-4 px-4 py-2 rounded-md ${
              theme
                ? "bg-orange-600 text-white hover:bg-orange-700"
                : "bg-orange-500 text-white hover:bg-orange-600"
            }`}
          >
            Log In
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div
      className={`px-[10%] py-8 w-full ${
        theme ? "bg-[#ffffff] text-[#333333]" : "bg-[#000000] text-[#dddddd]"
      }`}
    >
      <h2 className="text-2xl font-bold mb-4">Your Cart ({cartCount})</h2>
      {error && (
        <p className="text-red-600 mb-4">{error}</p>
      )}
      {loading ? (
        <p>Loading...</p>
      ) : localCart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {localCart.map((item) => {
            if (!item.id || !item.quantity || !item.date) {
              console.warn("Cart: Invalid cart item skipped:", item); // Debug
              return null;
            }
            const product = getProductDetails(item.id);
            const discountedPrice = product.discount > 0
              ? (product.price * (1 - product.discount / 100)).toFixed(2)
              : product.price?.toFixed(2);
            return (
              <div
                key={item.id}
                className={`flex items-center gap-4 p-4 border-[1px] rounded-md ${
                  theme ? "border-orange-800" : "border-orange-600"
                }`}
              >
                <div className="relative w-24 h-24">
                  <Image
                    src={product.image || "/placeholder.jpg"}
                    alt={product.name || "Product"}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                <div className="flex-grow">
                  <h3 className="font-semibold">{product.name || "Unknown Product"}</h3>
                  <p
                    className={`text-sm ${
                      theme ? "text-[#666666]" : "text-[#aaaaaa]"
                    }`}
                  >
                    {product.discount > 0 ? (
                      <>
                        <span className="line-through">${product.price?.toFixed(2)}</span>{" "}
                        <span className="text-red-600">${discountedPrice}</span> ({product.discount}% off)
                      </>
                    ) : (
                      <span>${product.price?.toFixed(2)}</span>
                    )}
                  </p>
                  <p className={`text-sm ${theme ? "text-[#666666]" : "text-[#aaaaaa]"}`}>
                    Added: {new Date(item.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                    className={`px-2 py-1 rounded-md ${
                      theme
                        ? "bg-orange-600 text-white hover:bg-orange-700"
                        : "bg-orange-500 text-white hover:bg-orange-600"
                    }`}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                    className={`px-2 py-1 rounded-md ${
                      theme
                        ? "bg-orange-600 text-white hover:bg-orange-700"
                        : "bg-orange-500 text-white hover:bg-orange-600"
                    }`}
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className={`text-sm px-4 py-2 rounded-md ${
                    theme
                      ? "bg-red-600 text-white hover:bg-red-700"
                      : "bg-red-500 text-white hover:bg-red-600"
                    }`}
                >
                  Remove
                </button>
              </div>
            );
          })}
          <div className="mt-4">
            <p className="text-lg font-semibold">Total: ${calculateTotal()}</p>
            <button
              className={`mt-4 px-4 py-2 rounded-md ${
                theme
                  ? "bg-orange-600 text-white hover:bg-orange-700"
                  : "bg-orange-500 text-white hover:bg-orange-600"
              }`}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}