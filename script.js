function switchStoryTab(index) {
  const tabsData = [
    {
      title: "Capítulo IV: La Ruta del Valle Sagrado",
      meta: "Octubre 2025 • 42 participantes",
      quote:
        "«Este capítulo reúne 184 fotos y 12 notas de voz. El tema más recurrente fue la complicidad del grupo en la última fogata antes de volver a la ciudad.»",
      images: [
        {
          src: "WhatsApp Image 2026-11-10 at 1.23.10 PM.jpeg",
          caption: '"El atardecer en el mirador"',
          alt: "Atardecer en el mirador",
          rotate: "polaroid-mini--rotate-l"
        },
        {
          src: "WhatsApp Image 2026-11-10 at 1.21.05 PM (1).jpeg",
          caption: '"Noche de anécdotas y risas"',
          alt: "Noche de anécdotas",
          rotate: "polaroid-mini--rotate-r"
        }
      ]
    },
    {
      title: "Capítulo II: Pasillos y Risas Compartidas",
      meta: "Marzo - Diciembre 2025 • Salón Principal",
      quote:
        "«Reconocimiento de 42 rostros constantes en las clases de arte, exámenes en equipo y las tardes de estudio en la biblioteca escolar.»",
      images: [
        {
          src: "foto 2.jpg",
          caption: '"Recreo en el patio central"',
          alt: "Recreo en el patio",
          rotate: "polaroid-mini--rotate-l"
        },
        {
          src: "foto 5 .jpg",
          caption: '"Juntos en el salón"',
          alt: "Juntos en el salón",
          rotate: "polaroid-mini--rotate-r"
        }
      ]
    },
    {
      title: "Capítulo VI: La Noche de las Togas",
      meta: "Diciembre 2026 • Auditorio Central",
      quote:
        "«El momento culminante: 120 familias conectadas viendo el lanzamiento de birretes y las palabras de despedida del profesor tutor.»",
      images: [
        {
          src: "foto 3 .jpg",
          caption: '"Fiesta y danzas"',
          alt: "Fiesta y danzas",
          rotate: "polaroid-mini--rotate-l"
        },
        {
          src: "foto 8 .jpg",
          caption: '"Todos juntos en el museo"',
          alt: "Todos juntos en el museo",
          rotate: "polaroid-mini--rotate-r"
        }
      ]
    }
  ];

  const tabTitle = document.getElementById("tab-title");
  const tabMeta = document.getElementById("tab-meta");
  const tabQuote = document.getElementById("tab-quote");
  const mosaic = document.getElementById("tab-mosaic");
  const container = document.getElementById("category-tabs");

  if (!tabTitle || !tabMeta || !tabQuote || !mosaic || !container) return;

  const data = tabsData[index];

  // Textos
  tabTitle.textContent = data.title;
  tabMeta.textContent = data.meta;
  tabQuote.textContent = data.quote;

  // Reconstruir mosaico con las imágenes del tab activo
  mosaic.innerHTML = data.images
    .map(
      (img) => `
        <div class="polaroid-mini ${img.rotate}">
          <div class="polaroid-mini__img">
            <img alt="${img.alt}" src="${img.src}">
          </div>
          <p>${img.caption}</p>
        </div>
      `
    )
    .join("");

  // Reiniciar animación de deslizamiento (forzar reflow)
  mosaic.classList.remove("panel__mosaic--slide");
  void mosaic.offsetWidth; // fuerza reflow para reiniciar animación
  mosaic.classList.add("panel__mosaic--slide");

  // Animar título/meta/quote
  [tabTitle, tabMeta, tabQuote].forEach((el) => {
    el.classList.remove("animate-fade-slide");
    void el.offsetWidth;
    el.classList.add("animate-fade-slide");
  });

  // Estado activo de los botones
  const buttons = container.querySelectorAll("button");
  buttons.forEach((btn, idx) => {
    if (idx === index) {
      btn.className =
        "tab tab--active flex items-center justify-between p-3.5 rounded-xl bg-surface text-primary font-title-md text-title-md shadow-sm transition-all border-l-4 border-secondary text-left";
    } else {
      btn.className =
        "tab flex items-center justify-between p-3.5 rounded-xl bg-surface/50 text-on-surface-variant font-title-md text-title-md hover:bg-surface transition-all text-left";
    }
  });
}