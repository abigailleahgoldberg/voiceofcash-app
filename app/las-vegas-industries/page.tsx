import type { Metadata } from 'next';
import Link from 'next/link';

export const revalidate = false; // fully static — never revalidate


export const metadata: Metadata = {
  title: 'Industries We Serve — Las Vegas | The Voice of Cash | Las Vegas AI Automation',
  description: 'The Voice of Cash builds AI automation systems for Las Vegas businesses across 25 industries. From hotels to healthcare, real estate to restaurants. Local expertise. Real results.',
  alternates: { canonical: 'https://www.thevoiceofcash.com/las-vegas-industries' },
  openGraph: {
    title: 'Industries We Serve — Las Vegas | The Voice of Cash',
    description: 'AI automation and infrastructure for 25 industries in Las Vegas, Nevada.',
    url: 'https://www.thevoiceofcash.com/las-vegas-industries',
    siteName: 'The Voice of Cash',
    type: 'website',
  },
};

const GOLD = '#00C896';
const BG = '#0A0A0A';
const CARD_BG = '#111';
const BORDER = 'rgba(0,200,150,0.08)';
const BORDER_HOVER = 'rgba(0,200,150,0.25)';

const INDUSTRIES = [
  {
    slug: 'hospitality',
    icon: '🏨',
    name: 'Hospitality & Hotels',
    tagline: 'Guest experience automation at scale.',
    preview: 'Booking follow-ups, concierge AI, review response systems, and post-stay retention. Built for the Strip and beyond.',
    keywords: 'hotel AI automation Las Vegas',
  },
  {
    slug: 'restaurants',
    icon: '🍽️',
    name: 'Restaurants & Food Service',
    tagline: 'From reservation to review, automated.',
    preview: 'Reservation management, review responses, loyalty follow-up, and staff scheduling support. Every location, every shift.',
    keywords: 'restaurant automation Las Vegas',
  },
  {
    slug: 'real-estate',
    icon: '🏠',
    name: 'Real Estate',
    tagline: 'Speed wins in real estate. We build it.',
    preview: 'Lead response in 90 seconds, showing schedulers, drip nurture, CRM automation, and listing promotion. Agents close. We handle the rest.',
    keywords: 'real estate AI automation Las Vegas',
  },
  {
    slug: 'legal',
    icon: '⚖️',
    name: 'Legal Services',
    tagline: 'Every lead deserves a fast response.',
    preview: 'Intake automation, consultation scheduling, follow-up sequences, and reputation management. Grow the caseload without growing the staff.',
    keywords: 'law firm automation Las Vegas',
  },
  {
    slug: 'healthcare',
    icon: '🏥',
    name: 'Healthcare & Medical',
    tagline: 'Patient communication that never sleeps.',
    preview: 'Appointment reminders, intake forms, follow-up sequences, and review generation. HIPAA-conscious automation built for medical practices.',
    keywords: 'healthcare AI automation Las Vegas',
  },
  {
    slug: 'dental',
    icon: '🦷',
    name: 'Dental Practices',
    tagline: 'Full chairs. Fewer no-shows.',
    preview: 'Recall automation, appointment reminders, new patient nurture, and review systems. Built for single practices and DSO groups.',
    keywords: 'dental practice automation Las Vegas',
  },
  {
    slug: 'auto-dealerships',
    icon: '🚗',
    name: 'Auto Dealerships',
    tagline: 'Internet leads answered before the competitor.',
    preview: '90-second lead response, trade-in follow-up, service reminder automation, and reputation management across all platforms.',
    keywords: 'auto dealership automation Las Vegas',
  },
  {
    slug: 'financial-services',
    icon: '💰',
    name: 'Financial Services',
    tagline: 'Compliant automation that builds trust.',
    preview: 'Lead qualification, appointment booking, document follow-up, and client communication systems for advisors, accountants, and planners.',
    keywords: 'financial services automation Las Vegas',
  },
  {
    slug: 'construction',
    icon: '🏗️',
    name: 'Construction & Contractors',
    tagline: 'Win more bids. Chase fewer leads.',
    preview: 'Estimate follow-up, review generation, lead qualification, and project communication automation. Built for general contractors and trades.',
    keywords: 'contractor automation Las Vegas',
  },
  {
    slug: 'retail',
    icon: '🛍️',
    name: 'Retail',
    tagline: 'Every customer interaction, handled.',
    preview: 'Abandoned cart recovery, post-purchase follow-up, loyalty programs, review requests, and inventory alert automation.',
    keywords: 'retail automation Las Vegas',
  },
  {
    slug: 'entertainment-events',
    icon: '🎭',
    name: 'Entertainment & Events',
    tagline: 'The city runs on events. So does our work.',
    preview: 'Ticket follow-up, event reminders, post-event reviews, and sponsor communication automation. Vegas is our home turf.',
    keywords: 'entertainment events automation Las Vegas',
  },
  {
    slug: 'beauty-wellness',
    icon: '💆',
    name: 'Beauty & Wellness',
    tagline: 'Keep the books full. Keep clients coming back.',
    preview: 'Booking reminders, rebooking sequences, review generation, and loyalty follow-up for salons, spas, and wellness centers.',
    keywords: 'salon spa automation Las Vegas',
  },
  {
    slug: 'fitness',
    icon: '💪',
    name: 'Fitness & Gyms',
    tagline: 'Member retention on autopilot.',
    preview: 'Lead follow-up for new memberships, check-in re-engagement for inactive members, class reminders, and renewal automation.',
    keywords: 'gym fitness automation Las Vegas',
  },
  {
    slug: 'insurance',
    icon: '🛡️',
    name: 'Insurance',
    tagline: 'More policies. Less manual follow-up.',
    preview: 'Renewal reminders, lead qualification, cross-sell sequences, and claims follow-up communication. Built for independent agents and agencies.',
    keywords: 'insurance automation Las Vegas',
  },
  {
    slug: 'home-services',
    icon: '🔧',
    name: 'Home Services (HVAC, Plumbing, Electric)',
    tagline: 'First to respond wins the job.',
    preview: 'Lead response in under 90 seconds, estimate follow-up, review requests after every job, and seasonal maintenance reminders.',
    keywords: 'home services HVAC automation Las Vegas',
  },
  {
    slug: 'mortgage-lending',
    icon: '📋',
    name: 'Mortgage & Lending',
    tagline: 'Speed and trust. Both are automatable.',
    preview: 'Lead nurture for long buying cycles, pre-approval follow-up, document request automation, and referral partner communication.',
    keywords: 'mortgage lending automation Las Vegas',
  },
  {
    slug: 'marketing-agencies',
    icon: '📣',
    name: 'Marketing Agencies',
    tagline: 'Build your own AI-powered service layer.',
    preview: 'White-label AI systems for your clients. Lead response, content automation, reporting, and CRM. Add revenue without adding headcount.',
    keywords: 'marketing agency AI Las Vegas white label',
  },
  {
    slug: 'property-management',
    icon: '🏢',
    name: 'Property Management',
    tagline: 'Every tenant, every unit, automated.',
    preview: 'Leasing inquiry response, maintenance request routing, rent reminder sequences, renewal automation, and review management.',
    keywords: 'property management automation Las Vegas',
  },
  {
    slug: 'landscaping',
    icon: '🌿',
    name: 'Landscaping & Lawn Care',
    tagline: 'Recurring revenue on a consistent schedule.',
    preview: 'Estimate follow-up, seasonal upsell campaigns, review requests, and client retention sequences for residential and commercial accounts.',
    keywords: 'landscaping automation Las Vegas',
  },
  {
    slug: 'cleaning-services',
    icon: '✨',
    name: 'Cleaning Services',
    tagline: 'Book more. Chase less.',
    preview: 'Lead qualification, booking confirmation, recurring reminder sequences, review generation, and referral follow-up.',
    keywords: 'cleaning service automation Las Vegas',
  },
  {
    slug: 'moving-companies',
    icon: '📦',
    name: 'Moving Companies',
    tagline: 'Win the quote before the competitor responds.',
    preview: 'Instant quote follow-up, job confirmation sequences, review requests post-move, and repeat customer nurture for storage upsells.',
    keywords: 'moving company automation Las Vegas',
  },
  {
    slug: 'wedding-events',
    icon: '💍',
    name: 'Wedding & Event Planning',
    tagline: 'High-touch service. Automated backend.',
    preview: 'Inquiry response, vendor coordination follow-up, timeline reminders, and review generation. Vegas is the wedding capital. We live here.',
    keywords: 'wedding event planning automation Las Vegas',
  },
  {
    slug: 'photography-video',
    icon: '📷',
    name: 'Photography & Videography',
    tagline: 'Focus on the shoot. We handle the rest.',
    preview: 'Lead qualification, booking confirmation, contract follow-up, gallery delivery reminders, and review generation.',
    keywords: 'photographer videographer automation Las Vegas',
  },
  {
    slug: 'roofing',
    icon: '🏚️',
    name: 'Roofing & Exterior',
    tagline: 'Storm season means surge volume. Be ready.',
    preview: 'Rapid lead response, estimate follow-up, permit status communication, review generation, and referral programs.',
    keywords: 'roofing contractor automation Las Vegas',
  },
  {
    slug: 'ecommerce',
    icon: '🛒',
    name: 'E-commerce',
    tagline: 'Every touchpoint in the customer journey, automated.',
    preview: 'Cart recovery, post-purchase sequences, loyalty programs, review requests, and customer service AI. More revenue from your existing traffic.',
    keywords: 'ecommerce automation Las Vegas',
  },
];

const schemaOrg = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Industries We Serve | The Voice of Cash',
  description: 'AI automation systems for 25 industries in Las Vegas, Nevada.',
  url: 'https://www.thevoiceofcash.com/las-vegas-industries',
  provider: {
    '@type': 'LocalBusiness',
    name: 'The Voice of Cash LLC',
    url: 'https://www.thevoiceofcash.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Las Vegas',
      addressRegion: 'NV',
      addressCountry: 'US',
    },
    areaServed: {
      '@type': 'City',
      name: 'Las Vegas',
      addressRegion: 'NV',
    },
    description: 'AI implementation and automation agency serving Las Vegas businesses across 25 industries.',
  },
};

export default function IndustriesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
      />
      <div style={{ background: BG, minHeight: '100vh', color: '#F5F0E8' }}>

        {/* HERO */}
        <section style={{
          padding: 'clamp(80px,10vw,120px) clamp(20px,6vw,80px) clamp(56px,7vw,80px)',
          maxWidth: 1200,
          margin: '0 auto',
        }}>
          <div style={{ fontSize: 10, letterSpacing: '3px', color: GOLD, marginBottom: 16, fontWeight: 700 }}>LAS VEGAS, NEVADA</div>
          <h1 style={{
            fontSize: 'clamp(40px,6vw,80px)',
            fontWeight: 900,
            lineHeight: 1.0,
            letterSpacing: '-1px',
            marginBottom: 24,
            fontFamily: "'Bebas Neue', sans-serif",
            maxWidth: 900,
          }}>
            25 Industries.<br />
            One AI Infrastructure Team.
          </h1>
          <p style={{ fontSize: 'clamp(16px,2vw,20px)', color: 'rgba(245,240,232,0.6)', maxWidth: 680, lineHeight: 1.75, marginBottom: 40 }}>
            We build AI-orchestrated systems for Las Vegas businesses across every major industry.
            The same infrastructure. Tuned for your operation.
          </p>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <Link href="/consultation" style={{
              display: 'inline-block',
              background: GOLD,
              color: '#0A0A0A',
              fontWeight: 900,
              fontSize: 13,
              padding: '14px 32px',
              textDecoration: 'none',
              letterSpacing: '1.5px',
            }}>
              BOOK A FREE STRATEGY CALL
            </Link>
            <Link href="/services" style={{
              display: 'inline-block',
              background: 'transparent',
              color: GOLD,
              border: `2px solid ${GOLD}44`,
              fontWeight: 800,
              fontSize: 13,
              padding: '14px 32px',
              textDecoration: 'none',
              letterSpacing: '1.5px',
            }}>
              VIEW ALL SERVICES
            </Link>
          </div>
        </section>

        {/* DIVIDER STAT BAR */}
        <div style={{ borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}`, background: 'rgba(0,200,150,0.02)', padding: '24px clamp(20px,6vw,80px)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', gap: 48, flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
            {[
              { val: '25', label: 'Industries served' },
              { val: 'Las Vegas', label: 'Local expertise, local schema, local SEO' },
              { val: '9', label: 'AI agents per full deployment' },
              { val: '90 sec', label: 'Lead response target across all verticals' },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: 'center', flex: '1 1 160px' }}>
                <div style={{ fontSize: 'clamp(22px,3vw,32px)', fontWeight: 900, color: GOLD, fontFamily: "'Bebas Neue', sans-serif" }}>{s.val}</div>
                <div style={{ fontSize: 11, color: 'rgba(245,240,232,0.4)', letterSpacing: '1px', marginTop: 4 }}>{s.label.toUpperCase()}</div>
              </div>
            ))}
          </div>
        </div>

        {/* INDUSTRIES GRID */}
        <section style={{ padding: 'clamp(56px,7vw,80px) clamp(20px,6vw,80px)', maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ fontSize: 10, letterSpacing: '3px', color: GOLD, marginBottom: 12, fontWeight: 700 }}>ALL INDUSTRIES</div>
          <h2 style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 900, marginBottom: 48, fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '-0.5px' }}>
            Find Your Industry
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: 16,
          }}>
            {INDUSTRIES.map((ind) => (
              <Link
                key={ind.slug}
                href={`/industries/${ind.slug}`}
                style={{ textDecoration: 'none' }}
              >
                <div style={{
                  background: CARD_BG,
                  border: `1px solid ${BORDER}`,
                  padding: '28px 24px',
                  height: '100%',
                  transition: 'border-color 0.2s, background 0.2s',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
                    <span style={{ fontSize: 26 }}>{ind.icon}</span>
                    <div style={{ fontSize: 15, fontWeight: 800, color: '#F5F0E8', lineHeight: 1.2 }}>{ind.name}</div>
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: GOLD, letterSpacing: '0.5px' }}>{ind.tagline}</div>
                  <p style={{ fontSize: 13, color: 'rgba(245,240,232,0.45)', lineHeight: 1.7, flexGrow: 1 }}>{ind.preview}</p>
                  <div style={{ fontSize: 11, color: GOLD, letterSpacing: '1px', fontWeight: 700, marginTop: 8 }}>
                    LEARN MORE →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* BOTTOM CTA */}
        <section style={{
          background: 'rgba(0,200,150,0.04)',
          borderTop: `1px solid ${BORDER}`,
          padding: 'clamp(56px,7vw,80px) clamp(20px,6vw,80px)',
          textAlign: 'center',
        }}>
          <div style={{ maxWidth: 700, margin: '0 auto' }}>
            <div style={{ fontSize: 10, letterSpacing: '3px', color: GOLD, marginBottom: 16, fontWeight: 700 }}>DON'T SEE YOUR INDUSTRY?</div>
            <h2 style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 900, marginBottom: 16, fontFamily: "'Bebas Neue', sans-serif" }}>
              We Work With Any Business That Has Leads, Customers, and Operations.
            </h2>
            <p style={{ fontSize: 16, color: 'rgba(245,240,232,0.55)', lineHeight: 1.75, marginBottom: 36 }}>
              If your business has a phone, an inbox, a CRM, or a customer, we can automate something that matters.
              Book a free strategy call and we will tell you exactly where the opportunity is.
            </p>
            <Link href="/consultation" style={{
              display: 'inline-block',
              background: GOLD,
              color: '#0A0A0A',
              fontWeight: 900,
              fontSize: 14,
              padding: '16px 40px',
              textDecoration: 'none',
              letterSpacing: '1.5px',
            }}>
              BOOK FREE STRATEGY CALL
            </Link>
          </div>
        </section>

      </div>
    </>
  );
}

// Sun Mar  1 06:53:03 PM PST 2026
