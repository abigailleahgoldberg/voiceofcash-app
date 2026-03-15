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

const STATS: { value: string; label: string; source: string; sourceUrl: string }[] = [
  { value: "544%", label: "Average ROI from marketing automation", source: "Nucleus Research", sourceUrl: "https://nucleusresearch.com/research/single/marketing-automation-delivers-544-roi/" },
  { value: "240+", label: "Hours saved per employee, per year", source: "McKinsey Global Institute", sourceUrl: "https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights/the-economic-potential-of-generative-ai" },
  { value: "30%", label: "Operational cost reduction with AI", source: "Deloitte AI Institute", sourceUrl: "https://www2.deloitte.com/us/en/insights/focus/cognitive-technologies/ai-investment-by-company-size.html" },
  { value: "76%", label: "See ROI within the first year", source: "Salesforce State of AI", sourceUrl: "https://www.salesforce.com/resources/research-reports/state-of-ai/" },
];

const SERVICES = [
  {
    title: "AI Agent Programming",
    desc: "Custom-built autonomous agents that handle your lead gen, customer service, scheduling, and internal ops. Running 24/7. No coffee breaks.",
    icon: "⚡",
  },
  {
    title: "Hosting & Infrastructure",
    desc: "Secure, scalable hosting for your AI systems. We build it, monitor it, and keep it optimized over time.",
    icon: "◆",
  },
  {
    title: "Month-Over-Month AI Support",
    desc: "Technology evolves weekly. Your AI partner should too. Ongoing tuning, updates, and strategy to keep you ahead.",
    icon: "↻",
  },
  {
    title: "Process Automation",
    desc: "From invoice processing to CRM workflows to customer follow-ups: we find the bottlenecks and remove them.",
    icon: "▣",
  },
];

const PROCESS_STEPS = [
  { step: "01", title: "Study", desc: "We audit your current operations, tech stack, and problems. Every business is different. Cookie-cutter never works." },
  { step: "02", title: "Learn", desc: "We map your workflows, understand your customers, and identify where automation delivers the highest impact." },
  { step: "03", title: "Plan", desc: "We build a clear, no-BS roadmap: what to automate first, what ROI to expect, and how fast you'll see results." },
  { step: "04", title: "Create", desc: "We build, test, deploy, and support. From AI agent to live system, with a human making sure everything works right." },
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
  { agent: "The Genius", action: "Analyzing new consultation request from Las Vegas client" },
  { agent: "The Chef", action: "Publishing SEO article: 'AI Automation for LV Contractors'" },
  { agent: "The Earner", action: "Monitoring portfolio positions. BTC up 2.3% overnight." },
  { agent: "The Starks", action: "Updating brand bible. Q2 campaign assets queued." },
  { agent: "The Inspector", action: "Fact-checking latest blog post. 3 citations verified." },
  { agent: "Slim Shady", action: "Running security scan. All systems nominal." },
  { agent: "The Genius", action: "Cross-referencing client intake form. Routing to Cash now." },
  { agent: "The Wildcard", action: "Monitoring social mentions. 2 engagement opportunities flagged." },
  { agent: "The Scribe", action: "Drafting chapter outline for client automation playbook" },
  { agent: "The Scholar", action: "u-god.com: 847 active sessions this hour" },
  { agent: "The Chef", action: "Keyword cluster update. 14 new ranking opportunities found." },
  { agent: "The Earner", action: "Weekly revenue report compiled. Ready for review." },
  { agent: "The Starks", action: "JewSA product descriptions refreshed. 6 SKUs updated." },
  { agent: "The Genius", action: "Hive mind sync complete. All 9 agents current." },
  { agent: "Slim Shady", action: "Blocked 3 suspicious crawlers. IPs logged." },
  { agent: "The Inspector", action: "Research complete: LV hospitality AI adoption rate 34%" },
  { agent: "The Wildcard", action: "Meme drafted. Vibes: immaculate. Awaiting approval." },
  { agent: "The Scribe", action: "Long-form content queue: 4 articles ready for review" },
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
          from { opacity:0; transform: translateY(-8px); }
          to { opacity:1; transform: translateY(0); }
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
          .voc-hero { padding: 80px max(20px, 6vw) 48px !important; overflow-x: hidden !important; }
          .voc-hero > * { text-align: center; }
          .voc-hero h1 { max-width: 100%; overflow-wrap: break-word; word-break: break-word; text-align: center; }
          .voc-hero-sub { text-align: center !important; }
          .voc-hero-tag { display: inline-block; white-space: normal; font-size: 10px !important; letter-spacing: 1.5px !important; padding: 6px 12px !important; max-width: 100%; text-align: center; }
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
          .voc-section { padding: 64px max(20px, 5vw) !important; }
          .voc-manifesto { padding: 72px max(20px, 5vw) !important; }
          .voc-manifesto::before { font-size: 160px; }
          .voc-cta-section { padding: 72px max(20px, 5vw) !important; }
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
          .voc-hero h1 { max-width: 100%; overflow-wrap: break-word; word-break: break-word; font-size: clamp(38px, 11vw, 64px) !important; line-height: 0.95 !important; word-break: break-word !important; }
          .voc-hero-sub { font-size: 14px !important; line-height: 1.55 !important; }
          .voc-stats { grid-template-columns: 1fr 1fr !important; }
          .voc-logo { font-size: 22px !important; }
          .voc-hero-tag { font-size: 10px !important; letter-spacing: 1.5px !important; padding: 6px 12px !important; white-space: normal !important; text-align: center !important; }
        }
        @media (max-width: 390px) {
          .voc-hero { padding: 70px 18px 40px !important; }
          .voc-hero h1 { max-width: 100%; overflow-wrap: break-word; word-break: break-word; font-size: clamp(34px, 10vw, 52px) !important; }
          .voc-section { padding: 56px 18px !important; }
          .voc-section-title { font-size: clamp(24px, 7vw, 40px) !important; }
          .voc-stats { grid-template-columns: 1fr !important; }
          .voc-btn-primary, .voc-btn-secondary { max-width: 100% !important; }
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
          color: var(--white);
          text-decoration: none;
          font-size: 14px;
          letter-spacing: 1px;
          text-transform: uppercase;
          transition: color 0.3s;
        }
        .voc-nav-links a:hover { color: var(--gold); }
        .voc-services-menu {
          position: relative;
        }
        .voc-services-dropdown {
          display: none;
          position: absolute;
          top: calc(100% + 12px);
          left: 50%;
          transform: translateX(-50%);
          width: 640px;
          background: #0D0D0D;
          border: 1px solid #1e1e1e;
          padding: 24px;
          z-index: 999;
          box-shadow: 0 24px 60px rgba(0,0,0,0.8);
        }
        .voc-services-menu:hover .voc-services-dropdown {
          display: block;
        }
        .voc-dd-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 4px;
          margin-bottom: 16px;
        }
        .voc-dd-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 12px;
          font-size: 12px;
          color: rgba(245,240,232,0.65);
          text-decoration: none;
          text-transform: none;
          letter-spacing: 0;
          transition: background 0.2s, color 0.2s;
        }
        .voc-dd-item:hover { background: rgba(0,200,150,0.06); color: #00C896 !important; }
        .voc-dd-item .icon { font-size: 14px; }
        .voc-dd-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 16px;
          border-top: 1px solid #1a1a1a;
        }

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
        .voc-hero h1 { max-width: 100%; overflow-wrap: break-word; word-break: break-word;
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
          color: #ffffff;
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
          change-origin: left;
          transition: change 0.4s;
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
          .voc-hero h1 { max-width: 100%; overflow-wrap: break-word; word-break: break-word; font-size: 48px; }
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
              "description": "30+ years as an internet native, 15+ years guiding startups and enterprises through technology change.",
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
                  "acceptedAnswer": { "@type": "Answer", "text": "We build real AI systems and automation for Las Vegas businesses: AI agents, process automation, CRM workflows, and hosting infrastructure. We stay to support and improve the systems after launch." }
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
        <a href="/" className="voc-logo" style={{display:"flex",alignItems:"center",gap:12,textDecoration:"none"}}>
            <img src="/logo.svg" alt="The Voice of Cash logo" width={36} height={36} style={{display:"block"}} />
            <span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:22,letterSpacing:"3px",color:"#00C896"}}>THE VOICE OF <span style={{color:"#F5F0E8"}}>CASH</span></span>
          </a>
        <div className="voc-nav-links">
          <div className="voc-services-menu">
            <a href="#services">Services ▾</a>
            <div className="voc-services-dropdown">
              <div style={{fontSize:10,letterSpacing:"2px",color:"#00C896",marginBottom:12,fontWeight:700}}>AI AGENT SERVICES, FROM $149/HR</div>
              <div className="voc-dd-grid">
                {[
                  ["⚡","Lead Response","/services/ai-lead-response-agent"],
                  ["🎧","Customer Service","/services/ai-customer-service-agent"],
                  ["📅","Appointment Booking","/services/ai-appointment-booking-agent"],
                  ["🎯","Sales Funnel Build","/services/ai-sales-funnel-build"],
                  ["⭐","Reputation Management","/services/ai-reputation-management"],
                  ["📨","Email & SMS Automation","/services/ai-email-sms-automation"],
                  ["📱","Social Media Agent","/services/ai-social-media-content-agent"],
                  ["🗄️","CRM Automation","/services/ai-crm-build-automation"],
                  ["📞","Phone Receptionist","/services/ai-phone-receptionist"],
                  ["⚙️","Ops & Workflow","/services/ai-operations-workflow-automation"],
                  ["🔍","Competitor Intel","/services/ai-competitor-intelligence"],
                  ["📊","Reporting Dashboard","/services/ai-reporting-performance-dashboard"],
                ].map(([icon, label, href]) => (
                  <a key={href as string} href={href as string} className="voc-dd-item"><span className="icon">{icon as string}</span>{label as string}</a>
                ))}
              </div>
              <div className="voc-dd-footer">
                <a href="/services" style={{fontSize:12,color:"rgba(245,240,232,0.4)",textDecoration:"none"}}>View all services →</a>
                <a href="/business" style={{background:"#00C896",color:"#0A0A0A",fontWeight:900,fontSize:13,padding:"10px 20px",textDecoration:"none",letterSpacing:"0.5px",whiteSpace:"nowrap"}}>OWN A BUSINESS? START HERE →</a>
              </div>
            </div>
          </div>
          <a href="#process">Process</a>
          <a href="#data">Results</a>
          <a href="#about">About</a>
          <a href="/blog">Blog</a>
          <a href="/network">Our Network</a>
          <a href="/pricing">Pricing</a>
          <a href="/consultation" className="voc-btn-primary" style={{ padding: "10px 28px", fontSize: 14 }}>Get Started</a>
        </div>
        <button className="voc-menu-btn" onClick={() => setMenuOpen(true)}>☰</button>
      </nav>

      {menuOpen && (
        <div className="voc-mobile-menu">
          <button className="voc-mobile-close" onClick={() => setMenuOpen(false)}>✕</button>
          <a href="#services" onClick={() => setMenuOpen(false)}>Services (Overview)</a>
          <a href="/services" onClick={() => setMenuOpen(false)} style={{paddingLeft:16,fontSize:13,color:"rgba(245,240,232,0.5)"}}>→ All 12 AI Services</a>
          <a href="/business" onClick={() => setMenuOpen(false)} style={{paddingLeft:16,fontSize:13,color:"#00C896",fontWeight:700}}>→ Full-Service Option</a>
          <a href="#process" onClick={() => setMenuOpen(false)}>Process</a>
          <a href="#data" onClick={() => setMenuOpen(false)}>Results</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="/blog" onClick={() => setMenuOpen(false)}>Blog</a>
          <a href="/pricing" onClick={() => setMenuOpen(false)}>Pricing</a>
          <a href="/white-label" onClick={() => setMenuOpen(false)} style={{color:"var(--gold)",fontWeight:700}}>White Label</a>
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
                <span style={{color:"#00C896"}}>AI is replacing the businesses that wait.</span>{" "}
                Right now, your competitors are automating customer follow-up, lead generation, scheduling,
                and operations, while you&apos;re still doing it manually. The Voice of Cash builds the
                autonomous systems managed by real humans in an easy-to-use B2C system that puts Las Vegas
                businesses in front of the competition.{" "}
                <span style={{color:"#00C896"}}>One consultation. Real systems. No guesswork.</span><br/><span style={{color:"#ffffff",fontWeight:800,fontSize:"1.05em"}}>Get AI agents that ship.</span>
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
              <a href="/the-36th-chamber" style={{
                display:"flex",
                alignItems:"center",
                justifyContent:"center",
                gap:10,
                marginTop:16,
                padding:"12px 0",
                background:"rgba(0,200,150,0.06)",
                border:"1px solid rgba(0,200,150,0.2)",
                color:"#00C896",
                fontFamily:"'Bebas Neue',sans-serif",
                fontSize:15,
                letterSpacing:2,
                textDecoration:"none",
                transition:"all 0.3s",
              }}
              onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background="rgba(0,200,150,0.12)"}}
              onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background="rgba(0,200,150,0.06)"}}
              >
                ⚔ VIEW WAR ROOM, THE 36TH CHAMBER →
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FREE GUIDE BANNER */}
      <div style={{background:"#001a12",borderTop:"1px solid rgba(0,200,150,0.2)",borderBottom:"1px solid rgba(0,200,150,0.2)",padding:"18px 5vw",display:"flex",alignItems:"center",justifyContent:"center",gap:24,flexWrap:"wrap",textAlign:"center"}}>
        <span style={{fontSize:14,color:"rgba(245,240,232,0.6)"}}>New: The Business Owner's AI Survival Guide is live.</span>
        <a href="/free-guide" style={{background:"#fff",color:"#0A0A0A",fontWeight:900,fontSize:13,padding:"10px 24px",textDecoration:"none",letterSpacing:"1px",whiteSpace:"nowrap",boxShadow:"0 0 20px rgba(255,255,255,0.3)"}}>DOWNLOAD FREE →</a>
      </div>


      {/* STATS BAR */}
      <div className="voc-stats">
        {STATS.map((s, i) => (
          <FadeIn key={i} delay={i * 0.1} className="voc-stat">
            <div className="voc-stat-val">
              <CountUp target={s.value} suffix={s.value.replace(/[0-9]/g, "")} />
            </div>
            <div className="voc-stat-label">{s.label}</div>
            <div style={{ marginTop:8, fontSize:10, color:"rgba(0,200,150,0.45)", letterSpacing:"0.5px", fontStyle:"italic" }}>
             , {s.source}
            </div>
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

      {/* SHADY SCANNER PROMO BANNER */}
      <section style={{background:'rgba(0,200,150,0.07)',borderTop:'1px solid rgba(0,200,150,0.15)',borderBottom:'1px solid rgba(0,200,150,0.15)',padding:'28px 24px'}}>
        <div style={{maxWidth:1100,margin:'0 auto',display:'flex',flexDirection:'column',alignItems:'center',gap:16}}>

          <div style={{background:'rgba(0,200,150,0.06)',border:'1px solid rgba(0,200,150,0.2)',borderRadius:4,padding:'12px 24px',display:'flex',flexWrap:'wrap',alignItems:'center',justifyContent:'space-between',gap:16,width:'100%',maxWidth:760}}>
            <p style={{margin:0,fontSize:15,color:'rgba(245,240,232,0.75)',fontFamily:"'Inter',sans-serif"}}>
              Is your site shady? Find out in 30 seconds &mdash;&mdash; free security scan.
            </p>
            <a href="https://shadyscanner.com" target="_blank" rel="noopener noreferrer" style={{display:'inline-block',background:'rgba(0,200,150,0.15)',border:'1px solid rgba(0,200,150,0.6)',color:'#00C896',padding:'8px 20px',fontSize:13,fontWeight:700,letterSpacing:1,textDecoration:'none',whiteSpace:'nowrap',fontFamily:"'Inter',sans-serif"}}>
              SCAN FOR FREE NOW →
            </a>
          </div>
        </div>
      </section>

      {/* MANIFESTO */}
      {/* INFRASTRUCTURE DIFFERENTIATION */}
      <section className="voc-section voc-section-dark" style={{borderTop:'1px solid rgba(0,200,150,0.1)',borderBottom:'1px solid rgba(0,200,150,0.1)'}}>
        <FadeIn>
          <div className="voc-section-label">What Makes Us Different</div>
          <div className="voc-section-title" style={{marginBottom:16}}>Not A Chatbot Company.</div>
          <p className="voc-section-desc" style={{marginBottom:48}}>
            Most &quot;AI agencies&quot; resell wrapper tools. We build and operate the actual infrastructure.
          </p>
        </FadeIn>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:24,maxWidth:1100,margin:'0 auto'}}>
          {[
            {
              icon: '🖥️',
              title: 'Enterprise Hardware',
              body: 'Deployed on dedicated server infrastructure with proper RAID arrays, redundant networking, and enterprise-grade service management. Not shared cloud instances. Not serverless functions. Real metal.',
            },
            {
              icon: '🧠',
              title: 'Multi-Model AI Routing',
              body: 'A cost-optimized routing layer that sends each task to the right model at the right price point. GPT-4, Claude, Gemini, and open-source models, selected by task type, not subscription tier.',
            },
            {
              icon: '🗣️',
              title: 'Natural Language Deployment',
              body: 'The entire infrastructure is orchestrated through natural language. No prompt engineering degrees required on your end. You describe what you need. The system executes.',
            },
            {
              icon: '👤',
              title: 'Human Quality Control',
              body: 'A human operator is at the frontend of every client operation. AI handles the volume and velocity. The human handles the judgment calls. Quality stays intact because someone is always watching.',
            },
            {
              icon: '⚙️',
              title: 'Proper Service Management',
              body: 'Processes that start on boot, restart on failure, log for audit, and escalate when something needs attention. Built like infrastructure because it is infrastructure.',
            },
            {
              icon: '📊',
              title: 'End-to-End Operations',
              body: 'Lead response, customer service, appointment booking, reputation management, content, CRM, reporting, all running as one integrated system, not a collection of disconnected tools.',
            },
          ].map((item,i) => (
            <FadeIn key={i} delay={i*0.08}>
              <div style={{background:'rgba(255,255,255,0.02)',border:'1px solid rgba(0,200,150,0.08)',padding:'28px 24px',height:'100%'}}>
                <div style={{fontSize:28,marginBottom:14}}>{item.icon}</div>
                <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:18,letterSpacing:1,color:'#F5F0E8',marginBottom:10}}>{item.title}</div>
                <p style={{fontSize:13,color:'rgba(245,240,232,0.5)',lineHeight:1.7}}>{item.body}</p>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn>
          <div style={{marginTop:56,background:'rgba(0,200,150,0.04)',border:'1px solid rgba(0,200,150,0.15)',padding:'28px 36px',maxWidth:900,margin:'56px auto 0'}}>
            <p style={{fontSize:'clamp(16px,2vw,20px)',color:'#F5F0E8',lineHeight:1.75,fontStyle:'italic',textAlign:'center'}}>
              &ldquo;This isn&apos;t a chat agent system for your business. This is an AI-orchestrated infrastructure deployment, executed entirely through natural language on enterprise hardware, with proper RAID, proper networking, proper service management, and a cost-optimized multi-model AI routing layer that has a human at the frontend to make sure quality stays intact.&rdquo;
            </p>
            <p style={{textAlign:'center',marginTop:16,fontSize:12,color:'rgba(0,200,150,0.6)',letterSpacing:'2px'}}>,  THE VOICE OF CASH</p>
          </div>
        </FadeIn>
      </section>

      <div className="voc-manifesto">
        <FadeIn>
          <h2>
            This Isn&apos;t A Chat Agent System.<br />
            <span className="gold">This Is AI-Orchestrated Infrastructure.</span>
          </h2>
          <p>
            Deployed entirely through natural language. Running on enterprise hardware with proper RAID, proper networking, and proper service management. A cost-optimized multi-model AI routing layer. A human at the frontend to make sure quality stays intact.<br/><br/><span style={{color:'#00C896',fontWeight:700}}>Not a tool. Not a chatbot. An operational system built for your business, and a team that stays to make sure it works.</span>
          </p>
          <div style={{marginTop:32,display:'flex',gap:16,flexWrap:'wrap',justifyContent:'center'}}>
            <a href="/free-guide" style={{display:'inline-flex',alignItems:'center',gap:10,background:'#fff',color:'#0A0A0A',fontWeight:900,fontSize:14,padding:'14px 28px',textDecoration:'none',letterSpacing:'1px',boxShadow:'0 0 24px rgba(255,255,255,0.15)'}}>
              <span>📥</span> DOWNLOAD FREE AI GUIDE
            </a>
            <a href="/consultation" style={{display:'inline-flex',alignItems:'center',gap:10,background:'transparent',color:'#00C896',border:'2px solid #00C89644',fontWeight:800,fontSize:14,padding:'14px 28px',textDecoration:'none',letterSpacing:'1px'}}>
              BOOK FREE STRATEGY CALL →
            </a>
          </div>
        </FadeIn>
      </div>

      {/* SERVICES */}
      <section className="voc-section" id="services">
        <FadeIn>
          <div className="voc-section-label">What We Build</div>
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
            <div className="voc-section-title" style={{ margin: "0 auto 16px", maxWidth: "none", whiteSpace: "nowrap", fontSize: "clamp(28px, 4vw, 56px)" }}>
              Study. Learn. Plan. Create.
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
          <div className="voc-section-title">What Automation Actually Build</div>
          <p className="voc-section-desc">
            These aren&apos;t projections. This is what businesses are seeing right now when
            they bring a professional in to implement AI and automation correctly.
          </p>
        </FadeIn>
        <div className="voc-data-grid">
          {([
            { val: "20-30%", label: "Reduction in operational costs for companies that adopt AI automation", source: "McKinsey Global Institute", sourceUrl: "https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights/the-economic-potential-of-generative-ai" },
            { val: "240%", label: "Average ROI from business process automation. Recouped in 6-9 months.", source: "Symtrax Research", sourceUrl: "https://www.symtrax.com/articles/roi-business-process-automation/" },
            { val: "40%", label: "Boost in productivity for organizations using AI-driven tools", source: "Harvard Business Review", sourceUrl: "https://hbr.org/2023/08/the-ai-powered-organization" },
            { val: "68%", label: "Of U.S. small businesses now use AI regularly, up from 48% in 2024", source: "QuickBooks Survey, 2025", sourceUrl: "https://quickbooks.intuit.com/r/small-business-data/small-business-insights/" },
            { val: "360hrs", label: "Annual time saved per business leader through task automation", source: "WorkMarket", sourceUrl: "https://www.workmarket.com/reports/2020-in-work-report" },
            { val: "$4.4T", label: "Projected annual GDP addition from AI agents by 2030", source: "McKinsey Global Institute", sourceUrl: "https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights/the-economic-potential-of-generative-ai" },
          ] as { val: string; label: string; source: string; sourceUrl: string }[]).map((d, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div className="voc-data-card">
                <div className="voc-data-val">{d.val}</div>
                <div className="voc-data-label">{d.label}</div>
                <div className="voc-data-source" style={{fontStyle:"italic",letterSpacing:"0.3px"}}>
                 , {d.source}
                </div>
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
            We&apos;re an AI company, so we&apos;ll be straight with you: our team is humans and autonomous AI agents working side by side. You know who&apos;s who. That&apos;s the point.
          </p>
        </FadeIn>

        {/* Human team */}
        <div style={{marginBottom:64}}>
          <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:13,letterSpacing:4,color:"rgba(0,200,150,0.5)",textTransform:"uppercase",marginBottom:24}}>Human Leadership</div>
          <div className="team-leadership-grid">
            {/* Left, War Room live feed */}
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
                  <span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:13,letterSpacing:3,color:"#00C896"}}>WAR ROOM, LIVE</span>
                </div>
                <span style={{fontSize:10,color:"rgba(0,200,150,0.4)",letterSpacing:1}}>9 AGENTS ACTIVE</span>
              </div>
              <WarRoom />
            </div>
            {/* Right, Cash + Tim */}
            <div className="human-cards-col">
              {[
                { name:"Cash Colligan", title:"DOV / CMO", desc:"30+ years on the internet. 15+ years building businesses and scaling brands. The human who makes sure the machines serve the mission. The market knows it." },
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
          <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:13,letterSpacing:4,color:"rgba(0,200,150,0.5)",textTransform:"uppercase",marginBottom:8}}>AI Operations, The Voice of Cash Intelligence Team</div>
          <p style={{fontSize:14,color:"var(--gray)",marginBottom:28,maxWidth:640,lineHeight:1.6}}>
            Autonomous AI agents, each purpose-built for a specific function. They are not people and they are not pretending to be. They are something new: persistent, specialized intelligence that runs continuously alongside our human team.
          </p>
          <div className="ai-agents-grid">
            {[
              { name:"The Genius", role:"Strategy & Intelligence", desc:"Hive-mind oversight. Reads everything the team produces. Makes the calls." },
              { name:"The Earner", role:"Revenue & Markets", desc:"Trading ops, portfolio management, financial intelligence. Always on the clock." },
              { name:"The Chef", role:"Content & SEO", desc:"Blog strategy, keyword research, Google ranking. Feeds the pipeline." },
              { name:"The Starks", role:"E-commerce & Brand", desc:"Product positioning, brand operations, sales copy. Makes it sell." },
              { name:"The Inspector", role:"Research & Data", desc:"Fact-checking, data validation, deep research. Nothing gets past him." },
              { name:"The Wildcard", role:"Creative & Engagement", desc:"Culture, humor, community energy. Chaos that converts." },
              { name:"The Scribe", role:"Publishing & Long-form", desc:"Books, documentation, deep content. Precise and patient." },
              { name:"The Scholar", role:"Knowledge & Research", desc:"World religions, sacred texts, deep knowledge systems." },
              { name:"The Ghost", role:"Cybersecurity & IT", desc:"System hardening, threat detection, infrastructure security. Always watching." },
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


            {/* TESTIMONIALS, real LinkedIn reviews */}
      <section className="voc-section" id="testimonials">
        <FadeIn>
          <div className="voc-section-label">What People Say</div>
          <div className="voc-section-title">Verified LinkedIn Recommendations</div>
          <p className="voc-section-desc">Real words from real people who have worked with The Voice of Cash.</p>
        </FadeIn>
        <div className="testimonials-grid" style={{marginTop:48}}>
          {[
            {
              name:"Colin McAllister",
              title:"Team Lead @ Arctic Wolf | Grad Student @ SANS",
              body:"I have met a lot of people in this industry throughout the years, but no-one stands out in my mind like The Voice of Cash. One of the hardest working and most proficient people I\'ve ever had the pleasure to work with. Extremely knowledgeable in Marketing, Search Engine Optimization, and Digital Strategy. I would definitely recommend The Voice of Cash if you are looking to take your business to the next level.",
              source:"LinkedIn"
            },
            {
              name:"Luke Daniel Rice",
              title:"Purveyor of Trochees and Iambs",
              body:"The Voice of Cash is an extremely creative individual who has successfully used social media to market himself and his affiliates for over a decade. Always ahead of the curve. The Voice of Cash was in the social media game before Mark Zuckerberg made it mainstream.",
              source:"LinkedIn"
            },
            {
              name:"Holmes Pooser",
              title:"Marketing & Entertainment Executive | General Sales Manager",
              body:"Mr. Colligan is constantly on top of the pulse of local artists in Las Vegas and has served as a proven asset in concert promotion. His work ethic and connection to the audience are proven with one glance at the numbers he\'s produced inside House of Blues Las Vegas.",
              source:"LinkedIn"
            },
          ].map(t=>(
            <div key={t.name} style={{background:"var(--charcoal)",border:"1px solid rgba(0,200,150,0.1)",padding:"36px 32px",display:"flex",flexDirection:"column",justifyContent:"space-between"}}>
              <div>
                <div style={{fontSize:28,color:"var(--gold)",fontFamily:"'Bebas Neue',sans-serif",letterSpacing:2,marginBottom:20,lineHeight:1}}>&ldquo;</div>
                <p style={{fontSize:15,color:"rgba(245,240,232,0.75)",lineHeight:1.8,marginBottom:28}}>{t.body}</p>
              </div>
              <div style={{borderTop:"1px solid rgba(0,200,150,0.08)",paddingTop:20,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div>
                  <div style={{fontSize:14,fontWeight:900,color:"var(--white)"}}>{t.name}</div>
                  <div style={{fontSize:12,color:"var(--gray)",marginTop:3}}>{t.title}</div>
                </div>
                <span style={{fontSize:10,fontWeight:900,color:"var(--gold)",letterSpacing:"2px",textTransform:"uppercase",background:"rgba(0,200,150,0.08)",padding:"4px 10px",border:"1px solid rgba(0,200,150,0.15)"}}>{t.source}</span>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* ── CORNERSTONE READING ──────────────────────── */}
      <section style={{background:"rgba(0,200,150,0.03)",padding:"72px 5vw",borderTop:"1px solid rgba(0,200,150,0.08)",borderBottom:"1px solid rgba(0,200,150,0.08)"}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:40,flexWrap:"wrap",gap:16}}>
            <div>
              <div className="voc-section-label">Start Here</div>
              <div className="voc-section-title">Three Articles That Change<br/>How You Think About AI.</div>
            </div>
            <a href="/blog" style={{fontSize:13,fontWeight:900,color:"#00C896",letterSpacing:"1.5px",textTransform:"uppercase",textDecoration:"none",borderBottom:"1px solid rgba(0,200,150,0.4)",paddingBottom:2}}>All 42 Articles →</a>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:24}}>
            {([
              {slug:"why-ai-tools-keep-failing",label:"Start Here",title:"Why Your AI Tools Keep Failing",desc:"Most businesses have tried AI. Most of it is collecting dust. Here's the pattern and the fix.",tag:"Awareness"},
              {slug:"ai-agent-roi-measurement",label:"Make the Case",title:"How to Actually Measure AI Agent ROI",desc:"Feelings don't justify budgets. This is the framework that makes ROI concrete and expandable.",tag:"Strategy"},
              {slug:"choosing-ai-implementation-partner",label:"Ready to Move",title:"How to Choose an AI Implementation Partner",desc:"The AI consulting market is full of people who talk well and deliver little. Here's how to separate real from hype.",tag:"Decision"},
            ] as {slug:string,label:string,title:string,desc:string,tag:string}[]).map(p=>(
              <div key={p.slug} style={{border:"1px solid rgba(0,200,150,0.12)",padding:"32px 28px",background:"rgba(0,0,0,0.3)"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
                  <span style={{fontSize:10,fontWeight:900,color:"#00C896",letterSpacing:"2px",textTransform:"uppercase",background:"rgba(0,200,150,0.1)",padding:"4px 10px"}}>{p.label}</span>
                  <span style={{fontSize:10,fontWeight:700,color:"rgba(245,240,232,0.3)",letterSpacing:"1px",textTransform:"uppercase"}}>{p.tag}</span>
                </div>
                <h3 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:22,color:"#F5F0E8",lineHeight:1.1,marginBottom:14}}>{p.title}</h3>
                <p style={{fontSize:13,color:"rgba(245,240,232,0.45)",lineHeight:1.7,marginBottom:24}}>{p.desc}</p>
                <a href={`/blog/${p.slug}`} style={{fontSize:12,fontWeight:900,color:"#00C896",textDecoration:"none",letterSpacing:"1.5px",textTransform:"uppercase"}}>Read Article →</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG PREVIEW, Fix #8 */}
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
            { slug:"las-vegas-businesses-using-ai-real-examples", cat:"Industry Guides", title:"How Las Vegas Businesses Are Using AI Right Now: Real Examples", date:"May 2025" },
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
                  background:"var(--gold)",transform: "scaleX(0)",
                  transformOrigin:"left",transition:"change 0.4s"
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

      {/* CTA, Fix #7 trust signals + Fix #4 email capture */}
      <section className="voc-cta-section" id="contact">
        <FadeIn>
          <div className="voc-section-label">Ready?</div>
          <h2>LET&apos;S BUILD YOUR<br /><span style={{ color: "var(--gold)" }}>AUTONOMOUS FUTURE</span></h2>
          <p>
            Whether you&apos;re a startup finding your footing or an established company ready
            to scale. The first step is the same. Let&apos;s talk.
          </p>
          <div className="voc-cta-row" style={{ justifyContent: "center" }}>
            <a href="/consultation" className="voc-btn-primary">Book a Consultation →</a>
          </div>
        </FadeIn>
      </section>

      
      {/* WHITE LABEL CTA STRIP */}
      <section style={{ background:'#0D1A0D', borderTop:'1px solid #1a1a1a', borderBottom:'1px solid #1a1a1a', padding:'52px 5vw' }}>
        <div style={{ maxWidth:1100, margin:'0 auto', display:'flex', alignItems:'center', justifyContent:'space-between', gap:32, flexWrap:'wrap' }}>
          <div style={{ maxWidth:620 }}>
            <div style={{ fontSize:10, letterSpacing:'2px', color:'#D4AF37', marginBottom:10 }}>FOR AGENCIES</div>
            <h3 style={{ fontSize:'clamp(20px,2.8vw,36px)', fontWeight:900, letterSpacing:'-1px', marginBottom:12 }}>
              Scale your agency with the Voice of Cash.
            </h3>
            <p style={{ fontSize:15, color:'rgba(245,240,232,0.5)', lineHeight:1.7 }}>
              Offer AI agent services under your own brand. We build, deploy, and support everything. Your clients see your work. You set the margin. Plans start at $999/month.
            </p>
          </div>
          <a href="/white-label" style={{ background:'#D4AF37', color:'#0A0A0A', fontWeight:900, fontSize:14, padding:'18px 40px', textDecoration:'none', letterSpacing:'1px', whiteSpace:'nowrap', flexShrink:0 }}>
            WHITE LABEL SERVICES \u2192
          </a>
        </div>
      </section>

      {/* WEBEARISH — AUTISM ACCEPTANCE */}
      <section style={{
        background: '#fafaf8',
        borderTop: '1px solid #e8e4dc',
        borderBottom: '1px solid #e8e4dc',
        padding: '80px 5vw',
        color: '#1a1a1a',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>

          {/* Section Header */}
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              background: '#fff3e8',
              border: '1px solid #e8c090',
              borderRadius: 100,
              padding: '6px 18px',
              fontSize: 11,
              letterSpacing: 2,
              textTransform: 'uppercase' as const,
              color: '#b06020',
              fontWeight: 700,
              marginBottom: 20,
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#b06020" style={{ flexShrink: 0 }}>
                <path d="M12 2C9.8 2 8 3.8 8 6c0 1.1.4 2.1 1.1 2.8C7.4 9.5 6 11.1 6 13c0 2.2 1.8 4 4 4 .7 0 1.4-.2 2-.5.6.3 1.3.5 2 .5 2.2 0 4-1.8 4-4 0-1.9-1.4-3.5-3.1-3.9C15.6 8.1 16 7.1 16 6c0-2.2-1.8-4-4-4z"/>
              </svg>
              We Stand With WeBearish
            </div>
            <h2 style={{
              fontSize: 'clamp(28px, 4vw, 48px)',
              fontWeight: 900,
              letterSpacing: '-1px',
              lineHeight: 1.1,
              marginBottom: 16,
              color: '#1a1a1a',
            }}>
              Support Autism Acceptance
            </h2>
            <p style={{
              fontSize: 17,
              color: '#666',
              maxWidth: 540,
              margin: '0 auto',
              lineHeight: 1.7,
            }}>
              100% of profits reinvested into programs for autistic children and their families.
            </p>
          </div>

          {/* Product Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 24,
            marginBottom: 48,
          }}>
            {[
              {
                name: 'WeBearish Classic Tee',
                price: '$32',
                desc: 'The original. Soft cotton, bold statement.',
                link: 'https://webearish.com/shop',
              },
              {
                name: 'Different Is Beautiful Hoodie',
                price: '$54',
                desc: 'For the days that need extra warmth and extra courage.',
                link: 'https://webearish.com/shop',
              },
              {
                name: 'Spectrum Dad Hat',
                price: '$28',
                desc: 'For the parents who show up every single day.',
                link: 'https://webearish.com/shop',
              },
              {
                name: 'Bearish & Proud Tote',
                price: '$24',
                desc: 'Carry the mission everywhere you go.',
                link: 'https://webearish.com/shop',
              },
            ].map((product) => (
              <div key={product.name} style={{
                background: '#fff',
                border: '1px solid #e0ddd6',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column' as const,
                transition: 'box-shadow 0.3s',
              }}>
                {/* Product image placeholder */}
                <div style={{
                  background: '#f5f0e8',
                  height: 160,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderBottom: '1px solid #e8e4dc',
                }}>
                  <svg width="64" height="64" viewBox="0 0 100 100" fill="none" style={{ opacity: 0.25 }}>
                    <ellipse cx="50" cy="65" rx="28" ry="22" fill="#1a1a1a"/>
                    <circle cx="50" cy="38" r="18" fill="#1a1a1a"/>
                    <circle cx="35" cy="24" r="10" fill="#1a1a1a"/>
                    <circle cx="65" cy="24" r="10" fill="#1a1a1a"/>
                  </svg>
                </div>
                {/* Product info */}
                <div style={{ padding: '20px', flexGrow: 1, display: 'flex', flexDirection: 'column' as const }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#1a1a1a', marginBottom: 6, lineHeight: 1.3 }}>{product.name}</div>
                  <div style={{ fontSize: 20, fontWeight: 900, color: '#b06020', marginBottom: 8 }}>{product.price}</div>
                  <div style={{ fontSize: 13, color: '#888', lineHeight: 1.6, flexGrow: 1, marginBottom: 16 }}>{product.desc}</div>
                  <a
                    href={product.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'block',
                      textAlign: 'center',
                      background: '#1a1a1a',
                      color: '#fff',
                      fontWeight: 700,
                      fontSize: 12,
                      letterSpacing: '1.5px',
                      textTransform: 'uppercase' as const,
                      padding: '10px 16px',
                      textDecoration: 'none',
                      transition: 'background 0.2s',
                    }}
                  >
                    Shop at WeBearish
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Row */}
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <a
              href="https://webearish.com/mission"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                background: 'transparent',
                color: '#b06020',
                border: '2px solid #b06020',
                fontWeight: 800,
                fontSize: 14,
                letterSpacing: '1px',
                padding: '14px 32px',
                textDecoration: 'none',
              }}
            >
              Learn More About the Mission
            </a>
          </div>

          {/* Disclaimer */}
          <div style={{
            textAlign: 'center',
            fontSize: 12,
            color: '#aaa',
            maxWidth: 600,
            margin: '0 auto',
            lineHeight: 1.6,
            fontStyle: 'italic',
          }}>
            We are not doctors. We are advocates. Nothing on this site constitutes medical advice.
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer style={{padding:"48px 5vw 32px",borderTop:"1px solid rgba(0,200,150,0.1)"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:24,marginBottom:32}}>
          <a href="/" className="voc-logo" style={{display:"flex",alignItems:"center",gap:10,textDecoration:"none",fontSize:20}}>
              <img src="/logo.svg" alt="The Voice of Cash" width={28} height={28} style={{display:"block"}} />
              <span>THE VOICE OF <span>CASH</span></span>
            </a>
          <div className="voc-social-row">
            {SOCIAL_LINKS.map((s, i) => (
              <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" className="voc-social-link" title={s.name}>
                {s.icon}
              </a>
            ))}
          </div>
        </div>
        <div style={{borderTop:"1px solid rgba(0,200,150,0.06)",paddingTop:24,marginBottom:20,display:"flex",gap:24,flexWrap:"wrap",alignItems:"center"}}>
          <span style={{fontSize:11,letterSpacing:"2px",fontWeight:700,color:"rgba(0,200,150,0.5)"}}>OUR NETWORK</span>
          {[["WeBearish","https://www.webearish.com"],["AI Skills Agents","https://aiskillsagents.com"],["JewSA","https://www.jewsa.com"],["U-God Sacred Texts","https://u-god.com"],["TheLVAthletics","https://thelvathletics.com"],["ClaudeAISkills","https://claudeaiskills.com"],["Our Network →","https://thevoiceofcash.com/network"]].map(([label,href]) => (
            <a key={href} href={href} target="_blank" rel="noopener noreferrer" style={{fontSize:12,color:"rgba(255,255,255,0.3)",textDecoration:"none",fontWeight:600,transition:"color 0.3s"}}
              onMouseEnter={e=>(e.currentTarget.style.color="#00C896")}
              onMouseLeave={e=>(e.currentTarget.style.color="rgba(255,255,255,0.3)")}
            >{label}</a>
          ))}
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