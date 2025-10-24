"use client";
import { useTheme } from "@/app/hooks/useTheme";
import { useResponse } from "@/app/hooks/useResponse";
import Footer from "./Footer";
import ProductCard from "./ProductCard";

export default function Products() {
  const { theme } = useTheme();
  const { products } = useResponse();
  const dummyCount = 9; // Number of dummy cards to show when loading

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
            className={`text-base lg:text-md w-full md:w-[100%] mt-2 ${
              theme ? "text-[#666666]" : "text-[#aaaaaa]"
            }`}
          >
            Browse our full collection of products. Find the perfect item for you!
          </p>
        </div>
        {products.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {Array.from({ length: dummyCount }).map((_, index) => (
              <ProductCard key={`loading-${index}`} loading={true} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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