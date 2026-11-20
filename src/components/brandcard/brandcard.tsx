import { brand } from "@/interfaces/interfacebrand";
import Image from "next/image";
import Link from "next/link";
import React from "react";

// زي كارت المنتج: بيظهر على طول من السيرفر، والحركة لما تقف عليه بـ CSS بس
export default function BrandCard({ Brands }: { Brands: brand[] }) {
  return <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-6'>
    {Brands.map((brand, index) => (
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
              {/* priority: أول 4 بس، الباقي بيتحمل لما توصله */}
              <Image
                src={brand.image}
                alt={brand.name}
                fill
                className='object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-300'
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                priority={index < 4}
              />
            </div>
          </div>

          {/* Brand Name */}
          <div className='relative bg-blue-950/80 backdrop-blur-sm p-4 border-t border-blue-800/50'>
            {/* h2: الكارت تحت عنوان الصفحة h1 على طول */}
            <h2 className='text-center font-bold text-white group-hover:text-blue-300 transition-colors line-clamp-1'>
              {brand.name}
            </h2>
          </div>

          {/* Shine Effect on Hover */}
          <div className='absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-linear-to-r from-transparent via-white/10 to-transparent' />
        </div>
      </Link>
    ))}
  </div>;
}
