"use server"

import { authoptions } from "@/auth";
import { CartRse } from "@/interfaces/Cartinterface";
import { getServerSession } from "next-auth";

export async function AddWishListAction(productId: string): Promise<{ success: boolean; message: string } | { error: string } | null> {
    const session = await getServerSession(authoptions);
    if (!session) return null;

    try {
        const response = await fetch('https://ecommerce.routemisr.com/api/v1/wishlist', {
            method: "POST",
            body: JSON.stringify({ productId }),
            headers: {
                token: session.token,
                "Content-Type": "application/json"
            }
        });

        const data: CartRse = await response.json();

        if (!response.ok) {
            return { error: data.message || "Failed to add to wishlist" };
        }

        return {
            success: response.ok,
            message: data.message || "Done"
        };

    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Something went wrong";
        return { error: message };
    }
}