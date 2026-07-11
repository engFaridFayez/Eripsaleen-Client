import { defineStore } from "pinia";
import type { Show, ShowDetail } from "@/types/show";

import { AdminShowService } from "@/services/adminServices/show.service";

export const useShowStore = defineStore("admin-show", {
  state: () => ({
    shows: [] as Show[],
    show: null as ShowDetail | null,
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async getShows() {
      this.loading = true;
      this.error = null;

      try {
        const res = await AdminShowService.getAll();
        this.shows = res.data;
      } catch (error) {
        this.error = "Error fetching shows";
        console.error(error);
      } finally {
        this.loading = false;
      }
    },

    async getShowById(id: number) {
      this.loading = true;
      this.error = null;

      try {
        const res = await AdminShowService.getById(id);
        this.show = res.data;
      } catch (error) {
        this.error = "Error fetching show";
        console.error(error);
      } finally {
        this.loading = false;
      }
    },

    async createShow(data: FormData) {
      this.loading = true;
      this.error = null;

      try {
        const res = await AdminShowService.create(data);
        this.shows.push(res.data);
      } catch (error) {
        this.error = "Error creating show";
      } finally {
        this.loading = false;
      }
    },

    async updateShow(id: number, data: FormData) {
      this.loading = true;
      this.error = null;

      try {
        const res = await AdminShowService.update(id, data);

        const index = this.shows.findIndex(show => show.id === id);

        if (index !== -1) {
          this.shows[index] = res.data;
        }

        this.show = res.data;
      } catch (error: any) {
        console.error(error);

        this.error = "Error updating show";
      } finally {
        this.loading = false;
      }
    },

    async deleteShow(id: number) {
      this.loading = true;
      this.error = null;

      try {
        await AdminShowService.delete(id);

        this.shows = this.shows.filter(
          show => show.id !== id
        );

        if (this.show?.id === id) {
          this.show = null;
        }
      } catch (error) {
        this.error = "Error deleting show";
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
  },
});