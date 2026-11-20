import type { Metadata } from "next";
import "./globals.css";
import MianContext from "@/components/MianContext/MianContext";
import NavbarClient from "@/components/Navbar/NavbarClient";
import Footer from "@/components/Footer/Footer";
import CookieBanner from "@/components/CookieBanner/CookieBanner";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

// metadata: اللي جوجل والسوشيال ميديا بيقروه عن الموقع
export const metadata: Metadata = {
  // metadataBase: الدومين الأساسي، وأي لينك نسبي زي "/product" بيتكمل بيه
  metadataBase: new URL(SITE_URL),
  // template: كل صفحة بتكتب اسمها بس، والباقي بيتضاف لوحده، يعني "All Products | ShopHub"
  title: { default: `${SITE_NAME} | Online Shopping in Egypt`, template: `%s | ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  // openGraph: شكل اللينك لما يتبعت على فيسبوك أو واتساب
  openGraph: { type: "website", siteName: SITE_NAME, title: SITE_NAME, description: SITE_DESCRIPTION },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className=" overflow-x-hidden bg-linear-to-br from-blue-950 via-blue-800 to-purple-950 min-h-screen" >
        <MianContext>
          {/* NavbarClient: عدد الكارت بقى بيتجاب من المتصفح، فالسيرفر مش محتاج يقرا الـ session في كل صفحة */}
          <NavbarClient />
          {/* main: بيقول لقارئ الشاشة وجوجل فين المحتوى الأساسي للصفحة */}
          <main id="main">{children}</main>
          <CookieBanner />
          <Footer />
        </MianContext>
      </body>
    </html>
  );
}
