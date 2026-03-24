"use client"
import React, { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "react-hot-toast"
import { PasswordData, ProfileData, updatePasswordAPI, updateProfileAPI } from "@/app/Action/actionauth"
import { useSession } from "next-auth/react"
import { Loader2 } from "lucide-react"

export default function ProfileForm() {
  const { data: session, status,update } = useSession()
  const user = session?.user

  const [profile, setProfile] = useState<ProfileData>({
    name: "",
    email: "",
    phone: ""
  })

  const [passwordData, setPasswordData] = useState<PasswordData>({
    currentPassword: "",
    password: "",
    rePassword: ""
  })

  const [loadingProfile, setLoadingProfile] = useState(false)
  const [loadingPassword, setLoadingPassword] = useState(false)

  useEffect(() => {
  if (user) {
    // تأجيل التحديث لتجنب التحذير
    const timer = setTimeout(() => {
      setProfile({
        name: user.name || "",
        email: user.email || "",
        phone: ""
      });
    }, 0);

    return () => clearTimeout(timer);
  }
}, [user]);

  const handleUpdateProfile = async () => {
  setLoadingProfile(true)
  try {
    const result = await updateProfileAPI(profile)
    if ('error' in result) {
      toast.error(result.error)
    } else {
      await update({
        name: profile.name,
        email: profile.email,
      })
      toast.success("Profile updated successfully")
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to update profile"
    toast.error(message)
  }
  setLoadingProfile(false)
}

const handleUpdatePassword = async () => {
  if (passwordData.password !== passwordData.rePassword) {
    return toast.error("Passwords don't match")
  }
  setLoadingPassword(true)
  try {
    const result = await updatePasswordAPI(passwordData)
    if ('error' in result) {
      toast.error(result.error)
    } else {
      toast.success("Password updated successfully")
      setPasswordData({ currentPassword: "", password: "", rePassword: "" })
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to update password"
    toast.error(message)
  }
  setLoadingPassword(false)
}

  if (status === "loading") {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16 animate-pulse">

      {/* Header Skeleton */}
      <div className="flex items-center gap-6 mb-10">
        <div className="w-20 h-20 rounded-full bg-white/10" />

        <div className="space-y-2">
          <div className="h-6 w-48 bg-white/10 rounded" />
          <div className="h-4 w-32 bg-white/10 rounded" />
          <div className="h-3 w-40 bg-white/10 rounded" />
        </div>
      </div>

      {/* Cards Skeleton */}
      <div className="grid md:grid-cols-2 gap-6">

        {[1, 2].map((item) => (
          <div
            key={item}
            className="p-6 rounded-xl bg-white/5 border border-white/10 space-y-4"
          >
            <div className="h-5 w-32 bg-white/10 rounded" />

            <div className="space-y-3">
              <div className="h-10 bg-white/10 rounded" />
              <div className="h-10 bg-white/10 rounded" />
              <div className="h-10 bg-white/10 rounded" />
            </div>

            <div className="h-10 bg-white/10 rounded mt-4" />
          </div>
        ))}

      </div>
    </div>
  )
}
 

  return (
    <div className="max-w-5xl mx-auto px-4 py-16 text-white space-y-10 ">

      {/* 🔥 Header */}
      <div className="flex items-center gap-6 border-b border-white/10 pb-6">
        <div className="w-20 h-20 rounded-full bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-2xl font-bold shadow-lg">
          {user?.name?.[0] ?? "U"}
        </div>

        <div>
          <h1 className="text-3xl font-bold">Account Settings</h1>
          <p className="text-zinc-400 text-sm">
            {"Manage your profile & security"}
          </p>
          <p className="text-zinc-500 text-xs mt-1">
            {user?.email}
          </p>
        </div>
      </div>

      {/* 🔥 GRID */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* 🔵 Profile */}
        <Card className="bg-white/5 border-white/10 backdrop-blur-xl text-white">
          <CardHeader>
            <CardTitle className="text-lg">Profile Info</CardTitle>
          </CardHeader>

          <CardContent>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleUpdateProfile()
              }}
              className="space-y-4"
            >
              <FieldGroup>

                <Field>
                  <FieldLabel>Name</FieldLabel>
                  <Input
                    value={profile.name}
                    onChange={(e) =>
                      setProfile({ ...profile, name: e.target.value })
                    }
                    className="bg-white/5 border-white/10 focus:border-blue-500"
                  />
                </Field>

                <Field>
                  <FieldLabel>Email</FieldLabel>
                  <Input
                    value={profile.email}
                    onChange={(e) =>
                      setProfile({ ...profile, email: e.target.value })
                    }
                    className="bg-white/5 border-white/10 focus:border-blue-500"
                  />
                </Field>

                <Field>
                  <FieldLabel>Phone</FieldLabel>
                  <Input
                    value={profile.phone}
                    onChange={(e) =>
                      setProfile({ ...profile, phone: e.target.value })
                    }
                    className="bg-white/5 border-white/10 focus:border-blue-500"
                  />
                </Field>

              </FieldGroup>

              <Button
                disabled={loadingProfile}
                className="w-full bg-blue-600 hover:bg-blue-500"
              >
                {loadingProfile && <Loader2 className="animate-spin mr-2" />}
                Save Changes
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* 🟢 Password */}
        <Card className="bg-white/5 border-white/10 backdrop-blur-xl text-white">
          <CardHeader>
            <CardTitle className="text-lg">Security</CardTitle>
          </CardHeader>

          <CardContent>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleUpdatePassword()
              }}
              className="space-y-4"
            >
              <FieldGroup>

                <Field>
                  <FieldLabel>Current Password</FieldLabel>
                  <Input
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        currentPassword: e.target.value
                      })
                    }
                    className="bg-white/5 border-white/10 focus:border-green-500"
                  />
                </Field>

                <Field>
                  <FieldLabel>New Password</FieldLabel>
                  <Input
                    type="password"
                    value={passwordData.password}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        password: e.target.value
                      })
                    }
                    className="bg-white/5 border-white/10 focus:border-green-500"
                  />
                </Field>

                <Field>
                  <FieldLabel>Confirm Password</FieldLabel>
                  <Input
                    type="password"
                    value={passwordData.rePassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        rePassword: e.target.value
                      })
                    }
                    className="bg-white/5 border-white/10 focus:border-green-500"
                  />
                </Field>

              </FieldGroup>

              <Button
                disabled={loadingPassword}
                className="w-full bg-green-600 hover:bg-green-500"
              >
                {loadingPassword && <Loader2 className="animate-spin mr-2" />}
                Update Password
              </Button>
            </form>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}