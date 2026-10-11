# 📽 Diaprojektor

**Diaprojektor** ist eine browserbasierte Diashow-Anwendung. Wähle lokale Fotos aus
und genieße sie wie bei einer nostalgischen Diaprojektor-Präsentation. Deine
Fotos bleiben im Browser und werden niemals auf einen Server hochgeladen.

> **Hinweis:** Dieses Projekt ist ein Fork von
> [Yago/slide-night](https://github.com/Yago/slide-night).

## Einrichtung

Installiere zunächst die Abhängigkeiten:

```sh
npm install
```

## Verfügbare Befehle

### `npm run dev`

Startet den Vite-Entwicklungsserver unter
[http://localhost:3000](http://localhost:3000).

### `npm run build`

Prüft die TypeScript-Typen und erstellt einen optimierten Produktions-Build im
Ordner `dist/`.

### `npm run preview`

Stellt den Produktions-Build lokal bereit, damit du ihn vor der
Veröffentlichung ansehen kannst.

### `npm run lint`

Führt ESLint für das gesamte Projekt aus.

## Veröffentlichung

Der GitHub-Actions-Workflow veröffentlicht die Anwendung bei jedem Push auf
`main` über GitHub Pages. Öffne in den Repository-Einstellungen **Settings →
Pages** und setze unter **Build and deployment → Source** die Quelle auf
**GitHub Actions**. Der Workflow erstellt den Build mit dem passenden
Pages-Basispfad und veröffentlicht den Ordner `dist/`.
