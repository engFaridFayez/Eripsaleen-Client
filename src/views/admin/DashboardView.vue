<script setup lang="ts">
import AdminSidebar from "@/components/dashboard/AdminSidebar.vue";
import DashboardHeader from "@/components/dashboard/DashboardHeader.vue";
import StatsGrid from "@/components/dashboard/StatsGrid.vue";

import BookingChart from "@/components/dashboard/BookingChart.vue";
import RevenueChart from "@/components/dashboard/RevenueChart.vue";

import RecentBookings from "@/components/dashboard/RecentBookings.vue";
import UpcomingEvents from "@/components/dashboard/UpcomingEvents.vue";
import QuickActions from "@/components/dashboard/QuickActions.vue";
</script>


<template>
  <div class="min-h-screen bg-[#0D0A14] text-white flex">
    <!-- Sidebar -->
    <AdminSidebar />
    <!-- Main -->
    <main class="flex-1 overflow-y-auto">
      <DashboardHeader />
      <section class="p-8 space-y-8">
        <!-- Stats -->
        <StatsGrid />
        <!-- Charts -->
        <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div class="xl:col-span-2">
            <BookingChart />
          </div>
          <RevenueChart />
        </div>
        <!-- Bottom -->
        <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div class="xl:col-span-2">
            <RecentBookings />
          </div>
          <div class="space-y-6">
            <UpcomingEvents />
            <QuickActions />
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

