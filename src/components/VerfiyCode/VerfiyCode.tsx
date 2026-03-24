"use client"
import { VerifyResetCode } from "@/app/Action/actionauth";
import { getErrorMessage } from "@/Helpers/error";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Loader2 } from "lucide-react";
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
    resetCode: z.string().nonempty("Reset code is required").length(6, "Code must be 6 digits").regex(/^\d{6}$/, "Code must be 6 digits only")
})
export type verifyForm = z.infer<typeof schema>

export default function VerfiyCodeForm() {
    const [ApiError, setApiError] = useState<string | null>(null);
    const [isLoading, setisLoading] = useState(false);
    const router = useRouter()
    const searchParams = useSearchParams();
    const email = searchParams.get("email") || ""
    const { handleSubmit, control } = useForm<verifyForm>({
        resolver: zodResolver(schema),
        defaultValues: {
            resetCode: ""
        }
    })
    async function onSubmit(data: verifyForm) {
        setisLoading(true)
        try {
            await VerifyResetCode(data)
            toast.success("Code verified successfully!")
            router.push(`/reset-password?email=${email}&resetCode=${data.resetCode}`)
        }

        catch (err) {
            const errorMsg = getErrorMessage(err) || "Something went wrong"
            setApiError(errorMsg)
            toast.error(errorMsg || "Something went wrong");

        } finally {
            setisLoading(false)
        }

    }
    useEffect(() => {
        if (!email) {
            toast.error("Email is missing, redirecting back to forgot password")
            router.push("/forgotpassword")
        }
    }, [email, router])
    return <div className="w-full max-w-md bg-blue-950/80 text-white border border-white/10 shadow-2xl backdrop-blur rounded-xl p-6">
        <Link
            href="/forgotpassword"
            className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 mb-6"
        >
            <ArrowLeft size={16} />
            Back to forgot password
        </Link>
        <div className="text-center mb-6">
            <h1 className="text-3xl font-bold">Enter Verification Code</h1>
            <p className="text-blue-300 text-sm mt-2">
                {"We've sent a 6-digit code to"}
            </p>
            <p className="text-blue-200 font-medium mt-1">{email}</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Controller
                name="resetCode"
                control={control}
                render={({ field, fieldState }) => (
                    <Field className="space-y-1" data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="resetCode" className="text-sm">
                            Verification Code
                        </FieldLabel>
                        <Input
                            placeholder="123456"
                            type="text"
                            {...field}
                            id="resetCode"
                            aria-invalid={fieldState.invalid}

                            className="h-10 text-center text-2xl tracking-widest font-mono"
                            maxLength={6}

                        />
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
                {isLoading ? "Verifying..." : "Verify Code "}
            </Button>

            <div className="text-center mt-4">
                <button
                    type="button"
                    onClick={() => router.push("/forgotpassword")}
                    className="text-sm text-blue-400 hover:text-blue-300 hover:underline"
                >
                    {"Didn't receive code? Send again"}
                </button>
            </div>
        </form>
    </div>;
}
