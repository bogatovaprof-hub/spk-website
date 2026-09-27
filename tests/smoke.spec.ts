import { expect, test, type Page } from '@playwright/test';
import fs from 'node:fs/promises';
import path from 'node:path';

const routes = [
  '/',
  '/services/',
  '/services/promyshlennoe-stroitelstvo/',
  '/services/proektirovanie/',
  '/services/metallokonstruktsii/',
  '/services/promyshlennye-poly/',
  '/services/polimernye-poly/',
  '/services/monolitnye-raboty/',
  '/services/fasady/',
  '/services/sendvich-paneli/',
  '/services/montazh-oborudovaniya/',
  '/services/gidroizolyatsiya/',
  '/individualnoe-stroitelstvo/',
  '/apk/',
  '/about/',
  '/projects/',
  '/faq/',
  '/contacts/',
  '/request/',
  '/privacy/',
  '/sitemap/',
  '/404.html'
];

const expectNoHorizontalOverflow = async (page: Page) => {
  const widths = await page.evaluate(() => ({
    document: document.documentElement.scrollWidth,
    viewport: window.innerWidth
  }));
  expect(widths.document).toBeLessThanOrEqual(widths.viewport + 1);
};

test('все маршруты открываются, имеют один H1, noindex и целые изображения', async ({ page }) => {
  const pageErrors: string[] = [];
  const failedRequests: string[] = [];
  page.on('pageerror', (error) => pageErrors.push(error.message));
  page.on('requestfailed', (request) => {
    const hostname = new URL(request.url()).hostname;
    if (hostname === '127.0.0.1' || hostname === 'localhost') {
      failedRequests.push(`${request.method()} ${request.url()}`);
    }
  });

  for (const route of routes) {
    const response = await page.goto(route, { waitUntil: 'networkidle' });
    if (route === '/404.html') expect(response?.status(), route).toBe(404);
    else expect(response?.ok(), route).toBeTruthy();
    await expect(page.locator('html')).toHaveAttribute('lang', 'ru');
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
    await expect(page.locator('main h1')).toHaveCount(1);
    await expectNoHorizontalOverflow(page);
    const brokenImages = await page.locator('img').evaluateAll((images) =>
      images.filter((image) => !(image instanceof HTMLImageElement) || image.naturalWidth === 0).map((image) => image.getAttribute('src'))
    );
    expect(brokenImages, route).toEqual([]);
  }

  expect(pageErrors).toEqual([]);
  expect(failedRequests).toEqual([]);
});

test('контрольные ширины не дают горизонтального переполнения', async ({ page }) => {
  const viewports = [
    { width: 360, height: 800 },
    { width: 390, height: 844 },
    { width: 768, height: 1024 },
    { width: 1122, height: 900 },
    { width: 1440, height: 1000 }
  ];
  const sampleRoutes = ['/', '/services/', '/services/promyshlennoe-stroitelstvo/', '/services/promyshlennye-poly/', '/faq/', '/contacts/', '/individualnoe-stroitelstvo/', '/apk/', '/request/'];

  for (const viewport of viewports) {
    await page.setViewportSize(viewport);
    for (const route of sampleRoutes) {
      await page.goto(route, { waitUntil: 'domcontentloaded' });
      await expectNoHorizontalOverflow(page);
    }
  }
});

test('мобильное меню доступно с клавиатуры и закрывается Escape', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const toggle = page.locator('.menu-toggle');
  await toggle.focus();
  await page.keyboard.press('Enter');
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('#mobile-navigation')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(toggle).toBeFocused();
});

test('диалог возвращает фокус и демонстрационная форма ничего не отправляет', async ({ page }) => {
  const nonGetRequests: string[] = [];
  page.on('request', (request) => {
    if (request.method() !== 'GET') nonGetRequests.push(`${request.method()} ${request.url()}`);
  });
  await page.goto('/');
  const opener = page.getByRole('button', { name: 'Обсудить задачу' }).first();
  await opener.click();
  const dialog = page.locator('[data-consultation-dialog]');
  await expect(dialog).toBeVisible();
  await expect(dialog.locator('input[name="name"]')).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await expect(opener).toBeFocused();

  await opener.click();
  await dialog.getByRole('button', { name: 'Заказать звонок' }).click();
  await expect(dialog.locator('[data-error-for="name"]')).toHaveText('Укажите имя.');
  await expect(dialog.locator('[data-error-for="phone"]')).toHaveText('Укажите телефон для связи.');
  await dialog.locator('input[name="name"]').fill('Ксения');
  await dialog.locator('input[name="phone"]').fill('+7 900 000-00-00');
  await dialog.getByRole('button', { name: 'Заказать звонок' }).click();
  await expect(dialog.locator('.form-status')).toHaveText('Проверка выполнена. Это прототип: заявка и файлы не отправлены.');
  expect(nonGetRequests).toEqual([]);
});

test('полная форма проверяет e-mail и тип файла, сохраняя введённые данные', async ({ page }) => {
  await page.goto('/request/');
  const form = page.locator('[data-demo-form]').first();
  await form.locator('input[name="name"]').fill('Ксения');
  await form.locator('input[name="phone"]').fill('+7 900 000-00-00');
  await form.locator('input[name="email"]').fill('ошибка');
  await form.locator('input[type="file"]').setInputFiles({
    name: 'опасный.exe',
    mimeType: 'application/octet-stream',
    buffer: Buffer.from('demo')
  });
  await form.getByRole('button', { name: 'Отправить проект на расчет' }).click();
  await expect(form.locator('[data-error-for="email"]')).toHaveText('Проверьте адрес электронной почты.');
  await expect(form.locator('[data-file-error]')).toHaveText('Этот формат файла не поддерживается в прототипе.');
  await expect(form.locator('input[name="name"]')).toHaveValue('Ксения');

  await form.locator('input[name="email"]').fill('test@example.com');
  await form.locator('input[type="file"]').setInputFiles({
    name: 'техническое-задание.pdf',
    mimeType: 'application/pdf',
    buffer: Buffer.from('demo')
  });
  await form.getByRole('button', { name: 'Отправить проект на расчет' }).click();
  await expect(form.locator('.form-status')).toHaveText('Проверка выполнена. Это прототип: заявка и файлы не отправлены.');
  await expect(form.locator('.file-list li')).toHaveCount(1);
  await form.getByRole('button', { name: /Удалить файл техническое-задание\.pdf/ }).click();
  await expect(form.locator('.file-list li')).toHaveCount(0);
});

test('FAQ раскрывается, а ссылки не используют заглушки', async ({ page }) => {
  await page.goto('/faq/');
  const second = page.locator('.faq-item').nth(1);
  await second.locator('summary').focus();
  await page.keyboard.press('Enter');
  await expect(second).toHaveAttribute('open', '');
  await page.goto('/');
  const badLinks = await page.locator('a').evaluateAll((links) => links
    .map((link) => link.getAttribute('href') || '')
    .filter((href) => href === '#' || href.startsWith('javascript:'))
  );
  expect(badLinks).toEqual([]);
});

test('клиентские правки услуг, FAQ и контактов отражены в интерфейсе', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#services-title')).toHaveText('Наши услуги');
  await expect(page.locator('.services-section .service-card')).toHaveCount(8);

  await page.goto('/services/promyshlennye-poly/');
  await expect(page.getByText('Связанная услуга', { exact: true })).toHaveCount(0);

  await page.goto('/services/sendvich-paneli/');
  await expect(page.getByRole('heading', { name: 'Комплексный подход', exact: true })).toHaveCount(0);

  await page.goto('/services/montazh-oborudovaniya/');
  const serviceLayout = await page.locator('.service-detail-flow').evaluate((flow) => {
    const lastCard = flow.lastElementChild?.getBoundingClientRect();
    const flowBox = flow.getBoundingClientRect();
    return lastCard ? { flowWidth: flowBox.width, cardWidth: lastCard.width } : null;
  });
  expect(serviceLayout).not.toBeNull();
  expect(Math.abs(serviceLayout!.flowWidth - serviceLayout!.cardWidth)).toBeLessThanOrEqual(1);

  await page.goto('/faq/');
  const faqColumns = await page.locator('.faq-list').evaluate((element) => getComputedStyle(element).gridTemplateColumns.split(' ').length);
  expect(faqColumns).toBe(1);

  await page.goto('/contacts/');
  await expect(page.getByText('Нижний Новгород, Кремль', { exact: true }).first()).toBeVisible();
  await expect(page.locator('.map-card iframe')).toHaveAttribute('src', /yandex\.ru\/map-widget/);
  await expect(page.getByRole('link', { name: /Построить маршрут/ })).toHaveAttribute('href', /yandex\.ru\/maps/);
});

test('основные контейнеры внутренних страниц выровнены по общей сетке', async ({ page }) => {
  const cases = [
    '/services/promyshlennoe-stroitelstvo/',
    '/services/proektirovanie/',
    '/services/metallokonstruktsii/',
    '/services/promyshlennye-poly/',
    '/services/polimernye-poly/',
    '/services/monolitnye-raboty/',
    '/services/fasady/',
    '/services/sendvich-paneli/',
    '/services/montazh-oborudovaniya/',
    '/services/gidroizolyatsiya/',
    '/faq/',
    '/contacts/'
  ];

  for (const width of [360, 390, 768, 1122, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of cases) {
      await page.goto(route, { waitUntil: 'domcontentloaded' });
      const bounds = await page.locator('main').evaluate((main) => {
        const hero = main.querySelector('.inner-hero > .container')?.getBoundingClientRect();
        const containers = [...main.querySelectorAll(':scope > .container')].map((element) => element.getBoundingClientRect());
        return hero ? { hero: { left: hero.left, right: hero.right }, containers: containers.map(({ left, right }) => ({ left, right })) } : null;
      });
      expect(bounds, route).not.toBeNull();
      for (const box of bounds?.containers ?? []) {
        expect(Math.abs(box.left - bounds!.hero.left), `${route} @ ${width}px: left`).toBeLessThanOrEqual(1);
        expect(Math.abs(box.right - bounds!.hero.right), `${route} @ ${width}px: right`).toBeLessThanOrEqual(1);
      }
    }
  }
});

test('сохраняются контрольные снимки', async ({ page }) => {
  const outputDir = path.resolve('qa/screenshots');
  await fs.mkdir(outputDir, { recursive: true });
  const captures = [
    { route: '/', width: 1122, height: 900, name: 'home-1122.png' },
    { route: '/', width: 1440, height: 1000, name: 'home-1440.png' },
    { route: '/', width: 390, height: 844, name: 'home-390.png' },
    { route: '/', width: 360, height: 800, name: 'home-360.png' },
    { route: '/services/', width: 1440, height: 1000, name: 'services-1440.png' },
    { route: '/services/promyshlennye-poly/', width: 390, height: 844, name: 'service-detail-390.png' },
    { route: '/services/montazh-oborudovaniya/', width: 1440, height: 1000, name: 'service-equipment-1440.png' },
    { route: '/faq/', width: 1440, height: 1000, name: 'faq-1440.png' },
    { route: '/contacts/', width: 1440, height: 1000, name: 'contacts-1440.png' },
    { route: '/projects/', width: 1440, height: 1000, name: 'projects-1440.png' },
    { route: '/individualnoe-stroitelstvo/', width: 1440, height: 1000, name: 'individual-1440.png' },
    { route: '/apk/', width: 1440, height: 1000, name: 'apk-1440.png' }
  ];

  for (const capture of captures) {
    await page.setViewportSize({ width: capture.width, height: capture.height });
    await page.goto(capture.route, { waitUntil: 'networkidle' });
    await page.screenshot({ path: path.join(outputDir, capture.name), fullPage: true });
  }

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/request/');
  const form = page.locator('[data-demo-form]').first();
  await form.getByRole('button', { name: 'Отправить проект на расчет' }).click();
  await page.screenshot({ path: path.join(outputDir, 'form-errors-390.png'), fullPage: true });
  await page.goto('/');
  await page.locator('.menu-toggle').click();
  await page.screenshot({ path: path.join(outputDir, 'mobile-menu-390.png'), fullPage: true });
});
