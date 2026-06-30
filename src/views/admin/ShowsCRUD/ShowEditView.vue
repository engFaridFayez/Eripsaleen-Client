<script setup lang="ts">
import { reactive, ref, onMounted } from "vue";
import { useRoute, useRouter, RouterLink } from "vue-router";
import Swal from "sweetalert2";

import { useShowStore } from "@/stores/adminStores/show";

const route = useRoute();
const router = useRouter();
const showStore = useShowStore();

const id = Number(route.params.id);

const form = reactive({
  title: "",
  description: "",
});

const cover = ref<File | null>(null);
const preview = ref<string | null>(null);

onMounted(async () => {
  await showStore.getShowById(id);

  if (!showStore.show) return;

  form.title = showStore.show.title;
  form.description = showStore.show.description;
  preview.value = showStore.show.cover;
});

const onFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;

  if (!target.files?.length) return;

  const file = target.files.item(0);

  if (!file) return;

  cover.value = file;
  preview.value = URL.createObjectURL(file);
};

const submit = async () => {
  if (!form.title.trim()) {
    Swal.fire({
      icon: "warning",
      title: "Title is required",
      background: "#120E1D",
      color: "#fff",
    });
    return;
  }

  const data = new FormData();

  data.append("title", form.title);
  data.append("description", form.description);

  if (cover.value) {
    data.append("cover", cover.value);
  }

  try {
    await showStore.updateShow(id, data);

    Swal.fire({
      icon: "success",
      title: "Show updated successfully",
      background: "#120E1D",
      color: "#fff",
      timer: 1500,
      showConfirmButton: false,
    });

    router.push({
      name: "shows",
    });
  } catch {
    Swal.fire({
      icon: "error",
      title: "Something went wrong",
      background: "#120E1D",
      color: "#fff",
    });
  }
};
</script>

<template>
  <div class="max-w-4xl mx-auto">
    <div class="mb-8">
      <h1 class="text-3xl font-bold">Edit Show</h1>

      <p class="mt-2 text-gray-400">Update show information.</p>
    </div>

    <form
      @submit.prevent="submit"
      class="space-y-6 rounded-2xl border border-[#C9A84C]/20 bg-[#120E1D] p-8"
    >
      <!-- Title -->

      <div>
        <label class="mb-2 block font-medium"> Title </label>

        <input
          v-model="form.title"
          type="text"
          class="w-full rounded-xl border border-[#C9A84C]/20 bg-[#1B1628] px-4 py-3 outline-none focus:border-[#C9A84C]"
        />
      </div>

      <!-- Description -->

      <div>
        <label class="mb-2 block font-medium"> Description </label>

        <textarea
          v-model="form.description"
          rows="5"
          class="w-full rounded-xl border border-[#C9A84C]/20 bg-[#1B1628] px-4 py-3 outline-none focus:border-[#C9A84C]"
        ></textarea>
      </div>

      <!-- Cover -->

      <div>
        <label class="mb-2 block font-medium"> Change Cover </label>

        <input
          type="file"
          accept="image/*"
          @change="onFileChange"
          class="block w-full text-sm"
        />
      </div>

      <!-- Preview -->

      <div v-if="preview">
        <p class="mb-3 font-medium">Cover Preview</p>

        <img
          :src="preview"
          class="h-72 rounded-xl border border-[#C9A84C]/20 object-cover"
        />
      </div>

      <!-- Buttons -->

      <div class="flex justify-end gap-4">
        <RouterLink
          :to="{ name: 'shows' }"
          class="rounded-xl border border-[#C9A84C]/20 px-6 py-3"
        >
          Cancel
        </RouterLink>

        <button
          :disabled="showStore.loading"
          class="rounded-xl bg-[#C9A84C] px-6 py-3 font-semibold text-black"
        >
          {{ showStore.loading ? "Updating..." : "Update Show" }}
        </button>
      </div>
    </form>
  </div>
</template>
