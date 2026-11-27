# Thimo365 — verbonden klant-, project- en leveranciersproces

Deze repository bevat de rebuild van Thimo365 op basis van **Thimo365 Proces en informatievoorziening, versie 1.0 (27 november 2026)**.

## Omgevingen
- **Klantcommunicatie:** intake, standaardmodulekeuze, ontwerpgesprek met Thimo, logistiek, conceptuele terreininpassing, voorlopig klantvoorstel, vraagstukken, documenten en besluiten.
- **Thimo-basissysteem:** projectregie, moederinformatie, productdatabase, bewerkbare kostprijzen en verkoopprijzen, vraagafhandeling, besluiten, fasepoorten en leveranciersregie.
- **Leverancierscommunicatie:** toegewezen opdrachten, technische documenten, controles, voortgang en afwijkingsmeldingen.

Alle omgevingen werken via één centrale projectopslag. De server filtert informatie per rol. Kostprijzen en interne gegevens worden niet aan de klantomgeving geleverd.

## Procesfasen
1. Klantvraag en productkeuze
2. Ontwerp (VO en DO)
3. Contractvorming
4. Technisch ontwerp (TO)
5. Productievrijgave
6. Productie, levering en afsluiting

Een faseovergang vereist dat blokkerende punten zijn afgehandeld en een bevoegd besluit is geregistreerd. AI kan informatie ordenen en concepten voorbereiden, maar keurt geen ontwerp, prijs, contract, wijziging of productievrijgave goed.

## Techniek
- Frontend: statische HTML/CSS/JavaScript op GitHub Pages.
- Backend: Cloudflare Worker.
- Centrale opslag: SQLite-backed Cloudflare Durable Object.
- AI: OpenAI Responses API via de server; de API-sleutel staat uitsluitend als Cloudflare secret.
- Deployment: GitHub Actions.

## Demo
De eerste dataset bevat PARKZICHT, DE GROENE HOF en HAVENKWARTIER. Alle prijzen in de demo zijn fictieve voorbeeldwaarden. Productmaten, technische prestaties en toepassingsgrenzen zijn niet gevalideerd en worden daarom als nog vast te stellen weergegeven.

De demo-modus staat in de Worker-configuratie aan. Dit is uitsluitend voor testen met fictieve gegevens. **Zet DEMO_MODE uit en stel afzonderlijke toegangscodes in voordat echte klant-, personeels-, leveranciers- of financiële gegevens worden verwerkt.**

## Deployment
De rebuild wordt eerst gecontroleerd op branch `rebuild/thimo365-platform`. Na controle kan deze naar `main` worden samengevoegd. De bestaande GitHub Pages- en Cloudflare Worker-workflows publiceren daarna de nieuwe versie.

Zie `docs/ARCHITECTUUR.md` en `ai-backend/README.md` voor de functionele en technische uitgangspunten.
