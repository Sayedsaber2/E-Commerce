import type { Metadata } from "next";

import { ForgotForm } from "@/components/ForgotForm/ForgotForm";
import React from "react";

export const metadata: Metadata = {
  title: "Forgot Password",
  // index: false = الصفحة دي خاصة بالمستخدم، فمش عايزين جوجل يعرضها في البحث
  robots: { index: false, follow: false },
};


export default function ForgotPassword() {
  return <div className="h-screen pt-18  text-white  w-full flex items-center justify-center">
    <ForgotForm />
    
  </div>;
}
