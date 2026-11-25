# Thimo365 AI-ontwerpagent: activeren
De GitHub Pages pagina /ontwerpwizard.html bevat nu een AI-chat. Deze werkt pas na het uitrollen van de beveiligde backend. De browser mag nooit een OpenAI API-sleutel bevatten.

## Backend uitrollen
1. Maak een Cloudflare Workers project aan en gebruik de inhoud van worker.js als Worker-code.
2. Voeg in Cloudflare Workers Settings een **Secret** toe met naam OPENAI_API_KEY en de eigen API-sleutel. Plaats die nooit in GitHub.
3. Voeg als environment variable ALLOWED_ORIGIN toe met waarde https://inveniom.github.io.
4. Optioneel: OPENAI_MODEL met een model dat voor het API-account beschikbaar is, standaard gpt-4.1-mini.
5. Publiceer de Worker en kopieer de HTTPS-URL.
6. Open https://inveniom.github.io/Timo/ontwerpwizard.html en plak de Worker-URL in AI-serveradres. Daarna kan het gesprek beginnen.

## Beperkingen en veiligheid
- De Worker verwerkt een gespreksgeschiedenis van maximaal 18 berichten en vraagt de Responses API om een antwoord. store:false beperkt opslag door de API, maar is geen volledige privacygarantie.
- Origincontrole en CORS zijn **geen authenticatie** en voorkomen geen directe externe verzoeken. Voor productie: Cloudflare rate limiting, botbescherming, toegangsbeheer, kostenplafonds, loggingbeleid en server-side quota toevoegen.
- Voer geen herleidbare klantgegevens, vertrouwelijke prijsbladen of contractgegevens in zolang een gegevensbeschermingstoets en verwerkersafspraken ontbreken.
- Productinformatie in de prompt is ongevalideerd; locatie-, vergunning- en prijstoetsing zijn niet aangesloten. Er wordt geen maatvaste tekening gegenereerd.
- De bestaande deterministische wizard en het projectvoorstel staan los van de AI-chat. Synchronisatie tussen gesprek en ontwerpresultaat vereist een volgende integratiestap.
- Geen centrale kennisbank of automatische retrieval: de huidige medewerkerrecords blijven lokaal in de browser.
- Test de Worker eerst met niet-vertrouwelijke fictieve projecten voordat deze publiek gebruikt wordt.
