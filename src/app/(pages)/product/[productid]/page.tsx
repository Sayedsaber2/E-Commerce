import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import AddCart from '@/components/Addcart/addcart'
import { ArrowLeft, Package, Star, Tag } from 'lucide-react'
import { getProduct } from '@/lib/api'

import React from 'react'
import Slider from '@/components/slider/slider'
import HeartDetils from '@/components/HeartDetils/HeartDetils'
import Link from 'next/link'
import { formatCurrency } from '@/Helpers/formatCurrency'
type Props = { params: Promise<{ productid: string }> }

// generateStaticParams: وجودها بيخلي صفحات المنتجات تتحفظ جاهزة بدل ما تتبني مع كل زيارة
export async function generateStaticParams() {
  // [] فاضية: كل صفحة بتتبني أول مرة حد يفتحها، وبعدها بتتحفظ جاهزة لكل اللي بعده
  // مش بنبنيهم كلهم وقت الـ build، لأن الـ API بيرفض لما يجيله 145 طلب مرة واحدة
  return []
}

// generateMetadata: كل منتج ليه عنوان ووصف وصورة لوحده في جوجل وفي الشير
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { productid } = await params
  const product = await getProduct(productid)
  // المنتج مش موجود: مفيش داعي جوجل يفهرس الصفحة دي
  if (!product) return { title: "Product not found", robots: { index: false } }

  // description: وصف الـ API فيه Tab وسطور جديدة، فبنخليهم مسافة واحدة، وجوجل بيعرض حوالي 155 حرف بس
  const description = product.description.replace(/\s+/g, " ").trim().slice(0, 155)
  return {
    title: product.title,
    description,
    alternates: { canonical: `/product/${product.id}` },
    openGraph: { title: product.title, description, images: [product.imageCover] },
  }
}

export default async function ProductDetails({ params }: Props) {

  const { productid } = await params
  // getProduct: نفس الطلب اللي في generateMetadata، والـ cache بيخليه يتبعت مرة واحدة بس
  const product = await getProduct(productid)
  // notFound: لو الـ id غلط، بنعرض صفحة 404 حقيقية بدل صفحة بايظة
  if (!product) notFound()

  // jsonLd: بيانات منظمة بيقراها جوجل، وبيعرض منها السعر والتقييم والمخزون في نتيجة البحث
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    image: product.images,
    description: product.description,
    sku: product._id,
    brand: { "@type": "Brand", name: product.brand.name },
    aggregateRating: product.ratingsQuantity
      ? { "@type": "AggregateRating", ratingValue: product.ratingsAverage, reviewCount: product.ratingsQuantity }
      : undefined,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "EGP",
      availability: product.quantity > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    },
  }

  return (

    <div className="container mx-auto px-4 py-10 pt-16">
      {/* replace: بنأمّن النص عشان محدش يقدر يحط كود جوه وصف المنتج */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <Link
        href='/product'
        className='inline-flex pt-2 items-center gap-2 text-blue-400 hover:text-blue-300 mb-8 transition group'
      >
        <ArrowLeft size={20} aria-hidden="true" className='group-hover:-translate-x-1 transition-transform' />
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
            <div className="flex items-center gap-1" role="img" aria-label={`Rated ${product.ratingsAverage} out of 5`}>
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
            {/* h2: بعد عنوان المنتج h1 على طول */}
            <h2 className=" font-semibold text-blue-300 uppercase tracking-wider">
              Description
            </h2>
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
