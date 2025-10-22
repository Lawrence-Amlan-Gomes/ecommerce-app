"use client";
import { useTheme } from "@/app/hooks/useTheme";
import { useEffect, useState } from "react";
import products from "@/app/products/products"; // Use mock data
import ProductCard from "./ProductCard";
import Footer from "./Footer";

export default function Products() {
  const { theme } = useTheme();
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    // Set mock data directly
    setProductList(products);
  }, []);

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
              All Products
            </h1>
            <div
              className="flex-grow h-[1px]"
              style={{
                backgroundImage: theme
                  ? "linear-gradient(to right, rgba(51, 51, 51, 0), rgba(51, 51, 51, 1))"
                  : "linear-gradient(to right, rgba(221, 221, 221, 0), rgba(221, 221, 221, 0.4))",
              }}
            />
          </div>
          <p
            className={`text-base lg:text-md w-full md:w-[50%] mt-2 ${
              theme ? "text-[#666666]" : "text-[#aaaaaa]"
            }`}
          >
            Browse our full collection of products. Find the perfect item for
            you!
          </p>
        </div>
        {productList.length === 0 ? (
          <div className="container mx-auto p-4 text-center">
            No products available.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {productList.map((product, index) => (
              <ProductCard
                key={index} // Use index since mock data has no id
                name={product.name}
                price={product.price}
                image={product.image}
              />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
