<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { ChevronDown } from "lucide-vue-next";
import { useCategoryStore } from "@/stores/media/category";

const router = useRouter();

const categoryStore = useCategoryStore();

const { categories, loading, error } = storeToRefs(categoryStore);

const expandedId = ref<number | null>(null);

const toggleCategory = (id: number) => {
  expandedId.value = expandedId.value === id ? null : id;
};

const goToSubCategory = (id: number) => {
  router.push(`/studio/${id}`);
};

onMounted(() => {
  categoryStore.fetchCategories();
});
</script>

<template>
  <section class="min-h-screen bg-[#0D0A14] pt-32 pb-20">
    <div class="mx-auto max-w-7xl px-6">
      <!-- Header -->
      <div class="mb-16 text-center">
        <span
          class="mb-3 inline-flex rounded-full border border-[#6F46C5] bg-[#120E1D] px-4 py-1 text-sm text-[#C7AFFF]"
        >
          Studio
        </span>

        <h1 class="text-4xl font-bold tracking-tight text-white md:text-6xl">
          Explore Our Studio
        </h1>

        <p class="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-400">
          Browse our music, performances, podcasts and media collections.
        </p>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="space-y-5">
        <div
          v-for="n in 4"
          :key="n"
          class="h-28 animate-pulse rounded-3xl bg-[#181322]"
        />
      </div>

      <!-- Error -->
      <div
        v-else-if="error"
        class="rounded-3xl border border-red-500/30 bg-red-500/10 p-8 text-center text-red-300"
      >
        {{ error }}
      </div>

      <!-- Empty -->
      <div
        v-else-if="!categories.length"
        class="rounded-3xl border border-[#2D2345] bg-[#120E1D] p-10 text-center text-gray-400"
      >
        No categories found.
      </div>

      <!-- Categories -->
      <div v-else class="space-y-6">
        <div
          v-for="category in categories"
          :key="category.id"
          class="overflow-hidden rounded-3xl border border-[#2D2345] bg-[#120E1D]"
        >
          <!-- Category -->
          <button
            class="flex w-full items-center gap-6 p-6 transition hover:bg-[#181322]"
            @click="toggleCategory(category.id)"
          >
            <img
              v-if="category.image"
              :src="category.image"
              :alt="category.name"
              class="h-24 w-24 rounded-2xl object-cover"
            />

            <div
              v-else
              class="flex h-24 w-24 items-center justify-center rounded-2xl bg-[#1B1528]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-10 w-10 text-[#6F46C5]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M4 7h16M4 12h16M4 17h10"
                />
              </svg>
            </div>

            <div class="flex-1 text-left">
              <h2 class="text-2xl font-semibold text-white">
                {{ category.name }}
              </h2>

              <p
                v-if="category.description"
                class="mt-2 max-w-3xl text-sm leading-6 text-gray-400"
              >
                {{ category.description }}
              </p>
            </div>

            <ChevronDown
              class="h-6 w-6 text-[#A97CFF] transition duration-300"
              :class="{
                'rotate-180': expandedId === category.id,
              }"
            />
          </button>

          <!-- Sub Categories -->
          <transition
            enter-active-class="transition-all duration-300"
            enter-from-class="opacity-0 max-h-0"
            enter-to-class="opacity-100 max-h-[700px]"
            leave-active-class="transition-all duration-300"
            leave-from-class="opacity-100 max-h-[700px]"
            leave-to-class="opacity-0 max-h-0"
          >
            <div
              v-if="expandedId === category.id"
              class="border-t border-[#2D2345]"
            >
              <div
                v-if="category.subcategories?.length"
                class="grid gap-6 p-6 md:grid-cols-2 xl:grid-cols-3"
              >
                <button
                  v-for="sub in category.subcategories"
                  :key="sub.id"
                  @click="goToSubCategory(sub.id)"
                  class="group overflow-hidden rounded-2xl border border-[#2D2345] bg-[#181322] text-left transition duration-300 hover:border-[#6F46C5] hover:bg-[#1E1830]"
                >
                  <div class="relative h-56 overflow-hidden">
                    <img
                      v-if="sub.image"
                      :src="sub.image"
                      :alt="sub.name"
                      class="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                    />

                    <div
                      v-else
                      class="flex h-full items-center justify-center bg-[#1B1528]"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-14 w-14 text-[#6F46C5]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="1.5"
                          d="M4 7h16M4 12h16M4 17h10"
                        />
                      </svg>
                    </div>

                    <div
                      class="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"
                    />
                  </div>

                  <div class="p-5">
                    <h3
                      class="text-lg font-semibold text-white transition group-hover:text-[#C7AFFF]"
                    >
                      {{ sub.name }}
                    </h3>

                    <p
                      v-if="sub.description"
                      class="mt-2 line-clamp-2 text-sm leading-6 text-gray-400"
                    >
                      {{ sub.description }}
                    </p>
                  </div>
                </button>
              </div>

              <div v-else class="p-8 text-center text-gray-500">
                No sub categories found.
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </section>
</template>
