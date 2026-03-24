import { categoriesResponse } from '@/interfaces/interfacecategories'
import Image from 'next/image'
import Link from 'next/link'

export default async function Categories() {
  const response = await fetch('https://ecommerce.routemisr.com/api/v1/categories')
  const {  data: categories }: categoriesResponse = await response.json()

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
   <div className=' container mx-auto px-4 py-10 pt-18 grid grid-cols-4 auto-rows-[160px] gap-4'>
  {categories.map((category, index) => {
    const pattern = patterns[index % patterns.length]
    return (
      <Link
        key={category._id}
        href={`/categories/${category._id}`}
        className={`group ${pattern.size}`}
      >
        <div className='relative w-full h-full rounded-2xl overflow-hidden '>
          <Image src={category.image} alt={category.name} fill className='object-cover 'priority />
          
          {/* Overlay */}
          <div className='absolute inset-0 bg-linear-to-t from-black/70 to-transparent' />
          
          {/* Name */}
          <h3 className={`absolute bottom-3 left-3 font-bold text-white ${pattern.textSize}`}>
            {category.name}
          </h3>
        </div>
      </Link>
    )
  })}
</div>
  )
}