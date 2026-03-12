"use client";
import React, { useEffect, useRef } from "react";
import "./concept.css";

export default function CactusJoesConcept() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("revealed"); }),
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
    );
    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="cj-concept">

      {/* NAV */}
      <nav className="cj-nav">
        <div className="cj-nav-inner">
          <a href="#" className="cj-logo">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
              <path d="M16 2C16 2 10 8 10 16c0 4 2 7 6 9 4-2 6-5 6-9C22 8 16 2 16 2z" fill="#D4A843" opacity="0.9"/>
              <line x1="16" y1="7" x2="16" y2="27" stroke="#1A1207" strokeWidth="1.5"/>
              <circle cx="13" cy="13" r="1.5" fill="#1A1207"/>
              <circle cx="19" cy="17" r="1.5" fill="#1A1207"/>
            </svg>
            <span>Cactus Joe&rsquo;s</span>
          </a>
          <div className="cj-nav-links">
            <a href="#plants">Plants</a>
            <a href="#decor">Décor</a>
            <a href="#weddings">Weddings</a>
            <a href="#visit">Visit</a>
            <a href="#contact" className="cj-nav-cta">Plan Your Visit</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="cj-hero">
        <div className="cj-hero-bg" aria-hidden="true">
          <div className="cj-hero-gradient" />
          <svg className="cj-ridge" viewBox="0 0 1440 300" preserveAspectRatio="none">
            <path d="M0,300 L0,200 Q80,160 140,100 Q180,60 210,80 Q240,100 270,80 Q310,50 360,90 Q420,130 480,100 Q540,70 600,90 Q660,110 720,80 Q780,50 840,80 Q900,110 960,90 Q1020,70 1080,100 Q1140,130 1200,100 Q1280,60 1380,120 L1440,140 L1440,300 Z" fill="#0D0D0D" opacity="0.5"/>
          </svg>
          <div className="cj-cacti-left" aria-hidden="true">
            <svg viewBox="0 0 80 260" fill="none">
              <rect x="32" y="0" width="18" height="230" rx="9" fill="#1A2A0A" opacity="0.65"/>
              <rect x="8" y="70" width="18" height="80" rx="9" fill="#1A2A0A" opacity="0.65"/>
              <rect x="0" y="50" width="32" height="14" rx="7" fill="#1A2A0A" opacity="0.65"/>
              <rect x="54" y="100" width="18" height="65" rx="9" fill="#1A2A0A" opacity="0.65"/>
              <rect x="50" y="80" width="30" height="14" rx="7" fill="#1A2A0A" opacity="0.65"/>
            </svg>
          </div>
          <div className="cj-cacti-right" aria-hidden="true">
            <svg viewBox="0 0 80 260" fill="none">
              <rect x="30" y="20" width="18" height="210" rx="9" fill="#1A2A0A" opacity="0.55"/>
              <rect x="50" y="80" width="18" height="70" rx="9" fill="#1A2A0A" opacity="0.55"/>
              <rect x="48" y="62" width="32" height="14" rx="7" fill="#1A2A0A" opacity="0.55"/>
            </svg>
          </div>
        </div>
        <div className="cj-hero-content">
          <p className="cj-hero-eyebrow">Blue Diamond, Nevada</p>
          <h1 className="cj-hero-title">
            Las Vegas&rsquo; Beloved<br />
            <em>Desert Oasis</em>
          </h1>
          <p className="cj-hero-sub">
            Nevada&rsquo;s finest cacti, agave, Joshua Trees &amp; native plants —
            with panoramic views of Red Rock Canyon.
          </p>
          <div className="cj-hero-actions">
            <a href="#plants" className="cj-btn-primary">Explore the Nursery</a>
            <a href="#weddings" className="cj-btn-ghost">Desert Weddings</a>
          </div>
          <div className="cj-hero-hours">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <circle cx="7" cy="7" r="6" stroke="#D4A843" strokeWidth="1.5"/>
              <path d="M7 4V7L9 9" stroke="#D4A843" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span>Mon–Fri 9–5 &nbsp;·&nbsp; Sat 9–5 &nbsp;·&nbsp; Sun 10–4</span>
          </div>
        </div>
        <div className="cj-scroll-hint" aria-hidden="true">
          <div className="cj-scroll-line" />
          <span>Scroll</span>
        </div>
      </section>

      {/* TRUST BAR */}
      <div className="cj-trust reveal">
        <div className="cj-trust-inner">
          <div className="cj-trust-item">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M9 1.5l2.1 5 5.4.5-4 3.7 1.2 5.3L9 13.5l-4.7 2.5 1.2-5.3-4-3.7 5.4-.5z" stroke="#D4A843" strokeWidth="1.3" fill="none"/></svg>
            <span>Voted Best Desert Wedding Venue — Las Vegas</span>
          </div>
          <div className="cj-trust-div" />
          <div className="cj-trust-item">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><circle cx="9" cy="9" r="7" stroke="#D4A843" strokeWidth="1.3"/><path d="M6 9l2 2 4-4" stroke="#D4A843" strokeWidth="1.3" strokeLinecap="round"/></svg>
            <span>Authorized Joshua Tree Retailer</span>
          </div>
          <div className="cj-trust-div" />
          <div className="cj-trust-item">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M9 2C5.1 2 2 5.1 2 9s3.1 7 7 7 7-3.1 7-7S12.9 2 9 2z" stroke="#D4A843" strokeWidth="1.3"/><path d="M9 5v4l2.5 2.5" stroke="#D4A843" strokeWidth="1.3" strokeLinecap="round"/></svg>
            <span>Nevada&rsquo;s Most Extensive Desert Plant Selection</span>
          </div>
        </div>
      </div>

      {/* PLANTS */}
      <section className="cj-section" id="plants">
        <div className="cj-section-inner">
          <div className="cj-section-header reveal">
            <p className="cj-eyebrow">The Collection</p>
            <h2>Built for the Desert.<br />Beautiful by Nature.</h2>
            <p className="cj-section-sub">Every plant hand-selected for Nevada&rsquo;s climate — thriving through heat, drought, and relentless sun.</p>
          </div>
          <div className="cj-plants-grid">
            {([
              ["Premium Cacti", "Nevada's most extensive selection. Dramatic focal points that command the desert landscape.", "Most Popular"],
              ["Agave", "Architectural giants. Extreme heat, near-zero irrigation, maximum visual impact.", null],
              ["Joshua Trees", "Iconic. Ancient. One of Las Vegas' only authorized retailers. Reserve yours before they&rsquo;re gone.", "Rare"],
              ["Native Nevada Plants", "Botanically beautiful, ecologically responsible. Water-wise landscapes that truly belong here.", null],
              ["Drought-Tolerant", "Low water, full beauty. Year-round color without the maintenance bill.", null],
              ["Indoor Plants", "Desert charm, indoor scale. Striking specimens for Las Vegas homes and offices.", null],
            ] as [string, string, string | null][]).map(([name, desc, tag], i) => (
              <div className="cj-plant-card reveal" key={i}>
                {tag && <span className="cj-card-tag">{tag}</span>}
                <div className="cj-plant-num">0{i + 1}</div>
                <h3>{name}</h3>
                <p dangerouslySetInnerHTML={{ __html: desc }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RED ROCK MOMENT */}
      <section className="cj-redrock">
        <div className="cj-redrock-inner">
          <div className="cj-redrock-text reveal">
            <p className="cj-eyebrow">Location</p>
            <h2>Where the Strip Ends<br />and the Real Desert Begins</h2>
            <p>Nestled in Blue Diamond, Nevada — twenty minutes from the Las Vegas Strip, with panoramic views of Red Rock Canyon stretching to the horizon. This is where Las Vegas comes to breathe.</p>
            <a href="#visit" className="cj-btn-primary">Get Directions</a>
          </div>
          <div className="cj-canyon-art reveal" aria-hidden="true">
            <svg viewBox="0 0 400 280" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="sky2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1B1030"/>
                  <stop offset="100%" stopColor="#3A1205" stopOpacity="0.8"/>
                </linearGradient>
                <linearGradient id="rock2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8B3A0A"/>
                  <stop offset="100%" stopColor="#2A0D02"/>
                </linearGradient>
              </defs>
              <rect width="400" height="280" fill="url(#sky2)"/>
              <circle cx="200" cy="70" r="40" fill="#D4A843" opacity="0.12"/>
              <circle cx="200" cy="70" r="22" fill="#D4A843" opacity="0.18"/>
              <circle cx="200" cy="70" r="10" fill="#D4A843" opacity="0.55"/>
              <path d="M0,280 L0,170 Q30,150 60,120 Q90,90 110,100 Q130,110 150,80 Q170,50 190,65 Q210,80 230,55 Q250,30 270,60 Q290,90 320,70 Q350,50 400,90 L400,280 Z" fill="url(#rock2)"/>
              <path d="M0,280 L0,240 Q50,220 100,235 Q150,250 200,230 Q250,210 300,235 Q350,260 400,245 L400,280 Z" fill="#100500" opacity="0.95"/>
              <rect x="25" y="210" width="7" height="70" rx="3.5" fill="#0D0D0D"/>
              <rect x="14" y="228" width="7" height="42" rx="3.5" fill="#0D0D0D"/>
              <rect x="12" y="220" width="13" height="6" rx="3" fill="#0D0D0D"/>
              <rect x="355" y="200" width="7" height="80" rx="3.5" fill="#0D0D0D"/>
              <rect x="364" y="225" width="7" height="48" rx="3.5" fill="#0D0D0D"/>
              <rect x="362" y="217" width="13" height="6" rx="3" fill="#0D0D0D"/>
            </svg>
          </div>
        </div>
      </section>

      {/* DECOR */}
      <section className="cj-section cj-section-alt" id="decor">
        <div className="cj-section-inner">
          <div className="cj-section-header reveal">
            <p className="cj-eyebrow">Beyond Plants</p>
            <h2>The Art of the Desert</h2>
            <p className="cj-section-sub">Sculptures, pottery, gems and minerals — the finishing touches that make a landscape a statement.</p>
          </div>
          <div className="cj-decor-grid">
            {([
              ["Saguaro & Cholla Skeletons", "Nature's own sculpture. 7–15 ft. weathered specimens that took decades to become this beautiful. Instant authenticity."],
              ["Metal Yard Art", "Steel crafted to outlast Nevada's UV and heat. Saguaros, scorpions, desert flora — bold southwestern character."],
              ["Pottery & Planters", "Handcrafted ceramic planters in southwestern glazes. From tabletop to statement-scale."],
              ["Rocks, Gems & Minerals", "Nevada-sourced boulders, petrified wood, river rocks, rare minerals. The ground beneath your landscape."],
            ] as [string, string][]).map(([name, desc], i) => (
              <div className="cj-decor-card reveal" key={i}>
                <div className="cj-decor-num">0{i + 1}</div>
                <h3>{name}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WEDDINGS */}
      <section className="cj-weddings" id="weddings">
        <div className="cj-weddings-inner">
          <div className="cj-weddings-badge reveal">Voted Best in Las Vegas</div>
          <h2 className="reveal">Exchange Vows in the Desert.<br />With Red Rock Canyon as Your Witness.</h2>
          <p className="cj-weddings-sub reveal">Intimate ceremony spaces. Stunning desert backdrops. Views that no hotel ballroom can touch. For couples who want a Las Vegas wedding that&rsquo;s actually unforgettable.</p>
          <div className="cj-wedding-feats reveal">
            {["Ceremony & Reception Spaces", "Red Rock Canyon Views", "Flexible Date Availability", "20 min from the Strip"].map((f, i) => (
              <div className="cj-wedding-feat" key={i}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="8" stroke="#D4A843" strokeWidth="1.3"/><path d="M6.5 10l2.5 2.5 4.5-4.5" stroke="#D4A843" strokeWidth="1.3" strokeLinecap="round"/></svg>
                <span>{f}</span>
              </div>
            ))}
          </div>
          <a href="#contact" className="cj-btn-primary reveal">Inquire About Your Date</a>
        </div>
      </section>

      {/* CRYSTAL GARDEN TEASE */}
      <section className="cj-crystal reveal">
        <div className="cj-crystal-inner">
          <div className="cj-crystal-badge">Coming 2026</div>
          <h2>The Crystal Garden</h2>
          <p>A new chapter. A curated desert retail experience — gems, minerals, artisan décor, and rare botanical specimens. Where the desert meets the extraordinary.</p>
        </div>
      </section>

      {/* VISIT */}
      <section className="cj-visit" id="visit">
        <div className="cj-section-inner">
          <div className="cj-section-header reveal">
            <p className="cj-eyebrow">Plan Your Visit</p>
            <h2>Come See the Desert Differently</h2>
          </div>
          <div className="cj-visit-grid">
            {([
              ["Hours", "Mon–Fri: 9am – 5pm\nSaturday: 9am – 5pm\nSunday: 10am – 4pm"],
              ["Location", "Blue Diamond, Nevada\n20 minutes from the Las Vegas Strip\nPanoramic Red Rock Canyon views"],
              ["Who We Serve", "Homeowners, landscapers, collectors, couples, families — anyone who wants to experience the desert on its own terms."],
            ] as [string, string][]).map(([title, text], i) => (
              <div className="cj-visit-card reveal" key={i}>
                <h4>{title}</h4>
                {text.split("\n").map((line, j) => <p key={j}>{line}</p>)}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="cj-footer">
        <div className="cj-footer-inner">
          <div className="cj-footer-logo">
            <svg width="24" height="24" viewBox="0 0 32 32" fill="none" aria-hidden="true">
              <path d="M16 2C16 2 10 8 10 16c0 4 2 7 6 9 4-2 6-5 6-9C22 8 16 2 16 2z" fill="#D4A843" opacity="0.8"/>
            </svg>
            <span>Cactus Joe&rsquo;s Blue Diamond Nursery</span>
          </div>
          <p className="cj-footer-sub">Las Vegas&rsquo; Beloved Desert Oasis &nbsp;·&nbsp; Blue Diamond, Nevada</p>
          <p className="cj-footer-concept">Homepage Concept — Design by The Voice of Cash Agent Clan</p>
        </div>
      </footer>

    </div>
  );
}
