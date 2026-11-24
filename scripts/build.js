import { mkdirSync, copyFileSync, writeFileSync, readFileSync } from 'node:fs';
import { validate } from './registry.js';

const links = JSON.parse(readFileSync('links.json', 'utf8'));
validate(links);
const out = '.vercel/output';
mkdirSync(`${out}/static`, { recursive: true });
for (const page of ['index', '404'])
  copyFileSync(`public/${page}.html`, `${out}/static/${page}.html`);
writeFileSync(`${out}/config.json`, JSON.stringify({
  version: 3,
  routes: [
    ...Object.entries(links).map(([id, target]) => ({
      src: `^/${id}/?$`, status: 302, headers: { Location: new URL(target).href, 'Cache-Control': 'no-store' }
    })),
    { src: '^/$', dest: '/index.html' },
    { src: '^/.*$', dest: '/404.html', status: 404 }
  ]
}, null, 2));
console.log(`Built ${Object.keys(links).length} shortcut(s).`);
