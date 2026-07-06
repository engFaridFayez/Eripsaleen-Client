<script setup lang="ts">
import AdminSidebar from "@/components/dashboard/AdminSidebar.vue";
import DashboardHeader from "@/components/dashboard/DashboardHeader.vue";
import { RouterView } from "vue-router";
</script>


<template>
  <div class="min-h-screen bg-[#0D0A14] text-white flex flex-col lg:flex-row">
    <AdminSidebar />

    <main class="flex-1 min-w-0 overflow-y-auto overflow-x-hidden">
      <DashboardHeader />

      <section class="p-4 sm:p-6 lg:p-8">
        <RouterView />
      </section>
    </main>
  </div>
</template>