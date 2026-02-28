import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "The Voice of Cash — AI Implementation Partner | Las Vegas";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0A0A0A",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          position: "relative",
        }}
      >
        {/* Grid overlay */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(0,200,150,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,200,150,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          display: "flex",
        }} />
        {/* Gold glow */}
        <div style={{
          position: "absolute", top: "-20%", right: "-10%",
          width: "600px", height: "600px",
          background: "radial-gradient(circle, rgba(0,200,150,0.08) 0%, transparent 65%)",
          display: "flex",
        }} />
        {/* Tag */}
        <div style={{
          display: "flex", alignItems: "center", gap: "10px",
          background: "rgba(0,200,150,0.08)", border: "1px solid rgba(0,200,150,0.2)",
          padding: "8px 20px", borderRadius: "100px",
          fontSize: "14px", letterSpacing: "3px", color: "#00C896",
          textTransform: "uppercase", marginBottom: "28px", width: "fit-content",
        }}>
          AI IMPLEMENTATION PARTNER · LAS VEGAS
        </div>
        {/* Headline */}
        <div style={{
          fontSize: "80px", fontWeight: 900, lineHeight: 0.95,
          letterSpacing: "-2px", color: "#F5F0E8", marginBottom: "28px",
          textTransform: "uppercase",
        }}>
          YOUR MACHINES<br />
          NEED A <span style={{ color: "#00C896" }}>HUMAN</span>
        </div>
        {/* Sub */}
        <div style={{ fontSize: "22px", color: "#888888", maxWidth: "700px", lineHeight: 1.5 }}>
          Real AI systems. Real automation. Real results — for Las Vegas businesses.
        </div>
        {/* Logo bottom */}
        <div style={{
          position: "absolute", bottom: "60px", left: "80px",
          fontSize: "22px", letterSpacing: "4px", color: "#00C896",
          fontWeight: 900, textTransform: "uppercase",
          display: "flex",
        }}>
          THE VOICE OF <span style={{ color: "#F5F0E8", marginLeft: "10px" }}>CASH</span>
        </div>
        <div style={{
          position: "absolute", bottom: "60px", right: "80px",
          fontSize: "16px", color: "#555", display: "flex",
        }}>
          thevoiceofcash.com
        </div>
        {/* Bottom line */}
        <div style={{
          position: "absolute", bottom: 0, left: "10%", right: "10%",
          height: "1px", background: "linear-gradient(90deg, transparent, #00C896, transparent)",
          opacity: 0.3, display: "flex",
        }} />
      </div>
    ),
    { ...size }
  );
}
