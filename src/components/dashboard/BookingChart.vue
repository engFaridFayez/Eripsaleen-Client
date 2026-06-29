<template>
  <div
    class="rounded-2xl border border-[#C9A84C]/20 bg-[#171324]/80 p-6 backdrop-blur-xl"
  >
    <!-- Header -->
    <div class="mb-6 flex items-center justify-between">
      <div>
        <h2 class="text-xl font-bold">Bookings Overview</h2>

        <p class="text-sm text-gray-400">Last 12 Months</p>
      </div>

      <div class="rounded-xl bg-[#231B36] px-4 py-2 text-sm text-gray-300">
        2026
      </div>
    </div>

    <apexchart
      type="area"
      height="340"
      :options="chartOptions"
      :series="series"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const series = ref([
  {
    name: "Bookings",
    data: [30, 42, 35, 55, 49, 68, 82, 75, 91, 98, 120, 145],
  },
]);

const chartOptions = ref({
  chart: {
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
    foreColor: "#c8c8c8",
    background: "transparent",
  },

  stroke: {
    curve: "smooth",
    width: 4,
  },

  colors: ["#C9A84C"],

  fill: {
    type: "gradient",
    gradient: {
      shadeIntensity: 0.5,
      opacityFrom: 0.45,
      opacityTo: 0.02,
      stops: [0, 100],
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
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],

    labels: {
      style: {
        colors: "#999",
      },
    },

    axisBorder: {
      show: false,
    },

    axisTicks: {
      show: false,
    },
  },

  yaxis: {
    labels: {
      style: {
        colors: "#999",
      },
    },
  },

  tooltip: {
    theme: "dark",
  },

  legend: {
    show: false,
  },
});
</script>
