import type { Metadata } from 'next';
import { ShoppingBag } from "lucide-react";
import ProductsClient from '@/components/productcard/productcard';
import { getAllProducts } from '@/lib/api';

// revalidate: الصفحة بتتجدد كل ساعة لوحدها
export const revalidate = 3600;

// metadata: عنوان ووصف الصفحة في جوجل، و canonical بيقول لجوجل ده اللينك الأصلي للصفحة
export const metadata: Metadata = {
  title: "All Products",
  description: "Browse all products: electronics, fashion, beauty and more from top brands, with prices in EGP.",
  alternates: { canonical: "/product" },
};

export default async function Product() {
  // getAllProducts: بيجيب كل المنتجات (56)، مش أول 40 بس زي الأول
  const products = await getAllProducts()

  return (
    <div className='container mx-auto pt-18 px-4 md:px-0'>
        {/* Header */}
  <div className='text-center mb-12'>
    <div className='flex items-center justify-center gap-2 mb-3'>
      <ShoppingBag className='text-blue-400' size={32} aria-hidden="true" />
      <h1 className='text-4xl md:text-5xl font-bold text-white'>
        Our Products
      </h1>
      <ShoppingBag className='text-blue-400' size={32} aria-hidden="true" />
    </div>
    <p className='text-blue-300 text-lg'>
      Discover {products.length} amazing products
    </p>
  </div>
      <ProductsClient products={products} />
    </div>
  )
}
