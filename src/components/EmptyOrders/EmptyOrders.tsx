import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

export default function EmptyOrders() {
  return <div className="container mx-auto max-w-6xl pt-24 px-4 text-white">
 <div className="flex flex-col items-center justify-center text-center gap-6">

        {/* Icon */}
        
        {/* Title */}
        <h2 className="text-3xl font-bold ">
          No Orders Yet
        </h2>


        {/* Description */}
        <p className="text-gray-400 max-w-md">
          {"It looks like you haven't made any orders yet. Start shopping to fill your cart and place your first order!"}
        </p>

        {/* Button */}
        <Link href="/product">
        <Button className="bg-blue-600 h-12 hover:bg-blue-500 px-8 py-4 rounded-lg font-semibold transition shadow-lg hover:shadow-blue-500/30">
          Browse Products
        </Button>
      </Link>

      </div>
  </div>;
}
