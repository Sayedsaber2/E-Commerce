import type { Metadata } from "next";
import { authoptions } from "@/auth";
import Cart from "@/components/Cart/Cart";
import { CartRse } from "@/interfaces/Cartinterface";
import { getServerSession } from "next-auth";
import React from "react";

export const metadata: Metadata = {
  title: "Your Cart",
  // index: false = الصفحة دي خاصة بالمستخدم، فمش عايزين جوجل يعرضها في البحث
  robots: { index: false, follow: false },
};

export default async function Cartpage() {
  const session= await getServerSession(authoptions)
const response=await fetch("https://ecommerce.routemisr.com/api/v1/cart",{
  headers:{
    token:session?.token as string
  }
})
const data:CartRse=await response.json()

  return <div>
    <Cart cartData={data?.numOfCartItems == 0?null:data} />
  </div>;
}