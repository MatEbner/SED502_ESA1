# Fotografie-Portfolio

Eine kleine statische Webseite für Fotografien. Die Fotos werden als Karten in einer Galerie angezeigt und lassen sich nach Motiv filtern (Landschaft, Architektur, Portrait). Zu jedem Foto gibt es Titel, Beschreibung, Fotograf und die Kameradaten (Kamera, Brennweite, Blende, ISO, Verschlusszeit). Unter der Galerie steht eine kleine Statistik zu den gerade angezeigten Fotos (Anzahl und durchschnittliche Brennweite).

Die Bilder stammen von [Pexels](https://www.pexels.com). Bei jedem Foto ist der Fotograf genannt und es gibt einen Link zur Originalseite.

## Technische Entscheidungen

- **Vite und TypeScript:** Ich habe das Vite-Template "vanilla-ts" genommen, weil ich kein Framework brauche. `npm run build` läuft ohne Fehler durch.
- **Semantisches HTML:** Die Seite besteht aus `header`, `nav`, `main`, `section`, `article`, `figure`, `figcaption`, `aside` und `footer`. Ich habe bewusst kein `div` verwendet. Die Kameradaten stehen in einer `dl`-Liste, die Filter sind echte `button`-Elemente.
- **Barrierefreiheit:** Die Navigation hat ein `aria-label`. Die Filter-Buttons zeigen mit `aria-pressed` an, welcher gerade aktiv ist, und die Anzeige "X von Y Fotos" ist ein `aria-live`-Bereich, damit Screenreader die Änderung mitbekommen. Alle Bilder haben einen Alt-Text.
- **Daten und Typen getrennt:** Das Interface `Foto` und der Typ `Motiv` stehen in `typen.ts`, die Fotodaten in `daten.ts` und die Logik in `main.ts`.
- **Galerie wird aus dem Array gerendert:** Die Karten werden mit `map()` und Template Literals aus dem Fotos-Array erzeugt. Bei jedem Filtern wird die Galerie komplett neu gerendert, statt einzelne Elemente im DOM zu verändern.
- **Filtern und Statistik:** Gefiltert wird mit `filter()` über das Feld `motiv`.
- **Event Delegation:** Für die Filter-Buttons gibt es nur einen einzigen Click-Listener auf dem Container, nicht einen pro Button.
- **Bilder lokal:** Die Fotos liegen im Ordner `public/images/` und werden nicht von Pexels geladen.

## Projekt starten

```bash
npm install
npm run dev
```

Zum Bauen und Testen der fertigen Version:

```bash
npm run build
npm run preview
```
