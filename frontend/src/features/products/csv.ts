import type { Product } from "./types";
import { productErrors } from "./validation";

export type ImportRow = { line: number; product?: Omit<Product, "id">; error?: string };

const split = (line: string) => line.match(/(?:[^,"]|"(?:[^"]|"")*")+/g)?.map(value => value.replace(/^"|"$/g, "").replace(/""/g, '"').trim()) ?? [];
const numberOrUndefined = (value: string | undefined) => value?.trim() === "" || value === undefined ? undefined : Number(value);

export function parseProductCsv(text: string): ImportRow[] {
  const lines = text.replace(/^\uFEFF/, "").split(/\r?\n/).filter(line => line.trim()); const [headerLine, ...records] = lines; const headers = split(headerLine).map(header => header.toLowerCase());
  const required = ["sku", "name", "family"]; if (required.some(column => !headers.includes(column))) return [{ line: 1, error: "CSV must include sku, name and family columns." }];
  return records.map((record, index) => { const values = split(record); const row = Object.fromEntries(headers.map((header, column) => [header, values[column] ?? ""])); const product: Omit<Product, "id"> = { sku: row.sku, name: row.name, family: row.family, brandCode: row.brandcode || "unassigned", completeness: Number(row.completeness || 0), uom: (row.uom || "EA") as Product["uom"], status: "DRAFT", gtin: row.gtin || undefined, netWeight: numberOrUndefined(row.netweight), grossWeight: numberOrUndefined(row.grossweight), cost: numberOrUndefined(row.cost), salePrice: numberOrUndefined(row.saleprice), sellerFeeRate: numberOrUndefined(row.sellerfeerate), voucherFunding: numberOrUndefined(row.voucherfunding), version: 1 }; const errors = productErrors(product); return errors.length ? { line: index + 2, error: errors.join(" ") } : { line: index + 2, product }; });
}
