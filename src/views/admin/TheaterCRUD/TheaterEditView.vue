<script setup lang="ts">
import { reactive, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useTheaterStore } from "@/stores/adminStores/theater";

const route = useRoute();
const router = useRouter();
const theaterStore = useTheaterStore();

const form = reactive({
  name: "",
  location: "",
});

onMounted(async () => {
  const id = Number(route.params.id);

  await theaterStore.getTheaterById(id);

  if (theaterStore.theater) {
    form.name = theaterStore.theater.name;
    form.location = theaterStore.theater.location;
  }
});

const submit = async () => {
  const id = Number(route.params.id);

  await theaterStore.updateTheater(id, {
    id,
    name: form.name,
    location: form.location,
  });

  router.push({ name: "theaters" });
};
</script>

<template>
  <div class="max-w-3xl mx-auto">
    <div class="mb-8">
      <h1 class="text-3xl font-bold">Edit Theater</h1>

      <p class="text-gray-400 mt-2">Update theater information.</p>
    </div>

    <form
      @submit.prevent="submit"
      class="space-y-6 rounded-2xl border border-[#C9A84C]/20 bg-[#120E1D] p-8"
    >
      <div>
        <label class="block mb-2"> Theater Name </label>

        <input
          v-model="form.name"
          type="text"
          class="w-full rounded-xl border border-[#C9A84C]/20 bg-[#1B1628] px-4 py-3 outline-none"
        />
      </div>

      <div>
        <label class="block mb-2"> Location </label>

        <input
          v-model="form.location"
          type="text"
          class="w-full rounded-xl border border-[#C9A84C]/20 bg-[#1B1628] px-4 py-3 outline-none"
        />
      </div>

      <div class="flex justify-end gap-4">
        <RouterLink
          :to="{ name: 'theaters' }"
          class="rounded-xl border border-[#C9A84C]/20 px-6 py-3"
        >
          Cancel
        </RouterLink>

        <button
          type="submit"
          :disabled="theaterStore.loading"
          class="rounded-xl bg-[#C9A84C] px-6 py-3 font-semibold text-black"
        >
          {{ theaterStore.loading ? "Updating..." : "Update Theater" }}
        </button>
      </div>
    </form>
  </div>
</template>
