import { defineStore } from "pinia";
import { getBookings, changeBookingStatus, deleteBooking } from "@/services/adminServices/booking.service";
import type { Booking } from "@/types/booking";


interface BookingState {
    bookings: Booking[];
    loading: boolean;
}

export const useAdminBookingStore = defineStore("admin-bookings", {
    state: (): BookingState => ({
        bookings: [],
        loading: false,
    }),

    actions: {
        async fetchBookings() {
            this.loading = true;

            try {
                this.bookings = await getBookings();
            } finally {
                this.loading = false;
            }
        },

        async updateBookingStatus(
            id: number,
            status: "pending" | "confirmed" | "cancelled"
        ) {
            await changeBookingStatus(id, {
                status,
            });

            // إعادة تحميل البيانات بعد التعديل
            await this.fetchBookings();
        },
        async deleteBooking(id: number) {

            try {
                await deleteBooking(id);
                // إعادة تحميل البيانات بعد الحذف
                await this.fetchBookings();
            } catch (error) {
                console.error("Error deleting booking:", error);
            }
        }
    },
});