// stores/adminStores/section.ts

import { defineStore } from "pinia";
import SectionService from "@/services/adminServices/section.service";
import type { AdminSection } from "@/types/events";

export const useSectionStore = defineStore("section", {
  state: () => ({
    sections: [] as AdminSection[],
    section: null as AdminSection | null,
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async getSections() {
      this.loading = true;
      this.error = null;

      try {
        const res = await SectionService.getAll();
        this.sections = res.data;
      } catch (error) {
        this.error = "Error fetching sections";
        console.error(error);
      } finally {
        this.loading = false;
      }
    },

    async getSection(id: number) {
      this.loading = true;
      this.error = null;

      try {
        const res = await SectionService.getById(id);
        this.section = res.data;
      } catch (error) {
        this.error = "Error fetching section";
        console.error(error);
      } finally {
        this.loading = false;
      }
    },

    async createSection(data: {
      theater: number;
      name: string;
    }) {
      this.loading = true;
      this.error = null;

      try {
        const res = await SectionService.create(data);
        this.sections.push(res.data);
        return res.data;
      } catch (error) {
        this.error = "Error creating section";
        console.error(error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async updateSection(
      id: number,
      data: {
        theater: number;
        name: string;
      }
    ) {
      this.loading = true;
      this.error = null;

      try {
        const res = await SectionService.update(id, data);

        const index = this.sections.findIndex((s) => s.id === id);
        if (index !== -1) {
          this.sections[index] = res.data;
        }

        this.section = res.data;

        return res.data;
      } catch (error) {
        this.error = "Error updating section";
        console.error(error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async deleteSection(id: number) {
      this.loading = true;
      this.error = null;

      try {
        await SectionService.delete(id);

        this.sections = this.sections.filter((s) => s.id !== id);

        if (this.section?.id === id) {
          this.section = null;
        }
      } catch (error) {
        this.error = "Error deleting section";
        console.error(error);
        throw error;
      } finally {
        this.loading = false;
      }
    },
  },
});