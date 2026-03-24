import ResetForm from "@/components/ResetForm/ResetForm";
import React, { Suspense } from "react";
export const dynamic = "force-dynamic";
export default  function ResetPassword() {
  return <div className="h-screen pt-18  text-white  w-full flex items-center justify-center">
    <Suspense fallback={<div>Loading...</div>}></Suspense>
    <ResetForm/>
    </div>;
}
