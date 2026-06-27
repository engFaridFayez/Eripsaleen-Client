<script setup>
import { computed, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import SectionCard from "@/components/SectionCard.vue";
import { useEventStore } from "@/stores/events";
import { useBookingStore } from "@/stores/booking";
import { useRoute } from 'vue-router'

const route = useRoute()

const eventId = Number(route.params.eventId)
const router = useRouter();

const eventStore = useEventStore();
const bookingStore = useBookingStore();

const { events, seatMap, selectedEventId } = storeToRefs(eventStore);

onMounted(async () => {
  await eventStore.fetchEvents();
  await eventStore.fetchSeatMap(eventId)
  if (events.value.length) {
    await eventStore.fetchSeatMap(events.value[0].id);
  }
});

const currentEvent = computed(() =>
  events.value.find((e) => e.id === selectedEventId.value),
);

const totalPrice = computed(() => {
  return bookingStore.selectedSeats.length * 150;
});

async function selectEvent(id) {
  bookingStore.reset();

  eventStore.selectedEventId = id;

  await eventStore.fetchSeatMap(id);
}

function toggleSeat(seat) {
  if (seat.is_booked) return;

  bookingStore.toggleSeat(seat.id);
}

function isSelected(seatId) {
  return bookingStore.selectedSeats.includes(seatId);
}

const selectedSeatNumbers = computed(() => {
  if (!seatMap.value) return [];

  const result = [];

  seatMap.value.sections.forEach((section) => {
    section.rows.forEach((row) => {
      row.seats.forEach((seat) => {
        if (bookingStore.selectedSeats.includes(seat.id)) {
          result.push(seat.seat_number);
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
    <div class="relative overflow-hidden px-8 pb-12 pt-16 text-center">
      <div
        class="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(46,31,94,0.6),transparent_70%)] blur-[40px]"
      ></div>
      <p
        class="mb-2 font-[var(--ff-heading)] text-xs font-semibold uppercase tracking-[0.3em] text-[var(--gold)]"
      >
        Reserve Your Place
      </p>
      <h1
        class="mb-3 font-[var(--ff-display)] text-[clamp(2.2rem,5vw,3.5rem)] font-black text-[var(--ivory)]"
      >
        Choose Your Seat
      </h1>
      <p class="mx-auto max-w-[540px] italic text-[var(--stone)]">
        Select your preferred seats from the hall map below. Gold seats are
        available; dimmed seats are taken.
      </p>
    </div>

    <!-- Event Selector -->
    <div class="border-b border-[rgba(201,168,76,0.15)] pb-8">
      <div class="mx-auto max-w-[1100px] px-8">
        <div class="flex flex-wrap justify-center gap-4">
          <button
            v-for="event in events"
            :key="event.id"
            class="flex cursor-pointer flex-col items-center gap-1 rounded-[3px] border px-6 py-3 transition-all duration-200"
            :class="
              selectedEventId === event.id
                ? 'border-[var(--gold)] bg-[linear-gradient(135deg,var(--gold),#a07828)] text-[var(--ink)]'
                : 'border-[rgba(201,168,76,0.2)] bg-transparent text-[var(--stone)] hover:border-[rgba(201,168,76,0.5)] hover:text-[var(--ivory)]'
            "
            @click="selectEvent(event.id)"
          >
            <span
              class="font-[var(--ff-heading)] text-[0.7rem] font-semibold uppercase tracking-[0.15em]"
            >
              {{ event.month }} {{ event.day }}
            </span>
            <span class="font-[var(--ff-body)] text-[0.95rem] font-medium">
              {{ event.title }}
            </span>
          </button>
        </div>
      </div>
    </div>

    <!-- Stage + Seat Map -->
    <div class="mx-auto w-full max-w-[1100px] px-4 pb-40 pt-12 sm:px-8">
      <div class="mx-auto max-w-[1000px]">
        <!-- Stage -->
        <div class="mb-8 text-center">
          <div
            class="stage relative inline-block min-w-[320px] rounded-t-[80px] border border-b-0 border-[rgba(201,168,76,0.4)] bg-[linear-gradient(180deg,rgba(46,31,94,0.9)_0%,rgba(122,28,46,0.4)_100%)] px-12 pb-6 pt-8"
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

        <div class="w-full overflow-x-auto pb-3" v-if="seatMap">
          <div class="flex flex-col gap-8">
            <div
              v-for="(row, rowIndex) in layout"
              :key="rowIndex"
              class="grid grid-cols-1 gap-6 md:grid-cols-3"
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
                  :isSelected="isSelected"
                  :toggleSeat="toggleSeat"
                  :highlight="column.includes('middle')"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Legend -->
        <div class="mt-10 flex justify-center gap-8">
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
      class="fixed inset-x-0 bottom-0 z-50 border-t border-[rgba(201,168,76,0.3)] bg-[rgba(13,10,20,0.97)] py-4 backdrop-blur-[20px] transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
      :class="bookingStore.seatCount > 0 ? 'translate-y-0' : 'translate-y-full'"
    >
      <div
        class="mx-auto flex max-w-[1100px] flex-wrap items-center justify-between gap-4 px-8"
      >
        <div>
          <div
            class="font-[var(--ff-heading)] text-base font-bold text-[var(--gold-lt)]"
          >
            {{ bookingStore.seatCount }} seat{{
              bookingStore.seatCount !== 1 ? "s" : ""
            }}
            selected
          </div>
          <div
            class="mt-0.5 max-w-[500px] font-[var(--ff-heading)] text-[0.7rem] tracking-[0.1em] text-[var(--stone)]"
          >
            {{ selectedSeatNumbers.join(" · ") }}
          </div>
          <div
            class="mt-1 font-[var(--ff-heading)] text-[0.8rem] text-[var(--ivory)]"
          >
            Total: EGP {{ totalPrice }}
          </div>
        </div>
        <button
          class="cursor-pointer whitespace-nowrap rounded-sm border-0 bg-[linear-gradient(135deg,var(--gold),var(--gold-lt))] px-9 py-3.5 font-[var(--ff-heading)] text-[0.8rem] font-bold uppercase tracking-[0.15em] text-[var(--ink)] transition-[box-shadow,transform] duration-200 hover:-translate-y-px hover:shadow-[0_0_25px_rgba(201,168,76,0.5)]"
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
