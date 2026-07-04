<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";

import {
  HomeIcon,
  BuildingOffice2Icon,
  StarIcon,
  CalendarDaysIcon,
  Squares2X2Icon,
  RectangleStackIcon,
  TicketIcon,
  UsersIcon,
  Cog6ToothIcon,
  ChevronRightIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/vue/24/outline";

const route = useRoute();

const menu = [
  {
    name: "Home",
    routeName: "home",
    to: { name: "home" },
  },
  {
    name: "Dashboard",
    routeName: "dashboard",
    to: { name: "dashboard" },
    icon: HomeIcon,
  },
  {
    name: "Theaters",
    routeName: "theaters",
    to: { name: "theaters" },
    icon: BuildingOffice2Icon,
  },
  {
    name: "Shows",
    routeName: "shows",
    to: { name: "shows" },
    icon: StarIcon,
  },
  {
    name: "Events",
    routeName: "events",
    to: { name: "events" },
    icon: CalendarDaysIcon,
  },
  {
    name: "Sections",
    routeName: "sections",
    to: { name: "sections" },
    icon: Squares2X2Icon,
  },
  {
    name: "Rows",
    routeName: "rows",
    to: { name: "rows" },
    icon: Squares2X2Icon,
  },
  {
    name: "Seats",
    routeName: "seats",
    to: { name: "seats" },
    icon: RectangleStackIcon,
  },
  {
    name: "Bookings",
    routeName: "bookings",
    to: { name: "bookings" },
    icon: TicketIcon,
  },
  // {
  //   name: "Users",
  //   to: "/admin/users",
  //   icon: UsersIcon,
  // },
  // {
  //   name: "Settings",
  //   to: "/admin/settings",
  //   icon: Cog6ToothIcon,
  // },
];

const isActive = (name: string) => route.name === name;

/* Mobile-only open/close state for the sidebar drawer.
   Purely presentational — does not affect menu data or routing logic. */
const isOpen = ref(false);
</script>

<template>
  <!-- Mobile top bar with hamburger toggle -->
  <div
    class="lg:hidden sticky top-0 z-40 flex items-center justify-between h-16 px-4 border-b border-[#C9A84C]/20 bg-[#120E1D]/95 backdrop-blur-xl"
  >
    <div class="flex items-center gap-3">
      <div
        class="w-9 h-9 rounded-xl bg-gradient-to-br from-[#C9A84C] to-[#8C6B20] flex items-center justify-center text-black font-bold text-base shadow-lg shadow-yellow-700/20"
      >
        🎭
      </div>
      <h1 class="text-base font-bold tracking-wide">Theater Admin</h1>
    </div>

    <button
      class="p-2 rounded-lg hover:bg-[#1D1830] transition"
      @click="isOpen = true"
      aria-label="Open menu"
    >
      <Bars3Icon class="w-6 h-6" />
    </button>
  </div>

  <!-- Backdrop (mobile only, shown when drawer is open) -->
  <div
    v-if="isOpen"
    class="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
    @click="isOpen = false"
  ></div>

  <aside
    class="w-72 h-screen fixed lg:sticky top-0 left-0 z-50 border-r border-[#C9A84C]/20 bg-[#120E1D]/95 backdrop-blur-xl flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0"
    :class="isOpen ? 'translate-x-0' : '-translate-x-full'"
  >
    <!-- Logo -->
    <div>
      <div
        class="h-20 flex items-center gap-4 px-6 border-b border-[#C9A84C]/20"
      >
        <div
          class="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#C9A84C] to-[#8C6B20] flex items-center justify-center text-black font-bold text-xl shadow-lg shadow-yellow-700/20"
        >
          🎭
        </div>

        <div class="flex-1">
          <h1 class="text-lg font-bold tracking-wide">Theater Admin</h1>

          <p class="text-xs text-gray-400">Booking Dashboard</p>
        </div>

        <!-- Close button, mobile only -->
        <button
          class="lg:hidden p-2 rounded-lg hover:bg-[#1D1830] transition"
          @click="isOpen = false"
          aria-label="Close menu"
        >
          <XMarkIcon class="w-5 h-5" />
        </button>
      </div>

      <!-- Menu -->

      <nav
        class="mt-6 px-4 space-y-2 overflow-y-auto max-h-[calc(100vh-20rem)]"
      >
        <RouterLink
          v-for="item in menu"
          :key="item.name"
          :to="item.to"
          class="group flex items-center gap-4 rounded-2xl px-4 py-3 transition-all duration-300"
          :class="
            isActive(item.routeName)
              ? 'bg-[#5E3AA5] text-white shadow-lg shadow-purple-900/40'
              : 'hover:bg-[#1D1830]'
          "
          @click="isOpen = false"
        >
          <component
            :is="item.icon"
            class="w-6 h-6 transition group-hover:text-[#C9A84C]"
          />

          <span class="font-medium tracking-wide">
            {{ item.name }}
          </span>

          <ChevronRightIcon
            class="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition"
          />
        </RouterLink>
      </nav>
    </div>

    <!-- Bottom -->

    <div class="p-5 border-t border-[#C9A84C]/20">
      <div class="rounded-2xl bg-[#1B1628] border border-[#C9A84C]/20 p-4">
        <div class="flex items-center gap-3">
          <div
            class="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-[#C9A84C]"
          ></div>

          <div class="flex-1 min-w-0">
            <h3 class="font-semibold">Admin</h3>

            <p class="text-sm text-gray-400">System Administrator</p>
          </div>
        </div>

        <button
          class="mt-5 w-full rounded-xl bg-gradient-to-r from-[#C9A84C] to-[#E9C86B] py-3 font-semibold text-black transition hover:scale-[1.02]"
        >
          Logout
        </button>
      </div>
    </div>
  </aside>
</template>

<style scoped>
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-thumb {
  background: #c9a84c;
  border-radius: 10px;
}
</style>
