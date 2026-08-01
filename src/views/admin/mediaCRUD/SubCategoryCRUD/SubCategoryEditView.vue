<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

import { useSubCategoryStore } from "@/stores/media/subCategory";
import { useCategoryStore } from "@/stores/media/category";

const router = useRouter();
const route = useRoute();

const subCategoryStore = useSubCategoryStore();
const categoryStore = useCategoryStore();

const id = Number(route.params.id);

const name = ref("");
const description = ref("");
const category = ref<number | null>(null);

const image = ref<File | null>(null);
const preview = ref<string | null>(null);

const loading = ref(false);

onMounted(async () => {
  await categoryStore.fetchCategories();

  const data = await subCategoryStore.fetchSubCategory(id);

  if (data) {
    name.value = data.name;
    description.value = data.description ?? "";
    category.value = data.category;

    if (data.image) {
      preview.value = data.image;
    }
  }
});

const handleImageChange = (event: Event) => {
  const target = event.target as HTMLInputElement;

  const file = target.files?.[0];

  if (!file) return;

  image.value = file;
};

const submit = async () => {
  if (!category.value) {
    alert("Please select category");
    return;
  }

  const formData = new FormData();

  formData.append("name", name.value);

  formData.append("description", description.value);

  formData.append("category", String(category.value));

  if (image.value) {
    formData.append("image", image.value);
  }

  try {
    loading.value = true;

    await subCategoryStore.editSubCategory(id, formData);

    router.push("/admin/subcategories");
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="mx-auto w-full max-w-3xl px-4 sm:px-6">
    <div
      class="rounded-2xl border border-[#6F46C5] bg-[#5E3AA5] p-5 shadow-xl sm:p-8"
    >
      <div class="mb-6 sm:mb-8">
        <h1 class="text-2xl font-bold text-white sm:text-3xl">
          Edit Sub Category
        </h1>

        <p class="mt-2 text-sm text-purple-200 sm:text-base">
          Update sub-category information.
        </p>
      </div>

      <form @submit.prevent="submit" class="space-y-5 sm:space-y-6">
        <!-- Name -->
        <div>
          <label class="mb-2 block text-sm font-medium text-white">
            Name
          </label>

          <input
            v-model="name"
            type="text"
            required
            class="w-full rounded-lg border border-[#6F46C5] bg-[#120E1D] px-4 py-3 text-white outline-none transition focus:border-yellow-400"
          />
        </div>

        <!-- Category -->
        <div>
          <label class="mb-2 block text-sm font-medium text-white">
            Category
          </label>

          <select
            v-model="category"
            required
            class="w-full rounded-lg border border-[#6F46C5] bg-[#120E1D] px-4 py-3 text-white outline-none transition focus:border-yellow-400"
          >
            <option disabled :value="null">Select category</option>

            <option
              v-for="item in categoryStore.categories"
              :key="item.id"
              :value="item.id"
            >
              {{ item.name }}
            </option>
          </select>
        </div>

        <!-- Description -->
        <div>
          <label class="mb-2 block text-sm font-medium text-white">
            Description
          </label>

          <textarea
            v-model="description"
            rows="4"
            class="w-full rounded-lg border border-[#6F46C5] bg-[#120E1D] px-4 py-3 text-white outline-none transition focus:border-yellow-400"
          />
        </div>

        <!-- Current Image -->
        <div v-if="preview">
          <label class="mb-2 block text-sm font-medium text-white">
            Current Image
          </label>

          <img
            :src="preview"
            class="h-24 w-24 rounded-lg border border-[#6F46C5] object-cover sm:h-32 sm:w-32"
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
        <div
          class="flex flex-col-reverse gap-3 pt-4 sm:flex-row sm:justify-end"
        >
          <RouterLink
            to="/admin/subcategories"
            class="rounded-lg border border-gray-500 px-5 py-2 text-center text-white transition hover:bg-gray-700"
          >
            Cancel
          </RouterLink>

          <button
            type="submit"
            :disabled="loading"
            class="rounded-lg bg-yellow-500 px-6 py-2 font-semibold text-black transition hover:bg-yellow-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {{ loading ? "Updating..." : "Update Sub Category" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
