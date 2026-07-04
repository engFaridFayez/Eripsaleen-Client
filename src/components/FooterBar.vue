<script setup>
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

const scrollToSection = async (id) => {
  if (route.path !== "/") {
    await router.push("/");
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};
</script>

<template>
  <footer class="footer" id="contact">
    <div class="footer-inner">
      <!-- Brand column -->
      <div class="footer-col footer-brand">
        <div class="footer-ornament">✛ ✛ ✛</div>
        <div class="footer-name">Eripsaleen Choir</div>
        <div class="footer-arabic">كورال تسبيح</div>
        <p class="footer-verse">
          "Sing to the Lord a new song; sing to the Lord, all the earth." —
          Psalm 96:1
        </p>
      </div>

      <!-- Quick links -->
      <div class="footer-col">
        <div class="footer-heading">Explore</div>
        <a
          href="#hero"
          class="footer-link"
          @click.prevent="scrollToSection('hero')"
          >Home</a
        >
        <a
          href="#about"
          class="footer-link"
          @click.prevent="scrollToSection('about')"
          >About</a
        >
        <a
          href="#booking"
          class="footer-link"
          @click.prevent="scrollToSection('shows')"
          >Booking</a
        >
      </div>

      <!-- Contact info -->
      <!-- <div class="footer-col">
        <div class="footer-heading">Contact</div>
        <a href="mailto:info@eripsaleenchoir.com" class="footer-link"
          >info@eripsaleenchoir.com</a
        >
        <a href="tel:+201000000000" class="footer-link">+20 100 000 0000</a>
        <span class="footer-text">Cairo, Egypt</span>
      </div> -->

      <!-- Service times / social -->
      <div class="footer-col">
        <!-- <div class="footer-heading">Rehearsals</div>
        <span class="footer-text">Fridays · 6:00 PM</span>
        <span class="footer-text">Sundays · 4:00 PM</span> -->

        <div class="footer-social">
          <a
            href="https://www.facebook.com/EripsaleenChoir"
            target="blank"
            class="footer-social-link"
            aria-label="Facebook"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              class="footer-social-icon"
            >
              <path
                d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.91h-2.34V22c4.78-.79 8.44-4.94 8.44-9.94Z"
              />
            </svg>
            <span>Facebook</span>
          </a>

          <a
            href="https://www.instagram.com/eripsaleen.choir?igsh=cXloeXFicnA3Zzhl"
            target="blank"
            class="footer-social-link"
            aria-label="Instagram"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              class="footer-social-icon"
            >
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle
                cx="17.2"
                cy="6.8"
                r="1"
                fill="currentColor"
                stroke="none"
              />
            </svg>
            <span>Instagram</span>
          </a>

          <a
            href="https://www.tiktok.com/@eripsaleen.choir?_r=1&_t=ZS-97lOSNilSHV"
            class="footer-social-link"
            target="blank"
            aria-label="TikTok"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              class="footer-social-icon"
            >
              <path
                d="M16.6 2h-3.3v13.6c0 1.5-1.2 2.7-2.7 2.7s-2.7-1.2-2.7-2.7 1.2-2.7 2.7-2.7c.3 0 .6.05.9.14V9.6a6.1 6.1 0 0 0-.9-.07A6.05 6.05 0 1 0 16.6 15.6V9.1c1.2.9 2.7 1.4 4.3 1.4V7.2c-1.9 0-3.5-1-4.3-2.5-.4-.7-.7-1.5-.7-2.4V2Z"
              />
            </svg>
            <span>TikTok</span>
          </a>

          <a
            href="https://www.youtube.com/@eripsaleenchoir"
            target="blank"
            class="footer-social-link"
            aria-label="YouTube"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              class="footer-social-icon"
            >
              <path
                d="M23 12s0-3.4-.44-5.02a2.98 2.98 0 0 0-2.1-2.1C18.86 4.4 12 4.4 12 4.4s-6.86 0-8.46.48a2.98 2.98 0 0 0-2.1 2.1C1 8.6 1 12 1 12s0 3.4.44 5.02a2.98 2.98 0 0 0 2.1 2.1c1.6.48 8.46.48 8.46.48s6.86 0 8.46-.48a2.98 2.98 0 0 0 2.1-2.1C23 15.4 23 12 23 12Z"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
              />
              <path d="M9.8 15.2V8.8L15.6 12l-5.8 3.2Z" />
            </svg>
            <span>YouTube</span>
          </a>
        </div>
      </div>
    </div>

    <div class="footer-divider"></div>

    <div class="footer-copy">
      © {{ new Date().getFullYear() }} Eripsaleen. All rights reserved.
      <br />
      Website designed and developed by
      <a
        href="https://www.facebook.com/profile.php?id=61587219160997"
        target="_blank"
        rel="noopener noreferrer"
        class="font-semibold text-blue-400 hover:underline"
      >
        Farid Faiz
      </a>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  text-align: center;
  padding: 4rem 2rem 2rem;
  background: var(--ink);
  border-top: 1px solid rgba(201, 168, 76, 0.2);
}

.footer-inner {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2.5rem;
  max-width: 1100px;
  margin: 0 auto 2.5rem;
  text-align: left;
}

.footer-brand {
  text-align: center;
}

@media (min-width: 640px) {
  .footer-brand {
    text-align: left;
  }
}

.footer-col {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
}

.footer-ornament {
  font-size: 1.2rem;
  color: var(--gold);
  letter-spacing: 1em;
  margin-bottom: 1.2rem;
  text-shadow: 0 0 12px var(--gold);
}

.footer-name {
  font-family: var(--ff-heading);
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--gold-lt);
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.footer-arabic {
  font-family: var(--ff-arabic);
  font-size: 1rem;
  color: var(--stone);
  margin: 0.3rem 0 1.2rem;
}

.footer-verse {
  font-family: var(--ff-body);
  font-style: italic;
  color: var(--smoke);
  font-size: 0.95rem;
  max-width: 320px;
}

.footer-heading {
  font-family: var(--ff-heading);
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--gold-lt);
  margin-bottom: 0.4rem;
}

.footer-link,
.footer-text {
  font-family: var(--ff-body);
  font-size: 0.9rem;
  color: var(--stone);
  transition: color 0.2s;
}

.footer-link {
  cursor: pointer;
}

.footer-link:hover {
  color: var(--gold-lt);
}

.footer-social {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 0.8rem;
}

.footer-social-link {
  font-family: var(--ff-heading);
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--stone);
  transition: color 0.2s;
}

.footer-social-link:hover {
  color: var(--gold-lt);
}

.footer-divider {
  max-width: 1100px;
  margin: 0 auto;
  height: 1px;
  background: rgba(201, 168, 76, 0.15);
}

.footer-copy {
  font-family: var(--ff-heading);
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  color: var(--smoke);
  text-transform: uppercase;
  margin-top: 2rem;
}

.footer-social {
  display: flex;
  flex-direction: row;
  gap: 1.2rem;
  margin-top: 0.8rem;
}

.footer-social-link {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-family: var(--ff-heading);
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--stone);
  transition: color 0.2s;
}

.footer-social-link:hover {
  color: var(--gold-lt);
}

.footer-social-icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}
</style>
