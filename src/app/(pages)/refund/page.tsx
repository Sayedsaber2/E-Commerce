import React from "react";

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen  text-blue-100 pt-20 pb-10">
      <div className="container mx-auto px-6 max-w-3xl">
        {/* Hero */}
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Refund Policy</h1>

        </section>

        {/* Content */}
        <section className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 shadow-lg space-y-6">
          <h2 className="text-2xl font-semibold text-white">Refund Eligibility</h2>
          <p className="text-blue-200">
            {" We want you to be completely satisfied with your purchase. If you're not happy with your order, we offer a refund under certain conditions."}
          </p>

          <h2 className="text-2xl font-semibold text-white">30-Day Refund Window</h2>
          <p className="text-blue-200">
            You have 30 days from the delivery date to request a refund.
          </p>

          <h2 className="text-2xl font-semibold text-white">Refund Conditions</h2>
          <ul className="list-disc list-inside text-blue-200 space-y-1">
            <li>Items must be in original condition with all tags attached</li>
            <li>{"Items must be unworn, unwashed, and unused"}</li>
            <li>Original packaging should be included when possible</li>
            <li>{"Some items may be excluded from refunds (see product page for details)"}</li>
          </ul>

          <h2 className="text-2xl font-semibold text-white">How to Request a Refund</h2>
          <ol className="list-decimal list-inside text-blue-200 space-y-1">
            <li>
              <strong>{'Contact Us:'}</strong> Email us at <a href="mailto:refunds@shopmart.com" className="text-blue-400 hover:text-white underline">refunds@shopmart.com</a> with your order number.
            </li>
            <li>
              <strong>{"Get Refund Instructions:"}</strong> {"We'll guide you on how to return your items."}
            </li>
            <li>
              <strong>{"Ship Your Items:"}</strong> Send your items back using the provided instructions.
            </li>
            <li>
              <strong>{"Receive Refund:"}</strong> {"We'll process your refund within 5-7 business days after receiving your items."}
            </li>
          </ol>

          <h2 className="text-2xl font-semibold text-white">Questions?</h2>
          <p className="text-blue-200">
            {"If you have any questions about refunds, please contact our support team at"} <a href="mailto:support@shopmart.com" className="text-blue-400 hover:text-white transition font-semibold">support@shopmart.com</a>
          </p>
        </section>
      </div>
    </div>
  );
}