<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<template>
  <div
    class="min-h-screen flex items-center justify-center px-6 py-16 bg-[var(--deep)]"
  >
    <div class="w-full max-w-md">
      <!-- Ticket -->
      <div
        class="relative rounded-2xl border border-[var(--purple)] bg-[var(--vault)] px-8 py-10 text-center shadow-lg"
      >
        <!-- Notches -->
        <span
          class="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[var(--deep)] border border-[var(--purple)]"
        />
        <span
          class="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[var(--deep)] border border-[var(--purple)]"
        />

        <span
          class="inline-block px-3 py-1 rounded-full bg-[var(--deep)] text-[var(--crimson)] text-xs font-semibold tracking-[0.2em] uppercase"
        >
          Void · Not Found
        </span>

        <h1
          class="mt-6 text-7xl font-bold tracking-tight text-[var(--gold-lt)]"
        >
          404
        </h1>

        <p class="mt-3 text-[var(--ivory)] font-medium">
          This showtime doesn't exist
        </p>

        <p class="mt-2 text-sm text-[var(--stone)] leading-6">
          The page you're looking for was moved, cancelled, or never booked in
          the first place.
        </p>

        <!-- Perforation -->
        <div class="my-8 border-t border-dashed border-[var(--purple)]" />

        <div class="flex flex-col sm:flex-row gap-3 justify-center">
          <router-link
            :to="{ name: 'home' }"
            class="inline-flex items-center justify-center rounded-xl bg-[var(--gold)] px-6 py-3 text-sm font-medium text-[var(--ink)] transition-all hover:bg-[var(--gold-lt)] hover:scale-105"
          >
            Back to shows
          </router-link>

          <button
            type="button"
            @click="router.back()"
            class="inline-flex items-center justify-center rounded-xl border border-[var(--purple)] px-6 py-3 text-sm font-medium text-[var(--stone)] transition-all hover:border-[var(--gold)] hover:text-[var(--gold-lt)]"
          >
            Go back
          </button>
        </div>
      </div>

      <p class="mt-6 text-center text-xs text-[var(--smoke)] tracking-wide">
        Error code 404 · Ticket ID invalid
      </p>
    </div>
  </div>
</template>
