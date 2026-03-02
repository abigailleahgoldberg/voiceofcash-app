import { notFound } from "next/navigation";
import { posts, getPost, getRelatedPosts } from "../data";
import type { Metadata } from "next";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: { absolute: post.seoTitle },
    description: post.seoDescription,
    openGraph: {
      images: [{ url: 'https://thevoiceofcash.com/og-image.png', width: 1200, height: 630 }], title: post.seoTitle, description: post.seoDescription, type: "article" },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const related = getRelatedPosts(slug, 3);

  const paragraphs = post.content.split("\n\n").filter(Boolean);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400&display=swap');
        :root { --gold:#00ffcc;--black:#0A0A0A;--charcoal:#141414;--gray:#888;--white:#F5F0E8; }
        *{margin:0;padding:0;box-sizing:border-box;}
        body{background:var(--black);color:var(--white);font-family:'DM Sans',sans-serif;}
        .post-nav{padding:28px 5vw;border-bottom:1px solid rgba(0,255,204,0.1);display:flex;align-items:center;justify-content:space-between;}
        .post-logo{font-family:'Bebas Neue',sans-serif;font-size:22px;letter-spacing:3px;color:var(--gold);text-decoration:none;}
        .post-logo span{color:var(--white);}
        .post-back{font-size:13px;color:var(--gray);text-decoration:none;letter-spacing:1px;text-transform:uppercase;transition:color 0.3s;}
        .post-back:hover{color:var(--gold);}
        .post-hero{padding:80px 5vw 60px;max-width:800px;}
        .post-breadcrumb{font-size:12px;color:var(--gray);margin-bottom:24px;}
        .post-breadcrumb a{color:var(--gray);text-decoration:none;}
        .post-breadcrumb a:hover{color:var(--gold);}
        .post-meta{display:flex;gap:16px;align-items:center;flex-wrap:wrap;margin-bottom:24px;}
        .post-cat{font-size:11px;letter-spacing:2px;text-transform:uppercase;color:var(--gold);background:rgba(0,255,204,0.08);border:1px solid rgba(0,255,204,0.2);padding:4px 12px;}
        .post-date{font-size:12px;color:var(--gray);}
        .post-read{font-size:12px;color:var(--gray);}
        .post-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(32px,5vw,60px);line-height:1.05;margin-bottom:20px;}
        .post-excerpt{font-size:18px;color:var(--gray);line-height:1.7;padding-bottom:40px;border-bottom:1px solid rgba(0,255,204,0.1);}
        .post-body{padding:60px 5vw 60px;max-width:800px;}
        .post-body p{font-size:17px;line-height:1.85;color:#C8C4BC;margin-bottom:24px;}
        .post-body strong{color:var(--white);}
        .post-body h2{font-family:'Bebas Neue',sans-serif;font-size:28px;letter-spacing:1px;color:var(--white);margin:40px 0 16px;}
        .post-cta{margin:60px 5vw;padding:48px;border:1px solid rgba(0,255,204,0.2);background:rgba(0,255,204,0.03);}
        .post-cta h3{font-family:'Bebas Neue',sans-serif;font-size:28px;margin-bottom:12px;}
        .post-cta p{font-size:15px;color:var(--gray);line-height:1.7;margin-bottom:24px;}
        .post-cta a{display:inline-flex;align-items:center;gap:8px;background:var(--gold);color:var(--black);font-family:'Bebas Neue',sans-serif;font-size:16px;letter-spacing:2px;padding:14px 32px;text-decoration:none;transition:all 0.3s;}
        .post-cta a:hover{background:#80ffe6;transform:translateY(-2px);}
        .post-related{padding:0 5vw 80px;}
        .post-related-label{font-family:'Bebas Neue',sans-serif;font-size:12px;letter-spacing:4px;color:var(--gray);text-transform:uppercase;margin-bottom:32px;}
        .post-related-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;}
        .post-related-card{border:1px solid rgba(0,255,204,0.08);padding:28px;transition:border-color 0.3s;}
        .post-related-card:hover{border-color:rgba(0,255,204,0.2);}
        .post-related-title{font-family:'Bebas Neue',sans-serif;font-size:18px;line-height:1.1;margin:10px 0 8px;}
        .post-related-title a{color:var(--white);text-decoration:none;transition:color 0.3s;}
        .post-related-title a:hover{color:var(--gold);}
        .post-related-excerpt{font-size:13px;color:var(--gray);line-height:1.6;}
        @media(max-width:700px){.post-related-grid{grid-template-columns:1fr;}}
      `}</style>


      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "BlogPosting",
              "headline": post.title,
              "description": post.seoDescription,
              "datePublished": post.date,
              "dateModified": post.date,
              "author": {
                "@type": "Person",
                "name": "Cash Colligan",
                "url": "https://thevoiceofcash.com/#person"
              },
              "publisher": {
                "@type": "Organization",
                "name": "The Voice of Cash",
                "url": "https://thevoiceofcash.com"
              },
              "url": `https://thevoiceofcash.com/blog/${post.slug}`,
              "mainEntityOfPage": `https://thevoiceofcash.com/blog/${post.slug}`
            },
            {
              "@type": "BreadcrumbList",
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://thevoiceofcash.com" },
                { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://thevoiceofcash.com/blog" },
                { "@type": "ListItem", "position": 3, "name": post.title, "item": `https://thevoiceofcash.com/blog/${post.slug}` }
              ]
            }
          ]
        }) }}
      />

      <nav className="post-nav">
        <a href="/" className="post-logo" style={{display:"flex",alignItems:"center",gap:10}}><img src="/logo.svg" alt="logo" width={28} height={28} style={{display:"block"}} /><span>THE VOICE OF <span>CASH</span></span></a>
        <a href="/blog" className="post-back">← All Articles</a>
      </nav>

      <div className="post-hero">
        <div className="post-breadcrumb">
          <a href="/">Home</a> / <a href="/blog">Blog</a> / {post.title}
        </div>
        <div className="post-meta">
          <span className="post-cat">{post.category}</span>
          <span className="post-date">{post.date}</span>
          <span className="post-read">{post.readTime}</span>
        </div>
        <h1 className="post-title">{post.title}</h1>
        <p className="post-excerpt">{post.excerpt}</p>
      </div>

      <div className="post-body">
        {paragraphs.map((para, i) => {
          const isMidPoint = i === Math.floor(paragraphs.length / 2);
          const isHeading = para.startsWith("**") && para.endsWith("**");
          const html = para
            .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
            .replace(/\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" style="color:#00C896;text-decoration:underline;text-underline-offset:3px;">$1</a>');
          return (
            <>
              {isMidPoint && (
                <div key={`cta-mid-${i}`} style={{margin:"40px 0",padding:"28px 32px",background:"rgba(0,200,150,0.04)",borderLeft:"3px solid #00C896",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:16}}>
                  <div>
                    <div style={{fontSize:13,fontWeight:900,color:"#00C896",letterSpacing:"1px",textTransform:"uppercase",marginBottom:6}}>Las Vegas Businesses</div>
                    <div style={{fontSize:16,fontWeight:700,color:"#F5F0E8"}}>Ready to implement this for your business?</div>
                  </div>
                  <a href="/consultation" style={{background:"#00C896",color:"#0A0A0A",fontWeight:900,fontSize:13,letterSpacing:"1.5px",textTransform:"uppercase",padding:"12px 24px",textDecoration:"none",whiteSpace:"nowrap"}}>Book a Free Consultation →</a>
                </div>
              )}
              {isHeading
                ? <h2 key={i}>{para.replace(/\*\*/g, "")}</h2>
                : <p key={i} dangerouslySetInnerHTML={{ __html: html }} />
              }
            </>
          );
        })}
      </div>

      <div className="post-cta">
        <h3>Ready to Implement This in Your Business?</h3>
        <p>We work exclusively with Las Vegas businesses. Book a free consultation and we&apos;ll map out exactly where to start — no obligation.</p>
        <a href="/consultation">Book a Free Consultation →</a>
      </div>

      <div className="post-related">
        <div className="post-related-label">More Articles</div>
        <div className="post-related-grid">
          {related.map((r) => (
            <div key={r.slug} className="post-related-card">
              <span className="post-cat" style={{fontSize:10}}>{r.category}</span>
              <div className="post-related-title"><a href={`/blog/${r.slug}`}>{r.title}</a></div>
              <p className="post-related-excerpt">{r.excerpt}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
