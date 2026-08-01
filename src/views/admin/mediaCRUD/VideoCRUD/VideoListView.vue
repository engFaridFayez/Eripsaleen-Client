<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import Swal from "sweetalert2";
import { useVideoStore } from "@/stores/media/video";

const router = useRouter();

const videoStore = useVideoStore();

const { videos, loading, error } = storeToRefs(videoStore);

onMounted(() => {
  videoStore.fetchVideos();
});

const goCreate = () => {
  router.push("/admin/videos/create");
};

const goEdit = (id: number) => {
  router.push(`/admin/videos/${id}/edit`);
};

const handleDelete = async (id: number) => {
  const result = await Swal.fire({
    title: "Delete Video?",
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
    await videoStore.removeVideo(id);

    Swal.fire({
      icon: "success",
      title: "Deleted successfully",
      timer: 1500,
      showConfirmButton: false,
      background: "#120E1D",
      color: "#ffffff",
    });

    await videoStore.fetchVideos();
  } catch {
    Swal.fire({
      icon: "error",
      title: "Something went wrong",
      text: "Failed to delete the video.",
      background: "#120E1D",
      color: "#ffffff",
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
        <h1 class="text-xl font-bold text-white sm:text-2xl">Videos</h1>

        <p class="text-sm text-gray-400 sm:text-base">Manage your videos</p>
      </div>

      <button
        @click="goCreate"
        class="w-full rounded-lg bg-[#6F46C5] px-4 py-2 text-white transition hover:bg-[#4B2D87] sm:w-auto"
      >
        Add Video
      </button>
    </div>

    <div v-if="loading" class="py-10 text-center text-white">Loading...</div>

    <div v-else-if="error" class="text-red-400">
      {{ error }}
    </div>

    <template v-else>
      <!-- Mobile card list -->
      <div class="space-y-4 lg:hidden">
        <div
          v-for="item in videos"
          :key="item.id"
          class="rounded-2xl border border-[#6F46C5] bg-[#5E3AA5] p-4 shadow-xl shadow-black/20"
        >
          <div class="flex gap-3">
            <img
              v-if="item.thumbnail"
              :src="item.thumbnail"
              :alt="item.title"
              class="h-16 w-24 shrink-0 rounded-lg object-cover"
            />

            <div
              v-else
              class="flex h-16 w-24 shrink-0 items-center justify-center rounded-lg bg-[#0D0A14] text-xs text-gray-400"
            >
              No thumbnail
            </div>

            <div class="min-w-0 flex-1">
              <div class="flex items-start justify-between gap-2">
                <p class="truncate font-medium text-white">{{ item.title }}</p>

                <span
                  :class="item.is_active ? 'bg-green-600' : 'bg-red-600'"
                  class="shrink-0 rounded-full px-2 py-0.5 text-xs text-white"
                >
                  {{ item.is_active ? "Active" : "Inactive" }}
                </span>
              </div>

              <p class="truncate text-sm capitalize text-purple-200">
                {{ item.platform }} · {{ item.content_type }}
              </p>
            </div>
          </div>

          <div class="mt-4 grid grid-cols-3 gap-2 text-sm">
            <div class="min-w-0">
              <p class="text-xs uppercase tracking-wide text-white/50">
                Category
              </p>
              <p class="truncate text-white">{{ item.category_name }}</p>
            </div>

            <div class="min-w-0">
              <p class="text-xs uppercase tracking-wide text-white/50">
                Sub Category
              </p>
              <p class="truncate text-white">{{ item.sub_category_name }}</p>
            </div>

            <div class="min-w-0">
              <p class="text-xs uppercase tracking-wide text-white/50">Order</p>
              <p class="text-white">{{ item.order }}</p>
            </div>
          </div>

          <div class="mt-4 flex gap-2">
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
          v-if="!videos.length"
          class="rounded-2xl border border-[#6F46C5] bg-[#5E3AA5] p-6 text-center text-white"
        >
          No videos found
        </div>
      </div>

      <!-- Desktop table -->
      <div
        class="hidden overflow-hidden rounded-2xl border border-[#6F46C5] bg-[#5E3AA5] shadow-xl shadow-black/20 lg:block"
      >
        <div class="overflow-x-auto">
          <table class="min-w-full">
            <thead class="bg-[#0D0A14]">
              <tr class="border-b border-[#6F46C5]">
                <th class="p-4 text-left text-white">Thumbnail</th>

                <th class="p-4 text-left text-white">Title</th>

                <th class="p-4 text-left text-white">Platform</th>

                <th class="p-4 text-left text-white">Type</th>

                <th class="p-4 text-left text-white">Category</th>

                <th class="p-4 text-left text-white">Sub Category</th>

                <th class="p-4 text-left text-white">Order</th>

                <th class="p-4 text-left text-white">Status</th>

                <th class="p-4 text-left text-white">Actions</th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="item in videos"
                :key="item.id"
                class="transition hover:bg-[#4B2D87]"
              >
                <td class="p-4">
                  <img
                    v-if="item.thumbnail"
                    :src="item.thumbnail"
                    :alt="item.title"
                    class="h-16 w-24 rounded-lg object-cover"
                  />

                  <span v-else class="text-white"> - </span>
                </td>

                <td class="p-4 font-medium text-white">
                  {{ item.title }}
                </td>

                <td class="p-4 capitalize text-white">
                  {{ item.platform }}
                </td>

                <td class="p-4 capitalize text-white">
                  {{ item.content_type }}
                </td>

                <td class="p-4 text-white">
                  {{ item.category_name }}
                </td>

                <td class="p-4 text-white">
                  {{ item.sub_category_name }}
                </td>

                <td class="p-4 text-white">
                  {{ item.order }}
                </td>

                <td class="p-4">
                  <span
                    :class="item.is_active ? 'bg-green-600' : 'bg-red-600'"
                    class="rounded-full px-3 py-1 text-xs text-white"
                  >
                    {{ item.is_active ? "Active" : "Inactive" }}
                  </span>
                </td>

                <td class="p-4">
                  <div class="flex flex-wrap gap-2">
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

              <tr v-if="!videos.length">
                <td colspan="9" class="p-6 text-center text-white">
                  No videos found
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </template>
  </div>
</template>
