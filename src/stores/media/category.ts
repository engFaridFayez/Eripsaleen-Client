import { defineStore } from "pinia";
import { ref } from "vue";
import {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  partialUpdateCategory,
  deleteCategory,
  getFrontendCategories,
} from "@/services/media/category.service";
import type { Category, CategoryWithSubCategories } from "@/types/media";

export const useCategoryStore = defineStore("category", () => {
  const categories = ref<Category[]>([]);
  const currentCategory = ref<Category | null>(null);
  const frontendCategories = ref<CategoryWithSubCategories[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchCategories = async () => {
    loading.value = true;
    error.value = null;
    try {
      categories.value = await getCategories();
    } catch (err) {
      error.value = "Failed to fetch categories";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const fetchCategory = async (id: number) => {
    loading.value = true;
    error.value = null;
    try {
      currentCategory.value = await getCategory(id);
      return currentCategory.value;
    } catch (err) {
      error.value = "Failed to fetch category";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const addCategory = async (payload: FormData) => {
    loading.value = true;
    error.value = null;
    try {
      const newCategory = await createCategory(payload);
      categories.value.push(newCategory);
      return newCategory;
    } catch (err) {
      error.value = "Failed to create category";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const editCategory = async (id: number, payload: FormData) => {
    loading.value = true;
    error.value = null;
    try {
      const updated = await updateCategory(id, payload);
      const index = categories.value.findIndex((c) => c.id === id);
      if (index !== -1) categories.value[index] = updated;
      if (currentCategory.value?.id === id) currentCategory.value = updated;
      return updated;
    } catch (err) {
      error.value = "Failed to update category";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const patchCategory = async (id: number, payload: FormData) => {
    loading.value = true;
    error.value = null;
    try {
      const updated = await partialUpdateCategory(id, payload);
      const index = categories.value.findIndex((c) => c.id === id);
      if (index !== -1) categories.value[index] = updated;
      if (currentCategory.value?.id === id) currentCategory.value = updated;
      return updated;
    } catch (err) {
      error.value = "Failed to update category";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const removeCategory = async (id: number) => {
    loading.value = true;
    error.value = null;
    try {
      await deleteCategory(id);
      categories.value = categories.value.filter((c) => c.id !== id);
      if (currentCategory.value?.id === id) currentCategory.value = null;
    } catch (err) {
      error.value = "Failed to delete category";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const fetchFrontendCategories = async () => {
    loading.value = true;
    error.value = null;
    try {
      frontendCategories.value = await getFrontendCategories();
    } catch (err) {
      error.value = "Failed to fetch frontend categories";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  return {
    categories,
    currentCategory,
    frontendCategories,
    loading,
    error,
    fetchCategories,
    fetchCategory,
    addCategory,
    editCategory,
    patchCategory,
    removeCategory,
    fetchFrontendCategories,
  };
});