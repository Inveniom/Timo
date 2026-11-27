# Thimo365 gegevensmodel en autorisaties

## 1. Eén centrale informatiebasis
De centrale projectdatabase bewaart moederinformatie en projectinformatie als afzonderlijke records. Een project verwijst naar de gebruikte module-identificatie en versie; wijzigingen aan de moederinformatie veranderen lopende projecten niet automatisch.

## 2. Kernregistraties
| Registratie | Sleutelvelden | Relatie / beheer |
|---|---|---|
| Klant | klant-ID, naam, organisatie, contact | Eén klant kan meerdere projecten hebben |
| Project | project-ID, klant-ID, code, fase, status, locatie | Centrale projectcontainer |
| Product/module | module-ID, code, versie, status, eigenaar | Moederinformatie; productbeheerder beheert |
| Kostprijsregel | regel-ID, module/onderdeel, eenheid, kostprijs, geldigheid | Alleen intern zichtbaar |
| Verkoopprijsregel | regel-ID, module/onderdeel, eenheid, verkoopprijs, geldigheid | Klantweergave alleen als vrijgegeven en toepasselijk |
| Eis/projectgegeven | eis-ID, inhoud, bron, context, module/object, eigenaar, status, verificatie | Koppelt klantvraag aan ontwerp en controle |
| Vraagstuk | vraag-ID, project/fase, eis/object, bronversie, eigenaar, termijn, blokkering, antwoord | Status volgt de procesketen |
| Besluit | besluit-ID, tekst, beslisser, bevoegdheid, datum, onderbouwing, gevolgen | Besluit en verwerking zijn afzonderlijk |
| Wijziging | wijzigings-ID, aanleiding, oud/nieuw, geraakte eisen/versies, geld/tijd, akkoord, bewijs | Formele wijzigingsprocedure |
| Leveranciersafspraak | leverancier, scope, uitsluitingen, eisen, versies, raakvlakken, prijs, planning, bevestiging | Per leverancier en fase |
| Controle | omvang, methode, versie, beoordelaar, resultaat, afwijkingen, vervolgactie | Controlebewijs voor faseovergang |
| Fasebesluit/vrijgave | fase, scope, pakket-ID, versies, criteria, restpunten, goedkeurder, ontvangst | Expliciet besluit; geen stilzwijgende vrijgave |
| AI-overdracht | oorspronkelijke vraag, bronnen, onzekerheid, ontbrekende gegevens, gevolgen, medewerker, terugkoppeling | Herleidbaar naar bronvraag |
| Document/model | ID, bestand, versie, status, eigenaar, doelgroep, bronrelatie | Nieuwe upload overschrijft geldende set niet |
| Audit-event | actor/rol, handeling, record, datum, gevolg | Historie en herleidbaarheid |

## 3. Financiële scheiding
- Kostprijs: interne inkoop-/realisatiebasis.
- Verkoopprijs: prijsgrondslag voor klantaanbod.
- Offerteprijs: projectgebonden aangeboden bedrag.
- Contractprijs: formeel overeengekomen bedrag.
- Geldigheid, aannames, btw-behandeling en goedkeurder horen bij de prijsregistratie.
- De klant- en leveranciersresponses bevatten geen interne kostprijs, marge of andere leveranciersoffertes.

## 4. Rollen en toegangsrechten
| Rol | Lezen | Schrijven | Besluiten |
|---|---|---|---|
| Klant | Eigen project, gepubliceerde documenten, eigen prijzen en voortgang | Eigen projectinvoer, vragen en reacties | Eigen keuzes en contractakkoord binnen klantbevoegdheid |
| Thimo-regiehouder | Projectbreed, inclusief kosten en leveranciersafspraken | Projectregie, vraagstukken, wijzigingen, planning | Fasebesluiten binnen mandaat |
| Productbeheerder | Moederinformatie en producthistorie | Modules, opties, productversies | Nieuwe standaardversies en afwijkingen binnen mandaat |
| Specialist | Toegewezen technische onderdelen en versies | Eigen beoordelingen en controles | Vakinhoudelijke beoordeling binnen opdracht |
| Leverancier | Alleen toegewezen scope en geldende bronversies | Eigen documenten, voortgang, controles en afwijkingen | Bevestigt eigen maakbaarheid, prijs, planning en ontvangst |
| Financieel/contractueel bevoegd | Financiële en contractuele informatie | Calculatie- en contractregistraties | Prijs, contract en financiële gevolgen binnen mandaat |
| AI | Alleen toegankelijke geldende bronnen | Concepten, samenvattingen en overdrachten | Geen bindende besluiten of vrijgaven |

## 5. Status- en versiebeheer
Documenten en gegevens: concept → ter beoordeling → goedgekeurd → vrijgegeven → vervallen.
Vraagstukken: open → in behandeling → ter besluitvorming → besloten → verwerkt → gecontroleerd → gesloten.
Een besluit is pas verwerkt wanneer de broninformatie is bijgewerkt en gecontroleerd. De exacte versie blijft gekoppeld aan opmerkingen, goedkeuringen en contractstukken.

## 6. Fasepoorten
Elke faseovergang controleert minimaal:
1. Inhoudelijke informatie en eisen zijn compleet.
2. Vereiste specialistische beoordelingen zijn vastgelegd.
3. Bevoegd akkoord is aantoonbaar.
4. Klant- en leveranciersscope sluiten op elkaar aan.
5. Financiële en planningsgevolgen zijn verwerkt.
6. Juiste document- en modelversies zijn beschikbaar.
7. Blokkerende punten zijn opgelost of de betrokken scope blijft geblokkeerd.

Productievrijgave vraagt bovendien een uniek productiepakket, expliciete goedkeuring door Thimo en ontvangstbevestiging van de leverancier voor exact die versies.

## 7. Implementatiegrens van deze eerste rebuild
De eerste codeversie legt de basis voor centrale records, rolgefilterde views, projectvragen, besluiten, product- en prijsregels, opdrachten en audit-events. De volledige registraties voor eisen, formele wijzigingen, leveranciersafspraken, controles, vrijgavepakketten, documentenopslag en versie-vergelijking worden stapsgewijs ontsloten in de volgende iteraties. Er worden geen productprestaties, maatvoeringen, juridische controles of echte prijzen afgeleid uit de procesnotitie.
