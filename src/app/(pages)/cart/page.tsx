import { authoptions } from "@/auth";
import Cart from "@/components/Cart/Cart";
import { CartRse } from "@/interfaces/Cartinterface";
import { getServerSession } from "next-auth";
import React from "react";
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