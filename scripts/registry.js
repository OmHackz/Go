import { randomInt } from 'node:crypto';

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
export const validId = id => /^[a-zA-Z0-9][a-zA-Z0-9_-]{0,63}$/.test(id);

export function validate(links) {
  if (!links || typeof links !== 'object' || Array.isArray(links))
    throw new Error('links.json must contain an object mapping IDs to URLs.');
  for (const [id, target] of Object.entries(links)) {
    if (!validId(id)) throw new Error(`Invalid ID: ${id}`);
    const url = new URL(target);
    if (typeof target !== 'string' || !/^https?:\/\//i.test(target) || !['http:', 'https:'].includes(url.protocol) || /[\s\\]/.test(target))
      throw new Error(`Expected an absolute HTTP(S) URL for ${id}`);
  }
}

export function newId(links) {
  let id;
  do {
    id = Array.from({ length: 6 }, () => alphabet[randomInt(alphabet.length)]).join('');
  } while (Object.hasOwn(links, id));
  return id;
}
