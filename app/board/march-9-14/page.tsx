import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Board Meeting — March 9-14, 2026 | The Voice of Cash',
  robots: { index: false, follow: false },
};

export default function BoardMeetingMar914Page() {
  return (
    <div style={{
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      maxWidth: '900px',
      margin: '0 auto',
      padding: '40px 24px',
      color: '#1a1a1a',
      lineHeight: '1.7',
    }}>
      {/* Header */}
      <div style={{ borderBottom: '3px solid #000', paddingBottom: '24px', marginBottom: '40px' }}>
        <div style={{ fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', color: '#666', marginBottom: '12px' }}>Internal — Partners Only</div>
        <h1 style={{ fontSize: '32px', fontWeight: '800', margin: '0 0 8px 0', lineHeight: '1.2' }}>The Voice of Cash</h1>
        <h2 style={{ fontSize: '20px', fontWeight: '400', margin: '0 0 8px 0', color: '#444' }}>Board Meeting — March 9-14, 2026</h2>
        <h3 style={{ fontSize: '16px', fontWeight: '600', margin: '0 0 16px 0', color: '#222' }}>The Week That Built the Network</h3>
        <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap', fontSize: '14px', color: '#555' }}>
          <span><strong>Period:</strong> March 9-14, 2026</span>
          <span><strong>Filed by:</strong> RZA</span>
          <span><strong>Distribution:</strong> Cash · Tim (Abearica) · David</span>
        </div>
      </div>

      {/* Executive Summary */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '800', borderBottom: '2px solid #eee', paddingBottom: '8px', marginBottom: '16px' }}>Executive Summary</h2>
        <p style={{ fontSize: '16px', fontWeight: '600', color: '#222', marginBottom: '12px' }}>
          In 6 days, the Voice of Cash team transformed a collection of independent websites into an interconnected media network.
        </p>
        <p>19 sites upgraded. 63+ blog posts deployed. Compliance achieved across the board. E-commerce infrastructure built. Agent capabilities expanded. This was our most productive week since inception.</p>
        <div style={{
          background: '#f8f8f8',
          border: '1px solid #e0e0e0',
          borderLeft: '4px solid #000',
          padding: '20px 24px',
          margin: '24px 0',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '16px',
        }}>
          {[
            ['19', 'Sites Upgraded'],
            ['63+', 'Blog Posts Deployed'],
            ['17/17', 'Compliance Coverage'],
            ['4', 'Agent Skill Packages'],
            ['21', 'Vercel Projects with Brevo'],
            ['8', 'Agent Memories Recovered'],
          ].map(([val, label]) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '28px', fontWeight: '900', letterSpacing: '-1px' }}>{val}</div>
              <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Infrastructure Wins */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '800', borderBottom: '2px solid #eee', paddingBottom: '8px', marginBottom: '16px' }}>Infrastructure Wins</h2>
        <ul style={{ paddingLeft: '20px' }}>
          <li style={{ marginBottom: '10px' }}><strong>ACP + Claude Code set up on Mac Mini</strong> — flat-rate coding, zero extra API cost per task</li>
          <li style={{ marginBottom: '10px' }}><strong>BREVO_API_KEY deployed to all 21 Vercel projects</strong> via API — every site can now send transactional email</li>
          <li style={{ marginBottom: '10px' }}><strong>Contact forms on all 15+ sites</strong> funneling to thevoiceofcash@gmail.com with site-specific tags</li>
          <li style={{ marginBottom: '10px' }}><strong>compaction.memoryFlush.enabled = ON</strong> — memory loss from long sessions fixed permanently</li>
        </ul>
      </div>

      {/* Site Upgrades */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '800', borderBottom: '2px solid #eee', paddingBottom: '8px', marginBottom: '20px' }}>Site Upgrades by Category</h2>

        {/* Faith Sites */}
        <div style={{ marginBottom: '28px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', color: '#555', marginBottom: '12px' }}>Faith Sites</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            {[
              {
                name: 'RedWhiteJesus',
                work: 'Full rebuild. White theme, Instrument Serif + Space Grotesk, holiday pages, calendar, daily verse, 5 culture posts, cart + checkout.',
              },
              {
                name: 'AllahiCan',
                work: 'Full upgrade. Content expansion, Islamic calendar, daily ayah, visual density fix, accordion FAQ.',
              },
              {
                name: 'HindUSA',
                work: 'Ground-up build from empty repo. Saffron/cream theme, 8 holidays, 7 blog posts, cart + checkout.',
              },
              {
                name: 'JewSA',
                work: 'Mobile optimization, SVG menorah, holidays, gift guides, daily verse, culture hub, coupon system.',
              },
            ].map((s) => (
              <div key={s.name} style={{ border: '1px solid #e0e0e0', padding: '16px', borderRadius: '4px' }}>
                <div style={{ fontWeight: '700', marginBottom: '6px' }}>{s.name}</div>
                <div style={{ fontSize: '13px', color: '#555' }}>{s.work}</div>
              </div>
            ))}
          </div>
        </div>

        {/* MMA Sites */}
        <div style={{ marginBottom: '28px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', color: '#555', marginBottom: '12px' }}>MMA Sites</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            {[
              {
                name: 'MMA Dads',
                work: 'Full design refresh. 20+ fighter bios, events, history, weight classes, TheSportsDB pipeline, champion accuracy fix.',
              },
              {
                name: 'MMA Moms',
                work: 'Full design refresh. 15+ fighter bios, events, history, divisions, champion accuracy fix.',
              },
            ].map((s) => (
              <div key={s.name} style={{ border: '1px solid #e0e0e0', padding: '16px', borderRadius: '4px' }}>
                <div style={{ fontWeight: '700', marginBottom: '6px' }}>{s.name}</div>
                <div style={{ fontSize: '13px', color: '#555' }}>{s.work}</div>
              </div>
            ))}
          </div>
        </div>

        {/* AI/Business Sites */}
        <div style={{ marginBottom: '28px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', color: '#555', marginBottom: '12px' }}>AI / Business Sites</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            {[
              {
                name: 'AISkillsAgents',
                work: 'Boomer-friendly redesign. Form fix: nodemailer replaced with Brevo.',
              },
              {
                name: 'SearchPerformanceMarketing',
                work: 'Newspaper-style redesign. Quarterly edition format.',
              },
            ].map((s) => (
              <div key={s.name} style={{ border: '1px solid #e0e0e0', padding: '16px', borderRadius: '4px' }}>
                <div style={{ fontWeight: '700', marginBottom: '6px' }}>{s.name}</div>
                <div style={{ fontSize: '13px', color: '#555' }}>{s.work}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Sports */}
        <div style={{ marginBottom: '28px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', color: '#555', marginBottom: '12px' }}>Sports</h3>
          <ul style={{ paddingLeft: '20px' }}>
            <li style={{ marginBottom: '8px' }}>15 A's-to-Vegas blog posts across thelvas, thelvathletics, and lvathleticsnation</li>
            <li style={{ marginBottom: '8px' }}>Duplicate footer fix on lvathleticsnation</li>
          </ul>
        </div>

        {/* Entertainment */}
        <div style={{ marginBottom: '28px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', color: '#555', marginBottom: '12px' }}>Entertainment</h3>
          <ul style={{ paddingLeft: '20px' }}>
            <li>SpagettiBurritos: full tabloid redesign, Submit Your Drama AI engine, 17 blog posts</li>
          </ul>
        </div>
      </div>

      {/* Content Deployed */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '800', borderBottom: '2px solid #eee', paddingBottom: '8px', marginBottom: '16px' }}>Content Deployed</h2>
        <ul style={{ paddingLeft: '20px' }}>
          <li style={{ marginBottom: '8px' }}>63+ blog posts across 15 sites</li>
          <li style={{ marginBottom: '8px' }}>8+ holiday detail page systems</li>
          <li style={{ marginBottom: '8px' }}>5 culture hub pages on JewSA</li>
          <li style={{ marginBottom: '8px' }}>Fighter bio systems on 2 MMA sites</li>
          <li style={{ marginBottom: '8px' }}>Event calendars on 4 faith sites + 2 MMA sites</li>
        </ul>
      </div>

      {/* Compliance */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '800', borderBottom: '2px solid #eee', paddingBottom: '8px', marginBottom: '16px' }}>Compliance</h2>
        <div style={{
          background: '#f0faf0',
          border: '1px solid #c0e0c0',
          borderLeft: '4px solid #2a7a2a',
          padding: '16px 20px',
          marginBottom: '16px',
        }}>
          <strong>Privacy + Terms: 17/17 sites covered.</strong> Was 4/17 at the start of the week.
        </div>
        <ul style={{ paddingLeft: '20px' }}>
          <li style={{ marginBottom: '8px' }}>Security headers on all sites</li>
          <li style={{ marginBottom: '8px' }}>sitemap.xml, robots.txt, llms.txt, security.txt, humans.txt deployed everywhere</li>
          <li style={{ marginBottom: '8px' }}>Internal branding language scrubbed from all public files</li>
        </ul>
      </div>

      {/* E-Commerce */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '800', borderBottom: '2px solid #eee', paddingBottom: '8px', marginBottom: '16px' }}>E-Commerce</h2>
        <ul style={{ paddingLeft: '20px' }}>
          <li style={{ marginBottom: '8px' }}>Welcome emails with coupon codes live on 4 sites: <strong>MISHPOKHE10</strong>, <strong>BLESSED10</strong>, <strong>UMMAH10</strong>, <strong>NAMASTE10</strong></li>
          <li style={{ marginBottom: '8px' }}>Stripe promotion code system: JewSA live, 3 sites pending Stripe key connection</li>
          <li style={{ marginBottom: '8px' }}>"We are not doctors, we are advocates" disclaimer standardized on WeBearish</li>
        </ul>
      </div>

      {/* Agent Upgrades */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '800', borderBottom: '2px solid #eee', paddingBottom: '8px', marginBottom: '16px' }}>Agent Capability Upgrades</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          {[
            {
              agent: 'Inspectah Deck',
              work: '6 autism advocacy skills (132KB total) — neurodiversity psychology, sensory experience, communication, burnout, anti-ABA evidence, content guide.',
            },
            {
              agent: 'ODB',
              work: '3 philosophy and critical thinking skills added.',
            },
            {
              agent: 'Slim Shady',
              work: '5 defensive shield security skills — OWASP, secret scanner, dependency auditor, SSL monitor, incident response.',
            },
            {
              agent: 'All 8 Agents',
              work: 'Memory recovered from Discord history. All agents caught up on context.',
            },
          ].map((a) => (
            <div key={a.agent} style={{ border: '1px solid #e0e0e0', padding: '16px', borderRadius: '4px' }}>
              <div style={{ fontWeight: '700', marginBottom: '6px' }}>{a.agent}</div>
              <div style={{ fontSize: '13px', color: '#555' }}>{a.work}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Network-Wide */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '800', borderBottom: '2px solid #eee', paddingBottom: '8px', marginBottom: '16px' }}>Network-Wide Changes</h2>
        <ul style={{ paddingLeft: '20px' }}>
          <li style={{ marginBottom: '8px' }}>Emoji removed from rendered UI on all 19 sites</li>
          <li style={{ marginBottom: '8px' }}>Mobile optimization across 4+ sites</li>
          <li style={{ marginBottom: '8px' }}>Data freshness protocol added to heartbeat checks</li>
          <li style={{ marginBottom: '8px' }}>"Not doctors, advocates" language standardized on WeBearish</li>
        </ul>
      </div>

      {/* Revenue Infrastructure */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '800', borderBottom: '2px solid #eee', paddingBottom: '8px', marginBottom: '16px' }}>Revenue Infrastructure</h2>
        <ul style={{ paddingLeft: '20px' }}>
          <li style={{ marginBottom: '8px' }}>Brevo contact funnel: every form submission routes to thevoiceofcash@gmail.com with [SiteName] tagging</li>
          <li style={{ marginBottom: '8px' }}>Coupon codes active on e-commerce sites, tied to welcome email sequences</li>
          <li style={{ marginBottom: '8px' }}>TheSportsDB API pipeline built for real-time MMA data</li>
        </ul>
      </div>

      {/* Next Week Priorities */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '800', borderBottom: '2px solid #eee', paddingBottom: '8px', marginBottom: '16px' }}>Next Week Priorities</h2>
        <ul style={{ paddingLeft: '20px' }}>
          <li style={{ marginBottom: '8px' }}>CX upgrades: related posts, network bar, exit-intent email capture</li>
          <li style={{ marginBottom: '8px' }}>Internal cross-linking across all clusters (~125 links)</li>
          <li style={{ marginBottom: '8px' }}>VoC network directory page</li>
          <li style={{ marginBottom: '8px' }}>AllahiCan Printful store integration</li>
          <li style={{ marginBottom: '8px' }}>Slim Shady defensive shield: next skill due 3/16</li>
          <li style={{ marginBottom: '8px' }}>Board meeting theme: Quality and Self-Evaluation</li>
        </ul>
      </div>

      {/* The Standard */}
      <div style={{
        background: '#0a0a0a',
        color: '#fff',
        padding: '32px',
        margin: '40px 0',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: '22px', fontWeight: '800', marginBottom: '12px' }}>The Standard</div>
        <blockquote style={{
          fontSize: '18px',
          fontStyle: 'italic',
          color: '#ccc',
          maxWidth: '600px',
          margin: '0 auto',
          lineHeight: '1.7',
        }}>
          "We're better this week than we were last week. This is how we grow correctly."
        </blockquote>
        <div style={{ marginTop: '12px', fontSize: '13px', color: '#666', letterSpacing: '2px', textTransform: 'uppercase' }}>— Cash</div>
      </div>

      {/* Footer */}
      <div style={{
        borderTop: '2px solid #000',
        paddingTop: '24px',
        marginTop: '48px',
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
        fontSize: '13px',
        color: '#888',
      }}>
        <span>Filed: March 14, 2026</span>
        <span>The Voice of Cash — Internal Use Only</span>
        <a href="/board" style={{ color: '#888', textDecoration: 'underline' }}>Back to Board Archive</a>
      </div>
    </div>
  );
}
