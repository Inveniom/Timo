export default {
  async fetch(request, env) {
    const allowed = env.ALLOWED_ORIGIN || "https://inveniom.github.io";
    const origin = request.headers.get("Origin") || "";
    const headers = {
      "Access-Control-Allow-Origin": allowed,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Vary": "Origin",
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store"
    };
    const json = (body, status = 200) => new Response(JSON.stringify(body), { status, headers });
    if (origin !== allowed) return json({ error: "Origin niet toegestaan" }, 403);
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers });
    if (request.method !== "POST") return json({ error: "Alleen POST" }, 405);
    if (!env.OPENAI_API_KEY) return json({ error: "AI-sleutel ontbreekt op de server" }, 503);

    const size = Number(request.headers.get("content-length") || 0);
    if (size > 40000) return json({ error: "Verzoek te groot" }, 413);
    let data;
    try { data = await request.json(); } catch { return json({ error: "Ongeldige JSON" }, 400); }

    const messages = Array.isArray(data.messages) ? data.messages.slice(-18) : [];
    if (!messages.length || messages.some(m =>
      !["user", "assistant"].includes(m.role) ||
      typeof m.content !== "string" || !m.content.trim() || m.content.length > 3500
    )) return json({ error: "Ongeldige gespreksgeschiedenis" }, 400);

    const knowledge = typeof data.knowledge === "string" ? data.knowledge.slice(0, 10000) : "";
    const system = `Je bent de Thimo365 AI-projectassistent voor een eerste, niet-bindende verkenning van modulaire woningbouw in Nederland. Spreek helder Nederlands en stel maximaal één gerichte vervolgvraag per beurt. Help met programma, aantal woningen, doelgroep, locatie, perceel, woonoppervlakte, planning, budget en vervolgstappen.
Productinformatie uit eerdere inventarisatie (NIET technisch gevalideerd): Thimo265 circa 42 m² BVO en 8,0 m lengte; Thimo365 circa 55 m² BVO en 10,4 m; Thimo465 circa 69,4 m² BVO en 12,9 m. Beukmaat circa 5,4 m is onbevestigd. Noem deze gegevens uitsluitend indicatief.
Je hebt geen kaart-, kadastrale, omgevingsplan-, vergunning-, actuele web- of prijstool. Doe nooit alsof je die controles hebt uitgevoerd. Verzin geen prijzen, kavelmaten, vergunninguitslagen, technische prestaties of garanties. Geef geen bindende offerte of maatvaste schets. Vraag niet om persoonsgegevens of contactgegevens. Benoem ontbrekende informatie en wat door een deskundige moet worden geverifieerd.
Wanneer voldoende informatie beschikbaar is, structureer het voorstel met: Uitgangspunten, Voorkeursvariant, Alternatieven, Indicatieve productsom BVO, Ontwerp- en locatieonderzoek, Kostenposten zonder bedragen, Volgende stap.
${knowledge ? "\n\nKENNISBANKCONTEXT (bronvermeldingen zijn indicatief; presenteer dit niet als onafhankelijk gevalideerd):\n" + knowledge : ""}`;
    const body = {
      model: env.OPENAI_MODEL || "gpt-4.1-mini",
      input: [{ role: "developer", content: system }, ...messages],
      max_output_tokens: 1000,
      store: false
    };
    try {
      const upstream = await fetch("https://api.openai.com/v1/responses", {
        method: "POST",
        headers: { "Authorization": "Bearer " + env.OPENAI_API_KEY, "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      const raw = await upstream.json();
      if (!upstream.ok) {
        console.error("OpenAI Responses API error", upstream.status, raw?.error?.type || "");
        return json({ error: "AI-dienst tijdelijk niet beschikbaar", code: upstream.status }, 502);
      }
      const answer = (raw.output || []).flatMap(x => x.content || [])
        .filter(x => x.type === "output_text").map(x => x.text).join("\n").trim();
      return json({ answer: answer || "Geen antwoord ontvangen." });
    } catch (error) {
      console.error("AI request failed", error?.name || "unknown");
      return json({ error: "Verbinding met AI-dienst mislukt" }, 502);
    }
  }
};
