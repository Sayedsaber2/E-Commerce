"use client"

import React, { useRef, useState } from "react"
import { Button } from "../ui/button"

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { ShippingAddress } from "@/interfaces/Cartinterface"
import { Loader2 } from "lucide-react"
import { CheckoutCashActoion, CheckoutOnlineActoion } from "@/app/Action/cartaction"
import { useRouter } from "next/navigation"

export default function Checkout({ cartID }: { cartID: string }) {
    const router = useRouter()

    const [loadaing, setloadaing] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<"online" | "cash">("online")

    const city = useRef<HTMLInputElement | null>(null)
    const details = useRef<HTMLInputElement | null>(null)
    const phone = useRef<HTMLInputElement | null>(null)

    async function Checkout(e: React.FormEvent) {
        e.preventDefault();
        setloadaing(true);
        const shippingAddress: ShippingAddress = {
            city: city.current?.value || "",
            details: details.current?.value || "",
            phone: phone.current?.value || ""
        }
        let response;
        if (paymentMethod === "online") {
            response = await CheckoutOnlineActoion(cartID, shippingAddress)
            if (response.status === "success") {
                window.location.href = response.session.url
            }
        } else {
            response = await CheckoutCashActoion(cartID, shippingAddress)
            if (response.status === "success") {
                window.dispatchEvent(
                    new CustomEvent("cartupdate", { detail: 0 })
                )
                alert("Order placed successfully! Pay cash on delivery.")
                router.push("/allorders")
            }
        }
        setloadaing(false);
    }
    return (
        <div>



            <Dialog>
                <DialogTrigger asChild>
                    <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-lg">
                        Proceed to Checkout
                    </Button>
                </DialogTrigger>
                <form >
                    <DialogContent className="sm:max-w-md bg-white/5 backdrop-blur-xl border border-white/10 text-white rounded-2xl shadow-2xl">
                        <DialogHeader className="space-y-2">
                            <DialogTitle className="text-2xl font-bold text-white">
                                Shipping Address
                            </DialogTitle>
                            <DialogDescription className="text-blue-200">
                                Enter your shipping details to complete your order.
                            </DialogDescription>
                        </DialogHeader>
                        <FieldGroup className="space-y-5 mt-4">
                            <Field className="space-y-2">
                                <Label htmlFor="city" className="text-blue-200">
                                    City
                                </Label>
                                <Input
                                    ref={city}
                                    required
                                    id="city"
                                    name="city"
                                    placeholder="Enter your city"
                                    className="bg-white/10 border-white/20 text-white placeholder:text-blue-200 focus:border-blue-400"
                                />
                            </Field>
                            <Field className="space-y-2">
                                <Label htmlFor="details" className="text-blue-200">
                                    Address Details
                                </Label>
                                <Input
                                    ref={details}
                                    required
                                    id="details"
                                    name="details"
                                    placeholder="Street / Building / Apartment"
                                    className="bg-white/10 border-white/20 text-white placeholder:text-blue-200 focus:border-blue-400"
                                />
                            </Field>
                            <Field className="space-y-2">
                                <Label htmlFor="phone" className="text-blue-200">
                                    Phone Number
                                </Label>
                                <Input
                                    ref={phone}
                                    required
                                    id="phone"
                                    name="phone"
                                    placeholder="010xxxxxxxx"
                                    className="bg-white/10 border-white/20 text-white placeholder:text-blue-200 focus:border-blue-400"
                                />
                            </Field>
                        </FieldGroup>
                        <div className="flex gap-4 mt-4">
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="payment"
                                    value="online"
                                    checked={paymentMethod === "online"}
                                    onChange={() => setPaymentMethod("online")}
                                />
                                Online Payment
                            </label>

                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="payment"
                                    value="cash"
                                    checked={paymentMethod === "cash"}
                                    onChange={() => setPaymentMethod("cash")}
                                />
                                Cash on Delivery
                            </label>
                        </div>
                        <DialogFooter className="flex gap-3 mt-6">
                            <DialogClose asChild>
                                <Button
                                    variant="outline"
                                    className="border-white/30 text-slate-200 bg-white/5 hover:bg-white/10 backdrop-blur"
                                >
                                    Cancel
                                </Button>
                            </DialogClose>
                            <Button
                                disabled={loadaing}
                                onClick={(e) => Checkout(e)}
                                className="bg-blue-600 hover:bg-blue-500 text-white font-semibold"
                                type="submit"
                            >
                                {loadaing && <Loader2 className=" animate-spin" />}
                                Confirm Order
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </form>
            </Dialog>
        </div>
    )
}
