"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Loader2, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { ForgotPassword } from "@/app/Action/actionauth"
import { getErrorMessage } from "@/Helpers/error"

const formSchema = z.object({
    email: z.string().nonempty("email is required").regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "invalid email"),
})

export type ForgotFormPass = z.infer<typeof formSchema>

export function ForgotForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [Apierror, setApierror] = useState<null | string>(null);


    const form = useForm<ForgotFormPass>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    })

    const router = useRouter()

    async function onSubmit(data: ForgotFormPass) {
        setIsLoading(true);
        setApierror(null);

        try {
            const response = await ForgotPassword(data);

            if (response?.statusMsg === "success") {
                toast.success("Reset link sent to your email !");
                router.push(`/verify-reset-code?email=${data.email}`);
            } else {
                const errorMsg = response?.message || "Failed to send reset link";
                setApierror(errorMsg);
                toast.error(errorMsg);
            }
        } catch (err) {
            const errorMsg = getErrorMessage(err) || "Something went wrong";
            setApierror(errorMsg);
            toast.error(errorMsg);
        } finally {
            setIsLoading(false);
        }
    }




    // ✅ Forgot Password Form
    return (
        <div className="w-full max-w-md bg-blue-950/80 text-white border border-white/10 shadow-2xl backdrop-blur rounded-xl p-6">
            {/* Back to Login Link */}
            <Link
                href="/login"
                className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 mb-6"
            >
                <ArrowLeft size={16} />
                Back to Login
            </Link>

            {/* Header */}
            <div className="text-center mb-6">
                <h1 className="text-3xl font-bold">Forgot Password?</h1>
                <p className="text-blue-300 text-sm mt-2">
                    No worries! Enter your email to receive a verification code
                </p>
            </div>

            {/* Form */}
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <Controller
                    name="email"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field className="space-y-1" data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="email" className="text-sm">
                                Email Address
                            </FieldLabel>
                            <Input
                                placeholder="your@email.com"
                                type="email"
                                {...field}
                                id="email"
                                aria-invalid={fieldState.invalid}
                                autoComplete="email"
                                className="h-10"
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />

                {/* Error Message */}
                {Apierror && (
                    <div className="text-red-400 text-sm text-center bg-red-500/10 border border-red-500/20 rounded-lg py-2 px-3">
                        {Apierror}
                    </div>
                )}

                {/* Submit Button */}
                <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white flex gap-2 items-center justify-center h-10 mt-6"
                >
                    {isLoading && <Loader2 className="animate-spin" size={18} />}
                    {isLoading ? "Sending..." : "Send Reset Link"}
                </Button>

                {/* Sign Up Link */}
                <p className="text-center text-sm text-blue-200 mt-4">
                    {`Don't have an account?`}
                    <Link
                        href="/signup"
                        className="text-blue-400 hover:text-blue-300 font-medium"
                    >
                        Sign up
                    </Link>
                </p>
            </form>
        </div>
    );
}