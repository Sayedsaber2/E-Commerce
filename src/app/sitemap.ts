import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { getAllBrands, getAllProducts, getCategories } from "@/lib/api";

// STATIC_PAGES: الصفحات الثابتة اللي عايزين جوجل يعرفها
const STATIC_PAGES = ["", "/product", "/categories", "/brand", "/about", "/contact", "/faq", "/shipping", "/returns", "/refund", "/privacy", "/terms", "/cookies"];

// sitemap.xml: خريطة بكل صفحات الموقع، فجوجل بيلاقي كل منتج وكل قسم وكل براند حتى لو مفيش لينك ليه
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Promise.all: الطلبات التلاتة بتتبعت مع بعض
  const [products, categories, brands] = await Promise.all([getAllProducts(), getCategories(), getAllBrands()]);

  return [
    ...STATIC_PAGES.map((path) => ({ url: `${SITE_URL}${path}` })),
    ...products.map((product) => ({ url: `${SITE_URL}/product/${product.id}`, lastModified: product.updatedAt })),
    ...categories.map((category) => ({ url: `${SITE_URL}/categories/${category._id}`, lastModified: category.updatedAt })),
    ...brands.map((brand) => ({ url: `${SITE_URL}/brand/${brand._id}`, lastModified: brand.updatedAt })),
  ];
}
