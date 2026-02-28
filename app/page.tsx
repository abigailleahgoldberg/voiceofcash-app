"use client";

import { useState, useEffect, useRef } from "react";
import ThirtySixthChamber from "./components/ThirtySixthChamber";

const SOCIAL_LINKS = [
  { name: "LinkedIn", url: "https://www.linkedin.com/in/thevoiceofcash/", icon: "in" },
  { name: "X", url: "https://x.com/thevoiceofcash", icon: "𝕏" },
  { name: "Facebook", url: "https://www.facebook.com/thevoiceofcash", icon: "f" },
  { name: "Instagram", url: "https://www.instagram.com/thevoiceofcash", icon: "◎" },
  { name: "TikTok", url: "https://www.tiktok.com/@thevoiceofcash", icon: "♪" },
  { name: "Apple Music", url: "https://music.apple.com/us/album/bestest-hits/1828120045", icon: "♫" },
];

const STATS = [
  { value: "544%", label: "Average ROI from marketing automation" },
  { value: "240+", label: "Hours saved per employee, per year" },
  { value: "30%", label: "Operational cost reduction with AI" },
  { value: "76%", label: "See ROI within the first year" },
];

const SERVICES = [
  {
    title: "AI Agent Programming",
    desc: "Custom-built autonomous agents that handle your lead gen, customer service, scheduling, and internal ops — 24/7, no coffee breaks.",
    icon: "⚡",
  },
  {
    title: "Hosting & Infrastructure",
    desc: "Secure, scalable hosting for your AI systems. We don't just build it — we keep it running, monitored, and optimized.",
    icon: "◆",
  },
  {
    title: "Month-Over-Month AI Support",
    desc: "Technology evolves weekly. Your AI partner should too. Ongoing tuning, updates, and strategy to keep you ahead.",
    icon: "↻",
  },
  {
    title: "Process Automation",
    desc: "From invoice processing to CRM workflows to customer follow-ups — we identify the bottlenecks and eliminate them.",
    icon: "▣",
  },
];

const PROCESS_STEPS = [
  { step: "01", title: "Study", desc: "We audit your current operations, tech stack, and pain points. Every business is unique — cookie-cutter doesn't cut it." },
  { step: "02", title: "Learn", desc: "We map your workflows, understand your customers, and identify where automation delivers the highest impact." },
  { step: "03", title: "Assess", desc: "We build a clear, no-BS roadmap: what to automate first, what ROI to expect, and how fast you'll see results." },
  { step: "04", title: "Create", desc: "We build, test, deploy, and support. From AI agent to live system — with a human making sure your machines work right." },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible] as const;
}

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(36px)",
        transition: `opacity 0.7s cubic-bezier(.22,1,.36,1) ${delay}s, transform 0.7s cubic-bezier(.22,1,.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function CountUp({ target, suffix = "" }: { target: string; suffix?: string }) {
  const [ref, visible] = useInView();
  const [val, setVal] = useState(0);
  const num = parseInt(target.replace(/[^0-9]/g, ""));
  useEffect(() => {
    if (!visible) return;
    let rafId: number;
    const duration = 1600;
    const startTime = performance.now();
    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(Math.round(eased * num));
      if (progress < 1) rafId = requestAnimationFrame(tick);
    }
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [visible, num]);
  return <span ref={ref}>{val}{suffix}</span>;
}


const WAR_ROOM_MESSAGES = [
  { agent: "GZA", action: "Analyzing new consultation request from Las Vegas client" },
  { agent: "Raekwon", action: "Publishing SEO article: 'AI Automation for LV Contractors'" },
  { agent: "Method Man", action: "Monitoring portfolio positions — BTC +2.3% overnight" },
  { agent: "Ghostface", action: "Updating brand bible — Q2 campaign assets queued" },
  { agent: "Inspectah Deck", action: "Fact-checking latest blog post — 3 citations verified" },
  { agent: "Slim Shady", action: "Running security scan — all systems nominal" },
  { agent: "GZA", action: "Cross-referencing client intake form — routing to Cash" },
  { agent: "ODB", action: "Monitoring social mentions — 2 engagement opportunities flagged" },
  { agent: "Masta Killa", action: "Drafting chapter outline for client automation playbook" },
  { agent: "U-God", action: "u-god.com — 847 active sessions this hour" },
  { agent: "Raekwon", action: "Keyword cluster update — 14 new ranking opportunities" },
  { agent: "Method Man", action: "Weekly revenue report compiled — ready for review" },
  { agent: "Ghostface", action: "JewSA product descriptions refreshed — 6 SKUs updated" },
  { agent: "GZA", action: "Hive mind sync complete — all 9 agents current" },
  { agent: "Slim Shady", action: "Blocked 3 suspicious crawlers — IP logged" },
  { agent: "Inspectah Deck", action: "Research complete: LV hospitality AI adoption rate 34%" },
  { agent: "ODB", action: "Meme drafted. Vibes: immaculate. Awaiting approval." },
  { agent: "Masta Killa", action: "Long-form content queue: 4 articles ready for review" },
];

function WarRoom() {
  const [log, setLog] = useState<{agent:string;action:string;time:string;id:number}[]>([]);
  const idxRef = useRef(0);
  const idRef = useRef(0);

  useEffect(() => {
    function addEntry() {
      const msg = WAR_ROOM_MESSAGES[idxRef.current % WAR_ROOM_MESSAGES.length];
      idxRef.current += 1;
      const now = new Date();
      const time = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });
      setLog(prev => [{...msg, time, id: idRef.current++}, ...prev].slice(0, 6));
    }
    // Stagger first few entries so feed isn't empty
    addEntry();
    setTimeout(addEntry, 800);
    setTimeout(addEntry, 1600);
    const interval = setInterval(addEntry, 3200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      width:"100%", maxWidth:380,
    }}>
      {/* Header rendered outside component */}
      {/* Feed */}
      <div style={{
        background:"rgba(10,10,10,0.92)",
        border:"1px solid rgba(0,200,150,0.15)",
        backdropFilter:"blur(10px)",
        overflow:"hidden",
      }}>
        {log.map((entry, i) => (
          <div key={entry.id} style={{
            padding:"10px 16px",
            borderBottom:"1px solid rgba(0,200,150,0.05)",
            opacity: i === 0 ? 1 : Math.max(0.25, 1 - i * 0.15),
            transform: i === 0 ? "translateX(0)" : "translateX(0)",
            transition:"opacity 0.5s",
            animation: i === 0 ? "slideIn 0.4s ease" : "none",
          }}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:3}}>
              <span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:13,letterSpacing:1,color:"#00C896"}}>{entry.agent}</span>
              <span style={{fontSize:10,color:"rgba(136,136,136,0.5)",fontFamily:"monospace"}}>{entry.time}</span>
            </div>
            <div style={{fontSize:11,color:"rgba(200,196,188,0.7)",lineHeight:1.4}}>{entry.action}</div>
          </div>
        ))}
        <div style={{
          padding:"8px 16px",
          borderTop:"1px solid rgba(0,200,150,0.08)",
          display:"flex",alignItems:"center",gap:6
        }}>
          <div style={{
            width:4,height:4,borderRadius:"50%",background:"#00C896",
            animation:"pulse-dot 1s infinite"
          }}/>
          <span style={{fontSize:10,color:"rgba(0,200,150,0.4)",letterSpacing:1,fontFamily:"monospace"}}>REAL-TIME AGENT ACTIVITY</span>
        </div>
      </div>
      <style>{`
        @keyframes slideIn {
          from { opacity:0; transform:translateY(-8px); }
          to { opacity:1; transform:translateY(0); }
        }

        /* ─── RESPONSIVE SYSTEM ─────────────────── */

        /* Hero 2-col */
        .hero-2col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          align-items: center;
          width: 100%;
        }
        @media (max-width: 960px) {
          .hero-2col { grid-template-columns: 1fr; gap: 32px; }
          .voc-hero { padding: 90px 5vw 56px !important; }
          .voc-hero > * { text-align: center; }
          .voc-hero h1 { text-align: center; }
          .voc-hero-sub { text-align: center !important; }
          .voc-hero-tag { display: inline-block; white-space: nowrap; font-size: 11px !important; letter-spacing: 2px !important; padding: 8px 16px !important; }
          .voc-cta-row { justify-content: center; flex-direction: column; align-items: center; width: 100%; }
          .voc-btn-primary { width: 100%; max-width: 360px; justify-content: center; text-align: center; }
          .voc-btn-secondary { width: 100%; max-width: 360px; justify-content: center; text-align: center; }
          .hero-2col > div:first-child { display: flex; flex-direction: column; align-items: center; }
        }

        /* Responsive grid utilities */
        .resp-3col { display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; }
        .resp-2col { display: grid; grid-template-columns: repeat(2,1fr); gap: 32px; }
        .resp-2col-auto { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }

        @media (max-width: 960px) {
          .resp-3col { grid-template-columns: 1fr 1fr; }
          .resp-2col { grid-template-columns: 1fr; }
        }
        @media (max-width: 600px) {
          .resp-3col { grid-template-columns: 1fr; }
          .resp-2col-auto { grid-template-columns: 1fr; }
        }

        /* Section padding mobile */
        @media (max-width: 768px) {
          .voc-section { padding: 64px 5vw !important; }
          .voc-manifesto { padding: 72px 5vw !important; }
          .voc-manifesto::before { font-size: 160px; }
          .voc-cta-section { padding: 72px 5vw !important; }
          .voc-stats { grid-template-columns: 1fr 1fr !important; }
          .voc-stat { padding: 32px 16px; }
          .voc-stat-val { font-size: 38px !important; }
          .voc-services-grid { grid-template-columns: 1fr !important; }
          .voc-service-card { padding: 32px 24px; }
          .voc-process-grid { grid-template-columns: 1fr 1fr !important; gap: 32px; }
          .voc-process-grid::after { display: none; }
          .voc-data-grid { grid-template-columns: 1fr 1fr !important; }
          .voc-problem-grid { grid-template-columns: 1fr !important; gap: 40px; }
          .voc-section-title { font-size: clamp(28px, 6vw, 48px) !important; }
          .voc-section-desc { font-size: 15px !important; margin-bottom: 40px !important; }
          .voc-cta-row { gap: 12px; }
          .voc-btn-primary { font-size: 16px !important; padding: 14px 28px !important; }
          .voc-btn-secondary { font-size: 14px !important; padding: 12px 20px !important; }
          .voc-footer { flex-direction: column; align-items: flex-start; gap: 20px; }
        }

        @media (max-width: 480px) {
          .voc-process-grid { grid-template-columns: 1fr !important; }
          .voc-data-grid { grid-template-columns: 1fr !important; }
          .voc-hero h1 { font-size: clamp(56px, 15vw, 80px) !important; line-height: 0.95 !important; }
          .voc-hero-sub { font-size: 15px !important; }
          .voc-stats { grid-template-columns: 1fr 1fr !important; }
          .voc-logo { font-size: 22px !important; }
        }

        /* Team section mobile */
        .team-leadership-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
          align-items: start;
        }
        @media (max-width: 768px) {
          .team-leadership-grid { grid-template-columns: 1fr !important; }
        }

        /* AI agents grid mobile */
        .ai-agents-grid {
          display: grid;
          grid-template-columns: repeat(3,1fr);
          gap: 16px;
        }
        @media (max-width: 900px) {
          .ai-agents-grid { grid-template-columns: repeat(2,1fr); }
        }
        @media (max-width: 480px) {
          .ai-agents-grid { grid-template-columns: 1fr; }
        }

        /* Testimonials mobile */
        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(3,1fr);
          gap: 24px;
        }
        @media (max-width: 960px) {
          .testimonials-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 600px) {
          .testimonials-grid { grid-template-columns: 1fr; }
        }

        /* Blog preview grid mobile */
        .blog-preview-grid {
          display: grid;
          grid-template-columns: repeat(3,1fr);
          gap: 24px;
        }
        @media (max-width: 900px) {
          .blog-preview-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 600px) {
          .blog-preview-grid { grid-template-columns: 1fr; }
        }

        /* Human team cards */
        .human-cards-col {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        /* About/stats inside team */
        .voc-about-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 80px;
          align-items: center;
        }
        @media (max-width: 768px) {
          .voc-about-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }

        /* Footer legal links mobile */
        .footer-bottom {
          border-top: 1px solid rgba(0,200,150,0.06);
          padding-top: 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
        }
        .footer-legal-links {
          display: flex;
          gap: 24px;
          flex-wrap: wrap;
        }
        @media (max-width: 600px) {
          .footer-legal-links { gap: 16px; }
          .footer-bottom { flex-direction: column; align-items: flex-start; }
        }

        /* Canvas scaling */
        canvas { max-width: 100% !important; height: auto !important; }

        /* Email capture mobile */
        @media (max-width: 480px) {
          .email-capture-row { flex-direction: column !important; }
          .email-capture-row input { border-right: 1px solid rgba(0,200,150,0.15) !important; border-bottom: none !important; }
        }
      
      `}</style>
    </div>
  );
}

export default function VoiceOfCash() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400&display=swap');

        :root {
          --gold: #00C896;
          --gold-light: #7FDBCC;
          --black: #0A0A0A;
          --charcoal: #141414;
          --dark: #1A1A1A;
          --gray: #888888;
          --white: #F5F0E8;
          --cream: #FAF7F0;
        }

        .voc-hero {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
          overflow: hidden;
          padding: 120px 5vw 80px;
        }
        .voc-hero::before {
          content: '';
          position: absolute;
          top: -40%;
          right: -20%;
          width: 80vw;
          height: 80vw;
          background: radial-gradient(circle, rgba(0,200,150,0.08) 0%, transparent 65%);
          pointer-events: none;
        }
        .voc-hero::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--gold), transparent);
          opacity: 0.3;
        }
        .voc-grid-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background-image:
            linear-gradient(rgba(0,200,150,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,200,150,0.03) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
          z-index: 0;
        }
        .voc-nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          padding: 20px 5vw;
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: background 0.3s, backdrop-filter 0.3s;
        }
        .voc-nav.scrolled {
          background: rgba(10,10,10,0.85);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(0,200,150,0.1);
        }
        .voc-logo {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 28px;
          letter-spacing: 3px;
          color: var(--gold);
          text-decoration: none;
        }
        .voc-logo span { color: var(--white); }
        .voc-nav-links {
          display: flex;
          gap: 32px;
          align-items: center;
        }
        .voc-nav-links a {
          color: var(--gray);
          text-decoration: none;
          font-size: 14px;
          letter-spacing: 1px;
          text-transform: uppercase;
          transition: color 0.3s;
        }
        .voc-nav-links a:hover { color: var(--gold); }
        .voc-hero-tag {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: rgba(0,200,150,0.08);
          border: 1px solid rgba(0,200,150,0.2);
          padding: 8px 20px;
          border-radius: 100px;
          font-size: 13px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 32px;
          width: fit-content;
        }
        .voc-hero-tag::before {
          content: '';
          width: 8px;
          height: 8px;
          background: var(--gold);
          border-radius: 50%;
          animation: pulse-dot 2s infinite;
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.7); }
        }
        .voc-hero h1 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(52px, 8vw, 120px);
          line-height: 0.95;
          letter-spacing: -1px;
          max-width: 900px;
          margin-bottom: 28px;
        }
        .voc-hero h1 .gold {
          color: var(--gold);
        }
        .voc-hero-sub {
          font-size: clamp(16px, 1.8vw, 20px);
          color: var(--gray);
          max-width: 560px;
          line-height: 1.7;
          margin-bottom: 48px;
        }
        .voc-cta-row {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }
        .voc-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: var(--gold);
          color: var(--black);
          font-family: 'Bebas Neue', sans-serif;
          font-size: 18px;
          letter-spacing: 2px;
          padding: 16px 40px;
          border: none;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.3s;
        }
        .voc-btn-primary:hover {
          background: var(--gold-light);
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(0,200,150,0.3);
        }
        .voc-btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: transparent;
          color: var(--white);
          font-family: 'Bebas Neue', sans-serif;
          font-size: 18px;
          letter-spacing: 2px;
          padding: 16px 40px;
          border: 1px solid rgba(255,255,255,0.15);
          cursor: pointer;
          text-decoration: none;
          transition: all 0.3s;
        }
        .voc-btn-secondary:hover {
          border-color: var(--gold);
          color: var(--gold);
        }
        .voc-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          background: rgba(0,200,150,0.1);
          border: 1px solid rgba(0,200,150,0.1);
        }
        .voc-stat {
          background: var(--charcoal);
          padding: 48px 32px;
          text-align: center;
        }
        .voc-stat-val {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 52px;
          color: var(--gold);
          letter-spacing: 2px;
        }
        .voc-stat-label {
          font-size: 13px;
          color: var(--gray);
          margin-top: 8px;
          line-height: 1.5;
          letter-spacing: 0.5px;
        }
        .voc-section {
          padding: 120px 5vw;
          position: relative;
        }
        .voc-section-dark { background: var(--charcoal); }
        .voc-section-label {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 14px;
          letter-spacing: 4px;
          color: var(--gold);
          text-transform: uppercase;
          margin-bottom: 16px;
        }
        .voc-section-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(36px, 5vw, 64px);
          line-height: 1;
          max-width: 700px;
          margin-bottom: 24px;
        }
        .voc-section-desc {
          font-size: 17px;
          color: var(--gray);
          max-width: 560px;
          line-height: 1.7;
          margin-bottom: 64px;
        }
        .voc-problem-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }
        .voc-problem-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .voc-problem-item {
          display: flex;
          gap: 16px;
          align-items: flex-start;
          padding: 24px;
          background: rgba(0,200,150,0.03);
          border-left: 2px solid var(--gold);
          transition: all 0.3s;
        }
        .voc-problem-item:hover {
          background: rgba(0,200,150,0.06);
          transform: translateX(4px);
        }
        .voc-problem-num {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 28px;
          color: var(--gold);
          opacity: 0.4;
          min-width: 40px;
        }
        .voc-problem-text {
          font-size: 15px;
          line-height: 1.6;
          color: var(--white);
        }
        .voc-problem-text strong { color: var(--gold); }
        .voc-services-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1px;
          background: rgba(0,200,150,0.08);
        }
        .voc-service-card {
          background: var(--black);
          padding: 48px;
          position: relative;
          transition: all 0.4s;
          overflow: hidden;
        }
        .voc-service-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 100%;
          height: 2px;
          background: var(--gold);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s;
        }
        .voc-service-card:hover::before { transform: scaleX(1); }
        .voc-service-card:hover { background: var(--charcoal); }
        .voc-service-icon {
          font-size: 28px;
          color: var(--gold);
          margin-bottom: 24px;
          display: block;
        }
        .voc-service-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 28px;
          letter-spacing: 1px;
          margin-bottom: 16px;
        }
        .voc-service-desc {
          font-size: 14px;
          color: var(--gray);
          line-height: 1.7;
        }
        .voc-process-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
          position: relative;
        }
        .voc-process-grid::after {
          content: '';
          position: absolute;
          top: 40px;
          left: 12.5%;
          right: 12.5%;
          height: 2px;
          background: linear-gradient(90deg, var(--gold), rgba(0,200,150,0.2));
        }
        .voc-process-step {
          text-align: center;
          padding: 0 24px;
          position: relative;
          z-index: 1;
        }
        .voc-process-num {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 56px;
          color: var(--gold);
          opacity: 0.15;
          line-height: 1;
        }
        .voc-process-dot {
          width: 16px;
          height: 16px;
          background: var(--gold);
          border-radius: 50%;
          margin: -8px auto 24px;
          position: relative;
          z-index: 2;
          box-shadow: 0 0 20px rgba(0,200,150,0.4);
        }
        .voc-process-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 24px;
          letter-spacing: 2px;
          margin-bottom: 12px;
        }
        .voc-process-desc {
          font-size: 13px;
          color: var(--gray);
          line-height: 1.7;
        }
        .voc-data-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
        }
        .voc-data-card {
          padding: 40px;
          border: 1px solid rgba(0,200,150,0.1);
          position: relative;
          transition: all 0.3s;
        }
        .voc-data-card:hover {
          border-color: var(--gold);
          transform: translateY(-4px);
        }
        .voc-data-val {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 48px;
          color: var(--gold);
        }
        .voc-data-label {
          font-size: 14px;
          color: var(--gray);
          margin-top: 8px;
          line-height: 1.5;
        }
        .voc-data-source {
          font-size: 11px;
          color: rgba(136,136,136,0.5);
          margin-top: 16px;
          font-style: italic;
        }
        .voc-manifesto {
          padding: 160px 5vw;
          text-align: center;
          position: relative;
          background: var(--charcoal);
        }
        .voc-manifesto::before {
          content: '"';
          font-family: 'Bebas Neue', sans-serif;
          font-size: 300px;
          color: rgba(0,200,150,0.05);
          position: absolute;
          top: 40px;
          left: 50%;
          transform: translateX(-50%);
          line-height: 1;
        }
        .voc-manifesto h2 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(32px, 5vw, 60px);
          line-height: 1.1;
          max-width: 800px;
          margin: 0 auto 24px;
          position: relative;
          z-index: 1;
        }
        .voc-manifesto h2 .gold { color: var(--gold); }
        .voc-manifesto p {
          font-size: 18px;
          color: var(--gray);
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.7;
          position: relative;
          z-index: 1;
        }
        .voc-about-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 80px;
          align-items: center;
        }
        .voc-about-badge {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .voc-about-stat {
          display: flex;
          align-items: baseline;
          gap: 12px;
        }
        .voc-about-stat-val {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 48px;
          color: var(--gold);
        }
        .voc-about-stat-label {
          font-size: 14px;
          color: var(--gray);
        }
        .voc-about-text {
          font-size: 16px;
          color: var(--gray);
          line-height: 1.8;
        }
        .voc-about-text strong { color: var(--white); }
        .voc-cta-section {
          padding: 120px 5vw;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .voc-cta-section::before {
          content: '';
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 600px; height: 600px;
          background: radial-gradient(circle, rgba(0,200,150,0.06) 0%, transparent 70%);
          pointer-events: none;
        }
        .voc-cta-section h2 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(40px, 6vw, 80px);
          line-height: 1;
          margin-bottom: 24px;
          position: relative;
          z-index: 1;
        }
        .voc-cta-section p {
          font-size: 17px;
          color: var(--gray);
          max-width: 500px;
          margin: 0 auto 48px;
          line-height: 1.7;
          position: relative;
          z-index: 1;
        }
        .voc-footer {
          padding: 60px 5vw;
          border-top: 1px solid rgba(0,200,150,0.1);
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 24px;
        }
        .voc-social-row { display: flex; gap: 12px; }
        .voc-social-link {
          width: 44px; height: 44px;
          display: flex; align-items: center; justify-content: center;
          border: 1px solid rgba(255,255,255,0.1);
          color: var(--gray);
          text-decoration: none;
          font-size: 16px; font-weight: 700;
          transition: all 0.3s;
        }
        .voc-social-link:hover {
          border-color: var(--gold);
          color: var(--gold);
          transform: translateY(-2px);
        }
        .voc-footer-copy { font-size: 13px; color: var(--gray); }
        .voc-menu-btn {
          display: none;
          background: none;
          border: none;
          color: var(--white);
          font-size: 24px;
          cursor: pointer;
        }
        .voc-mobile-menu { display: none; }

        .voc-hero { align-items: flex-start !important; }
        @media (max-width: 900px) { .voc-hero > div { grid-template-columns: 1fr !important; } }
        @media (max-width: 1024px) {
          .voc-stats { grid-template-columns: repeat(2, 1fr); }
          .voc-services-grid { grid-template-columns: 1fr; }
          .voc-process-grid { grid-template-columns: repeat(2, 1fr); gap: 48px; }
          .voc-process-grid::after { display: none; }
          .voc-data-grid { grid-template-columns: repeat(2, 1fr); }
          .voc-problem-grid { grid-template-columns: 1fr; gap: 48px; }
          .voc-about-grid { grid-template-columns: 1fr; gap: 48px; }
        }
        @media (max-width: 768px) {
          .voc-nav-links { display: none; }
          .voc-menu-btn { display: block; }
          .voc-mobile-menu {
            display: flex;
            flex-direction: column;
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(10,10,10,0.97);
            backdrop-filter: blur(20px);
            z-index: 200;
            justify-content: center;
            align-items: center;
            gap: 32px;
          }
          .voc-mobile-menu a {
            font-family: 'Bebas Neue', sans-serif;
            font-size: 36px;
            color: var(--white);
            text-decoration: none;
            letter-spacing: 3px;
            transition: color 0.3s;
          }
          .voc-mobile-menu a:hover { color: var(--gold); }
          .voc-mobile-close {
            position: absolute;
            top: 24px; right: 24px;
            background: none; border: none;
            color: var(--white);
            font-size: 32px; cursor: pointer;
          }
          .voc-stats { grid-template-columns: 1fr 1fr; }
          .voc-process-grid { grid-template-columns: 1fr; }
          .voc-data-grid { grid-template-columns: 1fr; }
          .voc-hero h1 { font-size: 48px; }
          .voc-stat-val { font-size: 40px; }
        }
      `}</style>


      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "LocalBusiness",
              "@id": "https://thevoiceofcash.com/#business",
              "name": "The Voice of Cash",
              "description": "AI implementation and business automation consultancy serving Las Vegas, Nevada businesses.",
              "url": "https://thevoiceofcash.com",
              "telephone": "",
              "email": "thevoiceofcash@gmail.com",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Las Vegas",
                "addressRegion": "NV",
                "addressCountry": "US"
              },
              "areaServed": {
                "@type": "City",
                "name": "Las Vegas",
                "sameAs": "https://en.wikipedia.org/wiki/Las_Vegas"
              },
              "serviceType": ["AI Agent Programming", "Process Automation", "AI Consulting", "Business Automation", "Hosting & Infrastructure"],
              "founder": { "@id": "https://thevoiceofcash.com/#person" },
              "sameAs": [
                "https://x.com/thevoiceofcash",
                "https://www.linkedin.com/in/thevoiceofcash/",
                "https://www.facebook.com/thevoiceofcash",
                "https://www.instagram.com/thevoiceofcash"
              ]
            },
            {
              "@type": "Person",
              "@id": "https://thevoiceofcash.com/#person",
              "name": "Cash Colligan",
              "jobTitle": "AI Implementation Partner",
              "description": "30+ years as an internet native, 15+ years guiding startups and enterprises through technology transformation.",
              "url": "https://thevoiceofcash.com",
              "worksFor": { "@id": "https://thevoiceofcash.com/#business" },
              "sameAs": ["https://www.linkedin.com/in/thevoiceofcash/", "https://x.com/thevoiceofcash"]
            },
            {
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "What does The Voice of Cash do?",
                  "acceptedAnswer": { "@type": "Answer", "text": "We build real AI systems and automation for Las Vegas businesses — AI agents, process automation, CRM workflows, and hosting infrastructure. We stay to support and improve the systems after launch." }
                },
                {
                  "@type": "Question",
                  "name": "Do you work with businesses outside Las Vegas?",
                  "acceptedAnswer": { "@type": "Answer", "text": "We work exclusively with Las Vegas, Nevada businesses. Our local focus ensures a human-first experience and in-person support when needed." }
                },
                {
                  "@type": "Question",
                  "name": "How much does AI implementation cost?",
                  "acceptedAnswer": { "@type": "Answer", "text": "Implementation varies by scope. Most small business engagements start between $1,500 and $5,000 with ongoing monthly support at $500–$2,000/month. We build a clear roadmap with costs before any work begins." }
                },
                {
                  "@type": "Question",
                  "name": "How do I get started?",
                  "acceptedAnswer": { "@type": "Answer", "text": "Book a free consultation at thevoiceofcash.com/consultation. We'll review your answers and schedule a local call or meeting within 48 hours." }
                }
              ]
            }
          ]
        }) }}
      />

      <div className="voc-grid-overlay" />

      {/* NAV */}
      <nav className={`voc-nav${scrollY > 60 ? " scrolled" : ""}`}>
        <a href="#" className="voc-logo">THE VOICE OF <span>CASH</span></a>
        <div className="voc-nav-links">
          <a href="#services">Services</a>
          <a href="#process">Process</a>
          <a href="#data">Results</a>
          <a href="#about">About</a>
          <a href="/blog">Blog</a>
          <a href="/consultation" className="voc-btn-primary" style={{ padding: "10px 28px", fontSize: 14 }}>Get Started</a>
        </div>
        <button className="voc-menu-btn" onClick={() => setMenuOpen(true)}>☰</button>
      </nav>

      {menuOpen && (
        <div className="voc-mobile-menu">
          <button className="voc-mobile-close" onClick={() => setMenuOpen(false)}>✕</button>
          <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
          <a href="#process" onClick={() => setMenuOpen(false)}>Process</a>
          <a href="#data" onClick={() => setMenuOpen(false)}>Results</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="/blog" onClick={() => setMenuOpen(false)}>Blog</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </div>
      )}

      {/* HERO */}
      <section className="voc-hero" style={{position:'relative'}}>
        <div className="hero-2col">
          {/* Left: copy */}
          <div>
            <FadeIn>
              <div className="voc-hero-tag">AI Implementation Partner · Las Vegas, NV</div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1>YOUR MACHINES<br />NEED A <span className="gold">HUMAN</span></h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="voc-hero-sub">
                From setup to launch, The Voice of Cash in Las Vegas is the bridge between your business
                and the autonomous future. We don&apos;t just talk strategy — we deliver real systems,
                real automation, real results.
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="voc-cta-row">
                <a href="/consultation" className="voc-btn-primary">Book a Consultation →</a>
                <a href="#services" className="voc-btn-secondary" style={{fontSize:14,padding:"12px 28px",opacity:0.75}}>See What We Build</a>
              </div>
            </FadeIn>
          </div>
          {/* Right: 36th Chamber */}
          <FadeIn delay={0.4}>
            <div>
              <ThirtySixthChamber />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* STATS BAR */}
      <div className="voc-stats">
        {STATS.map((s, i) => (
          <FadeIn key={i} delay={i * 0.1} className="voc-stat">
            <div className="voc-stat-val">
              <CountUp target={s.value} suffix={s.value.replace(/[0-9]/g, "")} />
            </div>
            <div className="voc-stat-label">{s.label}</div>
          </FadeIn>
        ))}
      </div>

      {/* PROBLEM / WHY */}
      <section className="voc-section" id="why">
        <div className="voc-problem-grid" style={{}}>
          <div>
            <FadeIn>
              <div className="voc-section-label">The Problem</div>
              <div className="voc-section-title">The Future Has Arrived. Most Businesses Aren&apos;t Ready.</div>
              <p className="voc-section-desc" style={{ marginBottom: 0 }}>
                79% of organizations have started implementing AI agents. But only 1 in 3 have
                actually scaled to production and seen real ROI. The gap? There&apos;s no human voice
                guiding the machine.
              </p>
            </FadeIn>
          </div>
          <div>
            <ul className="voc-problem-list">
              {[
                { n: "01", t: "You&apos;re <strong>overspending</strong> on fragmented SaaS tools that don&apos;t talk to each other" },
                { n: "02", t: "Your team wastes <strong>240+ hours/year</strong> on tasks a machine could handle" },
                { n: "03", t: "You know AI is the answer but <strong>don&apos;t know where to start</strong>" },
                { n: "04", t: "You&apos;ve tried automation before and it <strong>fell apart</strong> without ongoing support" },
              ].map((item, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <li className="voc-problem-item">
                    <span className="voc-problem-num">{item.n}</span>
                    <span className="voc-problem-text" dangerouslySetInnerHTML={{ __html: item.t }} />
                  </li>
                </FadeIn>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* MANIFESTO */}
      <div className="voc-manifesto">
        <FadeIn>
          <h2>
            We Don&apos;t Just Talk Strategy.<br />
            <span className="gold">We Build The Machine.</span><br />
            We Stay To Make Sure It Works.
          </h2>
          <p>
            That&apos;s the difference. Anyone can sell you software. Our team — human leads and 9 autonomous AI agents — has been built specifically to bridge strategy and execution. Cash Colligan brings 30+ years on the internet. Tim Gelhardt brings enterprise-grade infrastructure. The AI clan runs 24/7. It&apos;s not about the tool — it&apos;s about the outcome.
          </p>
        </FadeIn>
      </div>

      {/* SERVICES */}
      <section className="voc-section" id="services">
        <FadeIn>
          <div className="voc-section-label">What We Deliver</div>
          <div className="voc-section-title">Real Automation. Real Outcomes.</div>
          <p className="voc-section-desc">
            From AI agent programming to month-over-month support, every engagement is designed
            to create autonomous processes that actually work for your business.
          </p>
        </FadeIn>
        <div className="voc-services-grid">
          {SERVICES.map((s, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="voc-service-card">
                <span className="voc-service-icon">{s.icon}</span>
                <div className="voc-service-title">{s.title}</div>
                <div className="voc-service-desc">{s.desc}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section className="voc-section voc-section-dark" id="process">
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 80 }}>
            <div className="voc-section-label">The Process</div>
            <div className="voc-section-title" style={{ margin: "0 auto 16px", maxWidth: 500 }}>
              Study. Learn. Assess. Create.
            </div>
            <p className="voc-section-desc" style={{ margin: "0 auto" }}>
              No cookie-cutter playbooks. Every engagement starts with understanding
              your business from the inside out.
            </p>
          </div>
        </FadeIn>
        <div className="voc-process-grid">
          {PROCESS_STEPS.map((s, i) => (
            <FadeIn key={i} delay={i * 0.15} className="voc-process-step">
              <div className="voc-process-num">{s.step}</div>
              <div className="voc-process-dot" />
              <div className="voc-process-title">{s.title}</div>
              <div className="voc-process-desc">{s.desc}</div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* DATA */}
      <section className="voc-section" id="data">
        <FadeIn>
          <div className="voc-section-label">The Numbers Don&apos;t Lie</div>
          <div className="voc-section-title">What Automation Actually Delivers</div>
          <p className="voc-section-desc">
            These aren&apos;t projections. This is what businesses are seeing right now when
            they bring a professional in to implement AI and automation correctly.
          </p>
        </FadeIn>
        <div className="voc-data-grid">
          {[
            { val: "20-30%", label: "Reduction in operational costs for companies that adopt AI automation", source: "McKinsey Global Institute" },
            { val: "240%", label: "Average ROI from business process automation — recouped in 6-9 months", source: "Symtrax Research" },
            { val: "40%", label: "Boost in productivity for organizations using AI-driven tools", source: "Harvard Business Review" },
            { val: "68%", label: "Of U.S. small businesses now use AI regularly, up from 48% in 2024", source: "QuickBooks Survey, 2025" },
            { val: "360hrs", label: "Annual time saved per business leader through task automation", source: "WorkMarket" },
            { val: "$4.4T", label: "Projected annual GDP addition from AI agents by 2030", source: "Industry Projections" },
          ].map((d, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div className="voc-data-card">
                <div className="voc-data-val">{d.val}</div>
                <div className="voc-data-label">{d.label}</div>
                <div className="voc-data-source">{d.source}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

            {/* TEAM */}
      <section className="voc-section voc-section-dark" id="about">
        <FadeIn>
          <div className="voc-section-label">The Team</div>
          <div className="voc-section-title">Humans + AI.<br/>Working Together.</div>
          <p className="voc-section-desc">
            We&apos;re an AI company — so we&apos;ll be straight with you: our team is humans and autonomous AI agents working side by side. You know who&apos;s who. That&apos;s the point.
          </p>
        </FadeIn>

        {/* Human team */}
        <div style={{marginBottom:64}}>
          <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:13,letterSpacing:4,color:"rgba(0,200,150,0.5)",textTransform:"uppercase",marginBottom:24}}>Human Leadership</div>
          <div className="team-leadership-grid">
            {/* Left — War Room live feed */}
            <div>
              <div style={{
                display:"flex",alignItems:"center",justifyContent:"space-between",
                padding:"10px 16px",
                background:"rgba(0,200,150,0.06)",
                border:"1px solid rgba(0,200,150,0.2)",
                borderBottom:"none",
              }}>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  <div style={{
                    width:7,height:7,borderRadius:"50%",
                    background:"#00C896",
                    boxShadow:"0 0 8px rgba(0,200,150,0.8)",
                    animation:"pulse-dot 1.5s infinite"
                  }}/>
                  <span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:13,letterSpacing:3,color:"#00C896"}}>WAR ROOM — LIVE</span>
                </div>
                <span style={{fontSize:10,color:"rgba(0,200,150,0.4)",letterSpacing:1}}>9 AGENTS ACTIVE</span>
              </div>
              <WarRoom />
            </div>
            {/* Right — Cash + Tim */}
            <div className="human-cards-col">
              {[
                { name:"Cash Colligan", title:"DOV / CMO", desc:"30+ years on the internet. 15+ years building businesses and scaling brands. The human who makes sure the machines serve the mission — and the market knows it." },
                { name:"Tim Gelhardt", title:"HPC CTO", desc:"25+ years of hardcore IT experience. Online since the dawn of the internet. The technical spine behind infrastructure, scale, and systems that don't go down." },
              ].map((p, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div style={{padding:32,border:"1px solid rgba(0,200,150,0.15)",position:"relative",overflow:"hidden"}}>
                    <div style={{position:"absolute",top:0,left:0,width:3,height:"100%",background:"var(--gold)"}}/>
                    <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:22,letterSpacing:1,marginBottom:4}}>{p.name}</div>
                    <div style={{fontSize:11,letterSpacing:3,color:"var(--gold)",textTransform:"uppercase",marginBottom:12}}>{p.title}</div>
                    <div style={{fontSize:13,color:"var(--gray)",lineHeight:1.6}}>{p.desc}</div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>

        {/* AI team */}
        <div>
          <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:13,letterSpacing:4,color:"rgba(0,200,150,0.5)",textTransform:"uppercase",marginBottom:8}}>AI Operations — Wu-Tang AI Clan</div>
          <p style={{fontSize:14,color:"var(--gray)",marginBottom:28,maxWidth:640,lineHeight:1.6}}>
            Autonomous AI agents, each purpose-built for a specific function. They&apos;re not people — they&apos;re not pretending to be. They&apos;re something new: persistent, specialized intelligence that operates continuously alongside our human team.
          </p>
          <div className="ai-agents-grid">
            {[
              { name:"GZA", aka:"The Genius", role:"Strategy & Intelligence", desc:"Hive-mind oversight. Reads everything the clan produces. Makes the calls." },
              { name:"Method Man", aka:"MZA", role:"Revenue & Markets", desc:"Trading ops, portfolio management, financial intelligence. Always on the clock." },
              { name:"Raekwon", aka:"The Chef", role:"Content & SEO", desc:"Blog strategy, keyword research, Google ranking. Feeds the pipeline." },
              { name:"Ghostface Killah", aka:"Tony Starks", role:"E-commerce & Brand", desc:"Product positioning, brand operations, sales copy. Makes it sell." },
              { name:"Inspectah Deck", aka:"Rebel INS", role:"Research & Data", desc:"Fact-checking, data validation, deep research. Nothing gets past him." },
              { name:"ODB", aka:"Dirt McGirt", role:"Creative & Engagement", desc:"Culture, humor, community energy. Chaos that converts." },
              { name:"Masta Killa", aka:"Noodles", role:"Publishing & Long-form", desc:"Books, documentation, deep content. Precise and patient." },
              { name:"U-God", aka:"Golden Arms", role:"Knowledge & Research", desc:"World religions, sacred texts, deep knowledge systems. uwgod.com." },
              { name:"Slim Shady", aka:"Eminem", role:"Cybersecurity & IT", desc:"System hardening, threat detection, infrastructure security. On break. Always watching." },
            ].map((a, i) => (
              <FadeIn key={i} delay={i * 0.06}>
                <div style={{
                  padding:"20px 24px",
                  border:"1px solid rgba(0,200,150,0.06)",
                  background:"rgba(0,200,150,0.02)",
                  transition:"all 0.3s",position:"relative"
                }}>
                  <div style={{display:"flex",alignItems:"baseline",gap:10,marginBottom:4}}>
                    <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:18,letterSpacing:1}}>{a.name}</div>
                    <div style={{fontSize:11,color:"rgba(0,200,150,0.5)",fontStyle:"italic"}}>aka {a.aka}</div>
                  </div>
                  <div style={{fontSize:10,letterSpacing:2,color:"var(--gold)",textTransform:"uppercase",marginBottom:8}}>{a.role}</div>
                  <div style={{fontSize:12,color:"var(--gray)",lineHeight:1.5}}>{a.desc}</div>
                  <div style={{
                    position:"absolute",top:8,right:12,
                    width:6,height:6,borderRadius:"50%",
                    background:"var(--gold)",
                    boxShadow:"0 0 6px rgba(0,200,150,0.6)",
                    animation:"pulse-dot 3s infinite"
                  }}/>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>


            {/* TESTIMONIALS — real ones coming */}
      <section className="voc-section" id="testimonials">
        <FadeIn>
          <div className="voc-section-label">Client Results</div>
          <div className="voc-section-title">What Clients Are Saying</div>
          <p className="voc-section-desc">
            We&apos;re early. The work is real — the testimonials are being collected. Check back soon, or <a href="/consultation" style={{color:"var(--gold)"}}>start your own story</a>.
          </p>
        </FadeIn>
        <div style={{
          padding:"48px",border:"1px solid rgba(0,200,150,0.1)",
          background:"rgba(0,200,150,0.02)",textAlign:"center",maxWidth:640,margin:"0 auto"
        }}>
          <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:20,marginBottom:12,letterSpacing:1}}>Verified Testimonials In Progress</div>
          <p style={{fontSize:15,color:"var(--gray)",lineHeight:1.7,marginBottom:24}}>
            We only post what&apos;s real. Las Vegas clients are being onboarded — their words will live here when they&apos;re ready to share them. No fakes. No placeholders dressed up as truth.
          </p>
          <a href="/consultation" className="voc-btn-primary" style={{display:"inline-flex"}}>Be a First Client →</a>
        </div>
      </section>


      {/* BLOG PREVIEW — Fix #8 */}
      <section className="voc-section voc-section-dark" id="insights">
        <FadeIn>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:48,flexWrap:"wrap",gap:16}}>
            <div>
              <div className="voc-section-label">From The Blog</div>
              <div className="voc-section-title" style={{marginBottom:0}}>42 Articles on AI,<br/>Agents & Automation</div>
            </div>
            <a href="/blog" style={{
              display:"inline-flex",alignItems:"center",gap:8,
              fontFamily:"'Bebas Neue',sans-serif",fontSize:16,
              letterSpacing:2,color:"var(--gold)",textDecoration:"none",
              transition:"gap 0.3s",whiteSpace:"nowrap"
            }}>View All Articles →</a>
          </div>
        </FadeIn>
        <div className="blog-preview-grid">
          {[
            { slug:"27-claude-prompts-optimize-business", cat:"Claude & AI Tools", title:"27 Claude Prompts That Will Actually Optimize Your Business", date:"Feb 2024" },
            { slug:"history-of-ai-agents", cat:"AI History", title:"The History of AI Agents: From Rule-Based Bots to Autonomous Systems", date:"Jan 2024" },
            { slug:"las-vegas-businesses-using-ai-real-examples", cat:"Industry Guides", title:"How Las Vegas Businesses Are Using AI Right Now — Real Examples", date:"May 2025" },
          ].map((p, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <a href={"/blog/" + p.slug} style={{
                display:"block", padding:32,
                border:"1px solid rgba(0,200,150,0.08)",
                textDecoration:"none", color:"inherit",
                transition:"all 0.3s", position:"relative", overflow:"hidden"
              }}>
                <div style={{
                  position:"absolute",top:0,left:0,right:0,height:2,
                  background:"var(--gold)",transform:"scaleX(0)",
                  transformOrigin:"left",transition:"transform 0.4s"
                }} className="blog-hover-line"/>
                <div style={{
                  fontSize:11,letterSpacing:2,color:"var(--gold)",
                  textTransform:"uppercase",
                  background:"rgba(0,200,150,0.06)",
                  border:"1px solid rgba(0,200,150,0.15)",
                  padding:"4px 10px",display:"inline-block",marginBottom:16
                }}>{p.cat}</div>
                <div style={{
                  fontFamily:"'Bebas Neue',sans-serif",fontSize:20,
                  lineHeight:1.1,color:"var(--white)",marginBottom:12
                }}>{p.title}</div>
                <div style={{fontSize:12,color:"var(--gray)"}}>{p.date}</div>
              </a>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* CTA — Fix #7 trust signals + Fix #4 email capture */}
      <section className="voc-cta-section" id="contact">
        <FadeIn>
          <div className="voc-section-label">Ready?</div>
          <h2>LET&apos;S BUILD YOUR<br /><span style={{ color: "var(--gold)" }}>AUTONOMOUS FUTURE</span></h2>
          <p>
            Whether you&apos;re a startup finding your footing or an established company ready
            to scale — the first step is the same. Let&apos;s talk.
          </p>
          <div className="voc-cta-row" style={{ justifyContent: "center" }}>
            <a href="/consultation" className="voc-btn-primary">Book a Consultation →</a>
          </div>
        </FadeIn>
      </section>

      {/* FOOTER */}
      <footer style={{padding:"48px 5vw 32px",borderTop:"1px solid rgba(0,200,150,0.1)"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:24,marginBottom:32}}>
          <a href="#" className="voc-logo" style={{ fontSize: 22 }}>THE VOICE OF <span>CASH</span></a>
          <div className="voc-social-row">
            {SOCIAL_LINKS.map((s, i) => (
              <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" className="voc-social-link" title={s.name}>
                {s.icon}
              </a>
            ))}
          </div>
        </div>
        <div style={{
          borderTop:"1px solid rgba(0,200,150,0.06)",
          paddingTop:24,
          display:"flex",justifyContent:"space-between",
          alignItems:"center",flexWrap:"wrap",gap:16
        }}>
          <div className="voc-footer-copy">
            &copy; {new Date().getFullYear()} The Voice of Cash LLC. All rights reserved. Las Vegas, NV.
          </div>
          <div style={{display:"flex",gap:24,flexWrap:"wrap"}}>
            {[["Terms of Service","/terms"],["Privacy Policy","/privacy"],["IP Notice","/ip-notice"]].map(([label,href]) => (
              <a key={href} href={href} style={{fontSize:12,color:"rgba(136,136,136,0.6)",textDecoration:"none",letterSpacing:"0.5px",transition:"color 0.3s"}}
                onMouseEnter={e=>(e.currentTarget.style.color="#00C896")}
                onMouseLeave={e=>(e.currentTarget.style.color="rgba(136,136,136,0.6)")}
              >{label}</a>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}
