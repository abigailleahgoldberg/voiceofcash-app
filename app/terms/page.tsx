import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Terms of Service | The Voice of Cash" },
  description: "Terms of Service for The Voice of Cash, AI implementation services, website use, intellectual property, and client agreements.",
};

const SECTIONS = [
  {
    title: "1. Acceptance of Terms",
    body: `By accessing or using thevoiceofcash.com (the "Site") or any services provided by The Voice of Cash LLC ("Company," "we," "us," or "our"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, do not use this Site or our services.

These Terms constitute a legally binding agreement between you and The Voice of Cash LLC, a Nevada limited liability company. We reserve the right to modify these Terms at any time. Continued use of the Site following notice of changes constitutes acceptance.`
  },
  {
    title: "2. Services",
    body: `The Voice of Cash LLC provides AI implementation consulting, autonomous agent programming, process automation, infrastructure hosting, and related technology services to qualifying Las Vegas, Nevada businesses. Service engagements are governed by separate written agreements executed between the Company and each client.

Nothing on this Site constitutes an offer to provide services. Engagement begins only upon execution of a signed service agreement and receipt of any applicable retainer or deposit.`
  },
  {
    title: "3. Intellectual Property, Site Content",
    body: `All content on this Site, including but not limited to text, blog articles, copy, graphics, design elements, layouts, code, frameworks, processes, methodologies, system architectures, agent configurations, workflow designs, and the AI agent operational framework, is the exclusive intellectual property of The Voice of Cash LLC and is protected by United States copyright law, trade secret law, and applicable state and federal laws.

You may not reproduce, republish, distribute, transmit, modify, create derivative works from, sell, or exploit any content from this Site without the express prior written consent of The Voice of Cash LLC. Unauthorized use constitutes copyright infringement and may subject you to civil and criminal penalties.

The Voice of Cash™ and associated agent identities, methodologies, and frameworks are proprietary designations of The Voice of Cash LLC. All rights reserved.`
  },
  {
    title: "4. Intellectual Property, AI Systems & Methodologies",
    body: `The AI agent architectures, autonomous workflow systems, multi-agent operational frameworks, prompt systems, agent role configurations, and implementation methodologies developed by The Voice of Cash LLC constitute proprietary trade secrets and intellectual property.

Any attempt to reverse-engineer, replicate, copy, or derive competitive advantage from the Company's AI systems, operational frameworks, or methodologies, whether encountered through this Site, through a client engagement, or through any other means, is strictly prohibited and will be pursued to the full extent of applicable law.

Client-specific systems developed under service agreements remain the property of the respective client as specified in the applicable service agreement. The Company retains all rights to underlying methodologies, frameworks, and tooling.`
  },
  {
    title: "5. AI Disclosure",
    body: `The Voice of Cash LLC operates an AI-augmented team that includes autonomous AI agents (the "VoC Intelligence Team"). These agents are disclosed transparently on this Site. They are not human employees. They are AI systems purpose-built for specific operational functions.

Content generated with AI assistance is reviewed by human team members before publication. AI agents do not make binding business commitments, all binding decisions, contracts, and client communications are handled by or reviewed by human team members.

Use of AI systems in client engagements will be disclosed in applicable service agreements.`
  },
  {
    title: "6. Prohibited Uses",
    body: `You may not use this Site to: (a) scrape, crawl, or systematically extract content or data; (b) reverse-engineer any system, methodology, or AI architecture; (c) circumvent any security or access control measures; (d) submit false or misleading information through any form; (e) engage in any activity that infringes on the Company's intellectual property rights; (f) use the Site for any unlawful purpose; or (g) attempt to access systems or data beyond what is publicly available on the Site.

Automated access for the purpose of competitive intelligence gathering, model training, or business model replication is expressly prohibited.`
  },
  {
    title: "7. Confidentiality",
    body: `Information shared through consultation requests, contact forms, or client communications is treated as confidential and used solely for the purpose of evaluating and delivering services. The Company does not sell, license, or share client information with third parties except as required by law or with client consent.

Any non-public business information shared by prospective or active clients in connection with a service engagement is treated as confidential regardless of whether a formal NDA is in place.`
  },
  {
    title: "8. Disclaimers",
    body: `The Site and its content are provided "as is" without warranties of any kind, express or implied. The Company does not warrant that the Site will be uninterrupted, error-free, or free of harmful components.

Blog articles and educational content on this Site are provided for informational purposes only and do not constitute professional legal, financial, tax, or technical advice. Results described or referenced are illustrative and not guarantees of future performance.`
  },
  {
    title: "9. Limitation of Liability",
    body: `To the maximum extent permitted by applicable law, The Voice of Cash LLC shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Site or our services. The Company's total liability for any claim arising from use of the Site shall not exceed $100.

Some jurisdictions do not allow limitations on implied warranties or consequential damages, so some of the above limitations may not apply to you.`
  },
  {
    title: "10. Governing Law & Dispute Resolution",
    body: `These Terms are governed by the laws of the State of Nevada, without regard to conflict of law principles. Any dispute arising under these Terms shall be resolved through binding arbitration in Clark County, Nevada, under the rules of the American Arbitration Association, except that either party may seek injunctive relief in a court of competent jurisdiction for intellectual property infringement claims.`
  },
  {
    title: "11. Contact",
    body: `Questions regarding these Terms of Service should be directed to:\n\nThe Voice of Cash LLC\nLas Vegas, Nevada\nthevoiceofcash@gmail.com`
  },
];

export default function TermsPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;700&display=swap');
        :root{--gold:#00C896;--black:#0A0A0A;--charcoal:#141414;--gray:#888;--white:#F5F0E8;}
        *{margin:0;padding:0;box-sizing:border-box;}
        body{background:var(--black);color:var(--white);font-family:'DM Sans',sans-serif;}
        .legal-nav{padding:28px 5vw;border-bottom:1px solid rgba(0,200,150,0.1);display:flex;align-items:center;justify-content:space-between;}
        .legal-logo{font-family:'Bebas Neue',sans-serif;font-size:22px;letter-spacing:3px;color:var(--gold);text-decoration:none;}
        .legal-logo span{color:var(--white);}
        .legal-back{font-size:13px;color:var(--gray);text-decoration:none;letter-spacing:1px;text-transform:uppercase;transition:color 0.3s;}
        .legal-back:hover{color:var(--gold);}
        .legal-wrap{max-width:800px;margin:0 auto;padding:80px 5vw 120px;}
        .legal-label{font-family:'Bebas Neue',sans-serif;font-size:13px;letter-spacing:4px;color:var(--gold);text-transform:uppercase;margin-bottom:12px;}
        .legal-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(36px,5vw,56px);line-height:1;margin-bottom:12px;}
        .legal-updated{font-size:13px;color:var(--gray);margin-bottom:48px;padding-bottom:32px;border-bottom:1px solid rgba(0,200,150,0.1);}
        .legal-section{margin-bottom:40px;}
        .legal-section h2{font-family:'Bebas Neue',sans-serif;font-size:20px;letter-spacing:1px;color:var(--white);margin-bottom:12px;padding-bottom:8px;border-bottom:1px solid rgba(0,200,150,0.08);}
        .legal-section p{font-size:15px;color:#C8C4BC;line-height:1.8;white-space:pre-line;}
        .legal-footer{padding:40px 5vw;border-top:1px solid rgba(0,200,150,0.1);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16;}
        .legal-footer-copy{font-size:13px;color:var(--gray);}
        .legal-footer-links{display:flex;gap:24;}
        .legal-footer-links a{font-size:13px;color:var(--gray);text-decoration:none;transition:color 0.3s;}
        .legal-footer-links a:hover{color:var(--gold);}
      `}</style>
      <nav className="legal-nav">
        <a href="/" className="legal-logo">THE VOICE OF <span>CASH</span></a>
        <a href="/" className="legal-back">← Home</a>
      </nav>
      <div className="legal-wrap">
        <div className="legal-label">Legal</div>
        <h1 className="legal-title">Terms of Service</h1>
        <div className="legal-updated">Last updated: February 2026 · The Voice of Cash LLC · Las Vegas, Nevada</div>
        {SECTIONS.map((s) => (
          <div key={s.title} className="legal-section">
            <h2>{s.title}</h2>
            <p>{s.body}</p>
          </div>
        ))}
      </div>
      <footer className="legal-footer">
        <a href="/" className="legal-logo" style={{fontSize:18}}>THE VOICE OF <span>CASH</span></a>
        <div className="legal-footer-links">
          <a href="/terms">Terms</a>
          <a href="/privacy">Privacy</a>
          <a href="/ip-notice">IP Notice</a>
        </div>
        <span className="legal-footer-copy">© 2026 The Voice of Cash LLC. All rights reserved.</span>
      </footer>
    </>
  );
}
