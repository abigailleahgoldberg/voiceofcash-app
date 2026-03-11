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
            SCENES 7-13 PLACEHOLDER
            ============================================================ */}
        <section style={{ minHeight: "20vh", background: "var(--bg-dark)" }} id="more-scenes"></section>

      </main>
    </>
  );
}
