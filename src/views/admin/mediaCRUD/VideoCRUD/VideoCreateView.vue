<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import { useVideoStore } from "@/stores/media/video";
import { useSubCategoryStore } from "@/stores/media/subCategory";

const router = useRouter();

const videoStore = useVideoStore();
const subCategoryStore = useSubCategoryStore();
const thumbnail = ref<File | null>(null);
const preview = ref("");
const form = ref({
  sub_category: null as number | null,
  content_type: "video",
  platform: "youtube",
  title: "",
  description: "",
  embed_url: "",
  order: 0,
  is_active: true,
});
const handleThumbnailChange = (event: Event) => {
  const target = event.target as HTMLInputElement;

  const file = target.files?.[0];

  if (!file) return;

  thumbnail.value = file;
  preview.value = URL.createObjectURL(file);
};
onMounted(() => {
  subCategoryStore.fetchSubCategories();
});

const submit = async () => {
  if (!form.value.sub_category) {
    return Swal.fire({
      icon: "warning",
      title: "Please select a sub category",
      background: "#120E1D",
      color: "#fff",
    });
  }

  const formData = new FormData();

  formData.append("sub_category", String(form.value.sub_category));

  formData.append("content_type", form.value.content_type);

  formData.append("platform", form.value.platform);

  formData.append("title", form.value.title);

  formData.append("description", form.value.description);

  formData.append("embed_url", form.value.embed_url);
  if (thumbnail.value) {
    formData.append("thumbnail", thumbnail.value);
  }

  formData.append("order", String(form.value.order));

  formData.append("is_active", String(form.value.is_active));

  try {
    await videoStore.addVideo(formData);

    await Swal.fire({
      icon: "success",
      title: "Video created successfully",
      timer: 1500,
      showConfirmButton: false,
      background: "#120E1D",
      color: "#fff",
    });

    router.push("/admin/videos");
  } catch {
    Swal.fire({
      icon: "error",
      title: "Failed to create video",
      background: "#120E1D",
      color: "#fff",
    });
  }
};
</script>

<template>
  <div class="mx-auto max-w-5xl p-6">
    <div
      class="overflow-hidden rounded-2xl border border-[#6F46C5] bg-[#5E3AA5] shadow-xl shadow-black/20"
    >
      <div class="border-b border-[#6F46C5] bg-[#0D0A14] p-6">
        <h1 class="text-2xl font-bold text-white">Create Video</h1>

        <p class="mt-1 text-gray-400">Add a new video</p>
      </div>

      <div class="space-y-6 p-6">
        <div>
          <label class="mb-2 block text-white"> Sub Category </label>

          <select
            v-model="form.sub_category"
            class="w-full rounded-lg border border-[#6F46C5] bg-[#120E1D] px-4 py-3 text-white outline-none"
          >
            <option :value="null">Select Sub Category</option>

            <option
              v-for="item in subCategoryStore.subCategories"
              :key="item.id"
              :value="item.id"
            >
              {{ item.name }}
            </option>
          </select>
        </div>

        <div class="grid gap-6 md:grid-cols-2">
          <div>
            <label class="mb-2 block text-white"> Platform </label>

            <select
              v-model="form.platform"
              class="w-full rounded-lg border border-[#6F46C5] bg-[#120E1D] px-4 py-3 text-white outline-none"
            >
              <option value="youtube">YouTube</option>

              <option value="facebook">Facebook</option>
            </select>
          </div>

          <div>
            <label class="mb-2 block text-white"> Content Type </label>

            <select
              v-model="form.content_type"
              class="w-full rounded-lg border border-[#6F46C5] bg-[#120E1D] px-4 py-3 text-white outline-none"
            >
              <option value="video">Video</option>

              <option value="podcast">Podcast</option>

              <option value="reel">Reel</option>
            </select>
          </div>
        </div>

        <div>
          <label class="mb-2 block text-white"> Title </label>

          <input
            v-model="form.title"
            type="text"
            class="w-full rounded-lg border border-[#6F46C5] bg-[#120E1D] px-4 py-3 text-white outline-none"
          />
        </div>

        <div>
          <label class="mb-2 block text-white"> Description </label>

          <textarea
            v-model="form.description"
            rows="4"
            class="w-full rounded-lg border border-[#6F46C5] bg-[#120E1D] px-4 py-3 text-white outline-none"
          />
        </div>

        <div>
          <label class="mb-2 block text-white"> Video URL </label>

          <input
            v-model="form.embed_url"
            type="url"
            placeholder="https://..."
            class="w-full rounded-lg border border-[#6F46C5] bg-[#120E1D] px-4 py-3 text-white outline-none"
          />

          <p class="mt-2 text-sm text-gray-400">
            Paste any YouTube or Facebook video link. The API will automatically
            convert it to the correct embed URL.
          </p>
        </div>
        <div>
          <label class="mb-2 block text-white"> Thumbnail </label>

          <input
            type="file"
            accept="image/*"
            @change="handleThumbnailChange"
            class="w-full rounded-lg border border-[#6F46C5] bg-[#120E1D] px-4 py-3 text-white file:mr-4 file:rounded-lg file:border-0 file:bg-[#6F46C5] file:px-4 file:py-2 file:text-white hover:file:bg-[#7B52D6]"
          />

          <img
            v-if="preview"
            :src="preview"
            alt="Thumbnail Preview"
            class="mt-4 h-48 w-full rounded-xl border border-[#6F46C5] object-cover"
          />
        </div>
        <div>
          <label class="mb-2 block text-white"> Order </label>

          <input
            v-model.number="form.order"
            type="number"
            min="0"
            class="w-full rounded-lg border border-[#6F46C5] bg-[#120E1D] px-4 py-3 text-white outline-none"
          />
        </div>

        <div>
          <label class="flex items-center gap-3 text-white">
            <input
              v-model="form.is_active"
              type="checkbox"
              class="h-5 w-5 accent-[#6F46C5]"
            />

            Active
          </label>
        </div>

        <div class="flex justify-end gap-3">
          <button
            @click="router.back()"
            class="rounded-lg border border-[#6F46C5] px-5 py-2 text-white transition hover:bg-[#4B2D87]"
          >
            Cancel
          </button>

          <button
            @click="submit"
            class="rounded-lg bg-[#6F46C5] px-5 py-2 text-white transition hover:bg-[#4B2D87]"
          >
            Create Video
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
