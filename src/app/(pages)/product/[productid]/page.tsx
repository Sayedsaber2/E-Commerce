import AddCart from '@/components/Addcart/addcart'
import { product } from '@/interfaces/interfaceproduct'
import { ArrowLeft, Package, Star, Tag } from 'lucide-react'

import React from 'react'
import Slider from '@/components/slider/slider'
import HeartDetils from '@/components/HeartDetils/HeartDetils'
import Link from 'next/link'
import { formatCurrency } from '@/Helpers/formatCurrency'
export default async function ProductDetails({ params }: { params: { productid: string } }) {

  const { productid } = await params
  const response = await fetch('https://ecommerce.routemisr.com/api/v1/products/' + productid)
  const { data: product }: { data: product } = await response.json()
  return (

    <div className="container mx-auto px-4 py-10 pt-16">
      <Link
        href='/product'
        className='inline-flex pt-2 items-center gap-2 text-blue-400 hover:text-blue-300 mb-8 transition group'
      >
        <ArrowLeft size={20} className='group-hover:-translate-x-1 transition-transform' />
        Back to Products
      </Link>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* Images */}
        <div className="h-full col-1 rounded-2xl shadow-xl overflow-hidden">

          <Slider images={product.images} title={product.title} />

        </div>



        {/* Info */}
        <div className="bg-blue-950 rounded-2xl p-6 shadow-xl flex flex-col lg:col-span-2 space-y-4">

          {/* Title */}
          <h1 className="text-3xl font-bold text-white leading-snug">
            {product.title}
          </h1>

          {/* Brand + Category */}
          <div className="flex items-center gap-3 text-sm flex-wrap">
            <div className="flex items-center gap-1 text-blue-300">
              <Tag size={14} />
              <span className="font-medium">{product.brand.name}</span>
            </div>
            <span className="bg-blue-800 px-3 py-1 rounded-full text-xs text-white">
              {product.category.name}
            </span>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (  // ✅ 5 نجوم
                <Star
                  key={i}
                  size={18}
                  className={
                    i < Math.round(product.ratingsAverage)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-600"
                  }
                />
              ))}
            </div>
            <span className="text-sm text-gray-400">
              {product.ratingsAverage}
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-blue-300">
              {formatCurrency(product.price) }
            </span>
            
          </div>
          {/* Divider */}
          <div className="border-t border-blue-800/50" />
          {/* Description */}
          <div className="space-y-2">
            <h3 className=" font-semibold text-blue-300 uppercase tracking-wider">
              Description
            </h3>
            <p className="text-gray-300 leading-relaxed ">
              {product.description}
            </p>
          </div>
          {/* Stock */}
          <div className="flex items-center gap-2">
            <Package size={16} className="text-green-400" />
            <span className="text-green-400 text-sm font-medium">
              {product.quantity} items in stock
            </span>
          </div>
          {/* Divider */}
          <div className="border-t border-blue-800/50" />
          {/* Actions */}
          <div className="flex items-center gap-4 mt-auto">


            <AddCart productId={product._id} />


            <HeartDetils productId={product._id} />
          </div>

        </div>
      </div>
    </div>


  )
}
