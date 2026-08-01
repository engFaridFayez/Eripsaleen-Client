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
  <div class="p-6">
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-2xl font-bold">Sub Categories</h1>

        <p class="text-gray-500">Manage your media sub categories</p>
      </div>

      <button
        @click="goCreate"
        class="px-4 py-2 bg-black text-white rounded-lg"
      >
        Add Sub Category
      </button>
    </div>

    <div v-if="loading" class="text-center py-10">Loading...</div>

    <div v-else-if="error" class="text-red-500">
      {{ error }}
    </div>

    <div v-else class="overflow-hidden rounded-2xl border border-[#6F46C5] bg-[#5E3AA5] shadow-xl shadow-black/20">
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
                class="w-14 h-14 object-cover rounded-lg"
              />

              <span v-else> - </span>
            </td>

            <td class="p-4 font-medium">
              {{ item.name }}
            </td>

            <td class="p-4">
              {{ item.category_name }}
            </td>

            <td class="p-4 text-white max-w-xs truncate">
              {{ item.description || "-" }}
            </td>

            <td class="p-4 flex gap-2">
              <button
                @click="goDetails(item.id)"
                class="px-3 py-1 bg-blue-600 text-white rounded"
              >
                Details
              </button>
              <button
                @click="goEdit(item.id)"
                class="px-3 py-1 bg-green-600 text-white rounded"
              >
                Edit
              </button>

              <button
                @click="handleDelete(item.id)"
                class="px-3 py-1 bg-red-600 text-white rounded"
              >
                Delete
              </button>
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
