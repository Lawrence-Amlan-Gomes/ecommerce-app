"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SidebarFilters({
  searchTerm,
  setSearchTerm,
  selectedPriceRange,
  setSelectedPriceRange,
  selectedCategories,
  setSelectedCategories,
  selectedSort,
  setSelectedSort,
  categories,
  theme,
  totalProducts,
  filteredCount,
}) {
  const [openPrice, setOpenPrice] = useState(true);

  const clearAllFilters = () => {
    setSearchTerm("");
    setSelectedPriceRange("all");
    setSelectedCategories([]);
    setSelectedSort("name-asc");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center pb-4 border-b border-gray-300 dark:border-gray-700">
        <h2 className="text-xl font-bold mb-2">Filters</h2>
        <div className="flex justify-between text-xs opacity-75">
          <span>{filteredCount} of {totalProducts}</span>
          <button onClick={clearAllFilters} className="underline hover:no-underline">
            Clear All
          </button>
        </div>
      </div>

      {/* Search */}
      <div>
        <label className="block text-xs font-medium mb-2 uppercase tracking-wide opacity-75">
          Search Products
        </label>
        <input
          type="text"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Search by name or description..."
          className={`w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 transition-all ${
            theme
              ? "bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:ring-orange-500"
              : "bg-[#111111] border-[#222222] text-gray-100 placeholder-gray-400 focus:ring-orange-500"
          }`}
        />
      </div>

      {/* Price Range */}
      <div>
        <button
          onClick={() => setOpenPrice(!openPrice)}
          className="w-full flex items-center justify-between py-3 px-1 text-sm font-medium mb-2 hover:opacity-75 transition-all"
        >
          Price Range
          <svg
            className={`w-4 h-4 transition-transform ${openPrice ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <AnimatePresence>
          {openPrice && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="space-y-2">
                {[
                  { value: "all", label: "All Prices" },
                  { value: "under-50", label: "Under $50" },
                  { value: "50-100", label: "$50 – $100" },
                  { value: "100-200", label: "$100 – $200" },
                  { value: "over-200", label: "Over $200" },
                ].map(({ value, label }) => (
                  <label
                    key={value}
                    className={`flex items-center p-2 rounded-lg ${theme ? 'hover:bg-gray-100' : 'hover:bg-[#222222]'} cursor-pointer group transition-all`}
                  >
                    <input
                      type="radio"
                      name="price-range"
                      value={value}
                      checked={selectedPriceRange === value}
                      onChange={e => setSelectedPriceRange(e.target.value)}
                      className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded mr-3 group-hover:scale-110 transition-all"
                    />
                    <span className="text-sm">{label}</span>
                  </label>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Sort */}
      <div>
        <label className="block text-xs font-medium mb-2 uppercase tracking-wide opacity-75">
          Sort By
        </label>
        <select
          value={selectedSort}
          onChange={e => setSelectedSort(e.target.value)}
          className={`w-full px-3 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 transition-all ${
            theme
              ? "bg-white border-gray-200 text-gray-900 focus:ring-orange-500"
              : "bg-[#111111] border-[#222222] text-gray-100 focus:ring-orange-400"
          }`}
        >
          <option value="name-asc">Name (A-Z)</option>
          <option value="name-desc">Name (Z-A)</option>
          <option value="price-asc">Price (Low to High)</option>
          <option value="price-desc">Price (High to Low)</option>
          <option value="discount-high">Discount (High to Low)</option>
        </select>
      </div>
    </div>
  );
}