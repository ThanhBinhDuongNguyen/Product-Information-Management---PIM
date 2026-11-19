import type { Product } from "@/features/products/types";
import { http } from "./http";

export const productsService = {
  list: async () => (await http.get<Product[]>("/products")).data,
  getById: async (id: string) => (await http.get<Product>(`/products/${id}`)).data,
  create: async (product: Omit<Product, "id">) => {
    const existing = await productsService.list();
    if (existing.some(item => item.sku.toLowerCase() === product.sku.toLowerCase())) throw new Error("SKU already exists.");
    return (await http.post<Product>("/products", product)).data;
  },
  update: async (id: string, product: Partial<Product>) => {
    if (product.sku) {
      const existing = await productsService.list();
      if (existing.some(item => item.id !== id && item.sku.toLowerCase() === product.sku!.toLowerCase())) throw new Error("SKU already exists.");
    }
    return (await http.patch<Product>(`/products/${id}`, product)).data;
  },
  remove: async (id: string) => { await http.delete(`/products/${id}`); },
};
