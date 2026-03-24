"use server"

import { authoptions } from "@/auth"
import { getServerSession } from "next-auth"

export async function DeleteWishtListAction(ProductId:string) {
    const session=await getServerSession(authoptions)
    const response= await fetch("https://ecommerce.routemisr.com/api/v1/wishlist/"+ProductId,{
        method:"DELETE",
        headers:{
            token:session?.token as string
        }
    })
    const data= await response.json()
    return data
}