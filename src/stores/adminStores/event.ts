import { defineStore } from "pinia";
import type { CreateEvent, Event } from "@/types/events";

import EventService from "@/services/adminServices/event.service";

export const useEventStore = defineStore("event", {
  state: () => ({
    events: [] as Event[],
    event: null as Event | null,
    loading: false,
    error: null as string | null,
  }),

  getters: {
    findEventById: (state) => (id: number) => {
      return state.events.find((event) => event.id === id) || null;
    },
  },

  actions: {
    async getEvents() {
      this.loading = true;
      this.error = null;

      try {
        const res = await EventService.getAll();
        this.events = res.data;
      } catch (error) {
        this.error = "Failed to fetch events.";
        console.error(error);
      } finally {
        this.loading = false;
      }
    },

    async getEventById(id: number) {
      this.loading = true;

      try {
        const res = await EventService.getById(id);

        this.event = res.data;

      } catch (e) {
        console.error(e);
      } finally {
        this.loading = false;
      }
    },

    async createEvent(data: CreateEvent) {
      this.loading = true;
      this.error = null;

      try {
        const res = await EventService.create(data);
        this.events.push(res.data);
        return res.data;
      } catch (error) {
        this.error = "Failed to create event.";
        console.error(error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async updateEvent(id: number, data: Partial<Omit<Event, "id">>) {
      this.loading = true;
      this.error = null;

      try {
        const res = await EventService.update(id, data);

        const index = this.events.findIndex((event) => event.id === id);

        if (index !== -1) {
          this.events[index] = res.data;
        }

        this.event = res.data;

        return res.data;
      } catch (error) {
        this.error = "Failed to update event.";
        console.error(error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async deleteEvent(id: number) {
      this.loading = true;
      this.error = null;

      try {
        await EventService.delete(id);

        this.events = this.events.filter((event) => event.id !== id);
      } catch (error) {
        this.error = "Failed to delete event.";
        console.error(error);
        throw error;
      } finally {
        this.loading = false;
      }
    },
  },
});