"use client";
import { useEffect, useRef, useState } from "react";
import "./cactus.css";

export default function CactusJoesPage() {
  const [authed, setAuthed] = useState(false);
  const [pwValue, setPwValue] = useState("");
  const [pwError, setPwError] = useState("");
  const scrollFillRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  // Check session on mount
  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem("cj_auth") === "1") {
      setAuthed(true);
    }
  }, []);

  function handleUnlock(e: React.FormEvent) {
    e.preventDefault();
    if (pwValue === "1234!") {
      sessionStorage.setItem("cj_auth", "1");
      setAuthed(true);
      setPwError("");
    } else {
      setPwError("Incorrect password. Please try again.");
      setPwValue("");
      setTimeout(() => setPwError(""), 3000);
    }
  }

  // Init all presentation JS after auth
  useEffect(() => {
    if (!authed || initialized.current) return;
    initialized.current = true;

    // Scroll progress
    const fill = scrollFillRef.current;
    let raf: number | null = null;
    function updateScroll() {
      if (!fill) return;
      const scrollTop = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const pct = maxScroll > 0 ? scrollTop / maxScroll : 0;
      fill.style.transform = `scaleY(${pct})`;
    }
    window.addEventListener("scroll", () => {
      if (!raf) raf = requestAnimationFrame(() => { updateScroll(); raf = null; });
    }, { passive: true });

    // Reveal observer
    const revealIO = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
    document.querySelectorAll(".reveal").forEach((el) => revealIO.observe(el));

    // Scene 1: gradient shift
    const scene1 = document.getElementById("scene1");
    const dayBg = document.getElementById("scene1DayBg");
    if (scene1 && dayBg) {
      let raf1: number | null = null;
      const updateDay = () => {
        const rect = scene1.getBoundingClientRect();
        const h = scene1.offsetHeight;
        const pct = Math.max(0, Math.min(1, -rect.top / (h * 0.7)));
        (dayBg as HTMLElement).style.opacity = String(pct);
      };
      window.addEventListener("scroll", () => {
        if (!raf1) raf1 = requestAnimationFrame(() => { updateDay(); raf1 = null; });
      }, { passive: true });
      updateDay();
    }

    // Scene 2: merge
    const callout2 = document.getElementById("scene2Callout");
    const twocol = document.getElementById("twocol");
    if (callout2 && twocol) {
      const mergeIO = new IntersectionObserver((entries) => {
        entries.forEach((e) => { if (e.isIntersecting) twocol.classList.add("merged"); });
      }, { threshold: 0.3 });
      mergeIO.observe(callout2);
    }

    // Scene 3: progress bar pulse intensify
    const barLost = document.getElementById("revenueBarLost");
    if (barLost) {
      let statCount = 0;
      const statIO = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const stat = parseInt((e.target as HTMLElement).getAttribute("data-stat") || "0", 10);
            if (stat > statCount) {
              statCount = stat;
              barLost.className = `revenue-bar-lost stat-${statCount}`;
            }
          }
        });
      }, { threshold: 0.5 });
      document.querySelectorAll(".stat-line[data-stat]").forEach((el) => statIO.observe(el));
    }

    // Constellation tooltips (Scene 5)
    document.querySelectorAll(".constellation-node").forEach((node) => {
      const tip = node.querySelector(".node-tooltip") as HTMLElement | null;
      if (!tip) return;
      node.addEventListener("mouseenter", () => { if (tip) tip.style.opacity = "1"; });
      node.addEventListener("mouseleave", () => { if (tip) tip.style.opacity = "0"; });
      node.addEventListener("focus", () => { if (tip) tip.style.opacity = "1"; });
      node.addEventListener("blur", () => { if (tip) tip.style.opacity = "0"; });
    });

    // Counter animation util
    function animateCounter(el: HTMLElement, target: number, duration = 800) {
      const start = performance.now();
      function step(now: number) {
        const elapsed = now - start;
        const pct = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - pct, 3);
        el.textContent = Math.round(ease * target).toLocaleString();
        if (pct < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }

    // Trigger counters when visible
    const counterIO = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const el = e.target as HTMLElement;
          const target = parseInt(el.getAttribute("data-target") || "0", 10);
          animateCounter(el, target);
          counterIO.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    document.querySelectorAll(".counter-num").forEach((el) => counterIO.observe(el));

    // Table row staggered reveal
    const tableRows = document.querySelectorAll(".table-row-reveal");
    const tableIO = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const row = entry.target as HTMLElement;
          const idx = parseInt(row.getAttribute("data-row") || "0", 10);
          setTimeout(() => row.classList.add("row-visible"), idx * 100);
          tableIO.unobserve(row);
        }
      });
    }, { threshold: 0.3 });
    tableRows.forEach((el) => tableIO.observe(el));

    // Total line glow pulse on reveal
    const totalLine = document.getElementById("totalLine");
    if (totalLine) {
      const totalIO = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setTimeout(() => totalLine.classList.add("glow-pulse"), 800);
            totalIO.unobserve(totalLine);
          }
        });
      }, { threshold: 0.5 });
      totalIO.observe(totalLine);
    }

    // Scene 7: shimmer callout
    const shimmerCallout = document.getElementById("shimmerCallout");
    if (shimmerCallout) {
      const shimIO = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { shimmerCallout.classList.add("shimmer-run"); shimIO.unobserve(shimmerCallout); }
        });
      }, { threshold: 0.5 });
      shimIO.observe(shimmerCallout);
    }

    // Scene 7: pricing note show/hide
    const pricingNote = document.getElementById("pricingNote");
    const scene7 = document.getElementById("scene7");
    const scene12end = document.getElementById("scene13");
    if (pricingNote && scene7) {
      const noteIO = new IntersectionObserver((entries) => {
        entries.forEach((e) => { pricingNote.classList.toggle("visible", e.isIntersecting); });
      }, { threshold: 0.05 });
      noteIO.observe(scene7);
      if (scene12end) noteIO.observe(scene12end);
    }

    // Scene 8: whisper reveal
    const whisperIO = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("whisper-visible");
      });
    }, { threshold: 0.2, rootMargin: "0px 0px -80px 0px" });
    document.querySelectorAll(".whisper-card").forEach((el) => whisperIO.observe(el));

    // Scene 10: timeline rail fill on scroll — always vertical
    const scene10 = document.getElementById("scene10");
    const timelineRail = document.getElementById("timelineRail");
    if (scene10 && timelineRail) {
      let rafTl: number | null = null;
      const updateRail = () => {
        const rect = scene10.getBoundingClientRect();
        const h = scene10.offsetHeight;
        const pct = Math.max(0, Math.min(1, (-rect.top) / (h * 0.85)));
        timelineRail.style.height = `${pct * 100}%`;
      };
      window.addEventListener("scroll", () => {
        if (!rafTl) rafTl = requestAnimationFrame(() => { updateRail(); rafTl = null; });
      }, { passive: true });
      updateRail();
    }

    // Timeline active states
    const timelineIO = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("active");
      });
    }, { threshold: 0.4 });
    document.querySelectorAll(".timeline-node").forEach((el) => timelineIO.observe(el));

    // Scene 12: rate reveal
    const rateReveal = document.getElementById("rateReveal");
    if (rateReveal) {
      const rateIO = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { rateReveal.classList.add("visible"); rateIO.unobserve(rateReveal); }
        });
      }, { threshold: 0.3 });
      rateIO.observe(rateReveal);
    }

    // Scene 13: unified fade-in
    const scene13Content = document.getElementById("scene13Content");
    const scene13Final = document.getElementById("scene13Final");
    if (scene13Content) {
      const s13IO = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            scene13Content.classList.add("visible");
            if (scene13Final) scene13Final.style.opacity = "0.6";
            s13IO.unobserve(scene13Content);
          }
        });
      }, { threshold: 0.2 });
      s13IO.observe(scene13Content);
    }

    updateScroll();
    return () => {
      window.removeEventListener("scroll", updateScroll);
    };
  }, [authed]);

  if (!authed) {
    return (
      <div className="pw-gate" role="dialog" aria-modal="true" aria-labelledby="pwTitle">
        <h1 id="pwTitle">
          THE VOICE OF CASH
          <span style={{ fontSize: "0.6em", letterSpacing: "0.15em", fontFamily: "var(--font-sans)", fontWeight: 400, display: "block" }}>
            × CACTUS JOE&apos;S × THE CRYSTAL GARDEN
          </span>
        </h1>
        <p>Private Presentation</p>
        <form className="pw-form" onSubmit={handleUnlock} noValidate>
          <input
            className="pw-input"
            type="password"
            value={pwValue}
            onChange={(e) => setPwValue(e.target.value)}
            placeholder="Enter password"
            autoComplete="off"
            aria-label="Presentation password"
            autoFocus
            required
          />
          <button className="pw-btn" type="submit">Enter</button>
          <p className="pw-error" role="alert" aria-live="polite">{pwError}</p>
        </form>
      </div>
    );
  }

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <div className="scroll-progress" aria-hidden="true">
        <div className="scroll-progress-fill" ref={scrollFillRef}></div>
      </div>

      <main id="main-content">

        {/* ============================================================
            SCENE 1 — COLD OPEN
            ============================================================ */}
        <section className="scene scene-1" id="scene1" aria-label="Cold Open">
          <div className="scene-1-bg-dawn" aria-hidden="true"></div>
          <div className="scene-1-bg-day" id="scene1DayBg" aria-hidden="true"></div>

          <svg className="desert-silhouette" viewBox="0 0 1440 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="none">
            <path d="M0,200 L0,140 Q180,80 360,120 Q540,160 720,90 Q900,20 1080,80 Q1260,140 1440,100 L1440,200 Z" fill="rgba(10,8,5,0.7)"/>
            <path d="M0,200 L0,160 Q200,110 400,140 Q600,170 800,120 Q1000,70 1200,120 Q1350,150 1440,130 L1440,200 Z" fill="rgba(10,8,5,0.85)"/>
            <path d="M0,200 L0,175 Q300,155 600,165 Q900,175 1200,155 Q1350,145 1440,160 L1440,200 Z" fill="rgba(10,8,5,0.95)"/>
          </svg>

          <div className="scene-1-content">
            <p className="scene-1-line reveal" id="s1l1">12 miles from the Strip.</p>
            <p className="scene-1-line reveal reveal-delay-1" id="s1l2">A thousand miles from anything like it.</p>
            <div className="scene-1-beat" aria-hidden="true"></div>
            <p className="scene-1-line reveal" id="s1l3">38 years in the desert.</p>
            <p className="scene-1-line reveal reveal-delay-1" id="s1l4">7.5 acres nobody can replicate.</p>
            <p className="scene-1-line reveal reveal-delay-2" id="s1l5">A mineral collection most museums would kill for.</p>
            <p className="scene-1-line turn reveal reveal-delay-3" id="s1l6">And right now — it&apos;s running on grit and instinct alone.</p>
            <div className="scene-1-beat-sm" aria-hidden="true"></div>
            <p className="scene-1-line zinger reveal" id="s1l7">That&apos;s about to change.</p>
            <p className="scene-1-tag reveal" id="s1tag">The Voice of Cash — AI Implementation Partner, Las Vegas</p>
          </div>
        </section>

        {/* ============================================================
            SCENE 2 — WHO'S IN THE ROOM
            ============================================================ */}
        <section className="scene scene-2" id="scene2" aria-label="Who's in the Room">
          <div className="scene-inner">
            <div className="gold-rule centered reveal" aria-hidden="true"></div>
            <h2 className="section-header reveal" style={{ textAlign: "center" }}>Two businesses. One property. One conversation.</h2>
            <div className="two-col" id="twocol">
              <div className="panel-left">
                <div className="card card-warm reveal">
                  <p className="panel-label">Cactus Joe&apos;s</p>
                  <p className="panel-item reveal reveal-delay-1">Est. 1988 — Las Vegas desert nursery institution</p>
                  <p className="panel-item reveal reveal-delay-2">7.5 acres of native plants, cacti, desert landscaping</p>
                  <p className="panel-item reveal reveal-delay-3">Known regionally. Trusted locally. A legacy brand.</p>
                  <p className="panel-item reveal reveal-delay-4">Revenue today: nursery sales, landscaping services, plant inventory</p>
                </div>
              </div>
              <div className="panel-right">
                <div className="card card-cool reveal reveal-delay-2">
                  <p className="panel-label" style={{ color: "var(--text-secondary)" }}>The Crystal Garden</p>
                  <p className="panel-item reveal reveal-delay-1">New brand. Built inside the legacy.</p>
                  <p className="panel-item reveal reveal-delay-2">Crystals, minerals, metaphysical retail, education, events</p>
                  <p className="panel-item reveal reveal-delay-3">Onsite shop with ~$150,000+ retail mineral inventory, 50,000+ lbs of outdoor material</p>
                  <p className="panel-item reveal reveal-delay-4">Revenue today: walk-in crystal sales, early-stage event bookings</p>
                </div>
              </div>
            </div>
            <div className="scene-2-center" id="scene2Callout">
              <p className="callout-text reveal">Separate businesses. Shared property. Shared opportunity.</p>
              <p className="body-text reveal reveal-delay-2" style={{ textAlign: "center", margin: "0 auto" }}>
                What we&apos;re here to talk about is how each of you grows independently — and how working together makes both of you unstoppable.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================
            SCENE 3 — THE PROBLEM
            ============================================================ */}
        <section className="scene scene-3" id="scene3" aria-label="The Problem">
          <div className="scene-inner">

            {/* BLOCK A — Header alone: its own viewport */}
            <div className="scene-3-block-header">
              <div>
                <div className="gold-rule reveal" aria-hidden="true"></div>
                <h2 className="section-header reveal">
                  Joe, what you&apos;ve built is extraordinary. And it&apos;s leaving money on the table every single day.
                </h2>
              </div>
            </div>

            {/* BLOCK B — Stats alone: its own viewport */}
            <div className="scene-3-block-stats">
              <div aria-label="Revenue gap statistics">
                <p className="stat-line reveal" data-stat="1">The store closes at sundown. The internet doesn&apos;t.</p>
                <p className="stat-line reveal reveal-delay-1" data-stat="2">No online store. No booking system. No automated follow-up.</p>
                <p className="stat-line reveal reveal-delay-2" data-stat="3">Customers drive out, love it, leave — and you never hear from them again.</p>
                <p className="stat-line reveal reveal-delay-3" data-stat="4">No email list capturing walk-ins. No review engine running.</p>
                <p className="stat-line reveal reveal-delay-4" data-stat="5">Google doesn&apos;t know what you sell. Instagram doesn&apos;t know you exist (yet).</p>
                <p className="stat-line reveal reveal-delay-5" data-stat="6">Every inquiry that comes in after hours? Gone.</p>
                <p className="stat-line reveal reveal-delay-6" data-stat="7">Every lead not followed up in 5 minutes? 80% less likely to convert.</p>
              </div>
            </div>

            {/* BLOCK C — Progress bar + diagnosis: its own viewport */}
            <div className="scene-3-block-close">
              <div className="revenue-bar-wrap reveal">
                <div className="revenue-bar-labels">
                  <span>Revenue Captured</span>
                  <span>Revenue Left on the Table</span>
                </div>
                <div className="revenue-bar" role="img" aria-label="Revenue gap: approximately 15% captured, 85% left on the table">
                  <div className="revenue-bar-captured"></div>
                  <div className="revenue-bar-lost" id="revenueBarLost"></div>
                </div>
              </div>
              <p className="callout-text reveal" style={{ marginTop: "3rem" }}>
                This isn&apos;t a criticism. This is a diagnosis. You&apos;ve built a $3 million property running on a $5,000-a-month engine. We&apos;re here to build the engine it deserves.
              </p>
              <p className="body-text reveal reveal-delay-2" style={{ marginTop: "1.5rem", fontStyle: "italic", color: "var(--text-secondary)" }}>
                &quot;The average business takes 47 hours to respond to a new inquiry. The one that responds first wins. Right now, that&apos;s not you — but it will be.&quot;
              </p>
            </div>

          </div>
        </section>

        {/* ============================================================
            SCENE 4 — WHO WE ARE
            ============================================================ */}
        <section className="scene scene-4" id="scene4" aria-label="Who We Are">
          <div className="scene-inner">
            <h2 className="section-header reveal">Not a chatbot company.</h2>
            <p className="body-text reveal reveal-delay-1">
              We&apos;re The Voice of Cash. AI implementation partner, Las Vegas. We design, build, and deploy custom AI agents and automation systems that actually work — then we stay to make sure they keep working.
            </p>
            <div className="cards-shelf" style={{ marginTop: "3rem" }}>
              <div className="card reveal reveal-delay-1">
                <h3>Real Infrastructure</h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "clamp(0.9rem,1.3vw,1rem)", lineHeight: "1.8", margin: 0 }}>
                  Enterprise hardware. Multi-model AI routing. Not shared cloud. Not a Zapier hack. Real systems.
                </p>
              </div>
              <div className="card reveal reveal-delay-2">
                <h3>Human at the Frontend</h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "clamp(0.9rem,1.3vw,1rem)", lineHeight: "1.8", margin: 0 }}>
                  AI handles the volume. A human handles the judgment calls. Quality stays intact because someone is always watching.
                </p>
              </div>
              <div className="card reveal reveal-delay-3">
                <h3>Study. Learn. Plan. Create.</h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "clamp(0.9rem,1.3vw,1rem)", lineHeight: "1.8", margin: 0 }}>
                  No cookie-cutter playbooks. Every engagement starts with understanding your business from the inside out. That&apos;s why we&apos;re here today — listening first.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            SCENE 5 — THE VISION / CONSTELLATION
            ============================================================ */}
        <section className="scene scene-5" id="scene5" aria-label="The Vision: The Ecosystem">
          <div className="scene-inner">
            <div className="gold-rule reveal" aria-hidden="true"></div>
            <h2 className="section-header reveal">Not a store. Not a venue. An ecosystem.</h2>
            <p className="body-text reveal reveal-delay-1">
              This property is sitting on top of at least twelve revenue streams. Most of them aren&apos;t turned on yet. Some of them don&apos;t even exist yet. But the bones are here. The story is here. The land is here. What we&apos;re proposing isn&apos;t a marketing campaign. It&apos;s an operational backbone — a system that captures every dollar this property is capable of generating, automatically, around the clock.
            </p>
            <p className="italic-muted reveal reveal-delay-2" style={{ marginTop: "1.5rem" }}>
              In-Store Mineral &amp; Crystal Sales remain the anchor. The rock shop is open, inventory exists — $150,000+ in specimens, 50,000 lbs of outdoor material — and every other activity on the property funnels people back into this room. Every event, every class, every Instagram post is a mechanism that puts a human being inside that shop.
            </p>

            {/* Constellation — desktop SVG layout */}
            <div className="constellation-wrap reveal" aria-label="Revenue stream constellation map" role="img">
              {/* SVG connecting lines */}
              <svg className="constellation-svg" aria-hidden="true">
                {[
                  [350,350, 350,80],  // 0 top
                  [350,350, 560,160], // 1 top-right
                  [350,350, 620,350], // 2 right
                  [350,350, 560,540], // 3 bottom-right
                  [350,350, 430,630], // 4 bottom-right-2
                  [350,350, 350,620], // 5 bottom
                  [350,350, 270,630], // 6 bottom-left-2
                  [350,350, 140,540], // 7 bottom-left
                  [350,350,  80,350], // 8 left
                  [350,350, 140,160], // 9 top-left
                  [350,350, 270, 70], // 10 top-left-2
                  [350,350, 470, 90], // 11 top-right-2
                ].map(([x1,y1,x2,y2],i) => (
                  <line key={i} x1={`${(x1/700*100)}%`} y1={`${(y1/700*100)}%`} x2={`${(x2/700*100)}%`} y2={`${(y2/700*100)}%`} />
                ))}
              </svg>

              {/* Central node */}
              <div className="constellation-node" style={{ left: "50%", top: "50%" }} tabIndex={0} aria-label="The Property — central hub">
                <div className="node-circle central">The<br/>Property</div>
                <div className="node-tooltip">Every revenue stream flows through this land.</div>
              </div>

              {/* 12 satellite nodes — radially placed */}
              {[
                { label: "Onsite Crystal Shop", tip: "Walk-in retail. The anchor. Every other stream funnels here.", left: "50%", top: "11%", anchor: true },
                { label: "Online Crystal Store", tip: "24/7 storefront. Ships nationwide. The store never closes.", left: "80%", top: "23%", anchor: false },
                { label: "Nursery Sales", tip: "Cactus Joe's core. Plants, cacti, desert landscaping.", left: "89%", top: "50%", anchor: false },
                { label: "Landscaping Services", tip: "Installations, consultations, design.", left: "80%", top: "77%", anchor: false },
                { label: "Weddings & Elopements", tip: "Desert ceremony packages ($500–$5,000+).", left: "61%", top: "90%", anchor: false },
                { label: "Private Events", tip: "Birthday parties, corporate retreats, reunions.", left: "50%", top: "89%", anchor: false },
                { label: "Classes & Workshops", tip: "Wire wrapping, mineral ID, crystal healing, kids' rock discovery, suncatcher making, desert ecology walks.", left: "39%", top: "90%", anchor: false },
                { label: "School Field Trips", tip: "Educational destination. Aligned with Nevada NGSS earth science standards.", left: "20%", top: "77%", anchor: false },
                { label: "Art in the Desert", tip: "Monthly cultural event. Artists, live music, vendors, community.", left: "11%", top: "50%", anchor: false },
                { label: "Holiday & Seasonal Events", tip: "Holiday lights, solstice ceremonies, themed markets.", left: "20%", top: "23%", anchor: false },
                { label: "Special Needs Events", tip: "Safe, natural spaces for underserved families.", left: "39%", top: "10%", anchor: false },
                { label: "Digital Products", tip: "Crystal guides, subscriptions, virtual content.", left: "67%", top: "13%", anchor: false },
              ].map((node, i) => (
                <div
                  key={i}
                  className="constellation-node"
                  style={{ left: node.left, top: node.top }}
                  tabIndex={0}
                  aria-label={`${node.label}: ${node.tip}`}
                >
                  <div className={`node-circle ${node.anchor ? "anchor" : "regular"}`}></div>
                  <div className="node-label">{node.label}</div>
                  <div className="node-tooltip" role="tooltip">{node.tip}</div>
                </div>
              ))}
            </div>

            {/* Mobile: list view */}
            <ul className="constellation-list" aria-label="Revenue streams">
              <li className="anchor-item">The Property — Central Hub <span>Every revenue stream flows through this land.</span></li>
              <li className="anchor-item">Onsite Crystal Shop <span>Walk-in retail. The anchor. Every other stream funnels here.</span></li>
              {[
                ["Online Crystal Store (Shopify)", "24/7 storefront. Ships nationwide."],
                ["Nursery Sales", "Cactus Joe's core. Plants, cacti, desert landscaping."],
                ["Landscaping Services", "Installations, consultations, design."],
                ["Weddings & Elopements", "Desert ceremony packages ($500–$5,000+)."],
                ["Private Events", "Birthday parties, corporate retreats, reunions."],
                ["Classes & Workshops", "Wire wrapping, mineral ID, crystal healing, and more."],
                ["School Field Trips", "Nevada NGSS-aligned. Geology, ecology, desert science."],
                ["Art in the Desert", "Monthly cultural event. Artists, music, vendors."],
                ["Holiday & Seasonal Events", "Holiday lights, solstice ceremonies, themed markets."],
                ["Special Needs & Sensory Events", "Safe, natural spaces for underserved families."],
                ["Digital Products & Memberships", "Crystal guides, subscriptions, virtual content."],
              ].map(([label, tip], i) => (
                <li key={i}>{label} <span>{tip}</span></li>
              ))}
            </ul>

            <p className="callout-text reveal" style={{ marginTop: "3rem" }}>
              Every stream feeds the others. After a field trip, an excited child returns home with a crystal and a story, the family comes for their birthday party with their friends, parents discover the crystal shop, books a class, leaves a review, gets an email, comes back for Art in the Desert, books a wedding for their daughter. That&apos;s not a transaction. That&apos;s a lifecycle. That&apos;s what we build.
            </p>
          </div>
        </section>

        {/* ============================================================
            SCENE 6 — INCOME GENERATORS
            ============================================================ */}
        <section className="scene scene-6" id="scene6" aria-label="The Income Generators">
          <div className="scene-inner">
            <h2 className="section-header reveal">Where the money comes from. Specifically.</h2>

            {/* Card 1 */}
            <div className="income-card reveal">
              <h3>Online Crystal Store (Shopify)</h3>
              <p>The store never closes. Customers from the Las Vegas visit come home, pull up the site, buy again. Tourists. Collectors. Metaphysical community. Nationwide shipping.</p>
              <ul className="data-points">
                <li>Conservative target: <span className="accent-text mono">$4,000–$8,000/month</span> within 6 months</li>
                <li>Product photography automated with AI tools (Pomelli system already documented)</li>
                <li>Listings tied to the 192+ crystal product cards already written</li>
                <li>Inventory synced between onsite and online</li>
                <li>Automated abandoned cart recovery, post-purchase follow-up, review requests</li>
              </ul>
              <p className="card-callout-italic">&quot;You have $150,000 in retail mineral inventory sitting in a building with no website. Let&apos;s fix that.&quot;</p>
            </div>

            {/* Card 2 */}
            <div className="income-card reveal">
              <h3>Onsite Crystal Shop — The Anchor</h3>
              <p>The physical experience is the brand&apos;s superpower. Walking through that space, touching the stones, hearing the story — that can&apos;t be replicated online. But right now, the shop has no way to capture visitors after they leave. Every other stream in this ecosystem funnels people into this room. This is the gravitational center.</p>
              <ul className="data-points">
                <li>Implement email/SMS capture at point of sale</li>
                <li>Post-visit automated follow-up: &quot;Thanks for visiting — here&apos;s your crystal care guide&quot;</li>
                <li>Review request triggers after every purchase</li>
                <li>Loyalty program for return locals</li>
                <li>Target uplift: <span className="accent-text mono">15–25%</span> increase in repeat visits within 6 months</li>
              </ul>
            </div>

            {/* Card 3 */}
            <div className="income-card reveal">
              <h3>Weddings &amp; Elopements</h3>
              <p>Desert elopements are a growing Las Vegas niche. This property is one of the most photogenic, unique ceremony locations in the valley. Packages already outlined from Desert Elopement to Desert Celebration.</p>
              <ul className="data-points">
                <li>AI booking agent handles inquiries 24/7 — schedules tours, answers FAQs, sends packages</li>
                <li>Automated follow-up sequences for leads who don&apos;t book immediately</li>
                <li>Review engine targeting wedding platforms (Google, The Knot, WeddingWire)</li>
                <li>Conservative target: 2–4 bookings/month = <span className="accent-text mono">$2,000–$10,000/month</span></li>
                <li>Every wedding = photos on social media = free marketing</li>
              </ul>
            </div>

            {/* Card 4 */}
            <div className="income-card reveal">
              <h3>Private Events</h3>
              <p>Birthday parties for kids. Team-building for companies. Wellness retreats. This property has space, character, and flexibility most venues can&apos;t touch.</p>
              <ul className="data-points">
                <li>Package pricing, online booking, automated reminders and confirmations</li>
                <li>Post-event review request and photo follow-up</li>
                <li>Target: 2–4 events/month = <span className="accent-text mono">$1,500–$6,000/month</span></li>
                <li>Each event introduces 15–50 new people to the property</li>
              </ul>
            </div>

            {/* Card 5 */}
            <div className="income-card reveal">
              <h3>Classes &amp; Workshops</h3>
              <p>Six workshops already designed: Mineral ID, Wire Wrapping, Crystal Healing, Kids&apos; Rock Discovery, Suncatcher Making, Desert Ecology Walk. Priced $35–$75/person. Materials included. Upsell into the shop built into every class.</p>
              <ul className="data-points">
                <li>Online booking through AI agent</li>
                <li>Automated waitlists, reminders, post-class follow-up</li>
                <li>Target: 2–3 classes/week = <span className="accent-text mono">$1,500–$4,000/month</span></li>
                <li>Each class is a content opportunity (photos, testimonials, social proof)</li>
              </ul>
            </div>

            {/* Card 6 */}
            <div className="income-card reveal">
              <h3>School Field Trips</h3>
              <p>There is no desert ecology + mineral science field trip destination in Las Vegas. Clark County has over 300,000 K–12 students. Home school groups. Scout troops. Summer camps. Aligned with Nevada NGSS earth science standards — serving schools in Summerlin, Spring Valley, and the southwest valley, all within 25 minutes. Each field trip is also a marketing event: 30 kids go home with a crystal and a story, and 30 families hear about Cactus Joe&apos;s at dinner that night.</p>
              <ul className="data-points">
                <li>Geology, ecology, native plants, water conservation — all on-site, all hands-on</li>
                <li>Pricing: $10–$15/student, groups of 20–60</li>
                <li>Target: 2–4 field trips/month = <span className="accent-text mono">$800–$3,600/month</span></li>
                <li>Every kid goes home with a rock and a story — parents come back</li>
                <li>Outreach to local schools, homeschool co-ops, scout councils, summer camp programs</li>
                <li>Potential for recurring annual bookings from the same schools</li>
              </ul>
            </div>

            {/* Card 7 */}
            <div className="income-card reveal">
              <h3>Art in the Desert</h3>
              <p>Monthly community event featuring local artists, live acoustic music, mineral displays, food, vendor booths. Already planned. This is the anchor event that builds community and drives recurring foot traffic.</p>
              <ul className="data-points">
                <li>Free admission — revenue from vendor fees, food, crystal sales, class sign-ups</li>
                <li>Target: <span className="accent-text mono">$2,000–$5,000/event</span> in combined revenue</li>
                <li>Every event is a marketing engine: photos, video, social content, email captures, reviews</li>
              </ul>
            </div>

            {/* Card 8 */}
            <div className="income-card reveal">
              <h3>Holiday &amp; Seasonal Events</h3>
              <p>Holiday lights display (November–January). Summer solstice ceremony. Halloween &quot;Mystery &amp; Magic&quot; night. Earth Day conservation event. Autism Acceptance events in April. Valentine&apos;s crystal pairing. Already mapped across a 12-month calendar.</p>
              <ul className="data-points">
                <li>Drive tourism traffic and local family visits during peak seasons</li>
                <li>Ticket or donation-based entry, plus onsite sales</li>
                <li>Target: <span className="accent-text mono">$2,000–$8,000/event</span> depending on scale</li>
              </ul>
            </div>

            {/* Card 9 — Soul card */}
            <div className="income-card soul-card reveal">
              <h3>Special Needs &amp; Sensory-Friendly Events</h3>
              <p>A smaller callout — but a powerful one. 1 in 36 children in the U.S. is autistic. Families with special needs kids are underserved in Las Vegas when it comes to outdoor, sensory-friendly destinations. There&apos;s a need. And it&apos;s not being met.</p>
              <p>April 4th — a handful of families are already committed to come to the property for a &quot;play with rocks&quot; event. No park. No formal program. Just families showing up because there&apos;s nowhere else to go. That&apos;s proof of demand before a dollar is spent.</p>
              <p>Inspiration: <strong>WeBearish</strong> — a Las Vegas movement founded by parents raising autistic children. They&apos;re not about awareness. They&apos;re about acceptance. They&apos;ve been on Fox 5. They&apos;re pushing legislation. And they need spaces like this.</p>
              <p>The idea: a sensory-friendly desert play area. Nothing massive. A safe, natural space where kids can touch rocks, explore the garden, be outside without overstimulation. Families will drive to it because there&apos;s nothing else. This isn&apos;t the core of the business. But it&apos;s the kind of thing that becomes the soul of it.</p>
              <ul className="data-points">
                <li>Start with one monthly event — see who shows up, learn what works</li>
                <li>Partner with WeBearish or similar orgs for co-promotion</li>
                <li>Minimal cost, maximum community impact and PR value</li>
                <li>April: Autism Acceptance Month — natural calendar tie-in for launch</li>
              </ul>
            </div>

            {/* Summary Table */}
            <div className="revenue-table-wrap reveal">
              <h3>Add it up conservatively. Just the low-hanging fruit.</h3>
              <table className="revenue-table" aria-label="Monthly revenue projections by stream">
                <thead>
                  <tr>
                    <th scope="col">Stream</th>
                    <th scope="col">Monthly Conservative</th>
                  </tr>
                </thead>
                <tbody id="revenueTableBody">
                  {[
                    ["Online Store (Shopify)", "$4,000–$8,000"],
                    ["Onsite Shop Uplift", "+15–25% on current"],
                    ["Weddings", "$2,000–$10,000"],
                    ["Private Events", "$1,500–$6,000"],
                    ["Classes", "$1,500–$4,000"],
                    ["Field Trips", "$800–$3,600"],
                    ["Art in the Desert", "$2,000–$5,000"],
                    ["Seasonal Events", "$2,000–$8,000 (peak months)"],
                  ].map(([stream, amount], i) => (
                    <tr key={i} className="table-row-reveal" data-row={i}>
                      <td>{stream}</td>
                      <td className="amount">{amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="total-line reveal" id="totalLine">
                $14,000–$45,000/month in new or optimized revenue streams — on top of whatever Cactus Joe&apos;s nursery and landscaping already generates.
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            SCENE 7 — THE SYSTEMS
            ============================================================ */}
        <section className="scene scene-7" id="scene7" aria-label="The Systems">
          {/* Persistent retail pricing note — shown via JS when scene7 is in/near view */}
          <div className="pricing-note" id="pricingNote" aria-hidden="true">
            All pricing shown reflects standard retail rates. Your engagement rate with The Voice of Cash reflects significant savings.
          </div>

          <div className="scene-inner">
            <h2 className="section-header reveal">You don&apos;t need more hustle. You need infrastructure.</h2>
            <p className="body-text reveal reveal-delay-1">Here&apos;s exactly what we build and what it costs.</p>

            {/* Phase 1 */}
            <div className="phase-divider reveal">
              <div className="phase-divider-line"></div>
              <span className="phase-label">Phase 1 — Months 1–3</span>
              <div className="phase-divider-line" style={{ background: "linear-gradient(to left, var(--accent), transparent)" }}></div>
            </div>
            <p className="phase-tag reveal">&ldquo;Get the engine running. Start capturing what you&apos;re already losing.&rdquo;</p>

            <div className="service-card reveal">
              <div className="service-card-header">
                <h3>AI Customer Service Agent</h3>
                <span className="service-price">$1,400/mo | Setup from $2,200</span>
              </div>
              <p style={{ color: "var(--text-secondary)", fontSize: "clamp(0.9rem,1.3vw,1rem)", lineHeight: "1.8", margin: 0 }}>
                Your 24/7 front desk. Handles crystal questions, event inquiries, wedding package info, store hours, directions — all the stuff that goes unanswered after 5pm or when you&apos;re busy with a customer in front of you. Trained on your products, your policies, your voice. Resolves 70–80% of inquiries without a human touching it. Escalates the rest with full context.
              </p>
            </div>

            <div className="service-card reveal">
              <div className="service-card-header">
                <h3>AI Appointment Booking Agent</h3>
                <span className="service-price">$900/mo | Setup from $1,500</span>
              </div>
              <p style={{ color: "var(--text-secondary)", fontSize: "clamp(0.9rem,1.3vw,1rem)", lineHeight: "1.8", margin: 0 }}>
                Weddings, classes, field trips, private events — all bookable 24/7 without phone tag. Confirms, reminds, reduces no-shows by 30%. Fills canceled slots from a waitlist automatically.
              </p>
            </div>

            <div className="service-card reveal">
              <div className="service-card-header">
                <h3>AI Reputation &amp; Review Management</h3>
                <span className="service-price">$800/mo | Setup from $1,200</span>
              </div>
              <p style={{ color: "var(--text-secondary)", fontSize: "clamp(0.9rem,1.3vw,1rem)", lineHeight: "1.8", margin: 0 }}>
                Monitors Google, Yelp, Facebook. Responds to every review. Flags negatives immediately. Automatically asks happy customers for reviews at the right moment. You have a 38-year-old brand with Joe — the reviews should reflect that. They will.
              </p>
            </div>

            <div className="service-card reveal">
              <div className="service-card-header">
                <h3>AI Reporting &amp; Performance Dashboard</h3>
                <span className="service-price">$1,000/mo | Setup from $1,800</span>
              </div>
              <p style={{ color: "var(--text-secondary)", fontSize: "clamp(0.9rem,1.3vw,1rem)", lineHeight: "1.8", margin: 0 }}>
                Every number in one place. Weekly automated briefing: what sold, what&apos;s trending, what needs attention. No spreadsheets. No logging into six platforms. Clean insights delivered to your inbox.
              </p>
            </div>

            <div className="phase-summary reveal">
              <p>Phase 1 Setup (one-time):</p>
              <p className="amount">~$6,700</p>
              <p>Monthly retail value:</p>
              <p className="amount">~$4,100/mo</p>
            </div>

            <div className="shimmer-callout reveal" id="shimmerCallout">
              $4,100 a month at retail to run a 24/7 operation that never calls in sick, never forgets to follow up, and never lets a lead die in your inbox. Compare that to one part-time employee. And you&apos;re not paying retail.
            </div>

            {/* Phase 2 */}
            <div className="phase-divider reveal">
              <div className="phase-divider-line"></div>
              <span className="phase-label">Phase 2 — Months 3–6</span>
              <div className="phase-divider-line" style={{ background: "linear-gradient(to left, var(--accent), transparent)" }}></div>
            </div>
            <p className="phase-tag reveal">&ldquo;Now that the foundation is running, we pour fuel on it.&rdquo;</p>

            <div className="service-card reveal">
              <div className="service-card-header">
                <h3>AI Lead Response Agent</h3>
                <span className="service-price">$1,200/mo | Setup from $1,800</span>
              </div>
              <p style={{ color: "var(--text-secondary)", fontSize: "clamp(0.9rem,1.3vw,1rem)", lineHeight: "1.8", margin: 0 }}>
                Every inquiry answered in under 90 seconds. Web forms, texts, emails. Qualifies the lead, scores them hot/warm/cold, routes the hot ones to you with context. The business that responds first wins. Now that&apos;s you.
              </p>
            </div>

            <div className="service-card reveal">
              <div className="service-card-header">
                <h3>AI Email &amp; SMS Automation</h3>
                <span className="service-price">Builds on existing CRM</span>
              </div>
              <p style={{ color: "var(--text-secondary)", fontSize: "clamp(0.9rem,1.3vw,1rem)", lineHeight: "1.8", margin: 0 }}>
                Post-purchase follow-ups. Event reminders. Birthday party promotions. Crystal-of-the-month features. Class announcements. Field trip follow-ups to parent groups. All automated. All personal. A nurture machine that runs while you sleep.
              </p>
            </div>

            <div className="service-card reveal">
              <div className="service-card-header">
                <h3>AI Social Media Content Agent</h3>
                <span className="service-price">Content pipeline</span>
              </div>
              <p style={{ color: "var(--text-secondary)", fontSize: "clamp(0.9rem,1.3vw,1rem)", lineHeight: "1.8", margin: 0 }}>
                Consistent posting across Instagram for both Cactus Joe&apos;s and The Crystal Garden. Product showcases, education, behind-the-scenes, event promotion. The content pillars and posting schedule are already written — now it&apos;s about execution at a sustainable pace.
              </p>
            </div>

            <div className="service-card reveal">
              <div className="service-card-header">
                <h3>AI Sales Funnel Build</h3>
                <span className="service-price">$2,200/mo | Setup from $3,500</span>
              </div>
              <p style={{ color: "var(--text-secondary)", fontSize: "clamp(0.9rem,1.3vw,1rem)", lineHeight: "1.8", margin: 0 }}>
                The full pipeline from first click to booked event or purchase. Landing pages, nurture sequences, behavioral scoring. This is how you turn &quot;I drove by once&quot; into a wedding booking six months later. Or how a field trip parent becomes a crystal shop regular.
              </p>
            </div>

            {/* Phase 3 */}
            <div className="phase-divider reveal">
              <div className="phase-divider-line"></div>
              <span className="phase-label">Phase 3 — Months 6–12</span>
              <div className="phase-divider-line" style={{ background: "linear-gradient(to left, var(--accent), transparent)" }}></div>
            </div>
            <p className="phase-tag reveal">&ldquo;This is where it gets interesting.&rdquo;</p>

            <div className="service-card reveal">
              <div className="service-card-header"><h3>AI Competitor Intelligence</h3></div>
              <p style={{ color: "var(--text-secondary)", fontSize: "clamp(0.9rem,1.3vw,1rem)", lineHeight: "1.8", margin: 0 }}>
                Know exactly what every other crystal shop, nursery, and venue in Vegas is doing. Pricing, reviews, content, SEO. You stop guessing.
              </p>
            </div>

            <div className="service-card reveal">
              <div className="service-card-header"><h3>AI CRM Build &amp; Automation</h3></div>
              <p style={{ color: "var(--text-secondary)", fontSize: "clamp(0.9rem,1.3vw,1rem)", lineHeight: "1.8", margin: 0 }}>
                The master database. Every customer, every purchase, every interaction, every event attendee, every field trip school. Segmented. Automated. The backbone of a business that knows its customers by name.
              </p>
            </div>

            <div className="service-card reveal">
              <div className="service-card-header"><h3>AI Operations &amp; Workflow Automation</h3></div>
              <p style={{ color: "var(--text-secondary)", fontSize: "clamp(0.9rem,1.3vw,1rem)", lineHeight: "1.8", margin: 0 }}>
                Internal processes. Order processing, inventory management, vendor coordination, volunteer scheduling. The stuff that eats hours and generates zero revenue.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================
            SCENE 8 — HIDDEN GEM / LOCAL MARKETING
            ============================================================ */}
        <section className="scene scene-8" id="scene8" aria-label="The Hidden Gem Strategy">
          <div className="scene-inner">
            <h2 className="section-header reveal">You&apos;re 12 miles from the Strip. That&apos;s not a weakness. That&apos;s the whole play.</h2>
            <p className="body-text reveal reveal-delay-1">
              Vegas locals are starving for something real. Something that isn&apos;t a casino, a chain restaurant, or a mall. This property is exactly that — but nobody knows it exists yet. The approach isn&apos;t billboards and paid ads (not yet). The approach is earned curiosity. Speakeasy vibes. Hidden gem energy. The kind of thing people whisper about and share on Instagram stories.
            </p>
            <p className="callout-text reveal">&ldquo;Hidden gems don&apos;t need billboards. They need believers.&rdquo;</p>

            <div className="whisper-card from-left" data-whisper="1">
              <h3>The Speakeasy Angle</h3>
              <p>We don&apos;t fight the signage restriction. We lean into it. You become Las Vegas&apos;s worst-kept secret. The speakeasy of the desert. The place locals whisper about.</p>
              <p style={{ marginTop: "1rem", fontStyle: "italic", color: "var(--text-secondary)", fontSize: "0.95rem" }}>
                &ldquo;Have you been to Cactus Joe&apos;s? You have to go. It&apos;s off the 95, you&apos;d never know it was there, but once you find it —&rdquo;
              </p>
              <p style={{ marginTop: "1rem", color: "var(--text-secondary)", fontSize: "0.95rem" }}>
                That&apos;s the energy. That&apos;s viral. That&apos;s how you build a brand that people feel like they discovered. You don&apos;t blast this place everywhere on day one. You let people discover it. Word of mouth is the most powerful marketing channel on earth — especially in a city built on secrets and exclusivity.
              </p>
            </div>

            <div className="whisper-card from-right" data-whisper="2">
              <h3>Street Team / Grassroots</h3>
              <p>A small, smart street team. Five to ten people, placed strategically — farmer&apos;s markets, community events, school pickup lines, family-friendly spots around the valley. They&apos;re not selling anything. They&apos;re starting conversations. Handing out a crystal. A little card that says &quot;You just found the desert&apos;s best-kept secret&quot; with a QR code. That QR code drops them into your funnel — email capture, first-visit discount, event calendar.</p>
              <p style={{ marginTop: "1rem", color: "var(--text-secondary)", fontSize: "0.95rem" }}>
                The message isn&apos;t &quot;come buy crystals.&quot; It&apos;s &quot;there&apos;s a 7.5-acre secret garden 15 minutes from here that most people don&apos;t know about.&quot; That framing turns every visit into a story worth telling.
              </p>
              {/* Crystal info card mock-up */}
              <div className="crystal-card-mockup">
                <strong>You just found the desert&apos;s best-kept secret.</strong>
                <div className="qr-placeholder">QR</div>
                <p>cactusjoeslv.com</p>
              </div>
            </div>

            <div className="whisper-card from-left" data-whisper="3">
              <h3>The &ldquo;Did You Know?&rdquo; Social Campaign</h3>
              <p>Short-form content that makes people stop scrolling:</p>
              <ul className="data-points" style={{ marginTop: "0.75rem" }}>
                <li>&ldquo;Did you know there&apos;s a 7.5-acre crystal garden in the Las Vegas desert?&rdquo;</li>
                <li>&ldquo;Did you know you can get married next to a 200-year-old cactus?&rdquo;</li>
                <li>&ldquo;Did you know there&apos;s a free monthly art event 12 miles from the Strip?&rdquo;</li>
              </ul>
              <p style={{ marginTop: "1rem", color: "var(--text-secondary)", fontSize: "0.95rem" }}>Every piece drives to the site. Every site visit gets captured. Every captured lead gets nurtured.</p>
            </div>

            <div className="whisper-card from-right" data-whisper="4">
              <h3>Family Discovery Engine</h3>
              <p>This is the hypothesis to test: what brings families out to 7.5 acres in the desert? Is it the rocks? The birthday parties? The field trips? The holiday lights? We don&apos;t assume — we test. Run small events. Track who shows up. Ask them how they found you. Build on what works. Cut what doesn&apos;t.</p>
            </div>

            <div className="whisper-card from-left" data-whisper="5">
              <h3>The Field Trip Funnel</h3>
              <p>Aligned with Nevada NGSS earth science standards, field trips serve schools in Summerlin, Spring Valley, and the southwest valley — all within 25 minutes. Each field trip is also a marketing event: 30 kids go home with a crystal and a story, and 30 families hear about Cactus Joe&apos;s at dinner that night.</p>
              <p style={{ marginTop: "1rem", color: "var(--text-secondary)", fontSize: "0.95rem" }}>
                Outreach starts with school science coordinators, homeschool networks, scout councils, and summer camp directors. One teacher visit leads to an annual booking. One annual booking serves 60–180 students per year from a single school. The lifetime value of one school relationship is enormous.
              </p>
            </div>

            <p className="callout-text reveal" style={{ marginTop: "3rem" }}>
              Start small. Test hypotheses. Learn what brings families to Cactus Joe&apos;s. Then double down on the winners.
            </p>
          </div>
        </section>

        {/* ============================================================
            SCENE 9 — TWO BRANDS, ONE PROPERTY
            ============================================================ */}
        <section className="scene scene-9" id="scene9" aria-label="Two Brands, One Property">
          <div className="scene-inner">
            <h2 className="section-header reveal">Cactus Joe&apos;s is the legacy. The Crystal Garden is the future. Together, they&apos;re a moat nobody can cross.</h2>

            <div className="synergy-grid">
              <div className="panel-left">
                <div className="card card-warm reveal">
                  <p className="panel-label">What Cactus Joe&apos;s Brings</p>
                  {["38 years of brand trust and regional recognition", "Physical plant inventory and landscaping expertise", "The property itself — 7.5 acres, irreplaceable", "Joe's story. Joe's relationships. Joe's name on that land."].map((item, i) => (
                    <p key={i} className={`panel-item reveal reveal-delay-${i+1}`}>{item}</p>
                  ))}
                </div>
              </div>

              <div className="synergy-center" aria-hidden="true">
                <div className="synergy-line"></div>
                <div className="synergy-dot"></div>
                <div className="synergy-line"></div>
                <div className="synergy-dot"></div>
                <div className="synergy-line"></div>
              </div>

              <div className="panel-right">
                <div className="card card-cool reveal reveal-delay-2">
                  <p className="panel-label" style={{ color: "var(--text-secondary)" }}>What The Crystal Garden Brings</p>
                  {["A new customer segment: crystal collectors, wellness community, metaphysical buyers, tourists", "Event revenue: weddings, parties, classes, markets", "E-commerce: nationwide reach through Shopify", "Digital-native marketing and content strategy", "The energy and hunger to scale"].map((item, i) => (
                    <p key={i} className={`panel-item reveal reveal-delay-${i+1}`}>{item}</p>
                  ))}
                </div>
              </div>
            </div>

            <div className="flow-items reveal" style={{ marginTop: "2rem" }}>
              <p style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "1rem" }}>Where They Amplify Each Other</p>
              {[
                "A family comes for a birthday party (Crystal Garden) → discovers the nursery (Cactus Joe's) → books a landscaping consultation",
                "A tourist buys crystals online (Crystal Garden) → plans a Vegas trip → visits the property → buys plants (Cactus Joe's)",
                "A local comes for Art in the Desert → signs up for a class → books a wedding → leaves five reviews",
                "School field trip (geology + desert ecology) → touches both brands simultaneously",
                "After a field trip, an excited child returns home with a crystal and a story → the family comes for their birthday party → parents discover the crystal shop → the cycle begins",
                "Every foot on the property benefits both businesses.",
              ].map((flow, i) => (
                <div key={i} className={`flow-item reveal reveal-delay-${(i % 5) + 1}`}>
                  {flow.split("→").map((part, j, arr) => (
                    <span key={j}>{part.trim()}{j < arr.length - 1 && <span className="arrow"> → </span>}</span>
                  ))}
                </div>
              ))}
            </div>

            <p className="callout-text reveal" style={{ marginTop: "3rem" }}>
              You don&apos;t compete with each other. You complete each other. And the systems we build serve both brands from the same infrastructure.
            </p>
          </div>
        </section>

        {/* ============================================================
            SCENE 10 — 180-DAY TIMELINE
            ============================================================ */}
        <section className="scene scene-10" id="scene10" aria-label="The 180-Day Approach">
          <div className="scene-inner">
            <h2 className="section-header reveal">We don&apos;t ask you to bet the farm. We ask you to bet 180 days.</h2>
            <p className="body-text reveal reveal-delay-1">
              Everything we&apos;ve shown you today is real. It&apos;s mapped. It&apos;s documented. But we don&apos;t come in and flip every switch at once. That&apos;s how things break. Here&apos;s how we actually work:
            </p>

            <div className="timeline-wrap" aria-label="180-day rollout timeline">
              <div className="timeline-track" id="timelineTrack">
                <div className="timeline-rail-bg" aria-hidden="true"></div>
                <div className="timeline-rail" id="timelineRail" aria-hidden="true"></div>

                {[
                  {
                    days: "Days 1–30",
                    title: "Listen, Build, Launch the Core",
                    items: ["Full audit of both businesses", "Deploy Phase 1 systems: customer service agent, booking agent, reputation engine, dashboard", "Shopify store architecture and first product listings live", "Email/SMS capture at point of sale", "Begin school outreach for field trip pipeline"]
                  },
                  {
                    days: "Days 30–60",
                    title: "Foundation Running, First Data",
                    items: ["First monthly reports — see what's working", "Refine AI agents based on real interactions", "First Art in the Desert event with digital promotion", "April 4th special needs event as pilot"]
                  },
                  {
                    days: "Days 60–90",
                    title: "Growth Engine Engaged",
                    items: ["Lead response agent live — inquiries answered in under 90 seconds", "Email/SMS automation sequences running", "Social media pipeline operational for both brands", "First wedding/event bookings through new system"]
                  },
                  {
                    days: "Days 90–120",
                    title: "Optimization & Scaling",
                    items: ["AI sales funnel fully operational", "CRM build underway", "Competitor intelligence running", "Revenue data from first 90 days informs next moves"]
                  },
                  {
                    days: "Days 120–150",
                    title: "Full Ecosystem Active",
                    items: ["All twelve revenue streams have basic capture in place", "Operations automation reducing manual workload", "Holiday/seasonal calendar executing with full digital support", "Field trip program scaling — repeat bookings"]
                  },
                  {
                    days: "Days 150–180",
                    title: "Review, Report, Decide",
                    items: ["Full 180-day performance report delivered", "Revenue attribution: which systems generated what", "Clear data on what to keep, scale, or cut", "The conversation shifts: \"Does this work?\" → \"How fast do we grow?\""]
                  },
                ].map((milestone, i) => (
                  <div key={i} className="timeline-node reveal" data-milestone={i}>
                    <div className="timeline-dot"></div>
                    <div className="timeline-card">
                      <strong>{milestone.days}<br/>{milestone.title}</strong>
                      {milestone.items.map((item, j) => (
                        <div key={j} style={{ fontSize: "0.75rem", color: "var(--text-secondary)", paddingTop: "0.3rem" }}>· {item}</div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <p className="callout-text reveal" style={{ marginTop: "4rem" }}>
              Six months. Not six years. You&apos;ll have real data, real revenue, and a real system — not a pitch deck.
            </p>
          </div>
        </section>

        {/* ============================================================
            SCENE 12 — THE INVESTMENT
            ============================================================ */}
        <section className="scene scene-12" id="scene12" aria-label="The Investment">
          <div className="scene-inner">
            <div className="gold-rule reveal" aria-hidden="true"></div>
            <h2 className="section-header reveal">No surprises. Here&apos;s the math.</h2>

            <div className="retail-block reveal">
              <p className="label">Phase 1 Monthly Retail Value:</p>
              <p className="amount">$4,100/month</p>
              <p className="label">Phase 1 Setup (one-time):</p>
              <p className="amount">~$6,700</p>
              <p className="label">Full ecosystem at scale (all phases, retail):</p>
              <p className="amount">$8,000–$12,000/month</p>
            </div>

            <div className="beat-space" aria-hidden="true"></div>

            <div className="rate-reveal" id="rateReveal">
              <div style={{ width: "40px", height: "2px", background: "var(--accent)", margin: "0 auto 1.5rem", opacity: 0.6 }} aria-hidden="true"></div>
              <p style={{ fontSize: "clamp(0.85rem,1.2vw,0.95rem)", color: "var(--text-secondary)", marginBottom: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>Your Engagement Rate</p>
              <p className="rate-big">$500/month + expenses</p>
              <p style={{ marginTop: "1.25rem", color: "var(--text-primary)", fontSize: "clamp(0.95rem,1.4vw,1.1rem)", maxWidth: "560px", margin: "1.25rem auto 0" }}>
                That&apos;s your rate. Not retail. Not a trial. Your engagement rate with The Voice of Cash.
              </p>
              <p style={{ marginTop: "1rem", color: "var(--text-secondary)", fontSize: "clamp(0.82rem,1.1vw,0.9rem)", maxWidth: "520px", margin: "1rem auto 0", lineHeight: "1.7" }}>
                Expenses include third-party platform costs (Shopify, email service, SMS credits, etc.) billed at cost — no markup. The $500/month covers our time, our systems, our infrastructure, and our ongoing optimization. You get the full ecosystem. We grow as you grow.
              </p>
            </div>

            <p className="callout-text reveal" style={{ marginTop: "4rem" }}>
              We&apos;re not asking you to spend $8,000 a month. We&apos;re asking you to spend $500 a month and let us prove what this property can do. If it works — and it will — the investment scales with the revenue. If it doesn&apos;t, you&apos;ve risked less than the cost of a part-time employee for a few months.
            </p>

            <p className="body-text reveal reveal-delay-2" style={{ marginTop: "2rem", color: "var(--text-secondary)", textAlign: "center", margin: "2rem auto" }}>
              This rate reflects a strategic partnership, not a vendor transaction. We believe in what this property can become. That&apos;s why the rate is what it is.
            </p>
          </div>
        </section>

        {/* ============================================================
            SCENE 13 — THE CLOSE
            ============================================================ */}
        <section className="scene scene-13" id="scene13" aria-label="Let's Begin">
          <svg className="desert-silhouette desert-silhouette-warm" viewBox="0 0 1440 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="none">
            <path d="M0,200 L0,140 Q180,80 360,120 Q540,160 720,90 Q900,20 1080,80 Q1260,140 1440,100 L1440,200 Z" fill="rgba(212,168,67,0.2)"/>
            <path d="M0,200 L0,160 Q200,110 400,140 Q600,170 800,120 Q1000,70 1200,120 Q1350,150 1440,130 L1440,200 Z" fill="rgba(212,168,67,0.3)"/>
            <path d="M0,200 L0,175 Q300,155 600,165 Q900,175 1200,155 Q1350,145 1440,160 L1440,200 Z" fill="rgba(224,124,62,0.25)"/>
          </svg>

          <div className="scene-13-content" id="scene13Content">
            <h2 className="section-header" style={{ fontSize: "clamp(1.75rem,4vw,3rem)", textAlign: "center", marginBottom: "1rem" }}>
              The property is ready. The plan is written. The systems are built.
            </h2>
            <p style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.1rem,2.5vw,1.6rem)", color: "var(--text-secondary)", textAlign: "center", marginBottom: "2.5rem" }}>
              All that&apos;s missing is the word &ldquo;go.&rdquo;
            </p>

            <a href="mailto:thevoiceofcash@gmail.com" className="cta-btn" aria-label="Start the conversation — email Cash at The Voice of Cash">
              Let&apos;s start the conversation.
            </a>

            <div className="scene-13-contact">
              <p>Cash — The Voice of Cash</p>
              <p>thevoiceofcash@gmail.com</p>
              <p>Las Vegas, NV</p>
            </div>
          </div>

          <p className="scene-13-final" id="scene13Final">
            Built for Cactus Joe&apos;s &amp; The Crystal Garden. Spring 2025.
          </p>
        </section>

      </main>
    </>
  );
}
