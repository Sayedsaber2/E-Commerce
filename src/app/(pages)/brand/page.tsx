import type { Metadata } from 'next'
import BrandCard from '@/components/brandcard/brandcard'
import { Sparkles } from 'lucide-react'
import { getAllBrands } from '@/lib/api'

export const metadata: Metadata = {
  title: "All Brands",
  description: "Shop by brand: discover products from Apple, Samsung, Adidas and many more trusted brands.",
  alternates: { canonical: "/brand" },
};

export default async function Brand() {
  // getAllBrands: كل البراندات (54)، مش أول 40 بس
  const brands = await getAllBrands()

  return (
    <div className='container mx-auto pt-18 px-4 md:px-0'>
      <div className='text-center mb-12'>
        <div className='flex items-center justify-center gap-2 mb-3'>
          <Sparkles className='text-blue-400' size={32} aria-hidden="true" />
          <h1 className='text-4xl md:text-5xl font-bold text-white'>
            Our Brands
          </h1>
          <Sparkles className='text-blue-400' size={32} aria-hidden="true" />
        </div>
        <p className='text-blue-300 text-lg'>
          Discover {brands.length} premium brands
        </p>
      </div>
      <BrandCard Brands={brands} />
    </div>
  )
}
