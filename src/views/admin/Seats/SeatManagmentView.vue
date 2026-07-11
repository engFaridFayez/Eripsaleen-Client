<script setup lang="ts">
import { reactive, onMounted } from "vue";
import Swal from "sweetalert2";

import { useSeatStore } from "@/stores/adminStores/seat";
import { useSeatCategoryStore } from "@/stores/adminStores/seatCategory";

const seatStore = useSeatStore();
const categoryStore = useSeatCategoryStore();

const generateForm = reactive({
  prefix: "",
  start: 1,
  end: 20,
});

const seatForm = reactive({
  seat_number: "",
});

onMounted(async () => {
  await seatStore.getTheaters();
});

/* ========================
   CHANGE HANDLERS
======================== */

async function onTheaterChange() {
  if (!seatStore.selectedTheater) return;

  await seatStore.getSections(seatStore.selectedTheater);

  // 👇 load categories
  await categoryStore.getCategories(seatStore.selectedTheater);

  categoryStore.selectedCategory = null;
}

async function onSectionChange() {
  if (!seatStore.selectedSection) return;

  await seatStore.getRows(seatStore.selectedSection);
}

async function onRowChange() {
  if (!seatStore.selectedRow) return;

  await seatStore.getSeats(seatStore.selectedRow);
}

/* ========================
   GENERATE SEATS
======================== */

async function generateSeats() {
  if (!seatStore.selectedRow) {
    return Swal.fire({
      icon: "warning",
      title: "Select Row",
      text: "Please select a row first.",
    });
  }

  if (!categoryStore.selectedCategory) {
    return Swal.fire({
      icon: "warning",
      title: "Select Category",
      text: "Please select seat category.",
    });
  }

  try {
    const res = await seatStore.generateSeats(seatStore.selectedRow, {
      ...generateForm,
      category: categoryStore.selectedCategory,
    });

    await seatStore.getSeats(seatStore.selectedRow);

    Swal.fire({
      icon: "success",
      title: "Generated",
      text: `${res.created} seats created successfully.`,
    });
  } catch {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Failed to generate seats.",
    });
  }
}

/* ========================
   ADD SINGLE SEAT
======================== */

async function addSeat() {
  if (!seatStore.selectedRow) {
    return Swal.fire({
      icon: "warning",
      title: "Select Row",
      text: "Please select a row first.",
    });
  }

  if (!seatForm.seat_number.trim()) {
    return Swal.fire({
      icon: "warning",
      title: "Seat Number",
      text: "Please enter seat number.",
    });
  }

  if (!categoryStore.selectedCategory) {
    return Swal.fire({
      icon: "warning",
      title: "Select Category",
      text: "Please select seat category.",
    });
  }

  try {
    await seatStore.createSeat({
      row: seatStore.selectedRow,
      seat_number: seatForm.seat_number,
      category: categoryStore.selectedCategory,
    });

    seatForm.seat_number = "";

    await seatStore.getSeats(seatStore.selectedRow);

    Swal.fire({
      icon: "success",
      title: "Added",
      timer: 1200,
      showConfirmButton: false,
    });
  } catch {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Failed to add seat.",
    });
  }
}

/* ========================
   DELETE
======================== */

async function deleteSeat(id: number) {
  const result = await Swal.fire({
    title: "Delete Seat?",
    text: "This action cannot be undone.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Delete",
    cancelButtonText: "Cancel",
    confirmButtonColor: "#dc2626",
  });

  if (!result.isConfirmed) return;

  try {
    await seatStore.deleteSeat(id);

    if (seatStore.selectedRow) {
      await seatStore.getSeats(seatStore.selectedRow);
    }

    Swal.fire({
      icon: "success",
      title: "Deleted",
      timer: 1200,
      showConfirmButton: false,
    });
  } catch {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Failed to delete seat.",
    });
  }
}

/* ========================
   REFRESH
======================== */

async function refreshSeats() {
  if (!seatStore.selectedRow) return;

  await seatStore.getSeats(seatStore.selectedRow);
}
</script>

<template>
  <div class="space-y-8 text-white">
    <!-- Header -->
    <div>
      <h1 class="text-2xl font-bold text-[#C9A84C] sm:text-3xl">Seat Management</h1>
      <p class="mt-2 text-gray-400">Manage theater seats with categories.</p>
    </div>

    <!-- Filters -->
    <div class="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
      <!-- Theater -->
      <div>
        <label class="mb-2 block text-sm text-gray-300">Theater</label>

        <select
          v-model="seatStore.selectedTheater"
          @change="onTheaterChange"
          class="w-full rounded-xl border border-[#2A1F45] bg-[#211836] px-4 py-3"
        >
          <option :value="null">Select Theater</option>

          <option
            v-for="theater in seatStore.theaters"
            :key="theater.id"
            :value="theater.id"
          >
            {{ theater.name }}
          </option>
        </select>
      </div>

      <!-- Section -->
      <div>
        <label class="mb-2 block text-sm text-gray-300">Section</label>

        <select
          v-model="seatStore.selectedSection"
          @change="onSectionChange"
          class="w-full rounded-xl border border-[#2A1F45] bg-[#211836] px-4 py-3"
        >
          <option :value="null">Select Section</option>

          <option
            v-for="section in seatStore.sections"
            :key="section.id"
            :value="section.id"
          >
            {{ section.name }}
          </option>
        </select>
      </div>

      <!-- Row -->
      <div>
        <label class="mb-2 block text-sm text-gray-300">Row</label>

        <select
          v-model="seatStore.selectedRow"
          @change="onRowChange"
          class="w-full rounded-xl border border-[#2A1F45] bg-[#211836] px-4 py-3"
        >
          <option :value="null">Select Row</option>

          <option v-for="row in seatStore.rows" :key="row.id" :value="row.id">
            {{ row.row_number }}
          </option>
        </select>
      </div>

      <!-- Category -->
      <div>
        <label class="mb-2 block text-sm text-gray-300">Category</label>

        <select
          v-model="categoryStore.selectedCategory"
          class="w-full rounded-xl border border-[#2A1F45] bg-[#211836] px-4 py-3"
        >
          <option :value="null">Select Category</option>

          <option
            v-for="cat in categoryStore.seatCategories"
            :key="cat.id"
            :value="cat.id"
          >
            {{ cat.name }}
          </option>
        </select>
      </div>
    </div>

    <!-- Generate Seats -->
    <div
      v-if="seatStore.selectedRow"
      class="rounded-2xl bg-[#161122] p-4 border border-[#C9A84C]/20 sm:p-6"
    >
      <h2 class="mb-6 text-xl font-bold text-[#C9A84C]">Generate Seats</h2>

      <div class="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
        <input
          v-model="generateForm.prefix"
          placeholder="Prefix"
          class="rounded-xl bg-[#211836] border border-[#2A1F45] px-4 py-3"
        />

        <input
          v-model.number="generateForm.start"
          type="number"
          class="rounded-xl bg-[#211836] border border-[#2A1F45] px-4 py-3"
        />

        <input
          v-model.number="generateForm.end"
          type="number"
          class="rounded-xl bg-[#211836] border border-[#2A1F45] px-4 py-3"
        />

        <button
          @click="generateSeats"
          class="rounded-xl bg-[#C9A84C] text-black font-semibold px-4 py-3 hover:opacity-90"
        >
          Generate
        </button>
      </div>
    </div>

    <!-- Add Seat -->
    <div
      v-if="seatStore.selectedRow"
      class="rounded-2xl bg-[#161122] p-4 border border-[#C9A84C]/20 sm:p-6"
    >
      <h2 class="mb-6 text-xl font-bold text-[#C9A84C]">Add Seat</h2>

      <div class="flex flex-col gap-4 sm:flex-row">
        <input
          v-model="seatForm.seat_number"
          placeholder="Seat Number"
          class="flex-1 rounded-xl bg-[#211836] border border-[#2A1F45] px-4 py-3"
        />

        <button
          @click="addSeat"
          class="rounded-xl bg-green-600 px-6 py-3 font-semibold hover:bg-green-700 sm:w-auto"
        >
          Add
        </button>
      </div>
    </div>

    <!-- Seats Table -->
    <div
      v-if="seatStore.selectedRow"
      class="rounded-2xl overflow-hidden border border-[#2A1F45] bg-[#161122]"
    >
      <div class="overflow-x-auto">
        <table class="w-full min-w-[560px]">
          <thead class="bg-[#0D0A14] text-gray-300">
            <tr>
              <th class="p-4 text-left whitespace-nowrap">ID</th>
              <th class="p-4 text-left whitespace-nowrap">Seat</th>
              <th class="p-4 text-left whitespace-nowrap">Category</th>
              <th class="p-4 text-center whitespace-nowrap">Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="seat in seatStore.seats"
              :key="seat.id"
              class="border-t border-[#2A1F45] hover:bg-[#211836]"
            >
              <td class="p-4 whitespace-nowrap">{{ seat.id }}</td>

              <td class="p-4 font-semibold whitespace-nowrap">
                {{ seat.seat_number }}
              </td>

              <td class="p-4 whitespace-nowrap">
                <span
                  class="px-3 py-1 rounded-full text-xs font-bold"
                  :style="{ backgroundColor: seat.category?.color || '#444' }"
                >
                  {{ seat.category?.name || "No Category" }}
                </span>
              </td>

              <td class="p-4">
                <div class="flex justify-center">
                  <button
                    @click="deleteSeat(seat.id)"
                    class="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 whitespace-nowrap"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>

            <tr v-if="!seatStore.seats.length">
              <td colspan="4" class="text-center py-10 text-gray-400">
                No seats found
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>