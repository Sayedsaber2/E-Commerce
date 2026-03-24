"use client"
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Loader2, ShoppingCart } from 'lucide-react'
import toast from 'react-hot-toast'
import { addToCardActoion } from '@/app/Action/AddToCardAction'
import { useRouter } from 'next/navigation'

export default function AddToCart({ productId }: { productId: string }) {
  const router = useRouter()
  const [isLoadind, setisLoadind] = useState(false)
  async function addToCart(productId: string) {
  setisLoadind(true)
  const result = await addToCardActoion(productId)

  if (!result) {
    toast.error("Please login to add to cart");
    router.push("/login");
  } else if ("error" in result) {
    toast.error(result.error); // هنا بنعرض رسالة الخطأ
  } else if (result.status === "success") {
    toast.success(result.message || "Added to cart successfully");
    window.dispatchEvent(
      new CustomEvent("cartupdate", { detail: result.numOfCartItems })
    );
  } else {
    toast.error(result.message || "Failed to add to cart");
  }

  setisLoadind(false)
}
  return (
    <><Button disabled={isLoadind} onClick={(e) => {
      e.stopPropagation()
      e.preventDefault()
      addToCart(productId)
    }} className=" z-20 grow flex items-center cursor-pointer gap-2 bg-blue-600 hover:bg-blue-500  rounded-xl transition">
      {isLoadind ? <Loader2 className=' animate-spin' /> :
        <ShoppingCart className='size-5' size={18} />
      }
      Add Cart
    </Button></>
  )
}
