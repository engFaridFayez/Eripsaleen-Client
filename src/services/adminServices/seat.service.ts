// services/adminServices/seat.service.ts

import api from "@/services/api";
import type { GenerateSeatsPayload } from "@/types/seatCategory";

export default {
  // Dropdowns
  getTheaters() {
    return api.get("/theaters/");
  },

  getSections(theaterId: number) {
    return api.get(`/theaters/${theaterId}/sections/`);
  },

  getRows(sectionId: number) {
    return api.get(`/sections/${sectionId}/rows/`);
  },

  getSeats(rowId: number) {
    return api.get(`/rows/${rowId}/seats/`);
  },
  generateSeats(
    rowId: number,
    data: GenerateSeatsPayload
  ) {
    return api.post(
      `/rows/${rowId}/generate_seats/`,
      data
    );
  },

  // CRUD
  getById(id: number) {
    return api.get(`/seats/${id}/`);
  },

  create(data: {
    row: number;
    seat_number: string;
  }) {
    return api.post("/seats/", data);
  },

  update(
    id: number,
    data: {
      row: number;
      seat_number: string;
    }
  ) {
    return api.put(`/seats/${id}/`, data);
  },

  delete(id: number) {
    return api.delete(`/seats/${id}/`);
  },
};