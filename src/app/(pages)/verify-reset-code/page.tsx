
import React from "react";

import VerfiyCodeForm from "@/components/VerfiyCode/VerfiyCode";
export const dynamic = "force-dynamic";
export default function VerifyResetCode() {
    return <div className="h-screen pt-18  text-white  w-full flex items-center justify-center">
        
        <VerfiyCodeForm />
    </div>;
}

