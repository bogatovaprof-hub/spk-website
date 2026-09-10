import { defineConfig } from 'astro/config';

const normalizeBase = (value) => {
  if (!value || value === '/') return '/';
  return `/${value.replace(/^\/+|\/+$/g, '')}`;
};

export default defineConfig({
  output: 'static',
  site: process.env.SITE_ORIGIN || 'http://localhost:4321',
  base: normalizeBase(process.env.SITE_BASE || '/'),
  trailingSlash: 'always',
  build: {
    format: 'directory'
  }
});

