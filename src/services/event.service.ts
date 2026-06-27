import api from "./api"
import type { Event, SeatMapResponse } from "@/types/events"

export const eventService = {
  async getEvents(): Promise<Event[]> {
    const response = await api.get("events/")
    return response.data
  },

  async getSeatMap(
    eventId: number
  ): Promise<SeatMapResponse> {
    const response = await api.get(
      `events/${eventId}/seat_map/`
    )

    return response.data
  }
}