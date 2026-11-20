import type { Metadata } from "next";
import ResetForm from "@/components/ResetForm/ResetForm";
import React, { Suspense } from "react";

export const metadata: Metadata = {
  title: "Reset Password",
  // index: false = الصفحة دي خاصة بالمستخدم، فمش عايزين جوجل يعرضها في البحث
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";
export default  function ResetPassword() {
  return <div className="h-screen pt-18  text-white  w-full flex items-center justify-center">
    <Suspense fallback={<div>Loading...</div>}></Suspense>
    <ResetForm/>
    </div>;
}
