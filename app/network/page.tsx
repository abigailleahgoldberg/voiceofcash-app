import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Network | The Voice of Cash',
  description: 'The Voice of Cash media network: faith & culture sites, sports & entertainment properties, AI & business tools, and autism advocacy — all under one roof in Las Vegas.',
  alternates: { canonical: 'https://thevoiceofcash.com/network' },
  openGraph: {
    title: 'Our Network | The Voice of Cash',
    description: 'Explore the full Voice of Cash media network — faith, sports, AI business tools, and advocacy properties.',
    url: 'https://thevoiceofcash.com/network',
    type: 'website',
  },
};

const CATEGORIES = [
  {
    name: 'Faith & Culture',
    emoji: '🕊️',
    color: '#D4AF37',
    sites: [
      {
        name: 'U-God Sacred Texts',
        url: 'https://u-god.com',
        description: 'Sacred texts and comparative religion for 25+ world traditions. The hub of the faith network.',
      },
      {
        name: 'JewSA',
        url: 'https://jewsa.com',
        description: 'Jewish-American pride, culture, humor, and community — where the tribe meets the flag.',
      },
      {
        name: 'RedWhiteJesus',
        url: 'https://redwhitejesus.com',
        description: 'Christian faith and American culture, gifts, and community for believers who love God and country.',
      },
      {
        name: 'AllahICan',
        url: 'https://allahican.com',
        description: 'Islamic perspectives and guidance for modern American Muslims — culture, community, and merch.',
      },
      {
        name: 'HindUSA',
        url: 'https://hindusa.com',
        description: 'Hindu-American pride, dharma, and democracy. Culture, holidays, and community.',
      },
    ],
  },
  {
    name: 'Sports & Entertainment',
    emoji: '⚾',
    color: '#EFB21E',
    sites: [
      {
        name: 'TheLVAthletics.com',
        url: 'https://thelvathletics.com',
        description: 'Deep roster analysis, prospect coverage, and editorial on the Las Vegas Athletics.',
      },
      {
        name: 'TheLVAs.com',
        url: 'https://thelvas.com',
        description: 'Hot takes, fan culture, and bold predictions on Las Vegas Athletics baseball.',
      },
      {
        name: 'LVAthleticsNation.com',
        url: 'https://lvathleticsnation.com',
        description: 'The Las Vegas A\'s fan community: tailgate guides, game day culture, and building something new in the desert.',
      },
      {
        name: 'MMADads',
        url: 'https://mmadads.com',
        description: 'MMA coverage for dads who love combat sports and need to explain it to their kids.',
      },
      {
        name: 'MMAMoms',
        url: 'https://mmamoms.com',
        description: 'MMA from the mom\'s perspective — fighters, families, and the sport we love.',
      },
      {
        name: 'WeBearish',
        url: 'https://webearish.com',
        description: 'Markets, money, and financial commentary from a bearish perspective.',
      },
    ],
  },
  {
    name: 'AI & Business',
    emoji: '🤖',
    color: '#00C896',
    sites: [
      {
        name: 'AISkillsAgents.com',
        url: 'https://aiskillsagents.com',
        description: 'Custom AI agents and automation systems for small businesses. The flagship AI services operation.',
      },
      {
        name: 'ClaudeAISkills.com',
        url: 'https://claudeaiskills.com',
        description: 'Claude tutorials, prompt engineering, and skill-building guides for business users.',
      },
      {
        name: 'AnthropicAISkills.com',
        url: 'https://anthropicaiskills.com',
        description: 'Deep dives on Anthropic models, APIs, and enterprise AI strategy.',
      },
      {
        name: 'AISkillsGenerator.com',
        url: 'https://aiskillsgenerator.com',
        description: 'AI tools and skill templates for rapid business implementation.',
      },
      {
        name: 'SearchPerformanceMarketing.com',
        url: 'https://searchperformancemarketing.com',
        description: 'SEO, paid media, and analytics coverage for performance marketers who want signal over noise.',
      },
    ],
  },
  {
    name: 'Autism & Advocacy',
    emoji: '🧩',
    color: '#7C3AED',
    sites: [
      {
        name: 'AutismAcceptance.world',
        url: 'https://autismacceptance.world',
        description: 'Autism acceptance resources, community, and advocacy for families and self-advocates.',
      },
    ],
  },
];

export default function NetworkPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#0A0A0A', color: '#F5F0E8', fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Nav */}
      <nav style={{ padding: '0 5vw', height: 68, borderBottom: '1px solid rgba(0,200,150,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(10,10,10,0.95)', backdropFilter: 'blur(8px)', position: 'sticky', top: 0, zIndex: 100 }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <img src="/logo.svg" alt="The Voice of Cash" width={28} height={28} style={{ display: 'block' }} />
          <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 18, letterSpacing: '3px', color: '#00C896' }}>THE VOICE OF <span style={{ color: '#F5F0E8' }}>CASH</span></span>
        </a>
        <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          <a href="/" style={{ fontSize: 13, color: 'rgba(245,240,232,0.6)', textDecoration: 'none' }}>Home</a>
          <a href="/blog" style={{ fontSize: 13, color: 'rgba(245,240,232,0.6)', textDecoration: 'none' }}>Blog</a>
          <a href="/network" style={{ fontSize: 13, color: '#00C896', textDecoration: 'none', fontWeight: 600 }}>Our Network</a>
          <a href="/consultation" style={{ background: '#00C896', color: '#0A0A0A', fontSize: 13, fontWeight: 700, padding: '8px 20px', textDecoration: 'none', letterSpacing: '0.5px' }}>Get Started</a>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ padding: '80px 5vw 60px', textAlign: 'center', borderBottom: '1px solid rgba(0,200,150,0.08)' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <div style={{ fontSize: 11, letterSpacing: '3px', fontWeight: 700, color: '#00C896', textTransform: 'uppercase', marginBottom: 16 }}>The Voice of Cash Media Network</div>
          <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(3rem, 8vw, 5.5rem)', lineHeight: 1, letterSpacing: '2px', color: '#F5F0E8', marginBottom: 24 }}>
            OUR<br /><span style={{ color: '#00C896' }}>NETWORK</span>
          </h1>
          <p style={{ fontSize: 18, color: 'rgba(245,240,232,0.6)', lineHeight: 1.7, maxWidth: 560, margin: '0 auto' }}>
            18+ properties spanning faith, sports, AI business tools, and advocacy. All built, owned, and operated by The Voice of Cash.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section style={{ padding: '60px 5vw 80px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          {CATEGORIES.map((cat) => (
            <div key={cat.name} style={{ marginBottom: 60 }}>
              {/* Category header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28, borderBottom: `2px solid ${cat.color}20`, paddingBottom: 16 }}>
                
                <div>
                  <div style={{ fontSize: 11, letterSpacing: '2px', fontWeight: 700, color: cat.color, textTransform: 'uppercase', marginBottom: 2 }}>Category</div>
                  <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', letterSpacing: '1px', color: '#F5F0E8', margin: 0 }}>{cat.name}</h2>
                </div>
              </div>

              {/* Sites grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
                {cat.sites.map((site) => (
                  <a key={site.url} href={site.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block' }}>
                    <div style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: `1px solid ${cat.color}20`,
                      borderRadius: 10,
                      padding: '20px 24px',
                      transition: 'border-color 0.2s, background 0.2s',
                    }}
                    >
                      <div style={{ fontSize: 15, fontWeight: 700, color: cat.color, marginBottom: 8 }}>{site.name}</div>
                      <p style={{ fontSize: 13, color: 'rgba(245,240,232,0.55)', lineHeight: 1.6, margin: 0 }}>{site.description}</p>
                      <div style={{ marginTop: 14, fontSize: 12, color: cat.color, opacity: 0.7 }}>Visit →</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '32px 5vw', borderTop: '1px solid rgba(0,200,150,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <img src="/logo.svg" alt="The Voice of Cash" width={24} height={24} style={{ display: 'block' }} />
          <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 16, letterSpacing: '2px', color: '#00C896' }}>THE VOICE OF <span style={{ color: '#F5F0E8' }}>CASH</span></span>
        </a>
        <p style={{ fontSize: 12, color: 'rgba(245,240,232,0.3)', margin: 0 }}>
          © {new Date().getFullYear()} The Voice of Cash LLC. Las Vegas, NV.
        </p>
      </footer>
    </div>
  );
}
