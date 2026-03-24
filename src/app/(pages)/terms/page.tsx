import React from "react";

export default function TermsPage() {
  return (
    <div className="min-h-screen text-blue-100">

      {/* Hero */}
      <section className="container mx-auto px-6 pt-20 pb-10 text-center">
        <h1 className="text-4xl font-bold text-white ">
          Terms of Service
        </h1>
        
      </section>

      {/* Content */}
      <section className="container mx-auto px-6 pb-10">
        <div className="max-w-3xl mx-auto bg-white/5 backdrop-blur-md p-10 rounded-2xl border border-white/10 shadow-lg space-y-6">

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">
              Acceptance of Terms
            </h2>
            <p className="text-blue-200">
              By accessing and using ShopMart, you accept and agree to be bound
              by the terms and provision of this agreement.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">
              Use License
            </h2>
            <p className="text-blue-200">
              Permission is granted to temporarily download one copy of the
              materials on ShopMart for personal, non-commercial transitory
              viewing only.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">
              Product Information
            </h2>
            <p className="text-blue-200">
              We strive to provide accurate product information, but we do not
              warrant that product descriptions or other content is accurate,
              complete, reliable, or error-free.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">
              Pricing and Payment
            </h2>
            <p className="text-blue-200">
              All prices are subject to change without notice. Payment is due
              at the time of purchase.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">
              Returns and Refunds
            </h2>
            <p className="text-blue-200">
              Returns are accepted within 30 days of purchase. Items must be in
              original condition with all tags attached.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">
              Contact Information
            </h2>
            <p className="text-blue-200 mb-2">
              If you have any questions about these Terms of Service, please
              contact us at:
            </p>
            <a
              href="mailto:legal@shopmart.com"
              className="text-blue-400 hover:text-white transition font-semibold"
            >
              legal@shopmart.com
            </a>
          </div>

        </div>
      </section>
    </div>
  );
}