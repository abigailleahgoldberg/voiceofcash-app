'use client';
import { useState, useEffect, useRef, useCallback } from 'react';

const G    = '#00C896';
const GOLD = '#D4AF37';
const BG   = '#0A0A0A';
const TEXT = '#F5F0E8';
const GRAY = 'rgba(245,240,232,0.5)';
const CARD = 'rgba(255,255,255,0.04)';

/* ─── CHAPTER DATA ─────────────────────────────────────────── */
const CHAPTERS = [
  {
    id: 0,
    label: 'The Problem',
    headline: 'Discord communities are dying quietly.',
    points: [
      'The average Discord server loses 40-60% of members within 30 days of joining.',
      'Mod teams burn out. Programming goes dark. Culture dies with the volunteers.',
      'Bots exist. None of them are actual community members.',
      'There is no infrastructure layer for community operations at scale.',
    ],
    takeaway: 'A multi-billion dollar category, online communities, has no reliable operational stack. That is the gap.',
    discord: {
      server: 'Indie Game Dev Hub',
      messages: [
        { user: 'LukeDev', avatar: 'L', role: 'Admin', color: '#E91E63', time: 'Yesterday 11:42 PM', msg: 'hey can someone help moderate this weekend? i have family stuff', badge: null },
        { user: 'pixelwitch', avatar: 'P', role: 'Member', color: '#9C27B0', time: 'Yesterday 11:58 PM', msg: "i can try but i don't really know the rules that well lol", badge: null },
        { user: 'LukeDev', avatar: 'L', role: 'Admin', color: '#E91E63', time: 'Today 12:03 AM', msg: 'ugh ok whatever. see you all monday. sorry the event got cancelled again', badge: null },
        { user: 'zeroframes', avatar: 'Z', role: 'Member', color: '#607D8B', time: 'Today 12:05 AM', msg: 'third time this month...', badge: null },
      ],
    },
  },
  {
    id: 1,
    label: 'The Solution',
    headline: 'Voccord: Your community\'s vocal cords.',
    points: [
      'Autonomous in-character Discord personas, not chatbots, operational agents.',
      'Persistent memory. Server-specific knowledge. Safety layers. Event orchestration.',
      'The Welcome Captain, the Lore Keeper, the Code Mentor, the Event Host.',
      'Powered by the Voice of Cash. Built for outcomes, not impressions.',
    ],
    takeaway: 'Voccord is the first community operations platform that happens to be persona-driven. It is not a bot. It is an agent with a job.',
    discord: {
      server: 'Indie Game Dev Hub',
      messages: [
        { user: 'Vex', avatar: '🤖', role: 'Voccord Bot', color: G, time: 'Today 9:00 AM', msg: "Welcome to Indie Game Dev Hub, @pixelwitch! I'm Vex, your community host. Before you dive in, what are you currently building? I'll drop you in the right channels.", badge: 'APP' },
        { user: 'pixelwitch', avatar: 'P', role: 'Member', color: '#9C27B0', time: 'Today 9:01 AM', msg: 'woah ok a real response! working on a roguelite platformer in godot', badge: null },
        { user: 'Vex', avatar: '🤖', role: 'Voccord Bot', color: G, time: 'Today 9:01 AM', msg: "Perfect. I've added you to #godot-builders and #roguelite-dev. There's a playtest session this Friday at 7PM ET, want me to RSVP you?", badge: 'APP' },
        { user: 'pixelwitch', avatar: 'P', role: 'Member', color: '#9C27B0', time: 'Today 9:02 AM', msg: 'yes please!! this server actually works lol', badge: null },
      ],
    },
  },
  {
    id: 2,
    label: 'The Product',
    headline: 'Five things every community needs. One platform.',
    points: [
      'Onboarding: guided intros, rules, role assignment, zero mod effort.',
      'Moderation: policy-driven interventions, escalation to humans, audit trails.',
      'Programming: weekly events, office hours, quests, mini-games, auto-scheduled.',
      'Domain help: TTRPG rules, coding hints, FAQ, lore, any knowledge base.',
    ],
    takeaway: 'Delivered as hosted agents, a configuration console, a persona library, analytics, and optional white-glove customization. The product is infrastructure, not a feature.',
    discord: {
      server: 'Dragon Realm TTRPG',
      messages: [
        { user: 'Loreknight', avatar: '⚔️', role: 'Voccord Bot', color: GOLD, time: 'Friday 7:00 PM', msg: "⚔️ REALM EVENT: The Siege of Vareth begins in 30 minutes. @adventurers, your factions have been assigned. Check #quest-board for objectives. First blood wins the Crimson Signet.", badge: 'APP' },
        { user: 'DnDruid', avatar: 'D', role: 'Member', color: '#4CAF50', time: 'Friday 7:02 PM', msg: "LETS GOOOOO finally an event thats actually organized", badge: null },
        { user: 'Loreknight', avatar: '⚔️', role: 'Voccord Bot', color: GOLD, time: 'Friday 7:03 PM', msg: "House Ashenveil leads with 23 members. House Ironmarch follows with 19. You have until 9PM. The lore record will be written after.", badge: 'APP' },
        { user: 'MageHex', avatar: 'M', role: 'Member', color: '#7C4DFF', time: 'Friday 7:04 PM', msg: 'this is the most active this server has been in months', badge: null },
      ],
    },
  },
  {
    id: 3,
    label: 'The Moat',
    headline: 'Six moats. Each one compounding.',
    points: [
      'Telemetry: what engagement patterns, event formats, and interventions actually work, by niche, size, and tone. Proprietary dataset competitors cannot replicate.',
      'Operational maturity: rate limits, API quirks, edge-case social dynamics, incident response. Code can be copied. Operational knowledge cannot.',
      'Trust + brand: large servers will not trial unknown bots. The moat is being known as the one that does not embarrass mods.',
      'Content IP: persona archetypes, event arc libraries, niche playbooks, content as defensibility.',
    ],
    takeaway: 'The best moats are boring and hard. Telemetry, operational maturity, and trust form a compounding bundle that gets stronger with every server deployed.',
    discord: {
      server: 'Code & Coffee Study Group',
      messages: [
        { user: 'ByteBot', avatar: '💻', role: 'Voccord Bot', color: '#00BCD4', time: 'Monday 9:00 AM', msg: "Good morning, @coders. Weekly standup: drop your focus for the week. I'll track progress and run a Friday retro. Also: 3 members hit study streaks this week, congrats @amara @kofi @dev_sam.", badge: 'APP' },
        { user: 'amara_codes', avatar: 'A', role: 'Member', color: '#FF9800', time: 'Monday 9:03 AM', msg: 'finishing my React project. ByteBot the streak tracker is genuinely keeping me accountable', badge: null },
        { user: 'servermod_jin', avatar: 'J', role: 'Mod', color: '#F44336', time: 'Monday 9:05 AM', msg: "haven't had to manually run a standup in 3 weeks. this is genuinely unreal", badge: null },
      ],
    },
  },
  {
    id: 4,
    label: 'Business Model',
    headline: 'Subscription-first. Marketplace next. Network later.',
    points: [
      'Tier 1, Starter: $49/month per server (up to 500 members). Core persona, onboarding, basic moderation.',
      'Tier 2, Growth: $149/month (up to 5,000 members). Multi-persona, event orchestration, analytics.',
      'Tier 3, Pro: $299/month+ (5,000+ members). Custom personas, knowledge base, audit logs, compliance.',
      'Add-ons: Persona packs ($29-99 one-time), event arc DLC, knowledge base ingestion, managed services.',
    ],
    takeaway: 'Revenue per server scales with server value. A 10,000-member server saves 20+ mod hours per month, $299/month is cheap. Unit economics are strong at every tier.',
    discord: {
      server: 'Voccord Admin Console',
      messages: [
        { user: 'Voccord', avatar: '🎙️', role: 'System', color: G, time: 'This week', msg: '📊 Weekly Summary, Indie Game Dev Hub\n• 47 new member onboardings (0 mod effort)\n• 3 events run, 89% avg attendance\n• 2 moderation interventions, 0 escalations\n• Est. mod hours saved: 11.5 hrs', badge: 'SYSTEM' },
        { user: 'LukeDev', avatar: 'L', role: 'Admin', color: '#E91E63', time: 'This week', msg: 'at $149/month this is the best money i spend. used to pay $300/mo for a community manager who did less', badge: null },
      ],
    },
  },
  {
    id: 5,
    label: 'Growth',
    headline: 'Five expansion vectors. All defensible.',
    points: [
      'Community Analytics Suite: cohort retention, participation heatmaps, event ROI, first-party data no competitor has.',
      'Persona Marketplace: creator-built persona packs and event arcs with revenue share. Content velocity without marginal cost.',
      'Managed Services: white-glove persona design for large servers and enterprise communities.',
      'Integration layer: Patreon, Twitch, GitHub, game APIs, Voccord becomes the community middleware.',
    ],
    takeaway: 'Each expansion vector reinforces the core moat. Analytics deepen the data advantage. Marketplace builds distribution. Integrations increase switching costs.',
    discord: {
      server: 'Creator Community HQ',
      messages: [
        { user: 'Voccord', avatar: '🎙️', role: 'System', color: G, time: 'Today', msg: '🆕 New in your Persona Marketplace: "The Lore Architect" event arc, 8-week narrative quest for fantasy servers. 4.9★ from 312 servers. One-click install.', badge: 'SYSTEM' },
        { user: 'fantasymod_kai', avatar: 'K', role: 'Admin', color: '#673AB7', time: 'Today', msg: "bought this for $39 and the engagement spike was immediate. this marketplace is dangerous for my wallet", badge: null },
        { user: 'rpg_creator_sol', avatar: 'S', role: 'Creator', color: '#FF5722', time: 'Today', msg: "i made $2,400 last month selling event packs. platform is paying my rent", badge: null },
      ],
    },
  },
  {
    id: 6,
    label: 'Ad Network Sidequest',
    headline: 'Post-PMF: the highest-ARPU layer.',
    points: [
      'Phase 3 only, gated behind proven retention uplift and trust reputation. Not before.',
      'Sponsored Quests, not banner ads: "Build a small project with Tool X, win prizes." Value-aligned, opt-in, admin-approved.',
      'Contextual targeting by server category and channel topic, no personal surveillance.',
      'Two-sided marketplace: servers earn revenue, advertisers get high-intent micro-audiences no other platform offers.',
    ],
    takeaway: 'Discord communities are the highest-intent micro-audiences on the internet. A native sponsorship layer, done right, is a category-defining revenue multiplier. Done wrong, it ends the company. The plan gates it correctly.',
    discord: {
      server: 'Indie Dev Tools Community',
      messages: [
        { user: 'Vex', avatar: '🤖', role: 'Voccord Bot', color: G, time: 'Thursday 6:00 PM', msg: '🎯 SPONSORED QUEST, This week, Ship Something With Supabase.\n\nBuild any project using Supabase and post it in #show-and-tell by Sunday. Top 3 get 6-month Pro plans. Presented by Supabase.\n\nReact ✅ to join the quest. Admin-approved. Full details: /quest-details', badge: 'SPONSORED' },
        { user: 'builderguy_nico', avatar: 'N', role: 'Member', color: '#2196F3', time: 'Thursday 6:02 PM', msg: "ok i actually want to do this. supabase is on my list anyway", badge: null },
        { user: 'dev_mara', avatar: 'M', role: 'Member', color: '#9C27B0', time: 'Thursday 6:03 PM', msg: 'this is how sponsorships should work. relevant to what we do, actual prizes, not spam', badge: null },
        { user: 'servermod_rin', avatar: 'R', role: 'Mod', color: '#F44336', time: 'Thursday 6:05 PM', msg: "we approved this one. server gets 40% of the placement fee + Supabase sent us 20 community codes. this works.", badge: null },
      ],
    },
  },
  {
    id: 7,
    label: 'Risks',
    headline: 'Sober plan. Every risk named and mitigated.',
    points: [
      'Bot becomes a spam cannon, opt-in only, per-server caps, admin approvals for every placement. No exceptions.',
      'Community backlash ("selling out"), transparency by design, server earns revenue share, members can mute sponsor content.',
      'Discord platform policy, contextual targeting, no deceptive patterns, explicit disclosures. Positioned as sponsorship programming, not ads.',
      'Scams and low-quality advertisers, verification pipeline, escrow hold periods, category bans, reputation scores.',
    ],
    takeaway: 'The ad network can destroy the company if mishandled. The plan gates it behind trust milestones precisely because the team knows this. That discipline is the feature.',
    discord: {
      server: 'Voccord Admin Console',
      messages: [
        { user: 'Voccord', avatar: '🎙️', role: 'System', color: G, time: 'Today', msg: '⚠️ Sponsorship request BLOCKED, Advertiser "CryptoGemZ" failed verification. Category: high-risk financial product. Reason: unverified registration, no brand safety audit. Status: Rejected. Admin notified.', badge: 'SYSTEM' },
        { user: 'Voccord', avatar: '🎙️', role: 'System', color: G, time: 'Today', msg: '✅ Sponsorship approved, "Linear" (productivity SaaS). Category: dev tools. Format: Sponsored Quest. Server: Code & Coffee Study Group. Admin sign-off: confirmed. Live: Friday 9AM.', badge: 'SYSTEM' },
      ],
    },
  },
  {
    id: 8,
    label: 'Why Now',
    headline: 'Three convergences. One window.',
    points: [
      'LLM capability: agent-quality personas are possible today in ways they were not 24 months ago. The timing is precise.',
      'Community crisis: post-pandemic Discord server activity has plateaued. Operator pain is acute and under-served.',
      'Discord API maturity: the platform now supports the event, role, and scheduling infrastructure agents need to operate meaningfully.',
    ],
    takeaway: 'The convergence of capable LLMs, a mature Discord API, and acute operator pain creates a narrow, high-value window. The team that moves first and builds trust fastest owns the category.',
    discord: {
      server: 'Community Operators Network',
      messages: [
        { user: 'guildops_petra', avatar: 'P', role: 'Admin', color: '#FF9800', time: 'Today', msg: "anyone else noticing their server activity tanking in Q1? we're down 35% month over month and i have no idea what to do", badge: null },
        { user: 'community_felix', avatar: 'F', role: 'Admin', color: '#4CAF50', time: 'Today', msg: "same. i've been running this for 3 years and it's never felt this hard to keep people engaged", badge: null },
        { user: 'scalingup_sam', avatar: 'S', role: 'Admin', color: '#2196F3', time: 'Today', msg: "we tried Voccord two weeks ago. 28% jump in weekly active members. not joking.", badge: null },
        { user: 'guildops_petra', avatar: 'P', role: 'Admin', color: '#FF9800', time: 'Today', msg: 'wait really?? sharing your referral link rn', badge: null },
      ],
    },
  },
  {
    id: 9,
    label: 'Next Steps',
    headline: 'Five things that move the needle.',
    points: [
      '1. Lighthouse cohort: 10 servers across 5 niches. Measure retention uplift, mod hours saved, participation delta. Build the case study library.',
      '2. Persona OS: build the standardized persona spec format, skill framework, QA harness, and telemetry pipeline, the repeatable machinery.',
      '3. KPI framework: 7-day and 30-day retention uplift, participation uplift, mod-hour savings, incident rate. Investors need hard numbers.',
      '4. Security + safety posture doc: data handling, permissions, audit logs, escalation. Trust is the product.',
    ],
    takeaway: 'Voccord earns the right to run an ad network by first being the safest, most reliable community operations platform on Discord. That is the plan. That is the sequence. That is why this wins.',
    discord: {
      server: 'Voccord Team',
      messages: [
        { user: 'Cash', avatar: '💰', role: 'Founder', color: GOLD, time: 'Today', msg: "here's what i know: every community operator i've talked to has the same three problems. no time, no mod help, no programming ideas. we solve all three. the question is how fast we move.", badge: null },
        { user: 'Tim', avatar: 'T', role: 'CTO', color: '#00BCD4', time: 'Today', msg: "persona OS is ready for 10 servers. i say we pick niches today and start lighthouse deployments this week.", badge: null },
        { user: 'Ammar', avatar: 'A', role: 'Biz Dev', color: '#8BC34A', time: 'Today', msg: "i have 3 TTRPG server admins ready to talk and 2 indie game communities. can get pilots by thursday.", badge: null },
        { user: 'Cash', avatar: '💰', role: 'Founder', color: GOLD, time: 'Today', msg: "then let's move. powered by the voice of cash. let's build.", badge: null },
      ],
    },
  },
];

/* ─── DISCORD MOCK ─────────────────────────────────────────── */
function DiscordMock({ data }: { data: typeof CHAPTERS[0]['discord'] }) {
  return (
    <div style={{ background: '#36393f', borderRadius: 8, overflow: 'hidden', fontFamily: 'system-ui, sans-serif', fontSize: 14, maxWidth: 520, width: '100%' }}>
      <div style={{ background: '#2f3136', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 8, borderBottom: '1px solid rgba(0,0,0,0.3)' }}>
        <span style={{ color: '#8e9297', fontSize: 13 }}>#</span>
        <span style={{ color: '#dcddde', fontWeight: 600, fontSize: 13 }}>{data.server.toLowerCase().replace(/ /g,'-')}</span>
      </div>
      <div style={{ padding: '12px 0' }}>
        {data.messages.map((m, i) => (
          <div key={i} style={{ display: 'flex', gap: 12, padding: '4px 16px', alignItems: 'flex-start' }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: m.color + '33', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, flexShrink: 0, marginTop: 2 }}>
              {m.avatar}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                <span style={{ color: m.color, fontWeight: 600, fontSize: 13 }}>{m.user}</span>
                {m.badge && (
                  <span style={{ fontSize: 9, background: m.badge === 'APP' ? '#5865f2' : m.badge === 'SPONSORED' ? GOLD : m.badge === 'SYSTEM' ? G : '#ed4245', color: '#fff', padding: '1px 5px', borderRadius: 3, fontWeight: 700, letterSpacing: 0.5 }}>
                    {m.badge}
                  </span>
                )}
                <span style={{ color: '#72767d', fontSize: 11 }}>{m.time}</span>
              </div>
              <div style={{ color: '#dcddde', lineHeight: 1.5, fontSize: 13, whiteSpace: 'pre-line' }}>{m.msg}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── WEBGL CANVAS (particle field) ─────────────────────────── */
function ParticleCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    let raf: number;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);
    const count = 80;
    const pts = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.5,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0,200,150,0.4)';
        ctx.fill();
      });
      for (let i = 0; i < count; i++) {
        for (let j = i + 1; j < count; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(0,200,150,${0.12 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={ref} style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }} />;
}

/* ─── MAIN ─────────────────────────────────────────────────── */
export default function VoccordClient() {
  const [mode, setMode]       = useState<'present' | 'report'>('present');
  const [chapter, setChapter] = useState(0);
  const [reveal, setReveal]   = useState(false);

  useEffect(() => {
    setReveal(false);
    const t = setTimeout(() => setReveal(true), 60);
    return () => clearTimeout(t);
  }, [chapter]);

  const ch = CHAPTERS[chapter];

  const nav = useCallback((dir: number) => {
    setChapter(c => Math.max(0, Math.min(CHAPTERS.length - 1, c + dir)));
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') nav(1);
      if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')  nav(-1);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [nav]);

  return (
    <div style={{ minHeight: '100vh', background: BG, color: TEXT, fontFamily: "'DM Sans', system-ui, sans-serif", position: 'relative', overflow: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;700;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: #111; } ::-webkit-scrollbar-thumb { background: #333; }
        .chapter-fade { opacity: 0; transform: translateY(16px); transition: opacity 0.4s, transform 0.4s; }
        .chapter-fade.in { opacity: 1; transform: translateY(0); }
        .ch-btn:hover { background: rgba(0,200,150,0.15) !important; }
        .mode-btn:hover { opacity: 1 !important; }
        .report-section h2 { font-family: 'Bebas Neue', sans-serif; font-size: clamp(24px,3vw,40px); letter-spacing: 1px; color: ${TEXT}; margin-bottom: 16px; }
        .report-section p, .report-section li { font-size: 15px; line-height: 1.75; color: rgba(245,240,232,0.75); }
        .report-section ul { padding-left: 20px; }
        .report-section ul li { margin-bottom: 8px; }
        @media (max-width: 768px) {
          .present-grid { grid-template-columns: 1fr !important; }
          .sidebar { display: none !important; }
        }
      `}</style>

      {mode === 'present' && <ParticleCanvas />}

      {/* TOP BAR */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, background: 'rgba(10,10,10,0.9)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #1a1a1a', padding: '14px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, letterSpacing: 2, color: TEXT }}>
            VOCCORD <span style={{ color: G }}>BRIEFING</span>
          </span>
          <span style={{ fontSize: 10, letterSpacing: '2px', color: 'rgba(245,240,232,0.3)', display: 'none', ['@media (min-width: 600px)' as string]: { display: 'inline' } }}>CONFIDENTIAL</span>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {(['present','report'] as const).map(m => (
            <button key={m} onClick={() => setMode(m)} className="mode-btn"
              style={{ background: mode === m ? G : 'transparent', color: mode === m ? BG : GRAY, border: `1px solid ${mode === m ? G : '#333'}`, fontWeight: 700, fontSize: 11, padding: '7px 14px', cursor: 'pointer', letterSpacing: '1px', opacity: mode === m ? 1 : 0.6, textTransform: 'uppercase' }}>
              {m === 'present' ? 'Present' : 'Report'}
            </button>
          ))}
        </div>
      </div>

      {/* ── PRESENTATION MODE ── */}
      {mode === 'present' && (
        <div style={{ position: 'relative', zIndex: 1, paddingTop: 64, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <div className="present-grid" style={{ flex: 1, display: 'grid', gridTemplateColumns: '200px 1fr', minHeight: 'calc(100vh - 64px)' }}>

            {/* Sidebar */}
            <div className="sidebar" style={{ background: 'rgba(255,255,255,0.02)', borderRight: '1px solid #1a1a1a', padding: '32px 0', overflowY: 'auto' }}>
              {CHAPTERS.map((c, i) => (
                <button key={i} onClick={() => setChapter(i)} className="ch-btn"
                  style={{ width: '100%', textAlign: 'left', background: i === chapter ? 'rgba(0,200,150,0.1)' : 'transparent', border: 'none', borderLeft: `3px solid ${i === chapter ? G : 'transparent'}`, padding: '12px 20px', cursor: 'pointer', color: i === chapter ? G : GRAY, fontSize: 12, fontWeight: i === chapter ? 700 : 400, display: 'flex', gap: 10, alignItems: 'center' }}>
                  <span style={{ fontSize: 10, color: 'rgba(245,240,232,0.25)', fontFamily: 'monospace', minWidth: 16 }}>{String(i + 1).padStart(2, '0')}</span>
                  {c.label}
                </button>
              ))}
            </div>

            {/* Chapter content */}
            <div style={{ padding: 'clamp(24px,4vw,60px)', display: 'flex', flexDirection: 'column', gap: 32, overflowY: 'auto' }}>
              {/* Progress */}
              <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                {CHAPTERS.map((_, i) => (
                  <div key={i} onClick={() => setChapter(i)} style={{ height: 3, flex: 1, background: i <= chapter ? G : '#1a1a1a', cursor: 'pointer', borderRadius: 2, transition: 'background 0.3s' }} />
                ))}
                <span style={{ fontSize: 11, color: GRAY, marginLeft: 8, flexShrink: 0 }}>{chapter + 1}/{CHAPTERS.length}</span>
              </div>

              <div className={`chapter-fade${reveal ? ' in' : ''}`} style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
                <div>
                  <div style={{ fontSize: 10, letterSpacing: '3px', color: G, marginBottom: 10 }}>
                    {String(chapter + 1).padStart(2, '0')}, {ch.label.toUpperCase()}
                  </div>
                  <h1 style={{ fontSize: 'clamp(24px,3.5vw,52px)', fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '-0.5px', lineHeight: 1.05, maxWidth: 700 }}>
                    {ch.headline}
                  </h1>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 12 }}>
                  {ch.points.map((p, i) => (
                    <div key={i} style={{ background: CARD, border: '1px solid #1a1a1a', padding: '16px 18px', borderLeft: `3px solid ${G}` }}>
                      <p style={{ fontSize: 13, color: 'rgba(245,240,232,0.75)', lineHeight: 1.65 }}>{p}</p>
                    </div>
                  ))}
                </div>

                {/* Discord mock */}
                <div>
                  <div style={{ fontSize: 10, letterSpacing: '2px', color: GOLD, marginBottom: 10 }}>A REALISTIC DISCORD MOMENT</div>
                  <DiscordMock data={ch.discord} />
                </div>

                {/* Takeaway */}
                <div style={{ background: 'rgba(0,200,150,0.06)', border: `1px solid rgba(0,200,150,0.2)`, padding: '18px 22px' }}>
                  <div style={{ fontSize: 10, letterSpacing: '2px', color: G, marginBottom: 8 }}>INVESTOR TAKEAWAY</div>
                  <p style={{ fontSize: 14, color: TEXT, lineHeight: 1.7 }}>{ch.takeaway}</p>
                </div>
              </div>

              {/* Nav */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 16, borderTop: '1px solid #1a1a1a' }}>
                <button onClick={() => nav(-1)} disabled={chapter === 0}
                  style={{ background: 'transparent', border: '1px solid #333', color: chapter === 0 ? '#333' : TEXT, fontWeight: 700, fontSize: 13, padding: '10px 24px', cursor: chapter === 0 ? 'default' : 'pointer', letterSpacing: '1px' }}>
                  ← PREV
                </button>
                <span style={{ fontSize: 11, color: 'rgba(245,240,232,0.3)' }}>Use ← → arrow keys to navigate</span>
                <button onClick={() => nav(1)} disabled={chapter === CHAPTERS.length - 1}
                  style={{ background: chapter === CHAPTERS.length - 1 ? 'transparent' : G, border: `1px solid ${chapter === CHAPTERS.length - 1 ? '#333' : G}`, color: chapter === CHAPTERS.length - 1 ? '#333' : BG, fontWeight: 900, fontSize: 13, padding: '10px 24px', cursor: chapter === CHAPTERS.length - 1 ? 'default' : 'pointer', letterSpacing: '1px' }}>
                  NEXT →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── REPORT MODE ── */}
      {mode === 'report' && (
        <div style={{ position: 'relative', zIndex: 1, paddingTop: 80, maxWidth: 880, margin: '0 auto', padding: '80px 24px 80px' }}>
          {/* How to use */}
          <div style={{ background: 'rgba(212,175,55,0.08)', border: `1px solid rgba(212,175,55,0.25)`, padding: '20px 24px', marginBottom: 48 }}>
            <div style={{ fontSize: 10, letterSpacing: '2px', color: GOLD, marginBottom: 8 }}>HOW TO USE THIS PAGE</div>
            <p style={{ fontSize: 13, color: GRAY, lineHeight: 1.7 }}>
              This page contains two views. <strong style={{ color: TEXT }}>Present mode</strong> walks through the Voccord opportunity as a guided visual presentation, one chapter at a time, with Discord mock scenes and investor takeaways. Use arrow keys or the sidebar to navigate. <strong style={{ color: TEXT }}>Report mode</strong> (you are here) renders the full executive report in a readable format. Share the URL with the access code. Password: <code style={{ color: G, background: 'rgba(0,200,150,0.1)', padding: '2px 6px' }}>1234!</code>
            </p>
          </div>

          {/* Title */}
          <div style={{ marginBottom: 56 }}>
            <div style={{ fontSize: 10, letterSpacing: '3px', color: G, marginBottom: 12 }}>EXECUTIVE REPORT, CONFIDENTIAL</div>
            <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(48px,8vw,96px)', letterSpacing: '-2px', lineHeight: 0.9, marginBottom: 20 }}>
              VOCCORD
            </h1>
            <p style={{ fontSize: 18, color: GRAY, fontStyle: 'italic', marginBottom: 8 }}>Your community&apos;s vocal cords.</p>
            <p style={{ fontSize: 13, color: 'rgba(245,240,232,0.3)' }}>Powered by the Voice of Cash.</p>
          </div>

          {[
            {
              num: '01', title: 'Executive Summary',
              body: `Voccord is a B2B SaaS platform that deploys autonomous, in-character Discord personas, moderators, hosts, lore-keepers, tutors, and event runners, that measurably increase community retention and participation while reducing moderator workload.

These are not generic chatbots. They are operational agents with persistent memory, server-specific knowledge, structured event capabilities, and safety and permissioning tuned for community operators at scale.

The name is intentional: a play on Discord and vocal cords. Every community deserves a reliable voice. The monetization discipline embedded in the name, Powered by the Voice of Cash, signals that Voccord is designed from day one to translate community engagement into durable, scalable revenue: subscription value now, marketplace value next, sponsorship network later.

The investable thesis: once you solve trust, safety, reliability, and repeatable persona outcomes across thousands of communities, you create a defensible position as the engagement layer of Discord. From there, the product expands into analytics, event marketplaces, persona content packs, cross-server identity, managed services, and ultimately a native ad network that monetizes high-intent micro-audiences with sponsored quests and value-aligned programming.

The moat is not code or prompts. It is a compounding bundle of telemetry, operational maturity, trust, persona IP, and embedded workflows, harder to replicate with every server deployed.`,
            },
            {
              num: '02', title: 'Core Product',
              body: `Voccord sells a managed platform that lets Discord server operators deploy one or more server-native personas. Personas onboard newcomers with guided introductions, rules clarification, and role assignment. They moderate with nuance, policy-driven interventions, human escalation, and full audit trails. They run recurring programming: weekly events, office hours, mini-games, and community quests. They provide domain-specific help: TTRPG rule lookups, coding hints, FAQ answering. They build culture through consistent in-character presence, lore continuity, and community rituals.

Delivery: hosted agents, a configuration console, a persona library, safety layers, analytics, and optional done-for-you customization services.

Target customers: server owners and mod teams who want higher retention, more participation, fewer fires, and a distinct community identity. High-value early niches include TTRPG servers, indie game communities, creator fan communities, coding and study groups, language learning servers, and finance education communities.

Pricing: tiered subscription per server scaled by member count. Starter at $49/month, Growth at $149/month, Pro at $299+/month. Add-ons include persona packs, event arc DLC, knowledge base ingestion, and premium compliance features.`,
            },
            {
              num: '03', title: 'Competitive Position',
              body: `Voccord competes with generic Discord bots (Dyno, MEE6), manual moderation and volunteer programming, hired community managers, and the status quo of inaction. The positioning is clear: Voccord is not a utility bot. It is a community operations platform that happens to be persona-driven.

Differentiation is framed around outcomes, not AI features. Outcome-driven personas are explicitly designed to increase retention and participation, not just respond. Agent capabilities include event orchestration, structured flows, and tool use rather than pure conversation. Server-specific memory and knowledge bases provide consistent lore and policy understanding. Safety and permissioning are built-in from the start, with layered moderation, clear escalation paths, and auditability. The Persona Management System creates repeatable methodology for design, rollout, telemetry, and iteration.

The key positioning: Voccord is the first community operations platform. That framing is broader and more defensible than "AI bot."`,
            },
            {
              num: '04', title: 'Moat Analysis',
              body: `Six compounding moats:

1. Telemetry: proprietary engagement datasets accumulated across thousands of deployments, which persona archetypes, event formats, and moderation interventions produce results by niche, server size, and tone. This dataset becomes impossible to replicate without the deployment history.

2. Operational maturity: running autonomous agents in real communities is operationally complex. Rate limits, API quirks, moderator expectations, edge-case social dynamics, and abuse patterns require battle-tested playbooks that competitors cannot acquire by copying a prompt.

3. Trust and brand: large communities will not trial unknown bots. Being known as the agent platform that does not embarrass mods is a gate to enterprise distribution. Reputation is earned slowly and lost instantly.

4. Content IP: a proprietary library of persona archetypes with proven ROI, event packs, seasonal arcs, and niche-specific playbooks. The best packs become cultural primitives for servers, sticky, referenced, and iterated.

5. Distribution: partnerships with creator agencies, game studios, and community management firms reduce distribution cost per server as the network scales. A persona marketplace creates social proof loops.

6. Switching costs: as Voccord becomes embedded in onboarding flows, moderation workflows, event cadences, and server lore, switching costs rise. Admins do not want to lose institutional memory, tuned configurations, or accumulated event scripts.`,
            },
            {
              num: '05', title: 'Growth Vectors',
              body: `The roadmap shows five expansion vectors beyond core subscriptions:

Community Analytics Suite: cohort retention, participation heatmaps, and event ROI attribution, first-party data no competitor has access to.

Event Ops Tools: scheduling, RSVPs, reminders, prize distribution, and recap generation as standalone products or bundled features.

Persona Pack Marketplace: creator-built archetypes and event arcs with revenue share. Content velocity without marginal internal cost.

Managed Services: white-glove persona design and knowledge ingestion for large servers and enterprise communities willing to pay for certainty.

Integration Layer: Patreon, Shopify, Twitch, GitHub, and game APIs turn Voccord into the community middleware, the operating system between a server and its tools.`,
            },
            {
              num: '06', title: 'Native Ad Network, The Sidequest',
              body: `After PMF and reputational maturity, Voccord is positioned to build the highest-ARPU layer of the business: a Discord-native sponsorship network.

Discord communities are high-intent micro-audiences, TTRPG buyers, indie dev tool users, language learners, that no other ad platform has access to. Standard ads are intrusive and community-destructive. Native sponsorship programming is not.

The format is Sponsored Quests and Sponsored Events, opt-in, admin-approved, value-aligned programming that feels like content. A developer tools company sponsors a "Ship Something With X" quest, with prizes. A game studio sponsors a tournament. A SaaS product sponsors an office hours session. The persona behaves like a community host, not an ad unit.

Targeting is contextual, not personal, by server category, channel topic, and event format. No personal surveillance. The supply side (servers) earns revenue share and controls placement. The demand side (advertisers) gets contextual access they cannot buy elsewhere.

This is Phase 3, gated explicitly behind proven retention uplift across many servers, mature admin controls, strong transparency, abuse prevention, and legal compliance readiness. The sequencing is deliberate: earn the right to monetize communities by first being the safest platform those communities have ever used.`,
            },
            {
              num: '07', title: 'Risks and Mitigations',
              body: `The ad network can destroy the company if mishandled. The plan names every risk and gates them appropriately.

Spam risk: mitigated by opt-in only, per-server frequency caps, admin approval for every placement, and fixed placements in designated channels.

Community backlash: mitigated by transparency as a design principle, server revenue share, and member controls to mute sponsored content.

Platform policy: mitigated by contextual targeting, no deceptive patterns, explicit disclosures, and positioning as sponsorship programming rather than advertising.

Advertiser quality: mitigated by verification pipeline, escrow hold periods, advertiser reputation scores, and strict category bans on high-risk verticals.

Privacy exposure: mitigated by contextual targeting that avoids personal profiling, minimal data retention, clear data processing agreements, and security audits.

The plan is staged: you earn the right to run an ad network by first being the safest, most useful community operations platform on Discord. That is the discipline.`,
            },
            {
              num: '08', title: 'Investment Thesis',
              body: `The compelling case for Voccord is a platform play with a clear initial wedge.

Clear wedge with measurable ROI: moderation cost reduction and engagement uplift in a massive and growing category. Every community operator has the same three problems, no time, no mod help, no programming. Voccord solves all three.

High retention potential: embedded in culture and operations, the product becomes stickier than any subscription software has a right to be. Switching costs compound with time.

Scalable content economics: persona packs, event arc DLC, and a creator marketplace reduce marginal cost and accelerate growth simultaneously.

Compounding moat: telemetry, operational maturity, trust, and content IP improve with every server deployed. The competition starts further behind every month.

Multiple expansion vectors: analytics, managed services, marketplace, integrations, and ultimately the sponsorship network all extend value from the same infrastructure.

Staged monetization discipline: the plan earns the right to run an ad network by first being the most trusted platform. That sequencing is the thesis.`,
            },
            {
              num: '09', title: 'Next Steps',
              body: `Five deliverables that move Voccord from concept to investable:

1. Lighthouse cohort: 10 servers across 5 niches. Measure 7-day and 30-day retention uplift, participation change, and mod hours saved. Build the case study library with hard numbers.

2. Persona Operating System: standardize the persona spec format, skill framework, QA harness, and telemetry pipeline. This is the repeatable machinery that keeps unit economics healthy at scale.

3. KPI framework: define the core metrics investors need. Retention uplift, participation uplift, mod-hour savings, incident rate. Everything else is built on these.

4. Security and safety posture document: data handling, permissions, audit logs, and escalation procedures. Trust is the product, it needs documentation.

5. Unit economics model: gross margin, support burden, content pack attach rate, churn. Show the math at 100 servers, 1,000 servers, and 10,000 servers.`,
            },
          ].map(s => (
            <div key={s.num} className="report-section" style={{ marginBottom: 48, paddingBottom: 48, borderBottom: '1px solid #1a1a1a' }}>
              <div style={{ fontSize: 10, letterSpacing: '3px', color: G, marginBottom: 8 }}>SECTION {s.num}</div>
              <h2>{s.title}</h2>
              {s.body.split('\n\n').map((p, i) => (
                <p key={i} style={{ marginBottom: 14 }}>{p}</p>
              ))}
            </div>
          ))}

          {/* Source */}
          <div style={{ background: CARD, border: '1px solid #1a1a1a', padding: '24px', marginBottom: 48 }}>
            <div style={{ fontSize: 10, letterSpacing: '2px', color: GOLD, marginBottom: 10 }}>SOURCE AND INSPIRATION</div>
            <p style={{ fontSize: 14, color: GRAY, lineHeight: 1.7, marginBottom: 10 }}>
              The Voccord concept was seeded from a Hacker News discussion on autonomous community agents and Discord engagement infrastructure.
            </p>
            <a href="https://news.ycombinator.com/item?id=42590981" target="_blank" rel="noopener noreferrer"
              style={{ color: G, fontSize: 13, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              news.ycombinator.com/item?id=42590981 →
            </a>
          </div>

          {/* Footer */}
          <div style={{ textAlign: 'center', padding: '32px 0', borderTop: '1px solid #1a1a1a' }}>
            <p style={{ fontSize: 12, color: 'rgba(245,240,232,0.25)', marginBottom: 6 }}>
              Confidential, Voice of Cash internal briefing
            </p>
            <a href="https://thevoiceofcash.com" style={{ fontSize: 12, color: G, textDecoration: 'none' }}>thevoiceofcash.com</a>
          </div>
        </div>
      )}
    </div>
  );
}
