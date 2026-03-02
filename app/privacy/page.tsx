import type { Metadata } from "next";
export const metadata: Metadata = {
  title: { absolute: "Privacy Policy | The Voice of Cash" },
  description: "Privacy Policy for The Voice of Cash, how we collect, use, and protect your information.",
};

const SECTIONS = [
  { title: "1. Information We Collect", body: `We collect information you provide directly when you:\n\n• Submit a consultation request (name, business name, email, phone, and questionnaire responses)\n• Contact us via email\n• Subscribe to receive content\n\nWe may also collect standard web analytics data (page views, session duration, referral source) through analytics tools to understand how visitors use the Site. This data is aggregated and not personally identifiable.\n\nWe do not use tracking cookies for advertising or sell visitor data to any third party.` },
  { title: "2. How We Use Your Information", body: `Information collected through consultation forms and contact submissions is used solely to:\n\n• Evaluate your inquiry and determine whether our services are a fit\n• Schedule and conduct consultations\n• Communicate with you about our services\n• Deliver requested content (guides, resources)\n\nWe do not use your information for automated decision-making that produces legal or similarly significant effects without human review.` },
  { title: "3. AI Processing Disclosure", body: `The Voice of Cash operates autonomous AI agents that assist with business operations, including initial review of consultation requests. If your submitted information is reviewed or processed by an AI agent, it is subsequently reviewed by a human team member before any substantive response or engagement decision is made.\n\nYour information is not used to train external AI models. It is not shared with AI providers beyond what is necessary to operate our internal systems, and any such sharing is governed by applicable data processing agreements.` },
  { title: "4. Data Sharing", body: `We do not sell, rent, or license your personal information.\n\nWe may share your information with:\n• Service providers who assist in delivering our services (email, scheduling, infrastructure) under confidentiality obligations\n• Law enforcement or regulatory authorities when required by law\n• Professional advisors (attorneys, accountants) under confidentiality obligations\n\nAll third-party service providers are required to protect your information consistent with this policy.` },
  { title: "5. Data Security", body: `We implement reasonable technical and organizational measures to protect your information against unauthorized access, disclosure, or destruction. These include encrypted data transmission (HTTPS), access controls on internal systems, and regular security monitoring by our cybersecurity team.\n\nNo method of transmission over the internet is 100% secure. We cannot guarantee absolute security, but we take the protection of your information seriously and will notify you of any breach affecting your personal data as required by applicable law.` },
  { title: "6. Data Retention", body: `We retain consultation and contact information for as long as necessary to deliver services and maintain business records, typically no more than 3 years following the conclusion of a client relationship or the last contact from a prospective client.\n\nYou may request deletion of your information at any time by contacting us at thevoiceofcash@gmail.com. We will respond within 30 days.` },
  { title: "7. Your Rights", body: `Depending on your jurisdiction, you may have the right to:\n• Access the personal information we hold about you\n• Correct inaccurate information\n• Request deletion of your information\n• Object to or restrict certain processing\n• Data portability\n\nTo exercise any of these rights, contact us at thevoiceofcash@gmail.com. We will respond within 30 days.` },
  { title: "8. Cookies", body: `This Site uses minimal cookies necessary for basic site functionality. We do not use advertising cookies, tracking pixels, or cross-site tracking technologies. You may disable cookies in your browser settings without affecting your ability to use the Site.` },
  { title: "9. Children's Privacy", body: `This Site is not directed at children under 13 years of age. We do not knowingly collect personal information from children under 13. If you believe a child has submitted information to us, please contact us and we will promptly delete it.` },
  { title: "10. Changes to This Policy", body: `We may update this Privacy Policy from time to time. We will post the updated policy on this page with a revised "Last Updated" date. Continued use of the Site following changes constitutes acceptance of the updated policy.` },
  { title: "11. Contact", body: `Privacy questions, requests, or concerns:\n\nThe Voice of Cash LLC\nLas Vegas, Nevada\nthevoiceofcash@gmail.com` },
];

export default function PrivacyPage() {
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
        <h1 className="legal-title">Privacy Policy</h1>
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
          <a href="/terms">Terms</a><a href="/privacy">Privacy</a><a href="/ip-notice">IP Notice</a>
        </div>
        <span className="legal-footer-copy">© 2026 The Voice of Cash LLC. All rights reserved.</span>
      </footer>
    </>
  );
}
