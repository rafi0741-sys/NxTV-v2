const OS = "https://api.opensubtitles.com/api/v1";

function srtToVtt(s) {
  return "WEBVTT\n\n" + s
    .replace(/\r/g, "")
    .replace(/^\d+\n(?=\d{2}:)/gm, "")
    .replace(/(\d{2}:\d{2}:\d{2}),(\d{3})/g, "$1.$2");
}

export default async (req) => {
  const cors = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });

  try {
    const apiKey = process.env.OPENSUBTITLES_API_KEY;
    if (!apiKey) return Response.json({ error: "Subtitle service not configured" }, { status: 500, headers: cors });

    const H = { "Api-Key": apiKey, "User-Agent": "NXTV v1.0", "Content-Type": "application/json" };
    const body = await req.json();

    if (body.action === "search") {
