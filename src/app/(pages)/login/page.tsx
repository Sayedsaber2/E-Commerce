import { LoginForm } from "@/components/LoginForm/LoginForm";
import React from "react";
export const dynamic = "force-dynamic";
export default function Login() {
  return <div className=" h-screen  w-full flex items-center justify-center bg-linear-to-br">

    <LoginForm />
  </div>;
}
