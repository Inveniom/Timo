# Thimo365 platform — rebuild

## Status
Nieuwe platformbasis op branch `rebuild/thimo365-platform`. De bestaande implementatie blijft op `main` intact totdat deze rebuild is gecontroleerd en samengevoegd.

## Leidende procesbron
`Thimo365_Proces_en_informatievoorziening.docx`, versie 1.0, 27 november 2026. De negen hoofdstukken en bijlagen A/B zijn vertaald naar de drie omgevingen, centrale informatievoorziening, zes procesfasen, vaste registraties, bevoegdheden, wijzigingen en fasepoorten.

## Architectuur
- Klantcommunicatie: klantintake, modulekeuze, vraagstukken, ontwerp, logistiek, voorstel, besluiten en voortgang.
- Thimo-basissysteem: moederinformatie, projectregie, productbeheer, kostprijzen, verkoopprijzen, calculaties, bevoegdheden, contracten, wijzigingen en vrijgaven.
- Leveranciersomgeving: toegewezen scope, eisen, document-/modelversies, raakvlakken, opdrachten, controles, voortgang en afwijkingen.
- Centrale opslag: één projectstand met versies en auditspoor; views worden gefilterd op rol.
- AI: brongebonden ondersteuning en voorbereiding. AI kan nooit zelf prijs, contract, ontwerp of productievrijgave goedkeuren.

## Procesfasen
1. Klantvraag en productkeuze.
2. Ontwerp — VO en DO.
3. Contractvorming.
4. Technisch ontwerp — TO.
5. Productievrijgave.
6. Productie, levering en afsluiting.

Elke fase heeft invoercriteria, verplichte controles, blokkerende punten, bevoegde goedkeuring en een onveranderlijke vastlegging van de fasebeslissing.

## Datadomeinen
Moederinformatie: modules, opties, techniek, kwaliteit, ontwerpregels, uitvoering, prijsgrondslagen en procesformats.
Project: klant, locatie, eisen, aannames, betrokkenen, moduleversie, keuzes, gesprekken, vraagstukken, besluiten, documenten, modellen, controles, calculaties, planning, contracten, wijzigingen, vrijgaven en oplevering.
Financiën: kostprijs, verkoopprijs, offerteprijs en contractprijs zijn afzonderlijke velden met eigen geldigheid en toegangsrechten.

## Statusmodel
- Informatie/document: concept → ter beoordeling → goedgekeurd → vrijgegeven → vervallen.
- Vraagstuk: open → in behandeling → ter besluitvorming → besloten → verwerkt → gecontroleerd → gesloten.
- Een besluit is niet hetzelfde als verwerking. Een upload of stilzwijgen is geen goedkeuring.

## Belangrijke grenzen en open punten
- Het procesdocument bevat geen gevalideerde productmaten, technische prestaties, prijslijst, leverancierslijst of contractmodellen. Die worden dus niet als feiten ingevuld.
- Voor de demo mogen bedragen uitsluitend als fictieve voorbeeldwaarden worden gebruikt en moeten ze zichtbaar als zodanig gemarkeerd zijn.
- CAD/IFC/BCF/IDS-koppelingen zijn een latere integratiefase; een bestandsoverdracht is nooit automatisch inhoudelijke goedkeuring.
- Productiegegevens mogen pas worden gepubliceerd na expliciete, bevoegde vrijgave.
