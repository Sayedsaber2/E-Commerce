import { cache } from "react";
import { brand, BrandResponse } from "@/interfaces/interfacebrand";
import { categories, categoriesResponse } from "@/interfaces/interfacecategories";
import { product, productResponse } from "@/interfaces/interfaceproduct";

const API_URL = "https://ecommerce.routemisr.com/api/v1";

// CACHE: البيانات بتتحفظ على السيرفر ساعة، فالصفحة بتفتح بسرعة من غير ما نسأل الـ API كل مرة
// وبعد الساعة بتتجدد لوحدها في الخلفية
const CACHE = { next: { revalidate: 3600 } };

// ---------- المنتجات ----------

// getAllProducts: الـ API بيدي 40 منتج بس في الصفحة، فبنجيب كل الصفحات
export async function getAllProducts(filter = "") {
  const first = await fetch(`${API_URL}/products?page=1${filter}`, CACHE);
  const firstPage: productResponse = await first.json();

  // pages: أرقام الصفحات الفاضلة، من 2 لحد آخر صفحة
  const pages = Array.from({ length: firstPage.metadata.numberOfPages - 1 }, (_, i) => i + 2);
  // Promise.all: الطلبات بتتبعت كلها مع بعض
  const rest: productResponse[] = await Promise.all(
    pages.map((page) => fetch(`${API_URL}/products?page=${page}${filter}`, CACHE).then((res) => res.json())),
  );

  return [...firstPage.data, ...rest.flatMap((pageData) => pageData.data)];
}

// cache: لو الصفحة و generateMetadata طلبوا نفس المنتج، الطلب بيتبعت مرة واحدة بس
// null: المنتج مش موجود، والصفحة بتعرض 404
export const getProduct = cache(async (id: string) => {
  const response = await fetch(`${API_URL}/products/${id}`, CACHE);
  if (!response.ok) return null;
  const json: { data: product } = await response.json();
  return json.data;
});

// ---------- الأقسام ----------

export async function getCategories() {
  const response = await fetch(`${API_URL}/categories`, CACHE);
  const json: categoriesResponse = await response.json();
  return json.data;
}

export const getCategory = cache(async (id: string) => {
  const response = await fetch(`${API_URL}/categories/${id}`, CACHE);
  if (!response.ok) return null;
  const json: { data: categories } = await response.json();
  return json.data;
});

// ---------- البراندات ----------

// getAllBrands: نفس فكرة getAllProducts، البراندات أكتر من صفحة
export async function getAllBrands() {
  const first = await fetch(`${API_URL}/brands?page=1`, CACHE);
  const firstPage: BrandResponse = await first.json();

  const pages = Array.from({ length: firstPage.metadata.numberOfPages - 1 }, (_, i) => i + 2);
  const rest: BrandResponse[] = await Promise.all(
    pages.map((page) => fetch(`${API_URL}/brands?page=${page}`, CACHE).then((res) => res.json())),
  );

  return [...firstPage.data, ...rest.flatMap((pageData) => pageData.data)];
}

export const getBrand = cache(async (id: string) => {
  const response = await fetch(`${API_URL}/brands/${id}`, CACHE);
  if (!response.ok) return null;
  const json: { data: brand } = await response.json();
  return json.data;
});
