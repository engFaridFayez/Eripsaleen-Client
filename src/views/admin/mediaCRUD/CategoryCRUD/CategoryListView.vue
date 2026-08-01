<script setup lang="ts">
import { onMounted } from "vue";
import { RouterLink } from "vue-router";
import Swal from "sweetalert2";

import { useCategoryStore } from "@/stores/media/category";

const categoryStore = useCategoryStore();

onMounted(async () => {
  await categoryStore.fetchCategories();
});

const handleDelete = async (id: number) => {
  const result = await Swal.fire({
    title: "Delete Category?",
    text: "You won't be able to undo this action.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Delete",
    cancelButtonText: "Cancel",
    confirmButtonColor: "#dc2626",
    reverseButtons: true,
    background: "#120E1D",
    color: "#ffffff",
  });

  if (!result.isConfirmed) return;

  try {
    await categoryStore.removeCategory(id);

    Swal.fire({
      icon: "success",
      title: "Deleted successfully",
      timer: 1500,
      showConfirmButton: false,
    });

    await categoryStore.fetchCategories();
  } catch {
    Swal.fire({
      icon: "error",
      title: "Something went wrong",
      text: "Failed to delete the category.",
    });
  }
};
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div
      class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
    >
      <div>
        <h1 class="text-2xl font-bold sm:text-3xl">Categories</h1>
        <p class="mt-1 text-gray-500">Manage all media categories from here.</p>
      </div>

      <RouterLink
        :to="{ name: 'category-create' }"
        class="inline-block rounded-lg bg-yellow-500 px-5 py-2 text-center font-semibold text-black transition hover:bg-yellow-400"
      >
        + Add Category
      </RouterLink>
    </div>

    <!-- Loading -->
    <div v-if="categoryStore.loading" class="rounded-xl border p-8 text-center">
      Loading categories...
    </div>

    <!-- Error -->
    <div
      v-else-if="categoryStore.error"
      class="rounded-xl border border-red-500 bg-red-50 p-5 text-red-600"
    >
      {{ categoryStore.error }}
    </div>

    <!-- Empty -->
    <div
      v-else-if="!categoryStore.categories.length"
      class="rounded-xl border p-8 text-center"
    >
      No categories found.
    </div>

    <!-- Table -->
    <div
      v-else
      class="overflow-hidden rounded-2xl border border-[#6F46C5] bg-[#5E3AA5] shadow-xl shadow-black/20"
    >
      <div class="overflow-x-auto">
        <table class="min-w-full">
          <!-- Header -->
          <thead class="bg-[#0D0A14]">
            <tr class="border-b border-[#6F46C5]">
              <th
                class="whitespace-nowrap px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-300 sm:px-6"
              >
                ID
              </th>

              <th
                class="whitespace-nowrap px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-300 sm:px-6"
              >
                Image
              </th>

              <th
                class="whitespace-nowrap px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-300 sm:px-6"
              >
                Category Name
              </th>

              <th
                class="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-300 sm:px-6"
              >
                Description
              </th>

              <th
                class="whitespace-nowrap px-4 py-4 text-center text-xs font-semibold uppercase tracking-wider text-gray-300 sm:px-6"
              >
                Actions
              </th>
            </tr>
          </thead>

          <!-- Body -->
          <tbody class="divide-y divide-[#6F46C5]">
            <tr
              v-for="category in categoryStore.categories"
              :key="category.id"
              class="transition duration-300 hover:bg-[#4B2D87]"
            >
              <!-- ID -->
              <td class="whitespace-nowrap px-4 py-5 sm:px-6">
                <span
                  class="rounded-full bg-[#0D0A14] px-3 py-1 text-sm font-semibold text-white"
                >
                  #{{ category.id }}
                </span>
              </td>

              <!-- Image -->
              <td class="px-4 py-5 sm:px-6">
                <img
                  :src="category.image"
                  :alt="category.name"
                  class="h-16 w-16 rounded-lg border border-[#6F46C5] object-cover"
                />
              </td>

              <!-- Name -->
              <td
                class="whitespace-nowrap px-4 py-5 font-semibold text-white sm:px-6"
              >
                {{ category.name }}
              </td>

              <!-- Description -->
              <td class="px-4 py-5 text-purple-100 sm:px-6">
                {{ category.description || "-" }}
              </td>

              <!-- Actions -->
              <td class="px-4 py-5 sm:px-6">
                <div class="flex flex-wrap justify-center gap-2 sm:gap-3">
                  <RouterLink
                    :to="{
                      name: 'category-details',
                      params: { id: category.id },
                    }"
                    class="whitespace-nowrap rounded-lg bg-blue-500/20 px-4 py-2 text-sm font-medium text-blue-300 transition hover:bg-blue-500 hover:text-white"
                  >
                    View
                  </RouterLink>

                  <RouterLink
                    :to="{
                      name: 'category-edit',
                      params: { id: category.id },
                    }"
                    class="whitespace-nowrap rounded-lg bg-emerald-500/20 px-4 py-2 text-sm font-medium text-emerald-300 transition hover:bg-emerald-500 hover:text-white"
                  >
                    Edit
                  </RouterLink>

                  <button
                    @click="handleDelete(category.id)"
                    class="whitespace-nowrap rounded-lg bg-red-500/20 px-4 py-2 text-sm font-medium text-red-300 transition hover:bg-red-500 hover:text-white"
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
  </div>
</template>
