'use client';
import { useState } from 'react';

const G = '#00C896';
const GOLD = '#D4AF37';
const CORRECT = '1234!';

const TEAM = [
  { id: 'cash',   name: 'Cash Colligan',  title: 'Chief Vision Officer / Chief Marketing Officer', initials: 'CC' },
  { id: 'tim',    name: 'Tim Gelhardt',   title: 'Chief Technology Officer / Head of Platform & Cloud', initials: 'TG' },
  { id: 'ammar',  name: 'Ammar Ul Haq',   title: 'Director of Business Development', initials: 'AH' },
  { id: 'david',  name: 'David Jones',    title: 'Client Success Manager / Senior Advisor', initials: 'DJ' },
];

const EFFECTIVE_DATE = 'the date of final signature, on or after March 1, 2026';
const GOVERNING_LAW  = 'Nevada';

export default function ContractClient() {
  const [pass, setPass]       = useState('');
  const [unlocked, setUnlock] = useState(false);
  const [error, setError]     = useState('');
  const [sigs, setSigs]       = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState<Record<string, boolean>>({});
  const [submitting, setSubmitting] = useState<Record<string, boolean>>({});
  const [sigError, setSigError]   = useState<Record<string, string>>({});
  const [confirmed, setConfirmed] = useState<Record<string, any>>({});

  function unlock(e: React.FormEvent) {
    e.preventDefault();
    if (pass === CORRECT) { setUnlock(true); setError(''); }
    else setError('Incorrect passcode.');
  }

  async function sign(e: React.FormEvent, memberId: string, memberName: string, memberTitle: string) {
    e.preventDefault();
    const typedName = sigs[memberId]?.trim();
    if (!typedName) { setSigError(p => ({ ...p, [memberId]: 'Please type your full name to sign.' })); return; }
    if (typedName.toLowerCase() !== memberName.toLowerCase()) {
      setSigError(p => ({ ...p, [memberId]: `Name must match "${memberName}" exactly.` })); return;
    }
    setSubmitting(p => ({ ...p, [memberId]: true }));
    try {
      const res = await fetch('/api/sign-contract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ memberId, memberName, memberTitle, typedName }),
      });
      const data = await res.json();
      if (data.ok) {
        setSubmitted(p => ({ ...p, [memberId]: true }));
        setConfirmed(p => ({ ...p, [memberId]: data }));
        setSigError(p => ({ ...p, [memberId]: '' }));
      } else {
        setSigError(p => ({ ...p, [memberId]: data.error || 'Signature failed.' }));
      }
    } catch {
      setSigError(p => ({ ...p, [memberId]: 'Network error. Please try again.' }));
    }
    setSubmitting(p => ({ ...p, [memberId]: false }));
  }

  if (!unlocked) return (
    <div style={{ minHeight:'100vh', background:'#0A0A0A', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'system-ui,sans-serif' }}>
      <div style={{ background:'#111', border:`1px solid ${G}33`, padding:'48px', maxWidth:420, width:'90%', textAlign:'center' }}>
        <div style={{ fontSize:32, marginBottom:8 }}>⚖️</div>
        <div style={{ fontSize:11, letterSpacing:'2px', color:G, marginBottom:12 }}>VOICE OF CASH</div>
        <h1 style={{ fontSize:22, fontWeight:900, color:'#F5F0E8', marginBottom:8 }}>Partner Agreement</h1>
        <p style={{ color:'rgba(245,240,232,0.4)', fontSize:13, marginBottom:28 }}>This document is confidential.<br/>Enter your team passcode to continue.</p>
        <form onSubmit={unlock} style={{ display:'flex', flexDirection:'column', gap:12 }}>
          <input type="password" placeholder="Passcode" value={pass} onChange={e => setPass(e.target.value)}
            style={{ background:'#0A0A0A', border:`1px solid ${G}44`, color:'#F5F0E8', padding:'12px 16px', fontSize:16, outline:'none', textAlign:'center', letterSpacing:'4px' }}/>
          {error && <div style={{ color:'#FF6B6B', fontSize:12 }}>{error}</div>}
          <button type="submit" style={{ background:G, color:'#0A0A0A', fontWeight:800, padding:'12px', fontSize:14, border:'none', cursor:'pointer', letterSpacing:'1px' }}>ENTER →</button>
        </form>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight:'100vh', background:'#0A0A0A', color:'#F5F0E8', fontFamily:'Georgia,serif' }}>
      <style>{`
        @media print { .no-print { display: none !important; } body { background: white !important; color: black !important; } }
        .sig-box { transition: border-color 0.2s; }
        .sig-box:hover { border-color: ${G}88 !important; }
      `}</style>

      {/* Header */}
      <div style={{ background:'linear-gradient(135deg,#0D1F1A 0%,#0A0A0A 100%)', borderBottom:`1px solid ${G}22`, padding:'48px 5vw 40px', textAlign:'center' }}>
        <div style={{ fontSize:11, letterSpacing:'3px', color:G, marginBottom:12 }}>CONFIDENTIAL PARTNERSHIP AGREEMENT</div>
        <h1 style={{ fontFamily:'Georgia,serif', fontSize:'clamp(24px,4vw,42px)', fontWeight:700, color:'#F5F0E8', marginBottom:8 }}>The Voice of Cash, LLC</h1>
        <p style={{ color:GOLD, fontSize:14, letterSpacing:'1px' }}>FOUNDING PARTNER PROFIT SHARING & OPERATING AGREEMENT</p>
        <p style={{ color:'rgba(245,240,232,0.4)', fontSize:12, marginTop:12 }}>Effective: Date of final signature on or after March 1, 2026 &nbsp;|&nbsp; Governing Law: {GOVERNING_LAW}</p>
      </div>

      {/* Contract Body */}
      <div style={{ maxWidth:860, margin:'0 auto', padding:'48px 5vw' }}>

        {/* Preamble */}
        <Section title="RECITALS">
          <P>This Founding Partner Profit Sharing and Operating Agreement (hereinafter "Agreement") is entered into as of <strong>the date on which the final required signature is received</strong>, with such date being on or after <strong>March 1, 2026</strong>, by and among the founding partners of <strong>The Voice of Cash, LLC</strong>, a limited liability company organized under the laws of the State of {GOVERNING_LAW} (hereinafter "the Company").</P>
          <P>WHEREAS, the parties hereto desire to establish the terms and conditions governing their relationship, obligations, compensation, and rights as founding partners of the Company;</P>
          <P>WHEREAS, the parties acknowledge that the Company's success depends on the sustained, collaborative effort of all founding partners acting in good faith;</P>
          <P>NOW, THEREFORE, in consideration of the mutual covenants and agreements set forth herein, and for other good and valuable consideration, the receipt and sufficiency of which are hereby acknowledged, the parties agree as follows.</P>
        </Section>

        <HR/>

        {/* Partners */}
        <Section title="ARTICLE I, THE FOUNDING PARTNERS">
          <P>The following individuals constitute the Founding Partners of the Company, each agreeing to the roles, responsibilities, and compensation structure set forth in this Agreement:</P>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(360px,1fr))', gap:16, margin:'24px 0' }}>
            {TEAM.map(m => (
              <div key={m.id} style={{ background:'#111', border:`1px solid ${G}22`, padding:'20px 24px' }}>
                <div style={{ fontSize:10, letterSpacing:'2px', color:G, marginBottom:6 }}>FOUNDING PARTNER</div>
                <div style={{ fontSize:18, fontWeight:700, color:'#F5F0E8' }}>{m.name}</div>
                <div style={{ fontSize:12, color:'rgba(245,240,232,0.5)', marginTop:4 }}>{m.title}</div>
              </div>
            ))}
          </div>
        </Section>

        <HR/>

        {/* Roles */}
        <Section title="ARTICLE II, ROLES AND OBLIGATIONS">
          <RoleBlock
            name="Cash Colligan, Chief Vision Officer / Chief Marketing Officer"
            duties={[
              'Day-to-day management of local client relationships and business operations',
              'Serve as primary project representative for the Company',
              'Lead agent development and AI implementation for client engagements',
              'Human-facing client communications and relationship management',
              'Drive marketing strategy and brand development for the Company',
            ]}/>
          <RoleBlock
            name="Tim Gelhardt, Chief Technology Officer / Head of Platform & Cloud"
            duties={[
              'Ownership of all technical operations, infrastructure, and platform architecture',
              'Server administration, cloud infrastructure, and system reliability',
              'IT strategy, security protocols, and technical decision-making',
              'Integration of AI systems and automation tools into client deliverables',
              'Technical due diligence on all Company projects and partnerships',
            ]}/>
          <RoleBlock
            name="Ammar Ul Haq, Director of Business Development"
            duties={[
              'Oversight and execution of paid advertising strategy and media buying',
              'Lead scaling and market expansion initiatives',
              'Content creation strategy and execution across Company channels',
              'Partnership development with advertising platforms and vendor relationships',
              'Drive top-of-funnel growth and client acquisition pipeline',
            ]}/>
          <RoleBlock
            name="David Jones, Client Success Manager / Senior Advisor"
            duties={[
              'Human onboarding of new clients and agent-assisted onboarding workflows',
              'Business strategy advisory for client engagements',
              'Collaboration with Director of Business Development on expansion',
              'Spanish-language client service and bilingual market development',
              'Client retention, satisfaction monitoring, and renewal management',
            ]}/>
        </Section>

        <HR/>

        {/* Compensation */}
        <Section title="ARTICLE III, COMPENSATION AND PROFIT SHARING">
          <SubHead>3.1 Gross Revenue Distribution</SubHead>
          <P>All gross revenue generated through The Voice of Cash ecosystem, including but not limited to client service fees, retainer agreements, project fees, licensing, and referral income, shall be subject to the distribution structure set forth in this Article.</P>

          <SubHead>3.2 Tax Reserve</SubHead>
          <P>Prior to any distribution to Founding Partners, <strong>thirty-three percent (33%)</strong> of all gross revenue shall be set aside in a designated Company tax reserve account. This reserve is held for the purpose of satisfying federal, state, and local tax obligations. The tax reserve is not distributable to partners except to satisfy actual tax liabilities as determined by the Company's accountant or tax advisor.</P>

          <SubHead>3.3 Partner Distributions</SubHead>
          <P>The remaining <strong>sixty-seven percent (67%)</strong> of gross revenue (hereinafter "Distributable Revenue") shall be divided equally among the four (4) Founding Partners, with each partner receiving <strong>twenty-five percent (25%)</strong> of Distributable Revenue.</P>

          <div style={{ background:'#111', border:`1px solid ${GOLD}33`, padding:'24px', margin:'24px 0' }}>
            <div style={{ fontSize:10, letterSpacing:'2px', color:GOLD, marginBottom:16 }}>DISTRIBUTION FORMULA</div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, fontFamily:'monospace', fontSize:14 }}>
              {[
                ['Gross Revenue', '100%'],
                ['Tax Reserve Hold', '- 33%'],
                ['Distributable Revenue', '= 67%'],
                ['Per Partner (×4)', '= 25% each'],
              ].map(([k,v]) => (
                <><div style={{color:'rgba(245,240,232,0.5)'}}>{k}</div><div style={{color:'#F5F0E8',textAlign:'right'}}>{v}</div></>
              ))}
            </div>
          </div>

          <SubHead>3.4 Payment Schedule</SubHead>
          <P>Partner distributions shall be made on a <strong>quarterly basis</strong>, corresponding to the following payment periods:</P>
          <ul style={{ paddingLeft:24, lineHeight:2.2, color:'rgba(245,240,232,0.8)', fontSize:15 }}>
            {[['Q1','January, February, March','April 15'],['Q2','April, May, June','July 15'],['Q3','July, August, September','October 15'],['Q4','October, November, December','January 15']].map(([q,p,d]) => (
              <li key={q}><strong style={{color:'#F5F0E8'}}>{q}</strong>, Revenue Period: {p}, Payment Due: {d}</li>
            ))}
          </ul>
          <P>Payment shall be accompanied by a written revenue summary detailing gross revenue, tax reserve calculation, distributable revenue, and each partner's share for the period.</P>

          <SubHead>3.5 Annual Tax Reserve Surplus</SubHead>
          <P>Following the filing of the Company's annual federal and state tax returns, any funds remaining in the tax reserve account after satisfaction of all actual tax liabilities (hereinafter "Tax Surplus") shall not be automatically distributed to partners. Instead, disposition of the Tax Surplus shall be determined by a unanimous vote of all four (4) Founding Partners, conducted no later than thirty (30) days following the final tax filing date for each fiscal year. Approved uses may include, but are not limited to, reinvestment into Company operations, marketing and growth initiatives, reserve carryover to the following year, equal distribution to partners, or such other use as the partners unanimously agree upon. No single partner may unilaterally direct the use of Tax Surplus funds.</P>

          <SubHead>3.6 Nature of Distributions, Profit Share, Not IP Ownership</SubHead>
          <P>The twenty-five percent (25%) quarterly distributions described in this Article represent each Founding Partner's share of <strong>Company business profits</strong>, the economic returns generated by the operations of The Voice of Cash. These distributions are in the nature of royalty-based profit sharing, not equity ownership of the Company, its intellectual property, its brand assets, or the LLC entity itself.</P>
          <P><strong>Intellectual property, brand identity, and LLC ownership of The Voice of Cash remain solely and exclusively vested in Cash Colligan</strong>, who, as the founder and sole owner of the LLC, voluntarily grants the quarterly profit distributions described herein to the four (4) named Founding Partners. This Agreement does not convey, transfer, assign, or encumber any ownership interest in the LLC, its name, its marks, its systems, its proprietary methods, or any other intangible asset of the Company to any party other than Cash Colligan.</P>
          <P>For purposes of clarity: the Founding Partners are profit participants and operational stakeholders, not equity holders. Their economic interest is limited to the quarterly distributions defined herein and, in the event of a Company sale, the sale proceeds distribution defined in Article IX of this Agreement.</P>
        </Section>

        <HR/>

        {/* Meetings */}
        <Section title="ARTICLE IV, MEETINGS AND GOVERNANCE">
          <SubHead>4.1 Monthly Partner Meeting</SubHead>
          <P>The Founding Partners shall convene a mandatory partner meeting on the <strong>14th day of each calendar month</strong>. In the event the 14th falls on a weekend or federal holiday, the meeting shall be held on the next business day. Meeting format (in-person or virtual) shall be determined by mutual agreement of the partners.</P>

          <SubHead>4.2 Meeting Agenda Requirements</SubHead>
          <P>Each monthly meeting shall include review of: revenue performance, client pipeline, operational updates from each partner, strategic planning, and any proposed amendments to this Agreement or Company operations.</P>

          <SubHead>4.3 Decision Making</SubHead>
          <P>Routine operational decisions within each partner's defined role may be made independently. Material decisions, including but not limited to new financial commitments exceeding $5,000, new partnership agreements, changes to service pricing, and personnel additions, require a simple majority vote (3 of 4 partners). Amendments to this Agreement require unanimous consent of all Founding Partners.</P>
        </Section>

        <HR/>

        {/* Growth */}
        <Section title="ARTICLE V, GROWTH COVENANT">
          <P>Each Founding Partner acknowledges and commits to the following principles, which form the cultural and operational foundation of the Company:</P>
          <ul style={{ paddingLeft:24, lineHeight:2.4, color:'rgba(245,240,232,0.8)', fontSize:15 }}>
            {[
              'The Company grows when all partners grow, individual success and collective success are aligned, not competing.',
              'Each partner commits to bring their full effort and expertise to their defined role.',
              'Partners commit to transparent communication regarding obstacles, capacity, and performance.',
              'Revenue opportunities within the Company ecosystem are directed to the Company, not diverted to personal or competing ventures.',
              'Equity of effort produces equity of reward, partners who consistently fail to perform their obligations may be subject to compensation adjustment per Article VI.',
            ].map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </Section>

        <HR/>

        {/* Remedies */}
        <Section title="ARTICLE VI, PERFORMANCE, DEFAULT, AND REMEDIES">
          <SubHead>6.1 Performance Standard</SubHead>
          <P>Each Founding Partner is expected to fulfill the duties described in Article II with reasonable professional diligence. Consistent failure to meet those obligations, or conduct materially detrimental to the Company, may result in compensation adjustment, role modification, or removal from active operations as set forth in Section 6.1(a) below.</P>

          <SubHead>6.1(a) Removal for Sustained Non-Performance</SubHead>
          <P>If any Founding Partner fails to fulfill their defined operational obligations for a period of <strong>ten (10) consecutive days</strong>, and that failure materially affects Company operations or client relationships, <strong>and</strong> no prior notice of absence or extenuating circumstance has been provided to the remaining partners, the three (3) remaining Founding Partners may call a formal vote on removal of that partner from active operations.</P>
          <P>A vote to remove requires the agreement of all three (3) remaining active partners. No single partner may be removed without unanimous consent of the other three.</P>

          <SubHead>6.1(b) Retained Interest Upon Removal</SubHead>
          <P>A Founding Partner removed from active operations under Section 6.1(a) <strong>shall retain a lifetime contractual interest of five percent (5%) of Company business profits</strong>, payable on the same quarterly schedule defined in Article III. This retained interest is irrevocable once vested through removal under this section and survives any subsequent changes to the Company's operational structure.</P>
          <P>This retained 5% interest is personal to the removed partner and may not be transferred, assigned, pledged, or sold without the written consent of Cash Colligan as LLC owner.</P>

          <SubHead>6.1(c) Reallocation of Freed Profit Share</SubHead>
          <P>Upon removal under Section 6.1(a), the removed partner's former twenty-five percent (25%) profit share shall be restructured as follows: the removed partner retains five percent (5%) as a lifetime royalty per Section 6.1(b). The remaining <strong>twenty percent (20%)</strong>, freed from the removed partner's former share, shall not automatically accrue to Cash Colligan or any single remaining partner.</P>
          <P>Disposition of that twenty percent (20%) shall be determined by a vote of the <strong>three (3) remaining active profit-share partners</strong> (referred to herein as Partners A, B, and C for purposes of this vote). Possible outcomes include but are not limited to: equal redistribution among the three remaining partners, allocation to a new operational partner, retention as a Company reserve, or any other use unanimously agreed upon by Partners A, B, and C. <strong>Cash Colligan, in his capacity as LLC owner, does not hold a unilateral right to direct this reallocation</strong>, it is a matter for the remaining profit-share partners to decide collectively.</P>

          <SubHead>6.2 Voluntary Departure</SubHead>
          <P>A Founding Partner who voluntarily withdraws from the Agreement shall forfeit their right to future distributions. Any earned but unpaid distributions through the date of withdrawal shall be paid in the next scheduled quarterly payment. The withdrawing partner's equity interest, if any, shall be governed by the Company's Operating Agreement.</P>

          <SubHead>6.3 Non-Compete and Non-Solicitation</SubHead>
          <P>During the term of this Agreement and for a period of twelve (12) months following departure, each Founding Partner agrees not to: (a) directly solicit or engage Company clients for competing services; or (b) induce other Founding Partners or Company employees to leave the Company. This provision is specifically limited to direct competitors offering substantially similar AI agent and automation services.</P>

          <SubHead>6.4 Confidentiality</SubHead>
          <P>Each Founding Partner agrees to hold in strict confidence all proprietary business information, client data, revenue figures, strategic plans, and technical systems of the Company. This obligation survives the termination of this Agreement for a period of three (3) years.</P>
        </Section>

        <HR/>

        {/* Legal */}
        <Section title="ARTICLE VII, GENERAL PROVISIONS">
          <SubHead>7.0 Effective Date</SubHead>
          <P>This Agreement becomes legally effective on the date the final required signature is received and recorded, provided that date is on or after <strong>March 1, 2026</strong>. Signatures received prior to March 1, 2026 shall not cause this Agreement to take effect before that date. Once all four (4) Founding Partners have signed and the effective date condition is satisfied, this Agreement is binding on all parties from that date forward with no further action required.</P>

          <SubHead>7.1 Governing Law</SubHead>
          <P>This Agreement shall be governed by and construed in accordance with the laws of the State of {GOVERNING_LAW}, without regard to conflict of law principles.</P>

          <SubHead>7.2 Dispute Resolution</SubHead>
          <P>Any dispute arising out of or relating to this Agreement that cannot be resolved by partner vote shall be submitted to binding arbitration in {GOVERNING_LAW} under the rules of the American Arbitration Association. The prevailing party shall be entitled to recover reasonable attorney's fees and costs.</P>

          <SubHead>7.3 Entire Agreement</SubHead>
          <P>This Agreement constitutes the entire agreement among the parties with respect to its subject matter and supersedes all prior discussions, representations, and agreements. Amendments require unanimous written consent of all Founding Partners.</P>

          <SubHead>7.4 Severability</SubHead>
          <P>If any provision of this Agreement is found to be invalid or unenforceable, the remaining provisions shall continue in full force and effect.</P>

          <SubHead>7.5 Electronic Signatures</SubHead>
          <P>The parties agree that electronic signatures, including typed name attestations captured with corresponding timestamp and IP address metadata, constitute valid signatures under the Electronic Signatures in Global and National Commerce Act (E-SIGN Act), 15 U.S.C. § 7001 et seq., and the Uniform Electronic Transactions Act as adopted in {GOVERNING_LAW}. All signature metadata is logged and retained by the Company as evidence of execution.</P>

          <SubHead>7.6 Counterparts</SubHead>
          <P>This Agreement may be executed in counterparts, each of which shall be deemed an original and all of which together shall constitute one and the same instrument.</P>
        </Section>

        <HR/>

        {/* Sale */}
        <Section title="ARTICLE IX, BUSINESS SALE, VALUATION, AND PROCEEDS">
          <SubHead>9.1 Minimum Qualifying Offer</SubHead>
          <P>No offer to acquire The Voice of Cash, in whole or in any substantial part, including asset purchases, merger, equity acquisition, or any transaction resulting in a change of control, shall be considered a serious or qualifying offer unless the total purchase price equals or exceeds <strong>Five Million Dollars ($5,000,000 USD)</strong>. Offers below this threshold shall not require partner discussion or vote and may be declined by Cash Colligan without consultation.</P>

          <SubHead>9.2 Unanimous Consent Required</SubHead>
          <P>Any qualifying offer at or above the $5,000,000 threshold shall be presented to all four (4) Founding Partners in writing. <strong>All four (4) Founding Partners must unanimously agree</strong> to the proposed sale price, terms, and buyer before any sale may proceed. No Founding Partner may be coerced, pressured, or have their vote substituted by another. A dissenting vote by any single partner is sufficient to decline any offer, regardless of price.</P>

          <SubHead>9.3 Payment Terms, Minimum Down at Signing</SubHead>
          <P>In the event all four (4) Founding Partners unanimously approve a sale, the executed purchase agreement must require that a minimum of <strong>fifty percent (50%) of the total agreed purchase price be delivered to the Company at or before the time of signing the definitive sale agreement</strong>. No sale shall proceed on terms that defer more than fifty percent (50%) of the total consideration to post-closing payments, earnouts, or contingencies, unless unanimously approved by all four partners in writing with full disclosure of the deferred payment structure.</P>

          <SubHead>9.4 Distribution of Sale Proceeds</SubHead>
          <P>In the event of a completed sale of the Company, net sale proceeds, after satisfaction of all Company debts, obligations, transaction costs, and applicable taxes, shall be distributed as follows: <strong>Cash Colligan, as LLC owner, shall receive such portion as reflects his ownership position</strong> consistent with the terms negotiated in the sale agreement. The four (4) Founding Partners, including Cash Colligan, shall share in the net proceeds available for partner distribution on an equal twenty-five percent (25%) basis. The precise structure of proceeds allocation shall be defined in the sale agreement and reviewed by legal counsel prior to execution.</P>

          <SubHead>9.5 IP Retained Unless Explicitly Transferred</SubHead>
          <P>No sale of the Company shall be deemed to include transfer of intellectual property, brand assets, or proprietary systems unless such transfer is explicitly negotiated and documented in the definitive sale agreement. Any IP transfer requires separate written acknowledgment by Cash Colligan as the sole IP owner.</P>
        </Section>

        <HR/>

        {/* Signatures */}
        <Section title="ARTICLE VIII, EXECUTION AND SIGNATURES">
          <P>By signing below, each Founding Partner acknowledges that they have read this Agreement in its entirety, understand its terms, and agree to be bound by its provisions. Each signature is recorded with the date, time, and network metadata at time of execution as provided under Article VII, Section 7.5.</P>
          <P style={{ color:'rgba(245,240,232,0.5)', fontSize:13, fontStyle:'italic' }}>To sign: type your full legal name exactly as it appears above your signature block, then click "Sign Agreement."</P>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(380px,1fr))', gap:24, marginTop:32 }}>
            {TEAM.map(member => (
              <div key={member.id} className="sig-box" style={{ background:'#111', border:`1px solid ${G}33`, padding:'28px 24px' }}>
                <div style={{ fontSize:10, letterSpacing:'2px', color:G, marginBottom:8 }}>FOUNDING PARTNER SIGNATURE</div>
                <div style={{ fontSize:18, fontWeight:700, marginBottom:4 }}>{member.name}</div>
                <div style={{ fontSize:12, color:'rgba(245,240,232,0.5)', marginBottom:20 }}>{member.title}</div>

                {submitted[member.id] ? (
                  <div style={{ background:'rgba(0,200,150,0.08)', border:`1px solid ${G}44`, padding:'16px', borderRadius:2 }}>
                    <div style={{ color:G, fontWeight:700, fontSize:14, marginBottom:8 }}>✓ SIGNED</div>
                    <div style={{ fontFamily:'monospace', fontSize:11, color:'rgba(245,240,232,0.6)', lineHeight:1.8 }}>
                      <div>Name: {confirmed[member.id]?.memberName}</div>
                      <div>Signed: {confirmed[member.id]?.timestamp}</div>
                      <div>IP: {confirmed[member.id]?.ip}</div>
                      <div>ID: {confirmed[member.id]?.signatureId}</div>
                    </div>
                    <div style={{ marginTop:12, fontSize:11, color:'rgba(245,240,232,0.4)', fontStyle:'italic' }}>This signature has been recorded and is legally binding under the E-SIGN Act.</div>
                  </div>
                ) : (
                  <form onSubmit={e => sign(e, member.id, member.name, member.title)}>
                    <div style={{ marginBottom:8, fontSize:12, color:'rgba(245,240,232,0.5)' }}>Type your full legal name to sign:</div>
                    <input
                      type="text"
                      placeholder={member.name}
                      value={sigs[member.id] || ''}
                      onChange={e => setSigs(p => ({ ...p, [member.id]: e.target.value }))}
                      style={{ width:'100%', background:'#0A0A0A', border:`1px solid ${G}44`, color:'#F5F0E8', padding:'10px 14px', fontSize:15, outline:'none', fontFamily:'Georgia,serif', boxSizing:'border-box', marginBottom:8 }}
                    />
                    {sigError[member.id] && <div style={{ color:'#FF6B6B', fontSize:12, marginBottom:8 }}>{sigError[member.id]}</div>}
                    <button
                      type="submit"
                      disabled={submitting[member.id]}
                      style={{ width:'100%', background:G, color:'#0A0A0A', fontWeight:800, fontSize:13, padding:'11px', border:'none', cursor:'pointer', letterSpacing:'1px', opacity: submitting[member.id] ? 0.6 : 1 }}
                    >
                      {submitting[member.id] ? 'RECORDING...' : 'SIGN AGREEMENT →'}
                    </button>
                  </form>
                )}
              </div>
            ))}
          </div>

          <div style={{ marginTop:40, padding:'20px 24px', background:'rgba(212,175,55,0.05)', border:`1px solid ${GOLD}22`, fontSize:12, color:'rgba(245,240,232,0.4)', lineHeight:1.8 }}>
            <strong style={{ color:GOLD }}>Legal Notice:</strong> This document constitutes a legally binding agreement. Electronic signatures recorded herein are valid under the E-SIGN Act and the Uniform Electronic Transactions Act. Signature metadata including IP address, timestamp, and user agent string are logged as evidence of execution. This document is confidential, distribution outside the named Founding Partners is prohibited.
          </div>
        </Section>

        <div style={{ textAlign:'center', marginTop:48, paddingTop:32, borderTop:'1px solid #1a1a1a' }}>
          <a href="/portal" style={{ display:'inline-block', background:G, color:'#0A0A0A', fontWeight:800, fontSize:14, padding:'14px 36px', textDecoration:'none', letterSpacing:'1px', marginRight:16 }}>VIEW TEAM PORTAL →</a>
          <button onClick={() => window.print()} className="no-print" style={{ background:'transparent', border:`1px solid ${G}44`, color:G, fontWeight:700, fontSize:13, padding:'14px 28px', cursor:'pointer', letterSpacing:'1px' }}>PRINT / SAVE PDF</button>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 40 }}>
      <h2 style={{ fontFamily:'system-ui,sans-serif', fontSize:11, letterSpacing:'2.5px', color:'#00C896', marginBottom:20, paddingBottom:10, borderBottom:'1px solid #1a1a1a' }}>{title}</h2>
      {children}
    </section>
  );
}

function SubHead({ children }: { children: React.ReactNode }) {
  return <h3 style={{ fontFamily:'system-ui,sans-serif', fontSize:14, fontWeight:700, color:'#F5F0E8', marginBottom:8, marginTop:24 }}>{children}</h3>;
}

function P({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <p style={{ fontSize:15, lineHeight:1.85, color:'rgba(245,240,232,0.75)', marginBottom:16, ...style }}>{children}</p>;
}

function HR() {
  return <hr style={{ border:'none', borderTop:'1px solid #1a1a1a', margin:'40px 0' }}/>;
}

function RoleBlock({ name, duties }: { name: string; duties: string[] }) {
  return (
    <div style={{ marginBottom:28 }}>
      <div style={{ fontSize:14, fontWeight:700, color:'#F5F0E8', marginBottom:10 }}>{name}</div>
      <ul style={{ paddingLeft:20, margin:0 }}>
        {duties.map((d,i) => <li key={i} style={{ fontSize:14, lineHeight:2, color:'rgba(245,240,232,0.7)' }}>{d}</li>)}
      </ul>
    </div>
  );
}
