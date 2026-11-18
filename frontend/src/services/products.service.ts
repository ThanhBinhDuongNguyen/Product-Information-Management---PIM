import type { Product } from "@/features/products/types";
import { http } from "./http";

export const productsService = {
  list: async () => (await http.get<Product[]>("/products")).data,
  getById: async (id: string) => (await http.get<Product>(`/products/${id}`)).data,
  create: async (product: Omit<Product, "id">) => (await http.post<Product>("/products", product)).data,
};
