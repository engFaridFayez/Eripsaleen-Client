<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import Swal from "sweetalert2";

import { useCategoryStore } from "@/stores/media/category";

const route = useRoute();
const router = useRouter();

const categoryStore = useCategoryStore();

const id = Number(route.params.id);

const form = ref({
  name: "",
  description: "",
});

const image = ref<globalThis.File | null>(null);
const currentImage = ref<string | null>(null);

onMounted(async () => {
  try {
    const category = await categoryStore.fetchCategory(id);

    form.value.name = category.name;
    form.value.description = category.description || "";
    currentImage.value = category.image;
  } catch {
    Swal.fire({
      icon: "error",
      title: "Failed to load category",
    });
  }
});

const handleImageChange = (event: Event): void => {
  const target = event.target as HTMLInputElement;

  const file = target.files?.item(0);

  if (!file) return;

  image.value = file;
};

const handleSubmit = async () => {
  try {
    const formData = new FormData();

    formData.append("name", form.value.name);

    formData.append("description", form.value.description);

    if (image.value) {
      formData.append("image", image.value);
    }

    await categoryStore.editCategory(id, formData);

    await Swal.fire({
      icon: "success",
      title: "Category updated successfully",
      timer: 1500,
      showConfirmButton: false,
    });

    router.push({
      name: "category-list",
    });
  } catch {
    Swal.fire({
      icon: "error",
      title: "Failed to update category",
    });
  }
};
</script>

<template>
  <div class="mx-auto max-w-3xl">
    <div class="rounded-2xl border border-[#6F46C5] bg-[#5E3AA5] p-8 shadow-xl">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-white">Edit Category</h1>

        <p class="mt-2 text-purple-200">Update category information.</p>
      </div>

      <!-- Loading -->
      <div
        v-if="categoryStore.loading && !form.name"
        class="rounded-xl bg-[#120E1D] p-5 text-center text-white"
      >
        Loading category...
      </div>

      <form v-else class="space-y-6" @submit.prevent="handleSubmit">
        <!-- Name -->
        <div>
          <label class="mb-2 block text-sm font-medium text-white">
            Category Name
          </label>

          <input
            v-model="form.name"
            type="text"
            required
            class="w-full rounded-lg border border-[#6F46C5] bg-[#120E1D] px-4 py-3 text-white outline-none transition focus:border-yellow-400"
          />
        </div>

        <!-- Description -->
        <div>
          <label class="mb-2 block text-sm font-medium text-white">
            Description
          </label>

          <textarea
            v-model="form.description"
            rows="4"
            class="w-full rounded-lg border border-[#6F46C5] bg-[#120E1D] px-4 py-3 text-white outline-none transition focus:border-yellow-400"
          />
        </div>

        <!-- Current Image -->
        <div v-if="currentImage">
          <label class="mb-2 block text-sm font-medium text-white">
            Current Image
          </label>

          <img
            :src="currentImage"
            class="h-32 w-32 rounded-lg border border-[#6F46C5] object-cover"
          />
        </div>

        <!-- New Image -->
        <div>
          <label class="mb-2 block text-sm font-medium text-white">
            Change Image
          </label>

          <input
            type="file"
            accept="image/*"
            @change="handleImageChange"
            class="block w-full rounded-lg border border-[#6F46C5] bg-[#120E1D] px-4 py-3 text-white file:mr-4 file:rounded-md file:border-0 file:bg-yellow-500 file:px-4 file:py-2 file:font-semibold file:text-black hover:file:bg-yellow-400"
          />
        </div>

        <!-- Buttons -->
        <div class="flex justify-end gap-3 pt-4">
          <RouterLink
            :to="{ name: 'category-list' }"
            class="rounded-lg border border-gray-500 px-5 py-2 text-white transition hover:bg-gray-700"
          >
            Cancel
          </RouterLink>

          <button
            type="submit"
            :disabled="categoryStore.loading"
            class="rounded-lg bg-yellow-500 px-6 py-2 font-semibold text-black transition hover:bg-yellow-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {{ categoryStore.loading ? "Updating..." : "Update Category" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
