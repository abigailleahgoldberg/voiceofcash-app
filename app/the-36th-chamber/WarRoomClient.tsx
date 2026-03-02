'use client';
import { useState } from 'react';
import ChamberCanvas from './ChamberCanvas';


const AGENTS = [
  { name:"The Genius",     role:"Strategy & Oversight",   emoji:"🧠", color:"#7C3AED" },
  { name:"The Earner",     role:"Revenue & Trading",      emoji:"💰", color:"#3B82F6" },
  { name:"The Chef",       role:"Content & SEO",          emoji:"✍️", color:"#4ADE80" },
  { name:"The Starks",     role:"E-Commerce & Brand",   emoji:"👻", color:"#FBBF24" },
  { name:"The Inspector",  role:"Research & Validation",  emoji:"🔍", color:"#38BDF8" },
  { name:"The Wildcard",   role:"Chaos & Creativity",     emoji:"🌀", color:"#F87171" },
  { name:"The Scribe",     role:"Long-Form & Publishing", emoji:"📚", color:"#9CA3AF" },
  { name:"The Scholar",    role:"Sacred Texts & Data",    emoji:"📜", color:"#34D399" },
  { name:"Slim Shady",     role:"Security & IT Ops",      emoji:"🛡️", color:"#2DD4BF" },
];

const TABS = [
  { id: 'live',       label: 'Live Agents',   icon: '⚡' },
  { id: 'operatives', label: 'The Operatives', icon: '👥' },
  { id: 'about',      label: 'About',         icon: 'ℹ️' },
];

const G = '#00C896';

export default function WarRoomClient() {
  const [tab, setTab] = useState('live');

  return (
    <div style={{ background:'#0A0A0A', minHeight:'100vh', fontFamily:"'DM Sans',sans-serif", color:'#F5F0E8' }}>


      {/* Nav */}
      <nav style={{ borderBottom:'1px solid rgba(0,200,150,0.1)', padding:'14px 20px', display:'flex', alignItems:'center', justifyContent:'space-between', position:'sticky', top:0, background:'rgba(10,10,10,0.97)', backdropFilter:'blur(8px)', zIndex:50 }}>
        <a href="/" style={{ display:'flex', alignItems:'center', gap:10, textDecoration:'none' }}>
          <img src="/logo.svg" alt="logo" width={24} height={24} />
          <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:15, letterSpacing:3, color:G }}>
            VOICE OF CASH
          </span>
        </a>
        <a href="/consultation" style={{ background:G, color:'#fff', fontFamily:"'Bebas Neue',sans-serif", fontSize:13, letterSpacing:2, padding:'8px 18px', textDecoration:'none', whiteSpace:'nowrap' }}>
          Consultation →
        </a>
      </nav>

      {/* Header */}
      <div style={{ textAlign:'center', padding:'40px 20px 24px' }}>
        <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(0,200,150,0.08)', border:'1px solid rgba(0,200,150,0.2)', padding:'7px 18px', marginBottom:20 }}>
          <span style={{ width:7, height:7, borderRadius:'50%', background:G, display:'inline-block' }} />
          <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:12, letterSpacing:3, color:G }}>LIVE — WAR ROOM ACTIVE</span>
        </div>
        <h1 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'clamp(40px,9vw,76px)', color:'#F5F0E8', letterSpacing:2, margin:'0 0 12px', lineHeight:1 }}>
          THE <span style={{ color:G }}>36TH CHAMBER</span>
        </h1>
        <p style={{ fontSize:16, color:'rgba(245,240,232,0.5)', maxWidth:480, margin:'0 auto', lineHeight:1.5 }}>
          Nine autonomous AI agents. One war room. Running 24/7.
        </p>
      </div>

      {/* Tab Bar */}
      <div style={{ display:'flex', justifyContent:'center', gap:0, padding:'0 20px 24px', overflowX:'auto' }}>
        <div style={{ display:'inline-flex', background:'#141414', border:'1px solid rgba(255,255,255,0.08)', padding:4, gap:4 }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              style={{
                padding:'10px 22px', border:'none', cursor:'pointer', fontSize:14, fontWeight:600, whiteSpace:'nowrap', transition:'all 0.2s',
                background: tab === t.id ? G : 'transparent',
                color: tab === t.id ? '#fff' : 'rgba(245,240,232,0.4)',
                fontFamily:"'DM Sans',sans-serif",
              }}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div style={{ maxWidth:1100, margin:'0 auto', padding:'0 16px 64px' }}>

        {/* LIVE AGENTS TAB */}
        {tab === 'live' && (
          <div>
            <div style={{
              border:`2px solid ${G}`,
              boxShadow:`0 0 40px rgba(0,200,150,0.15), 0 0 2px rgba(0,200,150,0.4)`,
              overflow:'hidden',
              marginBottom:16,
            }}>
              <iframe
                src="https://36th-chamber.vercel.app/embed"
                style={{ width:'100%', height:'clamp(340px, 70vw, 760px)', border:'none', display:'block', background:'#060d14' }}
                className="chamber-iframe"
                title="The 36th Chamber — Voice of Cash War Room"
                allow="autoplay"
              />
            </div>
            <p style={{ textAlign:'center', fontSize:12, color:'rgba(245,240,232,0.2)', margin:0 }}>
              Hover / tap an agent to see their current mission, file count, and model.
            </p>
          </div>
        )}

        {/* OPERATIVES TAB */}
        {tab === 'operatives' && (
          <div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(180px,1fr))', gap:14 }}>
              {AGENTS.map(a => (
                <div key={a.name} style={{ padding:'20px 16px', background:'#141414', border:`1px solid ${a.color}22`, textAlign:'center', transition:'border-color 0.2s' }}>
                  <div style={{ fontSize:32, marginBottom:10 }}>{a.emoji}</div>
                  <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:16, letterSpacing:1, color:a.color, marginBottom:4 }}>{a.name}</div>
                  <div style={{ fontSize:12, color:'rgba(245,240,232,0.3)', lineHeight:1.3 }}>{a.role}</div>
                  <div style={{ width:28, height:2, background:a.color, margin:'12px auto 0', opacity:0.4 }} />
                </div>
              ))}
            </div>
            <div style={{ marginTop:40, padding:24, background:'#141414', border:`1px solid rgba(0,200,150,0.15)`, textAlign:'center' }}>
              <h3 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:22, letterSpacing:2, color:'#F5F0E8', margin:'0 0 10px' }}>
                WANT THESE <span style={{ color:G }}>WORKING FOR YOU?</span>
              </h3>
              <p style={{ fontSize:15, color:'rgba(245,240,232,0.4)', margin:'0 0 20px' }}>
                These agents run our operation. They can run yours.
              </p>
              <a href="/consultation" style={{ display:'inline-block', background:G, color:'#fff', fontFamily:"'Bebas Neue',sans-serif", fontSize:17, letterSpacing:2, padding:'13px 36px', textDecoration:'none' }}>
                Book a Free Consultation →
              </a>
            </div>
          </div>
        )}

        {/* ABOUT TAB */}
        {tab === 'about' && (
          <div style={{ maxWidth:640, margin:'0 auto', display:'flex', flexDirection:'column', gap:20 }}>
            {[
              { title:'What Is the 36th Chamber?', body:"The 36th Chamber is the Voice of Cash live operations center. Nine autonomous AI agents, each with a distinct role, running 24/7 to power the businesses we build and serve in Las Vegas." },
              { title:'Who Are the Agents?', body:"GZA handles strategy. Method Man runs trading and revenue. Raekwon owns content and SEO. Ghostface Killah manages e-commerce. Inspectah Deck validates data. ODB brings the chaos and creativity. Masta Killa leads long-form publishing. U-God manages sacred texts and data infrastructure. Slim Shady handles security and IT ops." },
              { title:'What Does This Mean For Your Business?', body:"These aren't demo bots. They run real systems, make real decisions, and produce real output every day. When you work with The Voice of Cash, you get access to this entire infrastructure — built around your specific business needs." },
            ].map(s => (
              <div key={s.title} style={{ padding:24, background:'#141414', border:'1px solid rgba(255,255,255,0.06)' }}>
                <h3 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:18, letterSpacing:1, color:G, margin:'0 0 10px' }}>{s.title}</h3>
                <p style={{ fontSize:15, color:'rgba(245,240,232,0.55)', margin:0, lineHeight:1.7 }}>{s.body}</p>
              </div>
            ))}
            <div style={{ textAlign:'center', paddingTop:10 }}>
              <a href="/consultation" style={{ display:'inline-block', background:G, color:'#fff', fontFamily:"'Bebas Neue',sans-serif", fontSize:17, letterSpacing:2, padding:'13px 36px', textDecoration:'none' }}>
                Book a Free Consultation →
              </a>
            </div>
          </div>
        )}

      </div>

      {/* Footer */}
      <div style={{ borderTop:'1px solid rgba(255,255,255,0.04)', padding:'20px', textAlign:'center' }}>
        <p style={{ fontSize:11, color:'rgba(245,240,232,0.15)', margin:0 }}>
          © {new Date().getFullYear()} The Voice of Cash · Las Vegas, Nevada
        </p>
      </div>
    </div>
  );
}
