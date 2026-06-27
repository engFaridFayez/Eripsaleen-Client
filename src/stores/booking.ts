import { defineStore } from "pinia";
import bookingService from "@/services/booking.service";

import type {
  BookingRequest,
  BookingResponse,
  Attendee
} from "@/types/booking";

interface BookingState {

  selectedSeats: number[];

  attendees: Attendee[];

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

    phone_number: "",

    email: "",

    image: null,

    loading: false,

    success: false,

    message: "",

    errors: null

  }),

  getters: {

    seatCount: (state) => state.selectedSeats.length

  },

  actions: {

    toggleSeat(seatId: number) {

      const index = this.selectedSeats.indexOf(seatId);

      if (index > -1) {

        this.selectedSeats.splice(index, 1);

      } else {

        this.selectedSeats.push(seatId);

      }

      this.syncAttendees();

    },

    syncAttendees() {

      while (this.attendees.length < this.selectedSeats.length) {

        this.attendees.push({
          name: ""
        });

      }

      while (this.attendees.length > this.selectedSeats.length) {

        this.attendees.pop();

      }

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

          attendees: this.attendees,

          seats: this.selectedSeats,

          phone_number: this.phone_number,

          email: this.email,

          image: this.image

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

      this.attendees = [];

      this.phone_number = "";

      this.email = "";

      this.image = null;

      this.loading = false;

      this.success = false;

      this.message = "";

      this.errors = null;

    }

  }

});