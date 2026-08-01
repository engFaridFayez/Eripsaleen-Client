import { defineStore } from "pinia";
import { ref } from "vue";
import {
  getSubCategories,
  getSubCategory,
  createSubCategory,
  updateSubCategory,
  partialUpdateSubCategory,
  deleteSubCategory,
} from "@/services/media/subCategory.service";
import type { SubCategory } from "@/types/media";

export const useSubCategoryStore = defineStore("subCategory", () => {
  const subCategories = ref<SubCategory[]>([]);
  const currentSubCategory = ref<SubCategory | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchSubCategories = async () => {
    loading.value = true;
    error.value = null;
    try {
      subCategories.value = await getSubCategories();
    } catch (err) {
      error.value = "Failed to fetch sub-categories";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const fetchSubCategory = async (id: number) => {
    loading.value = true;
    error.value = null;
    try {
      currentSubCategory.value = await getSubCategory(id);
      return currentSubCategory.value;
    } catch (err) {
      error.value = "Failed to fetch sub-category";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const addSubCategory = async (payload: FormData) => {
    loading.value = true;
    error.value = null;
    try {
      const newSubCategory = await createSubCategory(payload);
      subCategories.value.push(newSubCategory);
      return newSubCategory;
    } catch (err) {
      error.value = "Failed to create sub-category";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const editSubCategory = async (id: number, payload: FormData) => {
    loading.value = true;
    error.value = null;
    try {
      const updated = await updateSubCategory(id, payload);
      const index = subCategories.value.findIndex((s) => s.id === id);
      if (index !== -1) subCategories.value[index] = updated;
      if (currentSubCategory.value?.id === id) currentSubCategory.value = updated;
      return updated;
    } catch (err) {
      error.value = "Failed to update sub-category";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const patchSubCategory = async (id: number, payload: FormData) => {
    loading.value = true;
    error.value = null;
    try {
      const updated = await partialUpdateSubCategory(id, payload);
      const index = subCategories.value.findIndex((s) => s.id === id);
      if (index !== -1) subCategories.value[index] = updated;
      if (currentSubCategory.value?.id === id) currentSubCategory.value = updated;
      return updated;
    } catch (err) {
      error.value = "Failed to update sub-category";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const removeSubCategory = async (id: number) => {
    loading.value = true;
    error.value = null;
    try {
      await deleteSubCategory(id);
      subCategories.value = subCategories.value.filter((s) => s.id !== id);
      if (currentSubCategory.value?.id === id) currentSubCategory.value = null;
    } catch (err) {
      error.value = "Failed to delete sub-category";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  return {
    subCategories,
    currentSubCategory,
    loading,
    error,
    fetchSubCategories,
    fetchSubCategory,
    addSubCategory,
    editSubCategory,
    patchSubCategory,
    removeSubCategory,
  };
});