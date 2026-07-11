<script setup lang="ts">
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { useShowStore } from "@/stores/show";

const route = useRoute();
const showStore = useShowStore();
const { selectedShow } = storeToRefs(showStore);

onMounted(() => {
  showStore.fetchShow(Number(route.params.id));
});

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return {
    weekday: d.toLocaleDateString(undefined, { weekday: "short" }),
    day: d.toLocaleDateString(undefined, { day: "2-digit" }),
    month: d.toLocaleDateString(undefined, { month: "short" }),
    time: d.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };
}
</script>

<template>
  <div v-if="selectedShow" class="max-w-5xl mx-auto px-6 py-14 mt-10">
    <!-- Header -->
    <div class="mb-12">
      <span
        class="inline-block px-3 py-1 rounded-full bg-[var(--vault)] text-[var(--gold-lt)] text-xs font-medium"
      >
        Show Details
      </span>

      <h1
        class="mt-4 text-4xl md:text-5xl font-bold tracking-tight text-[var(--ivory)]"
      >
        {{ selectedShow.title }}
      </h1>

      <p class="mt-4 text-lg text-[var(--stone)] leading-8 max-w-3xl">
        {{ selectedShow.description }}
      </p>
    </div>

    <!-- Events -->
    <div>
      <h2
        class="text-sm uppercase tracking-[0.25em] text-[var(--smoke)] font-semibold mb-6"
      >
        Available Showtimes
      </h2>

      <div class="space-y-5">
        <div
          v-for="event in selectedShow.events"
          :key="event.id"
          class="group flex flex-col md:flex-row md:items-center md:justify-between gap-6 rounded-2xl border border-[var(--purple)] bg-[var(--vault)] p-6 shadow-sm hover:shadow-xl hover:border-[var(--gold)] transition-all duration-300"
        >
          <div class="flex items-center gap-6">
            <!-- Date -->
            <div
              class="w-20 rounded-xl border border-[var(--purple)] bg-[var(--deep)] text-center py-3"
            >
              <div class="text-xs uppercase text-[var(--smoke)]">
                {{ formatDate(event.event_date).weekday }}
              </div>

              <div class="text-3xl font-bold text-[var(--gold-lt)] leading-none my-1">
                {{ formatDate(event.event_date).day }}
              </div>

              <div class="text-xs uppercase text-[var(--smoke)]">
                {{ formatDate(event.event_date).month }}
              </div>
            </div>

            <!-- Info -->
            <div>
              <h3
                class="text-xl font-semibold text-[var(--ivory)] group-hover:text-[var(--gold-lt)]"
              >
                {{ event.title }}
              </h3>

              <div
                class="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-[var(--stone)]"
              >
                <span> 📍 {{ event.theater }} </span>

                <span> 🕒 {{ formatDate(event.event_date).time }} </span>
              </div>
            </div>
          </div>

          <!-- Button -->
          <router-link
            :to="{ name: 'booking-event', params: { eventId: event.id } }"
            class="inline-flex items-center justify-center rounded-xl bg-[var(--gold)] px-6 py-3 text-sm font-medium text-[var(--ink)] transition-all hover:bg-[var(--gold-lt)] hover:scale-105"
          >
            Book Ticket →
          </router-link>
        </div>
      </div>

      <div
        v-if="selectedShow.events.length === 0"
        class="rounded-2xl border border-dashed border-[var(--purple)] py-16 text-center text-[var(--smoke)]"
      >
        No upcoming events.
      </div>
    </div>
  </div>
</template>