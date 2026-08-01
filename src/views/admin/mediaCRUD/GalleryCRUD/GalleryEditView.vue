<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import Swal from "sweetalert2";
import { useGalleryStore } from "@/stores/media/gallery";
import { useSubCategoryStore } from "@/stores/media/subCategory";

const route = useRoute();
const router = useRouter();

const galleryStore = useGalleryStore();
const subCategoryStore = useSubCategoryStore();

const image = ref<File | null>(null);
const preview = ref("");

const form = ref({
  sub_category: 0,
  title: "",
  order: 0,
  is_active: true,
});

onMounted(async () => {
  await subCategoryStore.fetchSubCategories();

  const gallery = await galleryStore.fetchGalleryImage(Number(route.params.id));

  form.value = {
    sub_category: gallery.sub_category,
    title: gallery.title,
    order: gallery.order,
    is_active: gallery.is_active,
  };

  preview.value = gallery.image;
});

const handleImageChange = (event: Event) => {
  const target = event.target as HTMLInputElement;

  const file = target.files?.[0];

  if (!file) return;

  image.value = file;
  preview.value = URL.createObjectURL(file);
};

const submit = async () => {
  const formData = new FormData();

  formData.append("sub_category", String(form.value.sub_category));

  formData.append("title", form.value.title);

  formData.append("order", String(form.value.order));

  formData.append("is_active", String(form.value.is_active));

  if (image.value) {
    formData.append("image", image.value);
  }

  try {
    await galleryStore.editGalleryImage(Number(route.params.id), formData);

    await Swal.fire({
      icon: "success",
      title: "Gallery image updated successfully",
      timer: 1500,
      showConfirmButton: false,
      background: "#120E1D",
      color: "#fff",
    });

    router.push("/admin/gallery");
  } catch {
    Swal.fire({
      icon: "error",
      title: "Failed to update gallery image",
      background: "#120E1D",
      color: "#fff",
    });
  }
};
</script>

<template>
  <div class="p-6 max-w-4xl mx-auto">
    <div
      class="rounded-2xl border border-[#6F46C5] bg-[#5E3AA5] shadow-xl shadow-black/20"
    >
      <div class="border-b border-[#6F46C5] bg-[#0D0A14] p-6">
        <h1 class="text-2xl font-bold text-white">Edit Gallery Image</h1>

        <p class="text-gray-400 mt-1">Update gallery image information</p>
      </div>

      <div class="space-y-6 p-6">
        <div>
          <label class="mb-2 block text-white"> Sub Category </label>

          <select
            v-model="form.sub_category"
            class="w-full rounded-lg border border-[#6F46C5] bg-[#120E1D] px-4 py-3 text-white outline-none"
          >
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
          <label class="mb-2 block text-white"> Title </label>

          <input
            v-model="form.title"
            type="text"
            class="w-full rounded-lg border border-[#6F46C5] bg-[#120E1D] px-4 py-3 text-white outline-none"
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
          <label class="mb-2 block text-white"> Image </label>

          <input
            type="file"
            accept="image/*"
            @change="handleImageChange"
            class="block w-full rounded-lg border border-[#6F46C5] bg-[#120E1D] p-3 text-white file:mr-4 file:rounded-md file:border-0 file:bg-[#6F46C5] file:px-4 file:py-2 file:text-white"
          />
        </div>

        <div v-if="preview">
          <img
            :src="preview"
            class="h-60 rounded-xl border border-[#6F46C5] object-cover"
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
            class="rounded-lg border border-[#6F46C5] px-5 py-2 text-white hover:bg-[#4B2D87]"
          >
            Cancel
          </button>

          <button
            @click="submit"
            class="rounded-lg bg-[#6F46C5] px-5 py-2 text-white hover:bg-[#4B2D87]"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
