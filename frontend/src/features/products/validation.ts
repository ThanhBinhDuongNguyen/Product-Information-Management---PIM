import { lifecycleTransitions, type Product, type ProductRole } from "./types";

export function productErrors(product: Partial<Product>) {
  const errors: string[] = [];
  if (!product.sku?.trim()) errors.push("SKU is required.");
  if (product.gtin && !isValidGtin(product.gtin)) errors.push("GTIN has an invalid check digit.");
  if (product.netWeight !== undefined && product.netWeight < 0) errors.push("Net weight must be zero or greater.");
  if (product.grossWeight !== undefined && product.netWeight !== undefined && product.grossWeight < product.netWeight) errors.push("Gross weight cannot be lower than net weight.");
  if (product.dimensions && [product.dimensions.length, product.dimensions.width, product.dimensions.height].some(value => value <= 0)) errors.push("All dimensions must be greater than zero.");
  if (product.cost !== undefined && product.salePrice !== undefined && product.sellerFeeRate !== undefined && product.salePrice * (1 - product.sellerFeeRate) - product.cost - (product.voucherFunding ?? 0) < 0) errors.push("Price is below the configured floor after fees and vouchers.");
  return errors;
}

export function exportErrors(product: Partial<Product>) {
  const errors = productErrors(product);
  if (!product.gtin) errors.push("GTIN is required for export.");
  if (product.netWeight === undefined || product.grossWeight === undefined) errors.push("Net and gross weight are required for export.");
  if (!product.dimensions) errors.push("Dimensions are required for export.");
  if (!product.countryOfOrigin?.trim()) errors.push("Country of origin is required for export.");
  if (!product.returnPolicy?.trim()) errors.push("Return policy is required for export.");
  if (!product.contactEmail?.includes("@")) errors.push("A valid customer contact email is required for export.");
  return errors;
}

export function transitionError(product: Product, next: Product["status"], role: ProductRole) {
  const current = product.status ?? "DRAFT";
  if (!next || next === current) return "Choose a different lifecycle status.";
  if (!lifecycleTransitions[current].includes(next)) return `Transition from ${current} to ${next} is not allowed.`;
  if (next === "APPROVED" && role !== "Catalog approver") return "Only a Catalog approver can approve a product.";
  if (next === "APPROVED") return exportErrors(product).join(" ");
  return "";
}

export function isValidGtin(value: string) {
  if (!/^(?:\d{8}|\d{12,14})$/.test(value)) return false;
  const digits = value.split("").map(Number); const expected = digits.pop();
  return digits.reverse().reduce((total, digit, index) => total + digit * (index % 2 === 0 ? 3 : 1), 0) % 10 === (10 - expected!) % 10;
}
