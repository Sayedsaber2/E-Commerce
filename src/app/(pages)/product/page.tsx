
import Link from 'next/link'
import { ShoppingBag, Star } from "lucide-react";
import { productResponse } from '@/interfaces/interfaceproduct';
import ProductsClient from '@/components/productcard/productcard';
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
      <ProductsClient products={data.data} />
    </div>
  )
}
