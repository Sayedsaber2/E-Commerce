import React from "react";


export default function PrivacyPage() {
  return (
    <div className="min-h-screen text-blue-100">

      {/* Hero */}
      <section className="container mx-auto px-6 pt-20 pb-10 text-center">
        <h1 className="text-4xl font-bold text-white ">
          Privacy Policy
        </h1>
        
      </section>

      {/* Content */}
      <section className="container mx-auto px-6 pb-10">
        <div className="max-w-3xl mx-auto bg-white/5 backdrop-blur-md p-10 rounded-2xl border border-white/10 shadow-lg space-y-6">

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">
              Information We Collect
            </h2>
            <p className="text-blue-200">
              {"We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support."}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">
              How We Use Your Information
            </h2>
            <p className="text-blue-200">
              {"We use the information we collect to provide, maintain, and improve our services, process transactions, and communicate with you."}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">
              Information Sharing
            </h2>
            <p className="text-blue-200">
              {"We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy."}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">
              Data Security
            </h2>
            <p className="text-blue-200">
              {"We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction."}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">
              Contact Us
            </h2>
            <p className="text-blue-200 mb-2">
              {"If you have any questions about this Privacy Policy, please contact us at:"}
            </p>
            <a
              href="mailto:privacy@shopmart.com"
              className="text-blue-400 hover:text-white transition font-semibold"
            >
              privacy@shopmart.com
            </a>
          </div>

        </div>
      </section>
    </div>
  );
}