# OmHackz Go

A lightweight redirect service for `go.omhackz.top`. Named shortcuts and generated codes share a case-sensitive namespace. Vercel serves redirects directly from its routing layer; no database or runtime dependencies are needed.

## Manage shortcuts

Use Node.js 20 or newer. From the project root:

```sh
npm run link -- https://example.com/my-project my-project
npm run link -- https://example.com/another-project
```

The first command creates `/my-project`. The second picks an unused six-character uppercase alphanumeric code and prints the short URL. Custom IDs accept up to 64 letters, numbers, underscores, or hyphens and must start with a letter or number.

Shortcuts are stored in `links.json`. Edit a destination there to retarget a link, or remove the entry to retire it. Build and redeploy after changes. Redirects use HTTP 302 with `Cache-Control: no-store` so destinations can change.

## Deploy

1. Run `npm run build` to validate the registry and generate `.vercel/output`.
2. Import this directory's repository into Vercel as **omhackz-go** (framework preset **Other**), or run `npx vercel --prod` from this directory and follow the prompts.
3. Add `go.omhackz.top` under the project's **Settings → Domains**. At your DNS provider, configure the `go` record with the value Vercel displays.
4. Once the domain is verified, open `https://go.omhackz.top/home`. The included shortcut points to `https://omhackz.top`.
