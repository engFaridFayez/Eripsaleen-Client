<template>
  <footer class="footer">
    <div class="footer-ornament">✛ ✛ ✛</div>
    <div class="footer-name">Eripsaleen Choir</div>
    <div class="footer-arabic">كورال تسبيح</div>
    <p class="footer-verse">"Sing to the Lord a new song; sing to the Lord, all the earth." — Psalm 96:1</p>
    <div class="footer-copy">© {{ new Date().getFullYear() }} Eripsaleen. All rights reserved.</div>
  </footer>
</template>

<style scoped>
.footer {
  text-align: center;
  padding: 4rem 2rem 2.5rem;
  background: var(--ink);
  border-top: 1px solid rgba(201, 168, 76, 0.2);
}
.footer-ornament {
  font-size: 1.2rem; color: var(--gold); letter-spacing: 1em;
  margin-bottom: 1.2rem;
  text-shadow: 0 0 12px var(--gold);
}
.footer-name {
  font-family: var(--ff-heading); font-size: 1.4rem; font-weight: 700;
  color: var(--gold-lt); letter-spacing: 0.2em; text-transform: uppercase;
}
.footer-arabic {
  font-family: var(--ff-arabic); font-size: 1rem; color: var(--stone);
  margin: 0.3rem 0 1.2rem;
}
.footer-verse {
  font-family: var(--ff-body); font-style: italic;
  color: var(--smoke); font-size: 0.95rem; max-width: 500px; margin: 0 auto 1.5rem;
}
.footer-copy {
  font-family: var(--ff-heading); font-size: 0.7rem; letter-spacing: 0.1em;
  color: var(--smoke); text-transform: uppercase;
}
</style>
