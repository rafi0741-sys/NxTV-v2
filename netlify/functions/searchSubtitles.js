export default async (req) => {
  const cors = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });

  try {
    const apiKey = process.env.OPENSUBTITLES_API_KEY;
    if (!apiKey) {
      return Response.json({ error: "Subtitle service not configured" }, { status: 500, headers: cors });
    }

    const body = await req.json();
    const { action } = body;

    if (action === "search") {
      const { query, language = "en", season, episode } = body;
      if (!query) return Response.json({ error: "Missing query" }, { status: 400, headers: cors });

      const params = new URLSearchParams({ query, languages: language });
      if (season) params.set("season_number", String(season));
      if (episode) params.set("episode_number", String(episode));

      const r = await fetch(`https://api.opensubtitles.com/api/v1/subtitles?${params}`, {
        headers: { "Api-Key": apiKey, "User-Agent": "NXTV v1.0", "Content-Type": "application/json" },
      });
      return Response.json(await r.json(), { headers: cors });
    }

    if (action === "download") {
      const { file_id } = body;
      const r = await fetch("https://api.opensubtitles.com/api/v1/download", {
        method: "POST",
        headers: { "Api-Key": apiKey, "User-Agent": "NXTV v1.0", "Content-Type": "application/json" },
        body: JSON.stringify({ file_id }),
      });
      return Response.json(await r.json(), { headers: cors });
    }

    return Response.json({ error: "Unknown action" }, { status: 400, headers: cors });
  } catch (e) {
    return Response.json({ error: String(e) }, { status: 500, headers: cors });
  }
};
