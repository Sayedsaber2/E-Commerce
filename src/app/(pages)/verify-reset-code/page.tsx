import type { Metadata } from "next";

import React from "react";

import VerfiyCodeForm from "@/components/VerfiyCode/VerfiyCode";

export const metadata: Metadata = {
  title: "Verify Code",
  // index: false = الصفحة دي خاصة بالمستخدم، فمش عايزين جوجل يعرضها في البحث
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";
export default function VerifyResetCode() {
    return <div className="h-screen pt-18  text-white  w-full flex items-center justify-center">
        
        <VerfiyCodeForm />
    </div>;
}

