<script setup lang="ts">
import { onMounted } from "vue";
import { useRoute, RouterLink } from "vue-router";
import Swal from "sweetalert2";

import { useCategoryStore } from "@/stores/media/category";

const route = useRoute();

const categoryStore = useCategoryStore();

const id = Number(route.params.id);

onMounted(async () => {
  try {
    await categoryStore.fetchCategory(id);
  } catch {
    Swal.fire({
      icon: "error",
      title: "Failed to load category",
    });
  }
});
</script>

<template>
  <div class="mx-auto max-w-4xl space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-white">Category Details</h1>

        <p class="mt-1 text-gray-400">View category information.</p>
      </div>

      <RouterLink
        :to="{
          name: 'category-edit',
          params: { id },
        }"
        class="rounded-lg bg-emerald-500 px-5 py-2 font-semibold text-white transition hover:bg-emerald-400"
      >
        Edit
      </RouterLink>
    </div>

    <!-- Loading -->
    <div
      v-if="categoryStore.loading"
      class="rounded-xl border p-8 text-center text-white"
    >
      Loading category...
    </div>

    <!-- Content -->
    <div
      v-else-if="categoryStore.currentCategory"
      class="rounded-2xl border border-[#6F46C5] bg-[#5E3AA5] p-8 shadow-xl"
    >
      <div class="grid gap-8 md:grid-cols-2">
        <!-- Image -->
        <div>
          <img
            :src="categoryStore.currentCategory.image || undefined"
            :alt="categoryStore.currentCategory.name"
            class="h-full min-h-75 w-full rounded-xl object-cover"
          />
        </div>

        <!-- Info -->
        <div class="space-y-5">
          <div>
            <p class="text-sm text-purple-200">ID</p>

            <span
              class="inline-block rounded-full bg-[#120E1D] px-3 py-1 text-sm font-semibold text-white"
            >
              #{{ categoryStore.currentCategory.id }}
            </span>
          </div>

          <div>
            <p class="text-sm text-purple-200">Category Name</p>

            <h2 class="text-2xl font-bold text-white">
              {{ categoryStore.currentCategory.name }}
            </h2>
          </div>

          <div>
            <p class="text-sm text-purple-200">Description</p>

            <p class="text-white">
              {{
                categoryStore.currentCategory.description ||
                "No description available."
              }}
            </p>
          </div>
        </div>
      </div>

      <!-- Back -->
      <div class="mt-8">
        <RouterLink
          :to="{ name: 'category-list' }"
          class="rounded-lg border border-gray-400 px-5 py-2 text-white transition hover:bg-gray-700"
        >
          Back to Categories
        </RouterLink>
      </div>
    </div>

    <!-- Error -->
    <div
      v-else
      class="rounded-xl border border-red-500 bg-red-50 p-5 text-red-600"
    >
      Category not found.
    </div>
  </div>
</template>
