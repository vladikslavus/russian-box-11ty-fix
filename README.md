# Сборка

## Копирование шаблона и первый запуск

```bash
npx degit upline-studio/11ty-template NAME_OF_YOUR_PROJECT
cd NAME_OF_YOUR_PROJECT
npm i
npm run build:sprite
npm run start
```

Запуск:

```bash
npm start
```

Сборка в продакшн:

```bash
npm run build
```

## Работа с SVG-иконками

Иконки лежат в подпапках папки `src/resources/icons/`.
Для добавления новой иконки, нужно положить её в одну из подпапок и запустить сборку спрайта:

```bash
npm run build:sprite
```

На каждую из подпапок команда генерирует свой спрайт. Использовать спрайт в коде можно через макрос svg:

```njk
{% import "sprite.njk" as sprite %}
{{ sprite.svg('main', 'user', 200, 200) }}
```

Тут:

- main &mdash; название папки,
- user &mdash; название иконки;
- 200, 200 &mdash; ширина и высота.

## Данные для шаблонов

Данные для шаблонов лежат в папке `src/views/data/`.

Данные из этих файлов потом можно использовать в шаблоне pages через переменную `НАЗВАНИЕ_ФАЙЛА.НАЗВАНИЕ_ПЕРЕМЕННОЙ`.

Файлы с данными описываем в TypeScript-ом. В каждом файле должны быть описаны типы данных, которые он содержит.
У каждой экспортируемой переменной должен быть тип:

```ts
type NameOfType = {
  someProperties: string
  // ...
};

export const nameOfVariable: NameOfType = {
  // ...
};
```

## Работа с каруселью

```njk
{% import "carousel.njk" as carousel %}

{% call carousel.swiper() %}
    {% for slide in collection.imageSlides %}
      {{ carousel.imageSlide(slide.name, slide.image, slide.url) }}
    {% endfor %}
{% endcall %}
```

Макрос `carousel.swiper()` позволяет создать карусель с помощью библиотеки `Swiper`. Макрос принимает
необязательный параметр `name` для установки имени карусели. Если `name` не задан, по умолчанию используется `default`.
По имени карусели применяются опции свайпера которые описаны в переменной `SWIPER_OPTIONS` в файле
`src/resources/js/carousel.ts`

### Структура макроса.

`carousel.swiper` — основной контейнер карусели. Этот макрос создает слайдер `Swiper`, включая навигационные кнопки и
пагинацию.

`carousel.imageSlide` — вспомогательный макрос для добавления отдельных слайдов в карусель.

### Работа с `thumbsSwiper`

Макрос `carousel.thumbsSwiper` позволяет создавать галерею слайдов с миниатюрами. Галерея состоит из двух каруселей: основной и миниатюрной.

#### Пример использования

```njk
{{ carousel.thumbsSwiper(collection.imageSlides, collection.imageSlides) }}
```

Для отображения слайдов используется `thumbSlide(image)` — вспомогательный макрос, который создаёт отдельный слайд для миниатюрной или основной карусели.
Если у вас слайды основной карусели отличаются от слайдов галереи, то вы можете создать отдельный макрос например `mainThumbSlide` и использовать его внутри основной карусели, для этого нужно отредактировать макрос `thumbsSwiper`

#### Параметры

- `mainSlides` — массив слайдов для основной карусели.
- `gallerySlides` — массив слайдов для миниатюрной карусели.

## Работа с полями формы

Макрос `forms.fields` предназначен для создания формы с динамическим выводом полей. Он упрощает построение форм с
различными типами полей, позволяет задать их состояние и отображать сообщения валидации.

### Пример использования

Сначала создайте массив полей, где каждому полю соответствуют его параметры, такие как тип, имя поля, значение и
атрибуты.

```ts
type Field = {
  type: 'text' | 'number' | 'email' | 'password'
  label: string
  value?: string | number
  state?: 'invalid' | 'success'
  message?: string
  attrs?: Record<string, string>
};

export const registration: Field[] = [
  {
    type: 'text',
    label: 'Name',
    value: 'test name',
  },
  {
    type: 'email',
    label: 'Email',
    state: 'success',
    value: 'test@test.test',
    message: 'success message',
  }
];
```

Используйте макрос `forms.fields`

```njk
{% import "forms.njk" as forms %}

{{ forms.fields(form.registration) }}
```

## Числа с разделителем

Если необходимо, что бы число отображалось с пробелами в виде разделителя тысячных, то используй следующую запись:

```html
{{ 1234567890.100000 | numberFormat }} руб
```

## Использование макроса карточки товара

Макрос `card.product` используется для создания карточек товара с HTML-разметкой. Макрос позволяет удобно отображать данные о товаре, такие как изображение, название и цена, в формате, готовом для рендеринга на странице.

### Пример шаблона с использованием макроса

```njk
{% import "card.njk" as card %}

<ul>
  {% for product in collection.products %}
    <li>
      {{ card.product(product.url, product.image, product.title, product.price) }}
    </li>
  {% endfor %}
</ul>
```

### Параметры макроса

- `url` (string): Ссылка на страницу товара.
- `img` (string): URL изображения товара. Рекомендуется использовать изображения, оптимизированные для веба.
- `title` (string): Название товара.
- `price` (number): Цена товара. Форматирование производится с помощью фильтра `numberFormat`.
