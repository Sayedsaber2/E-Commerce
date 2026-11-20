import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getCategories } from '@/lib/api'

export const metadata: Metadata = {
  title: "Shop by Category",
  description: "Explore all categories: electronics, men's and women's fashion, beauty, home and more.",
  alternates: { canonical: "/categories" },
};

export default async function Categories() {
  const categories = await getCategories()

  // ✅ أحجام عشوائية ثابتة (مش بتتغير مع كل refresh)
 const patterns = [
  { size: 'col-span-2 row-span-2', textSize: 'text-2xl' },  // كبير
  { size: 'col-span-2 row-span-1', textSize: 'text-lg' },   // عريض
  { size: 'col-span-1 row-span-1', textSize: 'text-md' },   // صغير
  { size: 'col-span-1 row-span-1', textSize: 'text-md' },   // صغير
  { size: 'col-span-1 row-span-2', textSize: 'text-lg' },   // طويل
  { size: 'col-span-2 row-span-2', textSize: 'text-2xl' },  // كبير
  { size: 'col-span-1 row-span-1', textSize: 'text-md' },   // صغير
  { size: 'col-span-1 row-span-1', textSize: 'text-md' },   // صغير
  { size: 'col-span-1 row-span-1', textSize: 'text-md' },   // صغير
]

  return (
    <div className='container mx-auto px-4 py-10 pt-18'>
      {/* h1: الصفحة مكانش ليها عنوان رئيسي، وجوجل وقارئ الشاشة محتاجينه */}
      <h1 className='mb-8 text-center text-4xl md:text-5xl font-bold text-white'>Shop by Category</h1>

      <div className='grid grid-cols-2 md:grid-cols-4 grid-flow-row-dense md:grid-flow-row auto-rows-[160px] gap-4'>
  {categories.map((category, index) => {
    const pattern = patterns[index % patterns.length]
    return (
      <Link
        key={category._id}
        href={`/categories/${category._id}`}
        className={`group ${pattern.size}`}
      >
        <div className='relative w-full h-full rounded-2xl overflow-hidden '>
          {/* sizes: الكارت عرضه نص الشاشة على الموبايل وربعها على الكمبيوتر، فبيتحمل صورة صغيرة على قده */}
          {/* priority: أول كارتين بس اللي بيظهروا أول ما الصفحة تفتح */}
          <Image
            src={category.image}
            alt={category.name}
            fill
            className='object-cover '
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={index < 2}
          />

          {/* Overlay */}
          <div className='absolute inset-0 bg-linear-to-t from-black/70 to-transparent' />

          {/* Name */}
          <h2 className={`absolute bottom-3 left-3 right-3 font-bold text-white ${pattern.textSize}`}>
            {category.name}
          </h2>
        </div>
      </Link>
    )
  })}
      </div>
    </div>
  )
}
