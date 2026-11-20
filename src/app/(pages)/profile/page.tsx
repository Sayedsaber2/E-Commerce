import type { Metadata } from "next";

import ProfileForm from "@/components/ProfileForm/ProfileForm";
import React from "react";

export const metadata: Metadata = {
  title: "Your Profile",
  // index: false = الصفحة دي خاصة بالمستخدم، فمش عايزين جوجل يعرضها في البحث
  robots: { index: false, follow: false },
};


export default function ProfilePage() {
  return <div>
    <ProfileForm />
  </div>;
}
