import Link from "next/link";
import { posts } from "./data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Blog | The Voice of Cash: AI and Automation Insights" },
  description: "42 practical guides on AI implementation, business automation, and agentic AI for Las Vegas businesses. Written by Cash Colligan.",
  openGraph: {
    title: "Blog | The Voice of Cash: AI and Automation Insights",
    description: "42 practical guides on AI implementation, business automation, and agentic AI for Las Vegas businesses.",
    images: [{ url: "https://thevoiceofcash.com/og-image.png", width: 1200, height: 630 }],
  },
};

const CATEGORIES = ["All", "AI Strategy", "Getting Started", "Implementation", "Industry Spotlight", "Claude & AI Tools"];

export default function BlogPage() {
  const sorted = [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;700;900&display=swap');
        :root{--gold:#00C896;--black:#0A0A0A;--charcoal:#141414;--gray:#888;--white:#F5F0E8;}
        *{margin:0;padding:0;box-sizing:border-box;}
        body{background:var(--black);color:var(--white);font-family:'DM Sans',sans-serif;}
        .blog-nav{padding:28px 5vw;border-bottom:1px solid rgba(0,200,150,0.1);display:flex;align-items:center;justify-content:space-between;}
        .blog-logo{font-family:'Bebas Neue',sans-serif;font-size:22px;letter-spacing:3px;color:var(--gold);text-decoration:none;}
        .blog-logo span{color:var(--white);}
        .blog-hero{padding:72px 5vw 48px;max-width:1200px;margin:0 auto;}
        .blog-label{font-size:11px;font-weight:900;letter-spacing:3px;text-transform:uppercase;color:var(--gold);margin-bottom:16px;}
        .blog-h1{font-family:'Bebas Neue',sans-serif;font-size:clamp(48px,7vw,80px);letter-spacing:-1px;line-height:1.0;margin-bottom:16px;}
        .blog-sub{font-size:17px;color:var(--gray);line-height:1.7;max-width:560px;}
        .blog-cats{display:flex;gap:8px;flex-wrap:wrap;padding:0 5vw 40px;max-width:1200px;margin:0 auto;}
        .blog-cat-btn{font-size:11px;font-weight:900;letter-spacing:1.5px;text-transform:uppercase;padding:8px 18px;border:1px solid rgba(0,200,150,0.15);color:rgba(245,240,232,0.5);background:transparent;cursor:pointer;text-decoration:none;transition:all 0.2s;}
        .blog-cat-btn:hover,.blog-cat-btn.active{border-color:var(--gold);color:var(--gold);background:rgba(0,200,150,0.06);}
        .blog-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:rgba(0,200,150,0.06);max-width:1200px;margin:0 auto;padding:0 5vw 80px;}
        .blog-card{background:var(--black);padding:32px 28px;transition:background 0.3s;}
        .blog-card:hover{background:#0F0F0F;}
        .blog-card-cat{font-size:10px;font-weight:900;letter-spacing:2px;text-transform:uppercase;color:var(--gold);margin-bottom:12px;}
        .blog-card-title{font-family:'Bebas Neue',sans-serif;font-size:22px;line-height:1.1;margin-bottom:12px;}
        .blog-card-title a{color:var(--white);text-decoration:none;transition:color 0.3s;}
        .blog-card-title a:hover{color:var(--gold);}
        .blog-card-excerpt{font-size:13px;color:var(--gray);line-height:1.65;margin-bottom:20px;}
        .blog-card-meta{display:flex;justify-content:space-between;align-items:center;font-size:11px;color:rgba(245,240,232,0.25);font-weight:700;}
        .blog-card-read{color:var(--gold);font-size:11px;font-weight:900;letter-spacing:1px;text-decoration:none;text-transform:uppercase;}
        @media(max-width:860px){.blog-grid{grid-template-columns:1fr 1fr;}}
        @media(max-width:540px){.blog-grid{grid-template-columns:1fr;}}
      `}</style>

      <nav className="blog-nav">
        <a href="/" className="blog-logo" style={{display:"flex",alignItems:"center",gap:10}}><img src="/logo.svg" alt="logo" width={28} height={28} style={{display:"block"}} /><span>THE VOICE OF <span>CASH</span></span></a>
        <a href="/consultation" style={{fontSize:13,fontWeight:900,color:"#0A0A0A",letterSpacing:"1.5px",textTransform:"uppercase",padding:"10px 20px",background:"#00C896",textDecoration:"none"}}>Book Consultation</a>
      </nav>

      <div className="blog-hero">
        <div className="blog-label">Knowledge Base</div>
        <h1 className="blog-h1">AI That<br /><span style={{color:"var(--gold)"}}>Actually Works.</span></h1>
        <p className="blog-sub">42 practical guides on AI implementation, automation, and agentic systems. Written for Las Vegas business owners who want results, not hype.</p>
      </div>

      {/* Category filter */}
      <div className="blog-cats">
        {CATEGORIES.map(cat => (
          <a key={cat} href={cat === "All" ? "/blog" : `/blog?cat=${encodeURIComponent(cat)}`} className="blog-cat-btn">{cat}</a>
        ))}
      </div>

      {/* Cornerstone callout */}
      <div style={{maxWidth:1200,margin:"0 auto",padding:"0 5vw 48px"}}>
        <div style={{background:"rgba(0,200,150,0.04)",border:"1px solid rgba(0,200,150,0.12)",padding:"24px 28px",display:"flex",gap:32,alignItems:"center",flexWrap:"wrap"}}>
          <div style={{fontSize:11,fontWeight:900,color:"#00C896",letterSpacing:"2px",textTransform:"uppercase",whiteSpace:"nowrap"}}>Start Here</div>
          <div style={{display:"flex",gap:24,flexWrap:"wrap"}}>
            {[
              {slug:"why-ai-tools-keep-failing",label:"Why AI Tools Fail"},
              {slug:"ai-agent-roi-measurement",label:"Measuring AI ROI"},
              {slug:"choosing-ai-implementation-partner",label:"Choosing a Partner"},
            ].map(p=>(
              <Link key={p.slug} href={`/blog/${p.slug}`} style={{fontSize:13,fontWeight:900,color:"rgba(245,240,232,0.7)",textDecoration:"none",borderBottom:"1px solid rgba(245,240,232,0.15)",paddingBottom:2}}>
                {p.label} →
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="blog-grid">
        {sorted.map(post => (
          <div key={post.slug} className="blog-card">
            <div className="blog-card-cat">{post.category}</div>
            <div className="blog-card-title"><a href={`/blog/${post.slug}`}>{post.title}</a></div>
            <p className="blog-card-excerpt">{post.excerpt}</p>
            <div className="blog-card-meta">
              <span>{post.date}</span>
              <a href={`/blog/${post.slug}`} className="blog-card-read">{post.readTime} →</a>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
