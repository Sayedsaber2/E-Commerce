"use client"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { FavRse } from "@/interfaces/wishlistinterface"
import { formatCurrency } from "@/Helpers/formatCurrency"
import { Heart, Loader2, Trash2 } from "lucide-react"
import { DeleteWishtListAction } from "@/app/Action/WishListAction"
import toast from "react-hot-toast"





export default function WishList({ wishlistData }: { wishlistData: FavRse | null }) {

  const [Fav, setFav] = useState<FavRse | null>(wishlistData || null);
  const [Loading, setLoading] = useState<string | null>(null);
  async function DeleteWishtList(productId: string) {
    setLoading(productId)
    const response: FavRse = await DeleteWishtListAction(productId)
    if (response.status == "success") {
      toast.success("Product removed successfully to your wishlist")
      setFav((prev) => {
        if (!prev) return prev
        const updataproducts = prev.data.filter((product) => product._id !== productId)
        return { ...prev, data: updataproducts, count: updataproducts.length }
      })
    }
    setLoading(null)

  }

  return <>


    {Fav && Fav.data.length > 0 ? <div className="container mx-auto max-w-6xl pt-24 px-4 text-white">

      <div className="mb-10 text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Heart className="fill-pink-500 text-pink-500 " size={30} />
          <h1 className="text-3xl font-bold tracking-tight">
            My Wishlist
          </h1>
        </div>

        <p className="text-gray-300 text-center">
          {Fav.count} saved items
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Fav.data.map((product) => (
          <div
            key={product._id}
            className="relative rounded-2xl group overflow-hidden border border-white/10 bg-white/5 backdrop-blur-lg p-3 shadow-lg hover:shadow-2xl hover:scale-105 transition-transform"
          >
            <button
              disabled={Loading === product._id}
              onClick={() => DeleteWishtList(product._id)}
              className="absolute z-10 top-4 right-4 bg-black/50 p-2 cursor-pointer rounded-full hover:bg-pink-500 transition-all duration-300"
            >
              {Loading === product._id ? <Loader2 className='animate-spin' /> : <Trash2 size={16} />}
            </button>

            <div className="relative h-76 w-full mb-4 rounded-xl overflow-hidden">
              <Image
                priority
                src={product.imageCover}
                alt={product.title}
                sizes="(max-width: 640px) 100vw, 25vw"
                fill
                className="object-cover group-hover:scale-105 rounded-xl transition-transform duration-300"
              />
            </div>

            <h3 className="font-semibold text-lg leading-snug mb-2 line-clamp-1">
              {product.title}
            </h3>

            <p className="text-blue-400 font-semibold mb-4">
              {formatCurrency(product.price)}
            </p>

            <Link href={`/product/${product._id}`}>
              <Button className="w-full bg-blue-600 hover:bg-blue-500">
                View Product
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </div> : <div className="flex flex-col items-center justify-center text-center py-32 text-white">
      <h2 className="text-3xl font-bold mb-2">
        Your wishlist is empty
      </h2>
      <p className="text-gray-300 mb-8 max-w-md">
        Save items you love so you can easily find them later.
      </p>
      <Link href="/product">
        <Button className="bg-blue-600 h-12 hover:bg-blue-500 px-8 py-4 rounded-lg font-semibold transition shadow-lg hover:shadow-blue-500/30">
          Browse Products
        </Button>
      </Link>
    </div>}
  </>
}