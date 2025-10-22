"use client";
import { useTheme } from "@/app/hooks/useTheme";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ProductCard({ name, price, image }) {
  const { theme } = useTheme();

  return (
    <div
      className={`flex flex-col rounded-lg overflow-hidden border-[1px] ${
        theme
          ? "bg-[#ffffff] hover:bg-[#fafafa] text-[#333333] border-blue-800"
          : "bg-[#000000] hover:bg-[#0a0a0a] text-[#dddddd] border-blue-800"
      }`}
    >
      <div className="relative w-full h-[200px] px-6 pt-6 overflow-hidden">
        <div
          className={`relative h-full w-full overflow-hidden rounded-md border-[1px] ${
            theme ? "border-[#dddddd]" : "border-[#222222]"
          }`}
        >
          <Link href="/products">
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative w-full h-full"
            >
              <Image src={image} alt={name} fill className="object-cover" />
            </motion.div>
          </Link>
        </div>
      </div>
      <div className="flex flex-col p-6">
        <h2 className="md:text-lg font-semibold mb-3">{name}</h2>
        <p className="text-sm mb-4 text-gray-600">${price}</p>
        <button
          className={`text-sm px-4 py-2 rounded-md ${
            theme
              ? "bg-blue-800 text-[#ffffff] hover:bg-blue-900"
              : "bg-blue-700 text-[#ffffff] hover:bg-blue-800"
          }`}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
