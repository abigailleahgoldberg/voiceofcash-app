'use client';

import { useState } from 'react';
import Link from 'next/link';

const BOARD_PASSWORD = 'wutang2026';

const meetings = [
  {
    slug: 'march-8-2026',
    date: 'March 8, 2026',
    title: 'Full Clan Online — Infrastructure Verified',
    tag: 'Latest',
    tagColor: '#c9a84c',
    summary: 'All 9 agents simultaneously online and verified. Model routing standardized. Infrastructure audit complete. Week priorities assigned.',
    agents: ['GZA', 'Raekwon', 'Ghostface', 'Inspectah Deck', 'ODB', 'U-God', 'Masta Killa', 'Slim Shady', 'Methodman'],
  },
  {
    slug: 'march-2026',
    date: 'March 7, 2026',
    title: 'Inaugural Strategy Session',
    tag: 'Founding',
    tagColor: '#4a4a4a',
    summary: 'Seven agents ran independent market research. Two paths to $20k/month identified. TheVoiceOfCash company architecture defined across 6 divisions.',
    agents: ['GZA', 'Raekwon', 'Ghostface', 'Inspectah Deck', 'ODB', 'Masta Killa', 'U-God', 'Slim Shady'],
  },
];

export default function BoardIndexPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === BOARD_PASSWORD) {
      setAuthenticated(true);
    } else {
      setError('Wrong password.');
      setPassword('');
    }
  };

  if (!authenticated) {
    return (
      <>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { background: #080808; }
          .login-wrap {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #080808;
            font-family: 'Inter', -apple-system, sans-serif;
          }
          .login-box {
            text-align: center;
            padding: 48px 40px;
            width: 100%;
            max-width: 380px;
          }
          .login-icon { font-size: 48px; margin-bottom: 20px; display: block; }
          .login-title { font-size: 22px; font-weight: 800; color: #fff; letter-spacing: -0.5px; margin-bottom: 4px; }
          .login-sub { font-size: 13px; color: #555; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 36px; }
          .login-input {
            width: 100%; padding: 14px 18px;
            background: #141414; border: 1px solid #2a2a2a;
            border-radius: 8px; color: #fff; font-size: 15px;
            font-family: inherit; outline: none; margin-bottom: 12px;
            transition: border-color 0.2s;
          }
          .login-input:focus { border-color: #c9a84c; }
          .login-btn {
            width: 100%; padding: 14px;
            background: #c9a84c; color: #000;
            border: none; border-radius: 8px;
            font-weight: 800; font-size: 15px;
            font-family: inherit; cursor: pointer;
            letter-spacing: 0.5px; transition: background 0.2s;
          }
          .login-btn:hover { background: #e0bf6a; }
          .login-error { color: #ff5555; font-size: 13px; margin-bottom: 10px; }
        `}</style>
        <div className="login-wrap">
          <div className="login-box">
            <span className="login-icon">🏯</span>
            <div className="login-title">Wu-Tang Clan AI Operations</div>
            <div className="login-sub">Board Room · Partners Only</div>
            <form onSubmit={handleLogin}>
              <input
                type="password"
                className="login-input"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter password"
                autoFocus
              />
              {error && <div className="login-error">{error}</div>}
              <button type="submit" className="login-btn">Enter the Board Room</button>
            </form>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #080808; color: #e0e0e0; font-family: 'Inter', -apple-system, sans-serif; }

        .topbar {
          background: #0d0d0d;
          border-bottom: 1px solid #1e1e1e;
          padding: 16px 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: sticky;
          top: 0;
          z-index: 100;
        }
        .topbar-left { display: flex; align-items: center; gap: 12px; }
        .topbar-icon { font-size: 24px; }
        .topbar-title { font-size: 16px; font-weight: 800; color: #fff; }
        .topbar-sub { font-size: 11px; color: #555; letter-spacing: 2px; text-transform: uppercase; margin-top: 2px; }
        .signout-btn {
          background: transparent; border: 1px solid #2a2a2a;
          color: #555; padding: 6px 14px; border-radius: 4px;
          cursor: pointer; font-size: 12px; font-family: inherit;
          transition: all 0.2s;
        }
        .signout-btn:hover { border-color: #555; color: #888; }

        .page-wrap { max-width: 800px; margin: 0 auto; padding: 56px 24px 80px; }

        .page-header { margin-bottom: 48px; }
        .page-eyebrow {
          font-size: 11px; letter-spacing: 3px; text-transform: uppercase;
          color: #c9a84c; margin-bottom: 12px; font-weight: 600;
        }
        .page-title {
          font-size: 36px; font-weight: 900; color: #fff;
          letter-spacing: -1px; line-height: 1.1; margin-bottom: 12px;
        }
        .page-desc { font-size: 15px; color: #555; line-height: 1.7; }

        .meetings-list { display: flex; flex-direction: column; gap: 16px; }

        .meeting-card {
          display: block;
          background: #0d0d0d;
          border: 1px solid #1e1e1e;
          border-radius: 12px;
          padding: 28px;
          text-decoration: none;
          transition: border-color 0.2s, background 0.2s;
          position: relative;
          overflow: hidden;
        }
        .meeting-card:hover {
          border-color: #c9a84c;
          background: #0f0f0f;
        }
        .meeting-card::after {
          content: '→';
          position: absolute;
          right: 28px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 20px;
          color: #333;
          transition: color 0.2s, right 0.2s;
        }
        .meeting-card:hover::after {
          color: #c9a84c;
          right: 24px;
        }

        .card-top { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
        .card-date { font-size: 12px; color: #555; font-weight: 500; }
        .card-tag {
          font-size: 10px; font-weight: 700; padding: 3px 10px;
          border-radius: 20px; letter-spacing: 0.5px; text-transform: uppercase;
        }
        .card-title {
          font-size: 20px; font-weight: 800; color: #fff;
          letter-spacing: -0.3px; margin-bottom: 10px;
          padding-right: 32px;
        }
        .card-summary { font-size: 14px; color: #666; line-height: 1.6; margin-bottom: 16px; padding-right: 32px; }
        .card-agents {
          display: flex; flex-wrap: wrap; gap: 6px;
        }
        .agent-pill {
          font-size: 11px; color: #555; background: #141414;
          border: 1px solid #222; border-radius: 20px;
          padding: 3px 10px; font-weight: 500;
        }

        .divider {
          display: flex; align-items: center; gap: 16px;
          margin: 48px 0; color: #222;
          font-size: 11px; letter-spacing: 2px; text-transform: uppercase;
        }
        .divider::before, .divider::after { content: ''; flex: 1; border-top: 1px solid #1e1e1e; }
        .divider span { color: #333; white-space: nowrap; }

        .info-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 16px;
          margin-top: 0;
        }
        .info-card {
          background: #0d0d0d; border: 1px solid #1e1e1e;
          border-radius: 10px; padding: 20px;
        }
        .info-card-title { font-size: 12px; font-weight: 700; color: #888; margin-bottom: 8px; letter-spacing: 1px; text-transform: uppercase; }
        .info-card p { font-size: 13px; color: #555; line-height: 1.6; }
        .info-card p strong { color: #888; }

        @media (max-width: 640px) {
          .topbar { padding: 14px 16px; }
          .page-wrap { padding: 36px 16px 60px; }
          .page-title { font-size: 28px; }
          .info-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="topbar">
        <div className="topbar-left">
          <span className="topbar-icon">🏯</span>
          <div>
            <div className="topbar-title">Wu-Tang Clan AI Operations</div>
            <div className="topbar-sub">Board Room · Partners Only</div>
          </div>
        </div>
        <button className="signout-btn" onClick={() => setAuthenticated(false)}>Sign Out</button>
      </div>

      <div className="page-wrap">
        <div className="page-header">
          <div className="page-eyebrow">Partners Only · Internal</div>
          <h1 className="page-title">Board Meeting Archive</h1>
          <p className="page-desc">Official minutes from Wu-Tang Clan AI Operations strategy sessions. All meetings convened by GZA. Reviewed by RZA.</p>
        </div>

        <div className="meetings-list">
          {meetings.map((m) => (
            <Link key={m.slug} href={`/board/${m.slug}`} className="meeting-card">
              <div className="card-top">
                <span className="card-date">{m.date}</span>
                <span className="card-tag" style={{ background: m.tagColor === '#c9a84c' ? '#1a1500' : '#141414', color: m.tagColor, border: `1px solid ${m.tagColor}33` }}>{m.tag}</span>
              </div>
              <div className="card-title">{m.title}</div>
              <div className="card-summary">{m.summary}</div>
              <div className="card-agents">
                {m.agents.map(a => <span key={a} className="agent-pill">{a}</span>)}
              </div>
            </Link>
          ))}
        </div>

        <div className="divider"><span>About the Board Room</span></div>

        <div className="info-grid">
          <div className="info-card">
            <div className="info-card-title">Meeting Cadence</div>
            <p>Board meetings are convened by <strong>GZA</strong> at the start of each week or after major infrastructure events. Minutes are filed to this archive and to <strong>thevoiceofcash.com/board</strong> within 24 hours.</p>
          </div>
          <div className="info-card">
            <div className="info-card-title">Access</div>
            <p>Board room is <strong>partners only</strong>. Password: <strong>wutang2026</strong>. RZA, David, and Abearica have standing access. Share with intent.</p>
          </div>
          <div className="info-card">
            <div className="info-card-title">The Agents</div>
            <p>9 agents across 2 machines. <strong>GZA + Methodman</strong> on Abigail (Claude). <strong>7 container agents</strong> on R720 Proxmox (Gemini 3 Flash). All independently connected to Discord.</p>
          </div>
          <div className="info-card">
            <div className="info-card-title">Chain of Command</div>
            <p><strong>RZA → GZA → All Agents.</strong> RZA approves all client-facing decisions. GZA coordinates execution. Every client request routes through the Fight Club Discord protocol.</p>
          </div>
        </div>
      </div>
    </>
  );
}
