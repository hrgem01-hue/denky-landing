# Denky 랜딩 페이지

가상피팅 패션 커머스 **Denky**의 출시 준비(Coming Soon) 랜딩 페이지입니다.
의존성 없는 단일 `index.html` — 어떤 정적 호스트에도 그대로 올라갑니다.

## 로컬에서 보기
```bash
python -m http.server 5000
# http://localhost:5000
```

## 배포

### GitHub Pages
1. 이 저장소를 GitHub에 push
2. **Settings → Pages → Source: `main` 브랜치 / `/ (root)`**
3. `https://<아이디>.github.io/<저장소이름>/` 로 공개
4. (선택) 같은 화면에서 커스텀 도메인 + HTTPS 연결

### Cloudflare Pages / Netlify
이 폴더를 드래그&드롭하면 즉시 배포됩니다. (git 불필요)

## 사전예약(출시 알림) 이메일 받기
`index.html` 안의 `FORM_ENDPOINT` 가 비어 있으면 입력값을 브라우저에만 임시 저장합니다.
실제 수집은 둘 중 하나로 연결하세요.
- **Formspree**(https://formspree.io) 무료 폼 URL을 `FORM_ENDPOINT`에 붙여넣기
- 또는 백엔드에 `/waitlist` 엔드포인트를 만들어 연결

> ⚠️ 이 저장소에는 랜딩 페이지만 둡니다. API 키(.env)·백엔드·앱 코드는 절대 올리지 마세요.
