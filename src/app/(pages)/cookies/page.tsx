import React from "react";

export default function CookiesPage() {
  return (
    <div className="min-h-screen text-blue-100">

      {/* Hero */}
      <section className="container mx-auto px-6 pt-20 pb-10 text-center">
        <h1 className="text-4xl font-bold text-white ">
          Cookies Policy
        </h1>
        
      </section>

      {/* Content */}
      <section className="container mx-auto px-6 pb-20">
        <div className="max-w-3xl mx-auto bg-white/5 backdrop-blur-md p-10 rounded-2xl border border-white/10 shadow-lg space-y-6">

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">
              What Are Cookies?
            </h2>
            <p className="text-blue-200">
              Cookies are small text files that are stored on your device when
              you visit a website. They help us improve your browsing
              experience and provide personalized services.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">
              How We Use Cookies
            </h2>
            <p className="text-blue-200">
              We use cookies to enhance site functionality, remember your
              preferences, analyze traffic, and improve our services.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">
              Types of Cookies We Use
            </h2>
            <ul className="list-disc list-inside text-blue-200 space-y-2">
              <li>
                <strong>Essential Cookies:</strong> Required for the website to function properly.
              </li>
              <li>
                <strong>Performance Cookies:</strong> Help us understand how visitors interact with our site.
              </li>
              <li>
                <strong>Functional Cookies:</strong> Remember your preferences and settings.
              </li>
              <li>
                <strong>Marketing Cookies:</strong> Used to deliver relevant advertisements.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">
              Managing Cookies
            </h2>
            <p className="text-blue-200">
              You can control and manage cookies through your browser settings.
              Please note that disabling certain cookies may affect the
              functionality of our website.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">
              Changes to This Policy
            </h2>
            <p className="text-blue-200">
              We may update this Cookies Policy from time to time. Any changes
              will be posted on this page .
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">
              Contact Us
            </h2>
            <p className="text-blue-200 mb-2">
              If you have any questions about our use of cookies, please contact us at:
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