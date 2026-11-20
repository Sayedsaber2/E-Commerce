"use client";
import Link from "next/link";
import { RefreshCw } from "lucide-react";

// error: بتظهر لو حصلت مشكلة وإحنا بنجيب البيانات، زي إن الـ API وقع أو النت فصل
// بدل ما الصفحة تبقى بيضا أو بايظة، المستخدم بيشوف رسالة وزرار يحاول تاني
// "use client": لازم تبقى client عشان زرار reset بيشتغل في المتصفح
export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="container mx-auto flex min-h-[70vh] flex-col items-center justify-center gap-6 px-4 pt-24 text-center text-white">
      <h1 className="text-3xl font-bold md:text-4xl">Something went wrong</h1>
      <p className="max-w-md text-lg text-blue-200">We couldn&apos;t load this page right now. Please try again.</p>
      <div className="flex flex-wrap justify-center gap-4">
        {/* reset: بيحاول يرسم الصفحة تاني من غير ما يعمل ريفريش للموقع كله */}
        <button
          type="button"
          onClick={reset}
          className="flex cursor-pointer items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold transition hover:bg-blue-700"
        >
          <RefreshCw size={18} aria-hidden="true" />
          Try again
        </button>
        <Link href="/" className="rounded-lg bg-white px-6 py-3 font-semibold text-black transition hover:bg-gray-200">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
