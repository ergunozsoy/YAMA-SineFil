const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");

window.addEventListener("scroll", () => {
  header.classList.toggle("is-scrolled", window.scrollY > 30);
});

menuToggle.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(open));
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Hero videosu: sessiz otomatik başlar (tarayıcı politikası), düğmeyle ses açılır.
const heroVideo = document.getElementById("heroVideo");
const soundToggle = document.getElementById("soundToggle");

if (heroVideo && soundToggle) {
  const refresh = () => {
    const on = !heroVideo.muted;
    soundToggle.classList.toggle("is-on", on);
    soundToggle.querySelector(".sound-ico").textContent = on ? "🔊" : "🔇";
    soundToggle.querySelector(".sound-txt").textContent = on ? "Sesi kapat" : "Sesi aç";
    soundToggle.setAttribute("aria-label", on ? "Sesi kapat" : "Sesi aç");
  };

  soundToggle.addEventListener("click", () => {
    heroVideo.muted = !heroVideo.muted;
    if (!heroVideo.muted) {
      heroVideo.volume = 1;
      heroVideo.play().catch(() => {});
    }
    refresh();
  });

  refresh();
}
