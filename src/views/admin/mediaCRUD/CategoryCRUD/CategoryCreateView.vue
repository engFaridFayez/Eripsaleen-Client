<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";

import { useCategoryStore } from "@/stores/media/category";

const router = useRouter();
const categoryStore = useCategoryStore();

const form = ref({
  name: "",
  description: "",
});

const image = ref<globalThis.File | null>(null);

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

    await categoryStore.addCategory(formData);

    await Swal.fire({
      icon: "success",
      title: "Category created successfully",
      timer: 1500,
      showConfirmButton: false,
    });

    router.push({
      name: "category-list",
    });
  } catch {
    Swal.fire({
      icon: "error",
      title: "Failed to create category",
    });
  }
};
</script>

<template>
  <div class="mx-auto max-w-3xl">
    <div class="rounded-2xl border border-[#6F46C5] bg-[#5E3AA5] p-8 shadow-xl">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-white">Create Category</h1>

        <p class="mt-2 text-purple-200">Add a new media category.</p>
      </div>

      <form class="space-y-6" @submit.prevent="handleSubmit">
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

        <!-- Image -->
        <div>
          <label class="mb-2 block text-sm font-medium text-white">
            Image
          </label>

          <input
            type="file"
            accept="image/*"
            required
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
            {{ categoryStore.loading ? "Creating..." : "Create Category" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
