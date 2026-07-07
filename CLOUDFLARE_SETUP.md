# 랜딩 Cloudflare Pages 이전 + 이메일 자동수집 설정

랜딩을 Cloudflare Pages로 옮기면 **별도 백엔드 없이** 랜딩에서 이메일이 자동 수집된다.
(HTTPS·방문분석도 무료로 딸려옴)

코드는 이미 준비됨:
- `functions/waitlist.js` — POST /waitlist 접수(D1 저장)
- `functions/admin-waitlist.js` — GET /admin-waitlist?key=... 로 조회(비밀키 보호)
- `schema.sql` — D1 테이블
- `index.html` — 폼이 같은 도메인 `/waitlist` 로 전송하도록 연결됨

## 사장님이 하실 설정 (한 번만)

### 1) Cloudflare 계정 + Pages 프로젝트
1. https://dash.cloudflare.com 가입/로그인
2. **Workers & Pages → Create → Pages → Connect to Git** → `hrgem01-hue/denky-landing` 선택
3. 빌드 설정: 프레임워크 없음(정적). Build command 비움, Output 디렉토리 `/` (또는 루트)
4. Deploy → `xxxx.pages.dev` 주소가 생김

### 2) D1 데이터베이스 만들기 + 테이블
Cloudflare 대시보드 또는 wrangler CLI:
```
npx wrangler d1 create ibeobwa-waitlist
npx wrangler d1 execute ibeobwa-waitlist --remote --file=schema.sql
```
(대시보드에서 만들 땐: Workers & Pages → D1 → Create → 이름 `ibeobwa-waitlist`,
 이후 Console 탭에서 schema.sql 내용을 붙여 실행)

### 3) Pages 프로젝트에 D1 바인딩 연결
Pages 프로젝트 → **Settings → Functions → D1 database bindings** →
- Variable name: **`DB`**  (코드가 env.DB 로 참조 — 이름 정확히)
- D1 database: `ibeobwa-waitlist`

### 4) 관리자 조회 비밀키 (선택)
Pages → Settings → Environment variables →
- `ADMIN_KEY` = 아무 긴 문자열(예: `openssl rand -hex 16` 결과)
- 이메일 목록 보기: `https://www.ibeobwa.com/admin-waitlist?key=<그 값>`

### 5) 도메인 연결 (www.ibeobwa.com)
Pages 프로젝트 → **Custom domains → Set up a custom domain → www.ibeobwa.com**
- 도메인 DNS를 Cloudflare로 옮기거나(권장, HTTPS 자동), 기존 DNS에 CNAME 안내대로 설정
- ⚠️ 현재 이 도메인은 GitHub Pages를 가리키니, Cloudflare로 바꾸면 GitHub Pages 대신 여기로 뜬다

## 끝나면
- 방문자가 이메일 남기면 → D1에 자동 저장
- `/admin-waitlist?key=...` 로 목록 확인 (또는 대시보드 D1 Console에서 `SELECT * FROM waitlist`)
- GitHub Pages(기존)는 그대로 두거나 정리해도 됨
