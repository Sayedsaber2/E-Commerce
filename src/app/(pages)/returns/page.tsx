import type { Metadata } from "next";
import ReturnsPage from "@/components/Return-Exchange/Return";

export const metadata: Metadata = {
  title: "Returns and Exchanges",
  description: "How to return or exchange a product you bought from ShopHub.",
  alternates: { canonical: "/returns" },
};


export default function Returns() {
  return (
    <div className="container mx-auto px-6 py-16 text-blue-200">
     <ReturnsPage />
    </div>
  );
}