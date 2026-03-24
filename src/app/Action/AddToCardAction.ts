"use server"

import { authoptions } from "@/auth";
import { CartRse } from "@/interfaces/Cartinterface";
import { getServerSession } from "next-auth";


export async function addToCardActoion(productId: string) {
    const session = await getServerSession(authoptions)
    if (!session) return null

    try {
        const response = await fetch('https://ecommerce.routemisr.com/api/v1/cart', {
            method: "POST",
            body: JSON.stringify({ productId }),
            headers: {
                token: session.token,
                "Content-Type": "application/json"
            }

        })
        const data: CartRse = await response.json()
        return data;

    } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        return { error: message }

    }
}