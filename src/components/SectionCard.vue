<script setup>
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
        class="flex-5 h-7 w-10 shrink-0 items-center justify-center font-[var(--ff-heading)] text-[0.6rem] text-[var(--smoke)]"
      >
        {{ row.row_number }}
      </div>

      <button
        v-for="seat in row.seats"
        :key="seat.id"
        class="seat relative flex h-8 w-[30px] shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-[4px_4px_8px_8px] border bg-[rgba(26,20,48,0.9)] text-[0.65rem] shadow-[0_2px_4px_rgba(0,0,0,0.4),inset_0_2px_3px_rgba(255,255,255,0.08)] transition-all duration-200 ease-in-out max-[750px]:h-6 max-[750px]:w-6 max-[750px]:text-[0.55rem]"
        :class="[
          seat.is_booked
            ? 'taken cursor-not-allowed border-[rgba(100,80,120,0.4)] bg-[rgba(20,15,35,0.85)] brightness-75'
            : 'available border-[rgba(201,168,76,0.35)] bg-[rgba(26,20,48,0.8)] text-[var(--gold)] hover:scale-110 hover:border-[var(--gold)] hover:bg-[rgba(201,168,76,0.15)] hover:shadow-[0_8px_16px_rgba(201,168,76,0.3)] hover:-translate-y-0.5',
          isSelected(seat.id)
            ? 'selected border-[#f5d76e] bg-[linear-gradient(180deg,#d4af37,#b38b2d)] shadow-[0_4px_12px_rgba(201,168,76,0.6),inset_0_2px_4px_rgba(255,255,255,0.4)]'
            : '',
        ]"
        :disabled="seat.is_booked"
        @click="toggleSeat(seat)"
      >
        <!-- {{ seat.seat_number }} -->
      </button>
    </div>
  </div>
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
.step:first-child {
  border-right: none;
  border-radius: 0 0 0 4px;
}
.step:last-child {
  border-left: none;
  border-radius: 0 0 4px 0;
}

/* Individual seat */
.seat::before {
  content: "";
  position: absolute;
  top: 4px;
  left: 6px;
  right: 6px;
  height: 12px;
  background: linear-gradient(#3a2e6b, #2a204f);
  border-radius: 4px 4px 2px 2px;
  border: 1px solid rgba(201, 168, 76, 0.3);
  transform: perspective(30px) rotateX(12deg);
  z-index: 2;
}
.seat::after {
  content: "";
  position: absolute;
  bottom: 6px;
  left: 5px;
  right: 5px;
  height: 10px;
  background: linear-gradient(#4a3a7a, #32285a);
  border-radius: 6px;
  border: 1px solid rgba(201, 168, 76, 0.25);
  z-index: 1;
}
.seat.selected::before,
.seat.selected::after {
  background: linear-gradient(#f5d76e, #c9a02c);
  border-color: #ffe89c;
}
.seat.taken::before,
.seat.taken::after {
  background: rgba(40, 30, 55, 0.9);
}
</style>
