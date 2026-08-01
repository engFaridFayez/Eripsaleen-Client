<script setup lang="ts">
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";

import { useSubCategoryStore } from "@/stores/media/subCategory";

const route = useRoute();
const router = useRouter();

const subCategoryStore = useSubCategoryStore();

const { currentSubCategory, loading } = storeToRefs(subCategoryStore);

const id = Number(route.params.id);

onMounted(async () => {
  await subCategoryStore.fetchSubCategory(id);
});

const goEdit = () => {
  router.push(`/admin/subcategories/${id}/edit`);
};
</script>

<template>
  <div class="mx-auto max-w-3xl">
    <div
      v-if="loading"
      class="rounded-xl bg-[#120E1D] p-5 text-center text-white"
    >
      Loading...
    </div>

    <div
      v-else-if="currentSubCategory"
      class="rounded-2xl border border-[#6F46C5] bg-[#5E3AA5] p-8 shadow-xl"
    >
      <div class="mb-8 flex items-start justify-between">
        <div>
          <h1 class="text-3xl font-bold text-white">
            {{ currentSubCategory.name }}
          </h1>

          <p class="mt-2 text-purple-200">Sub Category Details</p>
        </div>

        <button
          @click="goEdit"
          class="rounded-lg bg-yellow-500 px-6 py-2 font-semibold text-black transition hover:bg-yellow-400"
        >
          Edit
        </button>
      </div>

      <!-- Image -->
      <div v-if="currentSubCategory.image" class="mb-6">
        <img
          :src="currentSubCategory.image"
          class="h-48 w-48 rounded-lg border border-[#6F46C5] object-cover"
        />
      </div>

      <div class="space-y-6">
        <div>
          <label class="mb-2 block text-sm font-medium text-white">
            Category
          </label>

          <p class="text-purple-200">
            {{ currentSubCategory.category_name }}
          </p>
        </div>

        <div>
          <label class="mb-2 block text-sm font-medium text-white">
            Description
          </label>

          <p class="text-purple-200">
            {{ currentSubCategory.description || "No description" }}
          </p>
        </div>

        <div>
          <label class="mb-2 block text-sm font-medium text-white"> ID </label>

          <p class="text-purple-200">
            {{ currentSubCategory.id }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
