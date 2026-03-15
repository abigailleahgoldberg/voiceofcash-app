'use client';
import { useState, useEffect } from 'react';

const G = '#00C896';
const GOLD = '#D4AF37';
const CORRECT = '1234!';

const STAGES = ['Lead','Proposal Sent','In Negotiation','Active Client','Completed','On Hold','Lost'];
const SERVICES = ['AI Agent Stack','Custom Automation','Consulting Retainer','AI Strategy Session','Content Automation','Full Ops Build','Other'];
const TEAM_MEMBERS = ['Cash Colligan','Tim Gelhardt','Ammar Ul Haq','David Jones'];
const INTERNAL_PROJECTS = [
  { name:'The Voice of Cash', status:'Active', team:'All Partners', revenue:'Internal', description:'Core agency brand, AI agent services, consulting, automation.', color:G },
  { name:'WeBearish',         status:'Active', team:'All Partners', revenue:'Internal', description:'Autism acceptance movement. 100% of profits reinvested into mission.', color:'#B8E887' },
  { name:'U-God Sacred Texts', status:'Active', team:'All Partners', revenue:'Internal', description:'World religions digital platform at u-god.com, 200+ sacred pages.', color:GOLD },
];

interface Client { id:string; name:string; company:string; service:string; stage:string; revenue:string; assignedTo:string; notes:string; createdAt:string; startDate:string; }

function fmt(iso: string) {
  try { return new Date(iso).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'}); } catch { return iso; }
}

export default function PortalClient() {
  const [pass, setPass]   = useState('');
  const [unlocked, setUn] = useState(false);
  const [err, setErr]     = useState('');
  const [tab, setTab]     = useState<'overview'|'clients'|'contract'|'revenue'>('overview');
  const [clients, setClients] = useState<Client[]>([]);
  const [sigs, setSigs]   = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm]   = useState({ name:'', company:'', service:'', stage:'Lead', revenue:'', assignedTo:'', notes:'', startDate:'' });
  const [saving, setSaving] = useState(false);
  const [filter, setFilter] = useState('All');

  function unlock(e: React.FormEvent) {
    e.preventDefault();
    if (pass === CORRECT) { setUn(true); loadData(); }
    else setErr('Incorrect passcode.');
  }

  async function loadData() {
    setLoading(true);
    const [cr, sr] = await Promise.all([fetch('/api/clients'), fetch('/api/sign-contract')]);
    const cd = await cr.json(); const sd = await sr.json();
    setClients(cd.clients || []);
    setSigs(sd.signatures || []);
    setLoading(false);
  }

  async function addClient(e: React.FormEvent) {
    e.preventDefault(); setSaving(true);
    const res = await fetch('/api/clients', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(form) });
    const d = await res.json();
    if (d.ok) { setClients(p => [...p, d.client]); setShowForm(false); setForm({ name:'',company:'',service:'',stage:'Lead',revenue:'',assignedTo:'',notes:'',startDate:'' }); }
    setSaving(false);
  }

  async function deleteClient(id: string) {
    if (!confirm('Remove this client?')) return;
    await fetch('/api/clients', { method:'DELETE', headers:{'Content-Type':'application/json'}, body:JSON.stringify({id}) });
    setClients(p => p.filter(c => c.id !== id));
  }

  // Revenue calcs
  const activeClients = clients.filter(c => c.stage === 'Active Client');
  const totalRevStr = clients.reduce((sum,c) => sum + (parseFloat(c.revenue.replace(/[$,]/g,'')) || 0), 0);
  const taxHold = totalRevStr * 0.33;
  const distributable = totalRevStr * 0.67;
  const perPartner = distributable / 4;

  const filtered = filter === 'All' ? clients : clients.filter(c => c.stage === filter);
  const sigsCount = sigs.length;

  if (!unlocked) return (
    <div style={{ minHeight:'100vh', background:'#0A0A0A', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'system-ui,sans-serif' }}>
      <div style={{ background:'#111', border:`1px solid ${G}33`, padding:'48px', maxWidth:420, width:'90%', textAlign:'center' }}>
        <div style={{ fontSize:32, marginBottom:8 }}>🏛️</div>
        <div style={{ fontSize:11, letterSpacing:'2px', color:G, marginBottom:12 }}>VOICE OF CASH</div>
        <h1 style={{ fontSize:22, fontWeight:900, color:'#F5F0E8', marginBottom:8 }}>Team Portal</h1>
        <p style={{ color:'rgba(245,240,232,0.4)', fontSize:13, marginBottom:28 }}>Partners only. Enter team passcode.</p>
        <form onSubmit={unlock} style={{ display:'flex', flexDirection:'column', gap:12 }}>
          <input type="password" placeholder="Passcode" value={pass} onChange={e=>setPass(e.target.value)}
            style={{ background:'#0A0A0A', border:`1px solid ${G}44`, color:'#F5F0E8', padding:'12px 16px', fontSize:16, outline:'none', textAlign:'center', letterSpacing:'4px' }}/>
          {err && <div style={{ color:'#FF6B6B', fontSize:12 }}>{err}</div>}
          <button type="submit" style={{ background:G, color:'#0A0A0A', fontWeight:800, padding:'12px', fontSize:14, border:'none', cursor:'pointer' }}>ENTER →</button>
        </form>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight:'100vh', background:'#0A0A0A', color:'#F5F0E8', fontFamily:'system-ui,sans-serif' }}>
      <style>{`
        .tab-btn { background:transparent; border:none; cursor:pointer; padding:12px 20px; font-size:13px; font-weight:600; letter-spacing:1px; transition:all 0.15s; }
        .tab-btn.active { border-bottom:2px solid ${G}; color:${G}; }
        .tab-btn:not(.active) { color:rgba(245,240,232,0.4); border-bottom:2px solid transparent; }
        .tab-btn:hover:not(.active) { color:rgba(245,240,232,0.7); }
        .card { background:#111; border:1px solid #1a1a1a; padding:20px 24px; }
        @media(max-width:640px) { .portal-grid { grid-template-columns:1fr !important; } }
      `}</style>

      {/* Header */}
      <div style={{ background:'#0D1F1A', borderBottom:`1px solid ${G}22`, padding:'20px 5vw' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:12 }}>
          <div>
            <div style={{ fontSize:10, letterSpacing:'2px', color:G }}>VOICE OF CASH</div>
            <h1 style={{ fontSize:22, fontWeight:900, margin:'4px 0 0' }}>Team Partner Portal</h1>
          </div>
          <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
            <div style={{ background:'rgba(0,200,150,0.1)', border:`1px solid ${G}33`, padding:'8px 16px', fontSize:12 }}>
              <span style={{ color:G, fontWeight:700 }}>{sigsCount}/4</span><span style={{ color:'rgba(245,240,232,0.4)', marginLeft:6 }}>Signed</span>
            </div>
            <div style={{ background:'rgba(0,200,150,0.1)', border:`1px solid ${G}33`, padding:'8px 16px', fontSize:12 }}>
              <span style={{ color:G, fontWeight:700 }}>{clients.length}</span><span style={{ color:'rgba(245,240,232,0.4)', marginLeft:6 }}>Clients</span>
            </div>
            <a href="/staff-portal" style={{ background:'transparent', border:`1px solid ${G}44`, color:G, padding:'8px 16px', fontSize:12, fontWeight:700, textDecoration:'none' }}>📄 CONTRACT</a>
          </div>
        </div>
        {/* Tabs */}
        <div style={{ marginTop:16, display:'flex', gap:4, borderBottom:`1px solid #1a1a1a` }}>
          {(['overview','clients','revenue','contract'] as const).map(t => (
            <button key={t} onClick={()=>setTab(t)} className={`tab-btn${tab===t?' active':''}`}>{t.toUpperCase()}</button>
          ))}
        </div>
      </div>

      <div style={{ padding:'32px 5vw', maxWidth:1200, margin:'0 auto' }}>

        {/* OVERVIEW */}
        {tab === 'overview' && (
          <>
            {/* Internal Projects */}
            <div style={{ fontSize:11, letterSpacing:'2px', color:G, marginBottom:16 }}>INTERNAL PROJECTS</div>
            <div className="portal-grid" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16, marginBottom:40 }}>
              {INTERNAL_PROJECTS.map(p => (
                <div key={p.name} className="card" style={{ borderLeft:`3px solid ${p.color}` }}>
                  <div style={{ fontSize:11, letterSpacing:'1.5px', color:p.color, marginBottom:8 }}>INTERNAL PROJECT</div>
                  <div style={{ fontSize:17, fontWeight:800, marginBottom:6 }}>{p.name}</div>
                  <div style={{ fontSize:12, color:'rgba(245,240,232,0.45)', lineHeight:1.6, marginBottom:16 }}>{p.description}</div>
                  <div style={{ display:'flex', justifyContent:'space-between', fontSize:12 }}>
                    <span style={{ color:'rgba(245,240,232,0.4)' }}>Team</span><span style={{ color:'#F5F0E8' }}>{p.team}</span>
                  </div>
                  <div style={{ display:'flex', justifyContent:'space-between', fontSize:12, marginTop:6 }}>
                    <span style={{ color:'rgba(245,240,232,0.4)' }}>Revenue</span>
                    <span style={{ color:p.color, fontWeight:700 }}>{p.revenue}</span>
                  </div>
                  <div style={{ display:'flex', justifyContent:'space-between', fontSize:12, marginTop:6 }}>
                    <span style={{ color:'rgba(245,240,232,0.4)' }}>Status</span>
                    <span style={{ color:G }}>{p.status}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Team */}
            <div style={{ fontSize:11, letterSpacing:'2px', color:G, marginBottom:16 }}>THE TEAM</div>
            <div className="portal-grid" style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:16, marginBottom:40 }}>
              {[
                { name:'Cash Colligan', title:'CVO / CMO', duties:'Day-to-day ops, client rep, agent development', signed: sigs.find(s=>s.memberId==='cash') },
                { name:'Tim Gelhardt', title:'CTO / HPC', duties:'All things ops, server, IT, platform', signed: sigs.find(s=>s.memberId==='tim') },
                { name:'Ammar Ul Haq', title:'Director, Biz Dev', duties:'Ads, scaling, expansion, content', signed: sigs.find(s=>s.memberId==='ammar') },
                { name:'David Jones', title:'CSM / Senior Advisor', duties:'Client onboarding, biz strategy, Spanish market', signed: sigs.find(s=>s.memberId==='david') },
              ].map(m => (
                <div key={m.name} className="card" style={{ display:'flex', gap:16, alignItems:'flex-start' }}>
                  <div style={{ width:44, height:44, background:`${G}22`, border:`1px solid ${G}44`, display:'flex', alignItems:'center', justifyContent:'center', fontWeight:800, fontSize:14, flexShrink:0 }}>
                    {m.name.split(' ').map(n=>n[0]).join('')}
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontWeight:700, fontSize:15 }}>{m.name}</div>
                    <div style={{ fontSize:11, color:G, letterSpacing:'0.5px', marginBottom:4 }}>{m.title}</div>
                    <div style={{ fontSize:12, color:'rgba(245,240,232,0.4)' }}>{m.duties}</div>
                    <div style={{ marginTop:8, fontSize:11 }}>
                      {m.signed
                        ? <span style={{ color:G }}>✓ Signed, {m.signed.timestamp?.split(' at')[0]}</span>
                        : <span style={{ color:'rgba(245,240,232,0.3)' }}>⏳ Awaiting signature</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Monthly meeting */}
            <div className="card" style={{ display:'flex', gap:24, alignItems:'center', flexWrap:'wrap' }}>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'center', width:32, height:32 }}><svg width="24" height="24" viewBox="0 0 20 20" fill="none"><rect x="2" y="4" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M2 8h16M6 2v4M14 2v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg></div>
              <div>
                <div style={{ fontSize:11, letterSpacing:'2px', color:G, marginBottom:4 }}>MANDATORY PARTNER MEETING</div>
                <div style={{ fontSize:18, fontWeight:800 }}>14th of Every Month</div>
                <div style={{ fontSize:13, color:'rgba(245,240,232,0.5)', marginTop:4 }}>All 4 founding partners required. Format by mutual agreement.</div>
              </div>
              <div style={{ marginLeft:'auto', textAlign:'right' }}>
                <div style={{ fontSize:11, color:'rgba(245,240,232,0.4)', marginBottom:4 }}>PAYMENT SCHEDULE</div>
                <div style={{ fontSize:15, fontWeight:700, color:GOLD }}>Quarterly, 4x per year</div>
                <div style={{ fontSize:12, color:'rgba(245,240,232,0.4)' }}>Q1 due Apr 15 &nbsp;|&nbsp; Q2 due Jul 15</div>
              </div>
            </div>
          </>
        )}

        {/* CLIENTS */}
        {tab === 'clients' && (
          <>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:12, marginBottom:24 }}>
              <div>
                <div style={{ fontSize:11, letterSpacing:'2px', color:G, marginBottom:4 }}>CLIENT REGISTRY</div>
                <div style={{ fontSize:22, fontWeight:900 }}>{clients.length} Clients Logged</div>
              </div>
              <button onClick={()=>setShowForm(!showForm)} style={{ background:G, color:'#0A0A0A', fontWeight:800, fontSize:13, padding:'12px 24px', border:'none', cursor:'pointer', letterSpacing:'1px' }}>
                {showForm ? '✕ CANCEL' : '+ ADD CLIENT'}
              </button>
            </div>

            {showForm && (
              <form onSubmit={addClient} style={{ background:'#111', border:`1px solid ${G}33`, padding:'28px', marginBottom:28 }}>
                <div style={{ fontSize:11, letterSpacing:'2px', color:G, marginBottom:20 }}>NEW CLIENT</div>
                <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))', gap:14 }}>
                  {[
                    ['Contact Name','name','text',true],['Company / Business','company','text',false],
                    ['Start Date','startDate','date',false],
                  ].map(([label,field,type,req]) => (
                    <div key={field as string}>
                      <div style={{ fontSize:11, color:'rgba(245,240,232,0.5)', marginBottom:6 }}>{label as string}{req?' *':''}</div>
                      <input required={!!req} type={type as string} value={(form as any)[field as string]} onChange={e=>setForm(p=>({...p,[field as string]:e.target.value}))}
                        style={{ width:'100%', background:'#0A0A0A', border:`1px solid #2a2a2a`, color:'#F5F0E8', padding:'10px 12px', fontSize:14, outline:'none', boxSizing:'border-box' }}/>
                    </div>
                  ))}
                  {[['Service','service',SERVICES],['Stage','stage',STAGES],['Assigned To','assignedTo',['', ...TEAM_MEMBERS]]].map(([label,field,opts]) => (
                    <div key={field as string}>
                      <div style={{ fontSize:11, color:'rgba(245,240,232,0.5)', marginBottom:6 }}>{label as string}</div>
                      <select value={(form as any)[field as string]} onChange={e=>setForm(p=>({...p,[field as string]:e.target.value}))}
                        style={{ width:'100%', background:'#0A0A0A', border:`1px solid #2a2a2a`, color:'#F5F0E8', padding:'10px 12px', fontSize:14, outline:'none', boxSizing:'border-box' }}>
                        {(opts as string[]).map(o=><option key={o} value={o}>{o||'-- Select --'}</option>)}
                      </select>
                    </div>
                  ))}
                  <div>
                    <div style={{ fontSize:11, color:'rgba(245,240,232,0.5)', marginBottom:6 }}>Revenue / Price</div>
                    <input placeholder="$3,000/mo or Internal" value={form.revenue} onChange={e=>setForm(p=>({...p,revenue:e.target.value}))}
                      style={{ width:'100%', background:'#0A0A0A', border:`1px solid #2a2a2a`, color:'#F5F0E8', padding:'10px 12px', fontSize:14, outline:'none', boxSizing:'border-box' }}/>
                  </div>
                  <div style={{ gridColumn:'1/-1' }}>
                    <div style={{ fontSize:11, color:'rgba(245,240,232,0.5)', marginBottom:6 }}>Notes</div>
                    <textarea value={form.notes} onChange={e=>setForm(p=>({...p,notes:e.target.value}))} rows={3}
                      style={{ width:'100%', background:'#0A0A0A', border:`1px solid #2a2a2a`, color:'#F5F0E8', padding:'10px 12px', fontSize:14, outline:'none', resize:'vertical', boxSizing:'border-box' }}/>
                  </div>
                </div>
                <button type="submit" disabled={saving} style={{ marginTop:16, background:G, color:'#0A0A0A', fontWeight:800, fontSize:13, padding:'12px 32px', border:'none', cursor:'pointer' }}>
                  {saving ? 'SAVING...' : 'SAVE CLIENT →'}
                </button>
              </form>
            )}

            {/* Filter */}
            <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:20 }}>
              {['All', ...STAGES].map(s => (
                <button key={s} onClick={()=>setFilter(s)} style={{ background: filter===s ? G : 'transparent', color: filter===s ? '#0A0A0A' : 'rgba(245,240,232,0.4)', border:`1px solid ${filter===s ? G : '#2a2a2a'}`, padding:'6px 14px', fontSize:11, fontWeight:700, cursor:'pointer', letterSpacing:'0.5px' }}>{s}</button>
              ))}
            </div>

            {loading ? <div style={{ color:'rgba(245,240,232,0.4)', padding:'40px', textAlign:'center' }}>Loading...</div> : filtered.length === 0 ? (
              <div style={{ textAlign:'center', padding:'60px 20px', color:'rgba(245,240,232,0.3)' }}>
                <div style={{ fontSize:40, marginBottom:12, display:'flex', alignItems:'center', justifyContent:'center' }}><svg width="40" height="40" viewBox="0 0 24 24" fill="none"><rect x="8" y="2" width="8" height="4" rx="1" stroke="currentColor" strokeWidth="1.5"/><rect x="4" y="4" width="16" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M8 11h8M8 15h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M8 4h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg></div>
                <div style={{ fontSize:16 }}>No clients logged yet. Click + Add Client to start.</div>
              </div>
            ) : (
              <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
                {filtered.map(c => (
                  <div key={c.id} className="card" style={{ display:'grid', gridTemplateColumns:'2fr 1.5fr 1fr 1fr 1fr auto', gap:16, alignItems:'center', flexWrap:'wrap' }}>
                    <div>
                      <div style={{ fontWeight:700, fontSize:15 }}>{c.name}</div>
                      <div style={{ fontSize:12, color:'rgba(245,240,232,0.4)' }}>{c.company || ', '}</div>
                    </div>
                    <div>
                      <div style={{ fontSize:12, color:'rgba(245,240,232,0.5)' }}>Service</div>
                      <div style={{ fontSize:13, fontWeight:600 }}>{c.service || ', '}</div>
                    </div>
                    <div>
                      <div style={{ fontSize:12, color:'rgba(245,240,232,0.5)' }}>Stage</div>
                      <div style={{ fontSize:12, color: c.stage==='Active Client' ? G : c.stage==='Lost' ? '#FF6B6B' : GOLD, fontWeight:700 }}>{c.stage}</div>
                    </div>
                    <div>
                      <div style={{ fontSize:12, color:'rgba(245,240,232,0.5)' }}>Revenue</div>
                      <div style={{ fontSize:13, fontWeight:700, color:G }}>{c.revenue || ', '}</div>
                    </div>
                    <div>
                      <div style={{ fontSize:12, color:'rgba(245,240,232,0.5)' }}>Owner</div>
                      <div style={{ fontSize:12 }}>{c.assignedTo || ', '}</div>
                    </div>
                    <button onClick={()=>deleteClient(c.id)} style={{ background:'transparent', border:`1px solid #FF6B6B44`, color:'#FF6B6B', padding:'6px 12px', fontSize:11, cursor:'pointer' }}>✕</button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* REVENUE */}
        {tab === 'revenue' && (
          <>
            <div style={{ fontSize:11, letterSpacing:'2px', color:G, marginBottom:24 }}>REVENUE DASHBOARD</div>
            <div className="portal-grid" style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16, marginBottom:32 }}>
              {[
                { label:'Total Logged Revenue', value:`$${totalRevStr.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})}`, color:G },
                { label:'33% Tax Reserve Hold', value:`$${taxHold.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})}`, color:'#FF6B6B' },
                { label:'Distributable (67%)', value:`$${distributable.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})}`, color:GOLD },
                { label:'Per Partner (25%)', value:`$${perPartner.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})}`, color:'#F5F0E8' },
              ].map(s => (
                <div key={s.label} className="card" style={{ textAlign:'center' }}>
                  <div style={{ fontSize:11, color:'rgba(245,240,232,0.4)', marginBottom:8 }}>{s.label}</div>
                  <div style={{ fontSize:'clamp(20px,3vw,28px)', fontWeight:900, color:s.color }}>{s.value}</div>
                </div>
              ))}
            </div>

            <div style={{ fontSize:11, letterSpacing:'2px', color:G, marginBottom:16 }}>PARTNER DISTRIBUTION BREAKDOWN</div>
            <div style={{ background:'#111', border:`1px solid ${G}22`, padding:'24px' }}>
              {['Cash Colligan','Tim Gelhardt','Ammar Ul Haq','David Jones'].map(name => (
                <div key={name} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'14px 0', borderBottom:'1px solid #1a1a1a' }}>
                  <div style={{ fontWeight:700 }}>{name}</div>
                  <div style={{ display:'flex', gap:24, alignItems:'center' }}>
                    <div style={{ fontSize:12, color:'rgba(245,240,232,0.4)' }}>25% share</div>
                    <div style={{ fontSize:20, fontWeight:900, color:G, minWidth:100, textAlign:'right' }}>
                      ${perPartner.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})}
                    </div>
                  </div>
                </div>
              ))}
              <div style={{ marginTop:16, fontSize:12, color:'rgba(245,240,232,0.3)', fontStyle:'italic' }}>
                Note: Revenue figures are based on manually logged client data. Update regularly for accuracy.
              </div>
            </div>

            <div style={{ marginTop:24, fontSize:11, letterSpacing:'2px', color:G, marginBottom:16 }}>PAYMENT SCHEDULE</div>
            <div className="portal-grid" style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16 }}>
              {[['Q1','Jan, Mar','Due Apr 15'],['Q2','Apr, Jun','Due Jul 15'],['Q3','Jul, Sep','Due Oct 15'],['Q4','Oct, Dec','Due Jan 15']].map(([q,p,d]) => (
                <div key={q} className="card" style={{ textAlign:'center' }}>
                  <div style={{ fontSize:24, fontWeight:900, color:GOLD, marginBottom:4 }}>{q}</div>
                  <div style={{ fontSize:13, color:'rgba(245,240,232,0.6)', marginBottom:4 }}>{p}</div>
                  <div style={{ fontSize:11, color:G }}>{d}</div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* CONTRACT STATUS */}
        {tab === 'contract' && (
          <>
            <div style={{ fontSize:11, letterSpacing:'2px', color:G, marginBottom:24 }}>PARTNER AGREEMENT STATUS</div>
            <div style={{ marginBottom:32 }}>
              <div style={{ display:'flex', gap:16, flexWrap:'wrap', marginBottom:24 }}>
                <div className="card" style={{ flex:1, minWidth:180, textAlign:'center' }}>
                  <div style={{ fontSize:40, fontWeight:900, color: sigsCount===4 ? G : GOLD }}>{sigsCount}/4</div>
                  <div style={{ fontSize:12, color:'rgba(245,240,232,0.4)' }}>Partners Signed</div>
                </div>
                <div className="card" style={{ flex:3, minWidth:300 }}>
                  <div style={{ fontSize:11, letterSpacing:'1px', color:G, marginBottom:12 }}>AGREEMENT DETAILS</div>
                  {[['Effective Date','Date of final signature on or after March 1, 2026'],['Governing Law','Nevada'],['Tax Reserve','33% of gross revenue'],['Partner Split','25% each (of 67% distributable)'],['Meeting Cadence','14th of every month'],['Payment Frequency','Quarterly (4x per year)']].map(([k,v]) => (
                    <div key={k} style={{ display:'flex', justifyContent:'space-between', padding:'8px 0', borderBottom:'1px solid #1a1a1a', fontSize:13 }}>
                      <span style={{ color:'rgba(245,240,232,0.4)' }}>{k}</span>
                      <span style={{ color:'#F5F0E8', fontWeight:600 }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ fontSize:11, letterSpacing:'2px', color:G, marginBottom:16 }}>SIGNATURE LOG</div>
            {sigs.length === 0 ? (
              <div style={{ textAlign:'center', padding:'40px', color:'rgba(245,240,232,0.3)' }}>No signatures recorded yet. <a href="/staff-portal" style={{ color:G }}>Go to contract →</a></div>
            ) : (
              <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
                {sigs.map(s => (
                  <div key={s.signatureId} className="card" style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:16, flexWrap:'wrap' }}>
                    <div>
                      <div style={{ fontSize:11, color:'rgba(245,240,232,0.4)', marginBottom:4 }}>PARTNER</div>
                      <div style={{ fontWeight:700 }}>{s.memberName}</div>
                      <div style={{ fontSize:12, color:'rgba(245,240,232,0.4)' }}>{s.memberTitle}</div>
                    </div>
                    <div>
                      <div style={{ fontSize:11, color:'rgba(245,240,232,0.4)', marginBottom:4 }}>SIGNED</div>
                      <div style={{ fontSize:13, color:G, fontWeight:600 }}>✓ {s.timestamp?.split(' at')[0]}</div>
                      <div style={{ fontSize:11, color:'rgba(245,240,232,0.3)', marginTop:2 }}>ID: {s.signatureId}</div>
                    </div>
                    <div>
                      <div style={{ fontSize:11, color:'rgba(245,240,232,0.4)', marginBottom:4 }}>IP ADDRESS</div>
                      <div style={{ fontSize:13, fontFamily:'monospace', color:'rgba(245,240,232,0.6)' }}>{s.ip}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div style={{ marginTop:28 }}>
              <a href="/staff-portal" style={{ display:'inline-block', background:'transparent', border:`1px solid ${G}44`, color:G, fontWeight:700, fontSize:13, padding:'12px 28px', textDecoration:'none', letterSpacing:'1px' }}>📄 VIEW FULL CONTRACT →</a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
