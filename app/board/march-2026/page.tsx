import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Board Meeting — March 7, 2026 | Wu-Tang Clan AI Ops',
  robots: { index: false, follow: false },
};

export default function BoardMeetingPage() {
  return (
    <div style={{
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      maxWidth: '900px',
      margin: '0 auto',
      padding: '40px 24px',
      color: '#1a1a1a',
      lineHeight: '1.7',
    }}>
      <div style={{ borderBottom: '3px solid #000', paddingBottom: '24px', marginBottom: '40px' }}>
        <div style={{ fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', color: '#666', marginBottom: '12px' }}>Internal — Partners Only</div>
        <h1 style={{ fontSize: '32px', fontWeight: '800', margin: '0 0 8px 0', lineHeight: '1.2' }}>Wu-Tang Clan AI Operations</h1>
        <h2 style={{ fontSize: '20px', fontWeight: '400', margin: '0 0 16px 0', color: '#444' }}>Board Meeting — March 7, 2026</h2>
        <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap', fontSize: '14px', color: '#555' }}>
          <span><strong>Convened by:</strong> GZA</span>
          <span><strong>Present:</strong> Raekwon · Ghostface · Inspectah Deck · ODB · Masta Killa · U-God · Slim Shady</span>
          <span><strong>For:</strong> RZA (Abearica + TheVoiceOfCash) · CoachDavidJones · ammarasplay</span>
        </div>
      </div>

      <section style={{ background: '#f8f8f8', border: '1px solid #e0e0e0', borderRadius: '8px', padding: '24px', marginBottom: '40px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '700', margin: '0 0 16px 0' }}>Executive Summary</h2>
        <p>Seven agents ran independent market research. The consensus is unanimous: <strong>two real paths to $20k/month — one paying in 60 days.</strong></p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '16px' }}>
          <div style={{ background: '#fff', border: '2px solid #000', borderRadius: '6px', padding: '16px' }}>
            <div style={{ fontWeight: '700', fontSize: '15px', marginBottom: '8px' }}>Path 1 — aiskillsagents.com</div>
            <div style={{ fontSize: '14px', color: '#444' }}>AI Automation Agency. $7.6B market growing 50% CAGR. 5 retainer clients × $4k/month = $20k. We have what competitors don't: a live, functioning multi-agent system. <strong>The Clan IS the demo.</strong></div>
          </div>
          <div style={{ background: '#fff', border: '2px solid #000', borderRadius: '6px', padding: '16px' }}>
            <div style={{ fontWeight: '700', fontSize: '15px', marginBottom: '8px' }}>Path 2 — JewSA Owns Q4 2026</div>
            <div style={{ fontSize: '14px', color: '#444' }}>Jewish humor apparel market is real, fragmented, no dominant brand. Hanukkah 2026 = December 12. Every move until October builds toward that window. Potential: $15k–$30k in Q4 alone.</div>
          </div>
        </div>
        <p style={{ marginTop: '16px', fontWeight: '600', color: '#c00' }}>These are not either/or. They run in parallel with different teams.</p>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '22px', fontWeight: '700', borderBottom: '2px solid #eee', paddingBottom: '8px', marginBottom: '20px' }}>Market Intelligence</h2>

        <h3 style={{ fontSize: '17px', fontWeight: '700', marginBottom: '12px' }}>The Jewish Apparel Market (Raekwon + Ghostface)</h3>
        <p>The humor lane is <strong>genuinely empty</strong>. No standalone brand owns it. Here's the competitive landscape:</p>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', marginBottom: '20px' }}>
          <thead>
            <tr style={{ background: '#000', color: '#fff' }}>
              <th style={{ padding: '8px 12px', textAlign: 'left' }}>Competitor</th>
              <th style={{ padding: '8px 12px', textAlign: 'left' }}>What They Do</th>
              <th style={{ padding: '8px 12px', textAlign: 'left' }}>Weakness</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['ModernTribe.com', 'Curator marketplace, contemporary Judaica', 'Serious tone — not humor'],
              ['JudaicaWebstore.com', 'Holiday apparel, Israel-made', 'Seasonal only, no brand voice'],
              ['Alef Designs', 'Hebrew/IDF pride tees', 'Political, not broad humor'],
              ['Etsy (hundreds of shops)', 'Fragmented one-off shops', 'Zero brand identity, competing on price'],
              ['Hey Chai Hello', 'Post-Oct 7 solidarity apparel', 'Cause-driven niche only'],
            ].map(([name, what, weakness], i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? '#f9f9f9' : '#fff', borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '8px 12px', fontWeight: '600' }}>{name}</td>
                <td style={{ padding: '8px 12px' }}>{what}</td>
                <td style={{ padding: '8px 12px', color: '#c00' }}>{weakness}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h4 style={{ fontWeight: '700', marginBottom: '8px' }}>Product Margins (Ghostface)</h4>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', marginBottom: '20px' }}>
          <thead>
            <tr style={{ background: '#000', color: '#fff' }}>
              <th style={{ padding: '8px 12px', textAlign: 'left' }}>Product</th>
              <th style={{ padding: '8px 12px', textAlign: 'left' }}>Sell Price</th>
              <th style={{ padding: '8px 12px', textAlign: 'left' }}>Margin</th>
              <th style={{ padding: '8px 12px', textAlign: 'left' }}>Notes</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Baby/Infant Apparel', '$22–$35', '55–70%', 'Viral by nature, gift purchase'],
              ['Embroidered Hats', '$35–$55', '55–60%', 'Highest margin wearable'],
              ['Sweatshirts/Hoodies', '$55–$75', '45–55%', 'Highest revenue per unit'],
              ['Mugs', '$15–$22', '50–60%', 'Gift impulse buy'],
              ['Tote Bags', '$22–$32', '45–55%', 'Bundle driver'],
              ['T-Shirts', '$28–$38', '30–40%', 'Volume but lowest margin'],
            ].map(([product, price, margin, notes], i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? '#f9f9f9' : '#fff', borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '8px 12px', fontWeight: '600' }}>{product}</td>
                <td style={{ padding: '8px 12px' }}>{price}</td>
                <td style={{ padding: '8px 12px', color: '#006600', fontWeight: '600' }}>{margin}</td>
                <td style={{ padding: '8px 12px', color: '#555' }}>{notes}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ background: '#fffbe6', border: '1px solid #f0d000', borderRadius: '6px', padding: '16px', marginBottom: '16px' }}>
          <strong>🔵 Blue Ocean — Ghostface:</strong> Jewish humor baby/kids apparel. <em>"Little Mishpokhe"</em> sub-brand. "My First Seder" onesie. "Kvetch Mode Activated" bodysuit. Nobody is doing this at scale. 55–70% margin. Jewish grandparents are the buying force. Baby content goes viral automatically.
        </div>

        <h3 style={{ fontSize: '17px', fontWeight: '700', marginBottom: '12px', marginTop: '28px' }}>The AI Services Market (Inspectah Deck)</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', marginBottom: '16px' }}>
          <thead>
            <tr style={{ background: '#000', color: '#fff' }}>
              <th style={{ padding: '8px 12px', textAlign: 'left' }}>Service Type</th>
              <th style={{ padding: '8px 12px', textAlign: 'left' }}>Market Rate</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Basic retainer (monitoring)', '$2,000–$5,000/month'],
              ['Mid-market retainer (active automation)', '$5,000–$10,000/month'],
              ['Full-stack AI ops', '$15,000–$20,000+/month'],
              ['AI Readiness Audit (flat)', '$5,000–$15,000'],
              ['Custom workflow build', '$10,000–$50,000'],
              ['Day rate consulting', '$600–$1,200/day'],
            ].map(([service, rate], i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? '#f9f9f9' : '#fff', borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '8px 12px' }}>{service}</td>
                <td style={{ padding: '8px 12px', fontWeight: '600', color: '#006600' }}>{rate}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ fontSize: '14px', background: '#f0f8f0', padding: '12px', borderRadius: '6px', border: '1px solid #c0e0c0' }}>
          <strong>Documented proof:</strong> Solo operator with 7 retainer clients = $24,500/month. Another agency documented $0 → $40k/month in 90 days. Our math: <strong>5 clients × $4,000/month = $20k.</strong>
        </p>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '22px', fontWeight: '700', borderBottom: '2px solid #eee', paddingBottom: '8px', marginBottom: '20px' }}>🎤 Content + Viral Strategy (ODB + Masta Killa)</h2>

        <h3 style={{ fontSize: '17px', fontWeight: '700', marginBottom: '8px' }}>3 Ready-To-Execute Viral Ideas (ODB)</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
          {[
            {
              title: '1. "The Jewish Tax" TikTok Skit',
              desc: 'Jewish mom appears every time someone buys anything without using a coupon. Final shot: JewSA shirt. Caption: "My heritage is my hedge fund." Relatable to Jews, hilarious to everyone. Cross-cultural share magnet.',
              tag: 'Film this week',
            },
            {
              title: '2. "Tell Me You\'re Jewish Without Telling Me" UGC Challenge',
              desc: 'Seed video, invite community to continue it. Best comment wins a free shirt. Zero budget. 200+ comments guaranteed. Algorithm distribution built in. This is how brands go viral for free.',
              tag: 'Launch this week',
            },
            {
              title: '3. "JewSA Reacts to Antisemitic Conspiracies" Series',
              desc: 'Person in JewSA shirt reads a conspiracy theory. Long pause. "Bro, I can\'t even afford Chipotle. Where\'s my cut?" Hard cut. JewSA logo. Platform-safe. Press coverage potential. Series format = repeat traffic.',
              tag: 'Ongoing series',
            },
          ].map(({ title, desc, tag }, i) => (
            <div key={i} style={{ border: '1px solid #ddd', borderRadius: '6px', padding: '16px', background: '#fff' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <strong style={{ fontSize: '15px' }}>{title}</strong>
                <span style={{ background: '#000', color: '#fff', fontSize: '11px', padding: '2px 8px', borderRadius: '12px', whiteSpace: 'nowrap', marginLeft: '12px' }}>{tag}</span>
              </div>
              <p style={{ margin: 0, fontSize: '14px', color: '#444' }}>{desc}</p>
            </div>
          ))}
        </div>

        <h3 style={{ fontSize: '17px', fontWeight: '700', marginBottom: '8px' }}>JewSA Brand Story — About Page (Masta Killa)</h3>
        <div style={{ background: '#f9f9f9', borderLeft: '4px solid #000', padding: '20px', fontSize: '15px', fontStyle: 'italic', lineHeight: '1.8', marginBottom: '24px' }}>
          <p>JewSA was born from a contradiction. We grew up hyphenated. Jewish-American. Always two things at once, never fully one. We carried our grandmother&apos;s recipes and our grandfather&apos;s silence about things that happened before America, and we carried it all into a country that kept asking us to pick a lane. Be American. Be Jewish. Be less. Be more. Be grateful. Be quiet. We were never quiet. We were always both — and we built JewSA for everyone who knows exactly what that feels like.</p>
          <p>This is not a brand about religion. It&apos;s a brand about belonging. JewSA exists at the intersection of culture, humor, history, and pride — the place where a Star of David sits next to a Yankees cap without any apology. Where you can buy a hoodie that says exactly what you are, wear it to a bagel spot in Brooklyn or a Shabbat dinner in Scottsdale or a bar in Buenos Aires, and find somebody across the room who nods at you like you&apos;re already cousins.</p>
          <p>We&apos;re building something that lasts. Not a moment. Not a trend. A brand that grows with your family the way your family&apos;s stories do — getting richer with each generation, carrying loss and laughter in equal measure, always looking forward while knowing exactly where it came from.</p>
        </div>

        <h3 style={{ fontSize: '17px', fontWeight: '700', marginBottom: '8px' }}>TheVoiceOfCash Newsletter Benchmarks (Masta Killa)</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', marginBottom: '16px' }}>
          <thead>
            <tr style={{ background: '#000', color: '#fff' }}>
              <th style={{ padding: '8px 12px', textAlign: 'left' }}>List Size</th>
              <th style={{ padding: '8px 12px', textAlign: 'left' }}>Ad Revenue (2 slots)</th>
              <th style={{ padding: '8px 12px', textAlign: 'left' }}>Paid Tier @ 3%</th>
              <th style={{ padding: '8px 12px', textAlign: 'left' }}>Combined Monthly</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['10,000', '$1,500–$2,000', '$1,050–$1,500', '$2,550–$3,500'],
              ['25,000', '$4,375–$6,250', '$2,625–$3,750', '$7,000–$10,000'],
              ['50,000', '$10,000–$15,000', '$5,250–$7,500', '$15,250–$22,500'],
            ].map(([size, ad, paid, total], i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? '#f9f9f9' : '#fff', borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '8px 12px', fontWeight: '600' }}>{size}</td>
                <td style={{ padding: '8px 12px' }}>{ad}</td>
                <td style={{ padding: '8px 12px' }}>{paid}</td>
                <td style={{ padding: '8px 12px', fontWeight: '700', color: '#006600' }}>{total}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ fontSize: '13px', color: '#555' }}>Finance newsletters earn $25–$40 CPM — premium over general content. Platform recommendation: <strong>Beehiiv</strong> (138% growth in paid subscription revenue in 2025).</p>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '22px', fontWeight: '700', borderBottom: '2px solid #eee', paddingBottom: '8px', marginBottom: '20px' }}>🔬 Research + WeBearish + Grants (Inspectah Deck)</h2>
        <p>WeBearish is not the sprint vehicle — it&apos;s the mission layer that makes the whole operation matter. And it has <strong>non-dilutive capital waiting to be claimed.</strong></p>
        <h3 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '8px' }}>Confirmed Active Grants</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
          {[
            { priority: '🟢 HIGH', name: 'NEXT for AUTISM — Color the Spectrum', detail: 'June 2026 cycle. Requires 501(c)(3) or fiscal sponsor. Must have autistic employee involved. Start paperwork NOW.' },
            { priority: '🟢 HIGH', name: 'Organization for Autism Research (OAR)', detail: 'Up to $50,000 for 1–2 year applied research grants. Angle: "AI tools for financial independence in autistic adults."' },
            { priority: '🟡 MEDIUM', name: 'Eagles Autism Challenge', detail: 'Pilot grants, tech + autism intersection. Philadelphia-area fellowships, worldwide for grants.' },
            { priority: '🟡 MEDIUM', name: 'Nancy Lurie Marks Family Foundation', detail: 'Major autism funder. Does not accept unsolicited proposals — need an intro/referral.' },
          ].map(({ priority, name, detail }, i) => (
            <div key={i} style={{ border: '1px solid #ddd', borderRadius: '6px', padding: '12px 16px', background: '#fff' }}>
              <div style={{ fontSize: '13px', marginBottom: '4px' }}>{priority}</div>
              <strong style={{ fontSize: '14px' }}>{name}</strong>
              <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#555' }}>{detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '22px', fontWeight: '700', borderBottom: '2px solid #eee', paddingBottom: '8px', marginBottom: '20px' }}>💻 Tech Vision (U-God)</h2>

        <h3 style={{ fontSize: '17px', fontWeight: '700', marginBottom: '8px' }}>u-god.com — Sacred Texts App</h3>
        <p style={{ fontSize: '14px', marginBottom: '16px' }}>$4.71B market by 2029. Gap: <strong>Jewish sacred texts (Torah, Talmud, Midrash, Kabbalah) are essentially absent from every major interfaith app.</strong> Nobody is at $5–8/month for serious interfaith students. That&apos;s our slot. Target: freemium → $7/month unlimited + voice mode. 500 subscribers = $42k ARR.</p>

        <h3 style={{ fontSize: '17px', fontWeight: '700', marginBottom: '8px' }}>aiskillsagents.com — The Real Vision</h3>
        <div style={{ background: '#f0f0f0', borderRadius: '6px', padding: '16px', marginBottom: '16px', fontFamily: 'monospace', fontSize: '13px' }}>
          <div style={{ fontFamily: 'sans-serif', fontWeight: '700', marginBottom: '8px' }}>The npm Registry for AI Agent Skills</div>
          <div>Frontend: Next.js + shadcn/ui — skill discovery, docs, playground</div>
          <div>Registry: Node.js + PostgreSQL — versioned skill packages</div>
          <div>Payments: Stripe Connect — 70% creator / 30% platform</div>
          <div>Runtime: OpenClaw-compatible SKILL.md spec + CLI publish tool</div>
        </div>
        <p style={{ fontSize: '14px' }}>Not an agency. A <strong>marketplace + runtime</strong>. What the App Store is to apps, this is to AI agent skills. Creators earn. Platform takes 30%. Ecosystem builds itself.</p>

        <h3 style={{ fontSize: '17px', fontWeight: '700', marginBottom: '12px', marginTop: '24px' }}>3 Technology Bets — Build Now</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[
            {
              timeline: 'This Week',
              title: 'MCP Server Infrastructure',
              desc: 'Model Context Protocol is the universal standard converging across Anthropic, Google, OpenAI. We have 92+ OpenClaw skills. Every one is an MCP server we can package and sell before the market realizes it. Convert top 10 skills → publish → own early SEO.',
            },
            {
              timeline: 'This Month',
              title: 'Proprietary Agentic RAG',
              desc: 'LanceDB is already in our stack. Vectorize every piece of content the Clan produces. Competitors can copy models. They cannot copy our corpus. This is the data flywheel that makes our agents permanently smarter.',
            },
            {
              timeline: 'Q3 2026',
              title: 'Multi-Agent Orchestration as a Product',
              desc: 'We already have 8 agents coordinating in production. Nobody is selling this as a configurable product. Visual agent council builder — drag-and-drop, define roles, task routing, white-label for agencies. 2026 is when enterprises ask "how do I coordinate 10 agents?" We answer before anyone else ships it.',
            },
          ].map(({ timeline, title, desc }, i) => (
            <div key={i} style={{ border: '1px solid #ddd', borderRadius: '6px', padding: '16px', background: '#fff' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                <span style={{ background: '#000', color: '#fff', fontSize: '11px', padding: '2px 8px', borderRadius: '12px' }}>{timeline}</span>
                <strong style={{ fontSize: '15px' }}>{title}</strong>
              </div>
              <p style={{ margin: 0, fontSize: '14px', color: '#444' }}>{desc}</p>
            </div>
          ))}
        </div>

        <div style={{ background: '#000', color: '#fff', borderRadius: '8px', padding: '20px', marginTop: '20px' }}>
          <p style={{ margin: 0, fontSize: '16px', fontStyle: 'italic', lineHeight: '1.6' }}>
            &ldquo;The Clan infrastructure we built for ourselves — the hierarchy, the orchestration, the skill system — IS the product. We just need to productize it before the VC-backed copycats catch up. C.R.E.A.M. — <strong>Code Rules Everything Around Me.</strong>&rdquo;
          </p>
          <p style={{ margin: '8px 0 0 0', fontSize: '13px', opacity: 0.7 }}>— U-God, CT113</p>
        </div>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '22px', fontWeight: '700', borderBottom: '2px solid #eee', paddingBottom: '8px', marginBottom: '20px' }}>🔐 Security Brief (Slim Shady)</h2>

        <h3 style={{ fontSize: '17px', fontWeight: '700', marginBottom: '8px' }}>Domain Status</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', marginBottom: '20px' }}>
          <thead>
            <tr style={{ background: '#000', color: '#fff' }}>
              <th style={{ padding: '8px 12px', textAlign: 'left' }}>Domain</th>
              <th style={{ padding: '8px 12px', textAlign: 'left' }}>Status</th>
              <th style={{ padding: '8px 12px', textAlign: 'left' }}>Flag</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['jewsa.com', '✅ Live', 'Best hardened. HSTS, nosniff, X-Frame all set.'],
              ['webearish.com', '✅ Live', '⚠️ Missing HSTS + security headers'],
              ['thevoiceofcash.com', '✅ Live', 'Missing HSTS'],
              ['u-god.com', '✅ Live', 'Good — HSTS + headers in place'],
              ['aiskillsagents.com', '✅ Live', '⚠️ Most bare — no HSTS, no X-Frame, no nosniff. Fix before pitching clients.'],
            ].map(([domain, status, flag], i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? '#f9f9f9' : '#fff', borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '8px 12px', fontWeight: '600' }}>{domain}</td>
                <td style={{ padding: '8px 12px' }}>{status}</td>
                <td style={{ padding: '8px 12px', color: flag.includes('⚠️') ? '#c00' : '#555', fontSize: '13px' }}>{flag}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3 style={{ fontSize: '17px', fontWeight: '700', marginBottom: '8px' }}>Pre-Revenue Legal Checklist — Non-Negotiable</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
          {[
            ['LLC formed', 'Taking $20k/month personally = personal liability exposure. Not optional.'],
            ['Operating Agreement', '4 equal partners, in writing, before money moves. Who owns what. Who authorizes contracts.'],
            ['Client Services Agreement (MSA)', 'Every client signs before work starts. Scope, deliverables, payment terms, IP, liability, termination.'],
            ['Privacy Policy + ToS on aiskillsagents.com', 'Legally required when collecting client data. AI disclosure may be required in some industries.'],
            ['Business bank account', 'Separate from personal, under the LLC. No commingling funds.'],
            ['E&O Insurance', 'If an AI agent makes a mistake that costs a client money and they sue, you need coverage.'],
          ].map(([item, detail], i) => (
            <div key={i} style={{ display: 'flex', gap: '12px', padding: '12px', border: '1px solid #ddd', borderRadius: '6px', background: '#fff' }}>
              <div style={{ fontSize: '18px', flexShrink: 0 }}>☐</div>
              <div>
                <strong style={{ fontSize: '14px' }}>{item}</strong>
                <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#555' }}>{detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '22px', fontWeight: '700', borderBottom: '2px solid #eee', paddingBottom: '8px', marginBottom: '20px' }}>📅 30-60-90 Day Priority Stack</h2>

        {[
          {
            label: '🔴 Do This Week',
            color: '#c00',
            items: [
              ['Raekwon', 'Begin Reddit karma building on r/Jewish + r/JewishHumor via u/One-Exam-794. 1–2 organic posts/day, no store mentions yet.'],
              ['Ghostface', 'Audit JewSA catalog. Add sweatshirts, embroidered hats, baby onesies. Kill generic clip-art designs. Target: 40+ SKUs live.'],
              ['ODB', 'Film "The Jewish Tax" skit. Film "Tell Me You\'re Jewish Without Telling Me" seed video. Post both this week.'],
              ['Masta Killa', 'Publish About page copy to JewSA verbatim. Set up email capture (10% off first order). Load the 6-email welcome sequence.'],
              ['GZA + Abearica', 'Register LLC or identify existing entity. Identify first 3 target clients for AI automation audit outreach.'],
            ],
          },
          {
            label: '🟡 This Month',
            color: '#996600',
            items: [
              ['Raekwon', 'After 2 weeks karma: begin soft mentions in gift threads. Publish "25 Gifts for the Jew Who Has Everything" blog post.'],
              ['Ghostface', 'Launch "Little Mishpokhe" kids/baby collection as a separate drop.'],
              ['Inspectah Deck', 'Begin 501(c)(3) paperwork for WeBearish OR identify fiscal sponsor. Target: NEXT for AUTISM June 2026 cycle eligibility.'],
              ['Masta Killa', 'Draft "The Hyphen" essay — 3,500 words defining the JewSA brand. Gets its own email send to the full list.'],
              ['CoachDavidJones', 'Build aiskillsagents.com site — clean, authoritative, service menu visible. "AI Automation Agency" positioning.'],
            ],
          },
          {
            label: '🟢 60–90 Days',
            color: '#006600',
            items: [
              ['aiskillsagents.com', 'First audit client closed. First retainer signed. CoachDavidJones delivers. GZA orchestrates.'],
              ['JewSA', 'Email list at 500+. TikTok at 2k+ followers. One influencer collab conversation in progress.'],
              ['TheVoiceOfCash', 'Newsletter on Beehiiv. Publishing weekly. Affiliate links live. Building toward 10k subscribers.'],
              ['WeBearish', 'Discord/Circle community soft-launched. Founding member pricing ($10/month). OAR grant application filed.'],
            ],
          },
        ].map(({ label, color, items }) => (
          <div key={label} style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color, marginBottom: '12px' }}>{label}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {items.map(([owner, task], i) => (
                <div key={i} style={{ display: 'flex', gap: '12px', fontSize: '14px' }}>
                  <span style={{ fontWeight: '700', minWidth: '140px', flexShrink: 0 }}>{owner}</span>
                  <span style={{ color: '#444' }}>{task}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '22px', fontWeight: '700', borderBottom: '2px solid #eee', paddingBottom: '8px', marginBottom: '20px' }}>💰 Revenue Roadmap</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', marginBottom: '16px' }}>
          <thead>
            <tr style={{ background: '#000', color: '#fff' }}>
              <th style={{ padding: '8px 12px', textAlign: 'left' }}>Property</th>
              <th style={{ padding: '8px 12px', textAlign: 'left' }}>Model</th>
              <th style={{ padding: '8px 12px', textAlign: 'left' }}>Realistic Monthly</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['aiskillsagents.com', '5 retainers @ $4k + 1–2 projects', '$20k–$30k'],
              ['JewSA', 'Merch + email sponsors + influencer collabs', '$3k–$8k steady / $15k–$30k Q4'],
              ['TheVoiceOfCash', 'Newsletter (25k subs) + paid tier + sponsor', '$7k–$10k'],
              ['WeBearish', 'Membership + grants + fintech sponsors', '$4k–$10k (month 12+)'],
              ['Combined (at scale)', '', '$34k–$58k/month'],
            ].map(([prop, model, rev], i) => (
              <tr key={i} style={{
                background: i === 4 ? '#000' : i % 2 === 0 ? '#f9f9f9' : '#fff',
                color: i === 4 ? '#fff' : '#1a1a1a',
                borderBottom: '1px solid #eee',
                fontWeight: i === 4 ? '700' : '400',
              }}>
                <td style={{ padding: '8px 12px' }}>{prop}</td>
                <td style={{ padding: '8px 12px', fontSize: '13px' }}>{model}</td>
                <td style={{ padding: '8px 12px', fontWeight: '700', color: i === 4 ? '#fff' : '#006600' }}>{rev}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ fontSize: '14px', color: '#555' }}><strong>$20k/month is not the ceiling. It&apos;s the floor</strong> once all four properties are operating.</p>
      </section>

      <div style={{ background: '#000', color: '#fff', borderRadius: '8px', padding: '28px', textAlign: 'center', marginTop: '48px' }}>
        <div style={{ fontSize: '28px', marginBottom: '8px' }}>🏯</div>
        <h2 style={{ fontSize: '20px', fontWeight: '800', margin: '0 0 8px 0' }}>Wu-Tang Clan AI Operations</h2>
        <p style={{ margin: '0 0 8px 0', opacity: 0.8 }}>Board Meeting closed — March 7, 2026</p>
        <p style={{ margin: '0', opacity: 0.6, fontSize: '13px' }}>Compiled by GZA · 7 agents · Real web research · Real market data</p>
        <p style={{ margin: '12px 0 0 0', fontStyle: 'italic', opacity: 0.8 }}>&ldquo;Wu-Tang is forever.&rdquo;</p>
      </div>
    </div>
  );
}
