<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useGalleryStore } from "@/stores/media/gallery";
import { useSubCategoryStore } from "@/stores/media/subCategory";
import Swal from "sweetalert2";

const router = useRouter();

const galleryStore = useGalleryStore();
const subCategoryStore = useSubCategoryStore();

const subCategory = ref<number | null>(null);
const title = ref("");
const isActive = ref(true);

const images = ref<File[]>([]);
const previews = ref<string[]>([]);

onMounted(() => {
  subCategoryStore.fetchSubCategories();
});

const handleImagesChange = (event: Event) => {
  const target = event.target as HTMLInputElement;

  if (!target.files?.length) return;

  images.value = Array.from(target.files);

  previews.value = images.value.map((image) => URL.createObjectURL(image));
};

const submit = async () => {
  if (!subCategory.value) {
    Swal.fire({
      icon: "warning",
      title: "Please select a sub category",
      background: "#120E1D",
      color: "#fff",
    });

    return;
  }

  if (!images.value.length) {
    Swal.fire({
      icon: "warning",
      title: "Please select images",
      background: "#120E1D",
      color: "#fff",
    });

    return;
  }

  const formData = new FormData();

  formData.append("sub_category", String(subCategory.value));
  formData.append("title", title.value);
  formData.append("is_active", String(isActive.value));

  images.value.forEach((image) => {
    formData.append("images", image);
  });

  try {
    await galleryStore.addBulkGalleryImages(formData);

    await Swal.fire({
      icon: "success",
      title: "Images uploaded successfully",
      timer: 1500,
      showConfirmButton: false,
      background: "#120E1D",
      color: "#fff",
    });

    router.push("/admin/gallery");
  } catch {
    Swal.fire({
      icon: "error",
      title: "Upload failed",
      background: "#120E1D",
      color: "#fff",
    });
  }
};
</script>

<template>
  <div class="mx-auto max-w-5xl p-6">
    <div
      class="rounded-2xl border border-[#6F46C5] bg-[#5E3AA5] shadow-xl shadow-black/20"
    >
      <div class="border-b border-[#6F46C5] bg-[#0D0A14] p-6">
        <h1 class="text-2xl font-bold text-white">Upload Gallery Images</h1>

        <p class="mt-1 text-gray-400">Upload multiple gallery images</p>
      </div>

      <div class="space-y-6 p-6">
        <div>
          <label class="mb-2 block text-sm font-medium text-white">
            Sub Category
          </label>

          <select
            v-model="subCategory"
            class="w-full rounded-lg border border-[#6F46C5] bg-[#120E1D] px-4 py-3 text-white outline-none focus:border-violet-400"
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

        <div>
          <label class="mb-2 block text-sm font-medium text-white">
            Title (Optional)
          </label>

          <input
            v-model="title"
            type="text"
            class="w-full rounded-lg border border-[#6F46C5] bg-[#120E1D] px-4 py-3 text-white outline-none"
          />
        </div>

        <div>
          <label class="mb-2 block text-sm font-medium text-white">
            Images
          </label>

          <input
            type="file"
            multiple
            accept="image/*"
            @change="handleImagesChange"
            class="block w-full rounded-lg border border-[#6F46C5] bg-[#120E1D] p-3 text-white file:mr-4 file:rounded-md file:border-0 file:bg-[#6F46C5] file:px-4 file:py-2 file:text-white"
          />
        </div>

        <div>
          <label class="flex items-center gap-3 text-white">
            <input
              v-model="isActive"
              type="checkbox"
              class="h-5 w-5 accent-[#6F46C5]"
            />

            Active
          </label>
        </div>

        <div
          v-if="previews.length"
          class="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5"
        >
          <img
            v-for="(image, index) in previews"
            :key="index"
            :src="image"
            required
            class="aspect-square rounded-xl border border-[#6F46C5] object-cover"
          />
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
            Upload
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
