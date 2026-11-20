import type { Metadata } from "next";
import { authoptions } from "@/auth";
import WishList from "@/components/WishList/WishList";
import { FavRse } from "@/interfaces/wishlistinterface";
import { getServerSession } from "next-auth";

export const metadata: Metadata = {
  title: "Your Wishlist",
  // index: false = الصفحة دي خاصة بالمستخدم، فمش عايزين جوجل يعرضها في البحث
  robots: { index: false, follow: false },
};


export default async function WishlistPage() {
const session=await getServerSession(authoptions)
const response= await fetch("https://ecommerce.routemisr.com/api/v1/wishlist",{
  headers:{
    token:session?.token as string
  }
})
const data:FavRse=await response.json()

  return (
    <WishList wishlistData={data.count == 0?null:data} />
  )
}