# Meetmaat

Bouwtekening openen, ijken en maten aflezen voor uitzetten in het werk. Werkt op je telefoon, ook zonder internet.

**Openen:** https://johndeere6110.github.io/Meetmaat/
**Installeren of doorsturen naar iemand anders:** https://johndeere6110.github.io/Meetmaat/installeren.html

## Wat de app doet

- **Tekening openen:** PDF, foto of screenshot. De laatste tekening wordt onthouden, met ijking en metingen.
- **Automatisch ijken:** bij een PDF zoekt de app de maatgetallen (bijv. 47970, 12000) en hun maatlijnen op en ijkt daarop. Zelf ijken op een bekende maatlijn kan altijd; de ijking verwijderen ook.
- **Palen:** in een PDF worden de palen (de rondjes) herkend. Punten klikken vast op het hart van een paal.
- **Meten:** Afstand (2 punten), Lengte (route met bochten, bijv. een sleuf), Oppervlak.
- **Uitzetten:** zet een nulpunt (bijv. op een paal) en tik punten aan. Je krijgt X (naar rechts) en Y (naar boven) vanaf het nulpunt én vanaf de dichtstbijzijnde paal.
- **Zand:** kies een vloerveld (een Oppervlak), zet peilmaten in de paalvakken (één tik per vak, of in één keer "Vakjes tussen palen maken" en je rij metingen invullen of inspreken). Met beton, isolatie, goot en inklinken krijg je m³, tonnen en vrachten, plus een hoogtekaart op de tekening. Elk stukje vloer telt met de dichtstbijzijnde peilmaat.
- **Eenheid:** mm, cm of m. **Haaks:** alleen horizontaal of verticaal meten.
- **Delen naar Meetmaat** (Android, na installeren): een PDF uit WhatsApp, mail of Bestanden direct openen.

Nauwkeurigheid: ongeveer ±2 cm per aangetikt punt bij een A1-tekening (beter bij vastklikken op een paal). Een maat die op de tekening staat gaat altijd voor.

## Je gegevens

Alles blijft op je eigen telefoon: de tekening in IndexedDB (`meetmaat`), ijking en metingen in localStorage (`meetmaat:…`). Er is geen account en geen server.

## Zie ook

- **[Zaaihulp](https://github.com/johndeere6110/zaaihulp)** — installeren: https://johndeere6110.github.io/zaaihulp/installeren.html
- **[Perceelkaart](https://github.com/johndeere6110/perceelkaart)** — installeren: https://johndeere6110.github.io/perceelkaart/installeren.html

---

## Voor wie eraan werkt

- **Alles in `index.html`:** HTML, CSS en JavaScript in één bestand. Geen build-stap, geen frameworks.
- **`sw.js`:** service worker voor offline gebruik en "Delen naar". **Verhoog bij elke wijziging het versienummer** (`meetmaat-v1` → `v2`).
- **Gedeeld domein:** Zaaihulp, Perceelkaart en Meetmaat draaien allemaal op `johndeere6110.github.io` en delen localStorage, IndexedDB en de cache-opslag. Gebruik altijd het voorvoegsel `meetmaat` en ruim nooit caches van de andere apps op.
- **Meegeleverd:** pdf.js 3.11.174 (Apache-2.0, `vendor/pdfjs-LICENSE`), qrcodejs (MIT, `vendor/qrcodejs/LICENSE`), lettertypen Barlow Condensed en IBM Plex (SIL OFL, `fonts/`).
- **GitHub Pages:** Settings → Pages → *Deploy from a branch* → `main` / `(root)`.
