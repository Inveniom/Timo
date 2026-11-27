# Thimo365 — volledige uitwerking van de zes procesfasen

**Bronbasis:** *Thimo365 – Proces en informatievoorziening*, versie 1.0, 27 november 2026.  
**Status:** functionele uitwerking voor implementatie. Dit document voegt geen productspecificaties, prestaties, vergunninguitslagen of echte prijzen toe die niet in de bron zijn vastgesteld.

## 0. Overkoepelende werkwijze

Thimo365 werkt met drie omgevingen op één centrale informatiebasis:
1. **Klantcommunicatie:** intake, keuzes, vragen, ontwerpbespreking, voortgang, klantbesluiten en gepubliceerde documenten.
2. **Thimo-basissysteem:** moederinformatie, projectregie, beoordelingen, calculatie, contractvorming, wijzigingen, fasebesluiten en vrijgaven.
3. **Leverancierszijde:** uitsluitend toegewezen scope, eisen, document-/modelversies, opdrachten, controles, voortgang en afwijkingen.

De projectbasis verwijst naar een exacte module-ID en moduleversie, gekozen opties en goedgekeurde aanvullingen. Een nieuwe moederversie wijzigt lopende projecten nooit automatisch. Projectmaatwerk wordt evenmin automatisch nieuwe moederinformatie.

### Algemene statussen

- Informatie/document: **concept → ter beoordeling → goedgekeurd → vrijgegeven → vervallen**.
- Vraagstuk: **open → in behandeling → ter besluitvorming → besloten → verwerkt → gecontroleerd → gesloten**.
- Een besluit is niet hetzelfde als verwerking. Een chatbericht, upload of stilzwijgen is geen formele goedkeuring.
- Ieder gegeven krijgt waar relevant een eigenaar, unieke identificatie, bron, versie, datum, status en goedkeurder.
- Bij tegenstrijdige, ontbrekende of verouderde bronnen wordt onzekerheid zichtbaar gemaakt. AI doet dan geen stellige toezegging; afhankelijke vrijgave kan worden geblokkeerd.

### Rollen

Klant, Thimo-regiehouder, productbeheerder, bouwkundige, constructeur, installateur, leverancier, informatiebeheerder, contractueel/financieel bevoegde en AI. Eén medewerker kan meerdere rollen vervullen, maar risicovolle beslissingen vragen zo nodig een afzonderlijke beoordeling. AI ordent, vergelijkt en bereidt voor, maar beslist niet over ontwerpgoedkeuring, prijs, contract, wijziging of productievrijgave.

---

## Fase 1 — Klantvraag en productkeuze

### Doel
Een bevestigde klantvraag en een uitvoerbare oplossingsrichting vastleggen.

### 1.1 Intake met de klant
De AI-chat vraagt gericht naar:
- gebruiksdoel, doelgroep en functionele behoefte;
- projectlocatie en beschikbare locatie-/perceelinformatie;
- totaal aantal units en gewenste bouwlagen;
- gewenste prestaties, kwaliteit, uitstraling en afwerking;
- budgetindicatie en gewenste planning;
- randvoorwaarden, afhankelijkheden en bekende beperkingen.

Het totaal aantal units wordt één keer als kaderstellend projectgegeven vastgelegd. De aantallen per verdieping worden later uit dit totaal afgeleid en mogen het totaal niet verhogen.

### 1.2 Eisenregistratie
Elk antwoord dat een eis of projectgegeven vormt, krijgt:
- unieke eis-ID;
- omschrijving en bron;
- context en datum;
- gekoppelde module, ruimte, object of onderdeel;
- eigenaar en status;
- verificatiemethode of bewijs dat later nodig is.

Aannames, klantwensen, externe onderzoeksresultaten en vastgestelde feiten blijven afzonderlijk herkenbaar.

### 1.3 Productclassificatie
Productbeheerder/Thimo classificeert de wens als:
- **standaardmodule:** aantoonbaar binnen de geldende catalogus en goedgekeurde opties;
- **maatwerk binnen de standaard:** aanpassing binnen beschreven grenzen en basisprincipes; aanvullende beoordeling nodig;
- **afwijking buiten de standaard:** bijvoorbeeld andere draagstructuur of productiewijze; afzonderlijk ontwikkelbesluit over haalbaarheid, kosten, risico en planning nodig.

Eerder uitgevoerd maatwerk wordt pas standaard nadat het als nieuwe optie of moduleversie is beoordeeld en goedgekeurd.

### 1.4 Eerste haalbaarheid
Toets ten minste locatie, fundering, bereikbaarheid, aansluitingen, toepassingsgrenzen, eerste leveranciersafhankelijkheden, prijsgrondslag en planning. Indicatieve prijzen en termijnen worden nadrukkelijk als indicatief gemarkeerd.

### Uitvoer en afsluiting
- bevestigde klantvraag en eisenlijst;
- gekozen module-ID en exacte versie;
- gekozen opties en routeclassificatie;
- aannames, ontbrekende informatie en afwijkingen;
- eerste financiële en planningsuitgangspunten;
- benoemde Thimo-regiehouder.

**Blokkerend:** een afwijking buiten de standaard kan niet als normale productkeuze worden toegezegd voordat een afzonderlijk ontwikkelbesluit is genomen.

---

## Fase 2 — Ontwerp: voorlopig ontwerp (VO) en definitief ontwerp (DO)

### Doel
Van hoofdopzet en ruimtelijke keuzes naar een voldoende uitgewerkt ontwerp voor contractvorming.

### 2.1 Ontwerpbrief
Leg vast: ontwerpuitgangspunten, programma van eisen, doelgroep, gebruik, gewenste uitstraling, locatiecontext, randvoorwaarden en welke onderdelen binnen de ontwerpopdracht vallen.

### 2.2 Voorlopig ontwerp (VO)
Werk minimaal uit:
- hoofdopzet en positionering op het terrein;
- conceptuele terreininpassing, oriëntatie, ontsluiting en logistieke routes;
- indeling en aantallen per bouwlaag;
- hoofdvorm, gevelbeeld, openingen en uitstraling;
- unitconfiguratie, koppelingen en stapeling;
- globale materiaal- en afwerkingsrichting;
- belangrijkste constructieve, installatietechnische en bouwkundige aandachtspunten;
- eerste kosten- en planningsgevolgen.

Visualisaties zijn herkenbaar als concept en worden niet gepresenteerd als maatvaste of technisch goedgekeurde tekeningen als die status niet is bereikt.

### 2.3 VO-beoordeling en klantvaststelling
Klant bespreekt keuzes in de chat. Thimo koppelt opmerkingen aan de relevante eis, tekening, modelversie en waar mogelijk object. Bouwkundige, constructeur, installateur en leveranciers worden betrokken waar hun deskundigheid nodig is. Iedere keuze krijgt status, eigenaar en gevolg.

Het VO krijgt een eigen versie en vaststellingsmoment. Een klantkeuze vervangt geen specialistische beoordeling.

### 2.4 Definitief ontwerp (DO)
Werk na VO-vaststelling de contracteerbare ontwerpuitwerking uit:
- maatvoering en aantallen;
- materialen, prestaties, toleranties en afwerking;
- constructieve uitgangspunten en relevante verbindingen;
- installaties en aansluitpunten op het vereiste DO-niveau;
- fundering en terreinaansluitingen;
- raakvlakken tussen disciplines en leveranciers;
- ontwerptekeningen, specificaties en modelversies;
- kostenraming, planning, risico's en resterende uitwerkingspunten.

### 2.5 Versie- en opmerkingenbeheer
Elke opmerking verwijst naar de exacte versie. Bij een nieuwe versie wordt gecontroleerd of eerder afgehandelde opmerkingen en goedkeuringen nog geldig zijn. Een besluit wordt pas gesloten na aantoonbare verwerking in de broninformatie en controle van de doelversie.

### Uitvoer en afsluiting
- afzonderlijk vastgesteld VO;
- afzonderlijk goedgekeurd DO;
- herkenbare tekeningen-, document- en modelversies;
- vastgelegde specialistische beoordelingen;
- bijgewerkte raming en planning;
- resterende punten met eigenaar, termijn en blokkeringsstatus.

Een verkorte route is toegestaan voor een ongewijzigde standaardmodule wanneer toepasselijkheid van bestaande ontwerpen en controles is bevestigd. Vereiste beoordelingen en besluiten blijven aantoonbaar.

---

## Fase 3 — Contractvorming

### Doel
Een consistente set klant- en leveranciersafspraken vastleggen op basis van het goedgekeurde DO.

### 3.1 Klantcontract
Werk uit:
- scope en concrete prestaties;
- inbegrepen en uitgesloten werkzaamheden;
- verantwoordelijkheden en raakvlakken;
- prijs, aannames, voorbehouden en geldigheid;
- betaalmomenten en financiële voorwaarden;
- planning, mijlpalen en afhankelijkheden;
- garanties en relevante opleververplichtingen;
- resterende technische uitwerking en voorwaarden.

### 3.2 Leveranciersafspraken
Per leverancier en per fase wordt hetzelfde overzicht bijgehouden:
- scope en uitsluitingen;
- eisen, specificaties en exacte versies;
- raakvlakken en verantwoordelijkheden;
- besluiten en open punten;
- prijs, betaalmomenten en voorbehouden;
- planning en levertermijnen;
- bevestiging van maakbaarheid, prijs, planning en ontvangst.

### 3.3 Dekking van klantverplichtingen
Voor iedere klantverplichting moet duidelijk zijn:
- welke leverancier deze afdekt;
- welke prestatie bij Thimo blijft;
- waar scope, termijn of kwaliteit verschilt;
- wie een niet-afgedekte verplichting oplost en begroot.

Een niet-afgedekte verplichting wordt vóór toezegging opgelost of expliciet toegewezen en begroot.

### 3.4 Contractpakket
AI mag een concept voorbereiden uit goedgekeurde eisen, besluiten en vaste contractmodellen. Voorstellen en onbevestigde chatopmerkingen worden niet als goedgekeurde afspraak verwerkt. Contractstukken worden met exacte document-ID en versie opgenomen; “de laatste tekening” zonder revisie is onvoldoende.

### Uitvoer en afsluiting
- beoordeelde en ondertekende klantovereenkomst;
- bevestigde leveranciersafspraken;
- scope-/uitsluitingenmatrix en verantwoordelijkheden;
- vaste contractuele informatiebasis en rangorde van stukken;
- overeengekomen wijzigingsprocedure;
- expliciete resterende punten met eigenaar, termijn en voorwaarden.

---

## Fase 4 — Technisch ontwerp (TO)

### Doel
Het gecontracteerde DO uitwerken tot technisch gecontroleerde informatie die de uitvoering en productie kan dragen.

### 4.1 Technische disciplines
Werk de relevante onderdelen uit:
- constructieve berekeningen, draagstructuur, verbindingen en fundering;
- bouwkundige details, toleranties, materialen en prestatie-eisen;
- installaties, capaciteit, tracés, schema's en aansluitingen;
- raakvlakken tussen bouwkundig, constructief, installatietechnisch en leverancierswerk;
- productiegegevens, materiaalstaten, stuklijsten en montage-instructies.

### 4.2 Document- en modelbeheer
Voor iedere bron worden vastgelegd:
- document-/model-ID, eigenaar en discipline;
- versie/revisie en datum;
- status en doelgroep;
- relatie met eisen, objecten en contractstukken;
- uitwisselformaat, eenheden en coördinatenstelsel.

Ontvangen bestanden krijgen eerst de status **ontvangen / te controleren**. Een upload wordt niet automatisch goedgekeurd of de geldende versie.

### 4.3 Model- en informatiecontrole
Waar toepasselijk:
- IFC voor modeluitwisseling;
- BCF voor modelgebonden vraagstukken, objectverwijzingen en gezichtspunten;
- IDS voor controleerbare informatie-eisen aan IFC;
- geometrische controles en specialistische raakvlakbeoordeling.

Een geslaagde technische overdracht is niet hetzelfde als inhoudelijke goedkeuring. Nieuwe exports worden gecontroleerd op afgesproken eigenschappen en relevante geometrie. Conflicten worden als afwijking geregistreerd en door de aangewezen eigenaar beslist.

### 4.4 Wijzigingen vanuit TO
Een technische aanpassing die scope, prestaties, prijs of planning verandert, wordt via de formele wijzigingsprocedure behandeld. Na goedkeuring worden bronmodel, tekeningen, specificaties en afhankelijke exports opnieuw gecontroleerd.

### Uitvoer en afsluiting
- gecontroleerd en goedgekeurd TO;
- vastgelegde berekeningen, details, installaties en aansluitingen;
- actuele document- en modelregisters;
- controlebewijzen en specialistische beoordelingen;
- goedgekeurde afwijkingen;
- geen blokkerende open punten voor productievrijgave.

---

## Fase 5 — Productievrijgave

### Doel
Eén vaste en controleerbare informatie-uitgave expliciet vrijgeven voor productie.

### 5.1 Productiepakket samenstellen
Het pakket bevat:
- unieke pakketidentificatie;
- vrij te geven scope, modules en aantallen;
- exacte documenten, modellen, tekeningen en revisies;
- specificaties, berekeningen en materiaal-/kwaliteitsbewijzen;
- montage- en productie-informatie;
- goedgekeurde wijzigingen;
- controle- en acceptatiecriteria.

### 5.2 Vrijgavecontrole
Controleer:
1. TO compleet en goedgekeurd;
2. contractuele dekking aanwezig;
3. document- en modelversies onderling consistent;
4. specialistische controles afgerond;
5. openstaande blokkerende punten opgelost;
6. financiële en planningsgevolgen verwerkt;
7. leverancier heeft maakbaarheid en ontvangst van exact deze pakketversies bevestigd.

### 5.3 Besluit
Een bevoegde Thimo-medewerker legt expliciet vast: besluit, datum, scope, pakket-ID, versies, voorwaarden en verantwoordelijke. Bij deelvrijgave zijn grenzen en raakvlakken aantoonbaar onafhankelijk beheerst.

### 5.4 Na vrijgave
Het vrijgegeven pakket blijft ongewijzigd beschikbaar. Productie gebruikt alleen dat pakket. Een latere wijziging vereist impactbeoordeling, eventuele werkstop, hernieuwde bevestiging en een nieuw vrijgavebesluit voor de geraakte scope.

### Uitvoer en afsluiting
Een expliciet productievrijgavebesluit met uniek pakket, goedkeurder en ontvangstbevestigingen. Upload of uitblijven van bezwaar geldt niet als vrijgave.

---

## Fase 6 — Productie, levering en afsluiting

### Doel
Uitvoering beheersen, de feitelijk gerealiseerde situatie vastleggen en het project aantoonbaar afsluiten.

### 6.1 Productievoortgang
Leveranciers registreren voortgang bij order, module of onderdeel. Koppel voortgang aan de vrijgegeven pakketversie.

### 6.2 Kwaliteit en afwijkingen
Registreer foto's, metingen, inspecties, tests, bewijsstukken en afwijkingen. Een productiemelding wijzigt ontwerp of contract niet automatisch. Bevoegde personen besluiten over herstel of een afwijkende oplossing.

Na een wijziging na vrijgave wordt vastgelegd:
- of werk wordt aangehouden;
- welke bestelde materialen en werk-in-uitvoering geraakt zijn;
- welke onderdelen nog bruikbaar zijn;
- welke herstelactie nodig is;
- wie de gevolgen draagt volgens de afspraken.

### 6.3 Logistiek en levering
Volg transport, route, planning, bereikbaarheid, hijsvoorzieningen, aflevermoment, ontvangst en eventuele schade. De route via de haven van Rotterdam is een projectuitgangspunt uit de klantomgeving; concrete route, vergunningen en voorzieningen moeten projectspecifiek worden onderzocht en bevestigd.

### 6.4 Oplevering en acceptatie
Leg vast:
- geleverde aantallen en onderdelen;
- leveringscontroles en bewijs;
- klantmeldingen en opleverpunten;
- acceptatie of afwijzing door bevoegde personen;
- restpunten, eigenaar, termijn en gevolgen;
- as-built tekeningen, modellen en feitelijke gerealiseerde toestand.

### 6.5 Afsluiting
Neem toepasselijke garantie- en onderhoudsgegevens, handleidingen, financiële eindafrekening en overdrachtsdocumenten op.

### Uitvoer en afsluiting
- gecontroleerde levering;
- vastgelegde klantacceptatie;
- compleet opleverdossier;
- restpunten met eigenaar en termijn;
- as-built informatie;
- financiële afwikkeling en garantie-/onderhoudsgegevens.

---

## Vaste fasepoort voor alle zes fasen

Bij iedere faseovergang beoordeelt de regiehouder samenhangend:
1. inhoudelijke informatie en eisen compleet;
2. specialistische beoordelingen vastgelegd;
3. bevoegd akkoord aantoonbaar;
4. klant- en leveranciersafspraken sluiten op elkaar aan;
5. financiële en planningsgevolgen verwerkt;
6. juiste document- en modelversies beschikbaar;
7. blokkades opgelost of betrokken scope expliciet geblokkeerd.

Het projectoverzicht toont steeds: geldende informatiebasis, blokkerende punten, besluiten die nog niet zijn verwerkt, verschillen tussen klant- en leveranciersafspraken en actuele kosten-/planningsgevolgen.

## Wijzigingsprocedure — verplicht na iedere fase

1. **Registreren:** aanleiding, aanvrager, bron, gewenste oplossing en geraakte eisen/onderdelen.
2. **Gevolgen bepalen:** techniek, kwaliteit, maakbaarheid, raakvlakken, kosten, prijs, planning en contract.
3. **Besluiten:** vereiste goedkeuringen van klant, Thimo en leveranciers op basis van bevoegdheden.
4. **Verwerken:** broninformatie en formele afspraken bijwerken; nieuwe versies en wijzigingsoverzicht maken.
5. **Controleren:** afhankelijke informatie controleren en bepalen welke eerdere goedkeuringen opnieuw nodig zijn.
6. **Publiceren en vrijgeven:** nieuwe geldende set publiceren en ontvangst laten bevestigen; historie behouden.

## Minimale systeemregistraties

Eis/projectgegeven, vraagstuk, besluit, wijziging, leveranciersafspraak, controle, fasebesluit/vrijgave, AI-overdracht, document/model en audit-event. Elk record krijgt unieke identificatie, bron/context, status, eigenaar en versie-/historiegegevens waar relevant.

## Invoering en acceptatie

1. Kies één modulefamilie; richt moederinformatie, rollen, gegevens en fasecriteria in.
2. Beproef centrale gesprekken, besluiten en versies in een beperkt aantal projecten.
3. Voeg AI gericht toe voor intake, brongebonden antwoorden, vraagbundeling en overdracht.
4. Beproef CAD/IFC/BCF/IDS en andere uitwisseling met ontvangst- en inhoudscontroles.
5. Meet doorlooptijd, communicatierondes, ouderdom open punten, onverwerkte besluiten, volledigheid afsprakenpakketten, herstelwerk na vrijgave, AI-bronjuistheid en koppelingsfouten. Schaal pas op na vooraf vastgestelde acceptatiecriteria.

**Nog door Thimo365 te leveren:** gevalideerde productmaten en prestaties, actuele moederinformatie, echte kostprijs-/verkoopprijsgrondslagen, contractmodellen, bevoegdheden en mandaten, leveranciers-/specialistenregister, uitwisselafspraken, bewaartermijnen en concrete invoeringsplanning.
