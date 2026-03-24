"use client";
import React from "react";

export default function ShippingPolicyPage() {
  return (
    <div className=" text-blue-100 ">
      {/* Hero Section */}
      <section className="container mx-auto px-6 pt-20 pb-10 text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Shipping Policy</h1>
        <p className="max-w-2xl mx-auto text-lg text-blue-200">
          Learn about our shipping methods, delivery times, and policies.
        </p>
      </section>

      {/* Content Section */}
      <section className="container mx-auto px-6 pb-10 max-w-3xl">
        <div className="bg-white/5 backdrop-blur-md p-10 rounded-2xl border border-white/10 shadow-lg space-y-6 text-blue-200">
          <h2 className="text-2xl font-bold text-white">Shipping Methods</h2>
          <p>
            We offer standard and express shipping options. You can select your preferred shipping method during checkout.
          </p>

          <h2 className="text-2xl font-bold text-white">Delivery Times</h2>
          <p>
            Standard shipping usually takes 3-5 business days, while express shipping takes 1-2 business days. Delivery times may vary based on your location.
          </p>

          <h2 className="text-2xl font-bold text-white">Shipping Costs</h2>
          <p>
            Shipping costs are calculated at checkout based on the weight of your order and the destination.
          </p>

          <h2 className="text-2xl font-bold text-white">Order Processing</h2>
          <p>
            All orders are processed within 1-2 business days. You will receive a confirmation email once your order has been shipped.
          </p>

          <h2 className="text-2xl font-bold text-white">Tracking Your Order</h2>
          <p>
            Once your order is shipped, you will receive a tracking number via email. You can also track your order status in your account dashboard.
          </p>

          <h2 className="text-2xl font-bold text-white">Need Help?</h2>
          <p>
            If you have any questions about shipping, please contact our support team at{" "}
            <a href="mailto:support@shopmart.com" className="text-blue-400 hover:text-white transition">
              support@shopmart.com
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}