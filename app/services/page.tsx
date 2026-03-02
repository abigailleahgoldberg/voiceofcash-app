import VocFooter from '../components/VocFooter';
import type { Metadata } from 'next';
import Link from 'next/link';
import { services } from './data';

export const metadata: Metadata = {
  title: 'AI Agent Services Las Vegas | Voice of Cash',
  description: 'Explore all AI agent services from Voice of Cash. Lead automation, chatbots, SEO, financial close, multi-location management, and more. Las Vegas and nationwide.',
  alternates: { canonical: 'https://www.thevoiceofcash.com/services' },
};

const G = '#00C896';
const GOLD = '#D4AF37';
const CATS = ['All', ...Array.from(new Set(services.map(s => s.category)))];

export default function ServicesPage() {
  return (
    <div style={{ minHeight:'100vh', background:'#0A0A0A', color:'#F5F0E8', fontFamily:'system-ui,sans-serif' }}>
      <nav style={{ padding:'16px 5vw', borderBottom:'1px solid #1a1a1a', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <a href="/" style={{ fontWeight:900, fontSize:18, color:'#F5F0E8', textDecoration:'none' }}>Voice<span style={{color:G}}>OfCash</span></a>
        <a href="/consultation" style={{ background:G, color:'#0A0A0A', fontWeight:800, fontSize:13, padding:'10px 24px', textDecoration:'none', letterSpacing:'0.5px' }}>BOOK CONSULTATION →</a>
      </nav>
      <section style={{ padding:'80px 5vw 48px', maxWidth:1100, margin:'0 auto' }}>
        <div style={{ fontSize:11, letterSpacing:'3px', color:G, marginBottom:16 }}>WHAT WE BUILD</div>
        <h1 style={{ fontSize:'clamp(32px,5vw,60px)', fontWeight:900, letterSpacing:'-2px', lineHeight:1.0, marginBottom:20 }}>
          12 AI Agent Services.<br/><span style={{color:G}}>One team that builds them all.</span>
        </h1>
        <p style={{ fontSize:18, color:'rgba(245,240,232,0.5)', maxWidth:640, lineHeight:1.7, marginBottom:16 }}>Every service starts at <strong style={{color:GOLD}}>$149/hr</strong>. Monthly retainers available. Or let us run everything, <a href="/business" style={{color:G, textDecoration:'none', fontWeight:700}}>see our full-service option →</a></p>
      </section>
      <section style={{ padding:'0 5vw 100px', maxWidth:1100, margin:'0 auto' }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))', gap:16 }}>
          {services.map(s => (
            <Link key={s.slug} href={`/services/${s.slug}`} style={{ textDecoration:'none' }}>
              <div style={{ background:'#111', border:'1px solid #1a1a1a', padding:'28px 24px', height:'100%', transition:'border-color 0.2s', cursor:'pointer' }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:16 }}>
                  <span style={{ fontSize:32 }}>{s.icon}</span>
                  <span style={{ fontSize:10, letterSpacing:'1.5px', color:G, background:'rgba(0,200,150,0.08)', border:'1px solid rgba(0,200,150,0.2)', padding:'3px 10px' }}>{s.category}</span>
                </div>
                <h2 style={{ fontSize:17, fontWeight:800, color:'#F5F0E8', lineHeight:1.2, marginBottom:10 }}>{s.title}</h2>
                <p style={{ fontSize:13, color:'rgba(245,240,232,0.45)', lineHeight:1.6, marginBottom:20 }}>{s.tagline}</p>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                  <span style={{ fontSize:12, color:GOLD, fontWeight:700 }}>From ${s.retainerFrom.toLocaleString()}/mo</span>
                  <span style={{ fontSize:12, color:G }}>View service →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section style={{ background:'#001a0e', borderTop:`1px solid ${G}22`, padding:'72px 5vw', textAlign:'center' }}>
        <div style={{ fontSize:11, letterSpacing:'2px', color:G, marginBottom:16 }}>NOT SURE WHERE TO START?</div>
        <h2 style={{ fontSize:'clamp(24px,4vw,40px)', fontWeight:900, marginBottom:16 }}>Book a free strategy call.</h2>
        <p style={{ color:'rgba(245,240,232,0.5)', fontSize:16, marginBottom:32 }}>Tell us your biggest operational headache. We will tell you exactly which AI agent fixes it and what it costs.</p>
        <a href="/consultation" style={{ background:G, color:'#0A0A0A', fontWeight:800, fontSize:15, padding:'16px 40px', textDecoration:'none' }}>BOOK FREE CONSULTATION →</a>
      </section>
      <VocFooter />
    </div>
  );
}
