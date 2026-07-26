# JOINTRUN Homepage

JOINTRUN homepage for `www.jointrun.kr`.

## Files

- `index.html`
- `styles.css`
- `script.js`

## Notes

- Survey buttons open the Google Form configured in `script.js`.
- Naver Band button opens `https://band.us/@jointrun`.
- Pre-application form opens an email to `mlsa002023@gmail.com`.

## 앱 진입 CTA / 멘토용 QR 대상 주소

모든 앱 진입 버튼(`data-app-link`)과 멘토 배포용 QR은 `script.js`의 `APP_URL` 한 곳을 쓴다.

| 용도 | 주소 |
|---|---|
| 운영 (평상시 기본값) | `https://jointrun-app.vercel.app/` |
| **Staging UAT (공식)** | `https://jointrun-staging.firebaseapp.com/` |
| Staging 보조 주소 | `https://jointrun-staging.web.app/` — QR·CTA에 쓰지 않음 |

UAT로 전환할 때는 `script.js`에서 `const APP_URL = PRODUCTION_APP_URL;`을
`const APP_URL = STAGING_APP_URL;`로 바꾸고, 끝나면 반드시 되돌린다.
공개 홈페이지에 그대로 반영되므로 UAT 기간에만 의도적으로 전환한다.

Staging은 반드시 `firebaseapp.com`을 쓴다 — 앱과 Firebase 인증 도우미(`/__/auth/*`)가 같은
출처여야 Safari에서 Google 로그인 결과가 앱으로 정상 복귀한다.

## Archive

- `_archive/JointrunLanding.pre-v9.jsx.txt` — pre-V9 design reference containing old Finger Health
  Score copy. Kept for history only; renamed to `.txt` so it's excluded from any `*.jsx` search or
  build. Do not restore or reference it.
