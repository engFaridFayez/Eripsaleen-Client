<template>
  <main class="booking-page">
    <!-- Header -->
    <div class="booking-header">
      <div class="header-glow"></div>
      <p class="section-eyebrow">Reserve Your Place</p>
      <h1 class="booking-title">Choose Your Seat</h1>
      <p class="booking-sub">Select your preferred seats from the hall map below. Gold seats are available; dimmed seats are taken.</p>
    </div>

    <!-- Event Selector -->
    <div class="event-selector-wrap">
      <div class="container">
        <div class="event-tabs">
          <button
            v-for="event in events" :key="event.id"
            class="event-tab"
            :class="{ active: selectedEvent === event.id }"
            @click="selectEvent(event.id)"
          >
            <span class="tab-date">{{ event.month }} {{ event.day }}</span>
            <span class="tab-name">{{ event.name }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Stage + Seat Map -->
    <div class="hall-wrap container">
      <div class="hall">

        <!-- Stage -->
        <div class="stage-area">
          <div class="stage">
            <div class="stage-inner">
              <div class="stage-cross">✛</div>
              <div class="stage-label">STAGE</div>
              <div class="stage-arabic">المسرح</div>
            </div>
          </div>
          <div class="stage-steps">
            <div class="step"></div>
            <div class="step"></div>
            <div class="step"></div>
          </div>
        </div>

        <!-- Sections -->
        <div class="sections-wrap">

          <!-- Left Section -->
          <div class="section-block">
            <div class="section-label">Left Wing · الجناح الأيسر</div>
            <div class="seats-grid">
              <div class="row-label-col">
                <div v-for="row in sectionRows" :key="row" class="row-label">{{ row }}</div>
              </div>
              <div class="seats-col">
                <div v-for="row in sectionRows" :key="row" class="seat-row">
                  <button
                    v-for="col in leftCols"
                    :key="`L-${row}-${col}`"
                    class="seat"
                    :class="getSeatClass('L', row, col)"
                    :disabled="isTaken('L', row, col)"
                    @click="toggleSeat('L', row, col)"
                    :title="`L-${row}${col}`"
                  >
                    <span class="seat-icon">{{ getSeatIcon('L', row, col) }}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Center Section -->
          <div class="section-block center">
            <div class="section-label">Center · الوسط</div>
            <div class="seats-grid">
              <div class="row-label-col">
                <div v-for="row in sectionRows" :key="row" class="row-label">{{ row }}</div>
              </div>
              <div class="seats-col">
                <div v-for="row in sectionRows" :key="row" class="seat-row">
                  <button
                    v-for="col in centerCols"
                    :key="`C-${row}-${col}`"
                    class="seat"
                    :class="getSeatClass('C', row, col)"
                    :disabled="isTaken('C', row, col)"
                    @click="toggleSeat('C', row, col)"
                    :title="`C-${row}${col}`"
                  >
                    <span class="seat-icon">{{ getSeatIcon('C', row, col) }}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Section -->
          <div class="section-block">
            <div class="section-label">Right Wing · الجناح الأيمن</div>
            <div class="seats-grid">
              <div class="row-label-col">
                <div v-for="row in sectionRows" :key="row" class="row-label">{{ row }}</div>
              </div>
              <div class="seats-col">
                <div v-for="row in sectionRows" :key="row" class="seat-row">
                  <button
                    v-for="col in rightCols"
                    :key="`R-${row}-${col}`"
                    class="seat"
                    :class="getSeatClass('R', row, col)"
                    :disabled="isTaken('R', row, col)"
                    @click="toggleSeat('R', row, col)"
                    :title="`R-${row}${col}`"
                  >
                    <span class="seat-icon">{{ getSeatIcon('R', row, col) }}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Legend -->
        <div class="legend">
          <div class="legend-item">
            <div class="legend-seat available"></div>
            <span>Available</span>
          </div>
          <div class="legend-item">
            <div class="legend-seat selected"></div>
            <span>Selected</span>
          </div>
          <div class="legend-item">
            <div class="legend-seat taken"></div>
            <span>Reserved</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Booking Summary -->
    <div class="summary-bar" :class="{ visible: selectedSeats.length > 0 }">
      <div class="summary-inner container">
        <div class="summary-info">
          <div class="summary-count">{{ selectedSeats.length }} seat{{ selectedSeats.length !== 1 ? 's' : '' }} selected</div>
          <div class="summary-seats">{{ selectedSeats.join(' · ') }}</div>
          <div class="summary-price">Total: EGP {{ totalPrice }}</div>
        </div>
        <button class="confirm-btn" @click="confirmBooking">
          Confirm Booking
        </button>
      </div>
    </div>

    <!-- Confirmation Modal -->
    <Teleport to="body">
      <div class="modal-overlay" v-if="showModal" @click.self="closeModal">
        <div class="modal">
          <div class="modal-cross">✛</div>
          <div class="modal-icon">✓</div>
          <h2 class="modal-title">Booking Confirmed!</h2>
          <p class="modal-sub">Your seats have been reserved. May this evening bless your soul.</p>
          <div class="modal-detail">
            <strong>Seats:</strong> {{ confirmedSeats.join(' · ') }}
          </div>
          <div class="modal-detail">
            <strong>Event:</strong> {{ currentEvent?.name }}
          </div>
          <div class="modal-detail">
            <strong>Total:</strong> EGP {{ confirmedTotal }}
          </div>
          <button class="modal-close" @click="closeModal">Close</button>
        </div>
      </div>
    </Teleport>
  </main>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'

const events = [
  { id: 1, month: 'JUL', day: '14', name: 'Night of Praise', price: 150 },
  { id: 2, month: 'AUG', day: '22', name: 'Voices of the Holy', price: 120 },
  { id: 3, month: 'SEP', day: '07', name: 'Leilat El-Tasbih', price: 200 },
]

const selectedEvent = ref(1)
const currentEvent = computed(() => events.find(e => e.id === selectedEvent.value))

const sectionRows = ['A','B','C','D','E','F','G']
const leftCols   = [1,2,3,4,5]
const centerCols = [1,2,3,4,5,6,7,8]
const rightCols  = [1,2,3,4,5]

// Pre-taken seats (simulated as already reserved)
const takenSeats = new Set([
  'L-A1','L-A3','L-B2','L-B4','L-C1','L-C5','L-D3','L-E2','L-F4','L-G1',
  'C-A2','C-A5','C-A7','C-B1','C-B4','C-B8','C-C3','C-C6','C-D2','C-D5','C-D7',
  'C-E1','C-E4','C-E8','C-F3','C-F6','C-G2','C-G7',
  'R-A2','R-A4','R-B1','R-B3','R-C2','R-C5','R-D4','R-E1','R-E3','R-F5','R-G2',
])

const userSelected = reactive(new Set())
const reservedAfterBooking = reactive(new Set())

function seatKey(section, row, col) { return `${section}-${row}${col}` }

function isTaken(section, row, col) {
  const k = seatKey(section, row, col)
  return takenSeats.has(k) || reservedAfterBooking.has(k)
}

function isSelected(section, row, col) {
  return userSelected.has(seatKey(section, row, col))
}

function getSeatClass(section, row, col) {
  const k = seatKey(section, row, col)
  if (takenSeats.has(k) || reservedAfterBooking.has(k)) return 'taken'
  if (userSelected.has(k)) return 'selected'
  return 'available'
}

function getSeatIcon(section, row, col) {
  const k = seatKey(section, row, col)
  if (takenSeats.has(k) || reservedAfterBooking.has(k)) return '✕'
  if (userSelected.has(k)) return '✓'
  return ''
}

function toggleSeat(section, row, col) {
  const k = seatKey(section, row, col)
  if (isTaken(section, row, col)) return
  if (userSelected.has(k)) userSelected.delete(k)
  else userSelected.add(k)
}

const selectedSeats = computed(() => [...userSelected].sort())
const totalPrice = computed(() => selectedSeats.value.length * (currentEvent.value?.price || 150))

function selectEvent(id) {
  selectedEvent.value = id
  userSelected.clear()
}

// Modal
const showModal = ref(false)
const confirmedSeats = ref([])
const confirmedTotal = ref(0)

function confirmBooking() {
  if (!selectedSeats.value.length) return
  confirmedSeats.value = [...selectedSeats.value]
  confirmedTotal.value = totalPrice.value
  selectedSeats.value.forEach(k => reservedAfterBooking.add(k))
  userSelected.clear()
  showModal.value = true
}
function closeModal() { showModal.value = false }
</script>

<style scoped>
.booking-page { min-height: 100vh; padding-top: 80px; }

/* Header */
.booking-header {
  position: relative; text-align: center;
  padding: 4rem 2rem 3rem; overflow: hidden;
}
.header-glow {
  position: absolute; top: 0; left: 50%; transform: translateX(-50%);
  width: 600px; height: 300px; border-radius: 50%;
  background: radial-gradient(ellipse, rgba(46,31,94,0.6), transparent 70%);
  filter: blur(40px); pointer-events: none;
}
.section-eyebrow {
  font-family: var(--ff-heading); font-size: 0.75rem; font-weight: 600;
  letter-spacing: 0.3em; text-transform: uppercase; color: var(--gold);
  margin-bottom: 0.6rem;
}
.booking-title {
  font-family: var(--ff-display); font-size: clamp(2.2rem, 5vw, 3.5rem);
  font-weight: 900; color: var(--ivory); margin-bottom: 0.8rem;
}
.booking-sub {
  font-style: italic; color: var(--stone); max-width: 540px; margin: 0 auto;
}

/* Event tabs */
.event-selector-wrap {
  padding: 0 0 2rem;
  border-bottom: 1px solid rgba(201,168,76,0.15);
}
.event-tabs {
  display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center;
}
.event-tab {
  display: flex; flex-direction: column; align-items: center; gap: 0.2rem;
  padding: 0.8rem 1.6rem; cursor: pointer;
  border: 1px solid rgba(201,168,76,0.2); border-radius: 3px;
  background: transparent; color: var(--stone);
  transition: all 0.25s;
}
.event-tab:hover { border-color: rgba(201,168,76,0.5); color: var(--ivory); }
.event-tab.active {
  background: linear-gradient(135deg, var(--gold), #a07828);
  border-color: var(--gold); color: var(--ink);
}
.tab-date {
  font-family: var(--ff-heading); font-size: 0.7rem; font-weight: 600;
  letter-spacing: 0.15em; text-transform: uppercase;
}
.tab-name {
  font-family: var(--ff-body); font-size: 0.95rem; font-weight: 500;
}

/* Hall */
.hall-wrap { padding: 3rem 2rem 10rem; }
.hall { max-width: 1000px; margin: 0 auto; }

/* Stage */
.stage-area { text-align: center; margin-bottom: 2rem; }
.stage {
  background: linear-gradient(180deg, rgba(46,31,94,0.9) 0%, rgba(122,28,46,0.4) 100%);
  border: 1px solid rgba(201,168,76,0.4); border-bottom: none;
  border-radius: 80px 80px 0 0; padding: 2rem 3rem 1.5rem;
  display: inline-block; min-width: 320px; position: relative;
}
.stage::before {
  content: '';
  position: absolute; inset: -1px; border-radius: inherit;
  box-shadow: 0 0 40px rgba(201,168,76,0.15), inset 0 0 30px rgba(201,168,76,0.05);
  pointer-events: none;
}
.stage-inner { text-align: center; }
.stage-cross { font-size: 1.5rem; color: var(--gold); margin-bottom: 0.3rem; text-shadow: 0 0 12px var(--gold); }
.stage-label {
  font-family: var(--ff-heading); font-size: 0.8rem; font-weight: 700;
  letter-spacing: 0.4em; text-transform: uppercase; color: var(--gold-lt);
}
.stage-arabic { font-family: var(--ff-arabic); font-size: 0.8rem; color: var(--smoke); margin-top: 0.2rem; }
.stage-steps { display: flex; justify-content: center; gap: 0; }
.step {
  height: 6px; flex: 1; max-width: 340px;
  border: 1px solid rgba(201,168,76,0.2); border-top: none;
}
.step:first-child { border-right: none; border-radius: 0 0 0 4px; }
.step:last-child  { border-left: none; border-radius: 0 0 4px 0; }

/* Sections */
.sections-wrap {
  display: grid; grid-template-columns: 1fr 1.6fr 1fr; gap: 1.5rem;
  align-items: start;
}
.section-block {
  background: rgba(17,13,30,0.6);
  border: 1px solid rgba(201,168,76,0.12); border-radius: 4px;
  padding: 1.2rem 1rem;
}
.section-block.center {
  border-color: rgba(201,168,76,0.25);
  background: rgba(26,20,48,0.7);
}
.section-label {
  font-family: var(--ff-heading); font-size: 0.65rem; font-weight: 600;
  letter-spacing: 0.15em; text-transform: uppercase; color: var(--gold);
  text-align: center; margin-bottom: 1rem; padding-bottom: 0.6rem;
  border-bottom: 1px solid rgba(201,168,76,0.15);
}
.seats-grid { display: flex; gap: 0.4rem; }
.row-label-col { display: flex; flex-direction: column; gap: 5px; padding-top: 2px; }
.row-label {
  font-family: var(--ff-heading); font-size: 0.6rem; color: var(--smoke);
  width: 14px; height: 28px; display: flex; align-items: center; justify-content: center;
}
.seats-col { display: flex; flex-direction: column; gap: 5px; }
.seat-row { display: flex; gap: 5px; }

/* Individual seat */
.seat {
  width: 30px;
  height: 32px;
  position: relative;
  background: rgba(26, 20, 48, 0.9);
  border: 1px solid rgba(201, 168, 76, 0.4);
  border-radius: 4px 4px 8px 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-shadow: 
    0 2px 4px rgba(0, 0, 0, 0.4),
    inset 0 2px 3px rgba(255,255,255,0.08);
}
/* Chair backrest */
.seat::before {
  content: '';
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
  content: '';
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
.seat.available {
  background: rgba(26,20,48,0.8); border-color: rgba(201,168,76,0.35); color: var(--gold);
}
.seat.available:hover {
  background: rgba(201, 168, 76, 0.15);
  border-color: var(--gold);
  transform: scale(1.12) translateY(-2px);
  box-shadow: 0 8px 16px rgba(201, 168, 76, 0.3);
}
.seat.selected {
  background: linear-gradient(180deg, #d4af37, #b38b2d);
  border-color: #f5d76e;
  box-shadow: 
    0 4px 12px rgba(201, 168, 76, 0.6),
    inset 0 2px 4px rgba(255,255,255,0.4);
}
.seat.selected::before,
.seat.selected::after {
  background: linear-gradient(#f5d76e, #c9a02c);
  border-color: #ffe89c;
}
.seat.taken {
  background: rgba(20, 15, 35, 0.85);
  border-color: rgba(100, 80, 120, 0.4);
  cursor: not-allowed;
  filter: brightness(0.7);
}
.seat.taken::before,
.seat.taken::after {
  background: rgba(40, 30, 55, 0.9);
}
.seat-icon { line-height: 1; }

/* Legend */
.legend {
  display: flex; justify-content: center; gap: 2rem; margin-top: 2.5rem;
}
.legend-item {
  display: flex; align-items: center; gap: 0.5rem;
  font-family: var(--ff-heading); font-size: 0.7rem; letter-spacing: 0.1em;
  text-transform: uppercase; color: var(--stone);
}
.legend-seat {
  width: 20px; height: 20px; border-radius: 3px 3px 2px 2px; border: 1px solid;
}
.legend-seat.available { background: rgba(26,20,48,0.8); border-color: rgba(201,168,76,0.4); }
.legend-seat.selected  { background: var(--gold); border-color: var(--gold-glow); }
.legend-seat.taken     { background: rgba(20,15,35,0.7); border-color: rgba(100,80,120,0.25); }

/* Summary bar */
.summary-bar {
  position: fixed; bottom: 0; left: 0; right: 0; z-index: 50;
  background: rgba(13,10,20,0.97); backdrop-filter: blur(20px);
  border-top: 1px solid rgba(201,168,76,0.3);
  padding: 1rem 0;
  transform: translateY(100%); transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.summary-bar.visible { transform: translateY(0); }
.summary-inner {
  display: flex; align-items: center; justify-content: space-between; gap: 1rem; flex-wrap: wrap;
}
.summary-count {
  font-family: var(--ff-heading); font-size: 1rem; font-weight: 700; color: var(--gold-lt);
}
.summary-seats {
  font-family: var(--ff-heading); font-size: 0.7rem; letter-spacing: 0.1em;
  color: var(--stone); margin-top: 0.15rem; max-width: 500px;
}
.summary-price {
  font-family: var(--ff-heading); font-size: 0.8rem; color: var(--ivory); margin-top: 0.2rem;
}
.confirm-btn {
  background: linear-gradient(135deg, var(--gold), var(--gold-lt)); color: var(--ink);
  font-family: var(--ff-heading); font-size: 0.8rem; font-weight: 700;
  letter-spacing: 0.15em; text-transform: uppercase;
  padding: 0.9rem 2.2rem; border: none; border-radius: 2px; cursor: pointer;
  transition: box-shadow 0.2s, transform 0.2s; white-space: nowrap;
}
.confirm-btn:hover {
  box-shadow: 0 0 25px rgba(201,168,76,0.5); transform: translateY(-1px);
}

/* Modal */
.modal-overlay {
  position: fixed; inset: 0; z-index: 200;
  background: rgba(5,3,12,0.85); backdrop-filter: blur(8px);
  display: flex; align-items: center; justify-content: center; padding: 2rem;
}
.modal {
  background: linear-gradient(160deg, var(--vault) 0%, var(--ink) 100%);
  border: 1px solid rgba(201,168,76,0.35); border-radius: 6px;
  padding: 3rem 2.5rem; text-align: center; max-width: 460px; width: 100%;
  box-shadow: 0 0 80px rgba(0,0,0,0.8), 0 0 30px rgba(201,168,76,0.1);
  animation: modal-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}
@keyframes modal-in {
  from { transform: scale(0.8); opacity: 0; }
  to   { transform: scale(1); opacity: 1; }
}
.modal-cross {
  font-size: 1.2rem; color: var(--gold); margin-bottom: 0.8rem;
  text-shadow: 0 0 16px var(--gold);
}
.modal-icon {
  width: 60px; height: 60px; border-radius: 50%; margin: 0 auto 1.2rem;
  background: linear-gradient(135deg, var(--gold), var(--gold-lt));
  display: flex; align-items: center; justify-content: center;
  font-size: 1.8rem; color: var(--ink); font-weight: 900;
  box-shadow: 0 0 30px rgba(201,168,76,0.5);
}
.modal-title {
  font-family: var(--ff-heading); font-size: 1.8rem; font-weight: 700;
  color: var(--ivory); margin-bottom: 0.6rem;
}
.modal-sub { font-style: italic; color: var(--stone); margin-bottom: 0.5rem; }
.modal-arabic {
  font-family: var(--ff-arabic); font-size: 1.2rem; color: var(--gold-lt);
  margin-bottom: 1.5rem;
}
.modal-detail {
  font-family: var(--ff-heading); font-size: 0.8rem; letter-spacing: 0.05em;
  color: var(--stone); margin: 0.4rem 0;
}
.modal-detail strong { color: var(--gold); }
.modal-close {
  margin-top: 1.8rem;
  background: transparent; border: 1px solid rgba(201,168,76,0.35); color: var(--stone);
  font-family: var(--ff-heading); font-size: 0.75rem; font-weight: 600;
  letter-spacing: 0.15em; text-transform: uppercase;
  padding: 0.7rem 2rem; border-radius: 2px; cursor: pointer;
  transition: border-color 0.2s, color 0.2s;
}
.modal-close:hover { border-color: var(--gold-lt); color: var(--gold-lt); }

.container { max-width: 1100px; margin: 0 auto; padding: 0 2rem; }

@media (max-width: 750px) {
  .sections-wrap { grid-template-columns: 1fr; }
  .seat { width: 24px; height: 24px; font-size: 0.55rem; }
}
</style>
