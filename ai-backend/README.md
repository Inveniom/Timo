# Timo AI-agent — automatische Cloudflare-uitrol

De AI-agent draait als Cloudflare Worker. De browser bevat nooit de OpenAI API-sleutel.

## Eenmalige GitHub-inrichting

Voeg in GitHub bij **Inveniom/Timo → Settings → Secrets and variables → Actions** deze drie repository secrets toe:

1. `CLOUDFLARE_API_TOKEN`: Cloudflare API-token met minimaal Workers Scripts: Edit en Account: Read voor het juiste account.
2. `CLOUDFLARE_ACCOUNT_ID`: het Cloudflare Account ID.
3. `OPENAI_API_KEY`: de geheime API-sleutel van het OpenAI API-platform (niet een ChatGPT-wachtwoord).

Daarna wordt de Worker automatisch uitgerold bij een wijziging in `ai-backend/`, of handmatig via GitHub → Actions → Deploy Timo AI Worker → Run workflow.

## Worker-adres instellen in Timo

Na de eerste succesvolle workflow toont Wrangler de Worker-URL, normaal gesproken:
`https://timo-agent.<jouw-workers.dev-subdomein>.workers.dev`

Open de Timo-app op GitHub Pages, ga naar **AI-assistent** en plak dit HTTPS-adres in het veld **Cloudflare Worker-adres**. Het adres wordt alleen in de browser opgeslagen; er staat geen API-sleutel in de pagina.

## Belangrijk

- De toegestane browser-origin staat op `https://inveniom.github.io`.
- De agent kan algemene kennisbankrecords als context ontvangen, maar lokale projectgegevens en chats worden niet centraal opgeslagen.
- CORS/origincontrole is geen authenticatie. Stel voor openbaar productiegebruik Cloudflare rate limiting, kostenlimieten en aanvullende toegangsbeveiliging in.
- Gebruik geen persoonsgegevens of vertrouwelijke documenten zolang privacy- en beveiligingsafspraken niet zijn ingericht.
- Technische productinformatie is indicatief en moet door de leverancier worden bevestigd.
