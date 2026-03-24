"use client"
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/Helpers/formatCurrency";
import { CartRse } from "@/interfaces/Cartinterface";
import { useState } from "react";
import { ClearCartAction, DeleteCartAction, UpDateCartAction } from "@/app/Action/cartaction";
import { Loader2, ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";
import Checkout from "../Checkout/Checkout";

export default function Cart({ cartData }: { cartData: CartRse | null }) {
    const [cart, setCart] = useState<CartRse | null>(cartData || null);

    const [loading, setLoading] = useState<{
        id: string | null
        type: "delete" | "update" | "clear" | null
    }>({ id: null, type: null });
    async function DeleteCart(productId: string) {
        setLoading({ id: productId, type: "delete" })
        const response: CartRse = await DeleteCartAction(productId)
        if (response.status == "success") {

            if (response.numOfCartItems === 0) {
                setCart(null)
            } else {
                setCart(response)
                toast.success("product removed from cart")
                window.dispatchEvent(
                    new CustomEvent("cartupdate", { detail: response.numOfCartItems })
                )
            }
        }
        setLoading({ id: null, type: null })
    }


    async function UpDateCart(productId: string, count: number) {
        setLoading({ id: productId, type: "update" })
        const response: CartRse = await UpDateCartAction(productId, count)
        if (response.status == "success") {
            toast.success("product count updated")
            setCart(response)
        }
        setLoading({ id: null, type: null })
    }



    async function ClearCart() {
        setLoading({ id: null, type: "clear" })
        const response: CartRse = await ClearCartAction()
        if (response.message == "success") {
            setCart(null)
            toast.success("cart cleared")
            window.dispatchEvent(
                new CustomEvent("cartupdate", { detail: 0 })
            )
        }
        setLoading({ id: null, type: null })
    }


    return <>
        {cart ?
            <div className="container mx-auto max-w-6xl pt-24 px-4 text-white">
                {/* Title */}
                <div className="mb-10 text-center">
                    <div className="flex items-center justify-center gap-2 mb-3">
                        <ShoppingCart
                            className="text-blue-400  "
                            size={32}
                        />
                        <h1 className="text-3xl  font-bold tracking-tight">
                            My Cart
                        </h1>
                    </div>

                    <p className="text-gray-300">
                        {cart.numOfCartItems} items in your cart
                    </p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-5">
                        {cart.data.products.map((item) => <div key={item._id} className="flex gap-5  relative rounded-2xl border border-white/10 bg-white/5  backdrop-blur-lg p-6 shadow-lg">
                            {loading.id == item.product.id && loading.type === "delete" && <div className="rounded-2xl overflow-hidden absolute inset-0 bg-white/30 flex justify-center items-center">
                                <Loader2 className="  animate-spin" />
                            </div>}

                            <div className="relative w-24 h-24 overflow-hidden">
                                <Image
                                    src={item.product.imageCover}
                                    alt={item.product.title}
                                    fill
                                    
                                    sizes="96px"
                                    className="object-cover rounded-xl"
                                    style={{ width: "100%", height: "100%" }}
                                />
                            </div>
                            <div className="flex flex-1 flex-col justify-between">
                                <div className="flex justify-between gap-4">
                                    <div>
                                        <h3 className="font-semibold text-lg leading-snug">
                                            {item.product.title}
                                        </h3>
                                        <p className="text-sm text-gray-400">
                                            {item.product.brand.name}   · {item.product.category.name}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold text-lg ">
                                            {formatCurrency(item.price)}
                                        </p>
                                        <span className="text-xs text-gray-400">
                                            each
                                        </span>
                                    </div>
                                </div>
                                {/* Quantity */}
                                <div className="flex items-center justify-between mt-4">
                                    <div className="flex items-center border border-white/20 rounded-lg overflow-hidden">
                                        <button disabled={item.count == 1} onClick={() => UpDateCart(item.product._id, item.count - 1)} className="px-3 py-1 cursor-pointer hover:bg-white/10 transition">
                                            -
                                        </button>
                                        <span className="px-4 font-medium">
                                            {loading.id === item.product._id && loading.type === "update" ? (
                                                <Loader2 className="animate-spin" size={16} />
                                            ) : (
                                                item.count
                                            )}
                                        </span>
                                        <button disabled={item.count == item.product.quantity} onClick={() => UpDateCart(item.product._id, item.count + 1)} className="px-3 py-1 cursor-pointer hover:bg-white/10 transition">
                                            +
                                        </button>
                                    </div>
                                    <button onClick={() => DeleteCart(item.product.id)} className="text-red-500 cursor-pointer text-sm hover:underline">
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>)}
                    </div>
                    {/* Order Summary */}
                    <div className="lg:sticky lg:top-24 h-fit">
                        <div className="rounded-2xl border border-white/10 bg-white/5  backdrop-blur-lg p-6 shadow-lg">
                            <h2 className="text-xl font-semibold mb-5">
                                Order Summary
                            </h2>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-400">
                                        Subtotal ({cart.numOfCartItems} item)
                                    </span>
                                    <span className="font-semibold ">
                                        {formatCurrency(cart.data.totalCartPrice)}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">
                                        Shipping
                                    </span>
                                    <span className="text-green-400 font-medium">
                                        Free
                                    </span>
                                </div>
                            </div>
                            <div className="border-t border-white/10 my-5"></div>
                            <div className="flex justify-between text-lg font-bold">
                                <span>Total</span>
                                <span className="">
                                    {formatCurrency(cart.data.totalCartPrice)}
                                </span>
                            </div>
                            {/* Checkout */}
                            <Checkout cartID={cart.cartId} />

                            {/* Continue Shopping */}
                            <Link href="/product">
                                <Button
                                    className="w-full bg-white text-blue-600 hover:bg-blue-500 hover:text-white mt-3"
                                >
                                    Continue Shopping
                                </Button>
                            </Link>
                        </div>
                        {/* Clear Cart */}
                        <div className="flex justify-end mt-4">
                            <Button
                                variant="destructive"
                                onClick={() => ClearCart()}
                            >
                                {loading.id == null && loading.type == "clear" && <Loader2 className=" animate-spin" />}
                                Clear Cart
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            :
            <div className="flex flex-col items-center justify-center text-center py-32 text-white">
                <h2 className="text-3xl font-bold mb-2">
                    Your cart is empty
                </h2>
                <p className="text-gray-300 mb-8 max-w-md">
                    {"Looks like you haven't added anything to your cart yet. Start exploring our products and find something you love."}
                </p>
                <Link href="/product">
                    <Button
                        className="bg-blue-600 h-12 hover:bg-blue-500 px-8 py-4 rounded-lg font-semibold transition shadow-lg hover:shadow-blue-500/30"
                    >
                        Start Shopping
                    </Button>
                </Link>
            </div>
        }
    </>
        ;
}



