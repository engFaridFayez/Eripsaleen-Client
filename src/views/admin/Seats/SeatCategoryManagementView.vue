<script setup lang="ts">
import { reactive, onMounted } from "vue";
import { useRoute } from "vue-router";
import Swal from "sweetalert2";

import { useSeatCategoryStore } from "@/stores/adminStores/seatCategory";

const route = useRoute();
const store = useSeatCategoryStore();

const theaterId = Number(route.params.id);

const form = reactive({
  id: 0,
  name: "",
  color: "#808080",
  price: 0,
});

const resetForm = () => {
  form.id = 0;
  form.name = "";
  form.color = "#808080";
  form.price = 0;
};

const saveCategory = async () => {
  const payload = {
    theater: theaterId,
    name: form.name,
    color: form.color,
    price: form.price,
  };

  if (form.id) {
    await store.updateCategory(form.id, payload);

    Swal.fire({
      icon: "success",
      title: "Updated Successfully",
      timer: 1200,
      showConfirmButton: false,
    });
  } else {
    await store.createCategory(payload);

    Swal.fire({
      icon: "success",
      title: "Created Successfully",
      timer: 1200,
      showConfirmButton: false,
    });
  }

  resetForm();
};

const editCategory = (category: any) => {
  form.id = category.id;
  form.name = category.name;
  form.color = category.color;
  form.price = category.price;
};

const deleteCategory = async (id: number) => {
  const result = await Swal.fire({
    title: "Delete Category?",
    text: "This action cannot be undone.",
    icon: "warning",
    showCancelButton: true,
  });

  if (!result.isConfirmed) return;

  await store.deleteCategory(id);

  Swal.fire({
    icon: "success",
    title: "Deleted",
    timer: 1200,
    showConfirmButton: false,
  });
};

onMounted(() => {
  store.getCategories(theaterId);
});
</script>

<template>
  <div class="max-w-7xl mx-auto p-4 text-white sm:p-6 lg:p-8">

    <!-- Header -->
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-2xl font-bold text-[#C9A84C] sm:text-3xl">
        Seat Categories
      </h1>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">

      <!-- FORM -->
      <div class="bg-[#120E1D] border border-[#C9A84C]/20 rounded-2xl p-6">

        <h2 class="text-xl font-semibold mb-6 text-[#C9A84C]">
          {{ form.id ? "Edit Category" : "Add Category" }}
        </h2>

        <div class="space-y-5">

          <div>
            <label class="block mb-2 text-gray-300">Name</label>

            <input
              v-model="form.name"
              class="w-full bg-[#1B1628] border border-[#C9A84C]/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#C9A84C]"
            />
          </div>

          <div>
            <label class="block mb-2 text-gray-300">Color</label>

            <input
              type="color"
              v-model="form.color"
              class="w-full h-12 rounded cursor-pointer bg-transparent"
            />
          </div>

          <div>
            <label class="block mb-2 text-gray-300">Price</label>

            <input
              type="number"
              v-model="form.price"
              class="w-full bg-[#1B1628] border border-[#C9A84C]/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#C9A84C]"
            />
          </div>

          <button
            @click="saveCategory"
            class="w-full bg-[#C9A84C] text-black font-semibold py-3 rounded-lg hover:opacity-90 transition"
          >
            {{ form.id ? "Update" : "Create" }}
          </button>

        </div>
      </div>

      <!-- TABLE -->
      <div class="lg:col-span-2 bg-[#120E1D] border border-[#C9A84C]/20 rounded-2xl p-4 sm:p-6">

        <div class="overflow-x-auto">
          <table class="w-full min-w-[480px] text-white">

            <thead class="text-[#C9A84C] border-b border-[#C9A84C]/20">
              <tr>
                <th class="p-4 text-left whitespace-nowrap">Color</th>
                <th class="p-4 text-left whitespace-nowrap">Name</th>
                <th class="p-4 text-left whitespace-nowrap">Price</th>
                <th class="p-4 text-center whitespace-nowrap">Actions</th>

              </tr>
            </thead>

            <tbody>

              <tr
                v-for="category in store.seatCategories"
                :key="category.id"
                class="border-b border-[#C9A84C]/10 hover:bg-[#1B1628]"
              >

                <td class="p-4">
                  <div
                    class="w-8 h-8 rounded-full border border-white/20"
                    :style="{ backgroundColor: category.color }"
                  />
                </td>

                <td class="p-4 font-medium whitespace-nowrap">
                  {{ category.name }}
                </td>
                <td class="p-4 font-medium whitespace-nowrap">
                  {{ category.price }}
                </td>

                <td class="p-4">
                  <div class="flex flex-wrap justify-center gap-2 sm:gap-3">

                    <button
                      @click="editCategory(category)"
                      class="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition whitespace-nowrap"
                    >
                      Edit
                    </button>

                    <button
                      @click="deleteCategory(category.id)"
                      class="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white transition whitespace-nowrap"
                    >
                      Delete
                    </button>

                  </div>
                </td>

              </tr>

            </tbody>

          </table>
        </div>

      </div>

    </div>
  </div>
</template>