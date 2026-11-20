import type { Metadata } from "next";
import SignUpForm from "@/components/SignUpForm/signupform";
import React from "react";

export const metadata: Metadata = {
  title: "Create Account",
  // index: false = الصفحة دي خاصة بالمستخدم، فمش عايزين جوجل يعرضها في البحث
  robots: { index: false, follow: false },
};


export default function signUp() {
 return <div className=" pb-10 pt-20 text-white  w-full flex items-center justify-center bg-linear-to-br">
 
     <SignUpForm/>
   </div>;
}
