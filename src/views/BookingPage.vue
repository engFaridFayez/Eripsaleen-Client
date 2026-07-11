<script setup>
import { computed, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import SectionCard from "@/components/SectionCard.vue";
import { useEventStore } from "@/stores/events";
import { useBookingStore } from "@/stores/booking";
import { useRoute } from "vue-router";

const route = useRoute();

const eventId = Number(route.params.eventId);
const router = useRouter();

const eventStore = useEventStore();
const bookingStore = useBookingStore();

const { events, seatMap, selectedEventId } = storeToRefs(eventStore);

onMounted(async () => {
  await eventStore.fetchSeatMap(eventId);
  await eventStore.fetchEvent(eventId);
});

const currentEvent = computed(() =>
  events.value.find((e) => e.id === selectedEventId.value),
);
const totalPrice = computed(() => {
  return bookingStore.selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
});
async function selectEvent(id) {
  bookingStore.reset();

  eventStore.selectedEventId = id;

  await eventStore.fetchSeatMap(id);
}

function toggleSeat(seat) {
  bookingStore.toggleSeat({
    id: seat.id,
    seat_number: seat.seat_number,
    price: Number(seat.category?.price ?? seat.price),
  });
}
const selectedSeatIds = computed(() => {
  return new Set(bookingStore.selectedSeats.map((seat) => seat.id));
});

const selectedSeatNumbers = computed(() =>
  bookingStore.selectedSeats.map((seat) => seat.seat_number),
);
const selectedSeats = computed(() => {
  if (!seatMap.value) return [];

  const result = [];

  seatMap.value.sections.forEach((section) => {
    section.rows.forEach((row) => {
      row.seats.forEach((seat) => {
        if (selectedSeatIds.value.has(seat.id)) {
          result.push({
            ...seat,
            row: row.row_number,
            section: section.name,
          });
        }
      });
    });
  });

  return result;
});

function getSectionPlacement(section) {
  const name = section.name.toLowerCase();

  // VIP
  if (name.includes("vip")) {
    if (name.includes("left")) return "vip-left";
    if (name.includes("right")) return "vip-right";
    return "vip-middle";
  }

  // Balcony
  if (name.includes("bal")) {
    if (name.includes("left")) return "balcony-left";
    if (name.includes("right")) return "balcony-right";
    return "balcony-middle";
  }

  // Normal
  if (name.includes("left")) return "left";
  if (name.includes("right")) return "right";

  return "middle";
}
const layout = [
  ["vip-left", "vip-middle", "vip-right"],
  ["left", "middle", "right"],
  ["balcony-left", "balcony-middle", "balcony-right"],
];
const sectionColumns = computed(() => {
  const columns = {
    "vip-left": [],
    "vip-middle": [],
    "vip-right": [],

    left: [],
    middle: [],
    right: [],

    "balcony-left": [],
    "balcony-middle": [],
    "balcony-right": [],
  };

  seatMap.value?.sections.forEach((section) => {
    columns[getSectionPlacement(section)].push(section);
  });

  return columns;
});

function confirmBooking() {
  if (!bookingStore.selectedSeats.length) return;

  router.push({
    name: "payment",
    params: {
      eventId: selectedEventId.value,
    },
  });
}
</script>

<template>
  <main class="min-h-screen w-full pt-20">
    <!-- Header -->
    <div class="relative overflow-hidden px-4 pb-12 pt-16 text-center sm:px-8">
      <div
        class="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(46,31,94,0.6),transparent_70%)] blur-[40px]"
      ></div>

      <h1
        class="mb-3 font-[var(--ff-display)] text-[clamp(2.2rem,5vw,3.5rem)] font-black text-[var(--ivory)]"
      >
        Choose Your Seat
      </h1>
      <p class="mx-auto max-w-[540px] italic text-[var(--stone)]">
        Select your preferred seats from the hall map below. Gold seats are
        available; dimmed seats are taken.
      </p>
      <div
        class="mx-auto mb-10 flex max-w-5xl flex-col items-center justify-center rounded-xl border border-[rgba(201,168,76,.25)] bg-[rgba(26,20,48,.55)] p-4 sm:p-8"
        v-if="currentEvent"
      >
        <h2 class="text-2xl font-bold text-[var(--gold)] sm:text-3xl">
          {{ currentEvent.show }}
        </h2>

        <p class="mt-2 text-lg text-[var(--ivory)] sm:text-xl">
          {{ currentEvent.title }}
        </p>

        <div class="mt-6 flex flex-wrap justify-center gap-4 sm:gap-8">
          <div>
            <div class="text-xs uppercase text-[var(--gold)]">Theater</div>
            <div>
              {{ currentEvent.theater_name }}
            </div>
          </div>
          <div>
            <div class="text-xs uppercase text-[var(--gold)]">Date</div>

            <div>
              {{ new Date(currentEvent.event_date).toLocaleString() }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Stage + Seat Map -->
    <div class="mx-auto w-full max-w-[1600px] px-4 pb-40 pt-12 sm:px-8">
      <div class="mx-auto max-w-[1500px]">
        <!-- Stage -->
        <div class="mb-8 text-center">
          <div
            class="stage relative inline-block min-w-[260px] rounded-t-[80px] border border-b-0 border-[rgba(201,168,76,0.4)] bg-[linear-gradient(180deg,rgba(46,31,94,0.9)_0%,rgba(122,28,46,0.4)_100%)] px-6 pb-6 pt-8 sm:min-w-[320px] sm:px-12"
          >
            <div class="text-center">
              <div
                class="mb-1 text-2xl text-[var(--gold)] [text-shadow:0_0_12px_var(--gold)]"
              >
                ✛
              </div>
              <div
                class="font-[var(--ff-heading)] text-[0.8rem] font-bold uppercase tracking-[0.4em] text-[var(--gold-lt)]"
              >
                STAGE
              </div>
              <div
                class="mt-1 font-[var(--ff-arabic)] text-[0.8rem] text-[var(--smoke)]"
              >
                المسرح
              </div>
            </div>
          </div>
          <div class="flex justify-center gap-0">
            <div
              class="step h-1.5 max-w-[340px] flex-1 border border-t-0 border-[rgba(201,168,76,0.2)]"
            ></div>
            <div
              class="step h-1.5 max-w-[340px] flex-1 border border-t-0 border-[rgba(201,168,76,0.2)]"
            ></div>
            <div
              class="step h-1.5 max-w-[340px] flex-1 border border-t-0 border-[rgba(201,168,76,0.2)]"
            ></div>
          </div>
        </div>
        <div
          class="w-full overflow-auto pb-3"
          v-if="seatMap"
          style="touch-action: pan-x pan-y pinch-zoom"
        >
          <div class="flex flex-col gap-8 min-w-[900px]">
            <div
              v-for="(row, rowIndex) in layout"
              :key="rowIndex"
              class="grid grid-cols-3 gap-6"
            >
              <div
                v-for="column in row"
                :key="column"
                class="flex flex-col gap-6"
              >
                <SectionCard
                  v-for="section in sectionColumns[column]"
                  :key="section.id"
                  :section="section"
                  :selected-seat-ids="selectedSeatIds"
                  :toggle-seat="toggleSeat"
                  :highlight="column.includes('middle')"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Legend -->
        <div class="mt-10 flex flex-wrap justify-center gap-4 sm:gap-8">
          <div
            class="flex items-center gap-2 font-[var(--ff-heading)] text-[0.7rem] uppercase tracking-[0.1em] text-[var(--stone)]"
          >
            <div
              class="h-5 w-5 rounded-[3px_3px_2px_2px] border border-[rgba(201,168,76,0.4)] bg-[rgba(26,20,48,0.8)]"
            ></div>
            <span>Available</span>
          </div>
          <div
            class="flex items-center gap-2 font-[var(--ff-heading)] text-[0.7rem] uppercase tracking-[0.1em] text-[var(--stone)]"
          >
            <div
              class="h-5 w-5 rounded-[3px_3px_2px_2px] border border-[var(--gold-glow)] bg-[var(--gold)]"
            ></div>
            <span>Selected</span>
          </div>
          <div
            class="flex items-center gap-2 font-[var(--ff-heading)] text-[0.7rem] uppercase tracking-[0.1em] text-[var(--stone)]"
          >
            <div
              class="h-5 w-5 rounded-[3px_3px_2px_2px] border border-[rgba(100,80,120,0.25)] bg-[rgba(20,15,35,0.7)]"
            ></div>
            <span>Reserved</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Booking Summary -->
    <div
      class="fixed inset-x-0 bottom-0 z-50 max-h-[75vh] overflow-y-auto border-t border-[rgba(201,168,76,0.3)] bg-[rgba(13,10,20,0.97)] py-3 backdrop-blur-[20px] transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] sm:max-h-none sm:py-4"
      :class="bookingStore.seatCount > 0 ? 'translate-y-0' : 'translate-y-full'"
    >
      <div
        class="mx-auto flex max-w-[1200px] flex-col items-stretch justify-between gap-4 px-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6 sm:px-8"
      >
        <div class="min-w-0 flex-1">
          <div
            class="font-[var(--ff-heading)] text-base font-bold text-[var(--gold-lt)]"
          >
            {{ bookingStore.seatCount }}
            Seat{{ bookingStore.seatCount !== 1 ? "s" : "" }} Selected
          </div>

          <!-- Selected Seats -->
          <div
            class="mt-3 flex max-h-32 flex-wrap gap-2 overflow-y-auto pr-1 sm:max-h-40"
          >
            <div
              v-for="seat in selectedSeats"
              :key="seat.id"
              class="rounded border border-[rgba(201,168,76,.25)] bg-[rgba(26,20,48,.85)] px-3 py-2"
            >
              <div
                class="font-[var(--ff-heading)] text-[12px] font-bold"
                :style="{ color: seat.color }"
              >
                {{ seat.section }}
              </div>

              <div class="text-[11px] text-[var(--stone)]">
                Row {{ seat.row }} • Seat {{ seat.seat_number }}
              </div>

              <div class="text-[11px] text-[var(--stone)]">
                {{ seat.category?.name }}
              </div>
              <div
                class="font-[var(--ff-heading)] text-[12px] font-bold"
                :style="{ color: seat.category?.color }"
              >
                {{ seat.section }}
              </div>

              <div
                class="mt-1 text-sm font-bold"
                :style="{ color: seat.category?.color }"
              >
                EGP {{ seat.category?.price ?? seat.price }}
              </div>
            </div>
          </div>

          <!-- Total -->
          <div
            class="mt-4 font-[var(--ff-heading)] text-lg font-bold text-[var(--ivory)]"
          >
            Total :
            <span class="text-[var(--gold)]"> EGP {{ totalPrice }} </span>
          </div>
        </div>

        <button
          class="w-full cursor-pointer whitespace-nowrap rounded-sm border-0 bg-[linear-gradient(135deg,var(--gold),var(--gold-lt))] px-9 py-3.5 font-[var(--ff-heading)] text-[0.8rem] font-bold uppercase tracking-[0.15em] text-[var(--ink)] transition-[box-shadow,transform] duration-200 hover:-translate-y-px hover:shadow-[0_0_25px_rgba(201,168,76,0.5)] sm:w-auto"
          @click="confirmBooking"
        >
          Confirm Booking
        </button>
      </div>
    </div>
  </main>
</template>

<style scoped>
.stage::before {
  content: "";
  position: absolute;
  inset: -1px;
  border-radius: inherit;
  box-shadow:
    0 0 40px rgba(201, 168, 76, 0.15),
    inset 0 0 30px rgba(201, 168, 76, 0.05);
  pointer-events: none;
}

.modal {
  animation: modal-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes modal-in {
  from {
    transform: scale(0.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
