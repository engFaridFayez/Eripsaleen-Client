<script setup lang="ts">
import { useRoute } from "vue-router"

import {
  HomeIcon,
  BuildingOffice2Icon,
  CalendarDaysIcon,
  Squares2X2Icon,
  RectangleStackIcon,
  TicketIcon,
  UsersIcon,
  Cog6ToothIcon,
  ChevronRightIcon,
} from "@heroicons/vue/24/outline"

const route = useRoute()

const menu = [
  {
    name: "Dashboard",
    to: "/admin",
    icon: HomeIcon,
  },
  {
    name: "Theaters",
    to: "/admin/theaters",
    icon: BuildingOffice2Icon,
  },
  {
    name: "Events",
    to: "/admin/events",
    icon: CalendarDaysIcon,
  },
  {
    name: "Sections",
    to: "/admin/sections",
    icon: Squares2X2Icon,
  },
  {
    name: "Seats",
    to: "/admin/seats",
    icon: RectangleStackIcon,
  },
  {
    name: "Bookings",
    to: "/admin/bookings",
    icon: TicketIcon,
  },
  {
    name: "Users",
    to: "/admin/users",
    icon: UsersIcon,
  },
  {
    name: "Settings",
    to: "/admin/settings",
    icon: Cog6ToothIcon,
  },
]

const isActive = (path: string) => route.path === path
</script>

<template>
  <aside
    class="w-72 h-screen sticky top-0 border-r border-[#C9A84C]/20 bg-[#120E1D]/95 backdrop-blur-xl flex flex-col justify-between"
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

        <div>
          <h1 class="text-lg font-bold tracking-wide">
            Theater Admin
          </h1>

          <p class="text-xs text-gray-400">
            Booking Dashboard
          </p>
        </div>
      </div>

      <!-- Menu -->

      <nav class="mt-6 px-4 space-y-2">

        <RouterLink
          v-for="item in menu"
          :key="item.name"
          :to="item.to"
          class="group flex items-center gap-4 rounded-2xl px-4 py-3 transition-all duration-300"
          :class="
            isActive(item.to)
              ? 'bg-[#5E3AA5] text-white shadow-lg shadow-purple-900/40'
              : 'hover:bg-[#1D1830]'
          "
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

    <div
      class="p-5 border-t border-[#C9A84C]/20"
    >
      <div
        class="rounded-2xl bg-[#1B1628] border border-[#C9A84C]/20 p-4"
      >

        <div class="flex items-center gap-3">

          <div
            class="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-[#C9A84C]"
          ></div>

          <div class="flex-1">

            <h3 class="font-semibold">
              Admin
            </h3>

            <p class="text-sm text-gray-400">
              System Administrator
            </p>

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

.router-link-active {
  background: #5E3AA5;
}

::-webkit-scrollbar{
    width:6px;
}

::-webkit-scrollbar-thumb{
    background:#C9A84C;
    border-radius:10px;
}

</style>