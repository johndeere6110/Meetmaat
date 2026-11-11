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
