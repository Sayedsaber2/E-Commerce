"use client"
import { AddWishListAction } from "@/app/Action/WishList";
import { Heart, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";



import React, { useState } from "react";
import toast from "react-hot-toast";

export default function FavHeart({ productId }: { productId: string }) {
    const router = useRouter()
    const [Loading, setLoading] = useState(false);
    
     async function addWishList(productId: string) {
        setLoading(true);
        const response = await AddWishListAction(productId);

        if (!response) {
            toast.error("Please login to add to wishlist");
            router.push("/login");
        } else if ("error" in response) {
            toast.error(response.error); // رسالة الخطأ من السيرفر
        } else if (response.success) {
            toast.success(response.message);
        } else {
            toast.error(response.message || "Failed to add to wishlist");
        }

        setLoading(false);
    }
    return <>
        <button disabled={Loading} onClick={() => addWishList(productId)} className="absolute cursor-pointer z-20 top-3 right-3 bg-black/50 p-2 rounded-full hover:bg-pink-500 transition">
            {Loading ? <Loader2 className=' animate-spin' /> : <Heart size={18}  />}
        </button>
    </>;
}
