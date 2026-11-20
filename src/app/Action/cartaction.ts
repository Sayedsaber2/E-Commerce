"use server"

import { authoptions } from "@/auth"
import { ShippingAddress } from "@/interfaces/Cartinterface"
import { getServerSession } from "next-auth"

// GetCartCountAction: عدد المنتجات في الكارت عشان الرقم اللي على أيقونة الكارت في الناف بار
// الناف بار بيناديها من المتصفح، فالصفحات نفسها مش محتاجة تقرا الـ session
export async function GetCartCountAction(): Promise<number> {
    const session = await getServerSession(authoptions)
    if (!session) return 0
    const response = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: { token: session.token as string },
        cache: "no-store",
    })
    if (!response.ok) return 0
    const data = await response.json()
    return data.numOfCartItems ?? 0
}

export async function UpDateCartAction(ProductId:string,count:number) {
    const session=await getServerSession(authoptions)
    const response=await fetch("https://ecommerce.routemisr.com/api/v1/cart/"+ProductId,{
        method:"PUT",
        headers:{
            token:session?.token as string,
            "Content-Type": "application/json",
        },
        body:JSON.stringify({count})
    })
    const data=await  response.json()
    return data
}
export async function DeleteCartAction(ProductId:string) {
    const session=await getServerSession(authoptions)
    const response=await fetch("https://ecommerce.routemisr.com/api/v1/cart/"+ProductId,{
        method:"DELETE",
        headers:{
            token:session?.token as string
        }
    })
    const data=await  response.json()
    return data
}
export async function ClearCartAction() {
    const session=await getServerSession(authoptions)
    const response=await fetch("https://ecommerce.routemisr.com/api/v1/cart/",{
        method:"DELETE",
        headers:{
            token:session?.token as string
        }
    })
    const data=await  response.json()
    return data
}

export async function CheckoutOnlineActoion(cartID: string, shippingAddress: ShippingAddress) {
    const session = await getServerSession(authoptions)
    const baseUrl = process.env.NEXTAUTH_URL
    
        try {
            const response = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartID}?url=${baseUrl}`, {
                method: "POST",
                body: JSON.stringify({ shippingAddress }),
                headers: {
                    token: session?.token as string,
                    "Content-Type": "application/json"
                }

            })
            const data= await response.json()
            return data;

        } catch (err) {
            return err
        
    } 
}
export async function CheckoutCashActoion(cartID: string, shippingAddress: ShippingAddress) {
    const session = await getServerSession(authoptions)
    
    
        try {
            const response = await fetch(`https://ecommerce.routemisr.com/api/v2/orders/${cartID}`, {
                method: "POST",
                body: JSON.stringify({ shippingAddress }),
                headers: {
                    token: session?.token as string,
                    "Content-Type": "application/json"
                }

            })
            const data= await response.json()
            return data;

        } catch (err) {
            return err
        
    } 
}