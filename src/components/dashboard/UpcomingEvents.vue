<template>
  <div
    class="rounded-2xl border border-[#C9A84C]/20 bg-[#171324]/80 backdrop-blur-xl"
  >
    <!-- Header -->
    <div
      class="flex items-center justify-between border-b border-[#C9A84C]/10 px-6 py-5"
    >
      <div>
        <h2 class="text-xl font-bold text-white">Upcoming Events</h2>

        <p class="text-sm text-gray-400">Next scheduled events</p>
      </div>
    </div>

    <!-- Events -->

    <div class="space-y-5 p-6">
      <div
        v-for="event in events"
        :key="event.id"
        class="group rounded-xl border border-transparent bg-[#1E1830] p-4 transition-all duration-300 hover:border-[#C9A84C]/30 hover:bg-[#241C39]"
      >
        <div class="flex items-start gap-4">
          <!-- Date -->

          <div
            class="flex h-14 w-14 flex-col items-center justify-center rounded-xl bg-gradient-to-br from-[#5E3AA5] to-[#C9A84C]"
          >
            <span class="text-lg font-bold">
              {{ event.day }}
            </span>

            <span class="text-xs uppercase">
              {{ event.month }}
            </span>
          </div>

          <!-- Info -->

          <div class="flex-1">
            <h3 class="font-semibold text-white">
              {{ event.title }}
            </h3>

            <p class="mt-1 text-sm text-gray-400">
              {{ event.theater }}
            </p>

            <div class="mt-3 flex items-center justify-between text-sm">
              <span class="text-[#C9A84C]">
                {{ event.time }}
              </span>

              <span
                class="rounded-full bg-green-500/20 px-3 py-1 text-xs text-green-400"
              >
                {{ event.seats }} Seats Left
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const events = [
  {
    id: 1,
    title: "Christmas Concert",
    theater: "St. Mark Theater",
    day: "25",
    month: "DEC",
    time: "07:00 PM",
    seats: 42,
  },
  {
    id: 2,
    title: "Kids Festival",
    theater: "Main Hall",
    day: "14",
    month: "AUG",
    time: "05:30 PM",
    seats: 15,
  },
  {
    id: 3,
    title: "Family Night",
    theater: "St. George Theater",
    day: "30",
    month: "SEP",
    time: "08:00 PM",
    seats: 73,
  },
];
</script>
