<script setup lang="ts">
import { reactive, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import Swal from "sweetalert2";

import { useRowStore } from "@/stores/adminStores/row";
import { useSectionStore } from "@/stores/adminStores/section";

const route = useRoute();
const router = useRouter();

const rowStore = useRowStore();
const sectionStore = useSectionStore();

const form = reactive({
  section: 0,
  row_number: "",
  seats_per_row: 1,
});

onMounted(async () => {
  await sectionStore.getSections();
  await rowStore.getRow(Number(route.params.id));

  if (rowStore.row) {
    form.section = rowStore.row.section;
    form.row_number = rowStore.row.row_number;
    form.seats_per_row = rowStore.row.seats_per_row;
  }
});

async function updateRow() {
  try {
    await rowStore.updateRow(
      Number(route.params.id),
      form
    );

    Swal.fire({
      icon: "success",
      title: "Updated",
      text: "Row updated successfully.",
      timer: 1500,
      showConfirmButton: false,
    });

    router.push("/admin/rows");
  } catch {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Failed to update row.",
    });
  }
}
</script>

<template>
  <div class="max-w-3xl mx-auto rounded-2xl bg-[#161122] p-8 shadow-lg">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-white">
        Edit Row
      </h1>

      <p class="mt-2 text-gray-400">
        Update row information.
      </p>
    </div>

    <form @submit.prevent="updateRow" class="space-y-6">

      <!-- Section -->
      <div>
        <label class="mb-2 block text-sm font-medium text-gray-300">
          Section
        </label>

        <select
          v-model="form.section"
          required
          class="w-full rounded-xl border border-[#2A1F45] bg-[#211836] px-4 py-3 text-white focus:border-[#7C3AED] focus:outline-none"
        >
          <option
            v-for="section in sectionStore.sections"
            :key="section.id"
            :value="section.id"
          >
            {{ section.name }} - {{ section.theater_name }}
          </option>
        </select>
      </div>

      <!-- Row Number -->
      <div>
        <label class="mb-2 block text-sm font-medium text-gray-300">
          Row Number
        </label>

        <input
          v-model.number="form.row_number"
          type="text"
          placeholder="M1"
          required
          class="w-full rounded-xl border border-[#2A1F45] bg-[#211836] px-4 py-3 text-white focus:border-[#7C3AED] focus:outline-none"
        />
      </div>

      <!-- Seats Per Row -->
      <div>
        <label class="mb-2 block text-sm font-medium text-gray-300">
          Seats Per Row
        </label>

        <input
          v-model.number="form.seats_per_row"
          type="number"
          min="1"
          required
          class="w-full rounded-xl border border-[#2A1F45] bg-[#211836] px-4 py-3 text-white focus:border-[#7C3AED] focus:outline-none"
        />
      </div>

      <!-- Buttons -->
      <div class="flex justify-end gap-4 pt-4">
        <button
          type="button"
          @click="router.back()"
          class="rounded-xl border border-gray-600 px-6 py-3 text-gray-300 transition hover:bg-gray-700"
        >
          Cancel
        </button>

        <button
          type="submit"
          class="rounded-xl bg-[#5E3AA5] px-6 py-3 font-semibold text-white transition hover:bg-[#6D46BB]"
        >
          Update Row
        </button>
      </div>

    </form>
  </div>
</template>
