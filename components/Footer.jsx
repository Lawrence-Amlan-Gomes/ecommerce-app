"use client";
import { useTheme } from "@/app/hooks/useTheme";

function Footer() {
  const { theme } = useTheme();

  return (
    <footer
      className={`w-full px-[5%] sm:px-[10%] py-[3%] text-center ${
        theme
          ? "bg-[#ffffff] border-t border-[#dddddd] text-[#555555]"
          : "bg-[#000000] border-t border-[#222222] text-[#cccccc]"
      }`}
    >
      <span className="text-xs sm:text-sm">
        © {new Date().getFullYear()} Mobile-Commerce. All rights reserved.
      </span>
    </footer>
  );
}

export default Footer;