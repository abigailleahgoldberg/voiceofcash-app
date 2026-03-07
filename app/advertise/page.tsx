import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Advertise With Us | The Voice of Cash',
  description: 'Partner with The Voice of Cash. Reach Las Vegas business owners, entrepreneurs, and AI-forward decision makers through sponsored content and editorial partnerships.',
  robots: 'noindex',
}

const stats = [
  { label: 'Primary Audience', value: 'Las Vegas Business Owners' },
  { label: 'Content Focus', value: 'AI, Automation & Business Growth' },
  { label: 'Site Authority', value: 'Growing — Est. 2025' },
  { label: 'Content Pages', value: '50+ and expanding monthly' },
]

const options = [
  {
    name: 'Sponsored Post',
    price: '$400',
    desc: 'A full editorial article published on our blog. Written by our team or yours. Includes one dofollow link to your target URL. Permanent placement.',
    includes: ['800-1,200 word article', '1 dofollow backlink', 'Social amplification', 'Permanent indexing'],
  },
  {
    name: 'Link Insertion',
    price: '$200',
    desc: 'A contextual link added to an existing high-performing article on our site. Fast turnaround, permanent placement.',
    includes: ['Link in existing content', '1 dofollow backlink', 'Relevant anchor text', 'Permanent placement'],
  },
  {
    name: 'Brand Partnership',
    price: 'Custom',
    desc: 'Ongoing content partnerships, co-branded guides, or multi-link packages for agencies running sustained campaigns.',
    includes: ['Custom content plan', 'Multiple placements', 'Agency volume pricing', 'Dedicated point of contact'],
  },
]

export default function AdvertisePage() {
  return (
    <div style={{ minHeight: '100vh', background: '#050508', color: '#fff', fontFamily: 'system-ui, sans-serif' }}>
      {/* Header */}
      <div style={{ borderBottom: '1px solid rgba(0,200,150,0.2)', padding: '72px 5vw 64px', maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
        <div style={{ fontSize: 12, letterSpacing: '3px', color: '#00C896', fontWeight: 700, marginBottom: 20 }}>PARTNERSHIPS</div>
        <h1 style={{ fontSize: 'clamp(36px,5vw,60px)', fontWeight: 900, margin: '0 0 20px', letterSpacing: '-1.5px', lineHeight: 1.1 }}>
          Advertise With<br />The Voice of Cash
        </h1>
        <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.5)', maxWidth: 560, margin: '0 auto', lineHeight: 1.7 }}>
          Reach Las Vegas business owners and AI-forward entrepreneurs through editorial content partnerships that actually rank.
        </p>
      </div>

      {/* Stats */}
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '56px 5vw', display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: 1, background: 'rgba(0,200,150,0.05)', border: '1px solid rgba(0,200,150,0.15)' }}>
        {stats.map(s => (
          <div key={s.label} style={{ padding: '28px 24px', borderRight: '1px solid rgba(0,200,150,0.1)' }}>
            <div style={{ fontSize: 13, color: '#00C896', fontWeight: 700, marginBottom: 8, letterSpacing: '1px' }}>{s.label.toUpperCase()}</div>
            <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.8)', fontWeight: 600 }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Options */}
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '64px 5vw' }}>
        <h2 style={{ fontSize: 32, fontWeight: 900, marginBottom: 40, letterSpacing: '-1px' }}>Partnership Options</h2>
        <div style={{ display: 'grid', gap: 24 }}>
          {options.map(o => (
            <div key={o.name} style={{ border: '1px solid rgba(0,200,150,0.2)', padding: '36px', background: 'rgba(0,200,150,0.03)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16, flexWrap: 'wrap', gap: 12 }}>
                <h3 style={{ fontSize: 22, fontWeight: 800, margin: 0 }}>{o.name}</h3>
                <span style={{ fontSize: 28, fontWeight: 900, color: '#00C896' }}>{o.price}</span>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, marginBottom: 20 }}>{o.desc}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {o.includes.map(i => (
                  <span key={i} style={{ fontSize: 12, padding: '6px 12px', background: 'rgba(0,200,150,0.1)', color: '#00C896', fontWeight: 600 }}>{i}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Guidelines */}
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 5vw 64px' }}>
        <h2 style={{ fontSize: 24, fontWeight: 900, marginBottom: 24, letterSpacing: '-0.5px' }}>Editorial Guidelines</h2>
        <div style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.9, fontSize: 15 }}>
          <p>We accept partnerships in: AI, automation, software, business tools, marketing, finance, local Las Vegas businesses, and adjacent categories.</p>
          <p>We do not accept: gambling, adult content, payday lending, crypto pump schemes, or anything we would not recommend to a client.</p>
          <p>All content is reviewed by our editorial team. We reserve the right to decline any partnership that does not fit our audience.</p>
        </div>
      </div>

      {/* CTA */}
      <div style={{ background: 'rgba(0,200,150,0.08)', borderTop: '1px solid rgba(0,200,150,0.2)', padding: '64px 5vw', textAlign: 'center' }}>
        <h2 style={{ fontSize: 32, fontWeight: 900, marginBottom: 16 }}>Ready to Partner?</h2>
        <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: 36, fontSize: 16 }}>Email us with your target URL, preferred option, and a brief description of your site.</p>
        <a href="mailto:hello@thevoiceofcash.com?subject=Advertising%20Partnership%20Inquiry"
          style={{ display: 'inline-block', background: '#00C896', color: '#050508', fontWeight: 900, fontSize: 15, padding: '18px 48px', textDecoration: 'none', letterSpacing: '1px' }}>
          EMAIL US TO GET STARTED
        </a>
        <p style={{ marginTop: 20, color: 'rgba(255,255,255,0.3)', fontSize: 13 }}>Typical response time: 24-48 hours</p>
      </div>
    </div>
  )
}
