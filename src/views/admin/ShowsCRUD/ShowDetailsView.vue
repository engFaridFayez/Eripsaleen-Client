<script setup lang="ts">
import { onMounted } from "vue";
import { useRoute, RouterLink } from "vue-router";

import { useShowStore } from "@/stores/adminStores/show";

const route = useRoute();
const showStore = useShowStore();

const id = Number(route.params.id);

onMounted(async () => {
  await showStore.getShowById(id);
});
</script>

<template>
  <div
    v-if="showStore.show"
    class="space-y-8"
  >
    <!-- Header -->

    <div class="flex items-center justify-between">

      <div>
        <h1 class="text-3xl font-bold">
          {{ showStore.show.title }}
        </h1>

        <p class="mt-2 text-gray-400">
          Show Details
        </p>
      </div>

      <RouterLink
        :to="{ name: 'shows' }"
        class="rounded-xl border border-[#C9A84C]/20 px-5 py-3 hover:bg-[#1B1628]"
      >
        ← Back
      </RouterLink>

    </div>

    <!-- Show Info -->

    <div
      class="grid gap-8 rounded-2xl border border-[#C9A84C]/20 bg-[#120E1D] p-8 lg:grid-cols-3"
    >

      <!-- Cover -->

      <div>

        <img
          v-if="showStore.show.cover"
          :src="showStore.show.cover"
          class="h-[420px] w-full rounded-2xl object-cover"
        />

        <div
          v-else
          class="flex h-[420px] items-center justify-center rounded-2xl bg-[#1B1628] text-gray-500"
        >
          No Cover
        </div>

      </div>

      <!-- Details -->

      <div class="space-y-6 lg:col-span-2">

        <div>

          <h2 class="text-xl font-semibold text-[#C9A84C]">
            Title
          </h2>

          <p class="mt-2 text-lg">
            {{ showStore.show.title }}
          </p>

        </div>

        <div>

          <h2 class="text-xl font-semibold text-[#C9A84C]">
            Description
          </h2>

          <p class="mt-2 whitespace-pre-line leading-8 text-gray-300">
            {{ showStore.show.description || "No description available." }}
          </p>

        </div>

      </div>

    </div>

    <!-- Events -->

    <div
      class="rounded-2xl border border-[#C9A84C]/20 bg-[#120E1D]"
    >

      <div class="border-b border-[#C9A84C]/20 p-6">

        <h2 class="text-2xl font-bold">
          Events
        </h2>

      </div>

      <table class="w-full">

        <thead class="bg-[#1B1628]">

          <tr>

            <th class="px-6 py-4 text-left">
              Title
            </th>

            <th class="px-6 py-4 text-left">
              Theater
            </th>

            <th class="px-6 py-4 text-left">
              Event Date
            </th>

          </tr>

        </thead>

        <tbody>

          <tr
            v-for="event in showStore.show.events"
            :key="event.id"
            class="border-t border-[#C9A84C]/10"
          >

            <td class="px-6 py-4">
              {{ event.title }}
            </td>

            <td class="px-6 py-4">
              {{ event.theater }}
            </td>

            <td class="px-6 py-4">
              {{ new Date(event.event_date).toLocaleString() }}
            </td>

          </tr>

          <tr
            v-if="showStore.show.events.length === 0"
          >

            <td
              colspan="3"
              class="py-10 text-center text-gray-500"
            >
              No events available for this show.
            </td>

          </tr>

        </tbody>

      </table>

    </div>

  </div>

  <!-- Loading -->

  <div
    v-else
    class="py-20 text-center text-gray-400"
  >
    Loading...
  </div>
</template>