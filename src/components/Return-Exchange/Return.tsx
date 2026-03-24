"use client";
import Link from "next/link";
import React from "react";

export default function ReturnsPage() {
  return (
    <div className="min-h-screen text-blue-100">

      {/* Hero */}
      <section className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl font-bold text-white mb-4">{"Returns & Exchanges"}</h1>
        <p className="max-w-2xl mx-auto text-lg text-blue-200">
          Return Policy
        </p>
      </section>

      {/* Content Section */}
      <section className="container mx-auto px-6 pb-20">
        <div className="max-w-3xl mx-auto bg-white/5 backdrop-blur-md p-10 rounded-2xl border border-white/10 shadow-lg space-y-6">

          {/* Return Policy Text */}
          <div className="space-y-4">
            <p className="text-blue-200">
             {" We want you to be completely satisfied with your purchase. If you're not happy with your order, we'll make it right."}
            </p>
            <h3 className="text-xl font-semibold text-white">30-Day Return Window</h3>
            <p className="text-blue-200">
              You have 30 days from the delivery date to return or exchange your items.
            </p>
            <h3 className="text-xl font-semibold text-white">Return Conditions</h3>
            <ul className="list-disc list-inside text-blue-200 space-y-1">
              <li>Items must be in original condition with all tags attached</li>
              <li>{"Items must be unworn, unwashed, and unused"}</li>
              <li>Original packaging should be included when possible</li>
              <li>Some items may be excluded from returns (see product page for details)</li>
            </ul>
          </div>

          {/* How to Return */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">How to Return</h3>
            <ol className="list-decimal list-inside text-blue-200 space-y-2">
              <li>
                <strong>Contact Us:</strong> Email us at <Link href="mailto:returns@shopmart.com" className="text-blue-400 hover:text-white transition">returns@shopmart.com</Link> with your order number
              </li>
              <li>
                <strong>Get Return Label:</strong> {"We'll send you a prepaid return shipping label"}
              </li>
              <li>
                <strong>Ship Your Return:</strong> Package your items and drop off at any authorized location
              </li>
              <li>
                <strong>Receive Refund:</strong> {"We'll process your refund within 5-7 business days"}
              </li>
            </ol>
          </div>

          {/* Questions / Contact */}
          <div className="text-center mt-6">
            <p className="text-blue-300 mb-2">Questions?</p>
            <p className="text-blue-200 mb-2">
              {"If you have any questions about returns or exchanges, please don't hesitate to contact us."}
            </p>
            <Link
              href="/contact"
              className="text-blue-400 hover:text-white font-semibold transition"
            >
              Contact Support
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
}