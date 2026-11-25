# Timo — klantgerichte ontwerp- en offerteadviseur

De klantomgeving van Thimo365 bevat een Timo-gesprek dat de bezoeker stap voor stap begeleidt naar een voorlopig ontwerp, technische uitgangspunten en een indicatieve kostenopgave.

## Techniek

- Frontend: GitHub Pages op `https://inveniom.github.io/Timo/`
- AI-backend: Cloudflare Worker `https://timo-agent.martijn-d1c.workers.dev`
- Model: `gpt-4.1-mini`
- Browser-origin: `https://inveniom.github.io`

Het Worker-adres wordt automatisch door de klantomgeving gebruikt. De OpenAI API-sleutel blijft uitsluitend als Cloudflare secret op de server.

## Gedrag van Timo

- Timo stelt maximaal één gerichte vervolgvraag per beurt.
- Timo verzamelt projectwensen, locatie, aantallen, doelgroep, ruimte, planning en budget.
- De klant krijgt een schematisch conceptvoorstel met uitgangspunten en specificaties.
- De kostenopgave is indicatief. Er worden geen bedragen verzonnen; daarvoor is een actuele, gevalideerde prijslijst nodig.
- Een schematische opstelling is geen maatvaste tekening of vergunningstoets.
