<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { storeToRefs } from "pinia";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { useAdminBookingStore } from "@/stores/adminStores/booking";
import { useEventStore } from "@/stores/adminStores/event";
const eventStore = useEventStore();
const { events } = storeToRefs(eventStore);
const selectedEvent = ref("");

const bookingStore = useAdminBookingStore();
const confirmBooking = async (id: number) => {
  await bookingStore.updateBookingStatus(id, "confirmed");
};

const handleDeleteBooking = async (id: number) => {
  if (!confirm("هل تريد حذف هذا الحجز؟")) return;

  await bookingStore.deleteBooking(id);
};

const cancelBooking = async (id: number) => {
  if (!confirm("هل تريد إلغاء هذا الحجز؟")) return;

  await bookingStore.updateBookingStatus(id, "cancelled");
};
function exportToExcel() {
  const event = events.value.find(
    (e: any) => e.id === Number(selectedEvent.value),
  );

  const eventName =
    event?.title?.replace(/[\\/:*?"<>|]/g, "_").trim() || "All Events";

  const rows: any[] = [];

  filteredBookings.value.forEach((booking: any) => {
    booking.seats.forEach((seat: any) => {
      rows.push({
        "Booking ID": booking.id,

        "Owner Name": booking.owner_name,

        Phone: booking.phone_number,

        Email: booking.email,

        Attendee: seat.person_name,

        "National ID": seat.national_id,

        Section: seat.section,

        Row: seat.row,

        Seat: seat.seat_name,

        "Seat Price": seat.price,

        "Total Booking Price": booking.total_price,

        Event: booking.event_name,

        Theater: booking.theater_name,

        "Booking Date": formatDate(booking.created_at),
      });
    });
  });

  const worksheet = XLSX.utils.json_to_sheet(rows);

  worksheet["!cols"] = [
    { wch: 10 },
    { wch: 25 },
    { wch: 18 },
    { wch: 25 },
    { wch: 25 },
    { wch: 20 },
    { wch: 15 },
    { wch: 10 },
    { wch: 10 },
    { wch: 18 },
    { wch: 12 },
    { wch: 15 },
    { wch: 30 },
    { wch: 20 },
    { wch: 22 },
  ];

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Bookings");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const file = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
  });

  saveAs(file, `Bookings-${eventName}.xlsx`);
}
const { bookings, loading } = storeToRefs(bookingStore);

const search = ref("");

const selectedBooking = ref<any | null>(null);

const getStatusLabel = (status: string) => {
  switch (status) {
    case "pending":
      return "Pending Payment";

    case "confirmed":
      return "Confirmed";

    case "cancelled":
      return "Cancelled";

    default:
      return status;
  }
};

onMounted(async () => {
  await Promise.all([bookingStore.fetchBookings(), eventStore.getEvents()]);
});

const filteredBookings = computed(() => {
  let data = bookings.value;

  if (selectedEvent.value) {
    data = data.filter((booking: any) => booking.event == selectedEvent.value);
  }

  if (search.value.trim()) {
    const keyword = search.value.toLowerCase();

    data = data.filter((booking: any) => {
      return (
        booking.owner_name?.toLowerCase().includes(keyword) ||
        booking.phone_number?.toLowerCase().includes(keyword) ||
        booking.email?.toLowerCase().includes(keyword) ||
        booking.event_name?.toLowerCase().includes(keyword) ||
        booking.seats.some(
          (seat: any) =>
            seat.person_name.toLowerCase().includes(keyword) ||
            seat.national_id.includes(keyword) ||
            seat.section.toLowerCase().includes(keyword) ||
            seat.seat_name.toLowerCase().includes(keyword),
        )
      );
    });
  }

  return data;
});

function openBooking(booking: any) {
  selectedBooking.value = booking;
}

function closeBooking() {
  selectedBooking.value = null;
}

const totalBookings = computed(() => filteredBookings.value.length);

const totalCustomers = computed(() => {
  const unique = new Set(
    filteredBookings.value.map((b: any) => b.phone_number || b.email),
  );

  return unique.size;
});

const totalRevenue = computed(() => {
  return filteredBookings.value.reduce((sum: number, booking: any) => {
    return sum + Number(booking.total_price ?? 0);
  }, 0);
});

function formatDate(date: string) {
  return new Date(date).toLocaleString();
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div
      class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
    >
      <div>
        <h1 class="text-2xl font-bold text-white sm:text-3xl">
          Booking Management
        </h1>

        <p class="mt-1 text-sm text-gray-400">
          View and manage all customer bookings.
        </p>
      </div>

      <button
        @click="exportToExcel"
        class="rounded-xl bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-500 sm:w-auto"
      >
        Export to Excel
      </button>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 gap-5 sm:grid-cols-3">
      <div
        class="rounded-2xl border border-gray-800 bg-[#151221] p-5 shadow-sm sm:p-6"
      >
        <div class="text-sm text-gray-400">Total Bookings</div>

        <div class="mt-2 text-2xl font-bold text-white sm:text-3xl">
          {{ totalBookings }}
        </div>
      </div>

      <div
        class="rounded-2xl border border-gray-800 bg-[#151221] p-5 shadow-sm sm:p-6"
      >
        <div class="text-sm text-gray-400">Total Customers</div>

        <div class="mt-2 text-2xl font-bold text-white sm:text-3xl">
          {{ totalCustomers }}
        </div>
      </div>

      <div
        class="rounded-2xl border border-gray-800 bg-[#151221] p-5 shadow-sm sm:p-6"
      >
        <div class="text-sm text-gray-400">Revenue</div>

        <div class="mt-2 text-2xl font-bold text-yellow-400 sm:text-3xl">
          {{ totalRevenue }} EGP
        </div>
      </div>
    </div>

    <!-- Search + Filter -->
    <div class="flex flex-col gap-4 sm:flex-row sm:items-stretch">
      <div class="flex-1 rounded-2xl border border-gray-800 bg-[#151221] p-5">
        <input
          v-model="search"
          type="text"
          placeholder="Search by customer, phone, email, event..."
          class="w-full rounded-xl border border-gray-700 bg-[#0F0D18] px-4 py-3 text-white outline-none focus:border-yellow-500"
        />
      </div>

      <select
        v-model="selectedEvent"
        class="w-full rounded-xl border border-gray-700 bg-[#0F0D18] px-4 py-3 text-white sm:w-64"
      >
        <option value="">All Events</option>

        <option v-for="event in events" :key="event.id" :value="event.id">
          {{ event.title }}
        </option>
      </select>
    </div>

    <!-- Table -->
    <div
      class="overflow-hidden rounded-2xl border border-gray-800 bg-[#151221]"
    >
      <div class="overflow-x-auto">
        <table class="min-w-[960px] w-full">
          <thead class="bg-[#0F0D18]">
            <tr>
              <th
                class="whitespace-nowrap px-5 py-4 text-left text-xs uppercase text-gray-400"
              >
                Owner
              </th>

              <th
                class="whitespace-nowrap px-5 py-4 text-left text-xs uppercase text-gray-400"
              >
                Event
              </th>

              <th
                class="whitespace-nowrap px-5 py-4 text-left text-xs uppercase text-gray-400"
              >
                Seats
              </th>

              <th
                class="whitespace-nowrap px-5 py-4 text-left text-xs uppercase text-gray-400"
              >
                Phone
              </th>

              <th
                class="whitespace-nowrap px-5 py-4 text-left text-xs uppercase text-gray-400"
              >
                Date
              </th>
              <th
                class="whitespace-nowrap px-5 py-4 text-left text-xs uppercase text-gray-400"
              >
                Status
              </th>

              <th
                class="whitespace-nowrap px-5 py-4 text-center text-xs uppercase text-gray-400"
              >
                Action
              </th>
            </tr>
          </thead>

          <tbody v-if="!loading">
            <tr
              v-for="booking in filteredBookings"
              :key="booking.id"
              class="border-t border-gray-800 hover:bg-[#1A1728]"
            >
              <td class="whitespace-nowrap px-5 py-4">
                <div class="font-semibold text-white">
                  {{ booking.owner_name }}
                </div>

                <div class="text-xs text-gray-400">
                  {{ booking.email }}
                </div>
              </td>

              <td class="whitespace-nowrap px-5 py-4">
                <div class="font-medium text-white">
                  {{ booking.event_name }}
                </div>

                <div class="text-xs text-gray-400">
                  {{ booking.theater_name }}
                </div>
              </td>

              <td class="whitespace-nowrap px-5 py-4">
                <div class="font-medium text-white">
                  {{ booking.seats_count }} Seats
                </div>
              </td>

              <td class="whitespace-nowrap px-5 py-4 text-gray-300">
                {{ booking.phone_number }}
              </td>

              <td class="whitespace-nowrap px-5 py-4 text-gray-300">
                {{ formatDate(booking.created_at) }}
              </td>
              <td class="whitespace-nowrap px-5 py-4 text-gray-300">
                <span
                  :class="{
                    'bg-yellow-500 text-black': booking.status === 'pending',
                    'bg-green-600 text-white': booking.status === 'confirmed',
                    'bg-red-600 text-white': booking.status === 'cancelled',
                  }"
                  class="inline-block rounded-full px-3 py-1 text-xs font-semibold"
                >
                  {{ getStatusLabel(booking.status) }}
                </span>
              </td>

              <td class="px-5 py-4 text-center">
                <div class="flex flex-wrap justify-center gap-2">
                  <button
                    @click="openBooking(booking)"
                    class="whitespace-nowrap rounded-lg bg-yellow-500 px-4 py-2 text-sm font-semibold text-black transition hover:bg-yellow-400"
                  >
                    Details
                  </button>
                  <button
                    v-if="booking.status === 'cancelled'"
                    @click="handleDeleteBooking(booking.id)"
                    class="whitespace-nowrap rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
                  >
                    Delete
                  </button>
                  <button
                    v-if="booking.status === 'pending'"
                    class="whitespace-nowrap rounded bg-green-600 px-3 py-1 text-white hover:bg-green-500"
                    @click="confirmBooking(booking.id)"
                  >
                    Confirm
                  </button>

                  <button
                    v-if="booking.status !== 'cancelled'"
                    class="whitespace-nowrap rounded bg-red-600 px-3 py-1 text-white hover:bg-red-500"
                    @click="cancelBooking(booking.id)"
                  >
                    Cancel
                  </button>
                </div>
              </td>
            </tr>

            <tr v-if="filteredBookings.length === 0">
              <td colspan="7" class="py-10 text-center text-gray-500">
                No bookings found.
              </td>
            </tr>
          </tbody>

          <tbody v-else>
            <tr>
              <td colspan="7" class="py-10 text-center text-gray-400">
                Loading bookings...
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div
      v-if="selectedBooking"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-3 sm:p-6"
    >
      <div
        class="max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-2xl bg-[#151221] shadow-2xl"
      >
        <!-- Header -->
        <div
          class="flex items-center justify-between border-b border-gray-800 px-4 py-4 sm:px-8 sm:py-5"
        >
          <div>
            <h2 class="text-xl font-bold text-white sm:text-2xl">
              Booking Details
            </h2>

            <p class="mt-1 text-sm text-gray-400">#{{ selectedBooking.id }}</p>
          </div>

          <button
            @click="closeBooking"
            class="text-2xl text-gray-400 transition hover:text-white"
          >
            ✕
          </button>
        </div>

        <div class="space-y-8 p-4 sm:p-8">
          <!-- Booking Information -->
          <div>
            <h3 class="mb-4 text-lg font-semibold text-yellow-400">
              Booking Information
            </h3>

            <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <div class="text-xs uppercase text-gray-500">Owner Name</div>

                <div class="mt-1 text-white">
                  {{ selectedBooking.owner_name }}
                </div>
              </div>

              <div>
                <div class="text-xs uppercase text-gray-500">Phone</div>

                <div class="mt-1 text-white">
                  {{ selectedBooking.phone_number }}
                </div>
              </div>

              <div>
                <div class="text-xs uppercase text-gray-500">Email</div>

                <div class="mt-1 text-white">
                  {{ selectedBooking.email || "-" }}
                </div>
              </div>

              <div>
                <div class="text-xs uppercase text-gray-500">Event</div>

                <div class="mt-1 text-white">
                  {{ selectedBooking.event_name }}
                </div>
              </div>

              <div>
                <div class="text-xs uppercase text-gray-500">Theater</div>

                <div class="mt-1 text-white">
                  {{ selectedBooking.theater_name }}
                </div>
              </div>

              <div>
                <div class="text-xs uppercase text-gray-500">Booking Date</div>

                <div class="mt-1 text-white">
                  {{ formatDate(selectedBooking.created_at) }}
                </div>
              </div>

              <div>
                <div class="text-xs uppercase text-gray-500">Seats Count</div>

                <div class="mt-1 text-white">
                  {{ selectedBooking.seats_count }}
                </div>
              </div>

              <div>
                <div class="text-xs uppercase text-gray-500">Total Price</div>

                <div class="mt-1 font-bold text-yellow-400">
                  {{ selectedBooking.total_price }} EGP
                </div>
              </div>
            </div>
          </div>

          <!-- Attendees -->
          <div>
            <h3 class="mb-4 text-lg font-semibold text-yellow-400">
              Attendees
            </h3>

            <div class="overflow-hidden rounded-xl border border-gray-700">
              <div class="overflow-x-auto">
                <table class="min-w-[640px] w-full">
                  <thead class="bg-[#0F0D18]">
                    <tr>
                      <th
                        class="whitespace-nowrap px-4 py-3 text-left text-xs text-gray-400"
                      >
                        Name
                      </th>

                      <th
                        class="whitespace-nowrap px-4 py-3 text-left text-xs text-gray-400"
                      >
                        National ID
                      </th>

                      <th
                        class="whitespace-nowrap px-4 py-3 text-left text-xs text-gray-400"
                      >
                        Section
                      </th>

                      <th
                        class="whitespace-nowrap px-4 py-3 text-left text-xs text-gray-400"
                      >
                        Row
                      </th>

                      <th
                        class="whitespace-nowrap px-4 py-3 text-left text-xs text-gray-400"
                      >
                        Seat
                      </th>

                      <th
                        class="whitespace-nowrap px-4 py-3 text-left text-xs text-gray-400"
                      >
                        Price
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr
                      v-for="seat in selectedBooking.seats"
                      :key="seat.id"
                      class="border-t border-gray-800"
                    >
                      <td class="whitespace-nowrap px-4 py-3 text-white">
                        {{ seat.person_name }}
                      </td>

                      <td class="whitespace-nowrap px-4 py-3 text-gray-300">
                        {{ seat.national_id }}
                      </td>

                      <td class="whitespace-nowrap px-4 py-3 text-gray-300">
                        {{ seat.section }}
                      </td>

                      <td class="whitespace-nowrap px-4 py-3 text-gray-300">
                        {{ seat.row }}
                      </td>

                      <td class="whitespace-nowrap px-4 py-3 text-gray-300">
                        {{ seat.seat_name }}
                      </td>

                      <td
                        class="whitespace-nowrap px-4 py-3 font-semibold text-yellow-400"
                      >
                        {{ seat.price }} EGP
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- Receipt -->
          <div v-if="selectedBooking.image">
            <h3 class="mb-4 text-lg font-semibold text-yellow-400">
              Payment Receipt
            </h3>

            <img
              :src="selectedBooking.image"
              class="w-full rounded-xl border border-gray-700"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
