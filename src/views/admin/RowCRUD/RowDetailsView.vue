```vue id="q8v2pz"
<script setup lang="ts">
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

import { useRowStore } from "@/stores/adminStores/row";

const route = useRoute();
const router = useRouter();

const rowStore = useRowStore();

onMounted(async () => {
  await rowStore.getRow(Number(route.params.id));
});
</script>

<template>
  <div
    v-if="rowStore.row"
    class="max-w-3xl mx-auto rounded-2xl bg-[#161122] p-8 shadow-lg"
  >
    <!-- Header -->
    <div class="mb-8 flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-white">Row Details</h1>

        <p class="mt-2 text-gray-400">View row information.</p>
      </div>

      <button
        @click="router.back()"
        class="rounded-xl border border-gray-600 px-5 py-2 text-gray-300 transition hover:bg-gray-700"
      >
        Back
      </button>
    </div>

    <!-- Details -->
    <div class="space-y-6">
      <div>
        <label class="mb-2 block text-sm text-gray-400"> ID </label>

        <div class="rounded-xl bg-[#211836] px-4 py-3 text-white">
          {{ rowStore.row.id }}
        </div>
      </div>

      <div>
        <label class="mb-2 block text-sm text-gray-400"> Section </label>

        <div class="rounded-xl bg-[#211836] px-4 py-3 text-white">
          {{ rowStore.row.section_name }}
        </div>
      </div>

      <div>
        <label class="mb-2 block text-sm text-gray-400"> Row Number </label>

        <div class="rounded-xl bg-[#211836] px-4 py-3 text-white">
          {{ rowStore.row.row_number }}
        </div>
      </div>

      <div>
        <label class="mb-2 block text-sm text-gray-400"> Seats Per Row </label>

        <div class="rounded-xl bg-[#211836] px-4 py-3 text-white">
          {{ rowStore.row.seats_per_row }}
        </div>
      </div>
    </div>

    <!-- Actions -->
    <div class="mt-8 flex justify-end gap-4">
      <button
        @click="router.push(`/admin/rows/${rowStore.row.id}/edit`)"
        class="rounded-xl bg-[#5E3AA5] px-6 py-3 font-semibold text-white transition hover:bg-[#6D46BB]"
      >
        Edit Row
      </button>
    </div>
  </div>

  <div v-else class="rounded-2xl bg-[#161122] p-8 text-center text-gray-300">
    Loading...
  </div>
</template>
```
