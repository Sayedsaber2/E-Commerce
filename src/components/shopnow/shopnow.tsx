"use client";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

export default function ShopNow() {
    return <div className="flex flex-col sm:flex-row gap-4 items-center justify-center ">
        <Link href="/product" className="hover:scale-105 transition-transform duration-300" >
            <Button className=" min-w-35 bg-blue-500 hover:bg-blue-600 text-white py-6 px-8 rounded-md ">Start Shopping</Button>
        </Link>
        <Link href="/categories" className="hover:scale-105 transition-transform duration-300" >
            <Button className=" min-w-35 bg-white text-black hover:bg-gray-100 py-6 px-8 rounded-md ">Browse Categories</Button>
        </Link>

    </div>;
}
