"use client";
import React from "react";

export default function Trackform() {
  return <div>
    <form className="space-y-5">
      <div>
        <label className="block text-sm text-blue-300 mb-1" htmlFor="orderNumber">
          Order Number
        </label>
        <input
          type="text"
          id="orderNumber"
          placeholder="Enter your order number"
          className="w-full p-3 rounded bg-transparent border border-white/20 focus:outline-none focus:border-blue-400"
        />
      </div>

      <div>
        <label className="block text-sm text-blue-300 mb-1" htmlFor="email">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email address"
          className="w-full p-3 rounded bg-transparent border border-white/20 focus:outline-none focus:border-blue-400"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-500 transition py-3 rounded-lg font-semibold text-white"
      >
        Track Order
      </button>
    </form></div>;
}
