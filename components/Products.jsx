"use client";
import { useTheme } from "@/app/hooks/useTheme";
import { useResponse } from "@/app/hooks/useResponse";
import { getAllProductsAction } from "@/app/actions";
import { useEffect, useState } from "react";
import Footer from "./Footer";
import ProductCard from "./ProductCard";

export default function Products() {
  const { theme } = useTheme();
  const { products, setProducts } = useResponse();
  const dummyCount = 12; // Number of dummy cards to show when loading
  const [error, setError] = useState("");

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
        className={`px-[10%] mt-[15%] sm:mt-[10%] sm:px-[10%] mb-[5%] pb-[5%] w-full ${
          theme ? "bg-[#ffffff] text-[#aaaaaaa]" : "bg-[#000000] text-[#eeeeee]"
        }`}
      >
        {products.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {Array.from({ length: dummyCount }).map((_, index) => (
              <ProductCard key={`loading-${index}`} loading={true} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {products.map((product) => (
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
      </div>
      <Footer />
    </>
  );
}
