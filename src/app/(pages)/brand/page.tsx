
import { BrandResponse } from '@/interfaces/interfacebrand'
import { Sparkles } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default async function Brand() {

  const response = await fetch("https://ecommerce.routemisr.com/api/v1/brands")
  const data: BrandResponse = await response.json()
  return (
    <div className='container mx-auto pt-18 px-4 md:px-0'>
      <div className='text-center mb-12'>
        <div className='flex items-center justify-center gap-2 mb-3'>
          <Sparkles className='text-blue-400' size={32} />
          <h1 className='text-4xl md:text-5xl font-bold text-white'>
            Our Brands
          </h1>
          <Sparkles className='text-blue-400' size={32} />
        </div>
        <p className='text-blue-300 text-lg'>
          Discover {data.results} premium brands
        </p>
      </div>

      {/* <div className='flex items-center justify-between mb-6'>
        <p className='text-blue-300'>
          Page {data.metadata.currentPage} of {data.metadata.numberOfPages}
        </p>
        <p className='text-blue-300'>
          Showing {data.data.length} of {data.results} brands
        </p>
      </div> */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-6'>
        {data.data.map((brand) => (
          <Link
            key={brand._id}
            href={`/brand/${brand._id}`}
            className='group'
          >
            <div className='relative bg-linear-to-br from-blue-950 to-blue-900 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 hover:scale-105'>
              {/* Glow Effect */}
              <div className='absolute inset-0 bg-linear-to-br from-blue-500/0 to-blue-500/0 group-hover:from-blue-500/20 group-hover:to-purple-500/10 transition-all duration-300' />

              {/* Image Container */}
              <div className='relative aspect-square p-6 flex items-center justify-center'>
                <div className='relative w-full h-full'>
                  <Image
                    src={brand.image}
                    alt={brand.name}
                    fill
                    className='object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-300'
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"
                    priority
                  />
                </div>
              </div>

              {/* Brand Name */}
              <div className='relative bg-blue-950/80 backdrop-blur-sm p-4 border-t border-blue-800/50'>
                <h3 className='text-center font-bold text-white group-hover:text-blue-300 transition-colors line-clamp-1'>
                  {brand.name}
                </h3>
              </div>

              {/* Shine Effect on Hover */}
              <div className='absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-linear-to-r from-transparent via-white/10 to-transparent' />
            </div>
          </Link>
        ))}
      </div>

    </div>
  )
}
