import { defineStore } from "pinia";
import { ref } from "vue";
import {
  getGalleryImages,
  getGalleryImage,
  createGalleryImage,
  bulkCreateGalleryImages,
  updateGalleryImage,
  partialUpdateGalleryImage,
  deleteGalleryImage,
  getFrontendGalleryImages,
} from "@/services/media/gallery.service";
import type { GalleryImage } from "@/types/media";

export const useGalleryStore = defineStore("gallery", () => {
  const galleryImages = ref<GalleryImage[]>([]);
  const currentGalleryImage = ref<GalleryImage | null>(null);
  const frontendGalleryImages = ref<GalleryImage[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchGalleryImages = async () => {
    loading.value = true;
    error.value = null;
    try {
      galleryImages.value = await getGalleryImages();
    } catch (err) {
      error.value = "Failed to fetch gallery images";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const fetchGalleryImage = async (id: number) => {
    loading.value = true;
    error.value = null;
    try {
      currentGalleryImage.value = await getGalleryImage(id);
      return currentGalleryImage.value;
    } catch (err) {
      error.value = "Failed to fetch gallery image";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const addGalleryImage = async (payload: FormData) => {
    loading.value = true;
    error.value = null;
    try {
      const newImage = await createGalleryImage(payload);
      galleryImages.value.push(newImage);
      return newImage;
    } catch (err) {
      error.value = "Failed to create gallery image";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const addBulkGalleryImages = async (payload: FormData) => {
    loading.value = true;
    error.value = null;

    try {
      const newImages = await bulkCreateGalleryImages(payload);

      galleryImages.value.push(...newImages);

      return newImages;
    } catch (err) {
      error.value = "Failed to create gallery images";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const editGalleryImage = async (id: number, payload: FormData) => {
    loading.value = true;
    error.value = null;
    try {
      const updated = await updateGalleryImage(id, payload);
      const index = galleryImages.value.findIndex((g) => g.id === id);
      if (index !== -1) galleryImages.value[index] = updated;
      if (currentGalleryImage.value?.id === id) currentGalleryImage.value = updated;
      return updated;
    } catch (err) {
      error.value = "Failed to update gallery image";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const patchGalleryImage = async (id: number, payload: FormData) => {
    loading.value = true;
    error.value = null;
    try {
      const updated = await partialUpdateGalleryImage(id, payload);
      const index = galleryImages.value.findIndex((g) => g.id === id);
      if (index !== -1) galleryImages.value[index] = updated;
      if (currentGalleryImage.value?.id === id) currentGalleryImage.value = updated;
      return updated;
    } catch (err) {
      error.value = "Failed to update gallery image";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const removeGalleryImage = async (id: number) => {
    loading.value = true;
    error.value = null;
    try {
      await deleteGalleryImage(id);
      galleryImages.value = galleryImages.value.filter((g) => g.id !== id);
      if (currentGalleryImage.value?.id === id) currentGalleryImage.value = null;
    } catch (err) {
      error.value = "Failed to delete gallery image";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const fetchFrontendGalleryImages = async (subCategory?: number) => {
    loading.value = true;
    error.value = null;
    try {
      frontendGalleryImages.value = await getFrontendGalleryImages(subCategory);
    } catch (err) {
      error.value = "Failed to fetch frontend gallery images";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  return {
    galleryImages,
    currentGalleryImage,
    frontendGalleryImages,
    loading,
    error,
    fetchGalleryImages,
    fetchGalleryImage,
    addGalleryImage,
    addBulkGalleryImages,
    editGalleryImage,
    patchGalleryImage,
    removeGalleryImage,
    fetchFrontendGalleryImages,
  };
});