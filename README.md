# 입어봐 랜딩 페이지

AI 가상피팅 패션 커머스 **입어봐(ibeobwa)**의 출시 준비 랜딩 페이지입니다.
의존성 없는 단일 `index.html` + `img/` 자산 — 어떤 정적 호스트에도 그대로 올라갑니다.

- 도메인: **www.ibeobwa.com**
- 브랜드: 블루(#3E95EC) 액션 + 코랄 로고, 서체 Pretendard (앱과 동일한 디자인 토큰)

## 로컬에서 보기
```bash
python -m http.server 5502 --bind 127.0.0.1 --directory .
# http://127.0.0.1:5502
```

## 배포

### Cloudflare Pages (권장)
1. 이 저장소를 Cloudflare Pages 프로젝트에 연결 → push마다 자동 배포
2. 커스텀 도메인에 **www.ibeobwa.com** 연결 (apex `ibeobwa.com`은 www로 301 리다이렉트)
3. 무료·대역폭 무제한·자동 HTTPS — 마케팅 트래픽 스파이크에 안전

### GitHub Pages / Netlify
- GitHub Pages: Settings → Pages → Source `main` / `/(root)` → 커스텀 도메인 연결
- Netlify: 이 폴더를 드래그&드롭

## 사전예약(출시 알림) 이메일 수집
`index.html` 안의 `FORM_ENDPOINT` 가 비어 있으면 입력값을 브라우저에만 임시 저장합니다.
실제 수집은 둘 중 하나로 연결하세요.
- 백엔드에 `POST /waitlist` 를 만들어 연결(권장 — 데이터 우리 소유)
- 또는 **Formspree**(https://formspree.io) 무료 폼 URL을 `FORM_ENDPOINT`에 붙여넣기

## 배포 전 채울 것 (index.html 내 TODO)
- 푸터 **사업자 정보**(상호·대표·사업자등록번호·통신판매업 신고번호·주소·연락처)
- **이용약관 / 개인정보처리방침** 페이지(`/terms`, `/privacy`)
- **공유용 OG 이미지** 1200×630 전용 제작 후 교체
- 앱이 스토어 출시되면 히어로 CTA를 사전예약 → **스토어 다운로드 배지**로 교체

> ⚠️ 이 저장소에는 랜딩 페이지만 둡니다. API 키(.env)·백엔드·앱 코드는 절대 올리지 마세요.
