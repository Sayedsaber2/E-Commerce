"use client"
import { AddWishListAction } from "@/app/Action/WishList";
import { Heart, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

import React, { useState } from "react";
import toast from "react-hot-toast";

export default function HeartDetils({ productId }: { productId: string }) {
    const router = useRouter()
    const [Loading, setLoading] = useState(false);

    async function addWishList(productId: string) {
        setLoading(true)

        const response = await AddWishListAction(productId)

        if (response == null) {
            toast.error("Please login to add to wishlist")
            const currentUrl = window.location.pathname;
            router.push(`/login?url=${encodeURIComponent(currentUrl)}`);

        } else if ("success" in response && response.success) {
            toast.success(response.message)

        } else if ("error" in response) {
            toast.error(response.error)

        } else {
            toast.error(response.message)
        }

        setLoading(false)
    }

    return <>
        <button disabled={Loading} onClick={() => addWishList(productId)} className="p-2.5 rounded-xl cursor-pointer border border-blue-600 hover:bg-pink-500 transition">
            {Loading ? <Loader2 className=' animate-spin' /> : <Heart className="text-white" size={18} />}
        </button>
    </>;
}
