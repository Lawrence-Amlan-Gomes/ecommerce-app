"use client";
import { useTheme } from "@/app/hooks/useTheme";
import { useResponse } from "@/app/hooks/useResponse";
import { useEffect, useState } from "react";
import { getAllProductsAction } from "@/app/actions";
import ProductCard from "./ProductCard";
import Link from "next/link";
import Footer from "./Footer";

export default function LandingPage() {
  const { theme } = useTheme();
  const { products, setProducts } = useResponse();
  const [numProducts, setNumProducts] = useState(9);
  const [error, setError] = useState("");

  useEffect(() => {
    // Update numProducts based on screen size
    const updateNumProducts = () => {
      if (window.innerWidth < 768) {
        setNumProducts(3); // Mobile: show 3
      } else if (window.innerWidth < 1024) {
        setNumProducts(6); // Tablet: show 6
      } else {
        setNumProducts(9); // Laptop: show 9
      }
    };

    updateNumProducts();
    window.addEventListener("resize", updateNumProducts);
    return () => window.removeEventListener("resize", updateNumProducts);
  }, []);

  useEffect(() => {
    // Fetch all products from the database
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getAllProductsAction();
        setProducts((prev) => {
          // Ensure prev is an array
          const prevArray = Array.isArray(prev) ? prev : [];
          // Avoid duplicates by checking IDs
          const newProducts = fetchedProducts.filter(
            (newProduct) =>
              !prevArray.some((existing) => existing.id === newProduct.id)
          );
          return [...prevArray, ...newProducts];
        });
      } catch (err) {
        setError("Failed to load products. Please try again later.");
        console.error("Error fetching products:", err);
      }
    };

    // Only fetch if products state is empty
    if (products.length === 0) {
      fetchProducts();
    }
  }, [products.length, setProducts]);

  return (
    <>
      <div
        className={`px-[10%] mt-[15%] sm:mt-[10%] sm:px-[15%] mb-[5%] pb-[5%] w-full ${
          theme ? "bg-[#ffffff] text-[#aaaaaaa]" : "bg-[#000000] text-[#eeeeee]"
        }`}
      >
        <div className="mb-8">
          <div
            className={`flex items-center mb-5 gap-4 ${
              theme ? "text-[#333333]" : "text-[#dddddd]"
            }`}
          >
            <h1
              className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 ${
                theme ? "text-[#333333]" : "text-[#dddddd]"
              }`}
            >
              Welcome to Our Store
            </h1>
          </div>
          <p
            className={`text-base lg:text-md w-full md:w-[100%] mt-2 ${
              theme ? "text-[#666666]" : "text-[#aaaaaa]"
            }`}
          >
            Discover our latest products! Check back often for new arrivals and
            exclusive deals.
          </p>
        </div>
        {error ? (
          <div className="container mx-auto p-4 text-center text-red-600">
            {error}
          </div>
        ) : products.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {Array.from({ length: numProducts }).map((_, index) => (
              <ProductCard key={`loading-${index}`} loading={true} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {products.slice(0, numProducts).map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.image}
                discount={product.discount}
                description={product.description}
              />
            ))}
          </div>
        )}
        <div className="flex justify-center mt-8">
          <Link href="/products">
            <div
              className={`px-4 py-2 rounded-md text-sm sm:text-[15px] font-medium hover:cursor-pointer ${
                theme
                  ? "bg-orange-800 text-[#ffffff] hover:bg-white border-[1px] border-orange-800 hover:text-orange-800"
                  : "bg-orange-700 text-[#ffffff] hover:bg-black border-[1px] border-orange-600 hover:text-orange-600"
              }`}
            >
              View All Products
            </div>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
