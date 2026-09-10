export function formatPrice(price: number): string {
  return `${price.toLocaleString("en-US")} AED`;
}

export function formatMileage(mileage: number): string {
  return `${mileage.toLocaleString("en-US")} km`;
}
