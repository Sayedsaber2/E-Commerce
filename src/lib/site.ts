// SITE_URL: الدومين الأساسي للموقع على Vercel، وده اللي جوجل بيفهرسه
// لو حطيت NEXT_PUBLIC_SITE_URL في Vercel، هيتاخد بدل اللي مكتوب هنا
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://e-commerce-drab-sigma-98.vercel.app";

// SITE_NAME: اسم المتجر في كل مكان، في العنوان وفي جوجل وفي اللوجو
export const SITE_NAME = "ShopHub";

export const SITE_DESCRIPTION =
  "Shop electronics, fashion and more from top brands at great prices, with fast delivery and secure payment.";
