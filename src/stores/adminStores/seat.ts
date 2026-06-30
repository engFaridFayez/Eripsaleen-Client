import { defineStore } from "pinia";

import SeatService from "@/services/adminServices/seat.service";

import type { Theater } from "@/types/theater";
import type { AdminSection, AdminRow, AdminSeat } from "@/types/events";
import type { CreateSeatPayload, GenerateSeatsPayload } from "@/types/seatCategory";

export const useSeatStore = defineStore("seat", {
  state: () => ({
    theaters: [] as Theater[],
    sections: [] as AdminSection[],
    rows: [] as AdminRow[],
    seats: [] as AdminSeat[],

    selectedTheater: null as number | null,
    selectedSection: null as number | null,
    selectedRow: null as number | null,

    seat: null as AdminSeat | null,

    loading: false,
    error: null as string | null,
  }),

  actions: {
    async getTheaters() {
      this.loading = true;

      try {
        const res = await SeatService.getTheaters();
        this.theaters = res.data;
      } finally {
        this.loading = false;
      }
    },

    async generateSeats(
      rowId: number,
      data: GenerateSeatsPayload
    ) {
      const res = await SeatService.generateSeats(rowId, data);

      return res.data;
    },

    async getSections(theaterId: number) {
      this.loading = true;

      try {
        this.selectedTheater = theaterId;

        this.selectedSection = null;
        this.selectedRow = null;

        this.rows = [];
        this.seats = [];

        const res = await SeatService.getSections(theaterId);
        this.sections = res.data;
      } finally {
        this.loading = false;
      }
    },

    async getRows(sectionId: number) {
      this.loading = true;

      try {
        this.selectedSection = sectionId;

        this.selectedRow = null;
        this.seats = [];

        const res = await SeatService.getRows(sectionId);
        this.rows = res.data;
      } finally {
        this.loading = false;
      }
    },

    async getSeats(rowId: number) {
      this.loading = true;

      try {
        this.selectedRow = rowId;

        const res = await SeatService.getSeats(rowId);
        this.seats = res.data;
      } finally {
        this.loading = false;
      }
    },

    async getSeat(id: number) {
      const res = await SeatService.getById(id);
      this.seat = res.data;
    },

    async createSeat(data: CreateSeatPayload) {
      const res = await SeatService.create(data);

      this.seats.push(res.data);

      return res.data;
    },

    async updateSeat(
      id: number,
      data: {
        row: number;
        seat_number: string;
      }
    ) {
      const res = await SeatService.update(id, data);

      const index = this.seats.findIndex((s) => s.id === id);

      if (index !== -1) {
        this.seats[index] = res.data;
      }

      this.seat = res.data;

      return res.data;
    },

    async deleteSeat(id: number) {
      await SeatService.delete(id);

      this.seats = this.seats.filter((s) => s.id !== id);

      if (this.seat?.id === id) {
        this.seat = null;
      }
    },
  },
});