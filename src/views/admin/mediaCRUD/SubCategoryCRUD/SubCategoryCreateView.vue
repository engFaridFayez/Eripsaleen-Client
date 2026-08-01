<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

import { useSubCategoryStore } from "@/stores/media/subCategory";
import { useCategoryStore } from "@/stores/media/category";

const router = useRouter();

const subCategoryStore = useSubCategoryStore();
const categoryStore = useCategoryStore();

const name = ref("");
const description = ref("");
const category = ref<number | null>(null);

const preview = ref<string | null>(null);

const loading = ref(false);

onMounted(() => {
  categoryStore.fetchCategories();
});

const image = ref<globalThis.File | null>(null);

const handleImageChange = (event: Event): void => {
  const target = event.target as HTMLInputElement;

  const file = target.files?.item(0);

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

    await subCategoryStore.addSubCategory(formData);

    router.push("/admin/subcategories");
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="mx-auto max-w-3xl">
    <div class="rounded-2xl border border-[#6F46C5] bg-[#5E3AA5] p-8 shadow-xl">
      <h1 class="text-2xl font-bold mb-6">Create Sub Category</h1>

      <form @submit.prevent="submit" class="space-y-5 p-6 rounded-xl shadow">
        <!-- Category -->
        <div>
          <label class="block mb-2"> Category </label>

          <select
            v-model="category"
            class="w-full border rounded-lg p-3"
            required
          >
            <option disabled :value="null">Select category</option>

            <option
              v-for="item in categoryStore.categories"
              :key="item.id"
              :value="item.id"
              class="text-white bg-black"
            >
              {{ item.name }}
            </option>
          </select>
        </div>

        <!-- Name -->
        <div>
          <label class="block mb-2"> Name </label>

          <input
            v-model="name"
            type="text"
            class="w-full border rounded-lg p-3"
            required
          />
        </div>

        <!-- Description -->
        <div>
          <label class="block mb-2"> Description </label>

          <textarea
            v-model="description"
            rows="4"
            class="w-full border rounded-lg p-3"
          />
        </div>

        <!-- Image -->
        <div>
          <label class="block mb-2"> Image </label>

          <input
            type="file"
            accept="image/*"
            @change="handleImageChange"
            class="w-full"
          />

          <img
            v-if="preview"
            :src="preview"
            class="mt-4 w-32 h-32 rounded-lg object-cover"
          />
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="px-5 py-3 bg-black text-white rounded-lg"
        >
          {{ loading ? "Saving..." : "Create" }}
        </button>
      </form>
    </div>
  </div>
</template>
