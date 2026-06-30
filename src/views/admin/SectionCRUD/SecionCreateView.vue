<script setup lang="ts">
import { reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";

import { useSectionStore } from "@/stores/adminStores/section";
import { useTheaterStore } from "@/stores/adminStores/theater";

const router = useRouter();

const sectionStore = useSectionStore();
const theaterStore = useTheaterStore();

const form = reactive({
  theater: 0,
  name: "",
});

onMounted(() => {
  theaterStore.getTheaters();
});

async function createSection() {
  try {
    await sectionStore.createSection(form);

    Swal.fire({
      icon: "success",
      title: "Success",
      text: "Section created successfully.",
      timer: 1500,
      showConfirmButton: false,
    });

    router.push("/admin/sections");
  } catch {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Failed to create section.",
    });
  }
}
</script>

<template>
  <div class="max-w-3xl mx-auto rounded-2xl bg-[#161122] p-8 shadow-lg">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-white">Create Section</h1>

      <p class="mt-2 text-gray-400">Add a new theater section.</p>
    </div>

    <form @submit.prevent="createSection" class="space-y-6">
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
          <option :value="0" disabled>Select Theater</option>

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
          placeholder="VIP"
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
          Create Section
        </button>
      </div>
    </form>
  </div>
</template>
