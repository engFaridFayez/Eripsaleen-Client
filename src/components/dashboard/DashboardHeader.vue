<script setup lang="ts">
import { Bell, Search, Settings } from "lucide-vue-next";
</script>
<template>
  <header
    class="top-0 left-0 right-0 z-50 h-20 bg-[#120E1D]/90 backdrop-blur-xl border-b border-[#C9A84C]/20"
  >
    <div class="h-full flex items-center justify-between px-8">
      <!-- Left -->
      <div class="flex items-center gap-4">
        <div>
          <h1 class="text-2xl font-bold text-white">Dashboard</h1>

          <p class="text-sm text-gray-400">Welcome back, Admin 👋</p>
        </div>
      </div>

      <!-- Right -->
      <div class="flex items-center gap-5">
        <!-- Search -->
        <div class="relative hidden lg:block">
          <Search
            class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search..."
            class="w-80 rounded-xl border border-[#C9A84C]/20 bg-[#1B1628] py-3 pl-12 pr-4 outline-none transition focus:border-[#C9A84C]"
          />
        </div>

        <!-- Notifications -->

        <button
          class="relative h-12 w-12 rounded-xl bg-[#1B1628] border border-[#C9A84C]/20 flex items-center justify-center hover:bg-[#2B233B] transition"
        >
          <Bell class="w-5 h-5" />

          <span
            class="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500"
          ></span>
        </button>

        <!-- Settings -->

        <button
          class="h-12 w-12 rounded-xl bg-[#1B1628] border border-[#C9A84C]/20 flex items-center justify-center hover:bg-[#2B233B] transition"
        >
          <Settings class="w-5 h-5" />
        </button>

        <!-- Profile -->

        <div
          class="flex items-center gap-3 rounded-xl border border-[#C9A84C]/20 bg-[#1B1628] px-3 py-2"
        >
          <div
            class="h-12 w-12 rounded-full bg-gradient-to-br from-[#5E3AA5] to-[#C9A84C]"
          ></div>

          <div class="hidden md:block">
            <h3 class="font-semibold">Farid</h3>

            <p class="text-sm text-gray-400">Administrator</p>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
