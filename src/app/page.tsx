import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldCheck, Truck, Sparkles } from "lucide-react";
import { productResponse } from "@/interfaces/interfaceproduct";
import { BrandResponse } from "@/interfaces/interfacebrand";

export default async function Home() {
  const productsRes = await fetch(
    "https://ecommerce.routemisr.com/api/v1/products"
  );
  const productsData: productResponse = await productsRes.json();
  
  const brandsRes = await fetch(
    "https://ecommerce.routemisr.com/api/v1/brands"
  );
  const brandsData: BrandResponse = await brandsRes.json();

  const featuredProducts = productsData.data.slice(32, 40);
  const featuredBrands = brandsData.data.slice(0, 5);

  return (
    <div className="bg-linear-to-br from-blue-950 via-blue-900 to-purple-900 text-white">

      {/* ================= HERO ================= */}
      <section className="min-h-[85vh] flex items-center container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-10 items-center w-full">

          {/* Text */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Elevate Your <span className="text-blue-400">Shopping</span> Experience
            </h1>

            <p className="text-blue-200 text-lg">
              Discover premium brands, top-rated products and exclusive deals.
            </p>
            
            <div className="flex gap-4 flex-wrap">
              <Link
                href="/product"
                className="bg-blue-500 hover:bg-blue-600 px-8 py-4 rounded-lg font-semibold transition shadow-lg hover:shadow-blue-500/30"
              >
                Shop Now
              </Link>

              <Link
                href="/categories"
                className="bg-white text-black hover:bg-gray-200 px-8 py-4 rounded-lg font-semibold transition"
              >
                Browse Categories
              </Link>
            </div>
          </div>

          {/* Image */}
          <div className="relative h-100 hidden md:block">
            <Image
            priority
              src={featuredProducts[4]?.imageCover}
              alt="Hero Product"
              fill
              className="object-contain drop-shadow-2xl"
              sizes="(max-width: 640px) 100vw, 25vw"
            />
          </div>

        </div>
      </section>

      {/* ================= FEATURED PRODUCTS ================= */}
      <section className="container mx-auto px-6 py-20">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-bold flex items-center gap-2">
            <Sparkles className="text-yellow-400" /> Trending Now
          </h2>
          <Link
            href="/product"
            className="flex items-center gap-2 text-blue-300  hover:text-white transition"
          >
            View All <ArrowRight size={18} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <Link
              key={product._id}
              href={"/product/" + product.id}
              className="bg-blue-950 rounded-2xl overflow-hidden  shadow-xl hover:scale-[1.03] transition"
            >
              <div className="relative aspect-square">
                <Image
                  src={product.imageCover}
                  alt={product.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 25vw"
                />
              </div>

              <div className="p-4 space-y-2">
                <h3 className="font-bold line-clamp-1">
                  {product.title}
                </h3>

                <p className="text-blue-300 text-sm">
                  {product.brand.name}
                </p>

                <p className="text-xl font-bold text-blue-400">
                  {product.price} EGP
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ================= BRANDS ================= */}
      <section className="container mx-auto px-6 py-20">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-bold">Trusted Brands</h2>
          <Link
            href="/brands"
            className="flex items-center gap-2 text-blue-300 hover:text-white transition"
          >
            View All <ArrowRight size={18} />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {featuredBrands.map((brand) => (
            <Link
              key={brand._id}
              href={"/brands/" + brand._id}
              className="bg-blue-950 rounded-2xl p-6 flex items-center justify-center hover:scale-105 transition shadow-xl"
            >
              <div className="relative w-full h-20">
                <Image
                  src={brand.image}
                  alt={brand.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 25vw"
                />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="bg-blue-950/60 backdrop-blur-sm py-20">
        <div className="container mx-auto px-6 grid md:grid-cols-3 gap-8 text-center">

          <div className="bg-white/10 p-8 rounded-2xl border border-white/20 space-y-4">
            <ShieldCheck size={40} className="mx-auto text-green-400" />
            <h3 className="text-xl font-bold">Secure Payment</h3>
            <p className="text-blue-200 text-sm">
              Your transactions are protected with advanced encryption.
            </p>
          </div>

          <div className="bg-white/10 p-8 rounded-2xl border border-white/20 space-y-4">
            <Truck size={40} className="mx-auto text-blue-400" />
            <h3 className="text-xl font-bold">Fast Delivery</h3>
            <p className="text-blue-200 text-sm">
              Get your orders delivered quickly and safely.
            </p>
          </div>

          <div className="bg-white/10 p-8 rounded-2xl border border-white/20 space-y-4">
            <Sparkles size={40} className="mx-auto text-purple-400" />
            <h3 className="text-xl font-bold">Premium Quality</h3>
            <p className="text-blue-200 text-sm">
              Carefully selected products from top brands.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}

