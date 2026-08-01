import api from "@/services/api";
import type { SubCategory } from "@/types/media";

export const getSubCategories = async (): Promise<SubCategory[]> => {
    const { data } = await api.get("/sub-categories/");
    return data;
};

export const getSubCategory = async (
    id: number
): Promise<SubCategory> => {
    const { data } = await api.get(`/sub-categories/${id}/`);
    return data;
};

export const createSubCategory = async (
    subCategory: FormData
): Promise<SubCategory> => {
    const { data } = await api.post(
        "/sub-categories/",
        subCategory
    );
    return data;
};

export const updateSubCategory = async (
    id: number,
    subCategory: FormData
): Promise<SubCategory> => {
    const { data } = await api.put(
        `/sub-categories/${id}/`,
        subCategory
    );
    return data;
};

export const partialUpdateSubCategory = async (
    id: number,
    subCategory: FormData
): Promise<SubCategory> => {
    const { data } = await api.patch(
        `/sub-categories/${id}/`,
        subCategory
    );
    return data;
};

export const deleteSubCategory = async (
    id: number
): Promise<void> => {
    await api.delete(`/sub-categories/${id}/`);
};