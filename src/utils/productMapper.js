const CARD_BG_PALETTE = [
  "linear-gradient(145deg, #fff0d0, #ffe4b0)",
  "linear-gradient(145deg, #d8f0ff, #c0e4ff)",
  "linear-gradient(145deg, #dce8ff, #c8d8ff)",
  "linear-gradient(145deg, #d0f8ff, #b0eefc)",
  "linear-gradient(145deg, #f0d8ff, #e4c0ff)",
  "linear-gradient(145deg, #d0ffd8, #b8f0c0)",
  "linear-gradient(145deg, #ffe0d0, #ffd0b8)",
];

export function formatRupee(n) {
  if (typeof n !== "number" || Number.isNaN(n)) return "";
  return `₹${n.toLocaleString("en-IN")}`;
}

export function computeDiscountPct(price, originalPrice) {
  if (!originalPrice || originalPrice <= price) return null;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}

export function mapProductToCard(product, index = 0) {
  const originalPrice = Number(product.originalPrice) || 0;
  const price = Number(product.price) || 0;
  const hasDiscount = originalPrice > price;
  const discount = computeDiscountPct(price, originalPrice);

  return {
    id: product._id,
    name: product.name || "",
    image: product.image || product.images?.[0] || "",
    subtitle:
      (Array.isArray(product.keyFeatures) && product.keyFeatures[0]) ||
      (product.description || "").slice(0, 60) ||
      "",
    tag: product.category?.name || product.brand || "",
    brand: product.brand || "",
    priceLabel: "From",
    price: formatRupee(price),
    originalPrice: hasDiscount ? formatRupee(originalPrice) : null,
    discount: discount ? `${discount}% Off` : null,
    bg: CARD_BG_PALETTE[index % CARD_BG_PALETTE.length],
  };
}
