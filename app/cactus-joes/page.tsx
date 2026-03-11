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

    // Timeline active states
    const timelineIO = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("active");
      });
    }, { threshold: 0.4 });
    document.querySelectorAll(".timeline-node").forEach((el) => timelineIO.observe(el));

    // Scene 13: shimmer on final line (one-time)
    const finalLine = document.getElementById("scene13FinalLine");
    if (finalLine) {
      const shimmerIO = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            finalLine.classList.add("shimmer");
            shimmerIO.unobserve(finalLine);
          }
        });
      }, { threshold: 0.8 });
      shimmerIO.observe(finalLine);
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
            <h2 className="section-header reveal">
              Joe, what you&apos;ve built is extraordinary. And it&apos;s leaving money on the table every single day.
            </h2>
            <div aria-label="Revenue gap statistics">
              <p className="stat-line reveal" data-stat="1">The store closes at sundown. The internet doesn&apos;t.</p>
              <p className="stat-line reveal reveal-delay-1" data-stat="2">No online store. No booking system. No automated follow-up.</p>
              <p className="stat-line reveal reveal-delay-2" data-stat="3">Customers drive out, love it, leave — and you never hear from them again.</p>
              <p className="stat-line reveal reveal-delay-3" data-stat="4">No email list capturing walk-ins. No review engine running.</p>
              <p className="stat-line reveal reveal-delay-4" data-stat="5">Google doesn&apos;t know what you sell. Instagram doesn&apos;t know you exist (yet).</p>
              <p className="stat-line reveal reveal-delay-5" data-stat="6">Every inquiry that comes in after hours? Gone.</p>
              <p className="stat-line reveal reveal-delay-6" data-stat="7">Every lead not followed up in 5 minutes? 80% less likely to convert.</p>
            </div>
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
        </section>

        {/* ============================================================
            SCENES 4-13 PLACEHOLDER — added as parts arrive
            ============================================================ */}
        <section style={{ minHeight: "20vh", background: "var(--bg-dark)" }} id="more-scenes"></section>

      </main>
    </>
  );
}
