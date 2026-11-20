import type { Metadata } from "next";
import { LoginForm } from "@/components/LoginForm/LoginForm";
import React from "react";

export const metadata: Metadata = {
  title: "Login",
  // index: false = الصفحة دي خاصة بالمستخدم، فمش عايزين جوجل يعرضها في البحث
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";
export default function Login() {
  return <div className=" h-screen  w-full flex items-center justify-center bg-linear-to-br">

    <LoginForm />
  </div>;
}
