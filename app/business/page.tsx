import VocFooter from '../components/VocFooter';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Full-Service AI Operations for Businesses | Voice of Cash',
  description: 'Complete AI agent deployment for established businesses. Three plans from $799/month. Agents, training, strategy, and 24/7 human support all under one engagement.',
  alternates: { canonical: 'https://www.thevoiceofcash.com/business' },
};

const G = '#00C896';
const GOLD = '#D4AF37';

export default function BusinessPage() {
  return (
    <div style={{ minHeight:'100vh', background:'#0A0A0A', color:'#F5F0E8', fontFamily:'system-ui,sans-serif' }}>
      <style>{`
        @media(max-width:768px){.biz-hero{grid-template-columns:1fr!important}.biz-ops{grid-template-columns:1fr!important}.biz-incl{grid-template-columns:1fr!important}}
        .pulse { animation: pulse 2s ease-in-out infinite; }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
      `}</style>

      <nav style={{ padding:'16px 5vw', borderBottom:'1px solid #1a1a1a', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:12 }}>
        <a href="/" style={{ fontWeight:900, fontSize:18, color:'#F5F0E8', textDecoration:'none' }}>Voice<span style={{color:G}}>OfCash</span></a>
        <div style={{display:'flex',gap:16,alignItems:'center'}}>
          <a href="/services" style={{fontSize:13,color:'rgba(245,240,232,0.4)',textDecoration:'none'}}>All Services</a>
          <a href="/consultation" style={{ background:G, color:'#0A0A0A', fontWeight:800, fontSize:13, padding:'10px 24px', textDecoration:'none' }}>BOOK CONSULTATION →</a>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ padding:'80px 5vw 72px', maxWidth:1100, margin:'0 auto' }}>
        <div className="biz-hero" style={{ display:'grid', gridTemplateColumns:'1fr 420px', gap:56, alignItems:'center' }}>
          <div>
            <div style={{ display:'inline-flex', gap:8, alignItems:'center', background:'rgba(0,200,150,0.08)', border:`1px solid ${G}33`, padding:'6px 16px', marginBottom:28 }}>
              <span className="pulse" style={{ width:8, height:8, background:G, borderRadius:'50%', display:'inline-block' }}></span>
              <span style={{ fontSize:11, letterSpacing:'2px', color:G, fontWeight:700 }}>DONE-FOR-YOU AI OPERATIONS</span>
            </div>
            <h1 style={{ fontSize:'clamp(36px,5.5vw,68px)', fontWeight:900, lineHeight:1.0, letterSpacing:'-2px', marginBottom:24 }}>
              An agent<br/>and a human.<br/>
              <span style={{color:G}}>Everything handled.</span>
            </h1>
            <p style={{ fontSize:'clamp(17px,2vw,21px)', color:'rgba(245,240,232,0.6)', lineHeight:1.75, marginBottom:16 }}>
              If it can be done digitally inside your business operations, we set it up to run automatically, with an AI agent handling execution and a human team overseeing every moving part.
            </p>
            <p style={{ fontSize:16, color:'rgba(245,240,232,0.45)', lineHeight:1.7, marginBottom:36 }}>
              One monthly engagement. One team. Your leads, your bookings, your content, your CRM, your reputation, your reporting, all running on autopilot while you focus on the work only you can do.
            </p>
            <div style={{ display:'flex', gap:14, flexWrap:'wrap' }}>
              <a href="/consultation" style={{ background:G, color:'#0A0A0A', fontWeight:900, fontSize:16, padding:'17px 40px', textDecoration:'none', letterSpacing:'0.5px' }}>GET STARTED, BOOK A CALL →</a>
            </div>
            <p style={{ fontSize:12, color:'rgba(245,240,232,0.25)', marginTop:12 }}>Free 30-min strategy call. We assess your ops and scope the build. No commitment.</p>
          </div>

          {/* Agent + Human visual */}
          <div style={{ background:'#0D1A0D', border:`1px solid ${G}33`, padding:'32px' }}>
            <div style={{ fontSize:11, letterSpacing:'2px', color:G, marginBottom:20 }}>YOUR OPERATIONS TEAM</div>
            <div style={{ display:'flex', flexDirection:'column', gap:12, marginBottom:28 }}>
              {[
                { role:'AI Lead Agent', task:'Responding to new inquiry, 14s', status:'active' },
                { role:'AI Booking Agent', task:'Scheduling appointment, confirmed', status:'active' },
                { role:'AI Content Agent', task:'Generating 5 posts, scheduled', status:'active' },
                { role:'AI CRM Agent', task:'Updating pipeline, 3 deals moved', status:'active' },
                { role:'Human Strategist', task:'Reviewing weekly performance brief', status:'human' },
                { role:'AI Reputation Agent', task:'Responding to 2 new reviews', status:'active' },
              ].map(item => (
                <div key={item.role} style={{ display:'flex', alignItems:'center', gap:12, padding:'12px 16px', background:'rgba(0,0,0,0.4)', border:`1px solid ${item.status==='human' ? GOLD+'33' : G+'22'}` }}>
                  <span className={item.status === 'active' ? 'pulse' : ''} style={{ width:8, height:8, background: item.status==='human' ? GOLD : G, borderRadius:'50%', flexShrink:0, display:'inline-block', opacity: item.status === 'human' ? 1 : undefined }}></span>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:12, fontWeight:700, color: item.status==='human' ? GOLD : G }}>{item.role}</div>
                    <div style={{ fontSize:11, color:'rgba(245,240,232,0.4)', marginTop:2 }}>{item.task}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ fontSize:11, color:'rgba(245,240,232,0.25)', textAlign:'center', fontStyle:'italic' }}>Your actual business. Running right now. Without you.</div>
          </div>
        </div>
      </section>

      {/* THE CORE PITCH */}
      <section style={{ background:'#0D1A0D', borderTop:'1px solid #1a1a1a', borderBottom:'1px solid #1a1a1a', padding:'72px 5vw' }}>
        <div style={{ maxWidth:820, margin:'0 auto', textAlign:'center' }}>
          <div style={{ fontSize:11, letterSpacing:'3px', color:G, marginBottom:20 }}>THE SIMPLE VERSION</div>
          <h2 style={{ fontSize:'clamp(26px,4vw,48px)', fontWeight:900, lineHeight:1.1, letterSpacing:'-1.5px', marginBottom:28 }}>
            Everything that <span style={{color:G}}>can be automated</span>,<br/>we automate it.
          </h2>
          <p style={{ fontSize:'clamp(16px,2vw,20px)', color:'rgba(245,240,232,0.6)', lineHeight:1.8, marginBottom:24 }}>
            Your lead follow-up. Your bookings. Your customer service. Your content. Your CRM. Your reviews. Your reporting. Your internal workflows. Your phone. Your email sequences.
          </p>
          <p style={{ fontSize:'clamp(16px,2vw,20px)', color:'rgba(245,240,232,0.6)', lineHeight:1.8 }}>
            We build the agents that run each of these. We connect them to each other. We put a human in the loop for the decisions that need one. And then we hand you back your time.
          </p>
          <div style={{ marginTop:40 }}>
            <a href="/industries" style={{ display:'inline-block', background:'#00C896', color:'#050508', fontWeight:900, fontSize:14, padding:'16px 36px', textDecoration:'none', letterSpacing:'1px' }}>
              SEE YOUR INDUSTRY →
            </a>
          </div>
        </div>
      </section>

      {/* WHAT IS INCLUDED */}
      <section style={{ padding:'72px 5vw', maxWidth:1100, margin:'0 auto' }}>
        <div style={{ fontSize:11, letterSpacing:'2px', color:G, marginBottom:16 }}>WHAT IS INCLUDED IN FULL-SERVICE</div>
        <h2 style={{ fontSize:'clamp(24px,3.5vw,42px)', fontWeight:900, letterSpacing:'-1px', marginBottom:48 }}>
          <span style={{whiteSpace:'nowrap'}}>One engagement. <span style={{color:'#00C896'}}>Every digital operation covered.</span></span>
        </h2>
        <div className="biz-incl" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16 }}>
          {[
            { icon:'⚡', title:'Lead Response', body:'Every inbound inquiry responded to in under 90 seconds, qualified, and routed to your team.' },
            { icon:'🎧', title:'Customer Service', body:'AI handles 70-80% of customer interactions. Your team handles the ones that matter.' },
            { icon:'📅', title:'Scheduling', body:'Appointments booked, confirmed, reminded, and rescheduled automatically across all channels.' },
            { icon:'⭐', title:'Reputation', body:'Every review responded to. Happy customers prompted to leave reviews at the right moment.' },
            { icon:'📨', title:'Email & SMS', body:'Nurture sequences, re-engagement campaigns, and transactional messages all running automatically.' },
            { icon:'📱', title:'Content', body:'Consistent social media presence across every platform. Brand-accurate. Scheduled. Done.' },
            { icon:'🗄️', title:'CRM Automation', body:'Clean pipeline data, automated stage progression, and task creation without manual input.' },
            { icon:'📞', title:'Phone Receptionist', body:'Every call answered professionally, captured, and routed correctly around the clock.' },
            { icon:'⚙️', title:'Internal Operations', body:'The repetitive workflows that eat your team\'s time, automated and documented.' },
            { icon:'🔍', title:'Competitor Intel', body:'Weekly briefings on what your competition is doing across every channel they operate on.' },
            { icon:'📊', title:'Performance Reporting', body:'One weekly briefing with every KPI that matters. No dashboard-hunting required.' },
            { icon:'🎯', title:'Sales Funnel', body:'Full funnel from first touch to closed deal, connected, automated, and conversion-optimized.' },
          ].map(item => (
            <div key={item.title} style={{ background:'#111', border:'1px solid #1a1a1a', padding:'24px 20px' }}>
              <div style={{ fontSize:28, marginBottom:12 }}>{item.icon}</div>
              <div style={{ fontSize:15, fontWeight:800, color:'#F5F0E8', marginBottom:8 }}>{item.title}</div>
              <div style={{ fontSize:13, color:'rgba(245,240,232,0.5)', lineHeight:1.6 }}>{item.body}</div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ background:'#0D1A0D', borderTop:'1px solid #1a1a1a', padding:'72px 5vw' }}>
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          <div style={{ fontSize:11, letterSpacing:'2px', color:G, marginBottom:16 }}>THE PROCESS</div>
          <h2 style={{ fontSize:'clamp(24px,3.5vw,42px)', fontWeight:900, letterSpacing:'-1px', marginBottom:48 }}>From first call to fully automated in 30 days.</h2>
          <div className="biz-ops" style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16 }}>
            {[
              { step:'Week 1', title:'Operations Audit', body:'We map your entire business operations, every workflow, every tool, every gap. We show you exactly what we are building and why.' },
              { step:'Week 2', title:'Priority Build', body:'We deploy your top 3 highest-impact agents first. You start seeing results before the full build is complete.' },
              { step:'Week 3–4', title:'Full Deployment', body:'Remaining agents deployed. All systems connected. Human oversight layer configured. Testing and tuning complete.' },
              { step:'Ongoing', title:'Manage & Optimize', body:'Monthly performance reviews. Continuous optimization. New automations added as your business evolves. One team, permanently on your side.' },
            ].map(p => (
              <div key={p.step} style={{ background:'rgba(0,0,0,0.4)', border:'1px solid #1a1a1a', padding:'28px 24px' }}>
                <div style={{ fontSize:11, letterSpacing:'2px', color:G, marginBottom:12 }}>{p.step}</div>
                <div style={{ fontSize:17, fontWeight:800, color:'#F5F0E8', marginBottom:12 }}>{p.title}</div>
                <div style={{ fontSize:13, color:'rgba(245,240,232,0.5)', lineHeight:1.65 }}>{p.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING TIERS */}
      <section style={{ padding:'80px 5vw', maxWidth:1200, margin:'0 auto' }}>
        <div style={{ textAlign:'center', marginBottom:56 }}>
          <div style={{ fontSize:11, letterSpacing:'3px', color:G, marginBottom:16 }}>BUSINESS PACKAGES</div>
          <h2 style={{ fontSize:'clamp(30px,4vw,52px)', fontWeight:900, letterSpacing:'-1.5px', marginBottom:16 }}>
            Pick your level.<br/><span style={{color:G}}>Scale from there.</span>
          </h2>
          <p style={{ fontSize:17, color:'rgba(245,240,232,0.5)', maxWidth:600, margin:'0 auto', lineHeight:1.7 }}>
            Every plan starts with setup and agent training. You own the system from day one. Month-to-month, no contracts, no lock-in.
          </p>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))', gap:20, marginBottom:40 }}>
          {[
            { name:'Starter', price:799, color:G, badge:null, highlight:false,
              tagline:'Your first agents. Running fast.',
              agents:'3', training:'1 day included',
              desc:'Start automated. Discord channel active from day one. Portal during operating hours. Agents running 24/7. Second human agent available for +$499/mo.',
              items:['3 AI agents configured','1-2 core workflows automated','Dedicated Discord channel','Client portal during business hours','CRM integration + monthly report'],
            },
            { name:'Growth', price:1999, color:GOLD, badge:'MOST POPULAR', highlight:true,
              tagline:'Not replacing a person. Creating profit.',
              agents:'6', training:'2 days included',
              desc:'Complex enough that automation unlocks revenue, not just cuts cost. Brand strategist, monthly VC sessions, off-day messaging. Second human agent +$599/mo.',
              items:['6 agents across revenue and ops','Monthly brand strategy VC session','Discord + voice chat on demand','Portal hours + off-day messaging','Guaranteed growth-tier output'],
            },
            { name:'Full Ops', price:4999, color:G, badge:'9 AGENTS MAX', highlight:false,
              tagline:'Every operation. On autopilot. 24/7.',
              agents:'9', training:'3 days included',
              desc:'24/7 real humans, both sides of the world. 9 agents. Every workflow automated. Weekly strategy calls. No blackout windows. Second human agent +$999/mo.',
              items:['9 AI agents deployed','24/7 human team, global coverage','Weekly strategy VC calls','Unlimited optimization requests','Phone AI, competitor intel, full reporting'],
            },
          ].map((tier: any) => (
            <div key={tier.name} style={{ background: tier.highlight ? '#0D1F1A' : '#111', border:`2px solid ${tier.highlight ? GOLD : '#1a1a1a'}`, padding:'32px 26px', position:'relative' }}>
              {tier.badge && <div style={{ position:'absolute', top:-13, left:'50%', transform:'translateX(-50%)', background:GOLD, color:'#0A0A0A', fontWeight:900, fontSize:10, letterSpacing:'2px', padding:'4px 16px', whiteSpace:'nowrap' }}>{tier.badge}</div>}
              <div style={{ fontSize:11, letterSpacing:'2px', color:tier.color, marginBottom:8 }}>{tier.name.toUpperCase()}</div>
              <div style={{ fontSize:'clamp(38px,4vw,52px)', fontWeight:900, lineHeight:1 }}>${tier.price.toLocaleString()}<span style={{ fontSize:14, color:'rgba(245,240,232,0.3)', fontWeight:400 }}>/mo</span></div>
              <div style={{ fontSize:14, color:tier.color, fontWeight:700, margin:'10px 0 8px' }}>{tier.tagline}</div>
              <div style={{ fontSize:12, color:'rgba(245,240,232,0.4)', lineHeight:1.6, marginBottom:20, minHeight:48 }}>{tier.desc}</div>
              <div style={{ display:'flex', justifyContent:'space-between', padding:'12px 0', borderTop:'1px solid #1a1a1a', borderBottom:'1px solid #1a1a1a', marginBottom:20 }}>
                <div style={{ textAlign:'center' }}><div style={{ fontSize:22, fontWeight:900, color:tier.color }}>{tier.agents}</div><div style={{ fontSize:10, color:'rgba(245,240,232,0.35)' }}>Agents</div></div>
                <div style={{ textAlign:'center' }}><div style={{ fontSize:12, fontWeight:700, color:tier.color }}>{tier.training}</div><div style={{ fontSize:10, color:'rgba(245,240,232,0.35)' }}>Training</div></div>
              </div>
              <div style={{ marginBottom:24 }}>
                {(tier.items as string[]).map((item: string, i: number) => (
                  <div key={i} style={{ display:'flex', gap:8, marginBottom:7 }}>
                    <span style={{ color:tier.color, fontWeight:900, flexShrink:0, fontSize:11, marginTop:2 }}>✓</span>
                    <span style={{ fontSize:13, color:'rgba(245,240,232,0.65)', lineHeight:1.5 }}>{item}</span>
                  </div>
                ))}
              </div>
              <a href="/consultation" style={{ display:'block', textAlign:'center', background: tier.highlight ? GOLD : 'transparent', color: tier.highlight ? '#0A0A0A' : tier.color, border: tier.highlight ? 'none' : `2px solid ${tier.color}44`, fontWeight:900, fontSize:13, padding:'13px', textDecoration:'none', letterSpacing:'1px' }}>GET STARTED →</a>
            </div>
          ))}
        </div>
        <div style={{ textAlign:'center' }}>
          <p style={{ fontSize:12, color:'rgba(245,240,232,0.35)', marginBottom:12, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>In-house agent training: <strong style={{color:GOLD}}>$799/day</strong>, 2 to 5 days on average. Second human agent add-on: +$299 / +$599 / +$999 per month based on your tier. Discussed in first call.</p>
          <a href="/pricing" style={{ fontSize:14, color:G, textDecoration:'none', fontWeight:700 }}>View full pricing breakdown + FAQs →</a>
        </div>
      </section>

      <section style={{ background:'#0A0A0A', borderTop:'1px solid #1a1a1a', padding:'32px 5vw', display:'flex', justifyContent:'space-between', flexWrap:'wrap', gap:16, fontSize:12, color:'rgba(245,240,232,0.25)' }}>
        <a href="/" style={{color:'rgba(245,240,232,0.25)',textDecoration:'none'}}>VoiceOfCash</a>
        <div style={{display:'flex',gap:20}}>
          <a href="/services" style={{color:'rgba(245,240,232,0.25)',textDecoration:'none'}}>All Services</a>
          <a href="/consultation" style={{color:G,textDecoration:'none',fontWeight:700}}>Book a Call</a>
        </div>
        <div>© 2025 The Voice of Cash</div>
      </section>

      <VocFooter />
    </div>
  );
}
