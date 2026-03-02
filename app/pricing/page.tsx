import VocFooter from '../components/VocFooter';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing, AI Agent Services | Voice of Cash',
  description: 'Transparent AI agent pricing. Three plans starting at $999/mo. 3, 6, or 9 agents. Human skills agent add-on available. No contracts. No guesswork.',
  alternates: { canonical: 'https://www.thevoiceofcash.com/pricing' },
};

const G = '#00C896';
const GOLD = '#D4AF37';

export default function PricingPage() {
  const tiers = [
    {
      name: 'Starter',
      price: 999,
      badge: null,
      highlight: false,
      tagline: 'Your first agents. Running fast.',
      forWho: 'For businesses ready to start real automation and prove the model before scaling it.',
      color: G,
      agents: 3,
      support: 'Business hours, up to 5 days/week',
      portal: 'During operating hours',
      discord: 'Dedicated Discord channel',
      training: '1 day included',
      humanAddOn: '+$499/mo',
      includes: [
        '3 AI agents configured to your business',
        '1-2 core workflows automated',
        'Dedicated Discord channel',
        'Client portal during business hours',
        'CRM integration',
        'Monthly performance report',
        '1 optimization session/month',
      ],
      cta: 'START WITH STARTER →',
    },
    {
      name: 'Growth',
      price: 3999,
      badge: 'MOST POPULAR',
      highlight: true,
      tagline: 'Not replacing a person. Creating profit.',
      forWho: 'Complex enough that automation unlocks revenue, not just reduces cost. Comes with a brand strategist and VC sessions.',
      color: GOLD,
      agents: 6,
      support: 'Business hours + off-day messaging',
      portal: 'Hours + off-day access',
      discord: 'Discord + VC on request',
      training: '2 days included',
      humanAddOn: '+$999/mo',
      includes: [
        '6 AI agents across revenue and operations',
        '3 workflows fully automated',
        'Discord with voice chat on demand',
        'Monthly brand strategy VC session',
        'Portal during hours + off-day messaging',
        'Guaranteed growth-tier token output',
        'CRM build or optimization',
        'Reputation and content agents',
      ],
      cta: 'GET GROWTH →',
    },
    {
      name: 'Full Ops',
      price: 7999,
      badge: 'COMPLETE SOLUTION',
      highlight: false,
      tagline: 'Every operation. On autopilot. 24/7.',
      forWho: 'For businesses doing or capable of doing serious volume. Real humans, both sides of the world, every day.',
      color: G,
      agents: 9,
      support: '24/7, real humans, 7 days',
      portal: '24/7, no blackout windows',
      discord: 'Discord + priority VC weekly',
      training: '3 days included',
      humanAddOn: '+$1,999/mo',
      includes: [
        '9 AI agents across all operations',
        'Every core workflow automated',
        '24/7 human team, global coverage',
        'Weekly strategy VC calls',
        'Unlimited optimization requests',
        'AI phone receptionist',
        'Competitor intelligence monitoring',
        'Full CRM build and automation',
      ],
      cta: 'GO FULL OPS →',
    },
  ];

  return (
    <div style={{ minHeight:'100vh', background:'#0A0A0A', color:'#F5F0E8', fontFamily:'system-ui,sans-serif' }}>
      <style>{`
        @media(max-width:860px){ .tier-grid{grid-template-columns:1fr!important} }
        @media(max-width:640px){ .compare-table td,.compare-table th{font-size:11px!important;padding:10px 8px!important} }
      `}</style>

      <nav style={{ padding:'16px 5vw', borderBottom:'1px solid #1a1a1a', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:12 }}>
        <a href="/" style={{ fontWeight:900, fontSize:18, color:'#F5F0E8', textDecoration:'none' }}>Voice<span style={{color:G}}>OfCash</span></a>
        <div style={{display:'flex',gap:16,alignItems:'center'}}>
          <a href="/services" style={{fontSize:13,color:'rgba(245,240,232,0.4)',textDecoration:'none'}}>Services</a>
          <a href="/business" style={{fontSize:13,color:'rgba(245,240,232,0.4)',textDecoration:'none'}}>Full-Service</a>
          <a href="/consultation" style={{ background:G, color:'#0A0A0A', fontWeight:800, fontSize:13, padding:'10px 24px', textDecoration:'none' }}>BOOK FREE CALL →</a>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ padding:'80px 5vw 56px', maxWidth:860, margin:'0 auto', textAlign:'center' }}>
        <div style={{ fontSize:11, letterSpacing:'3px', color:G, marginBottom:16 }}>TRANSPARENT PRICING</div>
        <h1 style={{ fontSize:'clamp(34px,5vw,62px)', fontWeight:900, lineHeight:1.0, letterSpacing:'-2px', marginBottom:20 }}>
          Three plans.<br/><span style={{color:G}}>Real numbers. No surprises.</span>
        </h1>
        <p style={{ fontSize:'clamp(15px,1.8vw,19px)', color:'rgba(245,240,232,0.55)', lineHeight:1.75, maxWidth:620, margin:'0 auto 16px' }}>
          3, 6, or 9 agents. Month-to-month. Your setup is included. If your job requires two human skills agents after we talk, there is a straightforward add-on for that.
        </p>
        <p style={{ fontSize:13, color:'rgba(245,240,232,0.3)' }}>
          Training included days vary by tier. If additional days are needed beyond what is included, they are billed at <strong style={{color:GOLD}}>$799/day</strong>. This is rare, most businesses are fully trained within the included days.
        </p>
      </section>

      {/* TIER CARDS */}
      <section style={{ padding:'0 5vw 48px', maxWidth:1100, margin:'0 auto' }}>
        <div className="tier-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:20 }}>
          {tiers.map(tier => (
            <div key={tier.name} style={{
              background: tier.highlight ? '#0D1F1A' : '#111',
              border: `2px solid ${tier.highlight ? GOLD : '#1e1e1e'}`,
              padding:'32px 26px', position:'relative', display:'flex', flexDirection:'column',
            }}>
              {tier.badge && (
                <div style={{ position:'absolute', top:-13, left:'50%', transform:'translateX(-50%)', background: tier.highlight ? GOLD : '#111', color: tier.highlight ? '#0A0A0A' : tier.color, fontWeight:900, fontSize:9, letterSpacing:'2px', padding:'4px 16px', whiteSpace:'nowrap', border: tier.highlight ? 'none' : `1px solid ${tier.color}44` }}>{tier.badge}</div>
              )}
              <div style={{ fontSize:10, letterSpacing:'2px', color:tier.color, marginBottom:8 }}>{tier.name.toUpperCase()}</div>
              <div style={{ fontSize:'clamp(40px,4vw,56px)', fontWeight:900, lineHeight:1 }}>
                ${tier.price.toLocaleString()}<span style={{ fontSize:13, fontWeight:400, color:'rgba(245,240,232,0.3)' }}>/mo</span>
              </div>
              <div style={{ fontSize:13, color:tier.color, fontWeight:700, margin:'10px 0 6px' }}>{tier.tagline}</div>
              <p style={{ fontSize:12, color:'rgba(245,240,232,0.4)', lineHeight:1.6, marginBottom:22 }}>{tier.forWho}</p>

              {/* Quick specs */}
              <div style={{ background:'rgba(0,0,0,0.35)', border:'1px solid #1a1a1a', padding:'14px', marginBottom:22, display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
                <div style={{ textAlign:'center' }}>
                  <div style={{ fontSize:28, fontWeight:900, color:tier.color }}>{tier.agents}</div>
                  <div style={{ fontSize:10, color:'rgba(245,240,232,0.35)' }}>AI Agents</div>
                </div>
                <div style={{ textAlign:'center' }}>
                  <div style={{ fontSize:12, fontWeight:700, color:tier.color }}>{tier.training}</div>
                  <div style={{ fontSize:10, color:'rgba(245,240,232,0.35)' }}>Training</div>
                </div>
                <div style={{ gridColumn:'1/-1', borderTop:'1px solid #1a1a1a', paddingTop:10 }}>
                  <div style={{ fontSize:10, color:'rgba(245,240,232,0.3)', marginBottom:4 }}>2ND HUMAN AGENT ADD-ON</div>
                  <div style={{ fontSize:13, fontWeight:800, color:GOLD }}>{tier.humanAddOn}</div>
                </div>
              </div>

              <div style={{ marginBottom:24, flexGrow:1 }}>
                {tier.includes.map((item, i) => (
                  <div key={i} style={{ display:'flex', gap:8, marginBottom:7 }}>
                    <span style={{ color:tier.color, fontWeight:900, flexShrink:0, fontSize:11, marginTop:2 }}>✓</span>
                    <span style={{ fontSize:12, color:'rgba(245,240,232,0.65)', lineHeight:1.5 }}>{item}</span>
                  </div>
                ))}
              </div>

              <a href="/consultation" style={{
                display:'block', textAlign:'center',
                background: tier.highlight ? GOLD : 'transparent',
                color: tier.highlight ? '#0A0A0A' : tier.color,
                border: tier.highlight ? 'none' : `2px solid ${tier.color}44`,
                fontWeight:900, fontSize:13, padding:'14px',
                textDecoration:'none', letterSpacing:'1px',
              }}>{tier.cta}</a>
            </div>
          ))}
        </div>
      </section>

      {/* HUMAN AGENT ADD-ON CALLOUT */}
      <section style={{ padding:'0 5vw 72px', maxWidth:1100, margin:'0 auto' }}>
        <div style={{ background:'#0D1A0D', border:`1px solid ${GOLD}33`, padding:'32px 40px', display:'grid', gridTemplateColumns:'1fr auto', gap:32, alignItems:'center' }}>
          <div>
            <div style={{ fontSize:10, letterSpacing:'2px', color:GOLD, marginBottom:10 }}>HUMAN SKILLS AGENT ADD-ON</div>
            <h3 style={{ fontSize:'clamp(18px,2.5vw,28px)', fontWeight:900, letterSpacing:'-0.5px', marginBottom:12 }}>
              Some jobs need two human agents on it.<br/>We are upfront about when that is.
            </h3>
            <p style={{ fontSize:14, color:'rgba(245,240,232,0.55)', lineHeight:1.75, maxWidth:640 }}>
              After we evaluate your operation, if the scope genuinely requires a second human skills agent to deliver the results we promise, we add one. The fee is straightforward based on your tier: <strong style={{color:GOLD}}>+$499</strong> on Starter, <strong style={{color:GOLD}}>+$999</strong> on Growth, <strong style={{color:GOLD}}>+$1,999</strong> on Full Ops. We do not add this unless it is actually needed. That conversation happens in your first call.
            </p>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:12, minWidth:160, textAlign:'center' }}>
            {[['Starter','+$499'],['Growth','+$999'],['Full Ops','+$1,999']].map(([plan,price]) => (
              <div key={plan} style={{ background:'rgba(0,0,0,0.4)', border:'1px solid #1a1a1a', padding:'12px 20px' }}>
                <div style={{ fontSize:10, color:'rgba(245,240,232,0.35)', letterSpacing:'1px' }}>{plan.toUpperCase()}</div>
                <div style={{ fontSize:18, fontWeight:900, color:GOLD }}>{price}<span style={{fontSize:11,fontWeight:400,color:'rgba(245,240,232,0.3)'}}>/mo</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRAINING ADD-ON */}
      <section style={{ padding:'0 5vw 72px', maxWidth:1100, margin:'0 auto' }}>
        <div style={{ background:'#111', border:'1px solid #1e1e1e', padding:'28px 40px', display:'flex', flexDirection:'column', gap:12 }}>
          <div style={{ fontSize:10, letterSpacing:'2px', color:GOLD, marginBottom:4 }}>ADDITIONAL TRAINING DAYS, RARE, BUT WORTH KNOWING</div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr auto', gap:24, alignItems:'center' }}>
            <div>
              <h3 style={{ fontSize:'clamp(16px,2vw,22px)', fontWeight:900, marginBottom:10 }}>
                Extra training days if your team needs them: <span style={{color:GOLD}}>$799/day</span>
              </h3>
              <p style={{ fontSize:14, color:'rgba(245,240,232,0.55)', lineHeight:1.75, maxWidth:680 }}>
                Every plan includes training days based on your tier. Most businesses are fully operational within those included days. In cases where your team is larger, your workflows are more complex, or your staff needs additional time to get comfortable alongside the agents, we add training days at $799/day. No padding, no minimum. We bill for the days you actually need. This comes up on fewer than 1 in 5 engagements, but we would rather you know upfront than be surprised.
              </p>
            </div>
            <div style={{ textAlign:'center', minWidth:140, background:'rgba(0,0,0,0.4)', border:`1px solid ${GOLD}33`, padding:'20px 24px' }}>
              <div style={{ fontSize:11, color:'rgba(245,240,232,0.35)', letterSpacing:'1px', marginBottom:8 }}>ADD-ON RATE</div>
              <div style={{ fontSize:32, fontWeight:900, color:GOLD }}>$799</div>
              <div style={{ fontSize:11, color:'rgba(245,240,232,0.35)' }}>per additional day</div>
            </div>
          </div>
          <div style={{ display:'flex', gap:32, paddingTop:16, borderTop:'1px solid #1a1a1a', flexWrap:'wrap' }}>
            {[
              ['When it applies','Larger teams, complex multi-department workflows, or staff who need extra hands-on time with the agents'],
              ['How common','Fewer than 1 in 5 engagements, included days cover the vast majority of clients'],
              ['How it works','Discussed and agreed on during setup, before any additional days are scheduled. Never added without your sign-off'],
            ].map(([label, val]) => (
              <div key={label} style={{ minWidth:200 }}>
                <div style={{ fontSize:10, letterSpacing:'1.5px', color:'rgba(245,240,232,0.3)', marginBottom:6 }}>{label.toUpperCase()}</div>
                <div style={{ fontSize:13, color:'rgba(245,240,232,0.6)', lineHeight:1.6 }}>{val}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ background:'#0D1A0D', borderTop:'1px solid #1a1a1a', borderBottom:'1px solid #1a1a1a', padding:'72px 5vw' }}>
        <div style={{ maxWidth:1000, margin:'0 auto' }}>
          <div style={{ fontSize:11, letterSpacing:'3px', color:G, marginBottom:16 }}>BEFORE MONTH ONE</div>
          <h2 style={{ fontSize:'clamp(22px,3vw,40px)', fontWeight:900, letterSpacing:'-1px', marginBottom:12 }}>Setup and training. Then the clock starts.</h2>
          <p style={{ fontSize:15, color:'rgba(245,240,232,0.5)', maxWidth:620, marginBottom:48, lineHeight:1.7 }}>
            We do not start the monthly fee until your agents are live, your team knows how to work with them, and everything is performing.
          </p>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))', gap:20 }}>
            {[
              { step:'Step 1', title:'Agent Configuration', price:'Included in setup', color:G, body:'We scope your workflows, configure every agent to your business, and integrate your stack. Not a template. Your actual operation.' },
              { step:'Step 2', title:'In-House Training', price:'$799/day, 2–5 days avg', color:GOLD, body:'Your team learns to work alongside the agents, when to override, how to escalate, what to monitor. We bill for the days you actually need.' },
              { step:'Step 3', title:'Monthly Ops Begin', price:'$999 / $3,999 / $7,999', color:G, body:'Agents live. Discord active. Portal open. We monitor, optimize, and improve continuously. The system gets better the longer it runs.' },
            ].map(p => (
              <div key={p.step} style={{ background:'rgba(0,0,0,0.4)', border:'1px solid #1a1a1a', padding:'26px 22px' }}>
                <div style={{ fontSize:10, letterSpacing:'2px', color:'rgba(245,240,232,0.3)', marginBottom:8 }}>{p.step}</div>
                <div style={{ fontSize:17, fontWeight:800, color:'#F5F0E8', marginBottom:4 }}>{p.title}</div>
                <div style={{ fontSize:12, fontWeight:700, color:p.color, marginBottom:12 }}>{p.price}</div>
                <p style={{ fontSize:13, color:'rgba(245,240,232,0.5)', lineHeight:1.65 }}>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARE */}
      <section style={{ padding:'72px 5vw', maxWidth:960, margin:'0 auto' }}>
        <div style={{ fontSize:11, letterSpacing:'3px', color:G, marginBottom:16 }}>SIDE BY SIDE</div>
        <h2 style={{ fontSize:'clamp(20px,2.8vw,36px)', fontWeight:900, letterSpacing:'-1px', marginBottom:36 }}>What changes as you scale.</h2>
        <div style={{ overflowX:'auto' }}>
          <table className="compare-table" style={{ width:'100%', borderCollapse:'collapse', fontSize:13 }}>
            <thead>
              <tr>
                {['', 'Starter, $999', 'Growth, $3,999', 'Full Ops, $7,999'].map((h,i) => (
                  <th key={i} style={{ padding:'12px 16px', textAlign: i===0 ? 'left' : 'center', fontSize:11, fontWeight:800, color: i===2 ? GOLD : i===0 ? 'rgba(245,240,232,0.4)' : G, letterSpacing:'0.5px', borderBottom:'1px solid #1a1a1a', whiteSpace:'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['AI Agents','3','6','9'],
                ['Discord Channel','✓','✓','✓'],
                ['Voice Chat',', ','On request','Weekly'],
                ['Brand Strategist',', ','Monthly VC','Weekly VC'],
                ['Portal Access','Business hours','Hours + off-day','24/7'],
                ['Human Support','Async, biz days','Hours + off-day msg','24/7 global'],
                ['2nd Human Agent','+ $499/mo','+ $999/mo','+ $1,999/mo'],
                ['Training Included','1 day','2 days','3 days'],
              ].map((row,ri) => (
                <tr key={ri} style={{ borderBottom:'1px solid #0f0f0f', background: ri%2===0 ? 'transparent' : 'rgba(255,255,255,0.01)' }}>
                  {row.map((cell,ci) => (
                    <td key={ci} style={{ padding:'13px 16px', textAlign: ci===0 ? 'left' : 'center', color: ci===0 ? 'rgba(245,240,232,0.45)' : cell===', ' ? 'rgba(245,240,232,0.15)' : cell.startsWith('✓') ? G : cell.startsWith('+') ? GOLD : 'rgba(245,240,232,0.7)', fontWeight: ci===0 ? 600 : 400 }}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding:'0 5vw 72px', maxWidth:820, margin:'0 auto' }}>
        <div style={{ fontSize:11, letterSpacing:'3px', color:G, marginBottom:16 }}>STRAIGHT ANSWERS</div>
        <h2 style={{ fontSize:'clamp(20px,2.8vw,36px)', fontWeight:900, letterSpacing:'-1px', marginBottom:36 }}>The questions you are already asking.</h2>
        {[
          { q:'What does it actually cost to get started?',
            a:'Setup plus training plus month one. Starter: setup typically $1,500 to $2,500, 1 training day included, then $999/month. Full Ops: $3,500 to $6,000 in setup and training, then $7,999/month. Book the call and we give you an exact number for your specific business.' },
          { q:'When does the second human agent add-on apply?',
            a:'After we evaluate your operation. If the complexity or volume of your job genuinely requires two human agents to deliver results, we tell you that in the first call and add the fee. Starter is +$499, Growth is +$999, Full Ops is +$1,999 per month. We do not add it to pad the bill.' },
          { q:'Why is 9 the maximum agent count?',
            a:'Because quality over quantity. Nine well-trained, properly integrated agents covering your real workflows outperforms fifteen loosely configured ones every time. If your operation needs more than nine, we evaluate it as a custom scope engagement.' },
          { q:'Are there contracts?',
            a:'No. Month-to-month on all plans. The only upfront cost is setup and training, which we both need to make the system worth running.' },
          { q:'What does the Discord channel actually look like?',
            a:'A dedicated server channel for your business. Your team has it. Our team has it. Updates, reports, agent status, questions, optimization requests all go through it. Growth and above includes VC access, so you can request a video call with your strategist directly from Discord.' },
        ].map((faq, i) => (
          <div key={i} style={{ borderBottom:'1px solid #1a1a1a', padding:'22px 0' }}>
            <div style={{ fontSize:16, fontWeight:800, color:'#F5F0E8', marginBottom:10 }}>{faq.q}</div>
            <div style={{ fontSize:14, color:'rgba(245,240,232,0.6)', lineHeight:1.75 }}>{faq.a}</div>
          </div>
        ))}
      </section>

      <section style={{ background:'#0D1A0D', borderTop:`1px solid ${G}22`, padding:'72px 5vw', textAlign:'center' }}>
        <div style={{ fontSize:11, letterSpacing:'3px', color:G, marginBottom:20 }}>BOOK THE CALL</div>
        <h2 style={{ fontSize:'clamp(24px,4vw,48px)', fontWeight:900, letterSpacing:'-1.5px', marginBottom:20 }}>
          30 minutes.<br/><span style={{color:G}}>We tell you exactly what you need.</span>
        </h2>
        <p style={{ fontSize:16, color:'rgba(245,240,232,0.5)', maxWidth:520, margin:'0 auto 32px', lineHeight:1.7 }}>
          We know in the first 10 minutes what your business needs and whether we can deliver it. You leave with a clear plan and an exact number.
        </p>
        <a href="/consultation" style={{ display:'inline-block', background:G, color:'#0A0A0A', fontWeight:900, fontSize:16, padding:'18px 48px', textDecoration:'none', letterSpacing:'0.5px' }}>BOOK FREE STRATEGY CALL →</a>
        <br/><span style={{ fontSize:12, color:'rgba(245,240,232,0.25)', display:'inline-block', marginTop:12 }}>Free. No commitment. No pitch deck. Just the plan.</span>
      </section>

      <VocFooter />
    </div>
  );
}
