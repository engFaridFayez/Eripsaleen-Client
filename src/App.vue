<template>
  <div class="app-root">
    <NavBar v-if="!isAuthRoute" />
    <router-view v-slot="{ Component }">
      <transition name="page" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
    <FooterBar v-if="!isAuthRoute" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import NavBar from './components/NavBar.vue'
import FooterBar from './components/FooterBar.vue'

const route = useRoute()
const isAuthRoute = computed(() => route.name === 'login')
</script>

<style>
@layer base {
  /* ===== GLOBAL RESET & TOKENS ===== */
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  :root {
    --ink:       #0d0a14;
    --deep:      #110d1e;
    --vault:     #1a1430;
    --purple:    #2e1f5e;
    --gold:      #c9a84c;
    --gold-lt:   #e8c96a;
    --gold-glow: #f0d878;
    --ivory:     #f5f0e8;
    --stone:     #c8bfa8;
    --smoke:     #8a7f9a;
    --crimson:   #7a1c2e;

    --ff-display: 'Cinzel Decorative', serif;
    --ff-heading: 'Cinzel', serif;
    --ff-body:    'EB Garamond', serif;
    --ff-arabic:  'Noto Sans Arabic', sans-serif;
  }

  html {
    scroll-behavior: smooth;
    min-height: 100%;
    width: 100%;
  }

  body {
    background: var(--deep);
    color: var(--ivory);
    font-family: var(--ff-body);
    font-size: 18px;
    line-height: 1.7;
    min-height: 100vh;
    -webkit-font-smoothing: antialiased;
    width: 100%;
    overflow-x: hidden;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  #app,
  .app-root {
    min-height: 100vh;
    width: 100%;
  }
}

/* Page transitions */
.page-enter-active, .page-leave-active { transition: opacity 0.4s ease, transform 0.4s ease; }
.page-enter-from { opacity: 0; transform: translateY(12px); }
.page-leave-to   { opacity: 0; transform: translateY(-8px); }
</style>
