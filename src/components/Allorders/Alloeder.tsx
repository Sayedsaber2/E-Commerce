"use client"
import { formatCurrency } from "@/Helpers/formatCurrency";
import { OrderRes } from "@/interfaces/interfaceroder";
import { CalendarDays, CreditCard, MapPin, Package, Star, Truck } from "lucide-react";
import Image from "next/image";

import { useEffect, useState } from "react"
import EmptyOrders from "../EmptyOrders/EmptyOrders";
import OrdersSkeleton from "../loadingorders/loadingorders";

export default function AllOrders() {
  const [orders, setOrders] = useState<OrderRes[] | []>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchOrders = async () => {
      
    

    // fallback لو الكارت فاضي
    const owner = localStorage.getItem("cartOwner") || "";
    if (!owner) {
    }
      
      if (!owner) {
        setOrders([]);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/user/${owner}`);
        const data: OrderRes[] = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);


  if (loading) {
    return <OrdersSkeleton />;
  }

  if (!loading &&!orders.length) {
    return <EmptyOrders />
  }
  return (
    <div className="container mx-auto max-w-6xl pt-24 px-4 text-white">
      <div className="flex items-center justify-center gap-3 mb-10">
        <Package size={32} className="text-blue-400" />
        <h1 className="text-3xl font-bold tracking-tight">
          My Orders
        </h1>
      </div>

      <div className="flex flex-col gap-8">

        {orders.slice().sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .map((order) => (
            <div
              key={order._id}
              className="bg-blue-950/40 border border-blue-900 rounded-xl p-6 space-y-6 hover:border-blue-600 transition"
            >

              {/* Order Info */}
              <div className="grid md:grid-cols-5 gap-4">

                <div className="flex items-center gap-2">
                  <Package size={16} className="text-blue-400" />
                  <div>
                    <p className="text-xs text-gray-400">Order ID</p>
                    <p className="text-sm font-semibold">{order._id}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <CalendarDays size={16} className="text-blue-400" />
                  <div>
                    <p className="text-xs text-gray-400">Date</p>
                    <p className="text-sm">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <CreditCard size={16} className="text-blue-400" />
                  <div>
                    <p className="text-xs text-gray-400">Payment</p>
                    <p className="text-sm">{order.paymentMethodType}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Truck size={16} className="text-blue-400" />
                  <div>
                    <p className="text-xs text-gray-400">Delivery</p>

                    <span
                      className={`text-xs px-2 py-1 rounded-full ${order.isDelivered
                        ? "bg-green-500/20 text-green-400"
                        : "bg-yellow-500/20 text-yellow-400"
                        }`}
                    >
                      {order.isDelivered ? "Delivered" : "Pending"}
                    </span>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-gray-400">Total</p>
                  <p className="text-blue-400 font-semibold">
                    {formatCurrency(order.totalOrderPrice)}
                  </p>
                </div>
              </div>

              {/* Shipping */}
              {order.shippingAddress && (
                <div className="flex items-center gap-2 text-sm text-gray-300 border-t border-blue-900 pt-4">
                  <MapPin size={16} className="text-blue-400" />

                  <span>
                    {order.shippingAddress.details} - {order.shippingAddress.city}
                  </span>
                </div>
              )}

              {/* Products */}
              <div className="flex flex-col gap-4">

                {order.cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center gap-4 bg-blue-900/30 rounded-lg p-4 hover:bg-blue-900/50 transition"
                  >
                    <div className="w-17.5 h-17.5 relative">
                      <Image
                        src={item.product.imageCover}
                        alt={item.product.title}
                        fill
                        sizes="70px"
                        className="rounded-md object-cover"
                      />
                    </div>

                    <div className="flex-1 space-y-1">

                      <p className="font-semibold line-clamp-1">
                        {item.product.title}
                      </p>

                      <p className="text-xs text-gray-400">
                        Brand: {item.product.brand.name}
                      </p>

                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <Star size={14} className="text-yellow-400 fill-yellow-400" />
                        {item.product.ratingsAverage} (
                        {item.product.ratingsQuantity})
                      </div>

                      <p className="text-xs text-gray-400">
                        Qty: {item.count}
                      </p>
                    </div>

                    <p className="text-blue-400 font-semibold">
                      {formatCurrency(item.price * item.count)}
                    </p>
                  </div>
                ))}

              </div>

            </div>
          ))}

      </div>
    </div>
  )
}