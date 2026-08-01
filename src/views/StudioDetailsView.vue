<script setup lang="ts">
import { computed, onMounted, onUnmounted, reactive, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";

import { useSubCategoryStore } from "@/stores/media/subCategory";
import { useGalleryStore } from "@/stores/media/gallery";
import { useVideoStore } from "@/stores/media/video";

const route = useRoute();

const subCategoryStore = useSubCategoryStore();
const galleryStore = useGalleryStore();
const videoStore = useVideoStore();

const { currentSubCategory } = storeToRefs(subCategoryStore);

const { frontendGalleryImages } = storeToRefs(galleryStore);

const { frontendVideos, frontendPodcasts, frontendReels, loading } =
  storeToRefs(videoStore);

const subCategoryId = computed(() => Number(route.params.id));

// Tracks which cards have been clicked to "activate" - swaps the
// thumbnail for the live embed instead of loading every iframe upfront.
const playing = reactive(new Set<string>());

const play = (key: string) => playing.add(key);
const isPlaying = (key: string) => playing.has(key);

// ================= Lightbox =================
const lightboxIndex = ref<number | null>(null);

const lightboxImage = computed(() =>
  lightboxIndex.value === null
    ? null
    : frontendGalleryImages.value[lightboxIndex.value],
);

const openLightbox = (index: number) => {
  lightboxIndex.value = index;
};

const closeLightbox = () => {
  lightboxIndex.value = null;
};

const showPrev = () => {
  if (lightboxIndex.value === null) return;
  const total = frontendGalleryImages.value.length;
  lightboxIndex.value = (lightboxIndex.value - 1 + total) % total;
};

const showNext = () => {
  if (lightboxIndex.value === null) return;
  const total = frontendGalleryImages.value.length;
  lightboxIndex.value = (lightboxIndex.value + 1) % total;
};

const handleKeydown = (event: KeyboardEvent) => {
  if (lightboxIndex.value === null) return;

  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowLeft") showPrev();
  if (event.key === "ArrowRight") showNext();
};

// Lock body scroll while the lightbox is open
watch(lightboxIndex, (value) => {
  document.body.style.overflow = value === null ? "" : "hidden";
});

onMounted(() => window.addEventListener("keydown", handleKeydown));
onUnmounted(() => {
  window.removeEventListener("keydown", handleKeydown);
  document.body.style.overflow = "";
});

const loadData = async () => {
  await Promise.all([
    subCategoryStore.fetchSubCategory(subCategoryId.value),

    galleryStore.fetchFrontendGalleryImages(subCategoryId.value),

    videoStore.fetchFrontendVideos({
      sub_category: subCategoryId.value,
      content_type: "video",
    }),

    videoStore.fetchFrontendVideos({
      sub_category: subCategoryId.value,
      content_type: "podcast",
    }),

    videoStore.fetchFrontendVideos({
      sub_category: subCategoryId.value,
      content_type: "reel",
    }),
  ]);
};

onMounted(loadData);
</script>

<template>
  <section class="min-h-screen bg-[#0D0A14] py-12 sm:py-16 lg:py-20">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <!-- Hero -->
      <div class="mb-10 sm:mb-16">
        <p
          class="mb-2 text-xs uppercase tracking-[0.3em] text-[#A78BFA] sm:text-sm"
        >
          Studio
        </p>

        <h1 class="text-3xl font-bold text-white sm:text-4xl md:text-5xl">
          {{ currentSubCategory?.name }}
        </h1>

        <p
          v-if="currentSubCategory?.description"
          class="mt-4 max-w-3xl text-sm text-gray-400 sm:text-base"
        >
          {{ currentSubCategory.description }}
        </p>
      </div>

      <!-- Loading -->
      <div
        v-if="loading"
        class="flex items-center justify-center py-24 sm:py-32"
      >
        <div
          class="h-12 w-12 animate-spin rounded-full border-4 border-[#6F46C5] border-t-transparent sm:h-14 sm:w-14"
        />
      </div>

      <template v-else>
        <!-- ================= Gallery ================= -->

        <section v-if="frontendGalleryImages.length" class="mb-16 sm:mb-24">
          <div
            class="mb-6 flex flex-wrap items-center justify-between gap-2 sm:mb-8"
          >
            <h2 class="text-2xl font-bold text-white sm:text-3xl">Gallery</h2>

            <span class="text-sm text-[#A78BFA]">
              {{ frontendGalleryImages.length }} Photos
            </span>
          </div>

          <div
            class="grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-3 lg:grid-cols-4"
          >
            <button
              v-for="(image, index) in frontendGalleryImages"
              :key="image.id"
              type="button"
              class="group overflow-hidden rounded-xl bg-[#171121] ring-1 ring-[#2B2140] transition duration-300 hover:ring-[#6F46C5]/60 sm:rounded-2xl"
              @click="openLightbox(index)"
            >
              <div class="relative overflow-hidden">
                <img
                  :src="image.image"
                  :alt="image.title"
                  class="aspect-square w-full object-cover transition duration-500 group-hover:scale-110"
                />
                <div
                  class="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100"
                />
              </div>

              <div class="border-t border-[#2B2140] p-2.5 text-left sm:p-4">
                <!-- <p class="truncate text-sm text-white sm:text-base">
                  {{ image.title || "Untitled" }}
                </p> -->
              </div>
            </button>
          </div>
        </section>

        <!-- ================= Videos ================= -->

        <section v-if="frontendVideos.length" class="mb-16 sm:mb-24">
          <div
            class="mb-6 flex flex-wrap items-center justify-between gap-2 sm:mb-8"
          >
            <h2 class="text-2xl font-bold text-white sm:text-3xl">Videos</h2>

            <span class="text-sm text-[#A78BFA]">
              {{ frontendVideos.length }} Videos
            </span>
          </div>

          <div class="grid gap-5 sm:gap-8 md:grid-cols-2 xl:grid-cols-3">
            <div
              v-for="video in frontendVideos"
              :key="video.id"
              class="group overflow-hidden rounded-2xl bg-[#171121] ring-1 ring-[#2B2140] transition duration-300 hover:ring-[#6F46C5]/60"
            >
              <div class="relative aspect-video w-full overflow-hidden">
                <iframe
                  v-if="isPlaying(`video-${video.id}`)"
                  :src="`${video.embed_url}${video.embed_url.includes('?') ? '&' : '?'}autoplay=1`"
                  class="h-full w-full"
                  allow="autoplay; fullscreen"
                  allowfullscreen
                />

                <button
                  v-else
                  type="button"
                  class="absolute inset-0 h-full w-full"
                  :aria-label="`Play ${video.title}`"
                  @click="play(`video-${video.id}`)"
                >
                  <img
                    :src="video.thumbnail"
                    :alt="video.title"
                    class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  <div
                    class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"
                  />

                  <span
                    class="absolute inset-0 flex items-center justify-center"
                  >
                    <span
                      class="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/30 backdrop-blur-sm transition duration-300 group-hover:scale-110 group-hover:bg-[#6F46C5]"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        class="ml-1 h-6 w-6 text-white"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </span>
                  </span>
                </button>
              </div>

              <div class="space-y-2 p-5">
                <h3 class="font-semibold text-white">
                  {{ video.title }}
                </h3>

                <p
                  v-if="video.description"
                  class="line-clamp-2 text-sm text-gray-400"
                >
                  {{ video.description }}
                </p>
              </div>
            </div>
          </div>
        </section>

        <!-- ================= Podcasts ================= -->

        <section v-if="frontendPodcasts.length" class="mb-16 sm:mb-24">
          <div
            class="mb-6 flex flex-wrap items-center justify-between gap-2 sm:mb-8"
          >
            <h2 class="text-2xl font-bold text-white sm:text-3xl">Podcasts</h2>

            <span class="text-sm text-[#A78BFA]">
              {{ frontendPodcasts.length }} Episodes
            </span>
          </div>

          <div class="space-y-4 sm:space-y-6">
            <div
              v-for="podcast in frontendPodcasts"
              :key="podcast.id"
              class="group rounded-2xl bg-[#171121] p-4 ring-1 ring-[#2B2140] transition duration-300 hover:ring-[#6F46C5]/60 sm:p-6"
            >
              <div class="grid gap-4 sm:gap-6 lg:grid-cols-[380px_1fr]">
                <div
                  class="relative aspect-video w-full overflow-hidden rounded-xl"
                >
                  <iframe
                    v-if="isPlaying(`podcast-${podcast.id}`)"
                    :src="`${podcast.embed_url}${podcast.embed_url.includes('?') ? '&' : '?'}autoplay=1`"
                    class="h-full w-full"
                    allow="autoplay; fullscreen"
                    allowfullscreen
                  />

                  <button
                    v-else
                    type="button"
                    class="absolute inset-0 h-full w-full"
                    :aria-label="`Play ${podcast.title}`"
                    @click="play(`podcast-${podcast.id}`)"
                  >
                    <img
                      :src="podcast.thumbnail"
                      :alt="podcast.title"
                      class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />

                    <div
                      class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"
                    />

                    <span
                      class="absolute inset-0 flex items-center justify-center"
                    >
                      <span
                        class="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/30 backdrop-blur-sm transition duration-300 group-hover:scale-110 group-hover:bg-[#6F46C5]"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          class="ml-1 h-5 w-5 text-white"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </span>
                    </span>
                  </button>
                </div>

                <div class="flex flex-col justify-center">
                  <span
                    class="mb-2 w-fit rounded-full bg-[#6F46C5]/15 px-3 py-1 text-xs font-medium uppercase tracking-wide text-[#A78BFA]"
                  >
                    Episode
                  </span>

                  <h3 class="mb-3 text-xl font-bold text-white sm:text-2xl">
                    {{ podcast.title }}
                  </h3>

                  <p
                    v-if="podcast.description"
                    class="text-sm text-gray-400 sm:text-base"
                  >
                    {{ podcast.description }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- ================= Reels ================= -->

        <section v-if="frontendReels.length">
          <div
            class="mb-6 flex flex-wrap items-center justify-between gap-2 sm:mb-8"
          >
            <h2 class="text-2xl font-bold text-white sm:text-3xl">Reels</h2>

            <span class="text-sm text-[#A78BFA]">
              {{ frontendReels.length }} Reels
            </span>
          </div>

          <div
            class="grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-3 xl:grid-cols-5"
          >
            <div
              v-for="reel in frontendReels"
              :key="reel.id"
              class="group overflow-hidden rounded-3xl bg-[#171121] ring-1 ring-[#2B2140] transition duration-300 hover:ring-[#6F46C5]/60"
            >
              <div class="relative aspect-[9/16] w-full overflow-hidden">
                <iframe
                  v-if="isPlaying(`reel-${reel.id}`)"
                  :src="`${reel.embed_url}${reel.embed_url.includes('?') ? '&' : '?'}autoplay=1`"
                  class="h-full w-full"
                  allow="autoplay; fullscreen"
                  allowfullscreen
                />

                <button
                  v-else
                  type="button"
                  class="absolute inset-0 h-full w-full"
                  :aria-label="`Play ${reel.title}`"
                  @click="play(`reel-${reel.id}`)"
                >
                  <img
                    :src="reel.thumbnail"
                    :alt="reel.title"
                    class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  <div
                    class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"
                  />

                  <span
                    class="absolute inset-0 flex items-center justify-center"
                  >
                    <span
                      class="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/30 backdrop-blur-sm transition duration-300 group-hover:scale-110 group-hover:bg-[#6F46C5]"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        class="ml-0.5 h-4 w-4 text-white"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </span>
                  </span>

                  <p
                    class="absolute bottom-0 left-0 right-0 truncate p-3 text-left text-sm font-medium text-white"
                  >
                    {{ reel.title }}
                  </p>
                </button>
              </div>
            </div>
          </div>
        </section>
      </template>
    </div>

    <!-- ================= Lightbox ================= -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="lightboxImage"
          class="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          @click.self="closeLightbox"
        >
          <button
            type="button"
            aria-label="Close"
            class="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/20 transition hover:bg-[#6F46C5] sm:right-6 sm:top-6"
            @click="closeLightbox"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              class="h-5 w-5"
            >
              <path stroke-linecap="round" d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>

          <button
            v-if="frontendGalleryImages.length > 1"
            type="button"
            aria-label="Previous image"
            class="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/20 transition hover:bg-[#6F46C5] sm:left-6"
            @click.stop="showPrev"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              class="h-5 w-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 18l-6-6 6-6"
              />
            </svg>
          </button>

          <button
            v-if="frontendGalleryImages.length > 1"
            type="button"
            aria-label="Next image"
            class="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/20 transition hover:bg-[#6F46C5] sm:right-6"
            @click.stop="showNext"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              class="h-5 w-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 18l6-6-6-6"
              />
            </svg>
          </button>

          <figure
            class="mx-4 flex max-h-[85vh] max-w-4xl flex-col items-center sm:mx-16"
          >
            <img
              :src="lightboxImage.image"
              :alt="lightboxImage.title"
              class="max-h-[75vh] w-auto rounded-lg object-contain shadow-2xl"
              @click.stop
            />

            <figcaption
              v-if="lightboxImage.title"
              class="mt-4 text-center text-sm text-gray-300 sm:text-base"
            >
              {{ lightboxImage.title }}
            </figcaption>
          </figure>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>
