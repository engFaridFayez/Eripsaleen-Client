import api from "@/services/api";
import type { CreateEvent, Event } from "@/types/events";

export default {
  // Get all events
  getAll() {
    return api.get<Event[]>("/events/");
  },

  // Get single event
  getById(id: number) {
    return api.get<Event>(`/events/${id}/`);
  },

  // Create event
  create(data: CreateEvent) {
    return api.post("/events/", data);
  },

  // Update event
  update(id: number, data: Partial<Omit<Event, "id">>) {
    return api.patch(`/events/${id}/`, data);
  },

  // Delete event
  delete(id: number) {
    return api.delete(`/events/${id}/`);
  },
};