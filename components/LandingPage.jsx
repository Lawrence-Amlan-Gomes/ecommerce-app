"use client";
import { useTheme } from "@/app/hooks/useTheme";
import { useResponse } from "@/app/hooks/useResponse";
import { useEffect, useState } from "react";
import { getAllProductsAction } from "@/app/actions";
import ProductCard from "./ProductCard";
import Link from "next/link";
import Footer from "./Footer";
import colors from "@/app/color/color";

export default function LandingPage() {
  const { theme } = useTheme();
  const { products, setProducts } = useResponse();
  const [numProducts, setNumProducts] = useState(12);
  const [error, setError] = useState("");

  useEffect(() => {
    // Update numProducts based on screen size
    const updateNumProducts = () => {
      if (window.innerWidth < 768) {
        setNumProducts(3); // Mobile: show 3
      } else if (window.innerWidth < 1024) {
        setNumProducts(6); // Tablet: show 6
      } else {
        setNumProducts(12); // Laptop: show 9
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
        className={`px-[10%] mt-[20%] sm:mt-[10%] sm:px-[10%] mb-[5%] pb-[5%] w-full ${
          theme ? "bg-[#ffffff] text-[#aaaaaaa]" : "bg-[#000000] text-[#eeeeee]"
        }`}
      >
        <div className="mb-5">
          <div className={`${colors.keyColorBg} p-4 rounded-md`}>
            <h2 className="text-md text-center font-semibold md:text-xl flex justify-center items-center lg:text-2xl xl:text-3xl 2xl:text-5xl text-white">
              Welcome to Our Store! Discover Amazing Products Below.
            </h2>
          </div>
        </div>
        {error ? (
          <div className="container mx-auto p-4 text-center text-red-600">
            {error}
          </div>
        ) : products.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {Array.from({ length: numProducts }).map((_, index) => (
              <ProductCard key={`loading-${index}`} loading={true} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
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
              className={`px-4 py-2 rounded-md text-sm sm:text-[15px] font-medium hover:cursor-pointer border-[1px] text-white ${colors.keyColorBorder} ${colors.keyColorBg} ${colors.keyColortTextHover} hover:bg-transparent`}
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
