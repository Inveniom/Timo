# Thimo365 Next — productiechecklist

Deze herbouw blijft bewust op een aparte branch totdat de onderstaande punten zijn afgerond. De bestaande GitHub Pages-site en huidige Worker worden niet automatisch vervangen.

## Beveiligde Worker-configuratie

- `DEMO_MODE` staat in `ai-backend/wrangler.toml` standaard op `false`.
- Configureer in Cloudflare Workers secrets/vars:
  - `OPENAI_API_KEY` als secret.
  - `STAFF_ACCESS_CODE` als secret.
  - `CLIENT_ACCESS_CODES_JSON` als secret/var met project-ID's als keys.
  - `SUPPLIER_ACCESS_CODES_JSON` als secret/var met leverancier-ID's als keys.
  - `ALLOWED_ORIGIN=https://inveniom.github.io`.
  - `OPENAI_MODEL=gpt-4.1-mini` (of een door Thimo365 goedgekeurd model).
- Houd `DEMO_MODE=false` in productie. De CI-tests schakelen demo-modus uitsluitend lokaal in.
- De applicatie vraagt bij een 401 automatisch om de rolgebonden toegangscode; de code blijft alleen in het actieve browsertabblad in geheugen en wordt niet in localStorage opgeslagen.
- Test daarna de echte login per rol en één AI-gesprek met de productie-Worker. Een succesvolle browsermock is geen bewijs dat OpenAI in productie werkt.

## Documentopslag (nog te activeren)

De huidige documentpagina registreert metadata en externe links; er is nog geen beveiligde bestandskluis. Voor echte upload en versieopslag:

1. Maak in Cloudflare R2 een private bucket aan, bijvoorbeeld `thimo365-documents`.
2. Voeg aan de Worker-binding een R2-binding toe met de naam `DOCUMENTS` en bucket `thimo365-documents`.
3. Implementeer en test upload, download, versiebeheer, toegangscontrole per rol/project, maximale bestandsgrootte, toegestane bestandstypen, retentie en back-up.
4. Maak documenten standaard intern en concept; alleen een bevoegde medewerker mag ze na controle publiceren.

Zonder de bucket en binding mag documentopslag niet als operationeel worden beschouwd.

## CAD/BIM — huidige scope

De Worker bevat een medewerkers-only structurele preflight voor IFC, IDS en BCF via `POST /api/bim/validate`. Deze controleert alleen herkenbare basisstructuur:
- IFC: STEP-header, eindmarkering en FILE_SCHEMA.
- IDS: root-element, specifications-element en XML-namespace.
- BCF: ZIP-container-signatuur.

Dit is nadrukkelijk geen volledige IFC-schema-validatie, IDS-regeluitvoering, BCF-topicimport of modeluitwisseling. Voor productie zijn nog nodig: echte parsers/validators, versie- en schemaherkenning, mapping naar Thimo365-productgegevens, issue-/topicbeheer, import/export, round-triptests en koppeling met een BIM/CDE-platform.

## Project- en productdata

- Het totale aantal units uit stap 1 is leidend. De browser en Worker controleren dat de aantallen per bouwlaag samen exact het projecttotaal vormen.
- Productmaten, kostprijzen en verkoopprijzen zijn demodata of indicatief totdat Thimo365 ze formeel bevestigt.
- Controleer de demo-projecten, toegangsrechten, klantpublicatie en leverancierskoppelingen vóór migratie.

## Vrijgavecriteria

1. Alle GitHub Actions-tests slagen op de laatste PR-commit.
2. Productie-Worker is met echte secrets getest; geen API-sleutels in frontend of repository.
3. R2-upload/download en autorisatie zijn getest zodra de bucket bestaat.
4. IFC/IDS/BCF-scope is geaccepteerd of uitgebreid tot de vereiste productiestandaard.
5. Thimo365 heeft productmaten, financiële data, rollen en voorbeeldprojecten gevalideerd.
6. Pas daarna de PR beoordelen en bewust samenvoegen/publiceren.
