const base = import.meta.env.BASE_URL === '/' ? '' : import.meta.env.BASE_URL.replace(/\/$/, '');

export function withBase(path: string): string {
  if (/^(?:https?:|mailto:|tel:|#)/.test(path)) return path;
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${base}${normalized}` || '/';
}

export function imageUrl(name: string, extension = 'webp'): string {
  return withBase(`/images/${name}.${extension}`);
}

export function iconUrl(name: string): string {
  return withBase(`/icons/${name}.png`);
}

