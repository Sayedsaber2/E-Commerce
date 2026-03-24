"use client";
import React, { useState } from "react";

const faqs = [
  {
    question: "How do I place an order?",
    answecdr: "Simply browse our products, add items to your cart, and proceed to checkout. You'll need to create an account or sign in to complete your purchase."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, PayPal, and other secure payment methods."
  },
  {
    question: "How long does shipping take?",
    answer: "Standard shipping takes 3-5 business days. Express shipping options are available for faster delivery."
  },
  {
    question: "Can I return or exchange items?",
    answer: "Yes, we offer a 30-day return policy for most items. Items must be in original condition with tags attached."
  },
  {
    question: "How do I track my order?",
    answer: "Once your order ships, you'll receive a tracking number via email. You can also track your order in your account."
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen text-blue-100">
      {/* Hero */}
      <section className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Help Center</h1>
        <p className="max-w-2xl mx-auto text-lg text-blue-200">
          Frequently Asked Questions
        </p>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-6 pb-20">
        <div className="max-w-3xl mx-auto bg-white/5 backdrop-blur-md p-10 rounded-2xl border border-white/10 shadow-lg">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-white/20 last:border-b-0 py-4">
              <button
                onClick={() => toggle(index)}
                className="w-full text-left flex justify-between items-center text-white font-semibold text-lg focus:outline-none"
              >
                <span>{faq.question}</span>
                <span className="text-blue-300">{openIndex === index ? "−" : "+"}</span>
              </button>
              {openIndex === index && (
                <p className="mt-2 text-blue-200 text-sm">{faq.answer}</p>
              )}
            </div>
          ))}

          {/* Still Need Help */}
          <div className="mt-8 text-center">
            <p className="text-blue-300 mb-2">Still Need Help?</p>
            <a
              href="/contact"
              className="text-blue-400 hover:text-white font-semibold transition"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}