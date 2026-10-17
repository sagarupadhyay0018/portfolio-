# Sagar Upadhyay portfolio

## Run locally

```powershell
npm install
npm run dev
```

Then open the `Local` URL printed by Next.js, usually `http://localhost:3000`.

## Build

```powershell
npm run build
```

The static site is written to `dist/`.

## Deploy

- **Vercel:** Import this GitHub repository into Vercel. The included `vercel.json` builds the project and publishes `dist/`.
- **GitHub Pages:** The included `.github/workflows/deploy.yml` builds and deploys `dist/` when you push to `main`. In the repository settings, set **Pages → Build and deployment → Source** to **GitHub Actions**.

For a local preview of the exported files, serve `dist/` with a static file server. `npm run dev` remains available for development.
