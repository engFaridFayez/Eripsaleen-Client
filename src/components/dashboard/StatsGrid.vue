<script setup lang="ts">
import StatCard from "./StatCard.vue"

import {
  Building2,
  CalendarDays,
  Ticket,
  Armchair
} from "lucide-vue-next"

const cards = [
  {
    title: "Theaters",
    value: 8,
    change: "+12%",
    positive: true,
    icon: Building2,
  },
  {
    title: "Events",
    value: 24,
    change: "+5%",
    positive: true,
    icon: CalendarDays,
  },
  {
    title: "Bookings",
    value: 932,
    change: "+18%",
    positive: true,
    icon: Ticket,
  },
  {
    title: "Seats",
    value: 4820,
    change: "-2%",
    positive: false,
    icon: Armchair,
  },
]
</script>

<template>
  <div
    class="grid gap-6 sm:grid-cols-2 xl:grid-cols-4"
  >
    <StatCard
      v-for="card in cards"
      :key="card.title"
      :title="card.title"
      :value="card.value"
      :change="card.change"
      :positive="card.positive"
      :icon="card.icon"
    />
  </div>
</template>

