<script setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { warningPopup, successPopup, errorPopup } from "@/lib/swal";
import { useBookingStore } from "@/stores/booking";

const bookingStore = useBookingStore();

const router = useRouter();
const route = useRoute();

const eventId = Number(route.params.eventId);

const totalPrice = computed(() => {
  return bookingStore.selectedSeats.length * 150;
});

async function submitBooking() {
  if (!bookingStore.phone_number.trim()) {
    await warningPopup("بيانات ناقصة", "من فضلك أدخل رقم الهاتف.");
    return;
  }

  if (bookingStore.attendees.some((a) => !a.name.trim())) {
    await warningPopup("من فضلك أدخل أسماء جميع الحضور.");
    return;
  }

  if (!bookingStore.image) {
    await warningPopup("من فضلك ارفع صورة التحويل.");
    return;
  }

  try {
    await bookingStore.submitBooking(eventId);

    await successPopup(
      "تم إرسال الطلب",
      "سيتم مراجعة التحويل وإرسال التذكرة على رقم الهاتف في أقرب وقت.",
    );

    bookingStore.reset();

    router.push("/");
  } catch (err) {
    await errorPopup("خطأ", "حدث خطأ أثناء إرسال الطلب.");

    console.error(err);
  }
}

function onFileChange(e) {
  const file = e.target.files[0];

  if (file) {
    bookingStore.setImage(file);
  }
}
</script>

<template>
  <main class="min-h-screen pt-24 pb-20" dir="rtl">
    <div class="mx-auto max-w-3xl px-6">
      <h1 class="mb-10 text-center text-4xl font-bold text-[var(--gold)]">
        إتمام الحجز
      </h1>

      <!-- Payment -->
      <div class="rounded-lg border border-yellow-700 p-6 mb-8">
        <h2 class="text-xl font-bold mb-4">تحويل قيمة الحجز</h2>

        <p class="mb-3">قم بتحويل المبلغ على الرقم التالي:</p>

        <div class="text-3xl font-bold text-green-400">01211931386</div>

        <div class="mt-5">
          عدد الكراسي :
          <strong>
            {{ bookingStore.selectedSeats.length }}
          </strong>
        </div>

        <div class="mt-2">
          الإجمالي :
          <strong> {{ totalPrice }} جنيه </strong>
        </div>
      </div>

      <!-- Owner -->
      <div class="space-y-5">
        <div>
          <label class="block mb-2"> رقم الهاتف </label>

          <input
            v-model="bookingStore.phone_number"
            class="w-full rounded border p-3"
          />
        </div>

        <div>
          <label class="block mb-2"> البريد الإلكتروني </label>

          <input
            type="email"
            v-model="bookingStore.email"
            class="w-full rounded border p-3"
          />
        </div>
      </div>

      <!-- Attendees -->

      <div class="mt-10">
        <h2 class="text-2xl font-bold mb-5">بيانات الحضور</h2>

        <div
          v-for="(attendee, index) in bookingStore.attendees"
          :key="index"
          class="mb-5"
        >
          <label class="block mb-2"> اسم الشخص {{ index + 1 }} </label>

          <input v-model="attendee.name" class="w-full rounded border p-3" />
        </div>
      </div>

      <!-- Upload -->

      <div class="mt-10">
        <label class="block mb-3"> صورة التحويل </label>

        <input type="file" accept="image/*" @change="onFileChange" />
      </div>

      <button
        class="mt-10 w-full rounded bg-yellow-500 py-4 font-bold text-black disabled:opacity-50"
        :disabled="bookingStore.loading"
        @click="submitBooking"
      >
        {{ bookingStore.loading ? "جارى الإرسال..." : "تأكيد الحجز" }}
      </button>
    </div>
  </main>
</template>
