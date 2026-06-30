<script setup lang="ts">
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import Swal from "sweetalert2";

import { useEventStore } from "@/stores/adminStores/event";

const route = useRoute();
const router = useRouter();

const eventStore = useEventStore();

const id = Number(route.params.id);

onMounted(async () => {
  await eventStore.getEventById(id);

  if (!eventStore.event) {
    Swal.fire({
      icon: "error",
      title: "Event not found",
      background: "#120E1D",
      color: "#fff",
    });

    router.push({ name: "events" });
  }
});
</script>

<template>
  <div class="mx-auto max-w-4xl space-y-6">

    <!-- Header -->
    <div class="flex items-center justify-between">

      <div>
        <h1 class="text-3xl font-bold text-white">
          Event Details
        </h1>

        <p class="text-gray-400">
          View full event information
        </p>
      </div>

      <RouterLink
        :to="{ name: 'events' }"
        class="rounded-xl border border-gray-600 px-5 py-3 text-white transition hover:bg-gray-700"
      >
        Back
      </RouterLink>

    </div>

    <!-- Card -->
    <div
      v-if="eventStore.event"
      class="rounded-2xl border border-[#2B223A] bg-[#1A1427] p-8 space-y-6"
    >

      <!-- Title -->
      <div>
        <p class="text-sm text-gray-400">Title</p>
        <h2 class="text-2xl font-bold text-white">
          {{ eventStore.event.title }}
        </h2>
      </div>

      <!-- Info Grid -->
      <div class="grid grid-cols-1 gap-6 md:grid-cols-3">

        <div class="rounded-xl bg-[#120E1D] p-4">
          <p class="text-sm text-gray-400">Theater</p>
          <p class="mt-1 text-white font-semibold">
            {{ eventStore.event.theater }}
          </p>
        </div>

        <div class="rounded-xl bg-[#120E1D] p-4">
          <p class="text-sm text-gray-400">Date</p>
          <p class="mt-1 text-white font-semibold">
            {{ new Date(eventStore.event.event_date).toLocaleDateString() }}
          </p>
        </div>

        <div class="rounded-xl bg-[#120E1D] p-4">
          <p class="text-sm text-gray-400">Time</p>
          <p class="mt-1 text-white font-semibold">
            {{ new Date(eventStore.event.event_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }}
          </p>
        </div>

      </div>

      <!-- Actions -->
      <div class="flex justify-end gap-3 pt-4">

        <RouterLink
          :to="{ name: 'event-edit', params: { id: eventStore.event.id } }"
          class="rounded-xl bg-blue-600 px-5 py-3 text-white font-medium transition hover:bg-blue-700"
        >
          Edit Event
        </RouterLink>

        <RouterLink
          :to="{ name: 'events' }"
          class="rounded-xl bg-gray-700 px-5 py-3 text-white font-medium transition hover:bg-gray-600"
        >
          Close
        </RouterLink>

      </div>

    </div>

    <!-- Loading -->
    <div
      v-else
      class="text-center text-gray-400 py-20"
    >
      Loading event details...
    </div>

  </div>
</template>