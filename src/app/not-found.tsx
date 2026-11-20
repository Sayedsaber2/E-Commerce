import Link from "next/link";
import { SearchX } from "lucide-react";

// not-found: الصفحة اللي بتظهر لما اللينك غلط، أو لما notFound() تتنادى في صفحة منتج أو قسم أو براند
// وبترجع للمتصفح وجوجل رقم 404، فجوجل بيعرف إن الصفحة دي مش موجودة
export default function NotFound() {
  return (
    <div className="container mx-auto flex min-h-[70vh] flex-col items-center justify-center gap-6 px-4 pt-24 text-center text-white">
      <SearchX size={64} className="text-blue-400" aria-hidden="true" />
      <h1 className="text-4xl font-bold md:text-5xl">Page not found</h1>
      <p className="max-w-md text-lg text-blue-200">
        The page you are looking for doesn&apos;t exist or was moved.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Link href="/" className="rounded-lg bg-blue-600 px-6 py-3 font-semibold transition hover:bg-blue-700">
          Back to Home
        </Link>
        <Link href="/product" className="rounded-lg bg-white px-6 py-3 font-semibold text-black transition hover:bg-gray-200">
          Browse Products
        </Link>
      </div>
    </div>
  );
}
