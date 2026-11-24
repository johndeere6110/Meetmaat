# Meetmaat
Web-app (PWA) om bouwtekeningen (PDF/foto) te openen, te ijken en maten af te lezen voor uitzetten in het werk.
- Alles zit in index.html (HTML, CSS en JS in één bestand). Geen build-stap, geen frameworks. pdf.js staat in vendor/.
- Taal in de app: Nederlands, komma als decimaalteken; maatvoering in mm zonder duizendtalpunt (47970).
- Draait op johndeere6110.github.io naast Zaaihulp en Perceelkaart: localStorage, IndexedDB en caches zijn gedeeld.
  Gebruik alleen sleutels/namen met voorvoegsel "meetmaat" en ruim in sw.js nooit caches van andere apps op.
- Verander bestaande opslagsleutels niet, anders zijn gebruikers hun ijking en metingen kwijt.
- Gebruik geen alert(), confirm() of prompt(); bevestigen gaat met twee keer tikken ("Zeker? Tik nogmaals").
- Bij elke wijziging: verhoog het versienummer in sw.js (meetmaat-v1 -> v2 enz.).
- Push direct naar main, zonder pull request.

## Achtergrond (voor nieuwe sessies)
- Gebruiker werkt in grondwerk/bestrating (klinkers, kolken, laser). Antwoord kort, informeel, in het Nederlands; geen programmeurstaal.
- Hoogtes intern in mm, tonen in cm (`fmtPeil`). Afschot intern als fractie, tonen **alleen in %** (`pctTxt`/`fmtAfschot`), geen 1:x of mm/m.
- Per tekening opgeslagen in localStorage `meetmaat:<naam|grootte|pN>` (`st`). Items: dist/poly/area/set.
  set-item kan `soort` (nul/kolk/put/goot/punt) en `h` (mm) hebben; lijn kan `pl` hebben: `{b:0}` = 0-lijn, `{v:[mm per punt]}` = aansluiting.
  `af` = afschot langs een lijn, `st.hpA/hpB` = afschot tussen twee punten, `st.geo` = ligging luchtfoto (RD).
- Zijpaneel-volgorde regelt `sideOrder()`: Delen onderaan boven IJking; IJking onderaan zodra geijkt; Palen altijd onderaan.
- **Bewust weggehaald, niet terugbouwen tenzij gevraagd:** afschotplan met driehoeken/laservlakken, laser instellen (opstelplek, beste draaiing, stap voor stap), Rond een punt, Schuin vlak, Tussen 2 lijnen. Afschot rekent de gebruiker zelf uit met afstand en hoogte (staat nog in de git-geschiedenis).
- Testen: in de repo `python3 -m http.server 8765`, dan Playwright op http://localhost:8765, op 1300 px én 412 px (of `devices["Pixel 7"]`).
  Voor PDOK: `proxy: { server: process.env.HTTPS_PROXY, bypass: "localhost,127.0.0.1" }`. Na elke wijziging elk `<script>` door `new Function()` halen als syntaxcheck.
  Controleer dat het zijpaneel niet breder wordt dan zijn kader.
- Groep: `meetmaat:groep` = {url, code, naam} (url leeg = vaste GRP_URL_VAST). Uitnodiging: `installeren.html?groep=<code>` (+ `&web=<link>` alleen bij een eigen script) zet de code in `meetmaat:groep` en een seintje `meetmaat:groepUitnodiging` {code, url, ts}; de app pakt dat op bij starten, `visibilitychange` en `storage` (ouder dan een week: negeren). Groepslink `./?groep=<code>`. Oude `#groep=<base64>` blijft werken. De groepscode staat nooit in de code of de repo.
  De groep is een brievenbus (sturen/ophalen/weghalen per tekening), geen samenvoegen: een nieuw apparaat kan de groep dus niet leegmaken.
- manifest `id` is "/Meetmaat/": nooit meer veranderen, anders zien telefoons hem als een andere app.
- Open ideeën: lijst met eerdere tekeningen in het menu; "Leeg vel op schaal" mag weg als het niet gebruikt wordt.
