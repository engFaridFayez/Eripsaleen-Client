<script setup lang="ts">
defineProps({
  section: {
    type: Object,
    required: true,
  },
  selectedSeatIds: {
    type: Object,
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
    class="section-card w-full overflow-x-auto rounded border border-[rgba(201,168,76,0.12)] bg-[rgba(17,13,30,0.6)] px-4 py-5"
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
      class="mb-2.5 flex min-w-max justify-center gap-[5px]"
    >
      <div
        class="flex h-8 w-8 shrink-0 items-center justify-center font-[var(--ff-heading)] text-[0.65rem] text-[var(--smoke)]"
      >
        {{ row.row_number }}
      </div>

      <button
        v-for="seat in row.seats"
        :key="seat.id"
        v-memo="[seat.is_booked, selectedSeatIds.has(seat.id)]"
        @click="
          !seat.is_booked &&
          toggleSeat({
            ...seat,
            section: section.name,
            row: row.row_number,
          })
        "
        :disabled="seat.is_booked"
        class="seat group relative flex h-8 w-[30px] shrink-0 items-center justify-center overflow-visible rounded-[4px_4px_8px_8px] border text-[0.65rem] shadow-[0_2px_4px_rgba(0,0,0,0.4)]"
        :class="{
          selected: selectedSeatIds.has(seat.id),
          taken: seat.is_booked,
          'cursor-not-allowed opacity-50': seat.is_booked,
        }"
        :style="
          !seat.is_booked && !selectedSeatIds.has(seat.id)
            ? {
                backgroundColor: (seat.category?.color ?? '#c9a84c') + '22',
                borderColor: seat.category?.color ?? '#c9a84c',
              }
            : selectedSeatIds.has(seat.id)
              ? {
                  backgroundColor: seat.category?.color ?? '#c9a84c',
                  borderColor: seat.category?.color ?? '#c9a84c',
                }
              : {}
        "
      >
        <span
          class="relative z-[3] font-[var(--ff-heading)] text-xs font-extrabold leading-none"
          :class="selectedSeatIds.has(seat.id) ? 'text-black' : 'text-gray-300'"
        >
          {{ seat.seat_number }}
        </span>
        <div
          v-if="!seat.is_booked"
          class="pointer-events-none absolute -top-16 left-1/2 z-50 hidden -translate-x-1/2 whitespace-nowrap rounded bg-black/95 px-3 py-2 text-center text-[11px] text-white shadow-xl group-hover:block"
        >
          <div class="font-bold">
            {{ seat.category?.name }}
          </div>

          <div class="text-yellow-400">{{ seat.price ?? 0 }} EGP</div>
        </div>
      </button>
    </div>
  </div>
</template>

<style scoped>
/* ============================================================
   Perf: this is the single biggest win for the "chairs render
   late" and "scroll is janky" symptoms. There are usually many
   SectionCards rendered at once in the horizontal grid layout.
   content-visibility tells the browser to skip layout/paint for
   any card that's off-screen (e.g. sections scrolled out of
   view), instead of doing that work for all of them up front.
   contain-intrinsic-size gives it a placeholder size so scrollbar
   geometry doesn't jump once the real content is measured.
   ============================================================ */
.section-card {
  content-visibility: auto;
  contain-intrinsic-size: 280px 400px;
  contain: layout style paint;
}

/* ============================================================ */
/* Stage */
/* ============================================================ */

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

/* ============================================================ */
/* Seat */
/* ============================================================ */

.seat {
  /* Was transition-all — animating box-shadow/background/border
     on every one of potentially hundreds of seats is expensive.
     Scope it to transform only, and only where it's actually used
     (desktop hover, see below). */
  transition: transform 0.15s ease;
}

/* Only apply the hover scale on devices that actually have hover
   (mouse/trackpad). On touch devices this rule doesn't fire, which
   removes a source of "sticky hover" repaint after tapping a seat
   on mobile. */
@media (hover: hover) and (pointer: fine) {
  .seat:hover {
    transform: scale(1.1);
  }
}

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

/* ============================================================ */
/* Selected */
/* ============================================================ */

.selected::before,
.selected::after {
  background: linear-gradient(#f5d76e, #c9a02c);
  border-color: #ffe89c;
}

/* ============================================================ */
/* Taken */
/* ============================================================ */

.taken::before,
.taken::after {
  background: rgba(60, 60, 60, 0.8);
  border-color: rgba(120, 120, 120, 0.4);
}
</style>
