export type ProductTab = "attributes" | "assets" | "completeness" | "categories" | "mappings" | "history" | "workflow";

export type Product = {
  id: string;
  sku: string;
  name: string;
  family: string;
  completeness: number;
  uom: "EA" | "KG" | "SET";
  brandCode: string;
};
