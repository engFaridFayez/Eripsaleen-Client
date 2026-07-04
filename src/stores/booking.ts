import { defineStore } from "pinia";
import bookingService from "@/services/booking.service";

import type {
  BookingRequest,
  BookingResponse,
  Attendee,
} from "@/types/booking";
export interface SelectedSeat {
  id: number;
  seat_number: string;
  price: number;
}
interface BookingState {
  selectedSeats: SelectedSeat[];
  attendees: Attendee[];

  owner_name: string;
  phone_number: string;
  email: string;

  image: File | null;

  loading: boolean;
  success: boolean;
  message: string;
  errors: any;
}

export const useBookingStore = defineStore("booking", {
  state: (): BookingState => ({
    selectedSeats: [],
    attendees: [],

    owner_name: "",
    phone_number: "",
    email: "",

    image: null,

    loading: false,
    success: false,
    message: "",
    errors: null,
  }),

  persist: {
    pick: [
      "selectedSeats",
      "attendees",
      "owner_name",
      "phone_number",
      "email",
    ],
  },

  getters: {
    seatCount: (state) => state.selectedSeats.length,
  },

  actions: {
    toggleSeat(seat: SelectedSeat) {
      const index = this.selectedSeats.findIndex(
        s => s.id === seat.id
      );

      if (index > -1) {
        this.selectedSeats.splice(index, 1);
      } else {
        this.selectedSeats.push(seat);
      }

      this.syncAttendees();
    },

    syncAttendees() {
      this.attendees = this.selectedSeats.map((seat, index) => ({
        seat: seat.id,
        seat_name: seat.seat_number,

        person_name: this.attendees[index]?.person_name ?? "",
        national_id: this.attendees[index]?.national_id ?? "",
      }));
    },

    setImage(file: File | null) {
      this.image = file;
    },

    async submitBooking(eventId: number): Promise<BookingResponse> {
      this.loading = true;

      this.errors = null;

      try {
        const payload: BookingRequest = {
          event: eventId,

          owner_name: this.owner_name,

          attendees: this.attendees,

          phone_number: this.phone_number,

          email: this.email,

          image: this.image,
        };

        const response = await bookingService.createBooking(payload);

        this.success = true;

        this.message = response.message;

        return response;
      } catch (error: any) {
        this.errors = error.response?.data;

        throw error;
      } finally {
        this.loading = false;
      }
    },

    reset() {
      this.selectedSeats = [];

      this.selectedSeats = [];

      this.attendees = [];

      this.owner_name = "";

      this.phone_number = "";

      this.email = "";

      this.image = null;

      this.loading = false;

      this.success = false;

      this.message = "";

      this.errors = null;
    }
  },
});