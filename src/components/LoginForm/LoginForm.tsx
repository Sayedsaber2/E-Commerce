"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { signIn } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { Loader2, User } from "lucide-react"
import Link from "next/link"
import { getErrorMessage } from "@/Helpers/error"

const formSchema = z.object({
  email: z.email("invalid email").nonempty("email is required"),
  password: z
    .string().nonempty("password is required"),
})
type formdata = z.infer<typeof formSchema>
export function LoginForm() {
  const  SearchParams=useSearchParams()
  const redirectURL = SearchParams.get("url") || "/product";

  
  const [isLoading, setisLoading] = useState(false);
  const [Apierror, setApierror] = useState<null | string>(null);
  const form = useForm<formdata>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })
  const router = useRouter()
  async function onSubmit(data: formdata) {
    setisLoading(true)
    try {
      const response = await signIn('credentials', {
        email: data.email,
        password: data.password,
        callbackUrl:redirectURL,
        redirect: false
      });

      // Handle all cases properly
      if (response?.ok) {
        router.push(redirectURL);
        toast.success("Login successful!");
      } else {
        // Works for both undefined response OR error response
        const errorMsg = response?.error || "Login failed. Please check your credentials.";
        setApierror(errorMsg);
        toast.error(errorMsg);
      }
    } catch (err) {
      const errorMsg = getErrorMessage(err) ||"Something went wrong. Please try again.";
      setApierror(errorMsg);
      toast.error(errorMsg);
    } finally {
      setisLoading(false);
    }
  }

  return (


    <Card className="w-full max-w-md bg-blue-950/80 text-white border border-white/10 shadow-2xl backdrop-blur ">
      <CardHeader className="text-center space-y-2">
        <CardTitle className="text-3xl font-bold">
           <User className="w-6 h-6 text-white" />
          Welcome Back 
        </CardTitle>
        <CardDescription className="text-blue-300">
          Login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)} >
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-email">
                    Email
                  </FieldLabel>
                  <Input
                    placeholder="your@email.com"
                    type="email"
                    {...field}
                    id="form-rhf-demo-email"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-password">
                    password
                  </FieldLabel>
                  <Input
                    type="password"
                    {...field}
                    id="form-rhf-demo-password"
                    aria-invalid={fieldState.invalid}
                    
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field className="flex flex-col" orientation="horizontal">
          <div className="text-sm text-center ">
            <Link href="/forgotpassword" className="text-sm  text-blue-400 hover:text-blue-300 hover:underline">
              Forgot password?
            </Link>
          </div>
          {Apierror && <div className=" text-red-500  text-sm text-center bg-red-500/10 border border-red-500/20 mt-3 rounded-lg py-2 px-3">{Apierror}</div>}
          <Button disabled={isLoading} type="submit" form="form-rhf-demo"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white flex gap-2">
            {isLoading && <Loader2 className=" animate-spin h-4 w-4" />}Login
          </Button>


          <div className="text-center text-sm text-blue-200 ">
            Don’t have an account?
            <Link
              href="/signup"
              className="ml-1 text-blue-400 hover:text-blue-300 underline underline-offset-4"
            >
              Sign up
            </Link>
          </div>

        </Field>
      </CardFooter>

    </Card>

  )

}
