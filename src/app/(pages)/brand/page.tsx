
import BrandCard from '@/components/brandcard/brandcard'
import { BrandResponse } from '@/interfaces/interfacebrand'
import { Sparkles } from 'lucide-react'
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
      <BrandCard Brands={data.data} />
    </div>
  )
}
