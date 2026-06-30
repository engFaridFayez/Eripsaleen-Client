<script setup lang="ts">
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useTheaterStore } from "@/stores/adminStores/theater";

const router = useRouter();
const theaterStore = useTheaterStore();

const form = reactive({
  name: "",
  location: "",
});

const submit = async () => {
  if (!form.name.trim() || !form.location.trim()) {
    alert("Please fill all fields.");
    return;
  }

  await theaterStore.createTheater(form as any);

  router.push({ name: "theaters" });
};
</script>

<template>
  <div class="max-w-3xl mx-auto">
    <div class="mb-8">
      <h1 class="text-3xl font-bold">Add Theater</h1>
      <p class="text-gray-400 mt-2">
        Create a new theater.
      </p>
    </div>

    <form
      @submit.prevent="submit"
      class="space-y-6 rounded-2xl border border-[#C9A84C]/20 bg-[#120E1D] p-8"
    >
      <!-- Name -->
      <div>
        <label class="mb-2 block text-sm font-medium">
          Theater Name
        </label>

        <input
          v-model="form.name"
          type="text"
          placeholder="Enter theater name"
          class="w-full rounded-xl border border-[#C9A84C]/20 bg-[#1B1628] px-4 py-3 outline-none focus:border-[#C9A84C]"
        />
      </div>

      <!-- Location -->
      <div>
        <label class="mb-2 block text-sm font-medium">
          Location
        </label>

        <input
          v-model="form.location"
          type="text"
          placeholder="Enter location"
          class="w-full rounded-xl border border-[#C9A84C]/20 bg-[#1B1628] px-4 py-3 outline-none focus:border-[#C9A84C]"
        />
      </div>

      <!-- Buttons -->
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
          class="rounded-xl bg-[#C9A84C] px-6 py-3 font-semibold text-black disabled:opacity-50"
        >
          {{ theaterStore.loading ? "Saving..." : "Save Theater" }}
        </button>
      </div>
    </form>
  </div>
</template>