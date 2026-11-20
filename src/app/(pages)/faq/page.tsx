import type { Metadata } from "next";
import FAQPage from "@/components/FAQ/FAQ";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to common questions about orders, payment, shipping and returns at ShopHub.",
  alternates: { canonical: "/faq" },
};


export default function FAQ() {
  return (
    <div className="container mx-auto px-6 py-16 text-blue-200">
      <FAQPage />
    </div>
  );
}