# Sprötze aktuell

Moderne, statische Website für Informationen rund um den Ortsteil Sprötze – in der ersten Ausbaustufe mit einer aufbereiteten Darstellung des Buchholzer 1. Nachtragshaushalts 2026.

## Enthaltene Funktionen

- reduzierte Startseite als ruhiger Einstieg
- eigene Unterseiten für `Haushalt` und `Sprötze`, plus Weiterleitung für alte `quellen.html`-Links
- Sponsor-Hinweis für die Wählergruppe Sprötze
- Haushaltsseite mit zwei interaktiven Pie-Charts für Einnahmen und Ausgaben, Step-In in einzelne Bereiche, Filterung und Vergleichstabelle
- eigene lokale Fokus-Seite für Sprötze
- Quellen direkt am jeweiligen Inhalt statt als eigene Navigationsseite
- vektorisiertes WGS-Logo für die statischen Seiten
- GitHub-Pages-Workflow für automatische Veröffentlichung

## Technischer Stack

- React 19
- TypeScript 6
- Vite 8
- Recharts 3
- GitHub Pages via GitHub Actions

## Projektstruktur

- `index.html` – reduzierte Startseite / Einstieg
- `haushalt.html` – Haushalts-Unterseite
- `sproetze.html` – lokale Fokus-Seite für Sprötze
- `quellen.html` – Weiterleitung auf die integrierten Quellenabschnitte
- `site.css` – gemeinsame Styles für alle HTML-Seiten
- `site.ts` – gemeinsame Hilfslogik für Navigation, PDF-Links, Pie-Charts und Haushalts-Drilldown
- `budget-data.ts` – strukturierte Datengrundlage für die statische Haushaltsseite
- `src/App.tsx` – React-Oberfläche und Interaktion als Ausbau-Basis
- `src/data/budgetData.ts` – aufbereitete Haushaltsdaten aus dem PDF
- `wgs-logo.svg` – vektorisiertes Logo für die statischen Seiten
- `sources/pdfs/buchholz-nachtragshaushalt-2026-beschluss-2026-02-09.pdf` – Original-PDF im Projekt
- offizielle PDF-Verlinkung der Stadt Buchholz für den Nachtragshaushalt 2026
- `.github/workflows/deploy.yml` – Deployment nach GitHub Pages

## Lokal starten

### Gebaute Version direkt lokal öffnen

Die gebaute Mehrseiten-Version im Ordner `dist/` ist so konfiguriert, dass sie direkt lokal per `file://` geöffnet werden kann – ganz ohne Server. Nach dem Build genügt also ein Doppelklick auf zum Beispiel:

```text
dist/index.html
```

Build dafür:

```bash
npm install
npm run build
```

Wichtig: Die Quell-Dateien im Projektwurzelverzeichnis (`index.html`, `haushalt.html`, `sproetze.html`, `quellen.html`) sind Vite-Einstiege für Entwicklung und Build. Für das reine lokale Öffnen ohne Server ist `dist/` die richtige Variante.

### Quellversion über lokalen Server

Die Quelldateien bilden weiterhin eine eigenständige Mehrseiten-Version für Entwicklung und Prüfung. Verifiziert wurde der lokale Betrieb über einen kleinen statischen Server:

```bash
python3 -m http.server 4173 --directory .
```

Danach sind die Seiten unter `http://127.0.0.1:4173/` erreichbar.

### Mit React-/Vite-Version

```bash
npm install
npm run dev
```

Hinweis: Die Startseite `index.html` ist jetzt bewusst als reduzierte Landingpage mit Unterseiten ausgelegt. Der React-/Vite-Code liegt weiterhin im Projekt und kann als moderne Ausbau-Basis weiterverwendet werden.

## Qualität prüfen

```bash
npm run lint
npm run build
```

Oder kombiniert:

```bash
npm run check
```

## Git-Hooks für gebautes `dist/`

Damit `dist/` bei Änderungen automatisch aktuell bleibt, ist ein Hook-Setup im Projekt enthalten:

- `pre-commit` baut `dist/` neu und staged die erzeugten Dateien automatisch
- `pre-push` führt noch einmal `npm run check` aus und stoppt den Push, falls `dist/` nach dem Build nicht committed wurde

Die Hooks werden nach `npm install` automatisch aktiviert. Falls nötig, kannst du sie manuell setzen mit:

```bash
npm run hooks:install
```

## GitHub Pages aktivieren

1. Repository nach GitHub pushen.
2. Unter **Settings → Pages** als Quelle **GitHub Actions** auswählen.
3. Auf `main` pushen – der Workflow aus `.github/workflows/deploy.yml` baut und veröffentlicht die Seite.

Die Vite-Basis ist relativ konfiguriert. Dadurch funktioniert die gebaute Seite sowohl lokal aus `dist/` per Dateiaufruf als auch auf GitHub Pages unter:

`https://<github-user>.github.io/sproetze-aktuell/`

funktioniert.

## Wichtige GitHub-Einschränkung

Direkt im normalen GitHub-Repository-Dateibrowser wird eine HTML-Datei **nicht** als Webseite gerendert, sondern als Quelltext angezeigt. Ohne GitHub Pages gibt es daher keinen echten „Webseiten-Aufruf“ direkt aus `github.com/<repo>/...`.

Was aber geht:

- lokal `dist/index.html` direkt öffnen, ganz ohne Server
- GitHub Pages aktivieren, wenn die Seite öffentlich im Browser aufrufbar sein soll

## Inhaltliche Quelle

Die Zahlen in der ersten Version wurden aus dem im Projekt enthaltenen PDF übernommen:

- `sources/pdfs/buchholz-nachtragshaushalt-2026-beschluss-2026-02-09.pdf`

Für die Website wird direkt die offizielle PDF-Datei der Stadt Buchholz verlinkt:

- `https://www.buchholz.de/downloads/datei/NDNlOWExZGI2NGIzN2FlOC9NZ2NnSTVTYTN1UUpmWjdMWUk2M3VrbzErYjZCbGRJbTNHZHgwQ2tTN1pueXJqanRVbXhxTHFCZHI1WHcrNUxqMHVpU012MWlGK0QzMzZxS3hDZ21VS0hZVlNEOWhmcUxCWkozWS85Uis0NDRaU0M2QzRIS1VYOHk4Tkh1TDVVZ040a1hXcWVFQ0htQkhHNG1jTzdNdWg2QVk4ZDF5SEVuUzh3WjdFOGFYVUcrWjg2Q1pGakh5d1QwWnZJVTM3NQ`

Zusätzliche offizielle Informationsseite der Stadt Buchholz:

- `https://www.buchholz.de/portal/seiten/der-haushalt-der-stadt-903000713-20101.html`

## Nächste sinnvolle Ausbaustufen

- Nachrichten / Termine für Sprötze
- Projektmonitor für Ortsrats- und Infrastrukturthemen
- Filterbare Haushaltsansicht nach Themenfeldern
- Karten- oder Standortansichten für lokale Projekte
