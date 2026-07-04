<script setup lang="ts">
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useTheaterStore } from "@/stores/adminStores/theater";

const route = useRoute();
const router = useRouter();
const theaterStore = useTheaterStore();

onMounted(async () => {
  await theaterStore.getTheaterById(Number(route.params.id));
});

const goToEdit = () => {
  router.push({
    name: "theater-edit",
    params: {
      id: route.params.id,
    },
  });
};
</script>

<template>
  <div class="max-w-4xl mx-auto space-y-8">
    <!-- Loading -->
    <div
      v-if="theaterStore.loading"
      class="rounded-2xl border border-[#C9A84C]/20 bg-[#120E1D] p-10 text-center"
    >
      Loading...
    </div>

    <!-- Content -->
    <template v-else-if="theaterStore.theater">
      <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 class="text-2xl font-bold sm:text-3xl">
            {{ theaterStore.theater.name }}
          </h1>

          <p class="mt-2 text-gray-400">Theater Details</p>
        </div>

        <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
          <RouterLink
            :to="{
              name: 'seat-categories',
              params: { id: theaterStore.theater.id },
            }"
            class="rounded-xl bg-indigo-600 px-5 py-3 text-center font-semibold text-white transition hover:bg-indigo-500"
          >
            Categories
          </RouterLink>

          <button
            @click="goToEdit"
            class="rounded-xl bg-[#C9A84C] px-6 py-3 font-semibold text-black transition hover:scale-105"
          >
            Edit Theater
          </button>
        </div>
      </div>

      <div class="rounded-2xl border border-[#C9A84C]/20 bg-[#120E1D] p-5 sm:p-8">
        <div class="grid gap-6 sm:gap-8 md:grid-cols-2">
          <div>
            <p class="mb-2 text-sm text-gray-400">ID</p>

            <p class="text-xl font-semibold">
              {{ theaterStore.theater.id }}
            </p>
          </div>

          <div>
            <p class="mb-2 text-sm text-gray-400">Theater Name</p>

            <p class="text-xl font-semibold">
              {{ theaterStore.theater.name }}
            </p>
          </div>

          <div class="md:col-span-2">
            <p class="mb-2 text-sm text-gray-400">Location</p>

            <p class="text-xl font-semibold">
              {{ theaterStore.theater.location }}
            </p>
          </div>
        </div>
      </div>

      <div class="flex justify-center sm:justify-end">
        <RouterLink
          :to="{ name: 'theaters' }"
          class="w-full rounded-xl border border-[#C9A84C]/20 px-6 py-3 text-center transition hover:bg-[#1B1628] sm:w-auto"
        >
          Back to Theaters
        </RouterLink>
      </div>
    </template>
  </div>
</template>