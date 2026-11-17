document.documentElement.classList.add("js");

/* =========================================================
   ÁLBUMES — usan las fotos reales de la carpeta del proyecto
   ========================================================= */
const tabsData = [
  {
    title: "Capítulo I: Viajes y aventuras",
    quote:
      "Cada viaje dejó paisajes, anécdotas y momentos compartidos que hoy forman parte de nuestros recuerdos.",
    images: [
      { src: "viaje15.jpeg", caption: "Bienvenidos a Huancapi" },
      { src: "viaje3.jpg", caption: "Al pie de la cascada" },
      { src: "viaje11.jpeg", caption: "Un chapuzón en el río" },
      { src: "viaje1.jpg", caption: "Aguas turquesa" },
      { src: "viaje7.jpeg", caption: "El puente colgante" },
      { src: "viaje4.jpg", caption: "Durimayma" },
      { src: "viaje12.jpeg", caption: "Desde el mirador" },
      { src: "viaje6.jpeg", caption: "La última fogata" },
      { src: "viaje2.jpg", caption: "Entre montañas" },
      { src: "viaje10.jpeg", caption: "Aguas termales" },
      { src: "viaje13.jpeg", caption: "Huancapi en grupo" },
      { src: "viaje5.jpeg", caption: "Tarde de piscina" },
      { src: "viaje16.jpeg", caption: "Desde el mirador" },
      { src: "viaje8.jpeg", caption: "Almuerzo compartido" },
      { src: "viaje9.jpeg", caption: "Sobremesa de viaje" },
      { src: "viaje14.jpeg", caption: "Todos juntos" }
    ]
  },
  {
    title: "Capítulo II: Nuestro año en las aulas",
    quote:
      "Entre clases, proyectos y risas, construimos recuerdos que siempre nos acompañarán.",
    images: [
      { src: "aula5.jpg", caption: "Y si no es eterno, que sea inolvidable" },
      { src: "alua4.jpg", caption: "Un día en el colegio" },
      { src: "alula3.jpg", caption: "Danzas y tradición" },
      { src: "aula1.jpg", caption: "Último deporte" },
      { src: "aula7.jpg", caption: "Visita al museo" },
      { src: "alua2.jpg", caption: "Las chicas de la promoción" },
      { src: "aula6.jpg", caption: "Frente al museo" }
    ]
  },
  {
    title: "Capítulo III: Nuestra promoción",
    quote:
      "Un álbum para celebrar a las personas y los momentos que hicieron especial esta promoción.",
    images: [
      { src: "viaje14.jpeg", caption: "Un recuerdo de la promoción" },
      { src: "marcia.jpeg", caption: "Marcia Chávez Ramos" },
      { src: "aula5.jpg", caption: "Un recuerdo de la promoción" },
      { src: "karol.jpeg", caption: "Karol Prado Mucha" },
      { src: "viaje6.jpeg", caption: "Un recuerdo de la promoción" },
      { src: "nilda.jpeg", caption: "Nilda Quispe Cancho" },
      { src: "aula7.jpg", caption: "Un recuerdo de la promoción" },
      { src: "esmeralda.jpeg", caption: "Esmeralda Valdez Aguirre" },
      { src: "viaje13.jpeg", caption: "Un recuerdo de la promoción" }
    ]
  }
];

const MOSAIC_LIMIT = 9;
let currentTab = 0;
let mosaicExpanded = false;

const totalPhotos = new Set(tabsData.flatMap((t) => t.images.map((i) => i.src))).size;
const storyCount = document.getElementById("story-count");
if (storyCount) {
  storyCount.textContent = `${totalPhotos} fotografías organizadas en tres álbumes para volver a vivir cada momento.`;
}
document.querySelectorAll("[data-album-count]").forEach((el) => {
  const data = tabsData[Number(el.dataset.albumCount)];
  if (data) el.textContent = `${data.images.length} fotografías`;
});

function renderMosaic() {
  const mosaic = document.getElementById("tab-mosaic");
  const moreBtn = document.getElementById("mosaic-more");
  const data = tabsData[currentTab];
  if (!mosaic || !data) return;

  const visible = mosaicExpanded ? data.images : data.images.slice(0, MOSAIC_LIMIT);

  mosaic.innerHTML = visible
    .map(
      (image, i) => `
        <button class="shot" type="button" data-index="${i}" style="--i:${i}" aria-label="Ampliar: ${image.caption}">
          <img alt="${image.caption}" src="${image.src}" loading="lazy">
          <span class="shot__cap">${image.caption}</span>
        </button>`
    )
    .join("");

  if (moreBtn) {
    const hidden = data.images.length - visible.length;
    moreBtn.hidden = hidden <= 0;
    moreBtn.textContent = `Ver ${hidden} fotos más`;
  }
}

function switchStoryTab(index) {
  const tabTitle = document.getElementById("tab-title");
  const tabMeta = document.getElementById("tab-meta");
  const tabQuote = document.getElementById("tab-quote");
  const container = document.getElementById("category-tabs");
  const data = tabsData[index];

  if (!data || !tabTitle || !tabMeta || !tabQuote || !container) return;

  currentTab = index;
  mosaicExpanded = false;

  tabTitle.textContent = data.title;
  tabMeta.textContent = `${data.images.length} fotografías · Promoción 2026`;
  tabQuote.textContent = data.quote;
  renderMosaic();

  [tabTitle, tabMeta, tabQuote].forEach((element) => {
    element.classList.remove("animate-fade-slide");
    void element.offsetWidth;
    element.classList.add("animate-fade-slide");
  });

  container.querySelectorAll('[role="tab"]').forEach((button, buttonIndex) => {
    const isActive = buttonIndex === index;
    button.classList.toggle("tab--active", isActive);
    button.setAttribute("aria-selected", String(isActive));
    button.setAttribute("tabindex", isActive ? "0" : "-1");
  });
}

document.getElementById("category-tabs")?.addEventListener("keydown", (event) => {
  const keys = ["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp", "Home", "End"];
  if (!keys.includes(event.key)) return;

  const buttons = Array.from(event.currentTarget.querySelectorAll('[role="tab"]'));
  const activeIndex = buttons.indexOf(document.activeElement);
  if (activeIndex === -1) return;

  event.preventDefault();
  const lastIndex = buttons.length - 1;
  let nextIndex;

  if (event.key === "Home") nextIndex = 0;
  else if (event.key === "End") nextIndex = lastIndex;
  else if (event.key === "ArrowRight" || event.key === "ArrowDown") nextIndex = (activeIndex + 1) % buttons.length;
  else nextIndex = (activeIndex - 1 + buttons.length) % buttons.length;

  buttons[nextIndex].focus();
  switchStoryTab(nextIndex);
});

document.getElementById("mosaic-more")?.addEventListener("click", () => {
  mosaicExpanded = true;
  renderMosaic();
});

// Enlaces del hero que abren un álbum concreto
document.querySelectorAll("[data-tab]").forEach((link) => {
  link.addEventListener("click", () => switchStoryTab(Number(link.dataset.tab)));
});

switchStoryTab(0);

/* =========================================================
   LIGHTBOX
   ========================================================= */
const lightbox = document.getElementById("lightbox");
const lbImg = document.getElementById("lightbox-img");
const lbCaption = document.getElementById("lightbox-caption");
let lbIndex = 0;

function showLightbox(index) {
  const images = tabsData[currentTab].images;
  lbIndex = (index + images.length) % images.length;
  const image = images[lbIndex];
  lbImg.src = image.src;
  lbImg.alt = image.caption;
  lbCaption.textContent = `${image.caption} — ${lbIndex + 1} / ${images.length}`;
}

document.getElementById("tab-mosaic")?.addEventListener("click", (event) => {
  const shot = event.target.closest(".shot");
  if (!shot || !lightbox) return;
  showLightbox(Number(shot.dataset.index));
  lightbox.showModal();
});

lightbox?.addEventListener("click", (event) => {
  const nav = event.target.closest("[data-lb]");
  if (nav) showLightbox(lbIndex + (nav.dataset.lb === "next" ? 1 : -1));
});

lightbox?.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") showLightbox(lbIndex + 1);
  if (event.key === "ArrowLeft") showLightbox(lbIndex - 1);
});

/* =========================================================
   MODAL DE VIDEOS
   ========================================================= */
const videos = [
  "WhatsApp Video 2026-11-16 at 5.42.16 PM.mp4",
  "WhatsApp Video 2026-11-16 at 5.43.31 PM.mp4",
  "WhatsApp Video 2026-11-16 at 5.43.31 PM (1).mp4",
  "WhatsApp Video 2026-11-16 at 5.43.32 PM.mp4"
];
const videoModal = document.getElementById("video-modal");
const player = document.getElementById("video-player");
const videoList = document.getElementById("video-list");

function playVideo(index) {
  player.src = encodeURI(videos[index]);
  player.play().catch(() => {});
  videoList.querySelectorAll("button").forEach((btn, i) => btn.setAttribute("aria-current", String(i === index)));
}

if (videoModal && player && videoList) {
  videoList.innerHTML = videos
    .map((_, i) => `<button type="button" data-video="${i}">Video ${String(i + 1).padStart(2, "0")}</button>`)
    .join("");

  videoList.addEventListener("click", (event) => {
    const btn = event.target.closest("[data-video]");
    if (btn) playVideo(Number(btn.dataset.video));
  });

  document.querySelectorAll("[data-open-video]").forEach((btn) =>
    btn.addEventListener("click", () => {
      videoModal.showModal();
      playVideo(0);
    })
  );

  videoModal.addEventListener("close", () => player.pause());
}

/* Cerrar modales: botón ✕ o clic en el fondo */
document.querySelectorAll(".modal").forEach((modal) => {
  modal.addEventListener("click", (event) => {
    if (event.target === modal || event.target.closest("[data-close]")) modal.close();
  });
});

/* =========================================================
   TESTIMONIOS (carrusel)
   ========================================================= */
const voices = document.getElementById("voices");
if (voices) {
  const slides = Array.from(voices.querySelectorAll(".voice"));
  const dots = voices.querySelector(".voices__dots");
  let active = 0;
  let timer;

  dots.innerHTML = slides
    .map((_, i) => `<button type="button" role="tab" aria-label="Testimonio ${i + 1}" aria-selected="${i === 0}"></button>`)
    .join("");

  const go = (index) => {
    active = (index + slides.length) % slides.length;
    slides.forEach((s, i) => s.classList.toggle("is-active", i === active));
    dots.querySelectorAll("button").forEach((d, i) => d.setAttribute("aria-selected", String(i === active)));
  };
  const restart = () => {
    clearInterval(timer);
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      timer = setInterval(() => go(active + 1), 7000);
    }
  };

  voices.addEventListener("click", (event) => {
    const ctrl = event.target.closest("[data-voice]");
    if (ctrl) { go(active + (ctrl.dataset.voice === "next" ? 1 : -1)); restart(); }
    const dot = event.target.closest(".voices__dots button");
    if (dot) { go(Array.from(dots.children).indexOf(dot)); restart(); }
  });
  voices.addEventListener("mouseenter", () => clearInterval(timer));
  voices.addEventListener("mouseleave", restart);
  restart();
}

/* =========================================================
   HEADER: estado al hacer scroll, menú móvil, enlace activo
   ========================================================= */
const header = document.getElementById("header");
const onScroll = () => header?.classList.toggle("is-scrolled", window.scrollY > 40);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

const menuToggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav");
const setMenu = (open) => {
  nav.classList.toggle("is-open", open);
  document.body.classList.toggle("menu-open", open);
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
};
menuToggle?.addEventListener("click", () => setMenu(!nav.classList.contains("is-open")));
nav?.addEventListener("click", (event) => { if (event.target.closest("a")) setMenu(false); });
document.addEventListener("keydown", (event) => { if (event.key === "Escape" && nav?.classList.contains("is-open")) setMenu(false); });

const navLinks = Array.from(document.querySelectorAll(".nav a[href^='#']"));
const sections = navLinks.map((a) => document.querySelector(a.getAttribute("href"))).filter(Boolean);

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((a) => {
          if (a.getAttribute("href") === `#${entry.target.id}`) a.setAttribute("aria-current", "page");
          else a.removeAttribute("aria-current");
        });
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sections.forEach((s) => sectionObserver.observe(s));

  /* Aparición suave al hacer scroll */
  const revealObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));
} else {
  document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
}
