import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Tools We Actually Use | The Voice of Cash',
  description: 'The exact AI tools and software stack The Voice of Cash uses to build, automate, and operate client systems. No fluff — just what works.',
  alternates: { canonical: 'https://www.thevoiceofcash.com/tools' },
}

const tools = [
  { category: 'Automation', items: [
    { name: 'Zapier', desc: 'Connect any two apps without code. Our go-to for quick workflow automation between client tools.', use: 'Client onboarding flows, notification routing, CRM sync', link: 'https://zapier.com/?utm_source=thevoiceofcash', price: 'Free tier available' },
    { name: 'Make (Integromat)', desc: 'Visual multi-step automation builder. More powerful than Zapier for complex workflows.', use: 'Multi-step automations, data transformation, complex routing', link: 'https://www.make.com/?utm_source=thevoiceofcash', price: 'Free tier available' },
  ]},
  { category: 'AI Writing & Content', items: [
    { name: 'Jasper AI', desc: 'AI writing trained for marketing copy and business content. Faster than starting from scratch.', use: 'Blog drafts, email sequences, ad copy starting points', link: 'https://www.jasper.ai/?utm_source=thevoiceofcash', price: 'From $39/mo' },
    { name: 'Claude (Anthropic)', desc: 'Our primary AI model for complex reasoning, coding, analysis, and long-form work.', use: 'Agent development, content strategy, technical writing', link: 'https://claude.ai', price: 'Free + Pro available' },
  ]},
  { category: 'Project & Operations', items: [
    { name: 'Notion', desc: 'All-in-one workspace for docs, wikis, databases, and project tracking. The backbone of how we organize client work.', use: 'SOPs, client wikis, project management, content calendars', link: 'https://www.notion.so/?utm_source=thevoiceofcash', price: 'Free tier available' },
    { name: 'Monday.com', desc: 'Visual project and operations management for teams running multiple client engagements simultaneously.', use: 'Client project tracking, team assignments, delivery timelines', link: 'https://monday.com/?utm_source=thevoiceofcash', price: 'From $9/seat/mo' },
  ]},
  { category: 'Communication & Delivery', items: [
    { name: 'Loom', desc: 'Async video messaging. We use it for client walkthroughs, system demos, and internal handoffs.', use: 'Client onboarding videos, feature walkthroughs, async updates', link: 'https://www.loom.com/?utm_source=thevoiceofcash', price: 'Free tier available' },
    { name: 'Slack', desc: 'Real-time team and client communication. Every active client gets their own Slack channel.', use: 'Client communication, internal team coordination', link: 'https://slack.com/?utm_source=thevoiceofcash', price: 'Free tier available' },
  ]},
  { category: 'Development & Deployment', items: [
    { name: 'Vercel', desc: 'Where we deploy every client web project. Instant deployments, global edge network, zero config.', use: 'All client web deployments, preview environments', link: 'https://vercel.com/?utm_source=thevoiceofcash', price: 'Free tier available' },
    { name: 'Supabase', desc: 'Open-source Firebase alternative. We use it for client databases, auth, and real-time features.', use: 'Client CRM backends, form data, user authentication', link: 'https://supabase.com/?utm_source=thevoiceofcash', price: 'Free tier available' },
  ]},
]

export default function ToolsPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#050508', color: '#fff', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ padding: '72px 5vw 56px', maxWidth: 900, margin: '0 auto', textAlign: 'center', borderBottom: '1px solid rgba(0,200,150,0.1)' }}>
        <div style={{ fontSize: 12, letterSpacing: '3px', color: '#00C896', fontWeight: 700, marginBottom: 20 }}>OUR STACK</div>
        <h1 style={{ fontSize: 'clamp(32px,5vw,56px)', fontWeight: 900, margin: '0 0 20px', letterSpacing: '-1.5px', lineHeight: 1.1 }}>
          The AI Tools We Actually Use
        </h1>
        <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.45)', maxWidth: 540, margin: '0 auto', lineHeight: 1.7 }}>
          No sponsored placements. No tools we do not use in production. This is the exact stack behind every client system we build.
        </p>
        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.2)', marginTop: 16 }}>
          Some links are affiliate links. We only list tools we actually use.
        </p>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '56px 5vw' }}>
        {tools.map(section => (
          <div key={section.category} style={{ marginBottom: 48 }}>
            <h2 style={{ fontSize: 14, letterSpacing: '2px', color: '#00C896', fontWeight: 700, marginBottom: 24, textTransform: 'uppercase' }}>{section.category}</h2>
            <div style={{ display: 'grid', gap: 16 }}>
              {section.items.map(tool => (
                <a key={tool.name} href={tool.link} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'block', border: '1px solid rgba(0,200,150,0.15)', padding: '28px', background: 'rgba(0,200,150,0.03)', textDecoration: 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10, flexWrap: 'wrap', gap: 8 }}>
                    <span style={{ fontSize: 18, fontWeight: 800, color: '#fff' }}>{tool.name}</span>
                    <span style={{ fontSize: 12, color: '#00C896', fontWeight: 600 }}>{tool.price}</span>
                  </div>
                  <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 14, lineHeight: 1.6, margin: '0 0 12px' }}>{tool.desc}</p>
                  <p style={{ color: 'rgba(0,200,150,0.6)', fontSize: 12, margin: 0 }}>How we use it: {tool.use}</p>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div style={{ background: 'rgba(0,200,150,0.08)', borderTop: '1px solid rgba(0,200,150,0.15)', padding: '56px 5vw', textAlign: 'center' }}>
        <h2 style={{ fontSize: 26, fontWeight: 900, marginBottom: 12 }}>Want us to build your stack?</h2>
        <p style={{ color: 'rgba(255,255,255,0.45)', marginBottom: 28, fontSize: 15 }}>We do not just recommend tools. We implement them, wire them together, and make sure they actually work for your business.</p>
        <a href="/consultation" style={{ display: 'inline-block', background: '#00C896', color: '#050508', fontWeight: 900, fontSize: 14, padding: '16px 40px', textDecoration: 'none', letterSpacing: '1px' }}>
          BOOK A FREE CONSULTATION
        </a>
      </div>
    </div>
  )
}

