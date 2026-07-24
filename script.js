const PRE_APPLY_EMAIL = "mlsa002023@gmail.com";
const NAVER_BAND_URL = "https://band.us/@jointrun";

// ─────────────────────────────────────────────
// 앱으로 보내는 CTA의 목적지. 홈페이지의 모든 앱 진입 버튼(data-app-link)이 이 값을 쓴다.
//
// 대표 검수(UAT) 때는 이 한 줄만 RC1 앱 Preview 주소로 바꾸면 헤더/히어로/가격/하단 고정
// CTA가 한꺼번에 그쪽을 가리킨다. Vercel이 브랜치별로 만들어주는 고정 Preview 주소는
//   https://jointrun-app-git-feat-v9-design-integration-<팀슬러그>.vercel.app
// 형태이며, 정확한 값은 Vercel 대시보드 Deployments 탭에서 확인할 수 있다
// (docs/uat-preview-setup-runbook.md 3번 참고 — 이 저장소에는 Vercel 접근 권한이 없어
//  실제 주소를 여기에 미리 박아둘 수 없다).
//
// 기본값은 기존에 동작하던 앱 주소를 그대로 유지한다 — 잘못 추측한 주소를 넣어 링크가
// 깨지는 것보다 낫다.
const APP_URL = "https://jointrun-app.vercel.app/";

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
