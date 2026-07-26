const PRE_APPLY_EMAIL = "mlsa002023@gmail.com";
const NAVER_BAND_URL = "https://band.us/@jointrun";

// ─────────────────────────────────────────────
// 앱으로 보내는 CTA의 목적지. 홈페이지의 모든 앱 진입 버튼(data-app-link)이 이 값을 쓴다.
// 멘토 배포용 QR도 같은 주소를 쓴다.
//
// 대표 검수(UAT)로 전환할 때는 APP_URL을 STAGING_APP_URL로 바꾸면 헤더/히어로/가격/하단
// 고정 CTA가 한꺼번에 그쪽을 가리킨다. 되돌릴 때는 PRODUCTION_APP_URL로 되돌린다.
//
// 주의: 이 파일은 공개 홈페이지에 그대로 반영된다. STAGING으로 바꾸면 홈페이지를 방문한
// 모든 사람이 검수용 Staging 앱(운영과 분리된 별도 Firebase 프로젝트)으로 들어간다.
// UAT 기간에만 의도적으로 전환하고, 끝나면 반드시 운영 주소로 되돌린다.

// 운영 앱 (평상시 기본값)
const PRODUCTION_APP_URL = "https://jointrun-app.vercel.app/";

// JOINTRUN Staging 공식 UAT 주소 (RC1.2.2에서 확정).
// 반드시 firebaseapp.com을 쓴다 — 앱과 Firebase 인증 도우미(/__/auth/*)가 같은 출처여야
// Safari에서 Google 로그인 결과가 앱으로 정상 복귀한다.
// jointrun-staging.web.app은 같은 사이트를 가리키는 보조 주소일 뿐이므로 QR·CTA에 쓰지 않는다.
const STAGING_APP_URL = "https://jointrun-staging.firebaseapp.com/";

const APP_URL = PRODUCTION_APP_URL;

document.querySelectorAll("[data-app-link]").forEach((link) => {
  link.href = APP_URL;
});
const GOOGLE_SURVEY_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfnoCrl9vTUzSfNslEB7y1ub3MLIswrnD7-mBvTb5ZGPE6ZaA/viewform";

const bandLink = document.querySelector("#bandLink");
bandLink.href = NAVER_BAND_URL;

document.querySelectorAll("#heroSurveyLink, #applySurveyLink").forEach((link) => {
  if (GOOGLE_SURVEY_URL) {
    link.href = GOOGLE_SURVEY_URL;
    return;
  }

  link.removeAttribute("target");
  link.addEventListener("click", (event) => {
    event.preventDefault();
    alert("구글폼 설문조사 링크가 준비되면 바로 연결됩니다.");
  });
});

document.querySelector("#applyForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const form = new FormData(event.currentTarget);
  const name = String(form.get("name") || "").trim();
  const contact = String(form.get("contact") || "").trim();
  const pain = String(form.get("pain") || "").trim();

  const subject = encodeURIComponent("[JOINTRUN 사전신청] " + name);
  const body = encodeURIComponent(
    [
      "JOINTRUN 사전신청",
      "",
      `이름: ${name}`,
      `연락처/이메일: ${contact}`,
      "",
      "가장 불편한 순간:",
      pain || "작성하지 않음",
    ].join("\n"),
  );

  window.location.href = `mailto:${PRE_APPLY_EMAIL}?subject=${subject}&body=${body}`;
  document.querySelector("#formNote").textContent =
    "메일 앱이 열리지 않으면 mlsa002023@gmail.com 로 이름과 연락처를 보내주세요.";
});

const revealTargets = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 },
);
revealTargets.forEach((target) => revealObserver.observe(target));
