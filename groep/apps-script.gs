/**
 * Meetmaat groep: tekeningen met metingen naar elkaar sturen.
 * Zet dit script in een Google Apps Script-project en publiceer het als web-app
 * (uitvoeren als: Ik, toegang: Iedereen). Zie HANDLEIDING.md.
 *
 * Scripteigenschap GROEPSCODE: de code die iedereen in de groep invult (wie de code kent, kan sturen en ophalen).
 * De verstuurde tekeningen komen als bestanden in de map "Meetmaat verzonden" in je Google Drive.
 * Na BEWAAR_DAGEN dagen gaan ze vanzelf naar de prullenbak.
 */
const BEWAAR_DAGEN = 30;

function doGet(e) {
  const p = (e && e.parameter) || {};
  if (!codeOk_(p.code)) return json_({ ok: false, fout: "code" });
  if (p.a === "lijst") return json_({ ok: true, lijst: lijst_() });
  if (p.a === "haal") {
    const f = bestand_(p.id);
    if (!f) return json_({ ok: false, fout: "weg" });
    return ContentService.createTextOutput(f.getBlob().getDataAsString()).setMimeType(ContentService.MimeType.TEXT);
  }
  return json_({ ok: true, naam: "Meetmaat groep" });
}

function doPost(e) {
  let o = {};
  try { o = JSON.parse(e.postData.contents); } catch (err) { return json_({ ok: false, fout: "onleesbaar" }); }
  if (!codeOk_(o.code)) return json_({ ok: false, fout: "code" });
  if (o.a === "stuur") {
    if (!o.data) return json_({ ok: false, fout: "leeg" });
    const meta = { van: tekst_(o.van), naar: tekst_(o.naar) || "iedereen", naam: tekst_(o.naam), metingen: +o.metingen || 0, tijd: Date.now() };
    const naam = (meta.naam || "tekening").replace(/[\\/:*?"<>|]+/g, "_") + " (van " + (meta.van || "?") + ").meetmaat";
    const f = map_().createFile(Utilities.newBlob(o.data, "application/json", naam));
    f.setDescription(JSON.stringify(meta));
    opruimen_();
    return json_({ ok: true, id: f.getId() });
  }
  if (o.a === "weg") {
    const f = bestand_(o.id);
    if (f) f.setTrashed(true);
    return json_({ ok: true });
  }
  return json_({ ok: false, fout: "onbekend" });
}

// Alle verstuurde tekeningen (nieuwste eerst), zonder de tekening zelf
function lijst_() {
  const uit = [], it = map_().getFiles(), grens = Date.now() - BEWAAR_DAGEN * 864e5;
  while (it.hasNext()) {
    const f = it.next();
    let m = {};
    try { m = JSON.parse(f.getDescription() || "{}"); } catch (err) {}
    if (!m.tijd || m.tijd < grens) continue;
    uit.push({ id: f.getId(), van: m.van || "", naar: m.naar || "iedereen", naam: m.naam || f.getName(), metingen: m.metingen || 0, tijd: m.tijd, grootte: f.getSize() });
  }
  return uit.sort((a, b) => b.tijd - a.tijd);
}

function opruimen_() {
  const it = map_().getFiles(), grens = Date.now() - BEWAAR_DAGEN * 864e5;
  while (it.hasNext()) { const f = it.next(); if (f.getLastUpdated().getTime() < grens) f.setTrashed(true); }
}

// Alleen bestanden uit de eigen map, niet iets anders uit je Drive
function bestand_(id) {
  if (!id) return null;
  try {
    const f = DriveApp.getFileById(String(id)), mapId = map_().getId(), ouders = f.getParents();
    while (ouders.hasNext()) if (ouders.next().getId() === mapId) return f.isTrashed() ? null : f;
  } catch (err) {}
  return null;
}

function map_() {
  const p = PropertiesService.getScriptProperties(), id = p.getProperty("MAP_ID");
  if (id) { try { const m = DriveApp.getFolderById(id); if (!m.isTrashed()) return m; } catch (err) {} }
  const m = DriveApp.createFolder("Meetmaat verzonden");
  p.setProperty("MAP_ID", m.getId());
  return m;
}

function codeOk_(code) {
  const c = PropertiesService.getScriptProperties().getProperty("GROEPSCODE");
  return !!c && String(code || "").trim() === String(c).trim();
}
const tekst_ = v => String(v == null ? "" : v).slice(0, 120);
function json_(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }

// Eén keer handmatig uitvoeren in de editor (kies "test" en klik Uitvoeren): vraagt toestemming en maakt de map
function test() { Logger.log("Map: " + map_().getUrl() + " · code ingesteld: " + !!PropertiesService.getScriptProperties().getProperty("GROEPSCODE")); }
