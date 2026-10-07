# Shankar Govinth website

A responsive redesign of the Shankar Govinth law firm website, with refined typography, mobile navigation, full lawyer profiles, practice areas, reported cases, and an article archive.

## Run locally

Install Node.js, then run from this folder:

```sh
node server.cjs
```

Open http://127.0.0.1:4173 in your browser. No dependency installation or build step is required.

## Project files

- `dist/index.html` — homepage, profiles, services, cases, and contact form.
- `dist/articles.html` — archive of all 17 original articles.
- `dist/styles.css` — responsive styles and typography.
- `dist/app.js` — navigation and enquiry form behavior.
- `dist/assets/` — original photographs and article images.
- `dist/articles/` — the 17 original article PDFs.
- `dist/_redirects` — compatibility route for `/articles` on supported hosts.
- `server.cjs` — local preview server.
- `vercel.json` — Vercel output directory and article route configuration.
- `.openai/hosting.json` — configuration for the existing Sites deployment.

## Hosting and integrations

Deploy the contents of `dist/` to a static website host. The source does not require a server build or application secrets.

For Vercel, import this repository with the Root Directory left at the repository root. The included `vercel.json` selects the Other framework preset, skips installation and building, and publishes `dist/`. Pushes to `main` trigger production deployments when Vercel's Git integration is connected. The homepage is served at `/`, and `/articles` opens the article archive without affecting the article PDF URLs.

The enquiry form uses the firm's existing contact service. A valid submission sends a real enquiry to the firm; use mocked requests when testing submission behavior. Phone, email, WhatsApp, and map links use the firm's original contact details. Fonts load from Google Fonts.

The redesign preserves both lawyer biographies, all 14 practice entries, nine reported cases, and 17 articles. The original site is https://shankargovinth.com/.
