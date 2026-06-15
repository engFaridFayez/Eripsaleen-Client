<template>
  <nav class="navbar" :class="{ scrolled }">
    <div class="nav-inner">
      <router-link to="/" class="nav-logo">
        <span class="cross">✛</span>
        <span class="logo-text">Eripsaleen</span>
        <span class="logo-arabic">تسبيح</span>
      </router-link>
      <div class="nav-links">
        <router-link to="/" class="nav-link">Home</router-link>
        <router-link to="/#about" class="nav-link">About</router-link>
        <router-link to="/#events" class="nav-link">Events</router-link>
        <router-link to="/booking" class="nav-btn">Book Tickets</router-link>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
const scrolled = ref(false)
const onScroll = () => { scrolled.value = window.scrollY > 60 }
onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
.navbar {
  position: fixed; top: 0; left: 0; right: 0; z-index: 100;
  padding: 1.2rem 2.5rem;
  transition: background 0.4s ease, backdrop-filter 0.4s ease, padding 0.3s ease;
}
.navbar.scrolled {
  background: rgba(13, 10, 20, 0.92);
  backdrop-filter: blur(16px);
  padding: 0.8rem 2.5rem;
  border-bottom: 1px solid rgba(201, 168, 76, 0.2);
}
.nav-inner {
  max-width: 1200px; margin: 0 auto;
  display: flex; align-items: center; justify-content: space-between;
}
.nav-logo {
  display: flex; align-items: center; gap: 0.6rem;
  font-family: var(--ff-heading);
}
.cross {
  font-size: 1.4rem; color: var(--gold);
  animation: glow-pulse 3s ease-in-out infinite;
}
@keyframes glow-pulse {
  0%, 100% { text-shadow: 0 0 8px var(--gold); }
  50% { text-shadow: 0 0 20px var(--gold-glow), 0 0 40px var(--gold); }
}
.logo-text {
  font-family: var(--ff-heading);
  font-size: 1.25rem; font-weight: 700; color: var(--gold-lt);
  letter-spacing: 0.1em;
}
.logo-arabic {
  font-family: var(--ff-arabic);
  font-size: 0.85rem; color: var(--stone);
  letter-spacing: 0.05em;
}
.nav-links { display: flex; align-items: center; gap: 2rem; }
.nav-link {
  font-family: var(--ff-heading); font-size: 0.8rem; font-weight: 600;
  letter-spacing: 0.15em; text-transform: uppercase; color: var(--stone);
  transition: color 0.2s;
}
.nav-link:hover, .nav-link.router-link-active { color: var(--gold-lt); }
.nav-btn {
  font-family: var(--ff-heading); font-size: 0.75rem; font-weight: 700;
  letter-spacing: 0.15em; text-transform: uppercase;
  padding: 0.6rem 1.5rem; color: var(--ink);
  background: linear-gradient(135deg, var(--gold), var(--gold-lt));
  border-radius: 2px;
  transition: opacity 0.2s, box-shadow 0.2s;
}
.nav-btn:hover {
  opacity: 0.9;
  box-shadow: 0 0 20px rgba(201, 168, 76, 0.4);
}
</style>
