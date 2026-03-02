"use client";
import VocFooter from '../components/VocFooter';
import { useState } from "react";

const G = "#00C896";
const GOLD = "#D4AF37";

const CHAPTERS = [
  { n:"01", title:"Why Your AI Tools Keep Failing", desc:"The pattern behind every abandoned AI tool, and the fix." },
  { n:"02", title:"What Is an AI Agent", desc:"The real difference between a tool and an agent. It matters more than you think." },
  { n:"03", title:"What Automation Actually Build", desc:"6 documented stats with sources. Real numbers, no projections." },
  { n:"04", title:"Where to Start", desc:"The 5 best starting points and the 4-step process we use with every client." },
  { n:"05", title:"The AI Landscape", desc:"Who the major players are and what each one is actually good for." },
  { n:"06", title:"How to Measure AI ROI", desc:"The exact framework we use before and after every implementation." },
  { n:"07", title:"What Not to Automate", desc:"The hybrid model that outperforms either humans or AI alone." },
  { n:"08", title:"How to Choose a Partner Without Getting Burned", desc:"The questions to ask and the red flags to walk away from." },
];

export default function GuideClient() {
  const [email, setEmail] = useState("");
  const [answer, setAnswer] = useState("");
  const [status, setStatus] = useState<"idle"|"loading"|"done"|"error">("idle");
  const [err, setErr] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !answer.trim()) { setErr("Both fields are required."); return; }
    setErr(""); setStatus("loading");
    try {
      const res = await fetch("/api/guide-download", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ email: email.trim(), answer: answer.trim() }),
      });
      if (!res.ok) throw new Error("Server error");
      setStatus("done");
      // Trigger download after 800ms
      setTimeout(() => {
        const a = document.createElement("a");
        a.href = "/voc-ai-guide.pdf";
        a.download = "VoiceOfCash-AI-Survival-Guide.pdf";
        a.click();
      }, 800);
    } catch {
      setStatus("error");
      setErr("Something went wrong. Please try again.");
    }
  }

  return (
    <div style={{ minHeight:"100vh", background:"#0A0A0A", color:"#F5F0E8", fontFamily:"var(--font-sans, DM Sans, sans-serif)" }}>
      {/* Nav strip */}
      <div style={{ borderBottom:"1px solid #1a1a1a", padding:"16px 5vw", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <a href="/" style={{ fontWeight:800, fontSize:16, color:G, textDecoration:"none", letterSpacing:"1px" }}>VOICE OF CASH</a>
        <a href="/consultation" style={{ fontSize:12, color:GOLD, textDecoration:"none", letterSpacing:"1px", border:`1px solid ${GOLD}44`, padding:"6px 14px" }}>FREE CONSULTATION</a>
      </div>

      {/* Hero */}
      <section style={{ padding:"80px 5vw 60px", maxWidth:920, margin:"0 auto", textAlign:"center" }}>
        <div style={{ display:"inline-block", background:"#001a12", border:`1px solid ${G}44`, padding:"6px 16px", fontSize:11, letterSpacing:"2px", color:G, marginBottom:28 }}>
          FREE DOWNLOAD
        </div>
        <h1 style={{ fontSize:"clamp(32px, 6vw, 60px)", fontWeight:900, lineHeight:1.0, marginBottom:20, letterSpacing:"-1px" }}>
          The Business Owner's<br/>
          <span style={{ color:G }}>AI Survival Guide</span>
        </h1>
        <p style={{ fontSize:18, color:"rgba(245,240,232,0.6)", maxWidth:600, margin:"0 auto 16px", lineHeight:1.6 }}>
          8 chapters. Real data. No fluff.<br/>
          What AI actually does and how to use it before your competitors do.
        </p>
        <p style={{ fontSize:13, color:"rgba(245,240,232,0.3)", marginBottom:0 }}>
          Compiled from 42 field guides by the Voice of Cash team
        </p>
      </section>

      {/* Two column: chapters + form */}
      <div style={{ maxWidth:980, margin:"0 auto", padding:"0 5vw 80px", display:"grid", gridTemplateColumns:"1fr 1fr", gap:48, alignItems:"start" }}>

        {/* Chapter list */}
        <div>
          <div style={{ fontSize:11, letterSpacing:"2px", color:GOLD, marginBottom:20 }}>WHAT'S INSIDE</div>
          {CHAPTERS.map(c => (
            <div key={c.n} style={{ display:"flex", gap:16, marginBottom:20 }}>
              <div style={{ fontSize:11, color:G, fontWeight:700, minWidth:28, paddingTop:2 }}>{c.n}</div>
              <div>
                <div style={{ fontWeight:700, fontSize:14, marginBottom:4 }}>{c.title}</div>
                <div style={{ fontSize:12, color:"rgba(245,240,232,0.45)", lineHeight:1.5 }}>{c.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Download form */}
        <div style={{ position:"sticky", top:32 }}>
          {status === "done" ? (
            <div style={{ background:"#001a12", border:`1px solid ${G}`, padding:40, textAlign:"center" }}>
              <div style={{ fontSize:36, marginBottom:16 }}>✓</div>
              <div style={{ fontWeight:800, fontSize:20, color:G, marginBottom:12 }}>Your guide is downloading.</div>
              <p style={{ fontSize:14, color:"rgba(245,240,232,0.5)", lineHeight:1.6, marginBottom:24 }}>
                If it doesn't start automatically, click below.
              </p>
              <a href="/voc-ai-guide.pdf" download="VoiceOfCash-AI-Survival-Guide.pdf"
                style={{ display:"inline-block", background:G, color:"#0A0A0A", fontWeight:800, fontSize:14, padding:"14px 28px", textDecoration:"none", letterSpacing:"1px" }}>
                DOWNLOAD NOW
              </a>
            </div>
          ) : (
            <div style={{ background:"#111", border:"1px solid #222", padding:"36px 32px" }}>
              <div style={{ fontWeight:800, fontSize:18, marginBottom:6 }}>Get the Free Guide</div>
              <p style={{ fontSize:13, color:"rgba(245,240,232,0.4)", marginBottom:28, lineHeight:1.5 }}>
                No spam. No sales calls. Just the guide.
              </p>
              <form onSubmit={handleSubmit}>
                <label style={{ display:"block", fontSize:11, letterSpacing:"1.5px", color:"rgba(245,240,232,0.4)", marginBottom:8 }}>
                  YOUR EMAIL
                </label>
                <input
                  type="email" value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="you@yourcompany.com" required
                  style={{ width:"100%", background:"#0A0A0A", border:"1px solid #333", color:"#F5F0E8", padding:"12px 14px", fontSize:14, marginBottom:20, outline:"none", boxSizing:"border-box" }}
                  onFocus={e => e.currentTarget.style.borderColor=G}
                  onBlur={e => e.currentTarget.style.borderColor="#333"}
                />
                <label style={{ display:"block", fontSize:11, letterSpacing:"1.5px", color:"rgba(245,240,232,0.4)", marginBottom:8 }}>
                  WHAT'S THE MOST IMPORTANT THING IN THE WORLD TO YOU?
                </label>
                <textarea
                  value={answer} onChange={e => setAnswer(e.target.value)}
                  placeholder="Your answer..." required rows={3}
                  style={{ width:"100%", background:"#0A0A0A", border:"1px solid #333", color:"#F5F0E8", padding:"12px 14px", fontSize:14, marginBottom:8, outline:"none", resize:"vertical", boxSizing:"border-box", fontFamily:"inherit" }}
                  onFocus={e => e.currentTarget.style.borderColor=G}
                  onBlur={e => e.currentTarget.style.borderColor="#333"}
                />
                <p style={{ fontSize:11, color:"rgba(245,240,232,0.25)", marginBottom:20, lineHeight:1.5 }}>
                  No right or wrong answer. We read every single one.
                </p>
                {err && <p style={{ color:"#ff6b6b", fontSize:12, marginBottom:12 }}>{err}</p>}
                <button type="submit" disabled={status==="loading"}
                  style={{ width:"100%", background: status==="loading" ? "#005540" : G, color:"#0A0A0A", fontWeight:800, fontSize:15, padding:"16px", border:"none", cursor: status==="loading" ? "default" : "pointer", letterSpacing:"1px", transition:"background 0.2s" }}>
                  {status==="loading" ? "SENDING..." : "GET THE FREE GUIDE →"}
                </button>
              </form>
              <p style={{ fontSize:10, color:"rgba(245,240,232,0.2)", marginTop:16, textAlign:"center", lineHeight:1.5 }}>
                By downloading you confirm you are a human and agree to our{" "}
                <a href="/privacy" style={{ color:"rgba(245,240,232,0.3)", textDecoration:"underline" }}>Privacy Policy</a>.
              </p>
            </div>
          )}
        </div>
      </div>


      {/* 32 ROI Use Cases */}
      <section style={{ padding:"72px 5vw", maxWidth:1200, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:56 }}>
          <div style={{ fontSize:11, letterSpacing:"3px", color:G, marginBottom:16 }}>BEYOND THE OBVIOUS</div>
          <h2 style={{ fontSize:"clamp(26px,4vw,48px)", fontWeight:900, letterSpacing:"-1.5px", marginBottom:16 }}>
            32 ways AI increases ROI<br/><span style={{color:G}}>that most businesses haven't tried yet.</span>
          </h2>
          <p style={{ fontSize:17, color:"rgba(245,240,232,0.5)", maxWidth:640, margin:"0 auto", lineHeight:1.7 }}>
            Most businesses start with chatbots and call it a day. The ones winning are finding use in places their competitors haven't looked. Here is the list.
          </p>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))", gap:16 }}>
          {[
            { n:"01", cat:"Revenue", title:"Reactivating dead leads automatically", body:"An AI agent reviews every lead that went cold in your CRM and sends personalized follow-ups based on their original interest, without a human touching it. Most businesses have 3–5x more revenue sitting in their cold list than in their pipeline." },
            { n:"02", cat:"Revenue", title:"Upselling at the moment of highest intent", body:"When a client books, buys, or accepts a proposal, that is your best shot at a higher ticket. An AI agent can trigger a personalized upsell offer in under 3 seconds, most humans forget or wait too long." },
            { n:"03", cat:"Revenue", title:"Automated review requests that actually convert", body:"The difference between 4.2 and 4.8 stars is usually just one thing: who asks and when. AI agents send review requests within minutes of a completed service when sentiment is highest. Most businesses wait days or never ask at all." },
            { n:"04", cat:"Revenue", title:"Abandoned quote follow-up sequences", body:"If a prospect got a quote and went quiet, a follow-up sequence that addresses the most common objections, price, timing, trust, can recover 10–20% of them. AI runs it automatically for every quote that goes unanswered." },
            { n:"05", cat:"Operations", title:"Vendor and supplier communication routing", body:"Incoming vendor emails, invoices, and requests get routed, logged, and flagged automatically. No more admin chasing approvals through email threads." },
            { n:"06", cat:"Operations", title:"Employee onboarding and document collection", body:"An AI agent handles the entire onboarding checklist, collecting documents, sending reminders, answering questions, and flagging missing items. Cuts onboarding time by 60–80% in most businesses." },
            { n:"07", cat:"Operations", title:"Internal knowledge base that answers itself", body:"Every time your team asks the same question, refund policy, process, pricing, you lose time. Train an AI on your internal docs. It answers the team so you don't have to." },
            { n:"08", cat:"Operations", title:"Client intake and pre-qualification", body:"Before a sales call happens, an AI agent has already asked 8–12 pre-qualification questions, scored the lead, collected relevant documents, and put it in front of the right person. Your sales team only talks to people who are ready to buy." },
            { n:"09", cat:"Cost Reduction", title:"Reducing after-hours staffing costs", body:"A phone AI handles every call outside business hours, books appointments, answers FAQs, routes urgent calls. For most service businesses, 20–40% of calls come after hours and get missed entirely." },
            { n:"10", cat:"Cost Reduction", title:"Automating recurring reporting", body:"Weekly reports, daily dashboards, monthly client updates, AI agents pull the data, format it, and send it on schedule. Eliminates hours of manual work per week." },
            { n:"11", cat:"Cost Reduction", title:"First-level customer support ticket resolution", body:"60–80% of support tickets are the same 15 questions. An AI agent resolves them instantly. Your support team only sees the 20% that actually require a human." },
            { n:"12", cat:"Cost Reduction", title:"Invoice follow-up and payment reminders", body:"An AI handles the entire collections sequence, reminder at day 7, follow-up at day 14, escalation at day 30, with customized messaging per client tier. Most businesses see collections time cut in half." },
            { n:"13", cat:"Marketing", title:"Hyper-personalized email sequences at scale", body:"Not mail merge, actual personalization based on behavior, industry, and past interactions. A sequence that reads like it was written specifically for that person converts 3–5x better than a broadcast." },
            { n:"14", cat:"Marketing", title:"Competitor monitoring and alert system", body:"An AI agent watches your top 5 competitors, their pricing pages, product updates, job postings, reviews, and social, and sends you a weekly digest. You stop being surprised by what they ship." },
            { n:"15", cat:"Marketing", title:"Content repurposing at production scale", body:"One long-form piece becomes 8 social posts, a newsletter section, 3 short video scripts, and a LinkedIn article, all formatted correctly for each platform. Most businesses produce 20% of the content they should because creation takes too long." },
            { n:"16", cat:"Marketing", title:"SEO content gap identification and production", body:"An AI identifies every keyword your competitors rank for that you don't, maps it to your content calendar, and writes the first drafts. You review and approve. Most businesses skip this entirely because it takes too long manually." },
            { n:"17", cat:"Sales", title:"Real-time objection response during sales calls", body:"An AI listens to sales calls and surfaces the exact response to each objection in your company's voice in real time. New reps perform like veterans within weeks." },
            { n:"18", cat:"Sales", title:"Proposal generation from discovery call notes", body:"Discovery call ends, notes go in, AI generates a personalized proposal in your format within minutes. Sales cycle shrinks. Win rate goes up." },
            { n:"19", cat:"Sales", title:"Lead scoring that actually reflects buying intent", body:"Most CRM lead scores are based on form fills and email opens. AI scores based on behavioral patterns, what pages they visited, how long, what they searched, and how similar they are to your closed clients." },
            { n:"20", cat:"Sales", title:"Referral program automation", body:"Identifying happy clients, asking for referrals at the right moment, tracking them, and rewarding them, all automated. Most referral programs fail because nobody manages the process. AI does." },
            { n:"21", cat:"Client Experience", title:"Proactive project status updates", body:"Clients stop emailing asking for updates when the updates are already in their inbox. An AI agent monitors project milestones and sends status reports before anyone has to ask." },
            { n:"22", cat:"Client Experience", title:"Post-service feedback loops", body:"Not a survey link in an email, a conversational check-in that actually gets responses. AI identifies at-risk clients before they churn based on sentiment patterns in the responses." },
            { n:"23", cat:"Client Experience", title:"Personalized anniversary and milestone outreach", body:"Year-one client anniversary. First purchase anniversary. Account milestone. AI sends a message that feels personal. Most businesses let these pass completely unrecognized." },
            { n:"24", cat:"Client Experience", title:"Intelligent FAQ handling across every channel", body:"Same question asked on your website, your Google listing, your Instagram DM, and your email, AI answers consistently and correctly across all of them simultaneously." },
            { n:"25", cat:"Finance & Admin", title:"Expense categorization and anomaly detection", body:"Every transaction automatically categorized, flagged if anomalous, and routed for approval or rejection. Most businesses catch expense issues in the quarterly review, AI catches them the same day." },
            { n:"26", cat:"Finance & Admin", title:"Contract review and red-flag identification", body:"Before a contract goes to legal or gets signed, an AI reviews it against your standard terms and flags deviations, missing clauses, and unusual language. Saves legal hours on routine reviews." },
            { n:"27", cat:"Finance & Admin", title:"Automated scheduling and calendar management", body:"AI handles inbound meeting requests, books them against your rules, sends confirmations, prepares agendas, and sends day-before reminders, for every meeting, every time." },
            { n:"28", cat:"HR & People Ops", title:"Interview scheduling and candidate communication", body:"From application to offer, every scheduling touch, follow-up, and status update handled automatically. Candidates get a professional experience. Your team saves 4–8 hours per hire." },
            { n:"29", cat:"HR & People Ops", title:"Performance review data aggregation", body:"Before review season, AI collects feedback from peers, direct reports, and project outcomes, summarizes it by individual, and surfaces patterns. Reviews take 30 minutes instead of 3 hours per person." },
            { n:"30", cat:"Industry-Specific", title:"Appointment no-show reduction (healthcare, services)", body:"A 3-touch AI sequence, confirmation, day-before reminder with prep instructions, day-of reminder with directions, cuts no-show rates by 30–60% in most service businesses." },
            { n:"31", cat:"Industry-Specific", title:"Real estate, automated property matching and follow-up", body:"AI matches new listings to existing buyer profiles the moment they hit the market, sends personalized outreach, and books showings automatically, while your competitors are still scrolling MLS manually." },
            { n:"32", cat:"Industry-Specific", title:"Restaurant and hospitality, dynamic menu and offer personalization", body:"Based on weather, day of week, inventory levels, and past order history, AI surfaces the right offer to the right person at the right time. Most hospitality businesses blast the same promotion to everyone." },
          ].map(uc => (
            <div key={uc.n} style={{ background:"#111", border:"1px solid #1a1a1a", padding:"22px 20px", transition:"border-color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.borderColor="#00C89644")}
              onMouseLeave={e => (e.currentTarget.style.borderColor="#1a1a1a")}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:10 }}>
                <span style={{ fontSize:9, letterSpacing:"2px", color:"rgba(245,240,232,0.25)" }}>{uc.n}</span>
                <span style={{ fontSize:9, letterSpacing:"1.5px", color:G, background:"rgba(0,200,150,0.08)", border:"1px solid rgba(0,200,150,0.15)", padding:"2px 8px" }}>{uc.cat.toUpperCase()}</span>
              </div>
              <div style={{ fontSize:14, fontWeight:800, color:"#F5F0E8", marginBottom:10, lineHeight:1.4 }}>{uc.title}</div>
              <div style={{ fontSize:12, color:"rgba(245,240,232,0.5)", lineHeight:1.65 }}>{uc.body}</div>
            </div>
          ))}
        </div>
        <div style={{ textAlign:"center", marginTop:56 }}>
          <p style={{ fontSize:15, color:"rgba(245,240,232,0.4)", marginBottom:24, lineHeight:1.7 }}>Most of these take 1 to 3 weeks to deploy. Most businesses never get to them because they don't know where to start.</p>
          <a href="/consultation" style={{ display:"inline-block", background:G, color:"#0A0A0A", fontWeight:900, fontSize:16, padding:"18px 48px", textDecoration:"none", letterSpacing:"0.5px" }}>BOOK A FREE STRATEGY CALL →</a>
        </div>
      </section>
      {/* Mobile breakpoint */}
      <style>{`
        @media (max-width: 700px) {
          div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
          div[style*="position: sticky"] { position: static !important; }
        }
      `}</style>
      <VocFooter />
    </div>
  );
}
