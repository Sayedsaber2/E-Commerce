import type { Metadata } from "next";

import AllOrders from "@/components/Allorders/Alloeder";

import React from "react";

export const metadata: Metadata = {
  title: "Your Orders",
  // index: false = الصفحة دي خاصة بالمستخدم، فمش عايزين جوجل يعرضها في البحث
  robots: { index: false, follow: false },
};


export default async function AllOrdersPage() {

  return <div>
    <AllOrders />
  </div>;
}
