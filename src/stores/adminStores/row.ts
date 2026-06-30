// stores/adminStores/row.ts

import { defineStore } from "pinia";
import RowService from "@/services/adminServices/row.service";
import type { AdminRow } from "@/types/events";

export const useRowStore = defineStore("row", {
  state: () => ({
    rows: [] as AdminRow[],
    row: null as AdminRow | null,
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async getRows() {
      this.loading = true;
      this.error = null;

      try {
        const res = await RowService.getAll();
        this.rows = res.data;
      } catch (error) {
        this.error = "Error fetching rows";
        console.error(error);
      } finally {
        this.loading = false;
      }
    },

    async getRow(id: number) {
      this.loading = true;
      this.error = null;

      try {
        const res = await RowService.getById(id);
        this.row = res.data;
      } catch (error) {
        this.error = "Error fetching row";
        console.error(error);
      } finally {
        this.loading = false;
      }
    },

    async createRow(data: {
      section: number;
      row_number: string;
      seats_per_row: number;
    }) {
      this.loading = true;
      this.error = null;

      try {
        const res = await RowService.create(data);
        this.rows.push(res.data);
        return res.data;
      } catch (error) {
        this.error = "Error creating row";
        console.error(error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async updateRow(
      id: number,
      data: {
        section: number;
        row_number: string;
        seats_per_row: number;
      }
    ) {
      this.loading = true;
      this.error = null;

      try {
        const res = await RowService.update(id, data);

        const index = this.rows.findIndex((r) => r.id === id);

        if (index !== -1) {
          this.rows[index] = res.data;
        }

        this.row = res.data;

        return res.data;
      } catch (error) {
        this.error = "Error updating row";
        console.error(error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async deleteRow(id: number) {
      this.loading = true;
      this.error = null;

      try {
        await RowService.delete(id);

        this.rows = this.rows.filter((r) => r.id !== id);

        if (this.row?.id === id) {
          this.row = null;
        }
      } catch (error) {
        this.error = "Error deleting row";
        console.error(error);
        throw error;
      } finally {
        this.loading = false;
      }
    },
  },
});