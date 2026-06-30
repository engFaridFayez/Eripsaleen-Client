<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";

import { useRowStore } from "@/stores/adminStores/row";

const router = useRouter();
const rowStore = useRowStore();

onMounted(() => {
  rowStore.getRows();
});

async function deleteRow(id: number) {
  const result = await Swal.fire({
    title: "Delete Row?",
    text: "You won't be able to undo this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#7C3AED",
    cancelButtonColor: "#EF4444",
    confirmButtonText: "Yes, delete it!",
  });

  if (!result.isConfirmed) return;

  try {
    await rowStore.deleteRow(id);

    Swal.fire({
      icon: "success",
      title: "Deleted!",
      text: "Row deleted successfully.",
      timer: 1500,
      showConfirmButton: false,
    });
  } catch {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Failed to delete row.",
    });
  }
}
</script>

<template>
  <div class="p-6">
    <!-- Header -->
    <div class="mb-6 flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-white">Rows</h1>

        <p class="mt-1 text-gray-400">Manage theater rows.</p>
      </div>

      <router-link
        :to = "{ name: 'row-create' }"
        class="rounded-xl bg-[#5E3AA5] px-5 py-3 font-medium text-white transition hover:bg-[#6D46BB]"
      >
        + Add Row
      </router-link>
    </div>

    <!-- Loading -->
    <div
      v-if="rowStore.loading"
      class="rounded-2xl bg-[#161122] p-8 text-center text-gray-300"
    >
      Loading...
    </div>

    <!-- Empty -->
    <div
      v-else-if="rowStore.rows.length === 0"
      class="rounded-2xl bg-[#161122] p-8 text-center text-gray-300"
    >
      No rows found.
    </div>

    <!-- Table -->
    <div
      v-else
      class="overflow-hidden rounded-2xl border border-[#2A1F45] bg-[#161122] shadow-lg"
    >
      <table class="min-w-full">
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
              Theater
            </th>
            <th
              class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-300"
            >
              Section
            </th>

            <th
              class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-300"
            >
              Row Number
            </th>

            <th
              class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-300"
            >
              Seats / Row
            </th>

            <th
              class="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-gray-300"
            >
              Actions
            </th>
          </tr>
        </thead>

        <tbody class="divide-y divide-[#2A1F45] bg-[#161122]">
          <tr
            v-for="row in rowStore.rows"
            :key="row.id"
            class="transition hover:bg-[#211836]"
          >
            <td class="px-6 py-5 font-semibold text-white">
              {{ row.id }}
            </td>

            <td class="px-6 py-5 text-gray-200">
              {{ row.theater_name }}
            </td>
            <td class="px-6 py-5 text-gray-200">
              {{ row.section_name }}
            </td>

            <td class="px-6 py-5 text-gray-200">
              {{ row.row_number }}
            </td>

            <td class="px-6 py-5 text-gray-200">
              {{ row.seats_per_row }}
            </td>

            <td class="px-6 py-5">
              <div class="flex justify-center gap-3">
                <router-link
                  :to = "{ name: 'row-details', params: { id: row.id } }"
                  class="rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-sky-700"
                >
                  View
                </router-link>

                <router-link
                  :to = "{ name: 'row-edit', params: { id: row.id } }"
                  class="rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-amber-600"
                >
                  Edit
                </router-link>

                <button
                  @click="deleteRow(row.id)"
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
