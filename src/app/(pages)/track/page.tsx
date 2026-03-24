
import Trackform from "@/components/Trackform/Trackform";
import Link from "next/link";

export default function TrackOrderPage() {
  return (
    <div className="min-h-screen text-blue-100">

      {/* Hero */}
      <section className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl font-bold text-white mb-4">
          Track Your Order
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-blue-200">
          Enter your order information below to see the status of your purchase.
        </p>
      </section>

      {/* Form Section */}
      <section className="container mx-auto px-6 pb-20">
        <div className="max-w-2xl mx-auto bg-white/5 backdrop-blur-md p-10 rounded-2xl border border-white/10 shadow-lg">
          
          <h2 className="text-2xl font-semibold text-white mb-6 text-center">
            Enter Your Order Information
          </h2>

          <Trackform />

          {/* Status Message */}
          <div className="mt-8 text-center text-blue-200">
            <h3 className="text-lg font-semibold mb-2">Order Status</h3>
            <p>Enter your order number and email above to track your order status.</p>
          </div>

          {/* Help Section */}
          <div className="mt-6 text-center">
            
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