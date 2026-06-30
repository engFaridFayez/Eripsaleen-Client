<script setup lang="ts">
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

import { useSectionStore } from "@/stores/adminStores/section";

const route = useRoute();
const router = useRouter();

const sectionStore = useSectionStore();

onMounted(async () => {
  await sectionStore.getSection(Number(route.params.id));
});
</script>

<template>
  <div
    v-if="sectionStore.section"
    class="max-w-3xl mx-auto rounded-2xl bg-[#161122] p-8 shadow-lg"
  >
    <div class="mb-8 flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-white">
          Section Details
        </h1>

        <p class="mt-2 text-gray-400">
          View section information.
        </p>
      </div>

      <button
        @click="router.back()"
        class="rounded-xl border border-gray-600 px-5 py-2 text-gray-300 transition hover:bg-gray-700"
      >
        Back
      </button>
    </div>

    <div class="space-y-6">

      <div>
        <label class="mb-2 block text-sm text-gray-400">
          ID
        </label>

        <div class="rounded-xl bg-[#211836] px-4 py-3 text-white">
          {{ sectionStore.section.id }}
        </div>
      </div>

      <div>
        <label class="mb-2 block text-sm text-gray-400">
          Section Name
        </label>

        <div class="rounded-xl bg-[#211836] px-4 py-3 text-white">
          {{ sectionStore.section.name }}
        </div>
      </div>

      <div>
        <label class="mb-2 block text-sm text-gray-400">
          Theater
        </label>

        <div class="rounded-xl bg-[#211836] px-4 py-3 text-white">
          {{ sectionStore.section.theater_name }}
        </div>
      </div>

    </div>

    <div class="mt-8 flex justify-end gap-4">
      <button
        @click="router.push(`/admin/sections/${sectionStore.section.id}/edit`)"
        class="rounded-xl bg-[#5E3AA5] px-6 py-3 font-semibold text-white transition hover:bg-[#6D46BB]"
      >
        Edit Section
      </button>
    </div>
  </div>

  <div
    v-else
    class="text-center text-gray-400"
  >
    Loading...
  </div>
</template>

