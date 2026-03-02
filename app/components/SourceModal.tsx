"use client";
import { useEffect, useState } from "react";

interface SourceInfo {
  name: string;
  url: string;
  stat: string;
  label: string;
  description: string;
}

interface Props {
  source: SourceInfo | null;
  onClose: () => void;
}

const G = "#00C896";

export default function SourceModal({ source, onClose }: Props) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setImgLoaded(false);
    setImgError(false);
  }, [source]);

  useEffect(() => {
    if (!source) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", handler); document.body.style.overflow = ""; };
  }, [source, onClose]);

  if (!source) return null;

  const screenshotUrl = `https://api.microlink.io/?url=${encodeURIComponent(source.url)}&screenshot=true&meta=false&embed=screenshot.url`;

  return (
    <div
      onClick={onClose}
      style={{
        position:"fixed", inset:0, background:"rgba(0,0,0,0.85)", zIndex:9999,
        display:"flex", alignItems:"center", justifyContent:"center", padding:20,
        backdropFilter:"blur(4px)",
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background:"#111", border:`1px solid ${G}44`, maxWidth:640, width:"100%",
          maxHeight:"90vh", overflow:"auto", position:"relative",
        }}
      >
        {/* Header */}
        <div style={{ padding:"20px 24px 16px", borderBottom:"1px solid #1a1a1a", display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
          <div>
            <div style={{ fontSize:11, letterSpacing:"1.5px", color:G, marginBottom:6 }}>SOURCE REFERENCE</div>
            <div style={{ fontWeight:800, fontSize:18, color:"#F5F0E8", lineHeight:1.2 }}>{source.name}</div>
          </div>
          <button onClick={onClose} style={{ background:"none", border:"none", color:"#666", fontSize:22, cursor:"pointer", padding:"0 0 0 16px", lineHeight:1 }}>✕</button>
        </div>

        {/* Stat callout */}
        <div style={{ padding:"16px 24px", background:"#001a12", borderBottom:"1px solid #1a1a1a" }}>
          <span style={{ fontSize:28, fontWeight:900, color:G }}>{source.stat}</span>
          <span style={{ fontSize:14, color:"rgba(245,240,232,0.6)", marginLeft:12 }}>{source.label}</span>
        </div>

        {/* Description */}
        <div style={{ padding:"16px 24px", borderBottom:"1px solid #1a1a1a" }}>
          <p style={{ fontSize:13, color:"rgba(245,240,232,0.55)", lineHeight:1.6 }}>{source.description}</p>
        </div>

        {/* Screenshot preview */}
        <div style={{ padding:"16px 24px", borderBottom:"1px solid #1a1a1a" }}>
          <div style={{ fontSize:11, letterSpacing:"1px", color:"#444", marginBottom:12 }}>ARTICLE PREVIEW</div>
          <div style={{ position:"relative", background:"#0a0a0a", minHeight:180, display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden" }}>
            {!imgLoaded && !imgError && (
              <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", gap:8 }}>
                <div style={{ width:28, height:28, border:`2px solid ${G}`, borderTopColor:"transparent", borderRadius:"50%", animation:"spin 0.8s linear infinite" }} />
                <div style={{ fontSize:11, color:"#444" }}>Loading preview...</div>
              </div>
            )}
            {imgError && (
              <div style={{ padding:24, textAlign:"center" }}>
                <div style={{ fontSize:13, color:"#444", marginBottom:8 }}>Preview unavailable</div>
                <div style={{ fontSize:11, color:"#333" }}>Open the link below to view the full study</div>
              </div>
            )}
            <img
              src={screenshotUrl}
              alt={`${source.name} article preview`}
              onLoad={() => setImgLoaded(true)}
              onError={() => setImgError(true)}
              style={{
                width:"100%", display: imgLoaded ? "block" : "none",
                opacity:0.85, transition:"opacity 0.3s",
              }}
            />
          </div>
        </div>

        {/* CTA */}
        <div style={{ padding:"16px 24px", display:"flex", gap:12, flexWrap:"wrap" }}>
          <a href={source.url} target="_blank" rel="noopener noreferrer"
            style={{ background:G, color:"#0A0A0A", fontWeight:800, fontSize:13, padding:"12px 24px", textDecoration:"none", letterSpacing:"1px", flex:1, textAlign:"center" }}>
            READ FULL STUDY →
          </a>
          <button onClick={onClose}
            style={{ background:"none", border:"1px solid #333", color:"#888", fontSize:13, padding:"12px 24px", cursor:"pointer", letterSpacing:"1px", flex:1 }}>
            CLOSE
          </button>
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
