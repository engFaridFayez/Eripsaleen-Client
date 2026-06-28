<script setup lang="ts">
defineProps({
  section: {
    type: Object,
    required: true,
  },
  isSelected: {
    type: Function,
    required: true,
  },
  toggleSeat: {
    type: Function,
    required: true,
  },
  highlight: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div
    class="w-full overflow-x-auto rounded border border-[rgba(201,168,76,0.12)] bg-[rgba(17,13,30,0.6)] px-4 py-5"
    :class="
      highlight ? 'border-[rgba(201,168,76,0.25)] bg-[rgba(26,20,48,0.7)]' : ''
    "
  >
    <div
      class="mb-4 border-b border-[rgba(201,168,76,0.15)] pb-2.5 text-center font-[var(--ff-heading)] text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-[var(--gold)]"
    >
      {{ section.name }}
    </div>

    <div
      v-for="row in section.rows"
      :key="row.id"
      class="mb-2.5 flex justify-center gap-[5px]"
    >
      <div
        class="flex h-8 w-8 shrink-0 items-center justify-center font-[var(--ff-heading)] text-[0.65rem] text-[var(--smoke)]"
      >
        {{ row.row_number }}
      </div>

      <button
        v-for="seat in row.seats"
        :key="seat.id"
        class="seat group relative flex h-8 w-[30px] shrink-0 cursor-pointer items-center justify-center overflow-visible rounded-[4px_4px_8px_8px] border text-[0.65rem] shadow-[0_2px_4px_rgba(0,0,0,0.4)] transition-all duration-200 hover:scale-110"
        :style="
          !seat.is_booked && !isSelected(seat.id)
            ? {
                backgroundColor: seat.color + '22',
                borderColor: seat.color,
              }
            : {}
        "
        :class="[
          seat.is_booked
            ? 'taken cursor-not-allowed border-gray-700 bg-gray-900 opacity-60'
            : '',

          isSelected(seat.id)
            ? 'selected border-[#f5d76e] bg-[linear-gradient(180deg,#d4af37,#b38b2d)]'
            : '',
        ]"
        :disabled="seat.is_booked"
        @click="toggleSeat(seat)"
      >
        <!-- Tooltip -->
        <div
          v-if="!seat.is_booked"
          class="pointer-events-none absolute -top-16 left-1/2 z-50 hidden -translate-x-1/2 whitespace-nowrap rounded bg-black/95 px-3 py-2 text-center text-[11px] text-white shadow-xl group-hover:block"
        >
          <div class="font-bold">
            {{ seat.category }}
          </div>

          <div class="text-yellow-400">{{ seat.price }} EGP</div>
        </div>
      </button>
    </div>
  </div>
</template>

<style scoped>
/* ============================= */
/* Stage */
/* ============================= */

.stage::before {
  content: "";
  position: absolute;
  inset: -1px;
  border-radius: inherit;
  box-shadow:
    0 0 40px rgba(201, 168, 76, 0.15),
    inset 0 0 30px rgba(201, 168, 76, 0.05);
}

.step:first-child {
  border-right: none;
}

.step:last-child {
  border-left: none;
}

/* ============================= */
/* Seat */
/* ============================= */

.seat::before {
  content: "";
  position: absolute;
  top: 4px;
  left: 6px;
  right: 6px;
  height: 12px;

  background: rgba(255, 255, 255, 0.08);

  border-radius: 4px 4px 2px 2px;

  border: 1px solid rgba(255, 255, 255, 0.15);

  transform: perspective(30px) rotateX(12deg);

  z-index: 2;
}

.seat::after {
  content: "";

  position: absolute;

  bottom: 5px;

  left: 5px;

  right: 5px;

  height: 9px;

  background: rgba(255, 255, 255, 0.05);

  border-radius: 6px;

  border: 1px solid rgba(255, 255, 255, 0.08);

  z-index: 1;
}

/* ============================= */
/* Selected */
/* ============================= */

.selected::before,
.selected::after {
  background: linear-gradient(#f5d76e, #c9a02c);
  border-color: #ffe89c;
}

/* ============================= */
/* Taken */
/* ============================= */

.taken::before,
.taken::after {
  background: rgba(60, 60, 60, 0.8);
  border-color: rgba(120, 120, 120, 0.4);
}
</style>
