/**
 * Единственное место для правки контента тап-линка.
 * Меняете тексты/ссылки здесь — вёрстку трогать не нужно.
 */
const CONFIG = {
  company: {
    name: "Mebel Vimot",
    slogan: "создаём уют, которому доверяют",
    about:
      "Производим кухни и корпусную мебель на заказ — от замера и проекта до сборки под ключ.",
    advantages: [
      "Более 20 лет на рынке",
      "Более 10 000 реализованных проектов",
      "Гарантия 2+ года, срок службы 15+ лет",
      "Собственное производство в Зеленограде — лучшая цена/качество",
      "Помогаем сэкономить на кухне без потери качества",
    ],
  },

  links: [
    {
      id: "vk",
      label: "VK",
      href: "https://vk.com/mebelvimot",
      icon: "vk",
    },
    {
      id: "instagram",
      label: "Instagram",
      href: "https://www.instagram.com/mebel_vimot",
      icon: "instagram",
    },
    {
      id: "telegram",
      label: "Telegram-канал",
      href: "https://t.me/MebelVimot",
      icon: "telegram",
    },
    {
      id: "contact",
      label: "Написать напрямую",
      href: "https://t.me/nataliss27",
      icon: "message",
    },
    {
      id: "site",
      label: "Основной сайт",
      href: null,
      icon: "globe",
      disabled: true,
      badge: "скоро",
    },
    {
      id: "portfolio",
      label: "Каталог и портфолио",
      href: "assets/portfolio/portfolio.pdf",
      icon: "catalog",
      newTab: true,
    },
  ],

  galleryTitle: "Наши работы",
  galleryCount: 31,
  galleryPath: (n) =>
    `assets/images/gallery/kitchen-${String(n).padStart(2, "0")}.jpg`,
};
