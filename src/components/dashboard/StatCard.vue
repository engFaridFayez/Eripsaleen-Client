<script setup lang="ts">
import { TrendingUp, TrendingDown } from "lucide-vue-next"

defineProps<{
  title: string
  value: string | number
  change: string
  icon: any
  positive: boolean
}>()
</script>

<template>
  <div
    class="group rounded-2xl border border-[#C9A84C]/15 bg-[#171324]/80 p-6 backdrop-blur-lg transition-all duration-300 hover:-translate-y-1 hover:border-[#C9A84C]/40 hover:shadow-2xl hover:shadow-purple-900/20"
  >
    <div class="flex items-center justify-between">

      <div>
        <p class="text-sm text-gray-400">
          {{ title }}
        </p>

        <h2 class="mt-2 text-4xl font-bold text-white">
          {{ value }}
        </h2>

        <p
          class="mt-4 flex items-center gap-2 text-sm"
          :class="positive ? 'text-green-400' : 'text-red-400'"
        >
          <TrendingUp v-if="positive" class="w-4 h-4" />
          <TrendingDown v-else class="w-4 h-4" />

          {{ change }}
        </p>
      </div>

      <div
        class="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#5E3AA5] to-[#C9A84C]"
      >
        <component
          :is="icon"
          class="h-8 w-8 text-white"
        />
      </div>

    </div>
  </div>
</template>

