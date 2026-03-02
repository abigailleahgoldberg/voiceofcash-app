import type { Metadata } from "next";
export const metadata: Metadata = {
  title: { absolute: "Intellectual Property Notice | The Voice of Cash" },
  description: "Intellectual property, copyright, trade secret, and AI system protections for The Voice of Cash LLC.",
};

const SECTIONS = [
  { title: "Copyright Notice", body: `© 2023–2026 The Voice of Cash LLC. All rights reserved.\n\nAll original content on this Site — including but not limited to articles, guides, copy, design elements, visual systems, and methodologies — is protected by United States copyright law (17 U.S.C. § 101 et seq.) from the date of creation.\n\nNo content from this Site may be reproduced, republished, redistributed, or used in any commercial or non-commercial context without the express written permission of The Voice of Cash LLC. Requests for licensing or permission should be directed to thevoiceofcash@gmail.com.` },
  { title: "Proprietary AI Systems & Trade Secrets", body: `The following constitute proprietary trade secrets and intellectual property of The Voice of Cash LLC, protected under the Defend Trade Secrets Act (18 U.S.C. § 1836) and Nevada Uniform Trade Secrets Act (NRS Chapter 600A):\n\n• The VoC Intelligence Team AI Clan multi-agent operational framework and architecture\n• Individual AI agent configurations, role definitions, prompt systems, and behavior specifications\n• Multi-agent coordination protocols and hive-mind synchronization methodologies\n• Client implementation frameworks, onboarding methodologies, and process templates\n• Proprietary AI workflow designs, automation blueprints, and system integration architectures\n• Agent identity structures, memory systems, and continuity protocols\n\nAny attempt to reverse-engineer, replicate, copy, reconstruct, or derive competitive advantage from these systems — through any means including but not limited to website inspection, client engagement, employment, partnership, or observation — is a violation of trade secret law and will be pursued aggressively through civil and criminal legal channels.` },
  { title: "Trademark Notice", body: `The following designations are proprietary to The Voice of Cash LLC and may not be used without written permission:\n\n• The Voice of Cash™\n• VoC Intelligence Team AI Clan™ (as applied to AI/technology services)\n• The operational agent identities as applied to AI services\n\nTrademark registration is pending. Common law trademark rights exist from first use in commerce. Unauthorized use of these marks in connection with competing or complementary services constitutes trademark infringement.` },
  { title: "AI-Generated Content", body: `Content on this Site may be produced with AI assistance and is reviewed and approved by human team members of The Voice of Cash LLC. AI-assisted content is owned by The Voice of Cash LLC as a work product and is protected by the same copyright and intellectual property protections as human-authored content.\n\nThe Company explicitly reserves all rights in AI-generated content produced by its systems, consistent with applicable copyright law and the terms of service of AI providers used.` },
  { title: "Code & Technical Systems", body: `The source code, compiled code, technical architecture, database schemas, API designs, and deployment configurations associated with this Site and the Company's AI systems are proprietary and confidential.\n\nThe public availability of compiled website code does not constitute a license to use, replicate, or derive from that code. Reverse engineering the technical systems of this Site for competitive purposes is prohibited and constitutes misappropriation of trade secrets.` },
  { title: "DMCA Policy", body: `If you believe content on this Site infringes your copyright, please send a written notice to thevoiceofcash@gmail.com including: (1) identification of the copyrighted work; (2) identification of the allegedly infringing material and its URL; (3) your contact information; (4) a statement that you have a good-faith belief the use is not authorized; (5) a statement under penalty of perjury that the information is accurate and you are authorized to act on behalf of the copyright owner.\n\nCounter-notices may be submitted following the same process.` },
  { title: "Enforcement", body: `The Voice of Cash LLC actively monitors for unauthorized use of its intellectual property and will pursue all available legal remedies, including injunctive relief, statutory damages, actual damages, disgorgement of profits, and attorney's fees, against any party that infringes on the Company's intellectual property rights.\n\nWe take IP protection seriously. If you have a legitimate licensing or partnership inquiry, contact us — we're open to collaboration. If you're attempting to copy what we've built, we'll find out, and we'll act.` },
];

export default function IPNoticePage() {
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
        .legal-shield{display:inline-flex;align-items:center;gap:12px;background:rgba(0,200,150,0.06);border:1px solid rgba(0,200,150,0.2);padding:16px 24px;margin-bottom:40px;}
        .legal-shield-icon{font-size:24px;color:var(--gold);}
        .legal-shield-text{font-size:14px;color:var(--gray);line-height:1.5;}
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
        <h1 className="legal-title">Intellectual Property Notice</h1>
        <div className="legal-updated">Last updated: February 2026 · The Voice of Cash LLC · Las Vegas, Nevada</div>
        <div className="legal-shield">
          <span className="legal-shield-icon">⚔</span>
          <span className="legal-shield-text">The systems, methodologies, and operational frameworks on this site are proprietary trade secrets actively protected under U.S. federal and Nevada state law. Unauthorized replication will be prosecuted.</span>
        </div>
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
