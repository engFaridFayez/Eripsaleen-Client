import api from "@/services/api";
import type { GalleryImage } from "@/types/media";

export const getGalleryImages = async (): Promise<GalleryImage[]> => {
    const { data } = await api.get("/gallery/");
    return data;
};

export const getGalleryImage = async (
    id: number
): Promise<GalleryImage> => {
    const { data } = await api.get(`/gallery/${id}/`);
    return data;
};

export const createGalleryImage = async (
    galleryImage: FormData
): Promise<GalleryImage> => {
    const { data } = await api.post("/gallery/", galleryImage);
    return data;
};

export const bulkCreateGalleryImages = async (
    galleryImages: FormData
): Promise<GalleryImage[]> => {
    const { data } = await api.post(
        "/gallery/bulk-create/",
        galleryImages
    );

    return data;
};

export const updateGalleryImage = async (
    id: number,
    galleryImage: FormData
): Promise<GalleryImage> => {
    const { data } = await api.put(
        `/gallery/${id}/`,
        galleryImage
    );
    return data;
};

export const partialUpdateGalleryImage = async (
    id: number,
    galleryImage: FormData
): Promise<GalleryImage> => {
    const { data } = await api.patch(
        `/gallery/${id}/`,
        galleryImage
    );
    return data;
};

export const deleteGalleryImage = async (
    id: number
): Promise<void> => {
    await api.delete(`/gallery/${id}/`);
};

export const getFrontendGalleryImages = async (
  subCategory?: number
): Promise<GalleryImage[]> => {
  const { data } = await api.get("/frontend/gallery/", {
    params: {
      sub_category: subCategory,
    },
  });

  return data;
};