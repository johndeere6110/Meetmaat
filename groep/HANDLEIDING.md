# Meetmaat groep instellen (Google)

Met de groep stuur je een tekening met alle metingen naar iemand anders (of naar iedereen) in Meetmaat zelf:
geen WhatsApp of bestanden zoeken. De tekeningen komen in een map in **jouw** Google Drive; een klein script
regelt het sturen en ophalen. Eenmalig instellen, ongeveer een kwartier.

## 1. Script maken
1. Log in bij Google, het liefst met een apart account voor de groep (bv. `meetmaat.groep@gmail.com`).
   Je eigen account mag ook.
2. Ga naar [script.google.com](https://script.google.com) → **Nieuw project**. Geef het een naam, bv. **Meetmaat groep**.
3. Haal de voorbeeldtekst weg en plak de inhoud van [`apps-script.gs`](apps-script.gs). Klik op opslaan (schijfje).
4. Links: **Projectinstellingen** (tandwiel) → onderaan **Scripteigenschappen** → **Scripteigenschap toevoegen**:
   - Eigenschap: `GROEPSCODE`
   - Waarde: een code die je zelf verzint, bv. `bouwploeg-andy-26`. Niet te kort: wie de code kent, kan sturen en ophalen.

## 2. Toestemming geven
1. Terug naar de **Editor** (`< >` links). Kies bovenaan de functie **test** en klik **Uitvoeren**.
2. Google vraagt toestemming: kies je account → *Geavanceerd* → *Ga naar Meetmaat groep (onveilig)* → *Toestaan*.
   (Google waarschuwt omdat het een eigen script is. Het script maakt alleen de map "Meetmaat verzonden" en werkt alleen daarin.)
3. In je Google Drive staat nu de map **Meetmaat verzonden**.

## 3. Publiceren als web-app
1. Rechtsboven **Implementeren → Nieuwe implementatie**.
2. Type (tandwiel): **Web-app**.
3. Uitvoeren als: **Ik**. Wie heeft toegang: **Iedereen**.
4. **Implementeren** en kopieer de **URL van de web-app** (eindigt op `/exec`).

## 4. In Meetmaat
De web-app van de eigen groep staat vast in de app. Iedereen vult alleen de **groepscode** en zijn **naam** in.
1. Open Meetmaat → zijkolom **Delen** → groepscode en je naam → **Opslaan**.
   (Een andere groep met een eigen script: open *Andere groep* en plak daar de web-app-URL.)
2. Collega's uitnodigen: **Instellingen → App doorsturen**. Die link installeert Meetmaat én zet de groep erin; bij het
   eerste openen vraagt de app alleen de naam. Heeft iemand Meetmaat al: **Groepslink doorsturen**.

## Gebruik
- **Versturen:** tekening open, zijkolom **Delen** → kies naar wie (of *iedereen*) → **Versturen**.
- **Ophalen:** bij de ander staat in **Delen** de tekening onder *Voor jou*. Tik **Openen**: de tekening staat er
  met alle metingen. Nieuwe tekeningen zie je ook in een melding als je Meetmaat opent.
- Na 30 dagen gaan verstuurde tekeningen vanzelf naar de prullenbak van je Drive (aan te passen bovenin het script).

## Script bijwerken (nieuwe versie van Meetmaat)
Soms krijgt het script iets nieuws (bijvoorbeeld de ledenlijst bij *Naar*). Zo werk je het bij, de link blijft hetzelfde:
1. Open het script op [script.google.com](https://script.google.com), selecteer alle tekst en plak de nieuwe inhoud van
   [`apps-script.gs`](apps-script.gs). Opslaan.
2. **Implementeren → Implementaties beheren** → potloodje → Versie: **Nieuwe versie** → **Implementeren**.

## Beheer
- Alles staat in de map **Meetmaat verzonden** in je Drive. Weghalen mag gewoon.
- **Script aangepast?** Implementeren → *Implementaties beheren* → potloodje → Versie: *Nieuwe versie* → Implementeren.
  Zo blijft de URL hetzelfde.
- **Code veranderen:** pas `GROEPSCODE` aan bij de scripteigenschappen en stuur iedereen een nieuwe groepslink.
- Ruimte: een gratis Google-account heeft 15 GB; een tekening is meestal 1 tot 10 MB.
