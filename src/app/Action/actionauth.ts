"use server"
import { authoptions } from "@/auth";
import { ForgotFormPass } from "@/components/ForgotForm/ForgotForm";
import { ResetFormValue } from "@/components/ResetForm/ResetForm";
import { verifyForm } from "@/components/VerfiyCode/VerfiyCode";
import { getErrorMessage } from "@/Helpers/error";
import { SignUpFormValues } from "@/lib/schemas/signup.schema";
import { getServerSession } from "next-auth";


export async function RegstierData(value: SignUpFormValues) {

  try {
    console.log("Sending data:", value)
    const response = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value)
    })
    const data = await response.json()
    console.log("API Response:", data);
    if (!response.ok || data.statusMsg === "fail") {
      throw new Error(data.message || "Register failed");
    }
    return data
  }
  catch (err) {

    console.log(getErrorMessage(err), "Register API Error:");
    throw err

  }
}
export async function ForgotPassword(value: ForgotFormPass) {

  try {
    console.log("Sending data:", value)
    const response = await fetch("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value)
    })
    const data = await response.json()
    console.log("API Response:", data);
    if (!response.ok || data.statusMsg === "fail") {
      throw new Error(data.message || "Failed to send reset link");
    }
    return data
  }
  catch (err) {

    console.log(getErrorMessage(err), "Forgot Password API Error:");
    throw err

  }
}
export async function VerifyResetCode(value: verifyForm) {

  try {
    console.log("Sending data:", value)
    const response = await fetch("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value)
    })
    const data = await response.json()
    console.log("API verifyForm:", data);
    if (!response.ok || data.statusMsg === "fail") {
      throw new Error(data.message || "Failed to send reset link");
    }
    return data
  }
  catch (err) {

    console.log(getErrorMessage(err), "Verify Code API Error:");
    throw err

  }
}
export async function ResetPassword(value: ResetFormValue) {

  try {
    console.log("Sending data:", value)
    const response = await fetch("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value)
    })
    const data = await response.json()
    console.log("API verifyForm:", data);
    if (!response.ok || data.statusMsg === "fail") {
      throw new Error(data.message || "Failed to send reset link");
    }
    return data
  }
  catch (err) {

    console.log(getErrorMessage(err), "Forgot Password API Error:");
    throw err

  }
}

export async function updateProfileAPI(data: ProfileData) {
  const session = await getServerSession(authoptions)

 const payload = Object.fromEntries(Object.entries(data).filter(([ , value]) => value !== ""));

  try {
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/users/updateMe/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: session?.token as string,
      },
      body: JSON.stringify(payload),
    })
    const responseData = await res.json()
    if (!res.ok || responseData.statusMsg === "fail") {
      return { error: responseData.message || responseData.errors?.msg || "Failed to update profile" }
    }
    return { success: true, data: responseData }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Something went wrong";
    return { error: message }
  }
}

// Update logged-in user password
export async function updatePasswordAPI(data: PasswordData) {
  const session = await getServerSession(authoptions)
  try {
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/users/changeMyPassword", {
      method: "PUT",
      headers: {
        token: session?.token as string,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    const responseData = await res.json()
    if (!res.ok || responseData.statusMsg === "fail") {
      return { error: responseData.message || responseData.errors?.msg || "Failed to update password" }
    }
    return { success: true, data: responseData }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Something went wrong";
    return { error: message }
  }
}




export interface ProfileData {
  name: string
  email: string
  phone: string
}

export interface PasswordData {
  currentPassword: string
  password: string
  rePassword: string
}