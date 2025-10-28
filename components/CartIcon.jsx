// CartIcon component
'use client';

import { useTheme } from '@/app/hooks/useTheme';
import { useAuth } from '@/app/hooks/useAuth';
import { FaCartShopping } from 'react-icons/fa6';
import Link from 'next/link';
import { color } from 'framer-motion';
import colors from '@/app/color/color';

export default function CartIcon() {
  const { theme } = useTheme();
  const { auth } = useAuth();

  // Calculate total cart item count
  const cartCount = (auth?.cart || []).reduce((sum, item) => sum + (item.quantity || 0), 0);

  return (
    <Link href="/cart">
      <div
        className={`relative rounded-lg mr-3 border-[1px] h-[30px] w-[30px] sm:h-[35px] sm:w-[35px] lg:h-[40px] lg:w-[40px] flex items-center justify-center ${
          theme
            ? 'border-[#555555] hover:border-[#000000] hover:bg-[#f0f0f0]'
            : 'border-[#aaaaaa] hover:border-[#bbbbbb] hover:bg-[#111111]'
        }`}
        style={{ cursor: 'pointer' }}
      >
        <FaCartShopping
          className={`text-lg sm:text-xl lg:text-2xl ${
            theme ? 'text-[#222222]' : 'text-[#dadada]'
          }`}
        />
        {cartCount > 0 && (
          <span
            className={`absolute -top-2 -right-2 text-xs sm:text-sm font-semibold rounded-full h-4 sm:h-5 w-4 sm:w-5 flex items-center justify-center ${colors.keyColorBg} text-white`}
          >
            {cartCount}
          </span>
        )}
      </div>
    </Link>
  );
}