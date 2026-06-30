<script setup lang="ts">
import StatsGrid from "@/components/dashboard/StatsGrid.vue";

import BookingChart from "@/components/dashboard/BookingChart.vue";
import RevenueChart from "@/components/dashboard/RevenueChart.vue";

import RecentBookings from "@/components/dashboard/RecentBookings.vue";
import UpcomingEvents from "@/components/dashboard/UpcomingEvents.vue";
import QuickActions from "@/components/dashboard/QuickActions.vue";
</script>

<template>
  <StatsGrid />

  <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
    <div class="xl:col-span-2">
      <BookingChart />
    </div>
    <RevenueChart />
  </div>

  <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
    <div class="xl:col-span-2">
      <RecentBookings />
    </div>

    <div class="space-y-6">
      <UpcomingEvents />
      <QuickActions />
    </div>
  </div>
</template>
