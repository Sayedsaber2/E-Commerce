import AddToCart from "@/components/Addcart/addcart";
import FavHeart from "@/components/Heart/heart";
import { categories } from "@/interfaces/interfacecategories";
import { productResponse } from "@/interfaces/interfaceproduct";
import { ArrowLeft, Award, Package, Star } from "lucide-react";
import { Params } from "next/dist/server/request/params";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function categoriesDetails({ params }: { params: Params }) {
    const { categoriesid } = await params
    const response = await fetch('https://ecommerce.routemisr.com/api/v1/categories/' + categoriesid)
    const { data: category }: { data: categories } = await response.json()


    const productsResponse = await fetch(`https://ecommerce.routemisr.com/api/v1/products?category=${category._id}`)

    const productsData: productResponse = await productsResponse.json()

    const avgRating = productsData.data.length > 0

        ? (productsData.data.reduce((sum, p) => sum + p.ratingsAverage, 0) / productsData.data.length).toFixed(1)
        : '0.0'
    return <div className='container mx-auto pt-24 px-4'>
        {/* Back Button */}
        <Link href='/categories' className='inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-8 transition group'>
            <ArrowLeft size={20} className='group-hover:-translate-x-1 transition-transform' />
            <span>Back to All Categories</span>
        </Link>

        {/* Category Hero */}
        <div className='bg-linear-to-br from-blue-950 via-blue-900 to-purple-900 rounded-3xl overflow-hidden shadow-2xl border border-blue-800/50 mb-12'>
            <div className='relative'>
                {/* Background Pattern */}
                <div className='absolute inset-0 opacity-10'>
                    <div className='absolute inset-0' style={{
                        backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
                        backgroundSize: '20px 20px'
                    }} />
                </div>

                <div className='relative p-8 md:p-12'>
                    <div className='flex flex-col md:flex-row items-center gap-8'>
                        {/* Category Image */}
                        <div className='relative w-48 h-48 md:w-64 md:h-64 bg-white rounded-3xl p-8 shadow-2xl'>
                            <Image src={category.image} alt={category.name} fill className='object-contain p-4' priority />
                        </div>

                        {/* Category Info */}
                        <div className='flex-1 text-center md:text-left'>
                            <h1 className='text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg'>
                                {category.name}
                            </h1>
                            <p className='text-blue-200 text-lg md:text-xl mb-8'>
                                Discover our premium collection
                            </p>

                            {/* Stats */}
                            <div className='grid grid-cols-3 gap-4 md:gap-6'>
                                <div className='bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20'>
                                    <div className='flex items-center justify-center mb-2'>
                                        <Package className='text-blue-300' size={24} />
                                    </div>
                                    <p className='text-3xl font-bold text-white mb-1'>{productsData.results}</p>
                                    <p className='text-blue-300 text-sm'>Products</p>
                                </div>

                                <div className='bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20'>
                                    <div className='flex items-center justify-center mb-2'>
                                        <Star className='text-yellow-400 fill-yellow-400' size={24} />
                                    </div>
                                    <p className='text-3xl font-bold text-white mb-1'>{avgRating}</p>
                                    <p className='text-blue-300 text-sm'>Avg Rating</p>
                                </div>

                                <div className='bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20'>
                                    <div className='flex items-center justify-center mb-2'>
                                        <Award className='text-purple-400' size={24} />
                                    </div>
                                    <p className='text-3xl font-bold text-white mb-1'>★</p>
                                    <p className='text-blue-300 text-sm'>Premium</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Products Header */}
        <div className='mb-8'>
            <h2 className='text-3xl md:text-4xl font-bold text-white mb-2'>
                {category.name} Products
            </h2>
            <p className='text-blue-300'>
                Browse our collection of {productsData.results} products
            </p>
        </div>

        {/* Products Grid */}
        {productsData.results > 0 ? (
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                {productsData.data.map((product) => (
                    <div key={product._id} className="relative text-white rounded-2xl shadow-xl overflow-hidden hover:scale-[1.03] hover:shadow-blue-500/20 transition duration-300">
                        {/* Favorite */}
                        <FavHeart productId={product._id}  />
                        <Link href={'/product/' + product.id}
                            className="block group flex-1"
                            aria-label={`View ${product.title}`} >
                            <div className="relative aspect-square overflow-hidden">
                                {/* Image */}
                                <Image
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                    src={product.imageCover}
                                    fill
                                    alt={product.title}
                                    sizes="(max-width: 640px) 100vw, 25vw"
                                />
                                {/* Overlay on hover */}
                                <div className="absolute inset-0 bg-blue-950/0 group-hover:bg-blue-950/20 transition-all duration-300" />
                            </div>
                            {/* Content */}
                            <div className="bg-blue-950 p-4 space-y-2 z-10 cursor-pointer group">
                                {/* Title */}
                                <h3 className="text-lg font-bold line-clamp-1 group-hover:text-blue-300 transition">
                                    {product.title}
                                </h3>
                                {/* Brand + Type */}
                                <div className="flex items-center justify-between text-sm text-blue-300">
                                    <span className='font-medium'>{product.brand.name}</span>
                                    <span className="bg-blue-800 px-2 py-0.5 rounded-full text-xs">
                                        {product.category.name}
                                    </span>
                                </div>
                                {/* Rating */}
                                <div className="flex items-center gap-1">
                                    {[1, 2, 3, 4, 5].map((star, i) => (
                                        <Star
                                            key={i}
                                            size={16}
                                            className={`${i < 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-500"
                                                }`}
                                        />
                                    ))}
                                    <span className="text-xs text-gray-400 ml-1">({product.ratingsAverage})</span>
                                </div>
                                {/* Price + Button */}
                            </div>
                        </Link>
                        <div className="bg-blue-950  flex gap-4 items-center justify-between p-4 pt-0">
                            <p className="text-xl font-bold text-blue-300">
                                {product.price} <span className="text-sm font-normal text-blue-400">EGP</span>
                            </p>
                            <AddToCart productId={product.id} />
                        </div>

                    </div>
                ))}
            </div>
        ) : (
            <div className='text-center py-20'>
                <p className='text-2xl text-blue-300'>No products found for this category</p>
                <Link href='/categories' className='inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mt-4'>
                    <ArrowLeft size={20} />
                    Back to Categories
                </Link>
            </div>
        )}
    </div>;
}
