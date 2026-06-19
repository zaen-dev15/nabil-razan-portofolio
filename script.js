/* ── Hamburger menu ── */
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");
const navOverlay = document.getElementById("navOverlay");

function openMenu() {
  nav.classList.add("open");
  navOverlay.classList.add("open");
  menuBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
}

function closeMenu() {
  nav.classList.remove("open");
  navOverlay.classList.remove("open");
  menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
}

menuBtn.addEventListener("click", () => {
  nav.classList.contains("open") ? closeMenu() : openMenu();
});

navOverlay.addEventListener("click", closeMenu);
nav
  .querySelectorAll("a")
  .forEach((a) => a.addEventListener("click", closeMenu));

/* ── Active nav on scroll ── */
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((sec) => {
    if (window.scrollY >= sec.offsetTop - 150) current = sec.id;
  });
  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current)
      link.classList.add("active");
  });
});

/* ── Typing animation ── */
const words = ["RPL Student", "Front-End Dev", "UI Designer", "Web Creator"];
let wi = 0,
  ci = 0,
  deleting = false;
const typedEl = document.getElementById("typed");

function type() {
  const word = words[wi];
  if (deleting) {
    typedEl.textContent = word.slice(0, --ci);
  } else {
    typedEl.textContent = word.slice(0, ++ci);
  }
  if (!deleting && ci === word.length) {
    setTimeout(() => (deleting = true), 1800);
  }
  if (deleting && ci === 0) {
    deleting = false;
    wi = (wi + 1) % words.length;
  }
  setTimeout(type, deleting ? 60 : 100);
}

type();

/* ── Scroll reveal ── */
const reveals = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        observer.unobserve(e.target);
      }
    });
  },
  { threshold: 0.1 },
);

reveals.forEach((el) => observer.observe(el));

/* ── Theme toggle ── */
const themeBtn = document.getElementById("themeBtn");
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") {
  document.body.classList.add("light");
  themeBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
}

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("light");
  const isLight = document.body.classList.contains("light");
  themeBtn.innerHTML = isLight
    ? '<i class="fa-solid fa-moon"></i>'
    : '<i class="fa-solid fa-sun"></i>';
  localStorage.setItem("theme", isLight ? "light" : "dark");
});

/* ── Back to top ── */
const backTop = document.getElementById("backTop");

window.addEventListener("scroll", () => {
  backTop.classList.toggle("show", window.scrollY > 400);
});

backTop.addEventListener("click", () =>
  window.scrollTo({ top: 0, behavior: "smooth" }),
);
