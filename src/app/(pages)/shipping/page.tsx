import type { Metadata } from "next";
import ShippingPolicyPage from "@/components/ShippingPolicy/ShippingPolicy";
import React from "react";

export const metadata: Metadata = {
  title: "Shipping Policy",
  description: "Delivery times, shipping costs and areas we deliver to.",
  alternates: { canonical: "/shipping" },
};


export default function page() {
    return <div>
<ShippingPolicyPage/>

    </div>;
}
