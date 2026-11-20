import Link from "next/link"
import Image from "next/image"
import { Star } from "lucide-react"
import AddCart from "@/components/Addcart/addcart"
import FavHeart from "@/components/Heart/heart"
import { formatCurrency } from "@/Helpers/formatCurrency"
import { product } from "@/interfaces/interfaceproduct"

// الكروت كانت بتبدأ شفافة (opacity 0) ومستنية JavaScript عشان تظهر، وده كان مأخر أول ظهور للصفحة
// دلوقتي بتظهر على طول من السيرفر، والحركة لما تقف على الكارت بقت بـ CSS بس (hover:scale)
export default function ProductsClient({ products }: { products: product[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product, index) => {
        // rating: التقييم الحقيقي مقرّب لأقرب نجمة، مش 4 نجوم ثابتة
        const rating = Math.round(product.ratingsAverage)

        return (
          <div
            key={product._id}
            className="relative text-white rounded-2xl shadow-xl overflow-hidden hover:scale-[1.03] hover:shadow-blue-500/20 transition duration-300"
          >
            <FavHeart productId={product._id} />

            <Link href={"/product/" + product.id} className="block group">
              <div className="relative aspect-square overflow-hidden">
                {/* priority: أول 4 صور بس اللي بتظهر أول ما الصفحة تفتح، فهي بس اللي بتتحمل بدري */}
                <Image
                  priority={index < 4}
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  src={product.imageCover}
                  fill
                  alt={product.title}
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />

                <div className="absolute inset-0 bg-blue-950/0 group-hover:bg-blue-950/20 transition-all duration-300" />
              </div>

              <div className="bg-blue-950 p-4 space-y-2">
                {/* h2: الكارت تحت عنوان الصفحة h1 على طول، فلازم يبقى h2 مش h3 */}
                <h2 className="text-lg font-bold line-clamp-1 group-hover:text-blue-300 transition">
                  {product.title}
                </h2>

                <div className="flex items-center justify-between text-sm text-blue-300">
                  <span>{product.brand.name}</span>
                  <span className="bg-blue-800 px-2 py-0.5 rounded-full text-xs">
                    {product.category.name}
                  </span>
                </div>

                {/* aria-label: قارئ الشاشة بيقول "Rated 4 out of 5" بدل ما يقرا 5 أيقونات */}
                <div className="flex items-center gap-1" aria-label={`Rated ${product.ratingsAverage} out of 5`} role="img">
                  {[1, 2, 3, 4, 5].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      aria-hidden="true"
                      className={i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-500"}
                    />
                  ))}
                  <span className="text-xs text-gray-400 ml-1" aria-hidden="true">
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
          </div>
        )
      })}
    </div>
  )
}
