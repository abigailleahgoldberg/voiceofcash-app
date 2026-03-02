"use client";
export default function VocFooter() {
  const G = '#00C896';
  const social = [
    { name:'LinkedIn', url:'https://linkedin.com/company/thevoiceofcash', icon:'in' },
    { name:'X',        url:'https://x.com/thevoiceofcash',                icon:'𝕏' },
    { name:'Facebook', url:'https://facebook.com/thevoiceofcash',          icon:'f' },
    { name:'Instagram',url:'https://instagram.com/thevoiceofcash',         icon:'◎' },
    { name:'TikTok',   url:'https://tiktok.com/@thevoiceofcash',           icon:'♪' },
    { name:'YouTube',  url:'https://youtube.com/@thevoiceofcash',          icon:'♫' },
  ];
  return (
    <footer style={{ background:'#0A0A0A', borderTop:'1px solid rgba(0,200,150,0.1)', padding:'48px 5vw 32px', fontFamily:'system-ui,sans-serif' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:24, marginBottom:32 }}>
        <a href="/" style={{ display:'flex', alignItems:'center', gap:10, textDecoration:'none', fontSize:18, fontWeight:900, color:'#F5F0E8', letterSpacing:'1px' }}>
          <img src="/logo.svg" alt="The Voice of Cash" width={26} height={26} style={{ display:'block' }} />
          THE VOICE OF <span style={{ color:G, marginLeft:5 }}>CASH</span>
        </a>
        <div style={{ display:'flex', gap:10 }}>
          {social.map(s => (
            <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" title={s.name}
              style={{ width:42, height:42, display:'flex', alignItems:'center', justifyContent:'center', border:'1px solid rgba(255,255,255,0.1)', color:'rgba(136,136,136,0.8)', textDecoration:'none', fontSize:15, fontWeight:700, transition:'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor='#D4AF37'; e.currentTarget.style.color='#D4AF37'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(255,255,255,0.1)'; e.currentTarget.style.color='rgba(136,136,136,0.8)'; }}>
              {s.icon}
            </a>
          ))}
        </div>
      </div>
      <div style={{ borderTop:'1px solid rgba(0,200,150,0.06)', paddingTop:24, display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:16 }}>
        <div style={{ fontSize:13, color:'rgba(136,136,136,0.6)' }}>
          &copy; {new Date().getFullYear()} The Voice of Cash LLC. All rights reserved. Las Vegas, NV.
        </div>
        <div style={{ display:'flex', gap:24, flexWrap:'wrap' }}>
          {[['Terms of Service','/terms'],['Privacy Policy','/privacy'],['IP Notice','/ip-notice']].map(([label,href]) => (
            <a key={href} href={href} style={{ fontSize:12, color:'rgba(136,136,136,0.6)', textDecoration:'none', letterSpacing:'0.5px' }}
              onMouseEnter={e => (e.currentTarget.style.color = G)}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(136,136,136,0.6)')}>
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
