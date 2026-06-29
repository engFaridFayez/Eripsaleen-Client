<template>
  <div
    class="rounded-2xl border border-[#C9A84C]/20 bg-[#171324]/80 backdrop-blur-xl"
  >
    <!-- Header -->
    <div class="border-b border-[#C9A84C]/10 px-6 py-5">
      <h2 class="text-xl font-bold text-white">Quick Actions</h2>

      <p class="mt-1 text-sm text-gray-400">Frequently used shortcuts</p>
    </div>

    <!-- Actions -->

    <div class="grid grid-cols-2 gap-4 p-6">
      <RouterLink
        v-for="action in actions"
        :key="action.title"
        :to="action.to"
        class="group rounded-xl border border-[#C9A84C]/10 bg-[#20192F] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#C9A84C]/40 hover:bg-[#2A2140]"
      >
        <div
          class="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#5E3AA5] to-[#C9A84C]"
        >
          <component :is="action.icon" class="h-6 w-6 text-white" />
        </div>

        <h3 class="font-semibold text-white">
          {{ action.title }}
        </h3>

        <p class="mt-1 text-sm text-gray-400">
          {{ action.description }}
        </p>
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Building2, CalendarPlus, TicketPlus, UserPlus } from "lucide-vue-next";

const actions = [
  {
    title: "New Theater",
    description: "Create theater",
    icon: Building2,
    to: "/admin/theaters/create",
  },
  {
    title: "New Event",
    description: "Add event",
    icon: CalendarPlus,
    to: "/admin/events/create",
  },
  {
    title: "Booking",
    description: "Manage bookings",
    icon: TicketPlus,
    to: "/admin/bookings",
  },
  {
    title: "New User",
    description: "Create account",
    icon: UserPlus,
    to: "/admin/users/create",
  },
];
</script>
