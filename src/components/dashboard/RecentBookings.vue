<template>
  <div
    class="rounded-2xl border border-[#C9A84C]/20 bg-[#171324]/80 backdrop-blur-xl"
  >
    <!-- Header -->
    <div
      class="flex items-center justify-between border-b border-[#C9A84C]/10 px-6 py-5"
    >
      <div>
        <h2 class="text-xl font-bold text-white">Recent Bookings</h2>

        <p class="text-sm text-gray-400">Latest reservations</p>
      </div>

      <button
        class="rounded-xl border border-[#C9A84C]/20 px-4 py-2 text-sm transition hover:bg-[#231B36]"
      >
        View All
      </button>
    </div>

    <!-- Table -->

    <div class="overflow-x-auto">
      <table class="w-full">
        <thead>
          <tr class="border-b border-[#C9A84C]/10 text-left text-gray-400">
            <th class="px-6 py-4 font-medium">Customer</th>
            <th class="px-6 py-4 font-medium">Event</th>
            <th class="px-6 py-4 font-medium">Seats</th>
            <th class="px-6 py-4 font-medium">Amount</th>
            <th class="px-6 py-4 font-medium">Status</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="booking in bookings"
            :key="booking.id"
            class="border-b border-[#C9A84C]/5 transition hover:bg-[#20192F]"
          >
            <!-- Customer -->

            <td class="px-6 py-5">
              <div class="flex items-center gap-4">
                <div
                  class="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[#5E3AA5] to-[#C9A84C] font-bold"
                >
                  {{ booking.name.charAt(0) }}
                </div>

                <div>
                  <h3 class="font-semibold">
                    {{ booking.name }}
                  </h3>

                  <p class="text-sm text-gray-400">#{{ booking.id }}</p>
                </div>
              </div>
            </td>

            <!-- Event -->

            <td class="px-6">
              {{ booking.event }}
            </td>

            <!-- Seats -->

            <td class="px-6">
              {{ booking.seats }}
            </td>

            <!-- Amount -->

            <td class="px-6 font-semibold text-[#C9A84C]">
              ${{ booking.amount }}
            </td>

            <!-- Status -->

            <td class="px-6">
              <span
                class="rounded-full px-4 py-2 text-xs font-semibold"
                :class="statusClass(booking.status)"
              >
                {{ booking.status }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
const bookings = [
  {
    id: 1021,
    name: "Mina Youssef",
    event: "Christmas Concert",
    seats: 3,
    amount: 45,
    status: "Paid",
  },
  {
    id: 1022,
    name: "Peter George",
    event: "Kids Festival",
    seats: 2,
    amount: 30,
    status: "Pending",
  },
  {
    id: 1023,
    name: "Mary Nabil",
    event: "Easter Show",
    seats: 5,
    amount: 75,
    status: "Paid",
  },
  {
    id: 1024,
    name: "John Samir",
    event: "Family Night",
    seats: 4,
    amount: 60,
    status: "Cancelled",
  },
];

const statusClass = (status: string) => {
  switch (status) {
    case "Paid":
      return "bg-green-500/20 text-green-400";

    case "Pending":
      return "bg-yellow-500/20 text-yellow-400";

    case "Cancelled":
      return "bg-red-500/20 text-red-400";

    default:
      return "bg-gray-500/20 text-gray-300";
  }
};
</script>
