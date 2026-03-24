export function formatCurrency(num:number) {
  return new Intl.NumberFormat("en-us",{
    currency:"EGP",
    style:"currency",
    maximumFractionDigits:2
  }).format(num)
}