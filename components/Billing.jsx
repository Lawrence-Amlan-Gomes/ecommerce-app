"use client";

import { useAuth } from "@/app/hooks/useAuth";
import { useTheme } from "@/app/hooks/useTheme";
import { useResponse } from "@/app/hooks/useResponse";
import colors from "@/app/color/color";
import {
  callUpdateCart,
  checkCartAvailabilityAction,
  updateProductInventoryAction,
  getAllProductsAction,
} from "@/app/actions";
import Image from "next/image";
import { useState } from "react";
import { collectMotionValues } from "framer-motion";

export default function Billing() {
  const { theme } = useTheme();
  const { auth, setAuth } = useAuth();
  const { products } = useResponse(); // Already loaded in ProductCard/Cart

  const [cardNumber, setCardNumber] = useState("");
  const [cardPin, setCardPin] = useState("");
  const [saveCart, setSaveCart] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [payslipData, setPayslipData] = useState(null);
  const [loading, setLoading] = useState(false);

  const email = auth?.email;
  const cart = Array.isArray(auth?.cart) ? auth.cart : [];

  // === Enrich cart with product data from `products` (in memory) ===
  const cartWithProducts = cart
    .map((item) => {
      const product = products.find((p) => p.id === item.id);
      if (!product) return null;
      return { ...item, product };
    })
    .filter(Boolean);

  // === Calculate total instantly ===
  const total = cartWithProducts
    .reduce((sum, item) => {
      const price =
        item.product.discount > 0
          ? item.product.price * (1 - item.product.discount / 100)
          : item.product.price;
      return sum + price * item.quantity;
    }, 0)
    .toFixed(2);

  // === Handle Payment – ALL SERVER ACTIONS HERE ===
  const handleMakePayment = async () => {
    if (!email) return alert("Please log in.");
    if (cardNumber.replace(/\D/g, "").length !== 16 || cardPin.replace(/\D/g, "").length !== 3)
      return alert("Fill card number (16 digits) and CVV (3 digits).");

    setLoading(true);
    setPaymentStatus("processing");
    setErrorMessage("");

    try {
      // 1. Re-fetch fresh products for stock check
      const freshProducts = await getAllProductsAction();
      const updatedCart = cart.map((item) => {
        const product = freshProducts.find((p) => p.id === item.id);
        return { ...item, product };
      });

      const { allAvailable, details } = await checkCartAvailabilityAction(cart);
      if (!allAvailable) {
        const msg = details
          .filter((d) => !d.available)
          .map((d) => `${d.reason}`)
          .join("\n");
        setErrorMessage(`Out of stock:\n${msg}`);
        setPaymentStatus("failed");
        setLoading(false);
        return;
      }

      // 2. Update inventory
      for (const item of cart) {
        const product = updatedCart.find((c) => c.id === item.id)?.product;
        if (!product) continue;
        const newInventory = product.inventory - item.quantity;
        await updateProductInventoryAction(item.id, newInventory);
      }

      // 3. Update cart in DB
      if (saveCart) {
        await callUpdateCart(email, cart);
      } else {
        await callUpdateCart(email, []);
        setAuth({ ...auth, cart: [] });
      }

      // 4. Generate payslip
      const payslip = {
        orderId: `ORD-${Date.now()}`,
        date: new Date().toLocaleDateString("en-GB"),
        items: cart.map((item) => {
          const product = updatedCart.find((c) => c.id === item.id)?.product;
          const price = product.discount > 0
            ? (product.price * (1 - product.discount / 100)).toFixed(2)
            : product.price.toFixed(2);
          return {
            name: product.name,
            quantity: item.quantity,
            price,
            subtotal: (item.quantity * price).toFixed(2),
          };
        }),
        total,
      };

      setPayslipData(payslip);
      setPaymentStatus("success");
    } catch (error) {
      console.error("Payment failed:", error);
      setErrorMessage("Payment failed. Try again.");
      setPaymentStatus("failed");
    } finally {
      setLoading(false);
    }
  };

  // SINGLE RETURN – Instant render
  return (
    <div
      className={`px-[10%] py-8 pt-[20%] sm:pt-[10%] min-h-screen transition-colors ${
        theme
          ? "bg-white text-gray-900"
          : "bg-black text-gray-100"
      }`}
    >

      {/* Not Logged In */}
      {!email && (
        <div className="text-center py-10">
          <p className={theme ? "text-red-600" : "text-red-400"}>Please log in to checkout.</p>
        </div>
      )}

      {/* Empty Cart */}
      {email && cart.length === 0 && (
        <div className="text-center py-10">
          <p className={theme ? "text-gray-600" : "text-gray-500"}>Your cart is empty.</p>
        </div>
      )}

      {/* SUCCESS STATE */}
      {paymentStatus === "success" && (
        <div className="max-w-4xl mx-auto">
          <div
            className={`px-6 py-5 rounded-lg mb-8 shadow-md border ${
              theme
                ? "bg-green-50 border-green-300 text-green-800"
                : "bg-green-900/40 border-green-700 text-green-300"
            }`}
          >
            <h2 className="text-2xl font-bold">Payment Successful!</h2>
            <p className="mt-1">Thank you for your purchase.</p>
          </div>

          <div
            className={`p-6 rounded-lg border shadow-lg ${
              theme
                ? "bg-white border-gray-200"
                : "bg-[#111111] border-[#333333]"
            }`}
          >
            <h3 className="text-xl font-semibold mb-5">Your Receipt</h3>
            <div className={`space-y-2 text-sm ${theme ? "text-gray-700" : "text-gray-300"}`}>
              <p><strong>Order ID:</strong> {payslipData.orderId}</p>
              <p><strong>Date:</strong> {payslipData.date}</p>
              <p><strong>Email:</strong> {email}</p>
            </div>

            <table className="w-full mt-6 border-collapse text-sm">
              <thead>
                <tr className={`border-b ${theme ? "border-gray-300" : "border-[#333333]"}`}>
                  <th className="text-left py-3 font-medium">Product</th>
                  <th className="text-center py-3 font-medium">Qty</th>
                  <th className="text-right py-3 font-medium">Price</th>
                  <th className="text-right py-3 font-medium">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {payslipData.items.map((item, i) => (
                  <tr key={i} className={`border-b ${theme ? "border-gray-200" : "border-[#333333]"}`}>
                    <td className={`py-3 ${theme ? "text-gray-800" : "text-gray-200"}`}>{item.name}</td>
                    <td className={`text-center py-3 ${theme ? "text-gray-800" : "text-gray-200"}`}>{item.quantity}</td>
                    <td className={`text-right py-3 ${theme ? "text-gray-800" : "text-gray-200"}`}>${item.price}</td>
                    <td className={`text-right py-3 ${theme ? "text-gray-800" : "text-gray-200"}`}>${item.subtotal}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={3} className="text-right font-bold py-4 text-base">Total:</td>
                  <td className="text-right font-bold py-4 text-base">${payslipData.total}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}

      {/* MAIN CHECKOUT */}
      {email && cart.length > 0 && paymentStatus !== "success" && (
        <>
          <h1 className={`text-3xl font-bold mb-8 text-center ${theme ? "text-gray-800" : "text-white"}`}>
            Checkout
          </h1>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">

            {/* ORDER SUMMARY – INSTANT */}
            <div
              className={`p-6 rounded-lg border shadow-lg ${
                theme
                  ? "bg-white border-gray-200"
                  : "bg-[#111111] border-[#333333]"
              }`}
            >
              <h2 className={`text-xl font-semibold mb-5 ${theme ? "text-gray-800" : "text-white"}`}>
                Order Summary
              </h2>

              {cartWithProducts.length === 0 ? (
                <p className={`text-center py-8 ${theme ? "text-gray-500" : "text-gray-400"}`}>
                  No items in cart.
                </p>
              ) : (
                <>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {cartWithProducts.map((item) => {
                      const p = item.product;
                      const price = p.discount > 0
                        ? (p.price * (1 - p.discount / 100)).toFixed(2)
                        : p.price.toFixed(2);

                      return (
                        <div
                          key={item.id}
                          className={`flex gap-4 items-center border-b pb-4 ${
                            theme ? "border-gray-200" : "border-[#333333]"
                          }`}
                        >
                          <div className="relative w-16 h-16">
                            <Image
                              src={p.image || "/placeholder.jpg"}
                              alt={p.name}
                              fill
                              className={`object-cover rounded-md ${theme ? "border border-gray-300" : "border border-[#333333]"} `}
                            />
                          </div>
                          <div className="flex-grow">
                            <h4 className={`font-medium ${theme ? "text-gray-800" : "text-white"}`}>
                              {p.name}
                            </h4>
                            <p className={`text-sm ${theme ? "text-gray-600" : "text-gray-400"}`}>
                              {p.discount > 0 ? (
                                <>
                                  <span className="line-through">${p.price.toFixed(2)}</span>{" "}
                                  <span className={theme ? "text-green-600" : "text-green-400"}>${price}</span>
                                </>
                              ) : (
                                <span>${p.price.toFixed(2)}</span>
                              )}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className={`font-medium ${theme ? "text-gray-800" : "text-white"}`}>
                              x{item.quantity}
                            </p>
                            <p className={`text-sm ${theme ? "text-gray-600" : "text-gray-400"}`}>
                              ${(item.quantity * price).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className={`mt-6 pt-4 border-t ${theme ? "border-gray-300" : "border-[#333333]"}`}>
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total:</span>
                      <span>${total}</span>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Payment Form */}
            <div
              className={`p-6 rounded-lg border shadow-lg ${
                theme
                  ? "bg-white border-gray-200"
                  : "bg-[#111111] border-[#333333]"
              }`}
            >
              <h2 className={`text-xl font-semibold mb-5 ${theme ? "text-gray-800" : "text-white"}`}>
                Payment Details
              </h2>
              <div className="space-y-5">

                {/* Card Number */}
                <div>
                  <label className={`block text-sm font-medium mb-1 ${theme ? "text-gray-700" : "text-gray-300"}`}>
                    Card Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, "").slice(0, 16))}
                    className={`w-full px-4 py-2.5 rounded-md border transition ${colors.Key} outline-none ${
                      theme
                        ? "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                        : "bg-[#0a0a0a] border-[#222222] text-white placeholder-gray-500"
                    }`}
                  />
                  <p className={`text-xs mt-1 ${theme ? "text-gray-500" : "text-gray-400"}`}>16 digits</p>
                </div>

                {/* Expiry + CVV */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${theme ? "text-gray-700" : "text-gray-300"}`}>Expiry</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      disabled
                      className={`w-full px-4 py-2.5 rounded-md border ${
                        theme
                          ? "bg-gray-50 border-gray-300 text-gray-500"
                          : "bg-[#0a0a0a] border-[#222222] text-gray-400"
                      }`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${theme ? "text-gray-700" : "text-gray-300"}`}>
                      CVV <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="123"
                      value={cardPin}
                      onChange={(e) => setCardPin(e.target.value.replace(/\D/g, "").slice(0, 3))}
                      className={`w-full px-4 py-2.5 rounded-md border transition outline-none ${
                        theme
                          ? "bg-white border-gray-300 text-gray-900"
                          : "bg-[#0a0a0a] border-[#222222] text-white"
                      }`}
                    />
                    <p className={`text-xs mt-1 ${theme ? "text-gray-500" : "text-gray-400"}`}>3 digits</p>
                  </div>
                </div>

                {/* Name on Card */}
                <div>
                  <label className={`block text-sm font-medium mb-1 ${theme ? "text-gray-700" : "text-gray-300"}`}>Name on Card</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    disabled
                    className={`w-full px-4 py-2.5 rounded-md border ${
                      theme
                        ? "bg-gray-50 border-gray-300 text-gray-500"
                        : "bg-[#0a0a0a] border-[#222222] text-gray-400"
                    }`}
                  />
                </div>

                {/* Save Cart Checkbox */}
                <div className="flex items-center gap-3 mt-6">
                  <input
                    type="checkbox"
                    id="save-cart"
                    checked={saveCart}
                    onChange={(e) => setSaveCart(e.target.checked)}
                    className={`w-5 h-5 rounded ${colors.keyColorBorder} ${colors.keyColorText} `}
                  />
                  <label
                    htmlFor="save-cart"
                    className={`text-sm cursor-pointer ${theme ? "text-gray-700" : "text-gray-300"}`}
                  >
                    Save this cart for next payment
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Error */}
          {errorMessage && (
            <div
              className={`max-w-6xl mx-auto mt-8 p-4 rounded-lg border ${
                theme
                  ? "bg-red-50 border-red-300 text-red-700"
                  : "bg-red-900/30 border-red-700 text-red-300"
              }`}
            >
              <pre className="whitespace-pre-wrap text-sm">{errorMessage}</pre>
            </div>
          )}

          {/* Pay Button */}
          <div className="flex justify-center mt-10">
            <button
              onClick={handleMakePayment}
              disabled={loading}
              className={`px-14 py-3.5 rounded-lg font-semibold text-lg transition-all shadow-md ${
                loading
                  ? "bg-gray-400 cursor-not-allowed text-gray-600"
                  : ` ${colors.keyColorBg} ${colors.keyColorBgHover} active:scale-95 text-white`
              }`}
            >
              {loading ? "Processing..." : "Make Payment"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}