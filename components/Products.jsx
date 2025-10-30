"use client";
import { useTheme } from "@/app/hooks/useTheme";
import { useResponse } from "@/app/hooks/useResponse";
import { getAllProductsAction } from "@/app/actions";
import { useEffect, useState, useMemo } from "react";
import Footer from "./Footer";
import ProductCard from "./ProductCard";
import colors from "@/app/color/color";
import SidebarFilters from "./SidebarFilters";

import { FaFilter } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function Products() {
  const { theme } = useTheme();
  const { products, setProducts } = useResponse();
  const dummyCount = 12;
  const [error, setError] = useState("");

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSort, setSelectedSort] = useState("name-asc");

  // Mobile drawer
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Unique categories
  const categories = useMemo(() => {
    return [...new Set(products.map(p => p.category).filter(Boolean))].sort();
  }, [products]);

  // Filtered & sorted products
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Search
    if (searchTerm.trim()) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Price range
    switch (selectedPriceRange) {
      case "under-50":  filtered = filtered.filter(p => p.price <= 50); break;
      case "50-100":    filtered = filtered.filter(p => p.price > 50 && p.price <= 100); break;
      case "100-200":   filtered = filtered.filter(p => p.price > 100 && p.price <= 200); break;
      case "over-200":  filtered = filtered.filter(p => p.price > 200); break;
    }

    // Category
    if (selectedCategories.length) {
      filtered = filtered.filter(p => selectedCategories.includes(p.category));
    }

    // Sort
    switch (selectedSort) {
      case "name-asc":   filtered.sort((a,b) => a.name.localeCompare(b.name)); break;
      case "name-desc":  filtered.sort((a,b) => b.name.localeCompare(a.name)); break;
      case "price-asc":  filtered.sort((a,b) => a.price - b.price); break;
      case "price-desc": filtered.sort((a,b) => b.price - a.price); break;
      case "discount-high": filtered.sort((a,b) => b.discount - a.discount); break;
    }

    return filtered;
  }, [products, searchTerm, selectedPriceRange, selectedCategories, selectedSort]);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getAllProductsAction();
        setProducts((prev) => {
          const prevArray = Array.isArray(prev) ? prev : [];
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

    if (products.length === 0) {
      fetchProducts();
    }
  }, [products.length, setProducts]);

  return (
    <>
      <div
        className={`px-[5%] sm:px-[10%] mt-[15%] sm:mt-[10%] mb-[5%] pb-[5%] w-full ${
          theme ? "bg-[#ffffff] text-[#aaaaaaa]" : "bg-[#000000] text-[#eeeeee]"
        }`}
      >
        {/* Mobile Filter Button */}
        <div className="lg:hidden flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Products</h1>
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 transition"
          >
            <FaFilter className="w-5 h-5" />
          </button>
        </div>

        {products.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {Array.from({ length: dummyCount }).map((_, i) => (
              <ProductCard key={`loading-${i}`} loading={true} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Desktop Sidebar - ONLY EXACT HEIGHT */}
            <aside className={`
              hidden lg:block lg:w-[22%] 
              ${colors.keyColorBorder} border-[1px] rounded-xl p-6 shadow-lg
              self-start mb-8 lg:mb-0
            `}>
              <SidebarFilters
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedPriceRange={selectedPriceRange}
                setSelectedPriceRange={setSelectedPriceRange}
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
                selectedSort={selectedSort}
                setSelectedSort={setSelectedSort}
                categories={categories}
                theme={theme}
                totalProducts={products.length}
                filteredCount={filteredProducts.length}
              />
            </aside>

            {/* Main Product Grid */}
            <section className="flex-1">
              <div className="text-right mb-4 text-sm opacity-75">
                Showing {filteredProducts.length} of {products.length} products
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {filteredProducts.map(p => (
                  <ProductCard
                    key={p.id}
                    id={p.id}
                    name={p.name}
                    price={p.price}
                    image={p.image}
                    discount={p.discount}
                    description={p.description}
                  />
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-xl font-medium mb-2">No products found</p>
                  <p className="text-sm opacity-75">Try adjusting your filters</p>
                </div>
              )}
            </section>
          </div>
        )}

        {/* Mobile Filter Drawer */}
        <AnimatePresence>
          {isDrawerOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsDrawerOpen(false)}
                className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              />

              {/* Drawer Panel */}
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className={`fixed inset-y-0 left-0 w-full max-w-sm ${theme ? 'bg-white' : 'bg-[#111111]'} shadow-xl z-50 overflow-y-auto p-6 lg:hidden`}
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">Filters</h2>
                  <button
                    onClick={() => setIsDrawerOpen(false)}
                    className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <SidebarFilters
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  selectedPriceRange={selectedPriceRange}
                  setSelectedPriceRange={setSelectedPriceRange}
                  selectedCategories={selectedCategories}
                  setSelectedCategories={setSelectedCategories}
                  selectedSort={selectedSort}
                  setSelectedSort={setSelectedSort}
                  categories={categories}
                  theme={theme}
                  totalProducts={products.length}
                  filteredCount={filteredProducts.length}
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      <Footer />
    </>
  );
}