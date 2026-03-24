"use client"

import React, { useState } from "react";
import { CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { schema, SignUpFormValues } from "@/lib/schemas/signup.schema";
import { RegstierData } from "@/app/Action/actionauth";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import { Loader } from "lucide-react";
import { getErrorMessage } from "@/Helpers/error";





export default function SignUpForm() {
  const router = useRouter()
  const [Apierror, setApierror] = useState<string | null>(null);
  const [isLoading, setisLoading] = useState(false)

  const { handleSubmit, control } = useForm<SignUpFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: ""
    },
  })

  async function signUp(value: SignUpFormValues) {
    setisLoading(true);
    setApierror(null);
    try {
      const data = await RegstierData(value);
      console.log("Register success:", data);
      // هنا بقى تعمل اللي انت عايزه
      toast.success("Account created successfully!")
      router.push("/login")
    }
    catch (err) {
      const errorMsg = getErrorMessage(err) || "Something went wrong";
      setApierror(errorMsg || "Something went wrong")
      toast.error(errorMsg || "Something went wrong");
    }
    finally {
      setisLoading(false);
    }
  }




  return <>
    <div className=" w-full max-w-md flex flex-col gap-4 rounded-xl py-4 bg-blue-950/80 text-white border border-white/10 shadow-2xl backdrop-blur ">
      <CardHeader className="text-center p-0 pb-0 space-y-1">
        <CardTitle className="text-3xl font-bold">
          Create your Account 👋
        </CardTitle>

      </CardHeader>
      <CardContent className="p-">
        <form onSubmit={handleSubmit(signUp)} >
          <FieldGroup>
            <Controller
              name="name"
              control={control}
              render={({ field, fieldState }) => (
                <Field className="p-0" data-invalid={fieldState.invalid}>
                  <FieldLabel className="p-0 " htmlFor="form-rhf-demo-name">
                    Name
                  </FieldLabel>
                  <Input

                    type="text"
                    {...field}
                    id="form-rhf-demo-name"
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
              name="email"
              control={control}
              render={({ field, fieldState }) => (
                <Field className="p-0" data-invalid={fieldState.invalid}>
                  <FieldLabel className="p-0" htmlFor="form-rhf-demo-email">
                    Email
                  </FieldLabel>
                  <Input

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
              control={control}
              render={({ field, fieldState }) => (
                <Field className="p-0" data-invalid={fieldState.invalid}>
                  <FieldLabel className="p-0" htmlFor="form-rhf-demo-password">
                    Password
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
            <Controller
              name="rePassword"
              control={control}
              render={({ field, fieldState }) => (
                <Field className="p-0" data-invalid={fieldState.invalid}>
                  <FieldLabel className="p-0" htmlFor="form-rhf-demo-rePassword">
                    Confirm Password
                  </FieldLabel>
                  <Input

                    type="password"
                    {...field}
                    id="form-rhf-demo-rePassword"
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
              name="phone"
              control={control}
              render={({ field, fieldState }) => (
                <Field className="p-0" data-invalid={fieldState.invalid}>
                  <FieldLabel className="p-0" htmlFor="form-rhf-demo-phone">
                    Phone
                  </FieldLabel>
                  <Input

                    type="text"
                    {...field}
                    id="form-rhf-demo-phone"
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
          {Apierror && <div className=" text-red-500  text-sm text-center bg-red-500/10 border border-red-500/20 mt-3 rounded-lg py-2 px-3">{Apierror}</div>}
          <Button type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white flex gap-2 mt-3 items-center justify-center" disabled={isLoading}>
            {isLoading ? <Loader className=' animate-spin' /> : "Sign Up"}

          </Button>

          <p className=" text-sm text-center mt-2">if have account <Link className="text-blue-400 hover:text-blue-300 font-medium " href={'/login'}>login?</Link> </p>
        </form>
      </CardContent>
    </div>
  </>;
}
