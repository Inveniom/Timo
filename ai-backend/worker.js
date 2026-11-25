export default {
 async fetch(request, env) {
  const origin=request.headers.get("Origin")||"";
  const allowed=(env.ALLOWED_ORIGIN||"https://inveniom.github.io");
  const headers={"Access-Control-Allow-Origin":allowed,"Access-Control-Allow-Methods":"POST, OPTIONS","Access-Control-Allow-Headers":"Content-Type","Vary":"Origin","Content-Type":"application/json; charset=utf-8","Cache-Control":"no-store"};
  if(origin!==allowed) return new Response(JSON.stringify({error:"Origin niet toegestaan"}),{status:403,headers});
  if(request.method==="OPTIONS") return new Response(null,{status:204,headers});
  if(request.method!=="POST") return new Response(JSON.stringify({error:"Alleen POST"}),{status:405,headers});
  if(!env.OPENAI_API_KEY) return new Response(JSON.stringify({error:"AI-sleutel ontbreekt op de server"}),{status:503,headers});
  const size=Number(request.headers.get("content-length")||0);
  if(size>30000) return new Response(JSON.stringify({error:"Verzoek te groot"}),{status:413,headers});
  let data;try{data=await request.json()}catch{return new Response(JSON.stringify({error:"Ongeldige JSON"}),{status:400,headers})}
  const messages=Array.isArray(data.messages)?data.messages.slice(-18):[];
  if(!messages.length||messages.some(m=>!["user","assistant"].includes(m.role)||typeof m.content!=="string"||m.content.length>3500))return new Response(JSON.stringify({error:"Ongeldige gespreksgeschiedenis"}),{status:400,headers});
  const system=`Je bent de Thimo365 AI-ontwerpagent voor een eerste, niet-bindende verkenning van modulaire woningbouw in Nederland. Spreek Nederlands. Stel maximaal één gerichte vervolgvraag per beurt. Vraag naar programma, aantal woningen, doelgroep, locatie, perceelafmetingen, gewenste woonoppervlakte, planning en budget, maar alleen als relevant. Werk toe naar een helder voorstel. De volgende productgegevens komen uit eerdere openbare inventarisatie en zijn NIET technisch gevalideerd: Thimo265 circa 42 m² BVO en 8,0 m lengte; Thimo365 circa 55 m² BVO en 10,4 m; Thimo465 circa 69,4 m² BVO en 12,9 m. Beukmaat circa 5,4 m onbevestigd. Noem deze gegevens indicatief. Je hebt geen kaart-, kadastrale, omgevingsplan- of vergunningtool. Doe geen uitspraken alsof je actuele locatiegegevens hebt onderzocht. Verzin geen prijzen, kavelmaten, vergunninguitslagen of technische prestaties. Geef nooit een bindende offerte of maatvaste schets. Vermijd persoonsgegevens en vraag geen contactgegevens. Als informatie ontbreekt, benoem dat. Wanneer voldoende input is verzameld, geef een voorstel met kopjes: Uitgangspunten, Voorkeursvariant, Alternatieven, Indicatieve productsom BVO, Ontwerp- en locatieonderzoek, Kostenposten zonder bedragen, Volgende stap. Maak expliciet wat geverifieerd moet worden.`;
  const body={model:env.OPENAI_MODEL||"gpt-4.1-mini",input:[{role:"developer",content:system},...messages.map(m=>({role:m.role,content:m.content}))],max_output_tokens:750,store:false};
  try{
   const upstream=await fetch("https://api.openai.com/v1/responses",{method:"POST",headers:{"Authorization":"Bearer "+env.OPENAI_API_KEY,"Content-Type":"application/json"},body:JSON.stringify(body)});
   const raw=await upstream.json();
   if(!upstream.ok)return new Response(JSON.stringify({error:"AI-dienst tijdelijk niet beschikbaar",code:upstream.status}),{status:502,headers});
   const answer=(raw.output||[]).flatMap(x=>x.content||[]).filter(x=>x.type==="output_text").map(x=>x.text).join("\n").trim();
   return new Response(JSON.stringify({answer:answer||"Geen antwoord ontvangen."}),{status:200,headers});
  }catch{return new Response(JSON.stringify({error:"Verbinding met AI-dienst mislukt"}),{status:502,headers})}
 }
};