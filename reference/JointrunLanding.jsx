/* Reference only — not built or imported by this site. index.html/styles.css/script.js are the real implementation. */
import React, { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Hand,
  Move,
  Scale,
  Droplets,
  BatteryCharging,
  CalendarCheck,
  ScanLine,
  Cpu,
  LineChart as LineChartIcon,
  History,
  Sparkles,
  ChevronRight,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Design tokens                                                      */
/*  Primary   #2563EB   Accent  #06B6D4                                */
/*  Background #FFFFFF  Gray    #F8FAFC                                */
/* ------------------------------------------------------------------ */

/* ------------------------------------------------------------------ */
/*  Config — replace with the deployed app URL before shipping         */
/* ------------------------------------------------------------------ */

const APP_URL = "https://jointrun-app.vercel.app";
const BAND_URL = "https://band.us/@jointrun";

const FONT_IMPORT = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap');
`;

/* ------------------------------------------------------------------ */
/*  Scroll reveal primitive                                            */
/* ------------------------------------------------------------------ */

function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(node);
        }
      },
      { threshold }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
}

function FadeUp({ children, delay = 0, className = "" }) {
  const [ref, inView] = useInView(0.15);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0px)" : "translateY(24px)",
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Signature element: Measurement Readout Ring                        */
/*  A radial instrument-cluster motif used in hero + score section     */
/*  — echoes the brand thesis "measure, don't guess."                  */
/* ------------------------------------------------------------------ */

function ReadoutRing({ value, size = 116, stroke = 9, color = "#2563EB", track = "#E2E8F0" }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={track} strokeWidth={stroke} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeDasharray={c}
        strokeDashoffset={offset}
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Nav                                                                 */
/* ------------------------------------------------------------------ */

function Nav() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-white/80 border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#2563EB] flex items-center justify-center">
            <span className="text-white text-[13px] font-extrabold tracking-tight" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              J
            </span>
          </div>
          <span className="text-[15px] font-bold tracking-tight text-slate-900">JOINTRUN</span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-[14px] font-medium text-slate-500">
          <a href="#why" className="hover:text-slate-900 transition-colors">왜 측정해야 할까요</a>
          <a href="#score" className="hover:text-slate-900 transition-colors">Finger Health Score</a>
          <a href="#how" className="hover:text-slate-900 transition-colors">측정 방법</a>
          <a href="#future" className="hover:text-slate-900 transition-colors">로드맵</a>
        </nav>
        <a
          href={APP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[14px] font-semibold text-white bg-[#2563EB] px-4 py-2 rounded-full hover:bg-blue-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#2563EB]"
        >
          무료로 시작하기
        </a>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero                                                                */
/* ------------------------------------------------------------------ */

function Hero() {
  return (
    <section className="relative pt-40 pb-28 px-6 overflow-hidden">
      <div
        className="absolute -top-32 right-[-10%] w-[560px] h-[560px] rounded-full opacity-[0.07] blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #06B6D4 0%, transparent 70%)" }}
      />
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <FadeUp>
          <div className="inline-flex items-center gap-1.5 text-[12px] font-semibold tracking-wide text-[#2563EB] bg-blue-50 rounded-full px-3 py-1.5 mb-7" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            <ScanLine className="w-3.5 h-3.5" strokeWidth={2.4} />
            HAND JOINT MEASUREMENT
          </div>
          <h1 className="text-[44px] md:text-[56px] leading-[1.08] font-extrabold tracking-tight text-slate-900">
            손 건강, 이제<br />느낌이 아니라<br />데이터로 측정하세요.
          </h1>
          <p className="mt-7 text-[17px] leading-[1.7] text-slate-500 max-w-md">
            혈압은 혈압계로 측정합니다.
            <br />
            혈당은 혈당계로 측정합니다.
            <br />
            <span className="text-slate-700 font-medium">이제 손 건강도 JOINTRUN으로 측정합니다.</span>
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href={APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[15px] font-semibold text-white bg-[#2563EB] pl-6 pr-5 py-3.5 rounded-full hover:bg-blue-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#2563EB]"
            >
              무료로 시작하기
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#how"
              className="inline-flex items-center gap-2 text-[15px] font-semibold text-slate-600 px-6 py-3.5 rounded-full border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-300"
            >
              데모 보기
            </a>
          </div>
        </FadeUp>

        <FadeUp delay={150}>
          <PhoneMockup />
        </FadeUp>
      </div>
    </section>
  );
}

function PhoneMockup() {
  const metrics = [
    { label: "Mobility", value: 88, color: "#2563EB" },
    { label: "Stability", value: 91, color: "#06B6D4" },
    { label: "Inflammation", value: 76, color: "#2563EB" },
    { label: "Recovery", value: 82, color: "#06B6D4" },
  ];
  return (
    <div className="relative mx-auto max-w-[300px]">
      <div className="rounded-[2.5rem] border-[10px] border-slate-900 bg-white shadow-2xl shadow-slate-300/60 overflow-hidden">
        <div className="bg-[#F8FAFC] px-5 pt-6 pb-8">
          <p className="text-[11px] font-semibold text-slate-400 tracking-wide" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            TODAY&nbsp;·&nbsp;7월 8일
          </p>
          <div className="mt-5 flex items-center justify-center">
            <div className="relative">
              <ReadoutRing value={84} size={132} stroke={11} />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-[34px] font-extrabold text-slate-900 leading-none" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  84
                </span>
                <span className="text-[10px] font-semibold text-slate-400 mt-1 tracking-wide">FINGER HEALTH</span>
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-2.5">
            {metrics.map((m) => (
              <div key={m.label} className="bg-white rounded-2xl px-3 py-2.5 border border-slate-100">
                <p className="text-[10px] font-semibold text-slate-400 tracking-wide">{m.label}</p>
                <p className="text-[17px] font-bold text-slate-900 mt-0.5" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  {m.value}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-3 rounded-2xl bg-blue-50 px-4 py-3.5">
            <p className="text-[11px] font-bold text-[#2563EB] tracking-wide">오늘의 행동 제안</p>
            <p className="text-[13px] text-slate-700 mt-1 leading-snug">
              붓기가 7일 평균보다 11% 높아요. 3분 온수 스트레칭을 추천해요.
            </p>
          </div>
          <p className="mt-3 text-[10.5px] text-slate-400 leading-snug">
            JOINTRUN은 의학적 진단이나 치료를 대신하지 않으며, 관리 기록을 돕는 서비스입니다.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Why section                                                         */
/* ------------------------------------------------------------------ */

const WHY_ITEMS = [
  { n: "01", title: "측정하지 않으면\n변화를 알 수 없습니다.", icon: ScanLine },
  { n: "02", title: "아플 때가 아니라\n변화가 시작될 때\n관리해야 합니다.", icon: Sparkles },
  { n: "03", title: "매일 기록하면\n좋아지는 패턴을\n찾을 수 있습니다.", icon: CalendarCheck },
  { n: "04", title: "데이터가 쌓일수록\n나에게 맞는 관리가\n가능합니다.", icon: LineChartIcon },
];

function WhySection() {
  return (
    <section id="why" className="py-28 px-6 bg-[#F8FAFC]">
      <div className="max-w-6xl mx-auto">
        <FadeUp>
          <p className="text-[13px] font-bold text-[#2563EB] tracking-wide mb-3" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            WHY MEASURE
          </p>
          <h2 className="text-[32px] md:text-[40px] font-extrabold tracking-tight text-slate-900 max-w-xl">
            왜 관절도 측정해야 할까요?
          </h2>
        </FadeUp>

        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {WHY_ITEMS.map((item, i) => (
            <FadeUp key={item.n} delay={i * 90}>
              <div className="h-full bg-white rounded-3xl p-7 border border-slate-100 shadow-sm shadow-slate-200/40">
                <span className="text-[12px] font-bold text-slate-300 tracking-widest" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  {item.n}
                </span>
                <item.icon className="w-6 h-6 text-[#2563EB] mt-4" strokeWidth={2} />
                <p className="mt-5 text-[16px] font-semibold text-slate-800 leading-[1.5] whitespace-pre-line">
                  {item.title}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Finger Health Score section                                        */
/* ------------------------------------------------------------------ */

const SCORE_ITEMS = [
  { key: "mobility", label: "Mobility", ko: "가동범위", icon: Move, value: 88 },
  { key: "stability", label: "Stability", ko: "균형성", icon: Scale, value: 91 },
  { key: "inflammation", label: "Inflammation", ko: "붓기", icon: Droplets, value: 76 },
  { key: "recovery", label: "Recovery", ko: "회복", icon: BatteryCharging, value: 82 },
  { key: "habit", label: "Habit", ko: "관리 습관", icon: CalendarCheck, value: 95 },
];

function ScoreSection() {
  return (
    <section id="score" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <FadeUp>
          <div className="max-w-xl">
            <p className="text-[13px] font-bold text-[#06B6D4] tracking-wide mb-3" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              FINGER HEALTH SCORE
            </p>
            <h2 className="text-[32px] md:text-[40px] font-extrabold tracking-tight text-slate-900">
              하나의 점수가 아닌,<br />5개의 건강 지표.
            </h2>
            <p className="mt-5 text-[16px] text-slate-500 leading-[1.7]">
              JOINTRUN은 손 상태를 단일 숫자로 뭉개지 않습니다.
              가동범위, 균형성, 붓기, 회복, 관리 습관까지
              다섯 갈래로 나누어 &ldquo;왜&rdquo; 이 점수인지 설명합니다.
            </p>
          </div>
        </FadeUp>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {SCORE_ITEMS.map((item, i) => (
            <FadeUp key={item.key} delay={i * 80}>
              <div className="h-full bg-white rounded-3xl p-6 border border-slate-100 shadow-sm shadow-slate-200/40 flex flex-col items-center text-center">
                <div className="relative">
                  <ReadoutRing value={item.value} size={92} stroke={7} color={i % 2 === 0 ? "#2563EB" : "#06B6D4"} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[20px] font-extrabold text-slate-900" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                      {item.value}
                    </span>
                  </div>
                </div>
                <item.icon className="w-5 h-5 text-slate-400 mt-5" strokeWidth={2} />
                <p className="mt-2 text-[15px] font-bold text-slate-900">{item.label}</p>
                <p className="text-[13px] text-slate-400 mt-0.5">{item.ko}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  How it works                                                        */
/* ------------------------------------------------------------------ */

const STEPS = [
  { n: "01", title: "손을 카메라에 올립니다.", icon: Hand },
  { n: "02", title: "AI가 손 움직임을 분석합니다.", icon: Cpu },
  { n: "03", title: "Finger Health Score를 계산합니다.", icon: ScanLine },
  { n: "04", title: "지난 기록과 비교합니다.", icon: History },
  { n: "05", title: "오늘 해야 할 행동을 추천합니다.", icon: Sparkles },
];

function HowSection() {
  return (
    <section id="how" className="py-28 px-6 bg-[#F8FAFC]">
      <div className="max-w-4xl mx-auto">
        <FadeUp>
          <p className="text-[13px] font-bold text-[#2563EB] tracking-wide mb-3 text-center" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            HOW IT WORKS
          </p>
          <h2 className="text-[32px] md:text-[40px] font-extrabold tracking-tight text-slate-900 text-center">
            어떻게 측정하나요?
          </h2>
        </FadeUp>

        <div className="mt-16 flex flex-col">
          {STEPS.map((step, i) => (
            <FadeUp key={step.n} delay={i * 90}>
              <div className="flex items-center gap-6 py-5">
                <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shrink-0">
                  <step.icon className="w-5 h-5 text-[#2563EB]" strokeWidth={2} />
                </div>
                <span
                  className="text-[13px] font-bold text-slate-300 tracking-widest shrink-0 w-8"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {step.n}
                </span>
                <p className="text-[17px] md:text-[19px] font-semibold text-slate-800">{step.title}</p>
              </div>
              {i < STEPS.length - 1 && <div className="ml-6 w-px h-6 bg-slate-200" />}
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={STEPS.length * 90}>
          <p className="mt-10 text-[13px] text-slate-400 text-center leading-relaxed">
            스트레칭, 기록 습관, 필요 시 보조기 착용까지 — 추천은 상황에 맞게 달라집니다.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Data-centric section                                                */
/* ------------------------------------------------------------------ */

function TrendChart() {
  const points = [
    { label: "지난달", value: 71 },
    { label: "지난주", value: 76 },
    { label: "어제", value: 79 },
    { label: "오늘", value: 84 },
  ];
  const w = 560;
  const h = 220;
  const pad = 32;
  const max = 100;
  const min = 60;
  const stepX = (w - pad * 2) / (points.length - 1);

  const coords = points.map((p, i) => {
    const x = pad + i * stepX;
    const y = h - pad - ((p.value - min) / (max - min)) * (h - pad * 2);
    return { ...p, x, y };
  });

  const path = coords.map((c, i) => `${i === 0 ? "M" : "L"}${c.x},${c.y}`).join(" ");
  const areaPath = `${path} L${coords[coords.length - 1].x},${h - pad} L${coords[0].x},${h - pad} Z`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto">
      <defs>
        <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563EB" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill="url(#areaFill)" />
      <path d={path} fill="none" stroke="#2563EB" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      {coords.map((c) => (
        <g key={c.label}>
          <circle cx={c.x} cy={c.y} r={c.label === "오늘" ? 6 : 4.5} fill="#fff" stroke="#2563EB" strokeWidth="3" />
          <text
            x={c.x}
            y={h - 8}
            textAnchor="middle"
            className="fill-slate-400"
            style={{ fontSize: "12px", fontFamily: "'JetBrains Mono', monospace", fontWeight: 600 }}
          >
            {c.label}
          </text>
          <text
            x={c.x}
            y={c.y - 16}
            textAnchor="middle"
            className="fill-slate-700"
            style={{ fontSize: "14px", fontFamily: "'JetBrains Mono', monospace", fontWeight: 700 }}
          >
            {c.value}
          </text>
        </g>
      ))}
    </svg>
  );
}

function DataSection() {
  return (
    <section className="py-28 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <FadeUp>
          <p className="text-[13px] font-bold text-[#06B6D4] tracking-wide mb-3" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            DATA, NOT A SNAPSHOT
          </p>
          <h2 className="text-[30px] md:text-[38px] font-extrabold tracking-tight text-slate-900 leading-[1.25]">
            중요한 것은 오늘 점수가 아닙니다.
            <br />
            변화입니다.
          </h2>
        </FadeUp>

        <FadeUp delay={150}>
          <div className="mt-14 bg-white rounded-[2rem] border border-slate-100 shadow-sm shadow-slate-200/40 p-8 md:p-12">
            <TrendChart />
          </div>
        </FadeUp>

        <FadeUp delay={250}>
          <p className="mt-10 text-[18px] md:text-[20px] font-semibold text-slate-700 leading-[1.6]">
            JOINTRUN은 좋아지고 있는지, 나빠지고 있는지를
            <br className="hidden md:block" />
            기록합니다.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Future / roadmap section                                            */
/* ------------------------------------------------------------------ */

function FutureSection() {
  const joints = ["손목", "팔꿈치", "어깨", "무릎", "발목"];
  return (
    <section id="future" className="py-28 px-6 bg-slate-900 text-white overflow-hidden relative">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[720px] h-[720px] rounded-full opacity-[0.10] blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #06B6D4 0%, transparent 70%)" }}
      />
      <div className="max-w-5xl mx-auto relative">
        <FadeUp>
          <p className="text-[13px] font-bold text-[#06B6D4] tracking-wide mb-3" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            THE ROADMAP
          </p>
          <h2 className="text-[32px] md:text-[42px] font-extrabold tracking-tight leading-[1.2]">
            손으로 시작하는
            <br />
            관절 건강 플랫폼
          </h2>
        </FadeUp>

        <FadeUp delay={150}>
          <div className="mt-16 flex flex-col md:flex-row md:items-center gap-6 md:gap-4">
            <div className="flex items-center gap-3 bg-white text-slate-900 rounded-2xl px-6 py-4 w-fit">
              <Hand className="w-5 h-5 text-[#2563EB]" strokeWidth={2.2} />
              <div>
                <p className="text-[11px] font-bold text-slate-400 tracking-wide">TODAY</p>
                <p className="text-[16px] font-bold">손</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-500 rotate-90 md:rotate-0 mx-auto md:mx-0" />
            <div className="flex flex-wrap gap-3">
              {joints.map((j) => (
                <div
                  key={j}
                  className="rounded-2xl px-5 py-4 border border-white/15 bg-white/5 backdrop-blur-sm"
                >
                  <p className="text-[11px] font-bold text-slate-400 tracking-wide" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    NEXT
                  </p>
                  <p className="text-[15px] font-bold mt-0.5">{j}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeUp>

        <FadeUp delay={250}>
          <p className="mt-16 text-[17px] md:text-[19px] text-slate-300 leading-[1.7] max-w-lg">
            JOINTRUN은 손으로 시작하지만
            <br />
            모든 관절 건강을 관리하는
            <br />
            플랫폼으로 확장됩니다.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Testimonials placeholder                                            */
/* ------------------------------------------------------------------ */

function TestimonialSection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <FadeUp>
          <div className="inline-flex items-center gap-1.5 text-[12px] font-bold text-[#2563EB] bg-blue-50 rounded-full px-3.5 py-1.5" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            COMING SOON
          </div>
          <p className="mt-8 text-[22px] md:text-[26px] font-bold text-slate-800 leading-[1.5]">
            &ldquo;첫 100명의 사용자가
            <br />
            JOINTRUN의 역사를 만듭니다.&rdquo;
          </p>
          <a
            href={BAND_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#2563EB] hover:underline"
          >
            네이버 밴드에서 먼저 만나보기
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </FadeUp>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  CTA                                                                  */
/* ------------------------------------------------------------------ */

function CTASection() {
  return (
    <section id="cta" className="py-28 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <FadeUp>
          <p className="text-[13px] font-bold text-[#06B6D4] tracking-wide mb-5" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            혈압은 혈압계로, 혈당은 혈당계로 — 이제 관절은 JOINTRUN으로.
          </p>
          <h2 className="text-[34px] md:text-[46px] font-extrabold tracking-tight text-slate-900 leading-[1.2]">
            오늘부터
            <br />
            내 관절 건강을
            <br />
            측정해보세요.
          </h2>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a
              href={APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[15px] font-semibold text-white bg-[#2563EB] pl-6 pr-5 py-3.5 rounded-full hover:bg-blue-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#2563EB]"
            >
              무료로 시작하기
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#how"
              className="inline-flex items-center gap-2 text-[15px] font-semibold text-slate-600 px-6 py-3.5 rounded-full border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-300"
            >
              데모 보기
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Footer                                                               */
/* ------------------------------------------------------------------ */

function Footer() {
  return (
    <footer className="border-t border-slate-100 py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-[#2563EB] flex items-center justify-center">
            <span className="text-white text-[11px] font-extrabold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              J
            </span>
          </div>
          <span className="text-[13px] font-bold text-slate-400">JOINTRUN</span>
        </div>
        <p className="text-[12px] text-slate-400 text-center">© 2026 JOINTRUN. 손으로 시작하는 관절 건강 측정 플랫폼.</p>
      </div>
      <p className="max-w-6xl mx-auto mt-6 text-[11.5px] text-slate-400 leading-relaxed">
        JOINTRUN은 의학적 진단이나 치료를 대신하지 않으며, 관절 건강 관리 기록을 돕는 서비스입니다.
        통증이나 변형이 지속되거나 악화되는 경우 반드시 의료 전문가와 상담하세요.
      </p>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                                 */
/* ------------------------------------------------------------------ */

export default function JointrunLanding() {
  return (
    <div className="bg-white text-slate-900 antialiased" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <style>{FONT_IMPORT}</style>
      <Nav />
      <main>
        <Hero />
        <WhySection />
        <ScoreSection />
        <HowSection />
        <DataSection />
        <FutureSection />
        <TestimonialSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
