# Картинки именно из выбранного референса

## Редакция 2 · 28.10.2026 — утверждённые замены и размытие

Этот раздел имеет приоритет перед описанием предыдущей локальной замены ниже.

- Главный экран: предоставленный файл `фото объектов/Три жёлтых погрузчика на стройке.png`, рабочие версии `public/images/hero-three-loaders.webp` и `.jpg`.
- `projects/lenta` и `projects/globus` теперь используют новые файлы `лента.jpg` и `глобус.jpg`. Прежние фото с водяными знаками в этих карточках больше не используются.
- `projects/komsomolskaya-square` использует новый снимок `комсомольская площадь .jpg`, а не прежний рендер. Надпись о визуализации удалена.
- `projects/nizhegorodskie-sorbenty` сохраняет исходный трёхчастный коллаж; CSS `object-fit: contain` показывает весь коллаж, остальные карточки сохраняют `cover`.
- Для фотографий проектов применяется общий мягкий CSS-фильтр `saturate(0.85) contrast(0.98)`. Логотип и элементы интерфейса не перекрашиваются.
- На фотографиях «Глобус», Комсомольская площадь, «Флайг+Хоммель», Яндекс и бассейн выполнена локальная обработка видимых людей и/или автомобильных номеров через встроенный ImageGen. Финальные версии — соответствующие WebP/JPEG в `public/images/projects/`. Выходы ImageGen просмотрены визуально, затем уменьшены до рабочих размеров; оригиналы не редактировались. Обработка генеративная: это обработанные фото, а не неизменённые документальные оригиналы. Абсолютная неизменность всех мелких деталей не заявляется.
- Исходные фотографии и промежуточные выходы ImageGen в Git и `dist` не включаются. Публикуются только рабочие изображения. Подпись предоставления материалов заказчиком не является независимым подтверждением объекта, состава работ или прав.

### Использованные промпты ImageGen

Для «Глобуса»:

> Use case: precise-object-edit. Edit this actual client project photograph for a construction portfolio. Apply a strong, localized, soft-edge privacy blur to ALL visible human figures, including the walking shopper at lower right and the dark figures by the doorway. Also blur any readable vehicle license plate, including vehicles reflected in glass. Keep all building geometry, framing, signage 'Globus', doors, colors, sky and image content outside those small privacy regions identical. Do not remove people, invent scenery or restyle the architecture. Keep the original photograph proportions. No new text, no new objects, no watermark. Return the edited photograph.

Для остальных четырёх изображений общий префикс:

> Use case: precise-object-edit. Asset: an actual client construction-project photo. Apply localized strong soft-edge privacy Gaussian blur.

Индивидуальная часть:

- Комсомольская площадь: `Blur the two pedestrians on the pavement near the bottom left and all vehicle license plates along the parking row. Keep the entire parked cars; blur only plate areas.`
- «Флайг+Хоммель»: `Blur ALL vehicle license plates on every car in the foreground and parking row, especially both white cars at bottom center, the car at bottom left, and cars beside the wall. Blur any visible human figures. Preserve all vehicles and building signage.`
- Яндекс: `Blur ALL vehicle license plates on all vans at left and all cars at right. Preserve the vans, cars, and Yandex branding. Blur any visible people.`
- Бассейн: `Strongly blur ALL human figures, including every swimmer in every lane, foreground people partially in water, and the instructor at the far right. Blur entire human silhouettes softly; do not blur water, floats or pool architecture unnecessarily.`

Общий суффикс:

> Do not remove or invent any object. Keep exact framing, aspect ratio, architecture, signage, original photographic colors and all other image regions unchanged. Do not create a collage or new views. Return one edited photograph matching the original.

## Редакция 2 · 28.10.2026 — утверждённые замены и размытие

Этот раздел имеет приоритет перед описанием предыдущей локальной замены ниже.

- Главный экран: предоставленный файл `фото объектов/Три жёлтых погрузчика на стройке.png`, рабочие версии `public/images/hero-three-loaders.webp` и `.jpg`.
- `projects/lenta` и `projects/globus` теперь используют новые файлы `лента.jpg` и `глобус.jpg`. Прежние фото с водяными знаками в этих карточках больше не используются.
- `projects/komsomolskaya-square` использует новый снимок `комсомольская площадь .jpg`, а не прежний рендер. Надпись о визуализации удалена.
- `projects/nizhegorodskie-sorbenty` сохраняет исходный трёхчастный коллаж; CSS `object-fit: contain` показывает весь коллаж, остальные карточки сохраняют `cover`.
- Для фотографий проектов применяется общий мягкий CSS-фильтр `saturate(0.85) contrast(0.98)`. Логотип и элементы интерфейса не перекрашиваются.
- На фотографиях «Глобус», Комсомольская площадь, «Флайг+Хоммель», Яндекс и бассейн выполнена локальная обработка видимых людей и/или автомобильных номеров через встроенный ImageGen. Финальные версии — соответствующие WebP/JPEG в `public/images/projects/`. Выходы ImageGen просмотрены визуально, затем уменьшены до рабочих размеров; оригиналы не редактировались. Обработка генеративная: это обработанные фото, а не неизменённые документальные оригиналы. Абсолютная неизменность всех мелких деталей не заявляется.
- Исходные фотографии и промежуточные выходы ImageGen в Git и `dist` не включаются. Публикуются только рабочие изображения. Подпись предоставления материалов заказчиком не является независимым подтверждением объекта, состава работ или прав.

### Использованные промпты ImageGen

Для «Глобуса»:

> Use case: precise-object-edit. Edit this actual client project photograph for a construction portfolio. Apply a strong, localized, soft-edge privacy blur to ALL visible human figures, including the walking shopper at lower right and the dark figures by the doorway. Also blur any readable vehicle license plate, including vehicles reflected in glass. Keep all building geometry, framing, signage 'Globus', doors, colors, sky and image content outside those small privacy regions identical. Do not remove people, invent scenery or restyle the architecture. Keep the original photograph proportions. No new text, no new objects, no watermark. Return the edited photograph.

Для остальных четырёх изображений общий префикс:

> Use case: precise-object-edit. Asset: an actual client construction-project photo. Apply localized strong soft-edge privacy Gaussian blur.

Индивидуальная часть:

- Комсомольская площадь: `Blur the two pedestrians on the pavement near the bottom left and all vehicle license plates along the parking row. Keep the entire parked cars; blur only plate areas.`
- «Флайг+Хоммель»: `Blur ALL vehicle license plates on every car in the foreground and parking row, especially both white cars at bottom center, the car at bottom left, and cars beside the wall. Blur any visible human figures. Preserve all vehicles and building signage.`
- Яндекс: `Blur ALL vehicle license plates on all vans at left and all cars at right. Preserve the vans, cars, and Yandex branding. Blur any visible people.`
- Бассейн: `Strongly blur ALL human figures, including every swimmer in every lane, foreground people partially in water, and the instructor at the far right. Blur entire human silhouettes softly; do not blur water, floats or pool architecture unnecessarily.`

Общий суффикс:

> Do not remove or invent any object. Keep exact framing, aspect ratio, architecture, signage, original photographic colors and all other image regions unchanged. Do not create a collage or new views. Return one edited photograph matching the original.

## Обновление фотографий объектов · 28.10.2026

По прямому заданию заказчика 12 условных фонов на странице `/projects/` заменены материалами из локальной папки `фото объектов/`. Это отдельный источник, который не относится к кропам референса, описанным ниже. Другие изображения сайта не изменены.

Рабочие версии находятся в `public/images/projects/`: WebP и резервный JPEG. Сохранены пропорции и весь исходный кадр, без ретуши, удаления водяных знаков и увеличения разрешения; максимальные размеры 1600 × 1200. Метаданные исходников не переносятся. Оригиналы в `фото объектов/` не изменены. При показе фон кадрируется существующим CSS карточек.

| Исходный файл | Имя рабочей версии | Карточка |
|---|---|---|
| `ГАЗ.jpg` | `gaz` | Цеха ГК «ГАЗ» |
| `Флайг+Хоммель.jfif` | `flaig-hommel` | ООО «Флайг+Хоммель» |
| `Нижегородские сорбенты.jfif` | `nizhegorodskie-sorbenty` | ОАО «Нижегородские Сорбенты» |
| `Стора Эсно.jpg` | `stora-enso` | Фабрика «Стора Энсо» |
| `Фабрика мороженого.jfif` | `ice-cream-factory` | Фабрика мороженого |
| `борский стекольный завод.jpg` | `bor-glass-factory` | Стекольный завод, Бор |
| `Сортировочный центр Яндекс город Кстово.jpg` | `yandex-kstovo` | Складской терминал Яндекс |
| `Лента.jpg` | `lenta` | Гипермаркеты «Лента» |
| `Глобус.jpg` | `globus` | Гипермаркет «Глобус» |
| `Комсомольская площадь.jpg` | `komsomolskaya-square` | Офисный и спортивный центр на площади Комсомольской |
| `Арена_ казань.jpg` | `kazan-arena` | Ледовая арена, Казань |
| `реконструкция бассейна.jpg` | `pool-reconstruction` | Бассейн |

Соответствие объектов установлено по названиям предоставленных файлов и имеющимся карточкам; независимая проверка объекта, места съёмки и прав использования не проводилась. Материал Комсомольской площади визуально представляет архитектурную визуализацию и отмечен на сайте. «Нижегородские сорбенты» — коллаж, фабрика мороженого имеет исходное разрешение всего 500 × 240. На «Глобусе» видна подпись автора, на «Ленте» — водяной знак. Упоминание предоставления заказчиком не подтверждает права на публикацию.

Ниже сохранено описание первоначального набора из референса.

Источник: `reference/home-approved.png`, 1122 × 1402 px. Все приложенные активы — прямоугольные кропы из него. Изображения не генерировались заново, не заменялись стоками, не ретушировались и не увеличивались.

Выделено **12 фотографических фрагментов**, **2 логотипа** и **11 иконок**. Для фото и логотипов сохранены PNG и WebP без потерь. Иконки — PNG.

## Главное ограничение

Исходник — одно растровое изображение готовой страницы, а не набор слоёв. Под текстом и интерфейсом нет доступной скрытой фотографии. Поэтому правый фрагмент hero и центральная фотография формы переданы отдельно от видимых надписей интерфейса. Левую часть hero и переходы нужно собрать CSS, а не «восстановить» несуществующий исходник.

Фото имеют то разрешение, которое действительно было в картинке. Их нельзя назвать полноценными исходниками для большого экрана. Для проверки первой вёрстки они пригодны; при дальнейшем расширении изображений качество ограничено этими размерами.

## Фото и логотипы

| ID / имя файла | Размер, px | Что изображено | Применение / ограничение |
|---|---:|---|---|
| `logo-header.png / .webp` | 79 × 57 | Логотип в шапке | Бледный исходный фон сохранён. Не вектор; не делать больше естественного размера. |
| `logo-footer.png / .webp` | 66 × 49 | Логотип в подвале | Исходный светлый фон сохранён. |
| `hero-industrial-right.png / .webp` | 645 × 369 | Стальной каркас промышленного здания | Правая часть первого экрана без интерфейсного текста. Надписи на баннере являются частью картинки. Левая часть закрыта текстом и не восстанавливалась. |
| `service-industrial.png / .webp` | 242 × 88 | Промышленное строительство | Кроп фотографии первой карточки, без подписи. |
| `service-design.png / .webp` | 239 × 88 | Проектирование | Кроп фотографии карточки, без подписи. |
| `service-metal.png / .webp` | 240 × 88 | Металлоконструкции | Кроп фотографии карточки, без подписи. |
| `service-floors.png / .webp` | 240 × 88 | Промышленные и полимерные полы | В референсе одна фотография для объединённой карточки полов. |
| `service-monolith.png / .webp` | 242 × 90 | Монолитные железобетонные работы | Кроп фотографии карточки, без подписи. |
| `service-facades.png / .webp` | 239 × 90 | Устройство фасадов | Кроп фотографии карточки, без подписи. |
| `service-sandwich.png / .webp` | 240 × 90 | Сэндвич-панели | Кроп фотографии карточки, без подписи. |
| `service-equipment.png / .webp` | 240 × 90 | Монтаж оборудования | Кроп фотографии карточки, без подписи. |
| `team-engineers.png / .webp` | 424 × 262 | Два инженера с чертежом | Центр блока формы. Исходные высветления по краям и надписи на одежде сохранены. |
| `direction-individual.png / .webp` | 274 × 114 | Индивидуальное строительство | Левая фотографическая часть карточки. Без заголовка и кнопки; исходное высветление справа сохранено. |
| `direction-apk.png / .webp` | 290 × 114 | Строительство АПК | Левая фотографическая часть карточки. Без заголовка и кнопки; исходное высветление справа сохранено. |

Все эти файлы лежат в `public/images/`. WebP сохранён в lossless-режиме и проверяется на равенство видимых RGB-пикселей PNG.

## Иконки

| Имя | Размер, px | Назначение |
|---|---:|---|
| `icon-hardhat.png` | 56 × 48 | Каска |
| `icon-team.png` | 56 × 48 | Команда |
| `icon-equipment.png` | 49 × 51 | Оборудование |
| `icon-location.png` | 51 × 49 | География |
| `icon-person-circle.png` | 52 × 53 | Индивидуальный подход |
| `icon-gear-circle.png` | 52 × 54 | Технические решения |
| `icon-clock-circle.png` | 52 × 55 | Этапы и сроки |
| `icon-paperclip.png` | 22 × 23 | Прикрепить файл |
| `icon-phone.png` | 27 × 28 | Телефон |
| `icon-mail.png` | 24 × 24 | Почта |
| `icon-arrow-circle.png` | 43 × 45 | Стрелка в круге |

Файлы в `public/icons/`. Светлая подложка кропа сохранена. Это не прозрачные SVG. Не использовать автоматическое вычитание белого фона на фотографиях. Для простых новых пиктограмм интерфейса допустим отдельный SVG, но не называть его точным извлечением.

## Что отсутствует в референсе

Отдельной фотографии гидроизоляции нет. Отдельного фото полимерного покрытия нет — в главной объединённая карточка полов. Нет высокоразмерных hero для АПК/частного строительства, фотографий реальных проектов, команды с именами, векторного логотипа и исходного шрифта.

Гидроизоляция в каталоге и на детальной странице оформляется текстом. Для двух видов полов допустимо повторно использовать единое фото как иллюстрацию, не заявляя по нему конкретный материал.

## Контрольные изображения

`reference/section-*.png` — семь исходных секций целиком с текстом и элементами интерфейса. Их назначение — визуальная сверка, не ресурсы работающей страницы. `home-approved.png` — полная исходная главная. `assets-contact-sheet.jpg` — обзор всех фото и логотипов.

## Прозрачность происхождения

Координаты каждого прямоугольника: `docs/assets-manifest.json`. Формат координат: `[left, top, right, bottom]`; правая и нижняя границы не включаются. Размер исходника: 1122 × 1402. В manifest указаны источник, размер, статус наличия интерфейсного текста и SHA-256 PNG фото/логотипов.

Инструменты `scripts/verify-kit.py` и `scripts/extract-assets.py` позволяют проверить равенство кропов исходнику и повторить извлечение. Для этих необязательных инструментов нужен Python и Pillow; для разработки сайта они не требуются.

## Правила использования в вёрстке

1. Фото hero — справа, не полноэкранный фон с дублированным заголовком. Текстовый блок слева — HTML и CSS.
2. Карточки услуг сохраняют широкое соотношение сторон около 2.7:1.
3. Фото команды находится в центре общей панели; форма и преимущества — отдельные слои HTML.
4. Фото направлений применяются компактно. Не разворачивать 274 × 114 px в баннер на 1920 px.
5. Пути картинок проходят через helper, учитывающий base GitHub Pages.
6. Не перекрашивать, не заменять и не дорисовывать изображения без отдельного согласования.
