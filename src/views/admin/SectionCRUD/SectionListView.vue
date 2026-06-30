<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";

import { useSectionStore } from "@/stores/adminStores/section";

const router = useRouter();
const sectionStore = useSectionStore();

onMounted(() => {
  sectionStore.getSections();
});

async function deleteSection(id: number) {
  const result = await Swal.fire({
    title: "Delete Section?",
    text: "You won't be able to undo this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#7C3AED",
    cancelButtonColor: "#EF4444",
    confirmButtonText: "Yes, delete it!",
  });

  if (!result.isConfirmed) return;

  try {
    await sectionStore.deleteSection(id);

    Swal.fire({
      icon: "success",
      title: "Deleted!",
      text: "Section deleted successfully.",
      timer: 1500,
      showConfirmButton: false,
    });
  } catch {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Failed to delete section.",
    });
  }
}
</script>

<template>
  <div class="p-6">
    <!-- Header -->
    <div class="mb-6 flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Sections</h1>

        <p class="mt-1 text-gray-500">Manage theater sections.</p>
      </div>

      <router-link
        :to="{ name: 'section-create' }"
        class="rounded-xl bg-[#5E3AA5] px-5 py-3 font-medium text-white transition hover:bg-[#4B2F84]"
      >
        + Add Section
      </router-link>
    </div>

    <!-- Loading -->
    <div
      v-if="sectionStore.loading"
      class="rounded-xl bg-white p-8 text-center shadow"
    >
      Loading...
    </div>

    <!-- Empty -->
    <div
      v-else-if="sectionStore.sections.length === 0"
      class="rounded-xl bg-white p-8 text-center shadow"
    >
      No Sections Found.
    </div>

    <!-- Table -->
    <div
      v-else
      class="overflow-hidden rounded-2xl border border-[#2A1F45] bg-[#161122] shadow-lg"
    >
      <table class="min-w-full">
        <!-- Header -->
        <thead class="bg-[#0D0A14]">
          <tr>
            <th
              class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-300"
            >
              #
            </th>

            <th
              class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-300"
            >
              Name
            </th>

            <th
              class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-300"
            >
              Theater
            </th>

            <th
              class="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-gray-300"
            >
              Actions
            </th>
          </tr>
        </thead>

        <!-- Body -->
        <tbody class="divide-y divide-[#2A1F45] bg-[#161122]">
          <tr
            v-for="section in sectionStore.sections"
            :key="section.id"
            class="transition hover:bg-[#211836]"
          >
            <td class="px-6 py-5 font-semibold text-white">
              {{ section.id }}
            </td>

            <td class="px-6 py-5 text-gray-200">
              {{ section.name }}
            </td>

            <td class="px-6 py-5 text-gray-300">
              {{ section.theater_name }}
            </td>

            <td class="px-6 py-5">
              <div class="flex justify-center gap-3">
                <router-link
                  :to ="{ name: 'section-details', params: { id: section.id } }"
                  class="rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-sky-700"
                >
                  View
                </router-link>

                <router-link
                  :to ="{ name: 'section-edit', params: { id: section.id } }"
                  class="rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-amber-600"
                >
                  Edit
                </router-link>

                <button
                  @click="deleteSection(section.id)"
                  class="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
