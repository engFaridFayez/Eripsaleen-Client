<script setup lang="ts">
import { reactive, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import Swal from "sweetalert2";

import { useSectionStore } from "@/stores/adminStores/section";
import { useTheaterStore } from "@/stores/adminStores/theater";

const route = useRoute();
const router = useRouter();

const sectionStore = useSectionStore();
const theaterStore = useTheaterStore();

const form = reactive({
  theater: 0,
  name: "",
});

onMounted(async () => {
  await theaterStore.getTheaters();
  await sectionStore.getSection(Number(route.params.id));
  console.log("Section:", sectionStore.section);

  if (sectionStore.section) {
    form.theater = sectionStore.section.theater;
    form.name = sectionStore.section.name;
  }
});

async function updateSection() {
  try {
    await sectionStore.updateSection(Number(route.params.id), form);

    Swal.fire({
      icon: "success",
      title: "Updated",
      text: "Section updated successfully.",
      timer: 1500,
      showConfirmButton: false,
    });

    router.push("/admin/sections");
  } catch {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Failed to update section.",
    });
  }
}
</script>

<template>
  <div class="max-w-3xl mx-auto rounded-2xl bg-[#161122] p-8 shadow-lg">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-white">Edit Section</h1>

      <p class="mt-2 text-gray-400">Update section information.</p>
    </div>

    <form @submit.prevent="updateSection" class="space-y-6">
      <!-- Theater -->
      <div>
        <label class="mb-2 block text-sm font-medium text-gray-300">
          Theater
        </label>

        <select
          v-model="form.theater"
          required
          class="w-full rounded-xl border border-[#2A1F45] bg-[#211836] px-4 py-3 text-white focus:border-[#7C3AED] focus:outline-none"
        >
          <option
            v-for="theater in theaterStore.theaters"
            :key="theater.id"
            :value="theater.id"
          >
            {{ theater.name }}
          </option>
        </select>
      </div>

      <!-- Name -->
      <div>
        <label class="mb-2 block text-sm font-medium text-gray-300">
          Section Name
        </label>

        <input
          v-model="form.name"
          type="text"
          required
          class="w-full rounded-xl border border-[#2A1F45] bg-[#211836] px-4 py-3 text-white placeholder:text-gray-500 focus:border-[#7C3AED] focus:outline-none"
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
          Update Section
        </button>
      </div>
    </form>
  </div>
</template>

