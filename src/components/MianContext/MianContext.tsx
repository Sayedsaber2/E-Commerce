"use client"
import React from "react";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";

// MianContext: الحاجات اللي محتاجة المتصفح بس، زي الـ session والتوست
// الفوتر بقى برّه الملف ده، فبقى بيترسم على السيرفر ومش بيتبعت JavaScript زيادة
export default function MianContext({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <Toaster position="top-center" reverseOrder={false} />
      {children}
    </SessionProvider>
  );
}
