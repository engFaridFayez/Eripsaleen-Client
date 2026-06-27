<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
const router = useRouter();

const username = ref("");
const password = ref("");
const error = ref("");
const showPassword = ref(false);

const staffGroups = [80, 260, 440, 620];

const handleLogin = async () => {
  error.value = "";

  try {
    await authStore.login(username.value, password.value);
    router.push("/");
  } catch (err: any) {
    error.value =
      err?.response?.data?.detail || "اسم المستخدم أو كلمة المرور غير صحيحة";
  }
};
</script>

<template>
  <div
    class="min-h-screen bg-[#0d1120] flex items-center justify-center px-4 py-10 relative overflow-hidden"
  >
    <!-- Staff lines decoration -->
    <div class="absolute inset-0 pointer-events-none opacity-[0.06]">
      <div
        v-for="group in staffGroups"
        :key="group"
        class="absolute w-full"
        :style="{ top: group + 'px' }"
      >
        <div
          v-for="i in 5"
          :key="i"
          class="w-full h-px bg-[#c9a84c]"
          :style="{ marginTop: (i - 1) * 16 + 'px' }"
        ></div>
      </div>
    </div>

    <!-- Card -->
    <div
      class="relative z-10 w-full max-w-md bg-[#111827] border border-[#c9a84c]/25 rounded-2xl px-10 py-12 shadow-2xl"
    >
      <!-- Logo -->
      <div class="flex flex-col items-center mb-8">
        <div
          class="w-18 h-18 rounded-full border-2 border-[#c9a84c] bg-[#1a2235] flex items-center justify-center mb-5"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-8 h-8 text-[#c9a84c]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M9 18V5l12-2v13" />
            <circle cx="6" cy="18" r="3" />
            <circle cx="18" cy="16" r="3" />
          </svg>
        </div>

        <h1
          class="font-serif text-[#e8d5a3] text-3xl font-semibold tracking-wide text-center"
        >
          Eripsaleen Choir
        </h1>

        <p class="text-[#7a8ba8] text-xs tracking-[0.18em] uppercase mt-1">
          Member Portal
        </p>
      </div>

      <!-- Divider -->
      <div class="flex items-center gap-3 mb-8">
        <div class="flex-1 h-px bg-[#c9a84c]/20"></div>
        <span class="text-[#c9a84c]/50 text-lg">♩</span>
        <div class="flex-1 h-px bg-[#c9a84c]/20"></div>
      </div>

      <!-- Error -->
      <div
        v-if="error"
        class="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-400 text-sm"
      >
        {{ error }}
      </div>

      <!-- Form -->
      <form
        @submit.prevent="handleLogin"
        novalidate
        class="space-y-10 flex flex-col" dir="rtl"
      >
        <!-- Username -->
        <div>
          <label
            for="username"
            class="block text-[#b0b8cc] text-lg font-medium uppercase tracking-widest mb-3"
          >
            اسم المستخدم
          </label>

          <div class="relative">
            <input
              id="username"
              v-model="username"
              type="text"
              placeholder="username"
              autocomplete="username"
              required
              class="w-full bg-[#0d1120] border border-[#2a3555] rounded-2xl text-[#e0e8f5] text-lg pl-14 pr-6 py-6 placeholder-[#3d4f72] outline-none transition-colors duration-200 focus:border-[#c9a84c]"
            />
          </div>
        </div>

        <!-- Password -->
        <div>
          <label
            for="password"
            class="block text-[#b0b8cc] text-lg font-medium uppercase tracking-widest mb-3"
          >
            كلمة السر
          </label>

          <div class="relative">
            <input
              id="password"
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="••••••••"
              autocomplete="current-password"
              required
              class="w-full bg-[#0d1120] border border-[#2a3555] rounded-2xl text-lg pl-14 pr-14 py-6 placeholder-[#3d4f72] outline-none transition-colors duration-200 focus:border-[#c9a84c]"
            />

            <button
              type="button"
              @click="showPassword = !showPassword"
              class="absolute left-6 top-1/2 -translate-y-1/2 text-[#3d4f72] hover:text-[#c9a84c] transition-colors text-2xl"
            >
              👁
            </button>
          </div>
        </div>

        <!-- Submit -->
        <button
          type="submit"
          :disabled="authStore.loading"
          class="w-full py-6 rounded-2xl text-[#0d1120] text-xl font-semibold tracking-wide transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.98] mt-4"
          :class="
            authStore.loading
              ? 'bg-[#c9a84c]/70'
              : 'bg-[#c9a84c] hover:bg-[#e0be6a]'
          "
        >
          <span v-if="!authStore.loading">Sign In</span>

          <span v-else class="flex items-center justify-center gap-3">
            <svg
              class="w-6 h-6 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              />
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              />
            </svg>
            Signing in...
          </span>
        </button>
      </form>

      <!-- Footer -->
      <p class="text-center text-[#2e3d5c] text-xs tracking-widest mt-8">
        ✦ Eripsaleen Choir ✦
      </p>
    </div>
  </div>
</template>
