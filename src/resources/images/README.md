# CSS images

Сюда добавляем изображения, которые используются в CSS.

Предпочтения:

- Изображения слайдеров **не добавляем** в эту папку. Они должны быть в папке `public/images`.
- Не повторяющиеся фоны лучше добавлять в `public/images` и делать через `<img>`.
- Используем `image-set` для webp формата и указываем фоллбек на jpg/png:
  ```css
  .background {
    background-image: url('image.jpg');
    background-image: image-set(
      url('image.webp') type('image/webp'),
      url('image.jpg') type('image/jpeg')
    );
  }
  ```
