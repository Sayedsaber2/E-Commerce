
import Link from 'next/link'
import React from 'react'
import { ShoppingBag, Star } from "lucide-react";
import { productResponse } from '@/interfaces/interfaceproduct';
import Image from 'next/image';
import AddCart from '@/components/Addcart/addcart';
import FavHeart from '@/components/Heart/heart';
import { formatCurrency } from '@/Helpers/formatCurrency';
export default async function Product() {
  const response = await fetch('https://ecommerce.routemisr.com/api/v1/products')
  const data: productResponse = await response.json()

  return (
    <div className='container mx-auto pt-18 px-4 md:px-0'>
        {/* Header */}
  <div className='text-center mb-12'>
    <div className='flex items-center justify-center gap-2 mb-3'>
      <ShoppingBag className='text-blue-400' size={32} />
      <h1 className='text-4xl md:text-5xl font-bold text-white'>
        Our Products
      </h1>
      <ShoppingBag className='text-blue-400' size={32} />
    </div>
    <p className='text-blue-300 text-lg'>
      Discover {data.results} amazing products
    </p>
  </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {data.data.map((product) =>  
          <div key={product._id} className="  relative text-white rounded-2xl shadow-xl overflow-hidden hover:scale-[1.03] hover:shadow-blue-500/20 transition duration-300">
            {/* Favorite */}
            <FavHeart productId={product._id}  />
            <Link href={'/product/' + product.id}
              className="block group flex-1"
              aria-label={`View ${product.title}`} >
              <div className="relative aspect-square overflow-hidden">
                {/* Image */}
                <Image
                priority
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  src={product.imageCover}
                  fill
                  alt={product.title}
                  sizes="(max-width: 640px) 100vw, 25vw"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-blue-950/0 group-hover:bg-blue-950/20 transition-all duration-300" />
              </div>
              {/* Content */}
              <div className="bg-blue-950 p-4 space-y-2 z-10 cursor-pointer group">
                {/* Title */}
                <h3 className="text-lg font-bold line-clamp-1 group-hover:text-blue-300 transition">
                  {product.title}
                </h3>
                {/* Brand + Type */}
                <div className="flex items-center justify-between text-sm text-blue-300">
                  <span className='font-medium'>{product.brand.name}</span>
                  <span className="bg-blue-800 px-2 py-0.5 rounded-full text-xs">
                    {product.category.name}
                  </span>
                </div>
                {/* Rating */}
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={`${i < 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-500"
                        }`}
                    />
                  ))}
                  <span className="text-xs text-gray-400 ml-1">({product.ratingsAverage})</span>
                </div>
                {/* Price + Button */}
              </div>
            </Link>
            <div className="bg-blue-950  flex gap-4 items-center justify-between p-4 pt-0">
              <p className="text-xl font-bold text-blue-300">
                {formatCurrency(product.price) }
              </p>
              <AddCart productId={product._id} />
            </div>

          </div>

        )}
      </div>
    </div>
  )
}
