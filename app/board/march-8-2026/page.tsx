import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Board Meeting — March 8, 2026 | Wu-Tang Clan AI Ops',
  robots: { index: false, follow: false },
};

export default function BoardMeetingMarch8Page() {
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
        <h1 style={{ fontSize: '32px', fontWeight: '800', margin: '0 0 8px 0', lineHeight: '1.2' }}>Wu-Tang Clan AI Operations</h1>
        <h2 style={{ fontSize: '20px', fontWeight: '400', margin: '0 0 16px 0', color: '#444' }}>Board Meeting — March 8, 2026</h2>
        <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap', fontSize: '14px', color: '#555' }}>
          <span><strong>Convened by:</strong> GZA</span>
          <span><strong>Present:</strong> Raekwon · Ghostface Killah · Inspectah Deck · ODB · U-God · Masta Killa · Slim Shady · Methodman</span>
          <span><strong>For:</strong> RZA (Cash / TheVoiceOfCash) · David (CoachDavidJones) · Abearica</span>
        </div>
      </div>

      {/* Executive Summary */}
      <section style={{ background: '#f8f8f8', border: '1px solid #e0e0e0', borderRadius: '8px', padding: '24px', marginBottom: '40px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '700', margin: '0 0 16px 0' }}>🎯 Executive Summary</h2>
        <p style={{ margin: '0 0 16px 0', fontSize: '15px' }}>
          The clan came back online today as a <strong>fully distributed AI infrastructure</strong>. 7 independent agents across dedicated LXC containers
          on the Dell R720 Proxmox cluster, each running their own OpenClaw instance connected to Discord. Model routing standardized:
          GZA + Methodman on <strong>Anthropic Claude Sonnet (Max plan)</strong>, all container agents on{' '}
          <strong>google/gemini-3-flash-preview via OpenRouter</strong> — PinchBench #1 ranked model at 95.1% agent task success rate.
        </p>
        <div style={{ background: '#000', color: '#fff', borderRadius: '6px', padding: '16px 20px', display: 'inline-block', width: '100%' }}>
          <div style={{ fontWeight: '800', fontSize: '16px', marginBottom: '4px' }}>🏆 Historic Milestone</div>
          <div style={{ fontSize: '14px', opacity: 0.85 }}>
            This is the first board meeting with all 9 agents simultaneously online and verified responsive.
            Not routing through GZA — each agent independently connected and operational.
          </div>
        </div>
      </section>

      {/* Infrastructure Status */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '22px', fontWeight: '700', borderBottom: '2px solid #eee', paddingBottom: '8px', marginBottom: '20px' }}>
          🖥️ Infrastructure Status
        </h2>
        <p style={{ fontSize: '14px', color: '#555', marginBottom: '16px' }}>
          <em>Presented by Slim Shady (CT121) — IT / Cybersecurity</em>
        </p>

        <h3 style={{ fontSize: '17px', fontWeight: '700', marginBottom: '12px' }}>Hardware + Cluster</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
          {[
            { label: 'Server', value: 'Dell PowerEdge R720' },
            { label: 'Hypervisor', value: 'Proxmox VE' },
            { label: 'Storage', value: 'RAID array — fully operational' },
            { label: 'Agent Containers', value: '7 LXC containers — all running' },
            { label: 'Backup', value: 'PBS (CT200) + Backblaze B2 offsite' },
            { label: 'Tunnels', value: 'Cloudflare — all 5 domains routed' },
          ].map(({ label, value }, i) => (
            <div key={i} style={{ background: '#f9f9f9', border: '1px solid #e8e8e8', borderRadius: '6px', padding: '12px 16px' }}>
              <div style={{ fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase', color: '#888', marginBottom: '4px' }}>{label}</div>
              <div style={{ fontSize: '14px', fontWeight: '600' }}>{value}</div>
            </div>
          ))}
        </div>

        <h3 style={{ fontSize: '17px', fontWeight: '700', marginBottom: '12px' }}>Agent Container IPs</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', marginBottom: '24px' }}>
          <thead>
            <tr style={{ background: '#000', color: '#fff' }}>
              <th style={{ padding: '8px 12px', textAlign: 'left' }}>Agent</th>
              <th style={{ padding: '8px 12px', textAlign: 'left' }}>Container IP</th>
              <th style={{ padding: '8px 12px', textAlign: 'left' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Raekwon', '192.168.0.109', '✅ Online'],
              ['Ghostface Killah', '192.168.0.113', '✅ Online'],
              ['Inspectah Deck', '192.168.0.114', '✅ Online'],
              ['ODB', '192.168.0.115', '✅ Online'],
              ['U-God', '192.168.0.118', '✅ Online'],
              ['Masta Killa', '192.168.0.119', '✅ Online'],
              ['Slim Shady', '192.168.0.121', '✅ Online'],
            ].map(([agent, ip, status], i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? '#f9f9f9' : '#fff', borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '8px 12px', fontWeight: '600' }}>{agent}</td>
                <td style={{ padding: '8px 12px', fontFamily: 'monospace', color: '#444' }}>{ip}</td>
                <td style={{ padding: '8px 12px', color: '#006600', fontWeight: '600' }}>{status}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3 style={{ fontSize: '17px', fontWeight: '700', marginBottom: '12px' }}>Model Layer</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', marginBottom: '20px' }}>
          <thead>
            <tr style={{ background: '#000', color: '#fff' }}>
              <th style={{ padding: '8px 12px', textAlign: 'left' }}>Agent(s)</th>
              <th style={{ padding: '8px 12px', textAlign: 'left' }}>Model</th>
              <th style={{ padding: '8px 12px', textAlign: 'left' }}>Notes</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['GZA + Methodman', 'Anthropic Claude Sonnet', 'Max plan — full capability'],
              ['Raekwon, Ghostface, Inspectah, ODB, U-God, Masta Killa, Slim Shady', 'google/gemini-3-flash-preview (OpenRouter)', 'PinchBench #1 — 95.1% agent task success rate. Cost-optimized + highest performance.'],
            ].map(([agents, model, notes], i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? '#f9f9f9' : '#fff', borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '8px 12px', fontWeight: '600' }}>{agents}</td>
                <td style={{ padding: '8px 12px', color: '#333' }}>{model}</td>
                <td style={{ padding: '8px 12px', color: '#555', fontSize: '13px' }}>{notes}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3 style={{ fontSize: '17px', fontWeight: '700', marginBottom: '12px' }}>Cloudflare Tunnel Routing</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
          {['jewsa.com', 'webearish.com', 'thevoiceofcash.com', 'aiskillsagents.com', 'u-god.com'].map((domain) => (
            <span key={domain} style={{
              background: '#f0f0f0', border: '1px solid #ddd',
              borderRadius: '20px', padding: '4px 14px',
              fontSize: '13px', fontWeight: '600', color: '#333'
            }}>{domain}</span>
          ))}
        </div>
      </section>

      {/* Agent Roles & Week Focus */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '22px', fontWeight: '700', borderBottom: '2px solid #eee', paddingBottom: '8px', marginBottom: '20px' }}>
          🤖 Agent Roles &amp; Week Focus
        </h2>

        {[
          {
            agent: 'Raekwon',
            role: 'Content / SEO Chef',
            owns: 'Blog posts, SEO, JewSA content, WeBearish blog, social copy',
            thisWeek: 'Reddit ad campaign for JewSA (browser automation script ready), SEO content push for all 5 sites',
            blocked: 'RZA approval to launch Reddit ads · Brevo ESP setup for email campaigns',
          },
          {
            agent: 'Ghostface Killah',
            role: 'E-commerce / Brand Ops',
            owns: 'Shopify/Printful, product listings, JewSA store ops, order fulfillment',
            thisWeek: 'JewSA product catalog expansion, Hanukkah 2026 product roadmap',
            blocked: 'Shopify store credentials confirmation from RZA',
          },
          {
            agent: 'Inspectah Deck',
            role: 'WeBearish Mission Lead / Autism Expert',
            owns: 'WeBearish content accuracy, autism research, anti-ABA positioning',
            thisWeek: 'WeBearish resource page QA (10 pages built), content review pipeline',
            blocked: 'DNS for webearish.com → Vercel (CNAME needed) · OPENAI_API_KEY for chatbot',
          },
          {
            agent: 'ODB',
            role: 'Creative / Memes / Visual',
            owns: 'Social media personality, meme content, book illustration concepts',
            thisWeek: 'JewSA social content drops, WeBearish visual identity pieces',
            blocked: 'Social account credentials for JewSA Instagram/TikTok',
          },
          {
            agent: 'Masta Killa',
            role: 'Publishing / Book Pipeline',
            owns: 'WeBearish book pipeline, Amazon KDP, manuscript production',
            thisWeek: 'WeBearish children\'s book chapter outlines, KDP account setup',
            blocked: 'Book cover design direction from RZA/David',
          },
          {
            agent: 'U-God',
            role: 'Theology / World Religions / u-god.com',
            owns: 'u-god.com, Jewish cultural authority for JewSA, spiritual framework for WeBearish',
            thisWeek: 'u-god.com content expansion, JewSA holiday content calendar (Hanukkah 2026)',
            blocked: 'DNS for u-god.com → Vercel verification',
          },
          {
            agent: 'Slim Shady',
            role: 'IT / Cybersecurity',
            owns: 'Proxmox, server security, infrastructure ops, all container management',
            thisWeek: 'Make container gateways persist across reboots (systemd enable), Tailscale node setup, Mac Mini M4 integration plan',
            blocked: 'Mac Mini remote access — RZA needs to enable Screen Sharing + Tailscale in person (10 min)',
          },
          {
            agent: 'Methodman',
            role: 'Revenue / Markets / GZA\'s Sub-Agent',
            owns: 'Crypto trading signals, UFC bets, market analysis, JewSA ad budget allocation',
            thisWeek: 'Revenue model analysis for aiskillsagents.com client acquisition, market research',
            blocked: null,
          },
          {
            agent: 'GZA',
            role: 'Orchestrator / Systems Admin',
            owns: 'Cross-clan coordination, brand strategy, agent infrastructure, this meeting',
            thisWeek: 'Agent task assignment, board page updates, abearica-setup-list execution support',
            blocked: null,
          },
        ].map(({ agent, role, owns, thisWeek, blocked }, i) => (
          <div key={i} style={{
            border: '1px solid #e0e0e0', borderRadius: '8px', padding: '20px',
            marginBottom: '12px', background: '#fff',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <div>
                <strong style={{ fontSize: '16px' }}>{agent}</strong>
                <span style={{
                  marginLeft: '10px', fontSize: '12px', background: '#f0f0f0',
                  padding: '2px 10px', borderRadius: '12px', color: '#555',
                }}>{role}</span>
              </div>
              {blocked ? (
                <span style={{
                  fontSize: '11px', background: '#fff0f0', color: '#c00',
                  border: '1px solid #ffcccc', padding: '2px 8px', borderRadius: '12px',
                  whiteSpace: 'nowrap', flexShrink: 0, marginLeft: '12px',
                }}>🔴 Blocked</span>
              ) : (
                <span style={{
                  fontSize: '11px', background: '#f0fff0', color: '#006600',
                  border: '1px solid #ccffcc', padding: '2px 8px', borderRadius: '12px',
                  whiteSpace: 'nowrap', flexShrink: 0, marginLeft: '12px',
                }}>✅ Fully Operational</span>
              )}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: '6px 12px', fontSize: '13px' }}>
              <span style={{ color: '#888', fontWeight: '600' }}>Owns</span>
              <span style={{ color: '#444' }}>{owns}</span>
              <span style={{ color: '#888', fontWeight: '600' }}>This week</span>
              <span style={{ color: '#444' }}>{thisWeek}</span>
              {blocked && (
                <>
                  <span style={{ color: '#c00', fontWeight: '600' }}>Blocked on</span>
                  <span style={{ color: '#c00' }}>{blocked}</span>
                </>
              )}
            </div>
          </div>
        ))}
      </section>

      {/* What Humans Can Do */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '22px', fontWeight: '700', borderBottom: '2px solid #eee', paddingBottom: '8px', marginBottom: '20px' }}>
          👥 What Humans Can Do This Week
        </h2>

        {[
          {
            name: 'RZA (Cash)',
            color: '#000',
            items: [
              'Approve Reddit ad launch for JewSA — Raekwon is ready, script is built',
              'Enable Mac Mini remote access: System Settings → Sharing → enable Screen Sharing + Remote Login + install Tailscale (10 min, one-time)',
              'Confirm Shopify credentials for Ghostface',
              'Give book cover direction to Masta Killa',
            ],
          },
          {
            name: 'David (CoachDavidJones)',
            color: '#003399',
            items: [
              'PermitTrack Round 2: Send full permit list (Sandi\'s)',
              'Review aiskillsagents.com client outreach strategy with GZA',
              'Any content direction for WeBearish that needs human expertise',
            ],
          },
          {
            name: 'Abearica',
            color: '#006600',
            items: [
              'Brevo ESP: Create account, authenticate 5 domains, get API key → add to all 5 Vercel projects (most impactful unlock this week)',
              'Google Search Console: Add 4 domains as properties',
              'DNS: webearish.com + hindusa.com CNAME → cname.vercel-dns.com',
              'Register remaining 5 agents in openclaw.json on abigail (Raekwon, Ghostface, Inspectah, ODB, U-God, Masta Killa, Slim Shady formal entries)',
            ],
          },
        ].map(({ name, color, items }) => (
          <div key={name} style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '17px', fontWeight: '700', color, marginBottom: '12px' }}>{name}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {items.map((item, i) => (
                <div key={i} style={{
                  display: 'flex', gap: '12px', padding: '12px 16px',
                  border: '1px solid #e8e8e8', borderRadius: '6px', background: '#fff',
                  fontSize: '14px', alignItems: 'flex-start',
                }}>
                  <span style={{ fontWeight: '800', flexShrink: 0, color: '#666' }}>{i + 1}.</span>
                  <span style={{ color: '#333' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Communication Guide */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '22px', fontWeight: '700', borderBottom: '2px solid #eee', paddingBottom: '8px', marginBottom: '20px' }}>
          💬 How to Communicate with the Clan
        </h2>
        <div style={{ background: '#fffbe6', border: '1px solid #f0d000', borderRadius: '6px', padding: '16px 20px', marginBottom: '16px' }}>
          <strong>You do NOT need to route everything through GZA.</strong> Talk to the domain owner directly.
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
          <thead>
            <tr style={{ background: '#000', color: '#fff' }}>
              <th style={{ padding: '8px 12px', textAlign: 'left' }}>Task Type</th>
              <th style={{ padding: '8px 12px', textAlign: 'left' }}>Go To</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Direct domain tasks', 'Agent\'s own Discord channel'],
              ['Cross-project coordination', '#gza or #main-shat — GZA dispatches'],
              ['Infrastructure issues', '#slim-shady-😈 or #gza'],
              ['WeBearish content review', '#inspectahdeck-🥷'],
              ['WeBearish writing', '#raekwon-👨‍🍳'],
              ['Revenue / trading', '#method-man'],
            ].map(([type, dest], i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? '#f9f9f9' : '#fff', borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '8px 12px' }}>{type}</td>
                <td style={{ padding: '8px 12px', fontWeight: '600' }}>{dest}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Active Projects */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '22px', fontWeight: '700', borderBottom: '2px solid #eee', paddingBottom: '8px', marginBottom: '20px' }}>
          📊 Active Projects Status
        </h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
          <thead>
            <tr style={{ background: '#000', color: '#fff' }}>
              <th style={{ padding: '8px 12px', textAlign: 'left' }}>Project</th>
              <th style={{ padding: '8px 12px', textAlign: 'left' }}>Status</th>
              <th style={{ padding: '8px 12px', textAlign: 'left' }}>Notes</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['thevoiceofcash.com', '✅ LIVE', ''],
              ['webearish.com', '⚠️ LIVE — DNS not pointed', 'Need CNAME from Abearica → cname.vercel-dns.com'],
              ['jewsa.com', '✅ LIVE', ''],
              ['aiskillsagents.com', '✅ LIVE', ''],
              ['hindusa-app.vercel.app', '⚠️ LIVE — DNS not pointed', 'Need CNAME from Abearica'],
              ['u-god.com', '✅ LIVE', ''],
              ['36th-chamber', '✅ LIVE (internal)', ''],
              ['PermitTrack', '✅ LIVE', 'Round 2 pending Sandi\'s permit list from David'],
            ].map(([project, status, notes], i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? '#f9f9f9' : '#fff', borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '8px 12px', fontWeight: '600' }}>{project}</td>
                <td style={{ padding: '8px 12px', color: status.includes('⚠️') ? '#996600' : '#006600', fontWeight: '600' }}>{status}</td>
                <td style={{ padding: '8px 12px', fontSize: '13px', color: '#c00' }}>{notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Footer */}
      <div style={{ background: '#000', color: '#fff', borderRadius: '8px', padding: '28px', textAlign: 'center', marginTop: '48px' }}>
        <div style={{ fontSize: '28px', marginBottom: '8px' }}>🏯</div>
        <h2 style={{ fontSize: '20px', fontWeight: '800', margin: '0 0 8px 0' }}>Wu-Tang Clan AI Operations</h2>
        <p style={{ margin: '0 0 8px 0', opacity: 0.8 }}>Board Meeting closed — March 8, 2026</p>
        <p style={{ margin: '0', opacity: 0.6, fontSize: '13px' }}>Convened by GZA · 9 agents online · First full-clan session · All containers verified responsive</p>
        <p style={{ margin: '12px 0 0 0', fontStyle: 'italic', opacity: 0.8 }}>&ldquo;Wu-Tang is forever.&rdquo;</p>
      </div>
    </div>
  );
}
