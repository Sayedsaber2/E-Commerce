import { authoptions } from "@/auth";
import AllOrders from "@/components/Allorders/Alloeder";
import { CartRse } from "@/interfaces/Cartinterface";
import { getServerSession } from "next-auth";
import React from "react";

export default async function AllOrdersPage() {

  return <div>
    <AllOrders />
  </div>;
}
