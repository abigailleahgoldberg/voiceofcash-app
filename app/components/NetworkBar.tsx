"use client";

import { useState, useEffect } from "react";

const LINKS = [
  { label: "JewSA", href: "https://jewsa.com" },
  { label: "WeBearish", href: "https://webearish.com" },
  { label: "AI Skills Agents", href: "https://aiskillsagents.com" },
];

export default function NetworkBar() {
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    const val = localStorage.getItem("voc-network-bar-dismissed");
    if (val !== "1") setDismissed(false);
  }, []);

  const dismiss = () => {
    localStorage.setItem("voc-network-bar-dismissed", "1");
    setDismissed(true);
  };

  if (dismissed) return null;

  return (
    <div style={{
      background: "#050505",
      height: 28,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 24,
      position: "relative",
      fontSize: 11,
      letterSpacing: "0.5px",
    }}>
      <span style={{ color: "rgba(255,255,255,0.45)", whiteSpace: "nowrap" }}>
        Part of The Voice of Cash Network
      </span>
      <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
        {LINKS.map((l) => (
          <a
            key={l.label}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "rgba(0,255,204,0.7)",
              textDecoration: "none",
              fontSize: 11,
              fontWeight: 500,
              transition: "color 0.2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "#00ffcc")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(0,255,204,0.7)")}
          >
            {l.label}
          </a>
        ))}
      </div>
      <button
        onClick={dismiss}
        aria-label="Dismiss network bar"
        style={{
          position: "absolute",
          right: 12,
          background: "none",
          border: "none",
          color: "rgba(255,255,255,0.35)",
          cursor: "pointer",
          fontSize: 14,
          lineHeight: 1,
          padding: "0 4px",
        }}
      >
        &times;
      </button>
    </div>
  );
}
