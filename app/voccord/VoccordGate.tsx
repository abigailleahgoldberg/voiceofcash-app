'use client';
import { useState } from 'react';

export default function VoccordGate() {
  const [pw, setPw]   = useState('');
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErr(false);
    const r = await fetch('/api/voccord-auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: pw }),
    });
    setLoading(false);
    if (r.ok) {
      window.location.reload();
    } else {
      setErr(true);
      setPw('');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(ellipse at 50% 40%, #0d1f0d 0%, #0A0A0A 70%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'DM Sans', system-ui, sans-serif",
    }}>
      <div style={{ textAlign: 'center', padding: '40px 24px', maxWidth: 400 }}>
        <div style={{ fontSize: 11, letterSpacing: '3px', color: '#00C896', marginBottom: 20 }}>
          VOICE OF CASH, INTERNAL
        </div>
        <h1 style={{
          fontSize: 'clamp(28px,5vw,48px)',
          fontWeight: 900,
          letterSpacing: '-1.5px',
          color: '#F5F0E8',
          marginBottom: 8,
          fontFamily: "'Bebas Neue', sans-serif",
        }}>
          VOCCORD
        </h1>
        <p style={{ fontSize: 14, color: 'rgba(245,240,232,0.45)', marginBottom: 36, lineHeight: 1.6 }}>
          Confidential executive briefing. Authorized access only.
        </p>
        <form onSubmit={submit}>
          <input
            type="password"
            value={pw}
            onChange={e => setPw(e.target.value)}
            placeholder="Enter access code"
            autoFocus
            style={{
              width: '100%',
              background: 'rgba(255,255,255,0.05)',
              border: `1px solid ${err ? '#FF7B5C' : 'rgba(0,200,150,0.3)'}`,
              color: '#F5F0E8',
              fontSize: 16,
              padding: '14px 18px',
              outline: 'none',
              marginBottom: 12,
              letterSpacing: '4px',
              textAlign: 'center',
              fontFamily: 'monospace',
            }}
          />
          {err && (
            <p style={{ fontSize: 12, color: '#FF7B5C', marginBottom: 12 }}>
              Access denied. Try again.
            </p>
          )}
          <button type="submit" disabled={loading || !pw} style={{
            width: '100%',
            background: '#00C896',
            color: '#0A0A0A',
            fontWeight: 900,
            fontSize: 14,
            padding: '14px',
            border: 'none',
            cursor: loading || !pw ? 'not-allowed' : 'pointer',
            letterSpacing: '2px',
            opacity: loading || !pw ? 0.6 : 1,
          }}>
            {loading ? 'VERIFYING...' : 'ACCESS BRIEFING'}
          </button>
        </form>
        <p style={{ fontSize: 11, color: 'rgba(245,240,232,0.2)', marginTop: 24 }}>
          thevoiceofcash.com, internal use only
        </p>
      </div>
    </div>
  );
}
