// Cloudflare Pages Function — 모인 이메일을 조회한다. (비밀 토큰 보호)
// GET /admin-waitlist?key=<ADMIN_KEY>   →  { count, items:[{email,source,created_at}] }
// 설정: Pages 프로젝트 환경변수에 ADMIN_KEY 를 넣고, 그 값을 ?key= 로 보내야 열린다.

export async function onRequestGet(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const key = url.searchParams.get("key") || "";
  if (!env.ADMIN_KEY || key !== env.ADMIN_KEY) {
    return json({ ok: false, error: "unauthorized" }, 401);
  }
  const rows = await env.DB.prepare(
    "SELECT email, source, created_at FROM waitlist ORDER BY created_at DESC LIMIT 5000"
  ).all();
  const items = rows.results || [];
  return json({ ok: true, count: items.length, items });
}

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
