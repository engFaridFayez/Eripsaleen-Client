<template>
  <div
    class="rounded-2xl border border-[#C9A84C]/20 bg-[#171324]/80 backdrop-blur-xl p-6 h-full"
  >
    <!-- Header -->
    <div class="mb-6">
      <h2 class="text-xl font-bold text-white">
        Revenue
      </h2>

      <p class="text-sm text-gray-400">
        Monthly Income
      </p>

      <h3 class="mt-3 text-3xl font-bold text-[#C9A84C]">
        $42,580
      </h3>

      <p class="text-green-400 text-sm mt-1">
        ▲ +14.8% from last month
      </p>
    </div>

    <apexchart
      type="bar"
      height="300"
      :options="chartOptions"
      :series="series"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"

const series = ref([
  {
    name: "Revenue",
    data: [4200, 5100, 4800, 6200, 5900, 7600],
  },
])

const chartOptions = ref({
  chart: {
    toolbar: {
      show: false,
    },
    background: "transparent",
    foreColor: "#B5B5B5",
  },

  colors: ["#5E3AA5"],

  plotOptions: {
    bar: {
      borderRadius: 8,
      columnWidth: "45%",
    },
  },

  dataLabels: {
    enabled: false,
  },

  grid: {
    borderColor: "#2D2542",
    strokeDashArray: 4,
  },

  xaxis: {
    categories: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
    ],

    axisBorder: {
      show: false,
    },

    axisTicks: {
      show: false,
    },

    labels: {
      style: {
        colors: "#999",
      },
    },
  },

  yaxis: {
    labels: {
      formatter: (value: number) => "$" + value,
      style: {
        colors: "#999",
      },
    },
  },

  tooltip: {
    theme: "dark",

    y: {
      formatter: (value: number) => "$" + value,
    },
  },

  legend: {
    show: false,
  },
})
</script>