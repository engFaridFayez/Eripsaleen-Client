<script setup lang="ts">
import { reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";

import { useEventStore } from "@/stores/adminStores/event";
import { useShowStore } from "@/stores/adminStores/show";
import { useTheaterStore } from "@/stores/adminStores/theater";

const router = useRouter();

const eventStore = useEventStore();
const showStore = useShowStore();
const theaterStore = useTheaterStore();

const form = reactive({
  title: "",
  show: "",
  theater: "",
  event_date: "",
  sales_start: "",
  sales_end: "",
});

onMounted(async () => {
  await Promise.all([showStore.getShows(), theaterStore.getTheaters()]);
});

const submit = async () => {
  if (!form.title.trim() || !form.show || !form.theater || !form.event_date) {
    Swal.fire({
      icon: "warning",
      title: "Please fill all required fields.",
      background: "#120E1D",
      color: "#fff",
    });

    return;
  }

  try {
    await eventStore.createEvent({
      title: form.title,
      show: Number(form.show),
      theater: Number(form.theater),
      event_date: form.event_date,
      sales_start: form.sales_start,
      sales_end: form.sales_end,
    });

    Swal.fire({
      icon: "success",
      title: "Event created successfully",
      background: "#120E1D",
      color: "#fff",
      timer: 1500,
      showConfirmButton: false,
    });

    router.push({
      name: "events",
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
  <div class="mx-auto max-w-3xl">
    <div class="rounded-2xl border border-[#2B223A] bg-[#1A1427] p-8">
      <h1 class="mb-8 text-3xl font-bold text-white">Create Event</h1>

      <form @submit.prevent="submit" class="space-y-6">
        <!-- Title -->
        <div>
          <label class="mb-2 block text-sm text-gray-300"> Title </label>

          <input
            v-model="form.title"
            type="text"
            class="w-full rounded-xl border border-[#3A3150] bg-[#120E1D] px-4 py-3 text-white outline-none focus:border-[#C9A84C]"
          />
        </div>

        <!-- Show -->
        <div>
          <label class="mb-2 block text-sm text-gray-300"> Show </label>

          <select
            v-model="form.show"
            class="w-full rounded-xl border border-[#3A3150] bg-[#120E1D] px-4 py-3 text-white"
          >
            <option value="">Select Show</option>

            <option
              v-for="show in showStore.shows"
              :key="show.id"
              :value="show.id"
            >
              {{ show.title }}
            </option>
          </select>
        </div>

        <!-- Theater -->
        <div>
          <label class="mb-2 block text-sm text-gray-300"> Theater </label>

          <select
            v-model="form.theater"
            class="w-full rounded-xl border border-[#3A3150] bg-[#120E1D] px-4 py-3 text-white"
          >
            <option value="">Select Theater</option>

            <option
              v-for="theater in theaterStore.theaters"
              :key="theater.id"
              :value="theater.id"
            >
              {{ theater.name }}
            </option>
          </select>
        </div>

        <!-- Date -->
        <div>
          <label class="mb-2 block text-sm text-gray-300"> Event Date </label>

          <input
            v-model="form.event_date"
            type="datetime-local"
            class="w-full rounded-xl border border-[#3A3150] bg-[#120E1D] px-4 py-3 text-white outline-none focus:border-[#C9A84C]"
          />
        </div>
        <div>
          <label class="mb-2 block text-sm text-gray-300"> Sales Start </label>

          <input
            v-model="form.sales_start"
            type="datetime-local"
            class="w-full rounded-xl border border-[#3A3150] bg-[#120E1D] px-4 py-3 text-white"
          />
        </div>
        <div>
          <label class="mb-2 block text-sm text-gray-300"> Sales End </label>

          <input
            v-model="form.sales_end"
            type="datetime-local"
            class="w-full rounded-xl border border-[#3A3150] bg-[#120E1D] px-4 py-3 text-white"
          />
        </div>

        <div class="flex justify-end gap-3">
          <RouterLink
            :to="{ name: 'events' }"
            class="rounded-xl border border-gray-600 px-6 py-3 text-white transition hover:bg-gray-700"
          >
            Cancel
          </RouterLink>

          <button
            type="submit"
            class="rounded-xl bg-[#C9A84C] px-6 py-3 font-semibold text-[#120E1D] transition hover:opacity-90"
          >
            Create Event
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
