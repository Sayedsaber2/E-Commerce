"use client"
import { Package, MapPin, Star } from "lucide-react";

export default function OrdersSkeleton() {
  return (
    <div className="container mx-auto max-w-6xl pt-24 px-4 text-white animate-pulse">
      
      {/* Header */}
      <div className="flex items-center justify-center gap-3 mb-10">
        <Package size={32} className="text-blue-400" />
        <div className="h-8 w-40 bg-blue-600 rounded"></div>
      </div>

      {/* Skeleton Orders */}
      <div className="flex flex-col gap-8">
        {[1,2,3].map((i) => (
          <div
            key={i}
            className="bg-blue-950/40 border border-blue-900 rounded-xl p-6 space-y-6"
          >
            {/* Order Info */}
            <div className="grid md:grid-cols-5 gap-4">
              {[...Array(5)].map((_, idx) => (
                <div key={idx} className="flex flex-col gap-2">
                  <div className="h-4 w-20 bg-blue-600 rounded"></div>
                  <div className="h-4 w-14 bg-blue-500 rounded"></div>
                </div>
              ))}
            </div>

            {/* Shipping Address */}
            <div className="flex items-center gap-2 text-sm text-gray-300 border-t border-blue-900 pt-4">
              <MapPin size={16} className="text-blue-400" />
              <div className="h-4 w-60 bg-blue-600 rounded"></div>
            </div>

            {/* Products */}
            <div className="flex flex-col gap-4">
              {[1,2].map((j) => (
                <div
                  key={j}
                  className="flex items-center gap-4 bg-blue-900/30 rounded-lg p-4"
                >
                  <div className="w-16 h-16 bg-blue-600 rounded-md"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-32 bg-blue-500 rounded"></div>
                    <div className="h-3 w-20 bg-blue-500 rounded"></div>
                    <div className="flex items-center gap-2">
                      <Star size={14} className="text-yellow-400 fill-yellow-400" />
                      <div className="h-3 w-8 bg-blue-500 rounded"></div>
                    </div>
                    <div className="h-3 w-12 bg-blue-500 rounded"></div>
                  </div>
                  <div className="h-4 w-14 bg-blue-500 rounded"></div>
                </div>
              ))}
            </div>

          </div>
        ))}
      </div>
    </div>
  )
}