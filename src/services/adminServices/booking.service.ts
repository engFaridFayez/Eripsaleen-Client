import api from "../api";
import type { Booking, ChangeBookingStatusRequest } from "@/types/booking";

export async function getBookings(): Promise<Booking[]> {
  const response = await api.get("/bookings/");
  return response.data;
}
export const changeBookingStatus = (
  id: number,
  data: ChangeBookingStatusRequest
) => {
  return api.patch(`/bookings/${id}/change_status/`, data);
};