<script setup lang="ts">
import { onMounted } from "vue";
import Swal from "sweetalert2";
import { useEventStore } from "@/stores/adminStores/event";

const eventStore = useEventStore();

onMounted(() => {
  eventStore.getEvents();
});

const handleDelete = async (id: number) => {
  const result = await Swal.fire({
    title: "Delete Event?",
    text: "This action cannot be undone.",
    icon: "warning",
    background: "#120E1D",
    color: "#fff",
    showCancelButton: true,
    confirmButtonText: "Delete",
    cancelButtonText: "Cancel",
    confirmButtonColor: "#dc2626",
    cancelButtonColor: "#3B324F",
  });

  if (!result.isConfirmed) return;

  try {
    await eventStore.deleteEvent(id);

    Swal.fire({
      icon: "success",
      title: "Event deleted successfully",
      background: "#120E1D",
      color: "#fff",
      timer: 1500,
      showConfirmButton: false,
    });
  } catch {
    Swal.fire({
      icon: "error",
      title: "Something went wrong",
      background: "#120E1D",
      color: "#fff",
    });
  }
};

const handleToggleBooking = async (id: number, currentlyClosed: boolean) => {
  const nextClosed = !currentlyClosed;

  const result = await Swal.fire({
    title: nextClosed ? "Close Booking?" : "Open Booking?",
    text: nextClosed
      ? "Visitors will no longer be able to book seats for this event."
      : "Visitors will be able to book seats for this event again.",
    icon: "warning",
    background: "#120E1D",
    color: "#fff",
    showCancelButton: true,
    confirmButtonText: nextClosed ? "Close Booking" : "Open Booking",
    cancelButtonText: "Cancel",
    confirmButtonColor: nextClosed ? "#dc2626" : "#16a34a",
    cancelButtonColor: "#3B324F",
  });

  if (!result.isConfirmed) return;

  try {
    await eventStore.toggleBooking(id, nextClosed);

    await Swal.fire({
      icon: "success",
      title: nextClosed
        ? "Booking closed successfully"
        : "Booking opened successfully",
      background: "#120E1D",
      color: "#fff",
      timer: 1500,
      showConfirmButton: false,
    });
  } catch {
    await Swal.fire({
      icon: "error",
      title: "Failed to update booking status",
      text: "Please try again.",
      background: "#120E1D",
      color: "#fff",
    });
  }
};
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div
      class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
    >
      <div>
        <h1 class="text-2xl font-bold text-white sm:text-3xl">Events</h1>

        <p class="mt-1 text-gray-400">Manage all theater events.</p>
      </div>

      <RouterLink
        :to="{ name: 'event-create' }"
        class="inline-block rounded-xl bg-[#C9A84C] px-5 py-3 text-center font-semibold text-[#120E1D] transition hover:opacity-90"
      >
        + New Event
      </RouterLink>
    </div>

    <!-- Table -->
    <div
      class="overflow-hidden rounded-2xl border border-[#2B223A] bg-[#1A1427]"
    >
      <div class="overflow-x-auto">
        <table class="min-w-[800px] w-full">
          <thead class="bg-[#120E1D]">
            <tr>
              <th
                class="whitespace-nowrap px-4 py-4 text-left text-sm font-semibold text-gray-300 sm:px-6"
              >
                Title
              </th>

              <th
                class="whitespace-nowrap px-4 py-4 text-left text-sm font-semibold text-gray-300 sm:px-6"
              >
                Show
              </th>

              <th
                class="whitespace-nowrap px-4 py-4 text-left text-sm font-semibold text-gray-300 sm:px-6"
              >
                Theater
              </th>

              <th
                class="whitespace-nowrap px-4 py-4 text-left text-sm font-semibold text-gray-300 sm:px-6"
              >
                Event Date
              </th>

              <th
                class="whitespace-nowrap px-4 py-4 text-center text-sm font-semibold text-gray-300 sm:px-6"
              >
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="event in eventStore.events"
              :key="event.id"
              class="border-t border-[#2B223A] hover:bg-[#231B35]"
            >
              <td class="whitespace-nowrap px-4 py-5 text-white sm:px-6">
                {{ event.title }}
              </td>

              <td class="whitespace-nowrap px-4 py-5 text-gray-300 sm:px-6">
                {{ event.show_name }}
              </td>

              <td class="whitespace-nowrap px-4 py-5 text-gray-300 sm:px-6">
                {{ event.theater_name }}
              </td>

              <td class="whitespace-nowrap px-4 py-5 text-gray-300 sm:px-6">
                {{ new Date(event.event_date).toLocaleString() }}
              </td>

              <td class="px-4 py-5 sm:px-6">
                <div class="flex flex-wrap justify-center gap-2">
                  <RouterLink
                    :to="{ name: 'event-details', params: { id: event.id } }"
                    class="whitespace-nowrap rounded-lg border border-emerald-500 px-3 py-2 text-sm text-emerald-400 hover:bg-emerald-500 hover:text-white"
                  >
                    View
                  </RouterLink>

                  <RouterLink
                    :to="{ name: 'event-edit', params: { id: event.id } }"
                    class="whitespace-nowrap rounded-lg border border-blue-500 px-3 py-2 text-sm text-blue-400 hover:bg-blue-500 hover:text-white"
                  >
                    Edit
                  </RouterLink>

                  <button
                    @click="handleDelete(event.id)"
                    class="whitespace-nowrap rounded-lg border border-red-500 px-3 py-2 text-sm text-red-400 hover:bg-red-500 hover:text-white"
                  >
                    Delete
                  </button>
                  <button
                    @click="handleToggleBooking(event.id, event.booking_closed)"
                    :class="
                      event.booking_closed
                        ? 'border-emerald-500 text-emerald-400 hover:bg-emerald-500'
                        : 'border-amber-500 text-amber-400 hover:bg-amber-500'
                    "
                    class="whitespace-nowrap rounded-lg border px-3 py-2 text-sm hover:text-white"
                  >
                    {{
                      event.booking_closed ? "Open Booking" : "Close Booking"
                    }}
                  </button>
                </div>
              </td>
            </tr>

            <tr v-if="!eventStore.loading && eventStore.events.length === 0">
              <td colspan="4" class="py-10 text-center text-gray-400">
                No events found.
              </td>
            </tr>

            <tr v-if="eventStore.loading">
              <td colspan="4" class="py-10 text-center text-gray-400">
                Loading...
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
