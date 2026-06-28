<script setup lang="ts">
import { onMounted } from "vue";

import { storeToRefs } from "pinia";

import { useShowStore } from "@/stores/show";

const showStore = useShowStore();

const { shows } = storeToRefs(showStore);

onMounted(() => {
  showStore.fetchShows();
});

// function formatMonth(date: string) {
//   return new Date(date)
//     .toLocaleString("en-US", {
//       month: "short",
//     })
//     .toUpperCase();
// }

// function formatDay(date: string) {
//   return new Date(date).getDate();
// }
</script>
<template>
  <main class="w-full">
    <!-- HERO -->
    <section
      class="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-8 pb-16 pt-24 text-center"
    >
      <div
        class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_40%,#1e1040_0%,var(--deep)_70%)]"
      >
        <div
          class="absolute left-[-100px] top-[10%] h-[600px] w-[600px] rounded-full bg-[var(--gold)] opacity-[0.15] blur-[120px]"
        ></div>
        <div
          class="absolute bottom-[10%] right-[-100px] h-[600px] w-[600px] rounded-full bg-[var(--crimson)] opacity-[0.15] blur-[120px]"
        ></div>
        <svg
          class="rose-window absolute left-1/2 top-1/2 h-[700px] w-[700px] opacity-60"
          viewBox="0 0 400 400"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="rw" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#c9a84c" stop-opacity="0.25" />
              <stop offset="60%" stop-color="#2e1f5e" stop-opacity="0.1" />
              <stop offset="100%" stop-color="#0d0a14" stop-opacity="0" />
            </radialGradient>
          </defs>
          <!-- Outer ring -->
          <circle
            cx="200"
            cy="200"
            r="190"
            fill="none"
            stroke="#c9a84c"
            stroke-width="0.8"
            stroke-opacity="0.3"
          />
          <circle
            cx="200"
            cy="200"
            r="160"
            fill="none"
            stroke="#c9a84c"
            stroke-width="0.5"
            stroke-opacity="0.2"
          />
          <circle
            cx="200"
            cy="200"
            r="80"
            fill="none"
            stroke="#c9a84c"
            stroke-width="0.5"
            stroke-opacity="0.3"
          />
          <circle cx="200" cy="200" r="30" fill="#c9a84c" fill-opacity="0.15" />
          <!-- Spokes 12 -->
          <g stroke="#c9a84c" stroke-width="0.6" stroke-opacity="0.25">
            <line x1="200" y1="10" x2="200" y2="390" />
            <line x1="10" y1="200" x2="390" y2="200" />
            <line x1="62" y1="62" x2="338" y2="338" />
            <line x1="338" y1="62" x2="62" y2="338" />
            <line x1="130" y1="18" x2="270" y2="382" />
            <line x1="382" y1="130" x2="18" y2="270" />
            <line x1="270" y1="18" x2="130" y2="382" />
            <line x1="18" y1="130" x2="382" y2="270" />
          </g>
          <!-- Petals -->
          <g
            fill="#c9a84c"
            fill-opacity="0.12"
            stroke="#c9a84c"
            stroke-width="0.5"
            stroke-opacity="0.3"
          >
            <ellipse
              cx="200"
              cy="120"
              rx="18"
              ry="40"
              transform="rotate(0 200 200)"
            />
            <ellipse
              cx="200"
              cy="120"
              rx="18"
              ry="40"
              transform="rotate(45 200 200)"
            />
            <ellipse
              cx="200"
              cy="120"
              rx="18"
              ry="40"
              transform="rotate(90 200 200)"
            />
            <ellipse
              cx="200"
              cy="120"
              rx="18"
              ry="40"
              transform="rotate(135 200 200)"
            />
            <ellipse
              cx="200"
              cy="120"
              rx="18"
              ry="40"
              transform="rotate(180 200 200)"
            />
            <ellipse
              cx="200"
              cy="120"
              rx="18"
              ry="40"
              transform="rotate(225 200 200)"
            />
            <ellipse
              cx="200"
              cy="120"
              rx="18"
              ry="40"
              transform="rotate(270 200 200)"
            />
            <ellipse
              cx="200"
              cy="120"
              rx="18"
              ry="40"
              transform="rotate(315 200 200)"
            />
          </g>
          <circle cx="200" cy="200" r="400" fill="url(#rw)" />
        </svg>
      </div>

      <div class="relative z-10 max-w-[800px]">
        <p
          class="mb-6 font-[var(--ff-heading)] text-[clamp(1.35rem,5vw,3rem)] font-semibold uppercase tracking-[0.28em] text-[var(--gold)]"
        >
          كورال اريبصالين
        </p>
        <h1 class="mb-4 flex flex-col items-center gap-1">
          <span class="title-main"> Ari'alin </span>
          <span
            class="font-[var(--ff-arabic)] text-[clamp(1.8rem,4vw,3rem)] font-light tracking-[0.2em] text-[var(--gold-lt)]"
          >
            Choir
          </span>
        </h1>
        <p
          class="mx-auto mb-10 max-w-[520px] font-[var(--ff-body)] text-[clamp(1rem,2.5vw,1.25rem)] italic leading-tight text-[var(--stone)]"
        >
          يضم الكورال مجموعة من الأصوات المختلفة التي تتحد معًا في انسجام واحد،
          لتقديم ترانيم قبطية وروحية تعكس عمق الإيمان وفرح الخدمة داخل الكنيسة.
        </p>
        <div class="flex flex-wrap justify-center gap-4">
          <router-link
            to="/booking"
            class="inline-block rounded-sm bg-[linear-gradient(135deg,var(--gold),var(--gold-lt))] px-9 py-4 font-[var(--ff-heading)] text-[0.8rem] font-bold uppercase tracking-[0.2em] text-[var(--ink)] transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(201,168,76,0.5),0_4px_16px_rgba(0,0,0,0.4)]"
          >
            Reserve Your Seat
          </router-link>
          <a
            href="#events"
            class="inline-block rounded-sm border border-[rgba(201,168,76,0.4)] px-9 py-4 font-[var(--ff-heading)] text-[0.8rem] font-semibold uppercase tracking-[0.2em] text-[var(--stone)] transition-colors duration-200 hover:border-[var(--gold-lt)] hover:text-[var(--gold-lt)]"
          >
            Upcoming Events
          </a>
        </div>
      </div>

      <div
        class="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span
          class="scroll-line h-10 w-px bg-[linear-gradient(to_bottom,var(--gold),transparent)]"
        ></span>
        <span
          class="font-[var(--ff-heading)] text-[0.65rem] uppercase tracking-[0.2em] text-[var(--smoke)]"
        >
          Scroll
        </span>
      </div>
    </section>

    <!-- DIVIDER -->
    <div class="mx-auto flex max-w-[600px] items-center gap-6 px-8 py-8">
      <div
        class="h-px flex-1 bg-[linear-gradient(to_right,transparent,rgba(201,168,76,0.3),transparent)]"
      ></div>
      <div class="text-base text-[var(--gold)] opacity-60">✛</div>
      <div
        class="h-px flex-1 bg-[linear-gradient(to_right,transparent,rgba(201,168,76,0.3),transparent)]"
      ></div>
    </div>

    <!-- ABOUT -->
    <section
      class="about-section relative overflow-hidden bg-[url('/src/assets/images/about-section.jpg')] bg-cover bg-center py-24"
      id="about"
    >
      <div class="relative z-10 mx-auto max-w-[1100px] px-8">
        <div class="grid grid-cols-1 items-center gap-20">
          <div>
            <p
              class="mb-3 font-[var(--ff-heading)] text-[clamp(1.35rem,4vw,2rem)] font-semibold uppercase text-[var(--gold)]"
            >
              نُرنم لنُعلن مجد الله
            </p>
            <h2
              class="mb-6 font-[var(--ff-heading)] text-[clamp(1.8rem,3.5vw,2.6rem)] font-bold leading-tight text-[var(--ivory)]"
              dir="rtl"
            >
              احنا كورال اريبصالين
            </h2>
            <p
              class="text-[clamp(1.15rem,3vw,2rem)] text-[var(--stone)]"
              dir="rtl"
            >
              كورال أريبصالين هو خدمة كنسية تهدف إلى تسبيح وتمجيد اسم الله من
              خلال الترنيم الروحي الهادف. نحن نؤمن أن الصوت المرفوع في العبادة
              هو وسيلة قوية للتعبير عن المحبة والإيمان، ونعتبر أن كل ترنيمة هي
              صلاة حية تصل إلى السماء.
            </p>
            <p
              class="mt-4 text-[clamp(1.15rem,3vw,2rem)] text-[var(--stone)]"
              dir="rtl"
            >
              يضم الكورال مجموعة من الأصوات المختلفة التي تتحد معًا في انسجام
              واحد، لتقديم ترانيم قبطية وروحية تعكس عمق الإيمان وفرح الخدمة داخل
              الكنيسة.
            </p>
            <div
              class="mt-10 flex flex-wrap justify-center gap-10 text-center"
              dir="rtl"
            >
              <div class="flex flex-col">
                <span
                  class="font-[var(--ff-display)] text-[2.2rem] leading-none text-[var(--gold-lt)]"
                >
                  +40
                </span>
                <span
                  class="mt-1 font-[var(--ff-heading)] text-[0.7rem] font-black uppercase tracking-[0.15em] text-[var(--smoke)]"
                >
                  Choir Members
                </span>
              </div>
              <div class="flex flex-col">
                <span
                  class="font-[var(--ff-display)] text-[2.2rem] leading-none text-[var(--gold-lt)]"
                >
                  12
                </span>
                <span
                  class="mt-1 font-[var(--ff-heading)] text-[0.7rem] font-black uppercase tracking-[0.15em] text-[var(--smoke)]"
                >
                  Years of Ministry
                </span>
              </div>
              <div class="flex flex-col">
                <span
                  class="font-[var(--ff-display)] text-[2.2rem] leading-none text-[var(--gold-lt)]"
                >
                  +200
                </span>
                <span
                  class="mt-1 font-[var(--ff-heading)] text-[0.7rem] font-black uppercase tracking-[0.15em] text-[var(--smoke)]"
                >
                  Performances
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- DIVIDER -->
    <div class="mx-auto flex max-w-[600px] items-center gap-6 px-8 py-8">
      <div
        class="h-px flex-1 bg-[linear-gradient(to_right,transparent,rgba(201,168,76,0.3),transparent)]"
      ></div>
      <div
        class="h-px flex-1 bg-[linear-gradient(to_right,transparent,rgba(201,168,76,0.3),transparent)]"
      ></div>
    </div>

    <!-- SHOWS -->
    <section class="py-20" id="shows">
      <div class="mx-auto max-w-[1200px] px-8">
        <h2
          class="mb-12 text-center font-[var(--ff-heading)] text-[clamp(1.8rem,3.5vw,2.6rem)] font-bold leading-tight text-[var(--ivory)]"
        >
          Featured Shows
        </h2>

        <div class="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-8">
          <div
            v-for="show in shows"
            :key="show.id"
            class="overflow-hidden rounded-xl border border-[rgba(201,168,76,0.2)] bg-[linear-gradient(160deg,rgba(46,31,94,0.4)_0%,rgba(17,13,30,0.8)_100%)] transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(201,168,76,0.5)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.4),0_0_20px_rgba(201,168,76,0.08)]"
          >
            <!-- Cover -->
            <div
              class="flex h-56 items-center justify-center bg-[rgba(255,255,255,0.04)]"
            >
              <img
                v-if="show.cover"
                :src="show.cover"
                :alt="show.title"
                class="h-full w-full object-cover"
              />

              <div
                v-else
                class="flex h-full w-full items-center justify-center text-[var(--gold)] text-lg font-semibold"
              >
                No Cover
              </div>
            </div>

            <!-- Content -->
            <div class="p-6">
              <h3
                class="mb-3 font-[var(--ff-heading)] text-2xl font-bold text-[var(--ivory)]"
              >
                {{ show.title }}
              </h3>

              <p
                class="mb-6 line-clamp-3 text-[0.95rem] leading-relaxed text-[var(--stone)]"
              >
                {{ show.description }}
              </p>

              <router-link
                :to="{
                  name: 'show-details',
                  params: {
                    id: show.id,
                  },
                }"
                class="inline-flex rounded-sm bg-[linear-gradient(135deg,var(--gold),var(--gold-lt))] px-5 py-2 font-[var(--ff-heading)] text-[0.75rem] font-bold uppercase tracking-[0.12em] text-[var(--ink)] transition-opacity duration-200 hover:opacity-85"
              >
                View Shows
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- QUOTE BANNER -->
    <section class="relative overflow-hidden px-8 py-24 text-center">
      <div
        class="quote-bg absolute inset-0 bg-[linear-gradient(135deg,var(--crimson)_0%,var(--purple)_50%,var(--vault)_100%)] opacity-60"
      ></div>
      <div class="relative z-10 mx-auto max-w-[700px]">
        <div
          class="mb-6 font-[var(--ff-display)] text-8xl leading-[0.5] text-[var(--gold)] opacity-50"
        >
          "
        </div>
        <blockquote
          class="mb-4 font-[var(--ff-body)] text-[clamp(1.4rem,3vw,2rem)] italic leading-normal text-[var(--ivory)]"
        >
          Let everything that has breath praise the Lord.
        </blockquote>
        <cite
          class="font-[var(--ff-heading)] text-[0.85rem] tracking-[0.15em] text-[var(--gold-lt)]"
        >
          — Psalm 150:6
        </cite>
        <div class="mt-6 font-[var(--ff-arabic)] text-3xl text-white/20">
          سَبِّحُوا الرَّبَّ
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="px-8 py-24 text-center">
      <div class="mx-auto flex max-w-[1100px] flex-col items-center gap-5">
        <h2
          class="font-[var(--ff-heading)] text-[clamp(2rem,4vw,3rem)] font-bold text-[var(--ivory)]"
        >
          Be Part of the Praise
        </h2>
        <p class="max-w-[480px] text-lg italic text-[var(--stone)]">
          Reserve your place for an unforgettable evening of sacred choral
          music. Limited seats available.
        </p>
        <router-link
          to="/booking"
          class="inline-block rounded-sm bg-[linear-gradient(135deg,var(--gold),var(--gold-lt))] px-12 py-5 font-[var(--ff-heading)] text-[0.9rem] font-bold uppercase tracking-[0.2em] text-[var(--ink)] transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(201,168,76,0.5),0_4px_16px_rgba(0,0,0,0.4)]"
        >
          Reserve Your Seat Now
        </router-link>
      </div>
    </section>
  </main>
</template>

<style scoped>
.rose-window {
  transform: translate(-50%, -50%);
  animation: slow-spin 80s linear infinite;
}

@keyframes slow-spin {
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

.title-main {
  font-family: "CSAvva", serif;
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 900;
  letter-spacing: 0.05em;
  line-height: 1;

  /* اختار الألوان هنا */
  --c1: #000000;
  --c2: #921fe4;
  --c3: #f7df26;
  --c4: #4d96ff;

  background: linear-gradient(
    270deg,
    var(--c1),
    var(--c2),
    var(--c3),
    var(--c4),
    var(--c1)
  );

  background-size: 800% 800%;
  animation: gradientMove 10s ease-in-out infinite;

  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  /* optional glow */
  text-shadow: 0 0 40px rgba(201, 168, 76, 0.15);
}

@keyframes gradientMove {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.scroll-line {
  animation: scroll-anim 1.8s ease-in-out infinite;
}

@keyframes scroll-anim {
  0%,
  100% {
    opacity: 0.3;
    transform: scaleY(1);
  }
  50% {
    opacity: 1;
    transform: scaleY(0.6) translateY(10px);
  }
}

.about-section::before {
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  z-index: 1;
}

.quote-bg::before {
  content: "✛";
  position: absolute;
  font-size: 400px;
  color: rgba(255, 255, 255, 0.03);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
