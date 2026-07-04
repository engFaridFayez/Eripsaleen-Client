<script setup lang="ts">
import { onMounted } from "vue";
import { RouterLink } from "vue-router";
import Swal from "sweetalert2";

import { useShowStore } from "@/stores/adminStores/show";

const showStore = useShowStore();

onMounted(async () => {
  await showStore.getShows();
});

const handleDelete = async (id: number) => {
  const result = await Swal.fire({
    title: "Delete Show?",
    text: "This action cannot be undone.",
    icon: "warning",
    background: "#120E1D",
    color: "#fff",
    showCancelButton: true,
    confirmButtonText: "Delete",
    cancelButtonText: "Cancel",
    confirmButtonColor: "#dc2626",
    cancelButtonColor: "#3B324F",
  });

  if (!result.isConfirmed) return;

  try {
    await showStore.deleteShow(id);

    Swal.fire({
      icon: "success",
      title: "Show deleted successfully",
      background: "#120E1D",
      color: "#fff",
      timer: 1500,
      showConfirmButton: false,
    });
  } catch {
    Swal.fire({
      icon: "error",
      title: "Something went wrong",
      background: "#120E1D",
      color: "#fff",
    });
  }
};
</script>

<template>
  <div class="space-y-8">
    <!-- Header -->
    <div
      class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
    >
      <div>
        <h1 class="text-2xl font-bold sm:text-3xl">Shows</h1>

        <p class="mt-2 text-gray-400">Manage all theater shows.</p>
      </div>

      <RouterLink
        :to="{ name: 'show-create' }"
        class="inline-block rounded-lg bg-[#C9A84C] px-5 py-3 text-center font-semibold text-black transition hover:scale-105"
      >
        + Add Show
      </RouterLink>
    </div>

    <!-- Table -->

    <div
      class="overflow-hidden rounded-2xl border border-[#C9A84C]/20 bg-[#120E1D]"
    >
      <div class="overflow-x-auto">
        <table class="w-full min-w-[720px]">
          <thead class="bg-[#1B1628]">
            <tr>
              <th class="px-4 py-4 text-left whitespace-nowrap sm:px-6">
                Poster
              </th>
              <th class="px-4 py-4 text-left whitespace-nowrap sm:px-6">
                Title
              </th>
              <th class="px-4 py-4 text-left whitespace-nowrap sm:px-6">
                Description
              </th>
              <th class="px-4 py-4 text-center whitespace-nowrap sm:px-6">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="show in showStore.shows"
              :key="show.id"
              class="border-t border-[#C9A84C]/10"
            >
              <!-- Poster -->

              <td class="px-4 py-4 sm:px-6">
                <img
                  v-if="show.cover"
                  :src="show.cover"
                  class="h-20 w-16 rounded-lg object-cover"
                />

                <div
                  v-else
                  class="flex h-20 w-16 items-center justify-center rounded-lg bg-[#1B1628] text-xs text-gray-500"
                >
                  No Image
                </div>
              </td>

              <!-- Title -->

              <td class="px-4 py-4 font-semibold sm:px-6">
                {{ show.title }}
              </td>

              <!-- Description -->

              <td class="max-w-xs truncate px-4 py-4 text-gray-400 sm:px-6">
                {{ show.description || "-" }}
              </td>

              <!-- Actions -->

              <td class="px-4 py-4 sm:px-6">
                <div class="flex flex-wrap justify-center gap-2 sm:gap-3">
                  <RouterLink
                    :to="{
                      name: 'admin-show-details',
                      params: { id: show.id },
                    }"
                    class="whitespace-nowrap rounded-lg bg-blue-600 px-4 py-2 text-sm"
                  >
                    View
                  </RouterLink>

                  <RouterLink
                    :to="{ name: 'show-edit', params: { id: show.id } }"
                    class="whitespace-nowrap rounded-lg bg-yellow-500 px-4 py-2 text-sm text-black"
                  >
                    Edit
                  </RouterLink>

                  <button
                    @click="handleDelete(show.id)"
                    class="whitespace-nowrap rounded-lg bg-red-600 px-4 py-2 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>

            <tr v-if="showStore.shows.length === 0">
              <td colspan="4" class="py-10 text-center text-gray-500">
                No shows found.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
