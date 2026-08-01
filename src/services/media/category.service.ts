import api from "@/services/api";
import type {
  Category,
  CategoryWithSubCategories,
} from "@/types/media";

export const getCategories = async (): Promise<Category[]> => {
  const { data } = await api.get("/categories/");
  return data;
};

export const getCategory = async (id: number): Promise<Category> => {
  const { data } = await api.get(`/categories/${id}/`);
  return data;
};

export const createCategory = async (
  category: FormData
): Promise<Category> => {
  const { data } = await api.post("/categories/", category);
  return data;
};

export const updateCategory = async (
  id: number,
  category: FormData
): Promise<Category> => {
  const { data } = await api.put(`/categories/${id}/`, category);
  return data;
};

export const partialUpdateCategory = async (
  id: number,
  category: FormData
): Promise<Category> => {
  const { data } = await api.patch(`/categories/${id}/`, category);
  return data;
};

export const deleteCategory = async (id: number): Promise<void> => {
  await api.delete(`/categories/${id}/`);
};

/* ==============================
   Frontend
============================== */

export const getFrontendCategories = async (): Promise<
  CategoryWithSubCategories[]
> => {
  const { data } = await api.get("/frontend/categories/");
  return data;
};