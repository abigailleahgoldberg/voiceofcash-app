'use client';
import { useState } from 'react';

const G = '#00C896';
const GOLD = '#D4AF37';

const QUESTIONS = [
  // IDENTITY
  { id: 1, section: 'Identity', label: 'What is your business name, and what does it actually do?', type: 'textarea', placeholder: 'Not the elevator pitch. The real version. What problem do you solve, and for who.' },
  { id: 2, section: 'Identity', label: 'If your business were a person walking into a room, how would people describe them?', type: 'textarea', placeholder: 'Think about presence, energy, first impression. Not job title.' },
  { id: 3, section: 'Identity', label: 'Pick three words that should define your agent\'s personality.', type: 'text', placeholder: 'e.g. Sharp. Warm. Direct. Funny. Grounded. Bold.' },
  { id: 4, section: 'Identity', label: 'What should your agent never sound like?', type: 'textarea', placeholder: 'The vibe, the tone, the language that would make you cringe if your agent used it.' },
  { id: 5, section: 'Identity', label: 'If your agent had a name, what would it be?', type: 'text', placeholder: 'Can be a real name, a nickname, a concept. Whatever fits.' },

  // VOICE & TONE
  { id: 6, section: 'Voice & Tone', label: 'On a scale of 1 to 10, how formal should your agent be? (1 = text from a friend, 10 = legal brief)', type: 'scale', min: 1, max: 10 },
  { id: 7, section: 'Voice & Tone', label: 'How much humor do you want? (1 = zero, 10 = the agent is basically a comedian)', type: 'scale', min: 1, max: 10 },
  { id: 8, section: 'Voice & Tone', label: 'What human, real or fictional, would you most want your agent to sound like?', type: 'textarea', placeholder: 'A celebrity, a character, a person you know, a public figure. Anyone. Explain why.' },
  { id: 9, section: 'Voice & Tone', label: 'How should your agent handle a frustrated client?', type: 'textarea', placeholder: 'Walk us through the ideal response. Tone, approach, what it says, what it avoids.' },
  { id: 10, section: 'Voice & Tone', label: 'Should your agent ever push back or challenge a client? How and when?', type: 'textarea', placeholder: 'Some agents should be agreeable. Others should advocate. Where does yours land?' },

  // CULTURE & TASTE
  { id: 11, section: 'Culture & Taste', label: 'What kind of music would your business play if it had a waiting room?', type: 'textarea', placeholder: 'Genre, artists, specific albums. The vibe matters more than the songs.' },
  { id: 12, section: 'Culture & Taste', label: 'What is your all-time favorite food? And what does that say about you?', type: 'textarea', placeholder: 'This is not random. We use these to train authentic personality into your agent.' },
  { id: 13, section: 'Culture & Taste', label: 'What movies or shows would your business binge?', type: 'textarea', placeholder: 'Not what you think sounds good. What you actually watch.' },
  { id: 14, section: 'Culture & Taste', label: 'What books have shaped how you think about business?', type: 'textarea', placeholder: 'Business books, biographies, fiction. Whatever actually moved you.' },
  { id: 15, section: 'Culture & Taste', label: 'What city does your business feel like it lives in, even if you are not there?', type: 'text', placeholder: 'e.g. New York. Tokyo. New Orleans. Lagos. Miami. Why?' },

  // VALUES
  { id: 16, section: 'Values', label: 'What is the one thing your business refuses to compromise on?', type: 'textarea', placeholder: 'The line you will not cross, no matter what. Speed? Quality? Honesty? Loyalty?' },
  { id: 17, section: 'Values', label: 'What do you believe about money that most people get wrong?', type: 'textarea', placeholder: 'Your actual philosophy. Not the inspirational quote version.' },
  { id: 18, section: 'Values', label: 'Who is your customer really, and what do they deserve?', type: 'textarea', placeholder: 'Not demographics. Who are they as people, and what does your business owe them.' },
  { id: 19, section: 'Values', label: 'What is your business\'s relationship with failure?', type: 'textarea', placeholder: 'How should your agent talk about mistakes, setbacks, or things that did not work?' },
  { id: 20, section: 'Values', label: 'Finish this sentence: "At the end of the day, this business exists because ___."', type: 'textarea', placeholder: 'Skip the mission statement. Tell us what drives it.' },

  // COMMUNICATION
  { id: 21, section: 'Communication', label: 'How should your agent open a conversation with a new lead?', type: 'textarea', placeholder: 'First impression. Opening line. Energy. Not a template, the approach.' },
  { id: 22, section: 'Communication', label: 'What is the one question your agent should always ask, no matter what?', type: 'textarea', placeholder: 'The question that reveals the most about whether someone is the right fit.' },
  { id: 23, section: 'Communication', label: 'What words or phrases should your agent never use?', type: 'textarea', placeholder: 'Banned language. Corporate speak, buzzwords, or anything that makes you wince.' },
  { id: 24, section: 'Communication', label: 'How should your agent handle silence or a non-response?', type: 'textarea', placeholder: 'Follow up? How many times? How long to wait? What tone on the second reach?' },
  { id: 25, section: 'Communication', label: 'What does your agent say when a client is ready to buy?', type: 'textarea', placeholder: 'The close. How your agent transitions from conversation to commitment.' },

  // EDGE CASES
  { id: 26, section: 'Edge Cases', label: 'What is the weirdest question your business gets, and what is the right answer?', type: 'textarea', placeholder: 'The off-script moment. What does your agent do when nobody has a playbook?' },
  { id: 27, section: 'Edge Cases', label: 'What should your agent do if someone is rude or disrespectful?', type: 'textarea', placeholder: 'Hold the line? De-escalate? Disengage? What is the right move for your brand?' },
  { id: 28, section: 'Edge Cases', label: 'What competitor or alternative do you get compared to most, and how should your agent handle that conversation?', type: 'textarea', placeholder: 'Not what to say against them. How to position yourself without going negative.' },
  { id: 29, section: 'Edge Cases', label: 'If a client is unhappy with the result, what does your agent say?', type: 'textarea', placeholder: 'Recovery language. Tone. What you stand behind and what the path forward looks like.' },
  { id: 30, section: 'Edge Cases', label: 'Last question: what do you want people to feel after every interaction with your business?', type: 'textarea', placeholder: 'Not what they should think. How they should feel. That is who your agent is.' },
];

const SECTIONS = ['Identity', 'Voice & Tone', 'Culture & Taste', 'Values', 'Communication', 'Edge Cases'];

export default function AgentQuestionsClient() {
  const [answers, setAnswers] = useState<Record<number, string | number>>({});
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [activeSection, setActiveSection] = useState('Identity');

  const set = (id: number, val: string | number) => setAnswers(p => ({ ...p, [id]: val }));

  const answered = Object.keys(answers).length;
  const pct = Math.round((answered / 30) * 100);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch('/api/agent-questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, answers }),
      });
    } catch (_) {}
    setSubmitting(false);
    setSubmitted(true);
  };

  const sectionQs = (s: string) => QUESTIONS.filter(q => q.section === s);
  const sectionDone = (s: string) => sectionQs(s).every(q => answers[q.id] !== undefined && answers[q.id] !== '');

  if (submitted) return (
    <div style={{ minHeight:'100vh', background:'#0A0A0A', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'system-ui,sans-serif' }}>
      <div style={{ textAlign:'center', maxWidth:620, padding:'40px 24px' }}>
        <div style={{ fontSize:64, marginBottom:24 }}>🤖</div>
        <h2 style={{ fontSize:'clamp(28px,4vw,48px)', fontWeight:900, color:'#F5F0E8', letterSpacing:'-1.5px', marginBottom:16 }}>
          Your agent's soul<br/><span style={{ color:G }}>is taking shape.</span>
        </h2>
        <p style={{ fontSize:16, color:'rgba(245,240,232,0.55)', lineHeight:1.75, marginBottom:32 }}>
          We have everything we need to start building. One of our team will reach out to {email} within one business day to confirm details before we begin.
        </p>
        <a href="/consultation" style={{ display:'inline-block', background:G, color:'#0A0A0A', fontWeight:900, fontSize:14, padding:'14px 36px', textDecoration:'none', letterSpacing:'1px' }}>
          BOOK YOUR KICKOFF CALL →
        </a>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight:'100vh', background:'#0A0A0A', color:'#F5F0E8', fontFamily:'system-ui,sans-serif' }}>
      <style>{`
        textarea { resize: vertical; }
        .aq-scale-btn { transition: all 0.15s; }
        .aq-scale-btn:hover { background: rgba(0,200,150,0.15) !important; border-color: #00C896 !important; }
        .section-pill { transition: all 0.2s; cursor: pointer; }
        .q-card { transition: border-color 0.2s; }
        .q-card:focus-within { border-color: rgba(0,200,150,0.35) !important; }
        input[type=text], input[type=email], textarea { outline: none; transition: border 0.2s; }
        input[type=text]:focus, input[type=email]:focus, textarea:focus { border-color: #00C896 !important; }
        @media(max-width:800px){ .aq-layout { grid-template-columns: 1fr !important; } .aq-sidebar { display: none !important; } }
      `}</style>

      {/* NAV */}
      <nav style={{ padding:'16px 5vw', borderBottom:'1px solid #1a1a1a', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:12 }}>
        <a href="/" style={{ fontWeight:900, fontSize:18, color:'#F5F0E8', textDecoration:'none' }}>Voice<span style={{ color:G }}>OfCash</span></a>
        <a href="/consultation" style={{ background:G, color:'#0A0A0A', fontWeight:800, fontSize:13, padding:'10px 24px', textDecoration:'none' }}>BOOK FREE CALL →</a>
      </nav>

      {/* HERO */}
      <section style={{ padding:'80px 5vw 0', maxWidth:960, margin:'0 auto' }}>
        <div style={{ fontSize:11, letterSpacing:'3px', color:G, marginBottom:20 }}>AGENT SOUL INTAKE</div>
        <h1 style={{ fontSize:'clamp(36px,5.5vw,72px)', fontWeight:900, lineHeight:0.95, letterSpacing:'-2.5px', marginBottom:24 }}>
          Who do you want<br/><span style={{ color:G }}>to hang out with?</span>
        </h1>
        <p style={{ fontSize:'clamp(16px,1.8vw,20px)', color:'rgba(245,240,232,0.55)', lineHeight:1.75, maxWidth:700, marginBottom:16 }}>
          Before we build your AI agent, we need to know who it is, not just what it does. Every great agent has a soul behind the system. A personality. A voice. A set of values it holds even when no one is watching.
        </p>
        <p style={{ fontSize:16, color:'rgba(245,240,232,0.45)', lineHeight:1.75, maxWidth:700, marginBottom:48 }}>
          This is not a technical questionnaire. There are no wrong answers. Think of it as building the person you want sitting at the front of your business, the one who represents everything you stand for, every conversation, every day.
        </p>

        {/* WHY SOUL MATTERS */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))', gap:16, marginBottom:80, paddingBottom:80, borderBottom:'1px solid #1a1a1a' }}>
          {[
            { icon:'🧠', title:'Personality is not decoration.', body:'The agents that convert are the ones that feel like talking to a person who actually knows the business. Tone, humor, warmth, directness, these are not aesthetic choices. They are performance variables.' },
            { icon:'🎯', title:'Your voice is your edge.', body:'Generic agents give generic results. When your agent sounds exactly like your best salesperson on their best day, every interaction becomes a brand touchpoint. That is not automation. That is leverage.' },
            { icon:'🔒', title:'Soul is what holds under pressure.', body:'Any agent can handle a smooth conversation. The ones with real soul handle the frustrated client, the weird question, the uncomfortable moment, and come out the other side still representing you well.' },
            { icon:'♾️', title:'It compounds over time.', body:'The more clearly we know who your agent is, the better it gets over months of optimization. A well-defined soul gives us a north star for every improvement. Without it, we are just guessing.' },
          ].map(c => (
            <div key={c.title} style={{ background:'#111', border:'1px solid #1a1a1a', padding:'28px 24px' }}>
              <div style={{ fontSize:28, marginBottom:14 }}>{c.icon}</div>
              <div style={{ fontWeight:900, fontSize:14, color:'#F5F0E8', marginBottom:10 }}>{c.title}</div>
              <div style={{ fontSize:13, color:'rgba(245,240,232,0.5)', lineHeight:1.7 }}>{c.body}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PROGRESS BAR */}
      <div style={{ position:'sticky', top:0, zIndex:50, background:'rgba(10,10,10,0.95)', backdropFilter:'blur(12px)', borderBottom:'1px solid #1a1a1a', padding:'14px 5vw', display:'flex', alignItems:'center', gap:20 }}>
        <div style={{ flex:1, height:4, background:'#1a1a1a', borderRadius:0 }}>
          <div style={{ width:`${pct}%`, height:'100%', background:G, transition:'width 0.4s' }} />
        </div>
        <div style={{ fontSize:13, fontWeight:800, color:G, whiteSpace:'nowrap' }}>{answered}/30 answered</div>
      </div>

      {/* MAIN LAYOUT */}
      <div className="aq-layout" style={{ display:'grid', gridTemplateColumns:'220px 1fr', gap:0, maxWidth:1100, margin:'0 auto', padding:'48px 5vw 80px' }}>

        {/* SIDEBAR */}
        <div className="aq-sidebar" style={{ paddingRight:40 }}>
          <div style={{ position:'sticky', top:72, display:'flex', flexDirection:'column', gap:4 }}>
            <div style={{ fontSize:10, letterSpacing:'2px', color:'rgba(245,240,232,0.3)', marginBottom:12 }}>SECTIONS</div>
            {SECTIONS.map(s => (
              <button key={s} onClick={() => { setActiveSection(s); document.getElementById('section-' + s)?.scrollIntoView({ behavior:'smooth', block:'start' }); }}
                className="section-pill"
                style={{ textAlign:'left', background:'none', border:'none', cursor:'pointer', padding:'10px 14px', fontSize:13, fontWeight:activeSection===s?900:500, color:activeSection===s?G:'rgba(245,240,232,0.45)', display:'flex', justifyContent:'space-between', alignItems:'center', borderLeft:`2px solid ${activeSection===s?G:'transparent'}` }}>
                {s}
                {sectionDone(s) && <span style={{ color:G, fontSize:12 }}>✓</span>}
              </button>
            ))}
            <div style={{ marginTop:24, fontSize:12, color:'rgba(245,240,232,0.3)', lineHeight:1.6 }}>
              Take your time.<br/>There is no rush.<br/>Every word counts.
            </div>
          </div>
        </div>

        {/* QUESTIONS */}
        <div>
          <form onSubmit={handleSubmit}>
            {SECTIONS.map((section, si) => (
              <div key={section} id={`section-${section}`} style={{ marginBottom:72 }}>
                <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:32, paddingBottom:20, borderBottom:'1px solid #1a1a1a' }}>
                  <div style={{ width:36, height:36, background:'rgba(0,200,150,0.1)', border:`1px solid ${G}44`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:13, fontWeight:900, color:G, flexShrink:0 }}>{String(si+1).padStart(2,'0')}</div>
                  <div>
                    <div style={{ fontWeight:900, fontSize:20, color:'#F5F0E8' }}>{section}</div>
                    <div style={{ fontSize:12, color:'rgba(245,240,232,0.35)' }}>{sectionQs(section).length} questions</div>
                  </div>
                </div>

                {sectionQs(section).map((q, qi) => (
                  <div key={q.id} className="q-card" style={{ background:'#111', border:'1px solid #1a1a1a', padding:'28px 28px', marginBottom:16, transition:'border-color 0.2s' }}>
                    <div style={{ display:'flex', gap:14, alignItems:'flex-start', marginBottom:16 }}>
                      <span style={{ fontSize:11, color:'rgba(245,240,232,0.25)', fontWeight:700, flexShrink:0, marginTop:2 }}>{String(q.id).padStart(2,'0')}</span>
                      <label style={{ fontSize:15, fontWeight:800, color:'#F5F0E8', lineHeight:1.5, flex:1 }}>{q.label}</label>
                    </div>

                    {q.type === 'textarea' && (
                      <textarea value={(answers[q.id] as string) || ''} onChange={e => set(q.id, e.target.value)}
                        placeholder={q.placeholder} rows={4}
                        style={{ width:'100%', background:'rgba(255,255,255,0.03)', border:'1px solid #2a2a2a', color:'#F5F0E8', fontSize:14, padding:'14px 16px', fontFamily:'inherit', lineHeight:1.65 }} />
                    )}

                    {q.type === 'text' && (
                      <input type="text" value={(answers[q.id] as string) || ''} onChange={e => set(q.id, e.target.value)}
                        placeholder={q.placeholder}
                        style={{ width:'100%', background:'rgba(255,255,255,0.03)', border:'1px solid #2a2a2a', color:'#F5F0E8', fontSize:14, padding:'14px 16px', fontFamily:'inherit' }} />
                    )}

                    {q.type === 'scale' && (
                      <div>
                        <div style={{ display:'flex', gap:8, marginBottom:10, flexWrap:'wrap' }}>
                          {Array.from({length:(q.max||10)-(q.min||1)+1},(_,i)=>(q.min||1)+i).map(n => (
                            <button key={n} type="button" onClick={() => set(q.id, n)} className="aq-scale-btn"
                              style={{ width:44, height:44, background:answers[q.id]===n?G:'rgba(255,255,255,0.03)', border:`1px solid ${answers[q.id]===n?G:'#2a2a2a'}`, color:answers[q.id]===n?'#0A0A0A':'rgba(245,240,232,0.7)', fontWeight:900, fontSize:14, cursor:'pointer' }}>
                              {n}
                            </button>
                          ))}
                        </div>
                        {q.min !== undefined && (
                          <div style={{ display:'flex', justifyContent:'space-between', fontSize:11, color:'rgba(245,240,232,0.3)' }}>
                            <span>{q.id===6?'Text from a friend':'Zero'}</span>
                            <span>{q.id===6?'Legal brief':'Full comedian'}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}

            {/* SUBMIT */}
            <div style={{ background:'#0D1A0D', border:`1px solid ${G}22`, padding:'40px 36px', marginTop:16 }}>
              <div style={{ fontSize:11, letterSpacing:'3px', color:G, marginBottom:16 }}>ALMOST DONE</div>
              <h3 style={{ fontSize:'clamp(20px,2.5vw,32px)', fontWeight:900, letterSpacing:'-1px', marginBottom:8 }}>
                One last thing before we build your soul.
              </h3>
              <p style={{ fontSize:14, color:'rgba(245,240,232,0.5)', marginBottom:28, lineHeight:1.7 }}>
                We will send a summary of your responses and reach out within one business day to confirm before we start building.
              </p>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:24 }}>
                <div>
                  <label style={{ fontSize:12, fontWeight:700, color:'rgba(245,240,232,0.4)', letterSpacing:'1px', display:'block', marginBottom:8 }}>YOUR NAME</label>
                  <input type="text" value={name} onChange={e=>setName(e.target.value)} required placeholder="First and last"
                    style={{ width:'100%', background:'rgba(255,255,255,0.04)', border:'1px solid #2a2a2a', color:'#F5F0E8', fontSize:14, padding:'13px 16px', fontFamily:'inherit' }} />
                </div>
                <div>
                  <label style={{ fontSize:12, fontWeight:700, color:'rgba(245,240,232,0.4)', letterSpacing:'1px', display:'block', marginBottom:8 }}>YOUR EMAIL</label>
                  <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required placeholder="Where should we send the summary?"
                    style={{ width:'100%', background:'rgba(255,255,255,0.04)', border:'1px solid #2a2a2a', color:'#F5F0E8', fontSize:14, padding:'13px 16px', fontFamily:'inherit' }} />
                </div>
              </div>
              <button type="submit" disabled={submitting}
                style={{ background:G, color:'#0A0A0A', fontWeight:900, fontSize:15, padding:'18px 48px', border:'none', cursor:submitting?'not-allowed':'pointer', letterSpacing:'1px', opacity:submitting?0.7:1, width:'100%' }}>
                {submitting ? 'SENDING...' : 'SUBMIT SOUL QUESTIONNAIRE →'}
              </button>
              <p style={{ fontSize:12, color:'rgba(245,240,232,0.25)', marginTop:12, textAlign:'center' }}>
                Your responses are confidential and used only to build and train your AI agent.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
