const PRE_APPLY_EMAIL = "mlsa002023@gmail.com";
const NAVER_BAND_URL = "https://band.us/@jointrun";
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
