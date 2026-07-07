// Cloudflare Pages Function — 랜딩 '출시 알림' 사전등록 이메일을 D1(무료 DB)에 저장한다.
// 이 함수는 랜딩과 같은 도메인(www.ibeobwa.com/waitlist)에서 돌아, 별도 백엔드 서버가 필요 없다.
// 설정: Cloudflare Pages 프로젝트에 D1 데이터베이스를 만들고 바인딩 이름을 'DB' 로 연결.

// POST /waitlist  { email, source? }  →  { ok: true }
export async function onRequestPost(context) {
  const { request, env } = context;
  try {
    const body = await request.json().catch(() => ({}));
    const email = (body.email || "").trim().toLowerCase();
    // 이메일 형식 간단 검증
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return json({ ok: false, error: "invalid_email" }, 400);
    }
    const source = String(body.source || "landing").slice(0, 40);
    // INSERT OR IGNORE — email UNIQUE 라 중복은 조용히 무시(멱등)
    await env.DB.prepare(
      "INSERT OR IGNORE INTO waitlist (email, source, created_at) VALUES (?, ?, ?)"
    ).bind(email, source, new Date().toISOString()).run();
    return json({ ok: true });
  } catch (e) {
    return json({ ok: false, error: "server_error" }, 500);
  }
}

// GET /waitlist 로는 접수하지 않음
export async function onRequestGet() {
  return json({ ok: false, error: "use_post" }, 405);
}

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
