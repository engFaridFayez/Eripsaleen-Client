import { defineStore } from "pinia";
import type { SeatCategory } from "@/types/seatCategory";
import SeatCategoryService from "@/services/adminServices/seat.category.service";

export const useSeatCategoryStore = defineStore("seatCategory", {
  state: () => ({
    seatCategories: [] as SeatCategory[],
    loading: false,
    error: null as string | null,

    // 👇 مهمين للربط مع Seat Management
    selectedCategory: null as number | null,
  }),

  actions: {
    async getCategories(theaterId?: number) {
      this.loading = true;
      this.error = null;

      try {
        const res = await SeatCategoryService.getAll(theaterId);
        this.seatCategories = res.data;
      } catch (error) {
        console.error(error);
        this.error = "Error fetching seat categories.";
      } finally {
        this.loading = false;
      }
    },

    async createCategory(data: Partial<SeatCategory>) {
      this.loading = true;
      this.error = null;

      try {
        const res = await SeatCategoryService.create(data);
        this.seatCategories.push(res.data);
        return res.data;
      } catch (error) {
        console.error(error);
        this.error = "Error creating seat category.";
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async updateCategory(id: number, data: Partial<SeatCategory>) {
      this.loading = true;
      this.error = null;

      try {
        const res = await SeatCategoryService.update(id, data);

        const index = this.seatCategories.findIndex(
          (c) => c.id === id
        );

        if (index !== -1) {
          this.seatCategories[index] = res.data;
        }

        return res.data;
      } catch (error) {
        console.error(error);
        this.error = "Error updating seat category.";
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async deleteCategory(id: number) {
      this.loading = true;
      this.error = null;

      try {
        await SeatCategoryService.delete(id);

        this.seatCategories = this.seatCategories.filter(
          (c) => c.id !== id
        );

        // لو كانت selected category اتحذفت
        if (this.selectedCategory === id) {
          this.selectedCategory = null;
        }

      } catch (error) {
        console.error(error);
        this.error = "Error deleting seat category.";
        throw error;
      } finally {
        this.loading = false;
      }
    },

    // 👇 Helper مهم جدًا للـ UI
    setSelectedCategory(id: number | null) {
      this.selectedCategory = id;
    },

    clearSelection() {
      this.selectedCategory = null;
    },
  },
});