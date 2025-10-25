'use client';

import { useTheme } from '@/app/hooks/useTheme';
import { useAuth } from '@/app/hooks/useAuth';
import { useResponse } from '@/app/hooks/useResponse';
import { callUpdateCart, updateProductInventoryAction } from '@/app/actions';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

export default function ProductCard({
  id,
  name,
  price,
  image,
  discount,
  description,
  loading = false,
}) {
  const { theme } = useTheme();
  const { auth, setAuth } = useAuth();
  const { products, setProducts } = useResponse();
  const [error, setError] = useState('');
  const [outOfStockMessage, setOutOfStockMessage] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const discountedPrice =
    discount > 0 ? (price * (1 - discount / 100)).toFixed(2) : null;

  const handleAddToCart = () => {
    if (isAdding) return;

    if (!auth?.email) {
      setError('Please log in to add items to your cart.');
      return;
    }

    if (!id || isNaN(id)) {
      setError('Invalid product ID.');
      console.error('ProductCard: Invalid product ID:', id);
      return;
    }
    setIsAdding(true);
    try {
      const product = products.find((p) => p.id === Number(id));
      if (!product) {
        setError('Product not found.');
        console.error('ProductCard: Product not found for id:', id);
        return;
      }
      if (product.inventory <= 0) {
        setOutOfStockMessage(`${product.name} out of stock`);
        setTimeout(() => setOutOfStockMessage(''), 3000);
        console.log('ProductCard: Out of stock for product:', product.name);
        return;
      }

      // Client-side update: decrease inventory
      const newInventory = product.inventory - 1;
      if (newInventory < 0) {
        setError('Cannot add: insufficient inventory.');
        console.error(
          'ProductCard: Negative inventory prevented for product:',
          id
        );
        return;
      }
      setProducts(
        products.map((p) =>
          p.id === Number(id) ? { ...p, inventory: newInventory } : p
        )
      );
      console.log('ProductCard: Client-side inventory updated:', {
        id,
        newInventory,
      });

      // Client-side update: update cart
      const currentCart = Array.isArray(auth?.cart)
        ? auth.cart.filter(
            (item) =>
              item &&
              typeof item === 'object' &&
              'id' in item &&
              typeof item.id === 'number' &&
              'quantity' in item &&
              typeof item.quantity === 'number' &&
              'date' in item &&
              typeof item.date === 'string'
          )
        : [];
      const cartItemIndex = currentCart.findIndex(
        (item) => item.id === Number(id)
      );
      let updatedCartArray;
      if (cartItemIndex > -1) {
        updatedCartArray = currentCart.map((item, index) =>
          index === cartItemIndex
            ? {
                ...item,
                quantity: item.quantity + 1,
                date: new Date().toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                }),
              }
            : item
        );
      } else {
        updatedCartArray = [
          ...currentCart,
          {
            id: Number(id),
            quantity: 1,
            date: new Date().toLocaleDateString('en-GB', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
            }),
          },
        ];
      }
      setAuth({ ...auth, cart: updatedCartArray });
      console.log('ProductCard: Client-side cart updated:', updatedCartArray);

      // Server update in background
      updateProductInventoryAction(id, newInventory).catch((err) => {
        console.error('ProductCard: Server inventory update failed:', {
          message: err.message,
          stack: err.stack,
          id,
        });
        setError('Failed to sync inventory with server.');
        setTimeout(() => setError(''), 3000);
      });
      callUpdateCart(auth.email, updatedCartArray).catch((err) => {
        console.error('ProductCard: Server cart update failed:', {
          message: err.message,
          stack: err.stack,
          id,
        });
        setError('Failed to sync cart with server.');
        setTimeout(() => setError(''), 3000);
      });
    } catch (error) {
      console.error('ProductCard: Error adding to cart:', {
        message: error.message,
        stack: error.stack,
        id,
      });
      setError(`Failed to add to cart: ${error.message}`);
      setTimeout(() => setError(''), 3000);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div
      className={`flex flex-col rounded-lg overflow-hidden border-[1px] relative ${
        theme
          ? 'bg-[#ffffff] hover:bg-[#fafafa] text-[#333333] border-orange-800'
          : 'bg-[#000000] hover:bg-[#0a0a0a] text-[#dddddd] border-orange-800'
      }`}
    >
      {error && (
        <div
          className={`absolute top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-md text-white bg-red-600 text-sm z-50`}
        >
          {error}
        </div>
      )}
      {outOfStockMessage && (
        <div
          className={`absolute top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-md text-white bg-red-600 text-sm z-50`}
        >
          {outOfStockMessage}
        </div>
      )}
      {loading ? (
        <motion.div
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          className={`flex flex-col rounded-lg overflow-hidden border-[1px] ${
            theme
              ? 'bg-[#ffffff] text-[#333333] border-orange-800'
              : 'bg-[#000000] text-[#dddddd] border-orange-800'
          }`}
        >
          <div className='relative w-full h-[250px] px-6 pt-6 overflow-hidden'>
            <div
              className={`relative h-full w-full rounded-md border-[1px] ${
                theme
                  ? 'border-[#dddddd] bg-gray-200'
                  : 'border-[#222222] bg-gray-700'
              }`}
            />
          </div>
          <div className='flex flex-col p-6 flex-grow'>
            <div
              className={`h-6 w-3/4 rounded ${
                theme ? 'bg-gray-200' : 'bg-gray-700'
              } mb-3`}
            />
            <div
              className={`h-5 w-1/2 rounded ${
                theme ? 'bg-gray-200' : 'bg-gray-700'
              } mb-2`}
            />
            <div
              className={`h-4 w-full rounded ${
                theme ? 'bg-gray-200' : 'bg-gray-700'
              } mb-4`}
            />
            <div
              className={`h-10 w-1/3 rounded mt-auto ${
                theme ? 'bg-gray-200' : 'bg-gray-700'
              }`}
            />
          </div>
        </motion.div>
      ) : (
        <>
          <div className='relative w-full h-[250px] px-6 pt-6 overflow-hidden'>
            <div
              className={`relative h-full w-full overflow-hidden rounded-md border-[1px] ${
                theme ? 'border-[#dddddd]' : 'border-[#222222]'
              }`}
            >
              <Link href='/products'>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className='relative w-full h-full'
                >
                  <Image src={image} alt={name} fill className='object-cover' />
                </motion.div>
              </Link>
            </div>
          </div>
          <div className='flex flex-col p-6 flex-grow'>
            <h2 className='md:text-lg font-semibold mb-3'>{name}</h2>
            <p
              className={`text-sm mb-2 ${
                theme ? 'text-[#666666]' : 'text-[#aaaaaa]'
              }`}
            >
              {discount > 0 ? (
                <>
                  <span className='line-through'>${price.toFixed(2)}</span>{' '}
                  <span className='text-red-600'>${discountedPrice}</span> (
                  {discount}% off)
                </>
              ) : (
                <span>${price.toFixed(2)}</span>
              )}
            </p>
            <p
              className={`text-sm mb-2 ${
                theme ? 'text-[#666666]' : 'text-[#aaaaaa]'
              }`}
            >
              {description}
            </p>
            <p
              className={`text-sm mb-4 ${
                theme ? 'text-[#666666]' : 'text-[#aaaaaa]'
              }`}
            >
              In Stock: {products.find((p) => p.id === Number(id))?.inventory || 0}
            </p>
            <button
              onClick={handleAddToCart}
              className={`text-sm px-4 py-2 rounded-md mt-auto ${
                theme
                  ? 'bg-orange-600 text-white hover:bg-orange-700'
                  : 'bg-orange-500 text-white hover:bg-orange-600'
              } ${isAdding ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isAdding}
            >
              {isAdding ? 'Adding...' : 'Add to Cart'}
            </button>
          </div>
        </>
      )}
    </div>
  );
}