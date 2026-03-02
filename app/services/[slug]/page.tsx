import VocFooter from '../../components/VocFooter';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { services, getServiceBySlug } from '../data';

export async function generateStaticParams() {
  return services.map(s => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = getServiceBySlug(slug);
  if (!s) return {};
  return {
    title: s.seoTitle,
    description: s.seoDescription,
    alternates: { canonical: `https://www.thevoiceofcash.com/services/${slug}` },
  };
}

const G = '#00C896';
const GOLD = '#D4AF37';

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = getServiceBySlug(slug);
  if (!s) notFound();

  return (
    <div style={{ minHeight:'100vh', background:'#0A0A0A', color:'#F5F0E8', fontFamily:'system-ui,sans-serif' }}>
      <style>{`
        @media(max-width:768px){.svc-hero{grid-template-columns:1fr!important}.svc-process{grid-template-columns:1fr 1fr!important}.svc-results{grid-template-columns:1fr 1fr!important}}
        @media(max-width:480px){.svc-process{grid-template-columns:1fr!important}.svc-results{grid-template-columns:1fr 1fr!important}}
      `}</style>
      <nav style={{ padding:'16px 5vw', borderBottom:'1px solid #1a1a1a', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:12 }}>
        <a href="/" style={{ fontWeight:900, fontSize:18, color:'#F5F0E8', textDecoration:'none' }}>Voice<span style={{color:G}}>OfCash</span></a>
        <div style={{display:'flex',gap:16,alignItems:'center'}}>
          <a href="/services" style={{fontSize:13,color:'rgba(245,240,232,0.4)',textDecoration:'none'}}>← All Services</a>
          <a href="/consultation" style={{ background:G, color:'#0A0A0A', fontWeight:800, fontSize:13, padding:'10px 24px', textDecoration:'none' }}>BOOK CONSULTATION →</a>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ padding:'72px 5vw 56px', maxWidth:1100, margin:'0 auto' }}>
        <div className="svc-hero" style={{ display:'grid', gridTemplateColumns:'1fr 380px', gap:48, alignItems:'start' }}>
          <div>
            <div style={{ display:'flex', gap:12, alignItems:'center', marginBottom:20, flexWrap:'wrap' }}>
              <span style={{ fontSize:36 }}>{s.icon}</span>
              <span style={{ fontSize:10, letterSpacing:'1.5px', color:G, background:'rgba(0,200,150,0.08)', border:'1px solid rgba(0,200,150,0.2)', padding:'4px 12px' }}>{s.category}</span>
            </div>
            <h1 style={{ fontSize:'clamp(28px,4vw,52px)', fontWeight:900, letterSpacing:'-1.5px', lineHeight:1.0, marginBottom:16 }}>{s.title}</h1>
            <p style={{ fontSize:20, color:G, fontWeight:700, marginBottom:20 }}>{s.tagline}</p>
            <p style={{ fontSize:18, color:'rgba(245,240,232,0.6)', lineHeight:1.75, fontStyle:'italic', borderLeft:`3px solid ${G}`, paddingLeft:20, marginBottom:32 }}>{s.heroStatement}</p>
            <div style={{ display:'flex', gap:14, flexWrap:'wrap' }}>
              <a href="/consultation" style={{ background:G, color:'#0A0A0A', fontWeight:900, fontSize:15, padding:'15px 36px', textDecoration:'none', letterSpacing:'0.5px' }}>BOOK FREE CONSULTATION →</a>
              <a href="tel:+1" style={{ background:'transparent', border:'1px solid rgba(0,200,150,0.3)', color:G, fontWeight:700, fontSize:15, padding:'15px 28px', textDecoration:'none' }}>CALL US</a>
            </div>
          </div>
          {/* Pricing card */}
          <div style={{ background:'#111', border:`1px solid ${G}33`, padding:'32px' }}>
            <div style={{ fontSize:10, letterSpacing:'2px', color:G, marginBottom:16 }}>PRICING</div>
            <div style={{ marginBottom:20, paddingBottom:20, borderBottom:'1px solid #1a1a1a' }}>
              <div style={{ fontSize:11, color:'rgba(245,240,232,0.4)', marginBottom:6 }}>HOURLY RATE</div>
              <div style={{ fontSize:36, fontWeight:900, color:GOLD }}>${s.hourlyRate}<span style={{ fontSize:16, color:'rgba(245,240,232,0.4)', fontWeight:400 }}>/hr</span></div>
            </div>
            <div style={{ marginBottom:20, paddingBottom:20, borderBottom:'1px solid #1a1a1a' }}>
              <div style={{ fontSize:11, color:'rgba(245,240,232,0.4)', marginBottom:6 }}>SETUP / PROJECT</div>
              <div style={{ fontSize:28, fontWeight:800, color:'#F5F0E8' }}>From ${s.setupFrom.toLocaleString()}</div>
              <div style={{ fontSize:12, color:'rgba(245,240,232,0.3)', marginTop:4 }}>One-time implementation</div>
            </div>
            <div style={{ marginBottom:28 }}>
              <div style={{ fontSize:11, color:'rgba(245,240,232,0.4)', marginBottom:6 }}>MONTHLY RETAINER</div>
              <div style={{ fontSize:28, fontWeight:800, color:G }}>From ${s.retainerFrom.toLocaleString()}<span style={{ fontSize:14, color:'rgba(245,240,232,0.4)', fontWeight:400 }}>/mo</span></div>
              <div style={{ fontSize:12, color:'rgba(245,240,232,0.3)', marginTop:4 }}>Ongoing management + optimization</div>
            </div>
            <a href="/consultation" style={{ display:'block', background:G, color:'#0A0A0A', fontWeight:900, fontSize:14, padding:'14px', textDecoration:'none', textAlign:'center', letterSpacing:'1px' }}>GET EXACT PRICING →</a>
            <p style={{ fontSize:11, color:'rgba(245,240,232,0.3)', textAlign:'center', marginTop:12, lineHeight:1.5 }}>Free 30-min strategy call. No commitment required.</p>
          </div>
        </div>
      </section>

      {/* Results */}
      <section style={{ background:'#0D1A0D', borderTop:'1px solid #1a1a1a', borderBottom:'1px solid #1a1a1a', padding:'48px 5vw' }}>
        <div className="svc-results" style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16, maxWidth:1100, margin:'0 auto' }}>
          {s.results.map(r => (
            <div key={r.stat} style={{ textAlign:'center', padding:'24px 16px' }}>
              <div style={{ fontSize:'clamp(28px,4vw,42px)', fontWeight:900, color:G, marginBottom:6 }}>{r.stat}</div>
              <div style={{ fontSize:12, color:'rgba(245,240,232,0.45)', lineHeight:1.5 }}>{r.label}</div>
            </div>
          ))}
        </div>
      </section>

      <div style={{ maxWidth:1100, margin:'0 auto', padding:'72px 5vw' }}>
        {/* Problem */}
        <div style={{ marginBottom:64 }}>
          <div style={{ fontSize:11, letterSpacing:'2px', color:'rgba(245,240,232,0.3)', marginBottom:12 }}>THE PROBLEM</div>
          <h2 style={{ fontSize:'clamp(22px,3vw,34px)', fontWeight:900, marginBottom:16, letterSpacing:'-0.5px' }}>Why this keeps costing you.</h2>
          <p style={{ fontSize:17, color:'rgba(245,240,232,0.6)', lineHeight:1.85, maxWidth:720 }}>{s.problem}</p>
        </div>

        {/* Solution */}
        <div style={{ marginBottom:64, paddingLeft:24, borderLeft:`3px solid ${G}` }}>
          <div style={{ fontSize:11, letterSpacing:'2px', color:G, marginBottom:12 }}>THE SOLUTION</div>
          <h2 style={{ fontSize:'clamp(22px,3vw,34px)', fontWeight:900, marginBottom:16, letterSpacing:'-0.5px' }}>How we fix it.</h2>
          <p style={{ fontSize:17, color:'rgba(245,240,232,0.7)', lineHeight:1.85, maxWidth:720 }}>{s.solution}</p>
        </div>

        {/* What we deliver */}
        <div style={{ marginBottom:64 }}>
          <div style={{ fontSize:11, letterSpacing:'2px', color:G, marginBottom:16 }}>WHAT YOU GET</div>
          <h2 style={{ fontSize:'clamp(22px,3vw,34px)', fontWeight:900, marginBottom:28, letterSpacing:'-0.5px' }}>Everything included.</h2>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))', gap:12 }}>
            {s.whatWeDeliver.map((item, i) => (
              <div key={i} style={{ display:'flex', gap:12, alignItems:'flex-start', background:'#111', border:'1px solid #1a1a1a', padding:'16px 18px' }}>
                <span style={{ color:G, fontWeight:900, flexShrink:0, marginTop:1 }}>✓</span>
                <span style={{ fontSize:14, color:'rgba(245,240,232,0.7)', lineHeight:1.6 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Process */}
        <div style={{ marginBottom:64 }}>
          <div style={{ fontSize:11, letterSpacing:'2px', color:G, marginBottom:16 }}>THE PROCESS</div>
          <h2 style={{ fontSize:'clamp(22px,3vw,34px)', fontWeight:900, marginBottom:28, letterSpacing:'-0.5px' }}>How we work together.</h2>
          <div className="svc-process" style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16 }}>
            {s.process.map(p => (
              <div key={p.step} style={{ background:'#111', border:'1px solid #1a1a1a', padding:'24px 20px' }}>
                <div style={{ fontSize:36, fontWeight:900, color:G, opacity:0.25, lineHeight:1, marginBottom:12 }}>{p.step}</div>
                <div style={{ fontSize:15, fontWeight:800, color:'#F5F0E8', marginBottom:10 }}>{p.title}</div>
                <div style={{ fontSize:13, color:'rgba(245,240,232,0.5)', lineHeight:1.65 }}>{p.body}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Who it's for */}
        <div style={{ marginBottom:64 }}>
          <div style={{ fontSize:11, letterSpacing:'2px', color:G, marginBottom:16 }}>WHO THIS IS FOR</div>
          <div style={{ display:'flex', flexWrap:'wrap', gap:10 }}>
            {s.whoItsFor.map((w, i) => (
              <span key={i} style={{ background:'rgba(0,200,150,0.06)', border:'1px solid rgba(0,200,150,0.2)', color:'rgba(245,240,232,0.7)', fontSize:13, padding:'8px 16px' }}>{w}</span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ background:'#0D1A0D', border:`1px solid ${G}22`, padding:'48px 40px', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:24 }}>
          <div>
            <div style={{ fontSize:11, letterSpacing:'2px', color:G, marginBottom:8 }}>READY TO BUILD?</div>
            <h3 style={{ fontSize:'clamp(20px,3vw,32px)', fontWeight:900, marginBottom:8 }}>Let us build your {s.title}.</h3>
            <p style={{ color:'rgba(245,240,232,0.5)', fontSize:15 }}>Free 30-minute strategy call. We map the build and give you exact pricing, no obligation.</p>
          </div>
          <a href="/consultation" style={{ background:G, color:'#0A0A0A', fontWeight:900, fontSize:15, padding:'16px 40px', textDecoration:'none', letterSpacing:'0.5px', whiteSpace:'nowrap' }}>BOOK FREE CALL →</a>
        </div>

        {/* Other services */}
        <div style={{ marginTop:64 }}>
          <div style={{ fontSize:11, letterSpacing:'2px', color:'rgba(245,240,232,0.3)', marginBottom:20 }}>OTHER SERVICES</div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))', gap:12 }}>
            {services.filter(sv => sv.slug !== s.slug).slice(0,4).map(sv => (
              <Link key={sv.slug} href={`/services/${sv.slug}`} style={{ textDecoration:'none' }}>
                <div style={{ background:'#111', border:'1px solid #1a1a1a', padding:'18px 20px', display:'flex', gap:12, alignItems:'center' }}>
                  <span style={{ fontSize:22 }}>{sv.icon}</span>
                  <div>
                    <div style={{ fontSize:13, fontWeight:700, color:'#F5F0E8', lineHeight:1.3 }}>{sv.title}</div>
                    <div style={{ fontSize:11, color:G, marginTop:2 }}>From ${sv.retainerFrom.toLocaleString()}/mo</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <VocFooter />
    </div>
  );
}
