<script setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { warningPopup, successPopup, errorPopup } from "@/lib/swal";
import { useBookingStore } from "@/stores/booking";
import insta from "@/assets/images/insta.jpeg";
import vodafone from "@/assets/images/voda.jpeg";
import wallet from "@/assets/images/wallet.jpeg";
import { ref } from "vue";

const showOrangeModal = ref(false);

const orangeNumber = "01285783484";

async function copyOrangeNumber() {
  await navigator.clipboard.writeText(orangeNumber);
  await successPopup("تم النسخ", "تم نسخ رقم محفظة Orange Cash.");
}

const bookingStore = useBookingStore();

const router = useRouter();
const route = useRoute();

const eventId = Number(route.params.eventId);

const totalPrice = computed(() => {
  return bookingStore.selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
});

async function submitBooking() {
  if (!bookingStore.phone_number.trim()) {
    await warningPopup("بيانات ناقصة", "من فضلك أدخل رقم الهاتف.");
    return;
  }

  if (!bookingStore.owner_name.trim()) {
    await warningPopup("بيانات ناقصة", "من فضلك أدخل اسم صاحب الحجز.");
    return;
  }

  if (
    bookingStore.attendees.some(
      (a) => !a.person_name.trim() || !a.national_id.trim(),
    )
  ) {
    await warningPopup(
      "بيانات ناقصة",
      "من فضلك أدخل الاسم والرقم القومي لكل شخص.",
    );
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
      <h1 class="mb-10 text-center text-4xl font-bold text-(--gold)">
        إتمام الحجز
      </h1>

      <!-- Payment -->
      <div class="rounded-lg border border-yellow-700 p-6 mb-8">
        <h2 class="text-xl font-bold mb-4">تحويل قيمة الحجز</h2>

        <p class="mb-6 text-gray-300">اختر وسيلة الدفع المناسبة:</p>

        <div class="flex flex-col gap-4">
          <!-- InstaPay -->
          <a
            href="https://ipn.eg/S/philopaterrezk/instapay/8M0rR0"
            target="_blank"
            class="flex items-center justify-center gap-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl transition"
          >
            <img :src="insta" alt="InstaPay" class="w-7 h-7 object-contain" />
            الدفع عبر InstaPay
          </a>

          <!-- Vodafone Cash -->
          <!-- Orange Cash -->
          <button
            type="button"
            @click="showOrangeModal = true"
            class="flex w-full items-center justify-center gap-3 rounded-xl bg-orange-500 py-3 font-semibold text-white transition hover:bg-orange-600"
          >
            <img
              :src="wallet"
              alt="Orange Cash"
              class="h-7 w-7 object-contain"
            />
            الدفع عبر المحفظة
          </button>
        </div>

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
          <label class="block mb-2"> اسم صاحب الحجز </label>

          <input
            v-model="bookingStore.owner_name"
            class="w-full rounded border p-3"
          />
        </div>
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
        <h2 class="mb-5 text-2xl font-bold">بيانات الحضور</h2>

        <div
          v-for="(attendee, index) in bookingStore.attendees"
          :key="index"
          class="mb-8 rounded-lg border border-gray-300 p-5"
        >
          <div
            class="mb-5 flex items-center gap-2 text-lg font-bold text-yellow-500"
          >
            الشخص {{ index + 1 }}

            <span
              class="inline-flex items-center rounded bg-yellow-500/15 border border-yellow-500/40 px-2 py-0.5 text-sm font-semibold text-yellow-400"
            >
              {{ attendee.seat_name }}
            </span>
          </div>

          <div class="grid gap-4 md:grid-cols-2">
            <div>
              <label class="mb-2 block"> الاسم </label>

              <input
                v-model="attendee.person_name"
                class="w-full rounded border p-3"
              />
            </div>

            <div>
              <label class="mb-2 block"> الرقم القومي </label>

              <input
                v-model="attendee.national_id"
                maxlength="14"
                class="w-full rounded border p-3"
              />
            </div>
          </div>
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
    <!-- Orange Cash Modal -->
    <div
      v-if="showOrangeModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
    >
      <div
        class="w-full max-w-md rounded-2xl bg-[#1b1b1b] p-6 text-white shadow-xl"
      >
        <h3 class="mb-4 text-xl font-bold">الدفع عبر Orange Cash</h3>

        <p class="mb-3 text-gray-300">
          قم بتحويل قيمة الحجز إلى رقم المحفظة التالي:
        </p>

        <div
          class="mb-5 rounded-lg border border-orange-500 bg-black/20 p-4 text-center text-2xl font-bold tracking-wider"
        >
          {{ orangeNumber }}
        </div>

        <p class="mb-6 text-sm text-gray-400">
          بعد إتمام التحويل، قم برفع صورة التحويل ثم اضغط
          <strong>"تأكيد الحجز"</strong>.
        </p>

        <div class="flex gap-3">
          <button
            @click="copyOrangeNumber"
            class="flex-1 rounded-lg bg-orange-500 py-3 font-semibold text-white hover:bg-orange-600"
          >
            نسخ الرقم
          </button>

          <button
            @click="showOrangeModal = false"
            class="flex-1 rounded-lg border border-gray-600 py-3 hover:bg-gray-700"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  </main>
</template>
