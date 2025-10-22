"use client";
import { useTheme } from "@/app/hooks/useTheme";
import products from "@/app/products/products"; // Use mock data
import Link from "next/link";
import { useEffect, useState } from "react";
import Footer from "./Footer";
import ProductCard from "./ProductCard";

export default function LandingPage() {
  const { theme } = useTheme();
  const [productList, setProductList] = useState([]);
  const [numProducts, setNumProducts] = useState(9);

  useEffect(() => {
    // Set mock data directly
    setProductList(products);

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
            Discover our latest products! Check back often for new arrivals and
            exclusive deals.
          </p>
        </div>
        {productList.length === 0 ? (
          <div className="container mx-auto p-4 text-center">
            No products available.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {productList.slice(0, numProducts).map((product, index) => (
              <ProductCard
                key={index} // Use index since mock data has no id
                name={product.name}
                price={product.price}
                image={product.image}
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
