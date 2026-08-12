/**
 * Рендер тап-линка из CONFIG (js/config.js) + анимации появления + лайтбокс галереи.
 */
const ICONS = {
  vk: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8.5C4.3 13.8 7 17 11.6 17h.6v-3.3c1.7.17 3 1.44 3.55 3.3H18c-.35-2.1-1.85-3.87-3.24-4.55C15.99 11.65 17.2 10.1 17.5 8.5h-2.42c-.4 1.75-1.9 3.35-3.32 3.5V8.5H9.16v6.06C7.72 14.2 6.6 12.44 6.42 8.5H4z"/></svg>',
  instagram:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3.75" y="3.75" width="16.5" height="16.5" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="16.6" cy="7.4" r="1" fill="currentColor" stroke="none"/></svg>',
  telegram:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20.4 4.2 3.6 10.9c-.9.35-.9 1.63.02 1.96l4.1 1.47 1.6 5.1c.2.63 1 .8 1.44.3l2.3-2.6 4.3 3.15c.66.48 1.6.12 1.77-.68l2.9-13.7c.2-.9-.7-1.63-1.63-1.24Z"/><path d="M8.5 14.5 17 8"/></svg>',
  message:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5.5h16a1 1 0 0 1 1 1V16a1 1 0 0 1-1 1H8l-4 3.5V17H4a1 1 0 0 1-1-1V6.5a1 1 0 0 1 1-1Z"/><path d="M7 9.5h10M7 13h6"/></svg>',
  globe:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8.25"/><path d="M3.75 12h16.5M12 3.75c2.6 2.3 4 5.2 4 8.25s-1.4 5.95-4 8.25c-2.6-2.3-4-5.2-4-8.25s1.4-5.95 4-8.25Z"/></svg>',
  catalog:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3.75h9.25L19 7.5V19a1.25 1.25 0 0 1-1.25 1.25H6A1.25 1.25 0 0 1 4.75 19V5A1.25 1.25 0 0 1 6 3.75Z"/><path d="M14.5 3.75V7.5H19"/><path d="M8 12h8M8 15.25h8"/></svg>',
  check:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5 9.5 17 19 7"/></svg>',
  close:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M5 5l14 14M19 5 5 19"/></svg>',
  chevron:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 5.5 8 12l6.5 6.5"/></svg>',
};

function renderAbout() {
  const textEl = document.querySelector("[data-about-text]");
  const listEl = document.querySelector("[data-about-list]");
  if (textEl) textEl.textContent = CONFIG.company.about;
  if (listEl) {
    listEl.innerHTML = CONFIG.company.advantages
      .map(
        (item) =>
          `<li class="about__item reveal">${ICONS.check}<span>${item}</span></li>`
      )
      .join("");
  }
}

function renderLinks() {
  const nav = document.querySelector("[data-links]");
  if (!nav) return;

  nav.innerHTML = CONFIG.links
    .map((link) => {
      const icon = ICONS[link.icon] || "";
      const badge = link.badge
        ? `<span class="link-btn__badge">${link.badge}</span>`
        : "";
      const classes = ["link-btn", "reveal"];
      if (link.disabled) classes.push("link-btn--disabled");

      const content = `
        <span class="link-btn__icon">${icon}</span>
        <span class="link-btn__label">${link.label}</span>
        ${badge}
      `;

      if (link.disabled || !link.href) {
        return `<span class="${classes.join(
          " "
        )}" aria-disabled="true">${content}</span>`;
      }

      const isExternal = /^https?:\/\//.test(link.href);
      const attrs = isExternal
        ? 'target="_blank" rel="noopener noreferrer"'
        : "";
      return `<a class="${classes.join(" ")}" href="${
        link.href
      }" ${attrs}>${content}</a>`;
    })
    .join("");
}

function renderGallery() {
  const titleEl = document.querySelector("[data-gallery-title]");
  const grid = document.querySelector("[data-gallery-grid]");
  if (titleEl) titleEl.textContent = CONFIG.galleryTitle;
  if (!grid) return;

  const photos = Array.from({ length: CONFIG.galleryCount }, (_, i) =>
    CONFIG.galleryPath(i + 1)
  );

  grid.innerHTML = photos
    .map(
      (src, i) => `
      <button type="button" class="gallery__item reveal" data-index="${i}">
        <img src="${src}" alt="Работа Mebel Vimot ${i + 1}" loading="lazy">
      </button>`
    )
    .join("");

  setupLightbox(photos);
}

function setupLightbox(photos) {
  const lightbox = document.querySelector("[data-lightbox]");
  const imgEl = lightbox?.querySelector("img");
  if (!lightbox || !imgEl) return;

  let current = 0;

  const open = (index) => {
    current = index;
    imgEl.src = photos[current];
    lightbox.classList.add("is-open");
    document.body.style.overflow = "hidden";
  };

  const close = () => {
    lightbox.classList.remove("is-open");
    document.body.style.overflow = "";
  };

  const step = (delta) => {
    current = (current + delta + photos.length) % photos.length;
    imgEl.src = photos[current];
  };

  document.querySelectorAll(".gallery__item").forEach((btn) => {
    btn.addEventListener("click", () => open(Number(btn.dataset.index)));
  });

  lightbox
    .querySelector("[data-lightbox-close]")
    ?.addEventListener("click", close);
  lightbox
    .querySelector("[data-lightbox-prev]")
    ?.addEventListener("click", () => step(-1));
  lightbox
    .querySelector("[data-lightbox-next]")
    ?.addEventListener("click", () => step(1));

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) close();
  });

  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("is-open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") step(-1);
    if (e.key === "ArrowRight") step(1);
  });
}

function setupRevealAnimation() {
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  items.forEach((el, i) => {
    el.style.animationDelay = `${Math.min(i * 45, 400)}ms`;
    observer.observe(el);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderAbout();
  renderLinks();
  renderGallery();
  setupRevealAnimation();
});
