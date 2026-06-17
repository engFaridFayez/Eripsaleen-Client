
<template>
  <main class="home">

    <!-- HERO -->
    <section class="hero">
      <div class="hero-bg">
        <div class="candle-glow glow-left"></div>
        <div class="candle-glow glow-right"></div>
        <div class="arch-overlay"></div>
        <svg class="rose-window" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="rw" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#c9a84c" stop-opacity="0.25"/>
              <stop offset="60%" stop-color="#2e1f5e" stop-opacity="0.1"/>
              <stop offset="100%" stop-color="#0d0a14" stop-opacity="0"/>
            </radialGradient>
          </defs>
          <!-- Outer ring -->
          <circle cx="200" cy="200" r="190" fill="none" stroke="#c9a84c" stroke-width="0.8" stroke-opacity="0.3"/>
          <circle cx="200" cy="200" r="160" fill="none" stroke="#c9a84c" stroke-width="0.5" stroke-opacity="0.2"/>
          <circle cx="200" cy="200" r="80" fill="none" stroke="#c9a84c" stroke-width="0.5" stroke-opacity="0.3"/>
          <circle cx="200" cy="200" r="30" fill="#c9a84c" fill-opacity="0.15"/>
          <!-- Spokes 12 -->
          <g stroke="#c9a84c" stroke-width="0.6" stroke-opacity="0.25">
            <line x1="200" y1="10" x2="200" y2="390"/>
            <line x1="10" y1="200" x2="390" y2="200"/>
            <line x1="62" y1="62" x2="338" y2="338"/>
            <line x1="338" y1="62" x2="62" y2="338"/>
            <line x1="130" y1="18" x2="270" y2="382"/>
            <line x1="382" y1="130" x2="18" y2="270"/>
            <line x1="270" y1="18" x2="130" y2="382"/>
            <line x1="18" y1="130" x2="382" y2="270"/>
          </g>
          <!-- Petals -->
          <g fill="#c9a84c" fill-opacity="0.12" stroke="#c9a84c" stroke-width="0.5" stroke-opacity="0.3">
            <ellipse cx="200" cy="120" rx="18" ry="40" transform="rotate(0 200 200)"/>
            <ellipse cx="200" cy="120" rx="18" ry="40" transform="rotate(45 200 200)"/>
            <ellipse cx="200" cy="120" rx="18" ry="40" transform="rotate(90 200 200)"/>
            <ellipse cx="200" cy="120" rx="18" ry="40" transform="rotate(135 200 200)"/>
            <ellipse cx="200" cy="120" rx="18" ry="40" transform="rotate(180 200 200)"/>
            <ellipse cx="200" cy="120" rx="18" ry="40" transform="rotate(225 200 200)"/>
            <ellipse cx="200" cy="120" rx="18" ry="40" transform="rotate(270 200 200)"/>
            <ellipse cx="200" cy="120" rx="18" ry="40" transform="rotate(315 200 200)"/>
          </g>
          <circle cx="200" cy="200" r="400" fill="url(#rw)"/>
        </svg>
      </div>

      <div class="hero-content">
        <p class="hero-eyebrow">كورال اريبصالين</p>
        <h1 class="hero-title">
          <span class="title-main"> Ari'alin </span>
          <span class="title-arabic">Choir</span>
        </h1>
        <p class="hero-sub">يضم الكورال مجموعة من الأصوات المختلفة التي تتحد معًا في انسجام واحد، لتقديم ترانيم قبطية وروحية تعكس عمق الإيمان وفرح الخدمة داخل الكنيسة.</p>
        <div class="hero-actions">
          <router-link to="/booking" class="btn-primary">Reserve Your Seat</router-link>
          <a href="#events" class="btn-ghost">Upcoming Events</a>
        </div>
      </div>

      <div class="scroll-hint">
        <span class="scroll-line"></span>
        <span class="scroll-label">Scroll</span>
      </div>
    </section>

    <!-- DIVIDER -->
    <div class="section-divider">
      <div class="divider-line"></div>
      <div class="divider-cross">✛</div>
      <div class="divider-line"></div>
    </div>

    <!-- ABOUT -->
    <section class="about" id="about" >
      <div class="container about-grid">
        <!-- <div class="about-visual">
          <div class="choir-illustration">
            <div class="arch-frame">
              <div class="choir-figures">
                <div v-for="i in 7" :key="i" class="figure" :class="`fig-${i}`">
                  <div class="fig-body"></div>
                  <div class="fig-head"></div>
                  <div class="fig-note" v-if="i % 2 === 0">♪</div>
                </div>
              </div>
              <div class="choir-glow"></div>
            </div>
          </div>
        </div> -->
        <div class="about-text">
          <p class="section-eyebrow">نُرنم لنُعلن مجد الله</p>
          <h2 class="section-title">احنا كورال اريبصالين</h2>
          <p>كورال أريبصالين هو خدمة كنسية تهدف إلى تسبيح وتمجيد اسم الله من خلال الترنيم الروحي الهادف. نحن نؤمن أن الصوت المرفوع في العبادة هو وسيلة قوية للتعبير عن المحبة والإيمان، ونعتبر أن كل ترنيمة هي صلاة حية تصل إلى السماء.</p>
          <p style="margin-top:1rem">يضم الكورال مجموعة من الأصوات المختلفة التي تتحد معًا في انسجام واحد، لتقديم ترانيم قبطية وروحية تعكس عمق الإيمان وفرح الخدمة داخل الكنيسة.</p>
          <div class="about-stats">
            <div class="stat">
              <span class="stat-num">+40</span>
              <span class="stat-label">Choir Members</span>
            </div>
            <div class="stat">
              <span class="stat-num">12</span>
              <span class="stat-label">Years of Ministry</span>
            </div>
            <div class="stat">
              <span class="stat-num">+200</span>
              <span class="stat-label">Performances</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- DIVIDER -->
    <div class="section-divider">
      <div class="divider-line"></div>
      <div class="divider-line"></div>
    </div>

    <!-- EVENTS -->
    <section class="events" id="events">
      <div class="container">
        <p class="section-eyebrow" style="text-align:center">Sacred Gatherings</p>
        <h2 class="section-title" style="text-align:center;margin-bottom:3rem">Upcoming Concerts</h2>
        <div class="events-grid">
          <div class="event-card featured" v-for="event in events" :key="event.id">
            <div class="event-date-badge">
              <span class="badge-month">{{ event.month }}</span>
              <span class="badge-day">{{ event.day }}</span>
            </div>
            <div class="event-info">
              <div class="event-tag">{{ event.tag }}</div>
              <h3 class="event-name">{{ event.name }}</h3>
              <p class="event-venue">{{ event.venue }}</p>
              <p class="event-desc">{{ event.desc }}</p>
              <div class="event-footer">
                <span class="event-price">{{ event.price }}</span>
                <router-link to="/booking" class="event-book-btn">Book Now</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- QUOTE BANNER -->
    <section class="quote-banner">
      <div class="quote-bg"></div>
      <div class="quote-content">
        <div class="quote-mark">"</div>
        <blockquote>Let everything that has breath praise the Lord.</blockquote>
        <cite>— Psalm 150:6</cite>
        <div class="quote-arabic">سَبِّحُوا الرَّبَّ</div>
      </div>
    </section>

    <!-- CTA -->
    <section class="cta-section">
      <div class="container cta-inner">
        <h2 class="cta-title">Be Part of the Praise</h2>
        <p class="cta-sub">Reserve your place for an unforgettable evening of sacred choral music. Limited seats available.</p>
        <router-link to="/booking" class="btn-primary btn-large">Reserve Your Seat Now</router-link>
      </div>
    </section>

  </main>
</template>

<script setup>
import about from "@/assets/images/about-section.jpg"
const events = [
  {
    id: 1,
    month: 'JUL', day: '14',
    tag: 'Grand Concert',
    name: 'Night of Praise',
    venue: 'St. Mark\'s Cathedral, Cairo',
    desc: 'An evening of sacred hymns, Coptic liturgy, and original compositions celebrating divine glory.',
    price: 'From EGP 150'
  },
  {
    id: 2,
    month: 'AUG', day: '22',
    tag: 'Seasonal',
    name: 'Voices of the Holy',
    venue: 'Church of the Nativity, Heliopolis',
    desc: 'A summer worship concert featuring classical arrangements and beloved traditional spirituals.',
    price: 'From EGP 120'
  },
  {
    id: 3,
    month: 'SEP', day: '07',
    tag: 'Special',
    name: 'Leilat El-Tasbih',
    venue: 'Grand Hall, Old Cairo',
    desc: 'ليلة التسبيح — An all-night praise gathering, uniting voices in continuous worship until dawn.',
    price: 'From EGP 200'
  }
]
</script>

<style scoped>
/* ====== HERO ====== */
.hero {
  position: relative; min-height: 100vh;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  overflow: hidden; text-align: center;
  padding: 6rem 2rem 4rem;
}
.hero-bg {
  position: absolute; inset: 0; pointer-events: none;
  background: radial-gradient(ellipse 80% 70% at 50% 40%, #1e1040 0%, var(--deep) 70%);
  /* background-color: black; */
}
.candle-glow {
  position: absolute; width: 600px; height: 600px; border-radius: 50%;
  filter: blur(120px); opacity: 0.15;
}
.glow-left  { left: -100px; top: 10%; background: var(--gold); }
.glow-right { right: -100px; bottom: 10%; background: var(--crimson); }
.rose-window {
  position: absolute; top: 50%; left: 50%; width: 700px; height: 700px;
  transform: translate(-50%, -50%);
  animation: slow-spin 80s linear infinite; opacity: 0.6;
}
@keyframes slow-spin { to { transform: translate(-50%, -50%) rotate(360deg); } }

.hero-content { position: relative; z-index: 2; max-width: 800px; }
.hero-eyebrow {
  font-family: var(--ff-heading); font-size: 3rem; font-weight: 600;
  letter-spacing: 0.35em; text-transform: uppercase; color: var(--gold);
  margin-bottom: 1.5rem;
}
.hero-title {
  display: flex; flex-direction: column; align-items: center;
  gap: 0.3rem; margin-bottom: 1rem;
}
.title-main {
  font-family: 'CSAvva', serif;
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
  text-shadow: 0 0 40px rgba(201,168,76,0.15);
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
.title-divider { font-size: 1.5rem; color: var(--gold); opacity: 0.7; }
.title-arabic {
  font-family: var(--ff-arabic); font-size: clamp(1.8rem, 4vw, 3rem);
  font-weight: 300; color: var(--gold-lt); letter-spacing: 0.2em;
}
.hero-sub {
  font-family: var(--ff-body); font-style: italic;
  font-size: clamp(1rem, 2.5vw, 1.25rem); color: var(--stone);
  max-width: 520px; margin: 0 auto 2.5rem; line-height: 1.2;
}
.hero-actions { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }

.btn-primary {
  display: inline-block;
  background: linear-gradient(135deg, var(--gold), var(--gold-lt));
  color: var(--ink); font-family: var(--ff-heading);
  font-size: 0.8rem; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase;
  padding: 1rem 2.2rem; border-radius: 2px;
  transition: box-shadow 0.3s, transform 0.2s;
}
.btn-primary:hover {
  box-shadow: 0 0 30px rgba(201,168,76,0.5), 0 4px 16px rgba(0,0,0,0.4);
  transform: translateY(-2px);
}
.btn-primary.btn-large { padding: 1.2rem 3rem; font-size: 0.9rem; }
.btn-ghost {
  display: inline-block;
  border: 1px solid rgba(201,168,76,0.4); color: var(--stone);
  font-family: var(--ff-heading); font-size: 0.8rem; font-weight: 600;
  letter-spacing: 0.2em; text-transform: uppercase;
  padding: 1rem 2.2rem; border-radius: 2px;
  transition: border-color 0.2s, color 0.2s;
}
.btn-ghost:hover { border-color: var(--gold-lt); color: var(--gold-lt); }

.scroll-hint {
  position: absolute; bottom: 2rem; left: 50%; transform: translateX(-50%);
  display: flex; flex-direction: column; align-items: center; gap: 0.5rem;
}
.scroll-line {
  width: 1px; height: 40px; background: linear-gradient(to bottom, var(--gold), transparent);
  animation: scroll-anim 1.8s ease-in-out infinite;
}
@keyframes scroll-anim {
  0%,100% { opacity: 0.3; transform: scaleY(1); }
  50% { opacity: 1; transform: scaleY(0.6) translateY(10px); }
}
.scroll-label {
  font-family: var(--ff-heading); font-size: 0.65rem; letter-spacing: 0.2em;
  text-transform: uppercase; color: var(--smoke);
}

/* ====== DIVIDERS ====== */
.section-divider {
  display: flex; align-items: center; gap: 1.5rem;
  max-width: 600px; margin: 0 auto; padding: 2rem 2rem;
}
.divider-line { flex: 1; height: 1px; background: linear-gradient(to right, transparent, rgba(201,168,76,0.3), transparent); }
.divider-cross { font-size: 1rem; color: var(--gold); opacity: 0.6; }

/* ====== ABOUT ====== */
.container { max-width: 1100px; margin: 0 auto; padding: 0 2rem; }
.about { padding: 5rem 0 ;position: relative;
  background: url("/src/assets/images/about-section.jpg") center/cover no-repeat;
  padding: 6rem 0;
  overflow: hidden;}
.about::before {
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.55); /* غيّر الشفافية براحتك */
  z-index: 1;
}
/* المحتوى فوق الطبقة */
.about .container {
  position: relative;
  z-index: 2;
}
.about-grid { display: grid; grid-template-columns: 1fr; gap: 5rem; align-items: center; }
.about-visual { display: flex; justify-content: center; }
.arch-frame {
  position: relative; width: 260px; height: 340px;
  border: 1px solid rgba(201,168,76,0.25); border-radius: 130px 130px 0 0;
  background: linear-gradient(180deg, rgba(46,31,94,0.5) 0%, rgba(17,13,30,0.8) 100%);
  overflow: hidden; display: flex; align-items: flex-end; justify-content: center;
  padding-bottom: 1rem;
}
.choir-figures {
  display: flex; gap: 6px; align-items: flex-end; padding-bottom: 0.5rem; position: relative; z-index: 2;
}
.figure { display: flex; flex-direction: column; align-items: center; gap: 2px; position: relative; }
.fig-head {
  width: 14px; height: 14px; border-radius: 50%;
  background: linear-gradient(180deg, var(--stone), var(--smoke));
}
.fig-body {
  width: 18px; border-radius: 3px 3px 0 0;
  background: linear-gradient(180deg, var(--purple), var(--vault));
  border: 1px solid rgba(201,168,76,0.2);
}
.fig-1 .fig-body, .fig-7 .fig-body { height: 60px; }
.fig-2 .fig-body, .fig-6 .fig-body { height: 80px; }
.fig-3 .fig-body, .fig-5 .fig-body { height: 95px; }
.fig-4 .fig-body { height: 110px; }
.fig-note {
  position: absolute; top: -18px; right: -8px;
  font-size: 0.9rem; color: var(--gold); opacity: 0.8;
  animation: float-note 3s ease-in-out infinite;
}
.fig-2 .fig-note { animation-delay: 0.5s; }
.fig-6 .fig-note { animation-delay: 1s; }
@keyframes float-note {
  0%,100% { transform: translateY(0) rotate(-5deg); opacity: 0.8; }
  50% { transform: translateY(-12px) rotate(5deg); opacity: 0.3; }
}
.choir-glow {
  position: absolute; bottom: 0; left: 50%; transform: translateX(-50%);
  width: 200px; height: 100px; border-radius: 50%;
  background: radial-gradient(ellipse, rgba(201,168,76,0.15), transparent 70%);
  filter: blur(20px);
}

.section-eyebrow {
  font-family: var(--ff-heading); font-size: 2rem; font-weight: 600;
  text-transform: uppercase; color: var(--gold);
  margin-bottom: 0.8rem;
  
}
.section-title {
  font-family: var(--ff-heading); font-size: clamp(1.8rem, 3.5vw, 2.6rem);
  font-weight: 700; color: var(--ivory); line-height: 1.2;
  margin-bottom: 1.5rem;
  direction: rtl;
}
.about-text p { color: var(--stone); font-size: 2rem; direction: rtl; }
.about-stats { display: flex; gap: 2.5rem; margin-top: 2.5rem;direction: rtl;justify-content: center; }
.stat { display: flex; flex-direction: column;direction: rtl;justify-content: center; }
.stat-num {
  font-family: var(--ff-display); font-size: 2.2rem; color: var(--gold-lt);
  line-height: 1;
  text-align: center;
}
.stat-label {
  font-family: var(--ff-heading); font-size: 0.7rem; letter-spacing: 0.15em; font-weight: 900;
  text-transform: uppercase; color: var(--smoke); margin-top: 0.3rem;
}

/* ====== EVENTS ====== */
.events { padding: 5rem 0; }
.events-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; }
.event-card {
  background: linear-gradient(160deg, rgba(46,31,94,0.4) 0%, rgba(17,13,30,0.8) 100%);
  border: 1px solid rgba(201,168,76,0.2); border-radius: 4px;
  padding: 1.8rem; display: flex; gap: 1.5rem;
  transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s;
}
.event-card:hover {
  border-color: rgba(201,168,76,0.5); transform: translateY(-3px);
  box-shadow: 0 8px 40px rgba(0,0,0,0.4), 0 0 20px rgba(201,168,76,0.08);
}
.event-date-badge {
  flex-shrink: 0; width: 60px; height: 70px;
  background: linear-gradient(180deg, var(--gold), #a07828);
  border-radius: 3px; display: flex; flex-direction: column;
  align-items: center; justify-content: center;
}
.badge-month {
  font-family: var(--ff-heading); font-size: 0.65rem; font-weight: 700;
  color: var(--ink); letter-spacing: 0.15em; text-transform: uppercase;
}
.badge-day {
  font-family: var(--ff-display); font-size: 1.8rem; font-weight: 900;
  color: var(--ink); line-height: 1;
}
.event-info { flex: 1; }
.event-tag {
  font-family: var(--ff-heading); font-size: 0.65rem; font-weight: 600;
  letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold);
  margin-bottom: 0.4rem;
}
.event-name { font-family: var(--ff-heading); font-size: 1.15rem; font-weight: 700; color: var(--ivory); margin-bottom: 0.3rem; }
.event-venue { font-family: var(--ff-heading); font-size: 0.75rem; color: var(--smoke); letter-spacing: 0.05em; margin-bottom: 0.6rem; }
.event-desc { font-size: 0.9rem; color: var(--stone); line-height: 1.6; margin-bottom: 1rem; }
.event-footer { display: flex; align-items: center; justify-content: space-between; }
.event-price { font-family: var(--ff-heading); font-size: 0.85rem; color: var(--gold-lt); font-weight: 600; }
.event-book-btn {
  font-family: var(--ff-heading); font-size: 0.7rem; font-weight: 700;
  letter-spacing: 0.12em; text-transform: uppercase;
  padding: 0.4rem 1rem; color: var(--ink);
  background: linear-gradient(135deg, var(--gold), var(--gold-lt));
  border-radius: 2px;
  transition: opacity 0.2s;
}
.event-book-btn:hover { opacity: 0.85; }

/* ====== QUOTE BANNER ====== */
.quote-banner {
  position: relative; padding: 6rem 2rem;
  text-align: center; overflow: hidden;
}
.quote-bg {
  position: absolute; inset: 0;
  background: linear-gradient(135deg, var(--crimson) 0%, var(--purple) 50%, var(--vault) 100%);
  opacity: 0.6;
}
.quote-bg::before {
  content: '✛';
  position: absolute; font-size: 400px; color: rgba(255,255,255,0.03);
  top: 50%; left: 50%; transform: translate(-50%, -50%);
}
.quote-content { position: relative; z-index: 1; max-width: 700px; margin: 0 auto; }
.quote-mark {
  font-family: var(--ff-display); font-size: 6rem; color: var(--gold);
  line-height: 0.5; margin-bottom: 1.5rem; opacity: 0.5;
}
blockquote {
  font-family: var(--ff-body); font-style: italic;
  font-size: clamp(1.4rem, 3vw, 2rem); color: var(--ivory); line-height: 1.5;
  margin-bottom: 1rem;
}
cite {
  font-family: var(--ff-heading); font-size: 0.85rem; color: var(--gold-lt);
  letter-spacing: 0.15em;
}
.quote-arabic {
  font-family: var(--ff-arabic); font-size: 2rem; color: rgba(255,255,255,0.2);
  margin-top: 1.5rem;
}

/* ====== CTA ====== */
.cta-section { padding: 6rem 2rem; text-align: center; }
.cta-inner { display: flex; flex-direction: column; align-items: center; gap: 1.2rem; }
.cta-title {
  font-family: var(--ff-heading); font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700; color: var(--ivory);
}
.cta-sub { font-style: italic; color: var(--stone); max-width: 480px; font-size: 1.1rem; }

@media (max-width: 768px) {
  .about-grid { grid-template-columns: 1fr; gap: 3rem; }
  .about-visual { display: none; }
  .about-stats { gap: 1.5rem; }
}
</style>
