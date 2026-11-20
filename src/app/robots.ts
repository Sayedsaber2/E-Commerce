import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// robots.txt: بيقول لجوجل يدخل فين وميدخلش فين، وفين خريطة الموقع
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // الصفحات الخاصة بالمستخدم ملهاش لازمة في البحث
      disallow: ["/cart", "/wishlist", "/allorders", "/profile", "/api/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
