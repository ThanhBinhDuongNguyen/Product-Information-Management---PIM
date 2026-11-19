export type ProductTab = "attributes" | "assets" | "completeness" | "categories" | "mappings" | "history" | "workflow";

export type Product = {
  id: string;
  sku: string;
  name: string;
  family: string;
  completeness: number;
  uom: "EA" | "KG" | "SET";
  brandCode: string;
  status?: "DRAFT" | "ENRICHED" | "READY_FOR_REVIEW" | "APPROVED" | "EXPORTED" | "ARCHIVED";
  gtin?: string;
  netWeight?: number;
  grossWeight?: number;
  dimensions?: { length: number; width: number; height: number; unit: "CM" | "MM" | "M" };
  cost?: number;
  salePrice?: number;
  sellerFeeRate?: number;
  voucherFunding?: number;
  countryOfOrigin?: string;
  warrantyMonths?: number;
  returnPolicy?: string;
  contactEmail?: string;
  version?: number;
};

export type ProductRole = "Catalog editor" | "Catalog approver";

export const lifecycleTransitions: Record<NonNullable<Product["status"]>, Product["status"][]> = {
  DRAFT: ["ENRICHED", "ARCHIVED"],
  ENRICHED: ["DRAFT", "READY_FOR_REVIEW", "ARCHIVED"],
  READY_FOR_REVIEW: ["ENRICHED", "APPROVED", "ARCHIVED"],
  APPROVED: ["EXPORTED", "ARCHIVED"],
  EXPORTED: ["ARCHIVED"],
  ARCHIVED: [],
};
