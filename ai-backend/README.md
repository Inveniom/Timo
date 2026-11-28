# Cloudflare Worker — Thimo365

## Wat de Worker doet
- Serveert een health endpoint.
- Geeft rolgebonden sessies uit.
- Leest en schrijft centrale projectrecords via één SQLite-backed Durable Object.
- Filtert kostprijzen en interne gegevens uit klant- en leveranciersresponses.
- Roept de OpenAI Responses API aan met projectcontext die server-side uit de database wordt gelezen.
- Ondersteunt in de demo lokale documentopslag in de browser (IndexedDB), zonder betaalde opslagdienst.
- Laat AI alleen antwoorden en conceptvoorstellen voorbereiden; formele besluiten blijven bij bevoegde personen.

## Cloudflare-configuratie
`wrangler.toml` declareert de SQLite Durable Object `ThimoDatabase`. Wrangler voert de namespace-migratie uit tijdens de Worker-deployment. De database wordt bij eerste toegang geïnitialiseerd met uitsluitend fictieve demogegevens.

Benodigde bestaande secret:
- `OPENAI_API_KEY`

Documenten in de kosteloze demo:
- De frontend bewaart bestanden lokaal in IndexedDB op het huidige apparaat en in de huidige browser.
- Maximale bestandsgrootte in de demo: 4 MB per bestand.
- Documentmetadata blijft onderdeel van de projectregistratie; het bestand zelf wordt niet naar de centrale server verzonden.
- Lokaal opgeslagen bestanden zijn niet beschikbaar op andere apparaten, in andere browsers of na het wissen van browsergegevens. Dit is geen beveiligde centrale documentkluis en heeft geen automatische back-up.
- De optionele R2 API-code is niet actief zolang geen R2-binding is ingesteld. Er hoeft geen bucket te worden aangemaakt.

Configuratievariabelen:
- `ALLOWED_ORIGIN`: origin van de GitHub Pages-site.
- `OPENAI_MODEL`: modelnaam.
- `DEMO_MODE`: `true` uitsluitend voor de demo.

Voor niet-demo gebruik:
1. Zet `DEMO_MODE` op `false`.
2. Stel Cloudflare Worker secrets in: `STAFF_ACCESS_CODE`, `SUPPLIER_ACCESS_CODE` en `CLIENT_ACCESS_CODE`.
3. Bouw projectgebonden klantuitnodigingen en leverancierstoewijzing in voordat echte accounts worden toegelaten.
4. Stel bewaartermijnen, back-up/herstel en operationele toegangscontrole vast.

## API
- `GET /` — health.
- `GET /api/health` — health.
- `POST /api/auth` — rolgebonden demo-/toegangssessie.
- `GET /api/state` — rolgefilterde centrale projectstand.
- `POST /api/record` — gevalideerde registratie/upsert.
- `POST /api/chat` — brongebonden AI-antwoord en conceptvoorstel.
- `POST /api/documents` — beveiligde documentupload naar R2 (staff).
- `GET /api/documents` — rolgefilterde documentlijst of download.
- `POST /api/reset` — alleen voor de demo-medewerkersrol.

## Belangrijke beperking van de eerste demo
De demo gebruikt één Durable Object als centrale SQLite-database en voorbeeldrecords. Dit is een functionele basis voor de procesproef, geen definitieve multi-tenant productieomgeving. Voor productie zijn onder meer projectgebonden uitnodigingen, sterkere identiteitscontrole, granulariteit van leveranciersrechten, documentopslag, back-up/hersteltests en formele privacy-/bewaarafspraken vereist.
