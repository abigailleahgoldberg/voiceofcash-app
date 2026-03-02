import VocFooter from '../components/VocFooter';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'White Label AI Agent Services | Voice of Cash',
  description: 'Scale your agency with Voice of Cash. Offer AI agent services under your brand — fully built, deployed, and supported by us. Plans start at $999/month.',
  alternates: { canonical: 'https://www.thevoiceofcash.com/white-label' },
};

const G = '#00C896';
const GOLD = '#D4AF37';

export default function WhiteLabelPage() {
  const deliverables = [
    { icon:'🤖', title:'Agents Built Under Your Brand', body:'Every AI agent we build is delivered under your agency name. Your client never sees us. Your brand gets the credit. We do the work.' },
    { icon:'⚙️', title:'Full Deployment and Integration', body:'We configure, integrate, and deploy. CRM connections, workflow builds, communication channels — all set up and running before your client sees it.' },
    { icon:'📊', title:'Reporting in Your Colors', body:'Performance reports formatted with your logo and brand. Your clients get a professional monthly brief that looks like it came from you.' },
    { icon:'💬', title:'Support Backed by Our Team', body:'When your clients have questions, you have us. We are the infrastructure behind your client relationships — invisible and always available.' },
    { icon:'📈', title:'Margin Is Yours to Set', body:'We charge you the wholesale rate. You price it to your clients however makes sense for your market. The margin between is yours.' },
    { icon:'🔒', title:'Confidentiality by Default', body:'No co-branding, no client poaching, no visibility into your relationships. What is yours stays yours.' },
  ];

  const useCases = [
    { label:'Marketing Agencies', body:'Your clients are already asking about AI. Now you have an answer — and a team to back it up.' },
    { label:'Web and Tech Agencies', body:'Add AI agent services to your retainer stack without hiring a single AI specialist.' },
    { label:'Business Consultants', body:'Your clients trust your recommendations. Give them something worth recommending that actually performs.' },
    { label:'PR and Comms Firms', body:'Offer reputation management, content agents, and media monitoring as a premium add-on to existing clients.' },
    { label:'Staffing and HR Firms', body:'White label our hiring automation and onboarding systems. Your clients see faster results. You see stronger retention.' },
    { label:'Any Agency Ready to Scale', body:'If you have the client relationships and we have the infrastructure, we build it together.' },
  ];

  return (
    <div style={{ minHeight:'100vh', background:'#0A0A0A', color:'#F5F0E8', fontFamily:'system-ui,sans-serif' }}>
      <style>{`
        @media(max-width:860px){ .wl-grid{grid-template-columns:1fr 1fr!important} .wl-hero-grid{grid-template-columns:1fr!important} }
        @media(max-width:560px){ .wl-grid{grid-template-columns:1fr!important} }
      `}</style>

      {/* NAV */}
      <nav style={{ padding:'16px 5vw', borderBottom:'1px solid #1a1a1a', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:12 }}>
        <a href="/" style={{ fontWeight:900, fontSize:18, color:'#F5F0E8', textDecoration:'none' }}>Voice<span style={{color:G}}>OfCash</span></a>
        <div style={{display:'flex',gap:16,alignItems:'center'}}>
          <a href="/services" style={{fontSize:13,color:'rgba(245,240,232,0.4)',textDecoration:'none'}}>Services</a>
          <a href="/pricing" style={{fontSize:13,color:'rgba(245,240,232,0.4)',textDecoration:'none'}}>Pricing</a>
          <a href="/consultation" style={{ background:G, color:'#0A0A0A', fontWeight:800, fontSize:13, padding:'10px 24px', textDecoration:'none' }}>BOOK FREE CALL →</a>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ padding:'80px 5vw 0', maxWidth:1200, margin:'0 auto' }}>
        <div className="wl-hero-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:64, alignItems:'center', paddingBottom:80, borderBottom:'1px solid #1a1a1a' }}>
          <div>
            <div style={{ fontSize:11, letterSpacing:'3px', color:G, marginBottom:20 }}>WHITE LABEL SERVICES</div>
            <h1 style={{ fontSize:'clamp(36px,5vw,68px)', fontWeight:900, lineHeight:0.95, letterSpacing:'-2px', marginBottom:24 }}>
              Scale your agency<br/>with the<br/><span style={{color:G}}>Voice of Cash.</span>
            </h1>
            <p style={{ fontSize:'clamp(15px,1.8vw,19px)', color:'rgba(245,240,232,0.55)', lineHeight:1.75, maxWidth:520, marginBottom:32 }}>
              You bring the client relationships. We build the AI infrastructure behind them — under your name, on your timeline, to your standard. Your agency grows. Your clients get results. We stay invisible.
            </p>
            <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
              <a href="/consultation" style={{ background:G, color:'#0A0A0A', fontWeight:900, fontSize:15, padding:'16px 36px', textDecoration:'none', letterSpacing:'0.5px' }}>BOOK A PARTNER CALL →</a>
              <a href="#how-it-works" style={{ background:'transparent', color:'#F5F0E8', fontWeight:800, fontSize:15, padding:'14px 32px', border:'2px solid rgba(245,240,232,0.2)', textDecoration:'none' }}>How It Works</a>
            </div>
          </div>
          <div style={{ background:'#0D1A0D', border:`1px solid ${G}22`, padding:'40px 36px' }}>
            <div style={{ fontSize:10, letterSpacing:'2px', color:G, marginBottom:20 }}>WHITE LABEL PLANS</div>
            <div style={{ fontSize:11, color:'rgba(245,240,232,0.35)', marginBottom:12 }}>Starting at</div>
            <div style={{ fontSize:'clamp(52px,6vw,80px)', fontWeight:900, lineHeight:1, color:'#F5F0E8', marginBottom:4 }}>
              $999<span style={{ fontSize:18, fontWeight:400, color:'rgba(245,240,232,0.3)' }}>/mo</span>
            </div>
            <div style={{ fontSize:14, color:G, fontWeight:700, marginBottom:24 }}>Scale as your client base grows.</div>
            <div style={{ borderTop:'1px solid #1a1a1a', paddingTop:24, display:'flex', flexDirection:'column', gap:12 }}>
              {[
                'AI agents built and deployed under your brand',
                'Client reporting in your colors',
                'Dedicated partner support',
                'No client visibility into our involvement',
                'You set the margin — we set the floor',
                'Month-to-month, no lock-in',
              ].map((item,i) => (
                <div key={i} style={{ display:'flex', gap:10, alignItems:'flex-start' }}>
                  <span style={{ color:G, fontWeight:900, flexShrink:0, fontSize:12, marginTop:2 }}>✓</span>
                  <span style={{ fontSize:13, color:'rgba(245,240,232,0.7)', lineHeight:1.5 }}>{item}</span>
                </div>
              ))}
            </div>
            <a href="/consultation" style={{ display:'block', textAlign:'center', background:G, color:'#0A0A0A', fontWeight:900, fontSize:14, padding:'16px', textDecoration:'none', letterSpacing:'1px', marginTop:28 }}>
              BECOME A PARTNER →
            </a>
          </div>
        </div>
      </section>

      {/* WHO THIS IS FOR */}
      <section style={{ padding:'80px 5vw', maxWidth:1200, margin:'0 auto' }}>
        <div style={{ fontSize:11, letterSpacing:'3px', color:G, marginBottom:16 }}>WHO THIS IS FOR</div>
        <h2 style={{ fontSize:'clamp(26px,3.5vw,48px)', fontWeight:900, letterSpacing:'-1.5px', marginBottom:48 }}>
          Built for agencies that want<br/><span style={{color:G}}>AI as a revenue line, not a headache.</span>
        </h2>
        <div className="wl-grid" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16 }}>
          {useCases.map(u => (
            <div key={u.label} style={{ background:'#111', border:'1px solid #1a1a1a', padding:'28px 24px' }}>
              <div style={{ fontWeight:900, fontSize:15, color:'#F5F0E8', marginBottom:10 }}>{u.label}</div>
              <div style={{ fontSize:13, color:'rgba(245,240,232,0.5)', lineHeight:1.7 }}>{u.body}</div>
            </div>
          ))}
        </div>
      </section>

      {/* WHAT YOU GET */}
      <section style={{ background:'#0D1A0D', borderTop:'1px solid #1a1a1a', borderBottom:'1px solid #1a1a1a', padding:'80px 5vw' }}>
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          <div style={{ fontSize:11, letterSpacing:'3px', color:G, marginBottom:16 }}>WHAT YOU GET</div>
          <h2 style={{ fontSize:'clamp(26px,3.5vw,48px)', fontWeight:900, letterSpacing:'-1.5px', marginBottom:12 }}>
            Everything your clients see is yours.<br/><span style={{color:G}}>Everything behind it is ours.</span>
          </h2>
          <p style={{ fontSize:16, color:'rgba(245,240,232,0.45)', maxWidth:640, marginBottom:56, lineHeight:1.7 }}>
            We are the infrastructure. You are the agency. That division is clean, protected, and designed to make your relationships stronger — not dependent on ours.
          </p>
          <div className="wl-grid" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:20 }}>
            {deliverables.map(d => (
              <div key={d.title} style={{ background:'rgba(0,0,0,0.35)', border:'1px solid #1a1a1a', padding:'28px 24px' }}>
                <div style={{ fontSize:28, marginBottom:16 }}>{d.icon}</div>
                <div style={{ fontWeight:900, fontSize:15, color:'#F5F0E8', marginBottom:10 }}>{d.title}</div>
                <div style={{ fontSize:13, color:'rgba(245,240,232,0.55)', lineHeight:1.7 }}>{d.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" style={{ padding:'80px 5vw', maxWidth:1100, margin:'0 auto' }}>
        <div style={{ fontSize:11, letterSpacing:'3px', color:G, marginBottom:16 }}>HOW IT WORKS</div>
        <h2 style={{ fontSize:'clamp(26px,3.5vw,44px)', fontWeight:900, letterSpacing:'-1.5px', marginBottom:48 }}>
          Simple. Clean. Scalable.
        </h2>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))', gap:0 }}>
          {[
            { step:'01', title:'You bring the client', body:'You close the deal, set the scope, and tell us what the client needs. We never speak to your client directly unless you explicitly want us to.' },
            { step:'02', title:'We build the system', body:'Our team configures and deploys the AI agents, integrates with the client\'s existing tools, and tests everything before delivery.' },
            { step:'03', title:'You deliver the result', body:'You present the work under your brand. Your client sees a polished, professional system that reflects your agency\'s capabilities.' },
            { step:'04', title:'We support ongoing', body:'We handle the backend optimization and support. You maintain the client relationship. Everything runs month-to-month from there.' },
          ].map((p,i) => (
            <div key={p.step} style={{ padding:'32px 28px', borderRight:'1px solid #1a1a1a', borderBottom:'1px solid #1a1a1a' }}>
              <div style={{ fontFamily:'monospace', fontSize:11, color:'rgba(245,240,232,0.25)', letterSpacing:'2px', marginBottom:16 }}>{p.step}</div>
              <div style={{ fontWeight:900, fontSize:16, color:'#F5F0E8', marginBottom:12 }}>{p.title}</div>
              <div style={{ fontSize:13, color:'rgba(245,240,232,0.5)', lineHeight:1.7 }}>{p.body}</div>
            </div>
          ))}
        </div>
      </section>

      {/* THE MATH */}
      <section style={{ background:'#111', border:'1px solid #1a1a1a', margin:'0 5vw 80px', padding:'52px 48px', maxWidth:1100, marginLeft:'auto', marginRight:'auto' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:48, alignItems:'center' }}>
          <div>
            <div style={{ fontSize:11, letterSpacing:'3px', color:GOLD, marginBottom:16 }}>THE MATH IS SIMPLE</div>
            <h3 style={{ fontSize:'clamp(22px,3vw,38px)', fontWeight:900, letterSpacing:'-1px', marginBottom:16 }}>
              You pay wholesale.<br/>You bill retail.<br/><span style={{color:G}}>The margin is yours.</span>
            </h3>
            <p style={{ fontSize:15, color:'rgba(245,240,232,0.5)', lineHeight:1.75 }}>
              Our white label plans start at $999/month per client engagement. Most agencies bill their clients anywhere from $1,500 to $5,000 for the same work. You own that spread. We do not cap it, we do not share in it, and we do not ask about it.
            </p>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
            {[
              { label:'You pay us', value:'from $999/mo', color:'rgba(245,240,232,0.6)' },
              { label:'You bill your client', value:'you decide', color:GOLD },
              { label:'Your margin', value:'entirely yours', color:G },
            ].map(row => (
              <div key={row.label} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'18px 24px', background:'rgba(0,0,0,0.4)', border:'1px solid #1a1a1a' }}>
                <span style={{ fontSize:13, color:'rgba(245,240,232,0.45)', fontWeight:600 }}>{row.label}</span>
                <span style={{ fontSize:16, fontWeight:900, color:row.color }}>{row.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding:'0 5vw 80px', maxWidth:860, margin:'0 auto' }}>
        <div style={{ fontSize:11, letterSpacing:'3px', color:G, marginBottom:16 }}>STRAIGHT ANSWERS</div>
        <h2 style={{ fontSize:'clamp(22px,3vw,38px)', fontWeight:900, letterSpacing:'-1px', marginBottom:40 }}>Questions partners ask us first.</h2>
        {[
          { q:'Will my clients ever know Voice of Cash is involved?', a:'Not unless you want them to. We operate fully behind your brand. All deliverables, reports, and communications go through you. Our name does not appear anywhere the client sees.' },
          { q:'What services can I offer under white label?', a:'Any service in our catalog — lead response agents, customer service agents, CRM automation, reputation management, content agents, SEO, reporting dashboards, and more. If we build it, you can sell it.' },
          { q:'How do we handle scope and delivery?', a:'You scope the engagement with your client. You relay the specs to us. We build it, deliver it to you, and you present it. Communication flows through the agency relationship, not around it.' },
          { q:'What if my client needs support after delivery?', a:'We handle the technical backend. You handle the client relationship. If something needs attention, you flag it to us. Your client never gets bounced to a third party they were not expecting.' },
          { q:'Is there a minimum commitment?', a:'Plans start at $999/month per engagement. Month-to-month — same as all our plans. The floor exists because quality requires infrastructure. There is no ceiling.' },
        ].map((faq,i) => (
          <div key={i} style={{ borderBottom:'1px solid #1a1a1a', padding:'24px 0' }}>
            <div style={{ fontSize:16, fontWeight:800, color:'#F5F0E8', marginBottom:10 }}>{faq.q}</div>
            <div style={{ fontSize:14, color:'rgba(245,240,232,0.6)', lineHeight:1.75 }}>{faq.a}</div>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section style={{ background:'#0D1A0D', borderTop:`1px solid ${G}22`, padding:'80px 5vw', textAlign:'center' }}>
        <div style={{ fontSize:11, letterSpacing:'3px', color:G, marginBottom:20 }}>READY TO PARTNER</div>
        <h2 style={{ fontSize:'clamp(28px,4.5vw,56px)', fontWeight:900, letterSpacing:'-2px', marginBottom:20 }}>
          Scale your agency.<br/><span style={{color:G}}>We handle the infrastructure.</span>
        </h2>
        <p style={{ fontSize:17, color:'rgba(245,240,232,0.5)', maxWidth:560, margin:'0 auto 36px', lineHeight:1.7 }}>
          One call. We walk through how white label works, what your first client engagement looks like, and what the numbers look like on your end. Plans start at $999/month.
        </p>
        <a href="/consultation" style={{ display:'inline-block', background:G, color:'#0A0A0A', fontWeight:900, fontSize:17, padding:'20px 56px', textDecoration:'none', letterSpacing:'0.5px', marginBottom:16 }}>
          BOOK A PARTNER CALL →
        </a>
        <br/><span style={{ fontSize:13, color:'rgba(245,240,232,0.25)', display:'inline-block', marginTop:8 }}>Free. 30 minutes. No obligation. Just the conversation.</span>
      </section>

      <VocFooter />
    </div>
  );
}
