<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import Swal from "sweetalert2";
import { useSubCategoryStore } from "@/stores/media/subCategory";

const router = useRouter();

const subCategoryStore = useSubCategoryStore();

const { subCategories, loading, error } = storeToRefs(subCategoryStore);

onMounted(() => {
  subCategoryStore.fetchSubCategories();
});

const goCreate = () => {
  router.push("/admin/subcategories/create");
};

const goEdit = (id: number) => {
  router.push(`/admin/subcategories/${id}/edit`);
};

const goDetails = (id: number) => {
  router.push(`/admin/subcategories/${id}`);
};

const handleDelete = async (id: number) => {
  const result = await Swal.fire({
    title: "Delete Sub Category?",
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
    await subCategoryStore.removeSubCategory(id);

    Swal.fire({
      icon: "success",
      title: "Deleted successfully",
      timer: 1500,
      showConfirmButton: false,
    });

    await subCategoryStore.fetchSubCategories();
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
  <div class="p-4 sm:p-6">
    <div
      class="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
    >
      <div>
        <h1 class="text-xl font-bold sm:text-2xl">Sub Categories</h1>

        <p class="text-sm text-gray-500 sm:text-base">
          Manage your media sub categories
        </p>
      </div>

      <button
        @click="goCreate"
        class="w-full rounded-lg bg-black px-4 py-2 text-white sm:w-auto"
      >
        Add Sub Category
      </button>
    </div>

    <div v-if="loading" class="py-10 text-center">Loading...</div>

    <div v-else-if="error" class="text-red-500">
      {{ error }}
    </div>

    <template v-else>
      <!-- Mobile card list -->
      <div class="space-y-4 md:hidden">
        <div
          v-for="item in subCategories"
          :key="item.id"
          class="rounded-2xl border border-[#6F46C5] bg-[#5E3AA5] p-4 shadow-xl shadow-black/20"
        >
          <div class="flex gap-3">
            <img
              v-if="item.image"
              :src="item.image"
              class="h-16 w-16 shrink-0 rounded-lg object-cover"
            />

            <div
              v-else
              class="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-[#0D0A14] text-xs text-gray-400"
            >
              No image
            </div>

            <div class="min-w-0 flex-1">
              <p class="truncate font-medium text-white">{{ item.name }}</p>

              <p class="truncate text-sm text-purple-200">
                {{ item.category_name }}
              </p>

              <p class="mt-1 line-clamp-2 text-sm text-white/80">
                {{ item.description || "-" }}
              </p>
            </div>
          </div>

          <div class="mt-4 flex gap-2">
            <button
              @click="goDetails(item.id)"
              class="flex-1 rounded bg-blue-600 px-3 py-2 text-sm text-white"
            >
              Details
            </button>

            <button
              @click="goEdit(item.id)"
              class="flex-1 rounded bg-green-600 px-3 py-2 text-sm text-white"
            >
              Edit
            </button>

            <button
              @click="handleDelete(item.id)"
              class="flex-1 rounded bg-red-600 px-3 py-2 text-sm text-white"
            >
              Delete
            </button>
          </div>
        </div>

        <div
          v-if="!subCategories.length"
          class="rounded-2xl border border-[#6F46C5] bg-[#5E3AA5] p-6 text-center text-white"
        >
          No sub categories found
        </div>
      </div>

      <!-- Desktop table -->
      <div
        class="hidden overflow-hidden rounded-2xl border border-[#6F46C5] bg-[#5E3AA5] shadow-xl shadow-black/20 md:block"
      >
        <div class="overflow-x-auto">
          <table class="min-w-full">
            <thead class="bg-[#0D0A14]">
              <tr class="border-b border-[#6F46C5]">
                <th class="p-4 text-left">Image</th>

                <th class="p-4 text-left">Name</th>

                <th class="p-4 text-left">Category</th>

                <th class="p-4 text-left">Description</th>

                <th class="p-4 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="item in subCategories"
                :key="item.id"
                class="transition duration-300 hover:bg-[#4B2D87]"
              >
                <td class="p-4">
                  <img
                    v-if="item.image"
                    :src="item.image"
                    class="h-14 w-14 rounded-lg object-cover"
                  />

                  <span v-else> - </span>
                </td>

                <td class="p-4 font-medium">
                  {{ item.name }}
                </td>

                <td class="p-4">
                  {{ item.category_name }}
                </td>

                <td class="max-w-xs truncate p-4 text-white">
                  {{ item.description || "-" }}
                </td>

                <td class="p-4">
                  <div class="flex flex-wrap gap-2">
                    <button
                      @click="goDetails(item.id)"
                      class="rounded bg-blue-600 px-3 py-1 text-white"
                    >
                      Details
                    </button>

                    <button
                      @click="goEdit(item.id)"
                      class="rounded bg-green-600 px-3 py-1 text-white"
                    >
                      Edit
                    </button>

                    <button
                      @click="handleDelete(item.id)"
                      class="rounded bg-red-600 px-3 py-1 text-white"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>

              <tr v-if="!subCategories.length">
                <td colspan="5" class="p-6 text-center text-white">
                  No sub categories found
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </template>
  </div>
</template>
