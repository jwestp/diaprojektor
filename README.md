# 📽 Slide Night

Slide Night is a browser-based slideshow app that lets you select local photos
and enjoy them as a nostalgic slide-projector presentation. Your photos stay in
your browser and are never uploaded to a server.

## Getting started

Install the dependencies:

```sh
npm install
```

## Available scripts

### `npm run dev`

Starts the Vite development server at [http://localhost:3000](http://localhost:3000).

### `npm run build`

Type-checks the project and creates an optimized production build in `dist/`.

### `npm run preview`

Serves the production build locally so you can preview it before deployment.

### `npm run lint`

Runs ESLint across the project.

## Deployment

The GitHub Actions workflow deploys the app to GitHub Pages on every push to
`main`. In the repository settings, open **Settings → Pages** and set **Build
and deployment → Source** to **GitHub Actions**. The workflow builds the app
with the Pages base path and publishes the `dist/` directory.
