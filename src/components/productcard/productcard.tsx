"use client"
import { motion , Variants} from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Star } from "lucide-react"
import AddCart from "@/components/Addcart/addcart"
import FavHeart from "@/components/Heart/heart"
import { formatCurrency } from "@/Helpers/formatCurrency"
import { product } from "@/interfaces/interfaceproduct"

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
}
const item: Variants = {
  hidden: { opacity: 0}, // يبدأ من فوق
  show: {
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
}
export default function ProductsClient({ products }: { products: product[] }) {
  return (
    <motion.div
      variants={container}
  initial="hidden"
  whileInView="show"
  viewport={{
    once: true,       // يظهر مرة واحدة بس
    margin: "-100px", // يبدأ قبل ما العنصر يدخل الشاشة بالكامل
  }}
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      {products.map((product) => (
        <motion.div
          key={product._id}
          variants={item}
          whileHover={{ scale: 1.05 }} // hover smooth
          transition={{ type: "spring", stiffness: 300 }}
          className="relative text-white rounded-2xl shadow-xl overflow-hidden hover:scale-[1.03] hover:shadow-blue-500/20 transition duration-300"
        >
          <FavHeart productId={product._id} />

          <Link href={"/product/" + product.id} className="block group">
            <div className="relative aspect-square overflow-hidden">
              <Image
                priority
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                src={product.imageCover}
                fill
                alt={product.title}
                sizes="(max-width: 640px) 100vw, 25vw"
              />

              <div className="absolute inset-0 bg-blue-950/0 group-hover:bg-blue-950/20 transition-all duration-300" />
            </div>

            <div className="bg-blue-950 p-4 space-y-2">
              <h3 className="text-lg font-bold line-clamp-1 group-hover:text-blue-300 transition">
                {product.title}
              </h3>

              <div className="flex items-center justify-between text-sm text-blue-300">
                <span>{product.brand.name}</span>
                <span className="bg-blue-800 px-2 py-0.5 rounded-full text-xs">
                  {product.category.name}
                </span>
              </div>

              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={`${
                      i < 4
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-500"
                    }`}
                  />
                ))}
                <span className="text-xs text-gray-400 ml-1">
                  ({product.ratingsAverage})
                </span>
              </div>
            </div>
          </Link>

          <div className="bg-blue-950 flex gap-4 items-center justify-between p-4 pt-0">
            <p className="text-xl font-bold text-blue-300">
              {formatCurrency(product.price)}
            </p>
            <AddCart productId={product._id} />
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}