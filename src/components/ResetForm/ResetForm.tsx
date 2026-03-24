"use client"
import { ResetPassword } from "@/app/Action/actionauth";
import { getErrorMessage } from "@/Helpers/error";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { Button } from "../ui/button";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";

const schema = z.object({
  email: z.string().nonempty("email is required").regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    "invalid email"),
  newPassword: z.string().nonempty("new password is required").regex(/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
    "Password must be at least 8 characters with uppercase, lowercase, and number"),
})

export type ResetFormValue = z.infer<typeof schema>


export default function ResetForm() {
  const [ApiError, setApiError] = useState<string | null>(null);
  const [isLoading, setisLoading] = useState(false);
  const [ResetSuccess, setResetSuccess] = useState(false);
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || ""
  const resetCode = searchParams.get("resetCode") || ""
  const router = useRouter()
  const { handleSubmit, control } = useForm<ResetFormValue>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: email,
      newPassword: "",
    }
  })

  useEffect(() => {
    if (!email || !resetCode) {
      toast.error("Invalid reset link. Please start from forgot password.");
      router.push("/forgotpassword");
    }
  }, [email, resetCode, router])

  async function onSubmit(data: ResetFormValue) {
    setisLoading(true)
    try {
      const response = await ResetPassword({
        email: data.email,

        newPassword: data.newPassword,

      })
      if (response?.token || response?.statusMsg === "success") {
        setResetSuccess(true)
        toast.success("Password reset successfully!");
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        const errorMsg = response?.message || "Something went wrong"
        setApiError(errorMsg)
        toast.error(errorMsg || "Something went wrong");
      }
    } catch (err) {
      const errorMsg = getErrorMessage(err) || "Something went wrong"
      setApiError(errorMsg)
      toast.error(errorMsg || "Something went wrong");
    } finally {
      setisLoading(false)

    }
  }
  if (ResetSuccess) {

    return <div className="w-full max-w-md bg-blue-950/80 text-white border border-white/10 shadow-2xl backdrop-blur rounded-xl p-8">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle className="w-8 h-8 text-green-400" />
        </div>

        <h2 className="text-2xl font-bold">Password Reset Successful!</h2>

        <p className="text-blue-200 text-sm">
          Your password has been reset successfully.
          <br />
          Redirecting to login...
        </p>

        <Link href="/login">
          <Button className="w-full bg-blue-600 hover:bg-blue-700 mt-4">
            Go to Login
          </Button>
        </Link>
      </div>
    </div>;
  }
  return <div className="w-full max-w-md bg-blue-950/80 text-white border border-white/10 shadow-2xl backdrop-blur rounded-xl p-6">
    <div className="text-center mb-6">
      <h1 className="text-3xl font-bold">Reset Your Password</h1>
      <p className="text-blue-300 text-sm mt-2">
        Enter your new password for <strong>{email}</strong>
      </p>
    </div>

    {/* Form */}
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Email (readonly) */}
      <Controller
        name="email"
        control={control}
        render={({ field, fieldState }) => (
          <Field className="space-y-1" data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="email" className="text-sm">
              Email Address
            </FieldLabel>
            <Input
              type="email"
              {...field}
              id="email"
              readOnly
              className="h-10 bg-blue-900/50 cursor-not-allowed"
            />
            {fieldState.invalid && (
              <FieldError errors={[fieldState.error]} />
            )}
          </Field>
        )}
      />

      {/* New Password */}
      <Controller
        name="newPassword"
        control={control}
        render={({ field, fieldState }) => (
          <Field className="space-y-1" data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="newPassword" className="text-sm">
              New Password
            </FieldLabel>
            <Input
            
              type="password"
              {...field}
              id="newPassword"
              aria-invalid={fieldState.invalid}
              autoComplete="new-password"
              className="h-10"
            />
            <p className="text-xs text-blue-300">
              Min 8 characters, uppercase, lowercase, and number
            </p>
            {fieldState.invalid && (
              <FieldError errors={[fieldState.error]} />
            )}
          </Field>
        )}
      />

      {/* Error Message */}
      {ApiError && (
        <div className="text-red-400 text-sm text-center bg-red-500/10 border border-red-500/20 rounded-lg py-2 px-3">
          {ApiError}
        </div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white flex gap-2 items-center justify-center h-10 mt-6"
      >
        {isLoading && <Loader2 className="animate-spin" size={18} />}
        {isLoading ? "Resetting..." : "Reset Password"}
      </Button>

      {/* Back to Login */}
      <p className="text-center text-sm text-blue-200 mt-4">
        Remember your password?{" "}
        <Link
          href="/login"
          className="text-blue-400 hover:text-blue-300 font-medium"
        >
          Login
        </Link>
      </p>
    </form>
  </div>
}
