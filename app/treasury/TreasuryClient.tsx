'use client';
import { useState, useEffect } from 'react';
import { DollarSign, TrendingDown, Wallet, RefreshCw, ExternalLink, Lock, Eye, EyeOff, Plus, Trash2, Trophy, Clock, XCircle, Swords } from 'lucide-react';

const PASS_KEY = 'voc-treasury-auth';
const CORRECT_PASS = '1234!';
const BET_KEY = 'wu-ufc-bets-v1';
const EVM_ADDRESS = '0x4a4185a3e5ecabbd1eb4884ac74dfe05ae566541';
const SOL_ADDRESS = '2rqzLi5Rp93g4VKGYJcbSHERoA49ndg9EeTFTHse33gi';

function calcPayout(stake: number, odds: string): number {
  const o = parseInt(odds);
  if (isNaN(o) || stake <= 0) return 0;
  if (o > 0) return parseFloat((stake + stake * o / 100).toFixed(2));
  if (o < 0) return parseFloat((stake + stake * 100 / Math.abs(o)).toFixed(2));
  return stake;
}
function calcProfit(b: any) {
  if (b.status === 'won') return b.payout - b.stake;
  if (b.status === 'lost') return -b.stake;
  return 0;
}
function fmt(n: number) { return n.toLocaleString('en-US', { style: 'currency', currency: 'USD' }); }
function short(addr: string) { return addr ? addr.slice(0,6) + '...' + addr.slice(-4) : ''; }

const STATUS_CFG: Record<string, { label: string; color: string; Icon: any }> = {
  active: { label:'ACTIVE', color:'#D4AF37', Icon: Clock },
  won:    { label:'WON',    color:'#22c55e', Icon: Trophy },
  lost:   { label:'LOST',   color:'#ef4444', Icon: XCircle },
  push:   { label:'PUSH',   color:'#6b7280', Icon: DollarSign },
};

const SEED_BETS = [
  { id:'seed-1', event:'UFC Fight Night', fighter:'Zellhuber', opponent:'TBD', odds:'+32', stake:10, payout:13.20, status:'active', date: new Date().toLocaleDateString(), notes:'Polymarket 75.5c vs sportsbook 83% - value play. Method Man confirmed.' },
  { id:'seed-2', event:'UFC Fight Night', fighter:'Moreno',    opponent:'TBD', odds:'-125', stake:8,  payout:14.40, status:'active', date: new Date().toLocaleDateString(), notes:'12.12 shares on Polymarket (~$8). First position placed.' },
  { id:'seed-3', event:'UFC Fight Night', fighter:'Martinez',  opponent:'TBD', odds:'',    stake:0,  payout:0,     status:'active', date: new Date().toLocaleDateString(), notes:'Placing now - update odds + stake when confirmed.' },
  { id:'seed-4', event:'UFC Fight Night', fighter:'Rodriguez', opponent:'TBD', odds:'',    stake:0,  payout:0,     status:'active', date: new Date().toLocaleDateString(), notes:'Placing now - update odds + stake when confirmed.' },
];

const EMPTY_BET = { event:'', fighter:'', opponent:'', odds:'', stake:0, status:'active', method:'', notes:'' };

function PasswordGate({ onUnlock }: { onUnlock: () => void }) {
  const [pass, setPass] = useState('');
  const [show, setShow] = useState(false);
  const [err, setErr] = useState(false);
  const attempt = () => {
    if (pass === CORRECT_PASS) { sessionStorage.setItem(PASS_KEY, '1'); onUnlock(); }
    else { setErr(true); setPass(''); setTimeout(() => setErr(false), 1500); }
  };
  return (
    <div style={{ minHeight:'100vh', background:'#0A0A0A', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'DM Sans',sans-serif" }}>
      <div style={{ width:360, padding:40, background:'#141414', border:'1px solid rgba(0,200,150,0.2)', textAlign:'center' }}>
        <Lock style={{ width:40, height:40, color:'#00C896', margin:'0 auto 20px', display:'block' }} />
        <h1 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:28, letterSpacing:3, color:'#F5F0E8', margin:'0 0 8px' }}>TREASURY</h1>
        <p style={{ fontSize:13, color:'rgba(245,240,232,0.3)', margin:'0 0 32px' }}>Restricted access. Authorized personnel only.</p>
        <div style={{ position:'relative', marginBottom:16 }}>
          <input type={show ? 'text' : 'password'} value={pass} onChange={e => setPass(e.target.value)} onKeyDown={e => e.key === 'Enter' && attempt()} placeholder="Password" autoFocus
            style={{ width:'100%', padding:'12px 44px 12px 16px', background:'#0A0A0A', border:`1px solid ${err ? '#ef4444' : 'rgba(255,255,255,0.1)'}`, color:'#F5F0E8', fontSize:16, outline:'none', boxSizing:'border-box' }} />
          <button onClick={() => setShow(!show)} style={{ position:'absolute', right:12, top:'50%', transform:'translateY(-50%)', background:'none', border:'none', cursor:'pointer', color:'rgba(245,240,232,0.3)', padding:0 }}>
            {show ? <EyeOff style={{ width:18, height:18 }} /> : <Eye style={{ width:18, height:18 }} />}
          </button>
        </div>
        {err && <p style={{ color:'#ef4444', fontSize:12, margin:'0 0 12px' }}>Incorrect password.</p>}
        <button onClick={attempt} style={{ width:'100%', padding:13, background:'#00C896', color:'#fff', fontFamily:"'Bebas Neue',sans-serif", fontSize:18, letterSpacing:2, border:'none', cursor:'pointer' }}>ENTER</button>
      </div>
    </div>
  );
}

export default function TreasuryClient() {
  const [unlocked, setUnlocked] = useState(false);
  const [wallet, setWallet] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [bets, setBets] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<any>(EMPTY_BET);
  const [betFilter, setBetFilter] = useState('all');

  useEffect(() => { if (sessionStorage.getItem(PASS_KEY) === '1') setUnlocked(true); }, []);

  useEffect(() => {
    if (!unlocked) return;
    try {
      const raw = localStorage.getItem(BET_KEY);
      const loaded = raw ? JSON.parse(raw) : SEED_BETS;
      setBets(loaded);
      if (!raw) localStorage.setItem(BET_KEY, JSON.stringify(SEED_BETS));
    } catch { setBets(SEED_BETS); }
  }, [unlocked]);

  const fetchWallet = async () => {
    setLoading(true);
    try {
      const [addrRes, solRes, bankrRes] = await Promise.allSettled([
        fetch('https://base.blockscout.com/api/v2/addresses/' + EVM_ADDRESS),
        fetch('https://api.mainnet-beta.solana.com', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ jsonrpc:'2.0', id:1, method:'getBalance', params:[SOL_ADDRESS] }) }),
        fetch('/api/treasury'),
      ]);
      let ethBalance = 0, ethUsd = 0;
      if (addrRes.status === 'fulfilled') {
        const d = await (addrRes as any).value.json();
        ethBalance = parseFloat(d.coin_balance || '0') / 1e18;
        ethUsd = ethBalance * parseFloat(d.exchange_rate || '0');
      }
      let solBalance = 0, solUsd = 0;
      if (solRes.status === 'fulfilled') {
        const d = await (solRes as any).value.json();
        solBalance = (d.result?.value || 0) / 1e9;
        try { const pr = await (await fetch('https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd')).json(); solUsd = solBalance * (pr.solana?.usd || 0); } catch {}
      }
      let bankrHoldings: any[] = [], bankrTotal = 0;
      if (bankrRes.status === 'fulfilled') {
        try { const d = await (bankrRes as any).value.json(); if (d.holdings) { bankrHoldings = d.holdings; bankrTotal = d.totalValue || 0; } } catch {}
      }
      const totalUsd = bankrTotal > 0 ? bankrTotal : ethUsd + solUsd;
      setWallet({ ethBalance, ethUsd, solBalance, solUsd, totalUsd, lastUpdated: new Date().toLocaleTimeString(), bankrHoldings, bankrTotal });
    } catch {}
    setLoading(false);
  };

  useEffect(() => { if (unlocked) fetchWallet(); }, [unlocked]);

  const saveBets = (updated: any[]) => { setBets(updated); localStorage.setItem(BET_KEY, JSON.stringify(updated)); };
  const submitBet = () => {
    if (!form.fighter || !form.stake) return;
    const payout = calcPayout(form.stake, form.odds);
    if (editId) { saveBets(bets.map((b: any) => b.id === editId ? { ...b, ...form, payout } : b)); setEditId(null); }
    else saveBets([{ ...form, id: Date.now().toString(), date: new Date().toLocaleDateString(), payout }, ...bets]);
    setForm(EMPTY_BET); setShowForm(false);
  };
  const setStatus = (id: string, status: string) => saveBets(bets.map((b: any) => b.id === id ? { ...b, status } : b));
  const deleteBet = (id: string) => { if (confirm('Delete this bet?')) saveBets(bets.filter((b: any) => b.id !== id)); };

  const settled = bets.filter((b: any) => b.status === 'won' || b.status === 'lost');
  const netPL = settled.reduce((s: number, b: any) => s + calcProfit(b), 0);
  const wins = bets.filter((b: any) => b.status === 'won').length;
  const losses = bets.filter((b: any) => b.status === 'lost').length;
  const activeExposure = bets.filter((b: any) => b.status === 'active').reduce((s: number, b: any) => s + b.stake, 0);
  const activePotential = bets.filter((b: any) => b.status === 'active').reduce((s: number, b: any) => s + b.payout, 0);
  const filteredBets = betFilter === 'all' ? bets : bets.filter((b: any) => b.status === betFilter);

  if (!unlocked) return <PasswordGate onUnlock={() => setUnlocked(true)} />;

  const G = '#00C896';
  const GOLD = '#D4AF37';

  return (
    <div style={{ minHeight:'100vh', background:'#0A0A0A', fontFamily:"'DM Sans',sans-serif", color:'#F5F0E8' }}>
      <nav style={{ borderBottom:'1px solid rgba(0,200,150,0.1)', padding:'14px 32px', display:'flex', alignItems:'center', justifyContent:'space-between', position:'sticky', top:0, background:'rgba(10,10,10,0.95)', backdropFilter:'blur(8px)', zIndex:50 }}>
        <a href="/" style={{ display:'flex', alignItems:'center', gap:10, textDecoration:'none' }}>
          <img src="/logo.svg" alt="logo" width={24} height={24} />
          <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:16, letterSpacing:3, color:G }}>VOICE OF CASH <span style={{ color:'rgba(245,240,232,0.35)' }}>/ TREASURY</span></span>
        </a>
        <div style={{ display:'flex', gap:12 }}>
          <button onClick={fetchWallet} disabled={loading} style={{ display:'flex', alignItems:'center', gap:6, padding:'7px 14px', background:'rgba(0,200,150,0.08)', border:'1px solid rgba(0,200,150,0.2)', color:G, fontSize:13, cursor:'pointer' }}>
            <RefreshCw style={{ width:13, height:13 }} /> {loading ? 'Loading...' : 'Refresh'}
          </button>
          <button onClick={() => { sessionStorage.removeItem(PASS_KEY); setUnlocked(false); }} style={{ padding:'7px 14px', background:'rgba(239,68,68,0.08)', border:'1px solid rgba(239,68,68,0.2)', color:'#ef4444', fontSize:13, cursor:'pointer' }}>Lock</button>
        </div>
      </nav>

      <div style={{ maxWidth:1200, margin:'0 auto', padding:'40px 24px', display:'flex', flexDirection:'column', gap:28 }}>

        <div>
          <h1 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:40, letterSpacing:3, color:'#F5F0E8', margin:0 }}>TREASURY <span style={{ color:G }}>DASHBOARD</span></h1>
          <p style={{ color:'rgba(245,240,232,0.3)', fontSize:14, margin:'4px 0 0' }}>Wallets · trading P&L · active bets · revenue streams</p>
        </div>

        {/* Total */}
        <div style={{ padding:28, background:'#141414', borderLeft:`4px solid ${G}`, border:`1px solid ${G}33` }}>
          <p style={{ fontSize:11, letterSpacing:2, color:'rgba(245,240,232,0.3)', textTransform:'uppercase', margin:'0 0 8px' }}>Total Portfolio Value</p>
          <p style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:52, color:G, margin:0, letterSpacing:2 }}>{wallet ? fmt(wallet.totalUsd) : '—'}</p>
          {wallet && <p style={{ fontSize:12, color:'rgba(245,240,232,0.2)', margin:'6px 0 0' }}>Updated: {wallet.lastUpdated}</p>}
        </div>

        {/* Wallet Cards */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:16 }}>
          {[
            { label:'Base Chain (EVM)', val:wallet ? fmt(wallet.ethUsd) : '—', sub:wallet ? wallet.ethBalance.toFixed(6)+' ETH' : '—', addr:EVM_ADDRESS, link:'https://base.blockscout.com/address/'+EVM_ADDRESS, color:'#3b82f6' },
            { label:'Solana',           val:wallet ? fmt(wallet.solUsd)  : '—', sub:wallet ? wallet.solBalance.toFixed(6)+' SOL' : '—', addr:SOL_ADDRESS,  link:'https://solscan.io/account/'+SOL_ADDRESS,  color:'#a855f7' },
          ].map(w => (
            <div key={w.label} style={{ padding:20, background:'#141414', border:'1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:10 }}>
                <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                  <Wallet style={{ width:14, height:14, color:w.color }} />
                  <span style={{ fontSize:11, letterSpacing:1.5, color:'rgba(245,240,232,0.3)', textTransform:'uppercase' }}>{w.label}</span>
                </div>
                <a href={w.link} target="_blank" rel="noopener noreferrer"><ExternalLink style={{ width:12, height:12, color:'rgba(245,240,232,0.2)' }} /></a>
              </div>
              <p style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:26, color:'#F5F0E8', margin:'0 0 4px', letterSpacing:1 }}>{w.val}</p>
              <p style={{ fontSize:12, color:'rgba(245,240,232,0.35)', margin:0 }}>{w.sub}</p>
              <p style={{ fontSize:11, color:'rgba(245,240,232,0.2)', margin:'6px 0 0', fontFamily:'monospace' }}>{short(w.addr)}</p>
            </div>
          ))}
          <div style={{ padding:20, background:'#141414', border:`1px solid ${GOLD}22` }}>
            <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:10 }}>
              <DollarSign style={{ width:14, height:14, color:GOLD }} />
              <span style={{ fontSize:11, letterSpacing:1.5, color:'rgba(245,240,232,0.3)', textTransform:'uppercase' }}>Bankr Portfolio</span>
            </div>
            {wallet?.bankrHoldings?.length ? wallet.bankrHoldings.map((h: any, i: number) => (
              <div key={i} style={{ display:'flex', justifyContent:'space-between', marginBottom:6 }}>
                <span style={{ fontSize:13, color:'rgba(245,240,232,0.6)' }}>{h.name}</span>
                <span style={{ fontSize:13, fontWeight:700 }}>{fmt(h.usdValue)}</span>
              </div>
            )) : <p style={{ fontSize:12, color:'rgba(245,240,232,0.2)', margin:0 }}>Loading Bankr data...</p>}
          </div>
        </div>

        {/* Profit Pipeline */}
        <div style={{ padding:24, background:'#141414', border:'1px solid rgba(255,255,255,0.06)' }}>
          <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:20, letterSpacing:2, color:'#F5F0E8', margin:'0 0 16px' }}>PROFIT PIPELINE</h2>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(130px,1fr))', gap:12 }}>
            {[
              { label:'Gross', val:wallet ? fmt(wallet.totalUsd) : '$0', color:'#F5F0E8', bg:'rgba(255,255,255,0.03)' },
              { label:'30% Taxes', val:wallet ? fmt(wallet.totalUsd * 0.3) : '$0', color:'#ef4444', bg:'rgba(239,68,68,0.07)' },
              { label:'38% C&T Fund', val:wallet ? fmt(wallet.totalUsd * 0.38) : '$0', color:'#3b82f6', bg:'rgba(59,130,246,0.07)' },
              { label:'32% Working Cap', val:wallet ? fmt(wallet.totalUsd * 0.32) : '$0', color:G, bg:'rgba(0,200,150,0.07)' },
            ].map(p => (
              <div key={p.label} style={{ padding:14, background:p.bg, textAlign:'center' }}>
                <p style={{ fontSize:11, color:'rgba(245,240,232,0.3)', letterSpacing:1, margin:'0 0 6px', textTransform:'uppercase' }}>{p.label}</p>
                <p style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:20, color:p.color, margin:0 }}>{p.val}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Wallet Allocation */}
        <div style={{ padding:24, background:'#141414', border:'1px solid rgba(255,255,255,0.06)' }}>
          <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:20, letterSpacing:2, color:'#F5F0E8', margin:'0 0 16px' }}>WALLET ALLOCATION — 25/55/20</h2>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12 }}>
            {[
              { label:'Vault', pct:25, color:'#3b82f6', desc:'Untouchable savings' },
              { label:'Active', pct:55, color:G, desc:'Trading operations' },
              { label:'Degen', pct:20, color:'#ef4444', desc:'High-risk plays' },
            ].map(w => (
              <div key={w.label} style={{ padding:16, background:'rgba(255,255,255,0.03)', textAlign:'center' }}>
                <p style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:26, color:w.color, margin:'0 0 4px' }}>{w.pct}%</p>
                <p style={{ fontSize:12, fontWeight:700, color:'rgba(245,240,232,0.6)', margin:'0 0 4px' }}>{w.label}</p>
                <p style={{ fontSize:11, color:'rgba(245,240,232,0.25)', margin:'0 0 8px' }}>{w.desc}</p>
                <div style={{ height:3, background:'rgba(255,255,255,0.06)', borderRadius:2 }}>
                  <div style={{ height:'100%', width:w.pct+'%', background:w.color, borderRadius:2 }} />
                </div>
                <p style={{ fontSize:14, fontWeight:700, color:'rgba(245,240,232,0.4)', margin:'8px 0 0' }}>{wallet ? fmt(wallet.totalUsd * w.pct / 100) : '—'}</p>
              </div>
            ))}
          </div>
        </div>

        {/* UFC Bets */}
        <div style={{ padding:24, background:'#141414', border:`1px solid ${GOLD}22` }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:20 }}>
            <div style={{ display:'flex', alignItems:'center', gap:10 }}>
              <Swords style={{ width:20, height:20, color:GOLD }} />
              <div>
                <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:20, letterSpacing:2, color:GOLD, margin:0 }}>UFC BETS</h2>
                <p style={{ fontSize:12, color:'rgba(245,240,232,0.25)', margin:0 }}>Polymarket positions · Win/Loss tracking</p>
              </div>
            </div>
            <button onClick={() => { setShowForm(!showForm); setEditId(null); setForm(EMPTY_BET); }}
              style={{ display:'flex', alignItems:'center', gap:6, padding:'8px 16px', background:`rgba(212,175,55,0.1)`, border:`1px solid ${GOLD}44`, color:GOLD, fontSize:13, cursor:'pointer', fontWeight:600 }}>
              <Plus style={{ width:14, height:14 }} /> Log Bet
            </button>
          </div>

          {/* Stats */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(120px,1fr))', gap:12, marginBottom:20 }}>
            {[
              { label:'Record', val:`${wins}W – ${losses}L`, color: wins >= losses ? '#22c55e' : '#ef4444' },
              { label:'Net P&L', val:`${netPL >= 0 ? '+' : ''}$${netPL.toFixed(2)}`, color: netPL >= 0 ? '#22c55e' : '#ef4444' },
              { label:'Exposure', val:`$${activeExposure.toFixed(2)}`, color:GOLD },
              { label:'Potential', val:`$${activePotential.toFixed(2)}`, color:'#3b82f6' },
            ].map(s => (
              <div key={s.label} style={{ padding:12, background:'rgba(255,255,255,0.03)', textAlign:'center' }}>
                <p style={{ fontSize:11, color:'rgba(245,240,232,0.3)', letterSpacing:1, margin:'0 0 4px', textTransform:'uppercase' }}>{s.label}</p>
                <p style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:20, color:s.color, margin:0 }}>{s.val}</p>
              </div>
            ))}
          </div>

          {/* Form */}
          {showForm && (
            <div style={{ padding:20, background:'rgba(0,0,0,0.4)', border:`1px solid ${GOLD}33`, marginBottom:20 }}>
              <p style={{ fontSize:13, fontWeight:700, color:GOLD, margin:'0 0 14px' }}>{editId ? 'Edit Bet' : 'Log New Bet'}</p>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(150px,1fr))', gap:10 }}>
                {[
                  ['Event', 'event', 'UFC 313'],
                  ['Fighter *', 'fighter', 'Pereira'],
                  ['Opponent', 'opponent', 'Ankalaev'],
                  ['Odds (-150, +220)', 'odds', '-150'],
                  ['Notes', 'notes', 'Method Man pick...'],
                ].map(([label, key, ph]) => (
                  <div key={key}>
                    <label style={{ fontSize:10, color:'rgba(245,240,232,0.3)', display:'block', marginBottom:4, letterSpacing:1, textTransform:'uppercase' }}>{label}</label>
                    <input value={form[key] || ''} onChange={e => setForm({...form, [key]: e.target.value})} placeholder={ph}
                      style={{ width:'100%', padding:'8px 10px', background:'#0A0A0A', border:'1px solid rgba(255,255,255,0.1)', color:'#F5F0E8', fontSize:13, outline:'none', boxSizing:'border-box' }} />
                  </div>
                ))}
                <div>
                  <label style={{ fontSize:10, color:'rgba(245,240,232,0.3)', display:'block', marginBottom:4, letterSpacing:1, textTransform:'uppercase' }}>Stake ($) *</label>
                  <input type="number" value={form.stake || ''} onChange={e => setForm({...form, stake: parseFloat(e.target.value) || 0})} placeholder="50"
                    style={{ width:'100%', padding:'8px 10px', background:'#0A0A0A', border:'1px solid rgba(255,255,255,0.1)', color:'#F5F0E8', fontSize:13, outline:'none', boxSizing:'border-box' }} />
                </div>
                <div>
                  <label style={{ fontSize:10, color:'rgba(245,240,232,0.3)', display:'block', marginBottom:4, letterSpacing:1, textTransform:'uppercase' }}>Status</label>
                  <select value={form.status} onChange={e => setForm({...form, status: e.target.value})}
                    style={{ width:'100%', padding:'8px 10px', background:'#0A0A0A', border:'1px solid rgba(255,255,255,0.1)', color:'#F5F0E8', fontSize:13, outline:'none', boxSizing:'border-box' }}>
                    <option value="active">Active</option><option value="won">Won</option><option value="lost">Lost</option><option value="push">Push</option>
                  </select>
                </div>
              </div>
              {form.stake > 0 && form.odds && (
                <p style={{ fontSize:12, color:GOLD, margin:'10px 0 0' }}>
                  Payout: <strong>${calcPayout(form.stake, form.odds).toFixed(2)}</strong> · Profit: <strong>+${(calcPayout(form.stake, form.odds) - form.stake).toFixed(2)}</strong>
                </p>
              )}
              <div style={{ display:'flex', gap:10, marginTop:14 }}>
                <button onClick={submitBet} style={{ padding:'9px 24px', background:GOLD, color:'#0A0A0A', fontFamily:"'Bebas Neue',sans-serif", fontSize:16, letterSpacing:2, border:'none', cursor:'pointer' }}>
                  {editId ? 'UPDATE' : 'LOG BET'}
                </button>
                <button onClick={() => { setShowForm(false); setEditId(null); setForm(EMPTY_BET); }}
                  style={{ padding:'9px 20px', background:'rgba(255,255,255,0.06)', color:'rgba(245,240,232,0.5)', border:'none', cursor:'pointer', fontSize:13 }}>Cancel</button>
              </div>
            </div>
          )}

          {/* Filters */}
          {bets.length > 0 && (
            <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:14 }}>
              {['all','active','won','lost','push'].map(f => (
                <button key={f} onClick={() => setBetFilter(f)}
                  style={{ padding:'4px 12px', fontSize:12, fontWeight:600, cursor:'pointer', border:'none', textTransform:'capitalize',
                    background: betFilter === f ? GOLD : 'rgba(255,255,255,0.05)',
                    color: betFilter === f ? '#0A0A0A' : 'rgba(245,240,232,0.35)' }}>
                  {f === 'all' ? `All (${bets.length})` : `${f} (${bets.filter((b:any)=>b.status===f).length})`}
                </button>
              ))}
            </div>
          )}

          {/* Bet list */}
          {filteredBets.length === 0 ? (
            <div style={{ textAlign:'center', padding:'32px 0', color:'rgba(245,240,232,0.2)' }}>
              <Swords style={{ width:32, height:32, margin:'0 auto 10px', display:'block', opacity:0.2 }} />
              <p style={{ fontSize:13, margin:0 }}>{bets.length === 0 ? 'No bets yet.' : 'No bets in this filter.'}</p>
            </div>
          ) : filteredBets.map((bet: any) => {
            const cfg = STATUS_CFG[bet.status] || STATUS_CFG.active;
            const profit = calcProfit(bet);
            return (
              <div key={bet.id} style={{ padding:16, background:'rgba(255,255,255,0.03)', border:`1px solid ${cfg.color}22`, marginBottom:10 }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:12 }}>
                  <div style={{ flex:1 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:8, flexWrap:'wrap', marginBottom:4 }}>
                      <span style={{ fontSize:15, fontWeight:700 }}>{bet.fighter}</span>
                      {bet.opponent && <span style={{ fontSize:12, color:'rgba(245,240,232,0.35)' }}>vs {bet.opponent}</span>}
                      {bet.event && <span style={{ fontSize:11, color:'rgba(245,240,232,0.2)', background:'rgba(255,255,255,0.04)', padding:'2px 8px' }}>{bet.event}</span>}
                    </div>
                    <div style={{ display:'flex', gap:16, flexWrap:'wrap', fontSize:12, color:'rgba(245,240,232,0.4)' }}>
                      {bet.odds && <span>Odds: <strong style={{color:'#F5F0E8'}}>{bet.odds}</strong></span>}
                      {bet.stake > 0 && <span>Stake: <strong style={{color:'#F5F0E8'}}>${bet.stake}</strong></span>}
                      {bet.payout > 0 && <span>Payout: ${bet.payout.toFixed(2)}</span>}
                      <span style={{color:'rgba(245,240,232,0.2)'}}>{bet.date}</span>
                    </div>
                    {bet.notes && <p style={{ fontSize:12, color:'rgba(245,240,232,0.3)', margin:'6px 0 0', fontStyle:'italic' }}>"{bet.notes}"</p>}
                  </div>
                  <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-end', gap:6, flexShrink:0 }}>
                    <span style={{ fontSize:11, fontWeight:700, letterSpacing:1, padding:'3px 8px', background:cfg.color+'18', color:cfg.color }}>{cfg.label}</span>
                    {bet.status !== 'active' && <span style={{ fontSize:14, fontWeight:700, color: profit >= 0 ? '#22c55e' : '#ef4444' }}>{profit >= 0 ? '+' : ''}${profit.toFixed(2)}</span>}
                    {bet.status === 'active' && bet.payout > 0 && <span style={{ fontSize:12, color:GOLD }}>+${(bet.payout - bet.stake).toFixed(2)} if win</span>}
                  </div>
                </div>
                <div style={{ display:'flex', alignItems:'center', gap:8, paddingTop:10, marginTop:10, borderTop:'1px solid rgba(255,255,255,0.05)', flexWrap:'wrap' }}>
                  {bet.status === 'active' && <>
                    <span style={{ fontSize:11, color:'rgba(245,240,232,0.25)' }}>Result:</span>
                    <button onClick={() => setStatus(bet.id,'won')} style={{ padding:'4px 12px', fontSize:12, fontWeight:700, background:'rgba(34,197,94,0.1)', color:'#22c55e', border:'1px solid rgba(34,197,94,0.2)', cursor:'pointer' }}>Won</button>
                    <button onClick={() => setStatus(bet.id,'lost')} style={{ padding:'4px 12px', fontSize:12, fontWeight:700, background:'rgba(239,68,68,0.1)', color:'#ef4444', border:'1px solid rgba(239,68,68,0.2)', cursor:'pointer' }}>Lost</button>
                    <button onClick={() => setStatus(bet.id,'push')} style={{ padding:'4px 12px', fontSize:12, background:'rgba(255,255,255,0.05)', color:'rgba(245,240,232,0.4)', border:'none', cursor:'pointer' }}>Push</button>
                  </>}
                  <div style={{ marginLeft:'auto', display:'flex', gap:6 }}>
                    <button onClick={() => { setForm({event:bet.event,fighter:bet.fighter,opponent:bet.opponent,odds:bet.odds,stake:bet.stake,status:bet.status,method:bet.method||'',notes:bet.notes||''}); setEditId(bet.id); setShowForm(true); }}
                      style={{ padding:'4px 10px', fontSize:12, background:'rgba(255,255,255,0.05)', color:'rgba(245,240,232,0.4)', border:'none', cursor:'pointer' }}>Edit</button>
                    <button onClick={() => deleteBet(bet.id)} style={{ padding:'4px 10px', fontSize:12, background:'rgba(239,68,68,0.06)', color:'rgba(239,68,68,0.5)', border:'none', cursor:'pointer' }}>
                      <Trash2 style={{ width:12, height:12 }} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Revenue Streams */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:16 }}>
          {[
            { label:'JewSA Revenue', icon:'🛒', sub:'jewsa.com · Printful + Stripe', status:'Awaiting Stripe integration' },
            { label:'WeBearish Revenue', icon:'♾️', sub:'webearish.com · Shopify', status:'Awaiting Shopify connection' },
            { label:'VoC Consultations', icon:'🤝', sub:'thevoiceofcash.com', status:'Awaiting CRM integration' },
          ].map(r => (
            <div key={r.label} style={{ padding:20, background:'#141414', border:'1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:12 }}>
                <span style={{ fontSize:18 }}>{r.icon}</span>
                <div>
                  <p style={{ fontSize:13, fontWeight:700, color:'rgba(245,240,232,0.6)', margin:0 }}>{r.label}</p>
                  <p style={{ fontSize:11, color:'rgba(245,240,232,0.2)', margin:0 }}>{r.sub}</p>
                </div>
              </div>
              <div style={{ textAlign:'center', padding:'16px 0' }}>
                <TrendingDown style={{ width:24, height:24, color:'rgba(245,240,232,0.1)', margin:'0 auto 6px', display:'block' }} />
                <p style={{ fontSize:12, color:'rgba(245,240,232,0.2)', margin:0 }}>{r.status}</p>
              </div>
            </div>
          ))}
        </div>

        <p style={{ textAlign:'center', fontSize:11, color:'rgba(245,240,232,0.12)', paddingTop:8 }}>
          🔒 Restricted — The Voice of Cash Internal Use Only
        </p>
      </div>
    </div>
  );
}
