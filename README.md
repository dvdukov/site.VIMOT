# Mebel Vimot — тап-линк

Одностраничный переходник (в духе Linktree) для мебельной компании Mebel Vimot:
соцсети, прямой контакт, каталог/портфолио и мини-галерея работ. Обычный статический
сайт — HTML/CSS/JS без сборщиков, открывается прямо в браузере.

## Структура

```
index.html            главная страница
portfolio.html         страница с PDF-каталогом (просмотр без скачивания)
assets/
  logo/                логотип (logo.svg — основной, logo-cyrillic.svg — кириллический вариант)
  fonts/                фирменные шрифты (Playfair Display, Mirra)
  icons/                svg-иконки соцсетей и кнопок
  images/gallery/       фото работ для галереи (kitchen-01.jpg, kitchen-02.jpg, …)
  portfolio/
    portfolio.pdf        актуальный PDF-каталог
css/
  variables.css          цвета, шрифты, @font-face — фирменный стиль в одном месте
  style.css               вёрстка
  animations.css           анимации
js/
  config.js                контент: тексты, ссылки, преимущества — редактируется здесь
  main.js                    рендер страницы и логика (лайтбокс, анимации)
```

## Как поменять контент

Всё редактируется в **`js/config.js`**, вёрстку трогать не нужно:

- **Ссылки/кнопки** — массив `links`. Чтобы поменять адрес VK/Instagram/Telegram/прямого
  контакта — меняете `href`. Чтобы добавить новую кнопку — добавляете объект с `id`,
  `label`, `href`, `icon` (доступные иконки: `vk`, `instagram`, `telegram`, `message`,
  `globe`, `catalog`).
- **Кнопка "Основной сайт"** — сейчас `disabled: true` с бейджем "скоро". Как только сайт
  будет готов — уберите `disabled: true` и `badge`, впишите `href`.
- **Тексты о компании и преимущества** — объект `company`.
- **Галерея** — сейчас 14 фото `assets/images/gallery/kitchen-01.jpg … kitchen-14.jpg`.
  Чтобы добавить/убрать фото: положите файлы с такими же именами по порядку и поменяйте
  `galleryCount` в `config.js`.

## Как обновить каталог (PDF)

Просто замените файл `assets/portfolio/portfolio.pdf` на новый — **с тем же именем**,
ничего больше менять не нужно.

## Как поменять логотип/цвета/шрифты

- Логотип: замените `assets/logo/logo.svg`.
- Цвета: переменные `--color-*` в `css/variables.css`.
- Шрифты: файлы в `assets/fonts/` + правила `@font-face` в начале `css/variables.css`.

## Как проверить локально

Откройте `index.html` в браузере двойным кликом — сайт полностью статический, сервер не
нужен.

## Деплой на GitHub Pages (бесплатно)

1. Создайте пустой публичный репозиторий на [github.com/new](https://github.com/new).
2. В этой папке:
   ```
   git init
   git add .
   git commit -m "Первая версия тап-линка"
   git branch -M main
   git remote add origin <ссылка на ваш репозиторий>
   git push -u origin main
   ```
3. В репозитории: **Settings → Pages → Source: Deploy from branch → main / (root)**.
4. Через 1–2 минуты сайт будет доступен по адресу
   `https://<ваш-username>.github.io/<название-репозитория>/`.
5. Любое следующее обновление — просто `git add . && git commit -m "..." && git push`.
