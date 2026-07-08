<script setup>
import { ref, onMounted, onUnmounted, nextTick } from "vue";
import { useRouter, useRoute } from "vue-router";
import logo from "@/assets/logo.webp";
import { useAuthStore } from "@/stores/auth";
import { useAudioStore } from "@/stores/audio";

const audio = useAudioStore();
const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();

const scrolled = ref(false);
const menuOpen = ref(false);

const onScroll = () => {
  scrolled.value = window.scrollY > 60;
};

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

const handleLogout = () => {
  authStore.logout();
};

const scrollToSection = async (id) => {
  menuOpen.value = false;

  if (route.path !== "/") {
    await router.push("/");
    // wait for the home page to render before scrolling
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

onMounted(async () => {
  if (authStore.access) {
    await authStore.fetchUser();
  }
  await nextTick();
  window.dispatchEvent(new Event("resize"));
  window.addEventListener("scroll", onScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);
});
</script>

<template>
  <nav class="navbar" :class="{ scrolled }">
    <div class="nav-inner">
      <!-- Logo -->
      <router-link to="/" class="nav-logo">
        <span class="cross">
          <img class="logo-img" :src="logo" alt="" />
        </span>
      </router-link>

      <!-- Desktop Links -->
      <div class="nav-links">
        <a
          href="#hero"
          class="nav-link"
          @click.prevent="scrollToSection('hero')"
          >Home</a
        >
        <a
          href="#about"
          class="nav-link"
          @click.prevent="scrollToSection('about')"
          >About</a
        >
        <a
          href="#booking"
          class="nav-link"
          @click.prevent="scrollToSection('shows')"
          >Booking</a
        >
        <!-- <a
          href="#contact"
          class="nav-link"
          @click.prevent="scrollToSection('footer')"
          >Contact</a
        > -->

        <div v-if="authStore.access && authStore.user" class="user-actions">
          <span class="user-name">Hello, {{ authStore.user.username }}</span>
          <a href="/admin" v-if="authStore.user.is_staff" class="nav-link">
            Admin Dashboard
          </a>
          <button @click="handleLogout" class="nav-btn">Logout</button>
        </div>
        <div v-else>
          <router-link :to="{ name: 'login' }" class="nav-link mb-2"
            >Login</router-link
          >
        </div>
        <button v-if="audio.isPlaying" @click="audio.toggle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.5em"
            height="1.5em"
            viewBox="0 0 24 24"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path fill="currentColor" d="M6 18V6h12v12z" />
          </svg>
        </button>

        <button v-else @click="audio.toggle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.5em"
            height="1.5em"
            viewBox="0 0 24 24"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path
              fill="currentColor"
              fill-opacity="0"
              stroke="currentColor"
              stroke-dasharray="38"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 6l10 6l-10 6Z"
            >
              <animate
                fill="freeze"
                attributeName="stroke-dashoffset"
                dur="0.5s"
                values="38;0"
              />
              <animate
                fill="freeze"
                attributeName="fill-opacity"
                begin="0.5s"
                dur="0.4s"
                to="1"
              />
            </path>
          </svg>
        </button>
      </div>

      <!-- Mobile Hamburger -->
      <div class="mobile-actions">
        <button class="audio-btn" @click="audio.toggle">
          <svg
            v-if="audio.isPlaying"
            xmlns="http://www.w3.org/2000/svg"
            width="1.5em"
            height="1.5em"
            viewBox="0 0 24 24"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path fill="currentColor" d="M6 18V6h12v12z" />
          </svg>

          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            width="1.5em"
            height="1.5em"
            viewBox="0 0 24 24"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path
              fill="currentColor"
              fill-opacity="0"
              stroke="currentColor"
              stroke-dasharray="38"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 6l10 6l-10 6Z"
            >
              <animate
                fill="freeze"
                attributeName="stroke-dashoffset"
                dur="0.5s"
                values="38;0"
              />
              <animate
                fill="freeze"
                attributeName="fill-opacity"
                begin="0.5s"
                dur="0.4s"
                to="1"
              />
            </path>
          </svg>
        </button>

        <button class="menu-btn" @click="toggleMenu">☰</button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div class="mobile-menu" :class="{ open: menuOpen }">
      <a
        href="#hero"
        class="mobile-link"
        @click.prevent="scrollToSection('hero')"
        >Home</a
      >
      <a
        href="#about"
        class="mobile-link"
        @click.prevent="scrollToSection('about')"
        >About</a
      >
      <a
        href="#booking"
        class="mobile-link"
        @click.prevent="scrollToSection('booking')"
        >Booking</a
      >
      <!-- <a
        href="#contact"
        class="mobile-link"
        @click.prevent="scrollToSection('contact')"
        >Contact</a
      > -->

      <div v-if="authStore.access && authStore.user" class="user-actions">
        <span class="user-name">Hello, {{ authStore.user.username }}</span>
        <a href="/admin" v-if="authStore.user.is_staff" class="nav-link">
          Admin Dashboard
        </a>
        <button @click="handleLogout" class="nav-btn">Logout</button>
      </div>

      <div v-else>
        <router-link
          :to="{ name: 'login' }"
          class="mobile-link flex justify-center"
          >Login</router-link
        >
      </div>
    </div>
  </nav>
</template>

<style scoped>
.mobile-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}
.audio-btn {
  display: none; /* hidden on desktop */
  align-items: center;
  justify-content: center;
  color: var(--gold-lt);
  background: transparent;
  border: 1px solid var(--gold);
  border-radius: 999px;
  width: 42px;
  height: 42px;
  transition: all 0.25s ease;
}

.audio-btn:hover {
  background: rgba(201, 168, 76, 0.15);
  transform: scale(1.05);
}
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 1.2rem 2.5rem;
  transition:
    background 0.4s ease,
    backdrop-filter 0.4s ease,
    padding 0.3s ease;
}
.navbar.scrolled {
  background: rgba(13, 10, 20, 0.92);
  backdrop-filter: blur(16px);
  padding: 0.8rem 2.5rem;
  border-bottom: 1px solid rgba(201, 168, 76, 0.2);
}
.nav-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.nav-logo {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-family: var(--ff-heading);
}
.cross {
  font-size: 1.4rem;
  color: var(--gold);
  animation: glow-pulse 3s ease-in-out infinite;
}
@keyframes glow-pulse {
  0%,
  100% {
    text-shadow: 0 0 8px var(--gold);
  }
  50% {
    text-shadow:
      0 0 20px var(--gold-glow),
      0 0 40px var(--gold);
  }
}
.logo-text {
  font-family: "CSAvva", serif;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--gold-lt);
  letter-spacing: 0.1em;
}
.logo-text2 {
  font-family: var(--ff-arabic);
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--gold-lt);
  letter-spacing: 0.1em;
}
.logo-arabic {
  font-family: var(--ff-arabic);
  font-size: 0.85rem;
  color: var(--stone);
  letter-spacing: 0.05em;
}
.nav-links {
  display: flex;
  align-items: center;
  gap: 2rem;
}
.nav-link {
  font-family: var(--ff-heading);
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--stone);
  transition: color 0.2s;
}
.nav-link:hover,
.nav-link.router-link-active {
  color: var(--gold-lt);
}
.nav-btn {
  font-family: var(--ff-heading);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  padding: 0.6rem 1.5rem;
  color: var(--ink);
  background: linear-gradient(135deg, var(--gold), var(--gold-lt));
  border-radius: 2px;
  transition:
    opacity 0.2s,
    box-shadow 0.2s;
}
.nav-btn:hover {
  opacity: 0.9;
  box-shadow: 0 0 20px rgba(201, 168, 76, 0.4);
}
.logo-img {
  width: 60px;
  height: 60px;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 2rem;
}
.user-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-name {
  color: var(--gold-lt);
  font-family: var(--ff-heading);
  font-size: 0.9rem;
  font-weight: 600;
  white-space: nowrap;
}

.menu-btn {
  display: none;
  background: transparent;
  border: none;
  color: var(--gold-lt);
  font-size: 2rem;
  cursor: pointer;
}

/* Mobile menu */
.mobile-menu {
  display: none;
}

/* Responsive */
@media (max-width: 768px) {
  .navbar {
    padding: 1rem;
  }

  .nav-inner {
    justify-content: space-between;
  }

  /* اخفاء اللينكات */
  .nav-links {
    display: none;
  }

  /* اظهار الأيقونة */
  .menu-btn {
    display: block;
  }
  .audio-btn {
    display: flex; /* shown on mobile, next to hamburger */
  }

  /* القائمة المنسدلة */
  .mobile-menu {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    background: rgba(13, 10, 20, 0.98);
    backdrop-filter: blur(16px);

    position: absolute;
    top: 100%;
    left: 0;
    right: 0;

    padding: 1.5rem;

    transform: translateY(-20px);
    opacity: 0;
    pointer-events: none;

    transition: all 0.3s ease;
  }

  .mobile-menu.open {
    transform: translateY(0);
    opacity: 1;
    pointer-events: auto;
  }

  .mobile-link,
  .mobile-btn {
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 0.15em;
  }

  .mobile-link {
    color: var(--stone);
  }

  .mobile-btn {
    background: linear-gradient(135deg, var(--gold), var(--gold-lt));
    color: var(--ink);
    padding: 0.8rem;
    border-radius: 4px;
  }
  .mobile-btn-dashboard {
    background: linear-gradient(135deg, var(--gold), var(--gold-lt));
    color: var(--ink);
    padding: 0.8rem;
    border-radius: 4px;
  }
}
</style>
