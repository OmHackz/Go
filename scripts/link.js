import { readFileSync, writeFileSync, renameSync } from 'node:fs';
import { newId, validate } from './registry.js';

try {
  const [target, alias, ...extra] = process.argv.slice(2);
  if (!target || extra.length) throw new Error('Usage: npm run link -- <destination-url> [id]');
  const file = new URL('../links.json', import.meta.url);
  const links = JSON.parse(readFileSync(file, 'utf8'));
  const id = alias ?? newId(links);
  if (Object.hasOwn(links, id)) throw new Error(`ID already exists: ${id}`);
  const updated = { ...links, [id]: target };
  validate(updated);
  const tmp = new URL(`../links.${process.pid}.tmp`, import.meta.url);
  writeFileSync(tmp, JSON.stringify(updated, null, 2) + '\n');
  renameSync(tmp, file);
  console.log(`https://go.omhackz.top/${id}`);
} catch (err) {
  console.error(err.message);
  process.exitCode = 1;
}
