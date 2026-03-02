"use client";
import { useEffect, useRef, useState } from "react";

const TW = 64, TH = 32, COLS = 16, ROWS = 12;

const AGENTS_DEF = [
  { name:"GZA", alias:"The Genius", emoji:"🧠", color:"#8B5CF6", status:"active", mission:"Hive orchestration + strategy", fileCount:1018, model:"claude-opus-4-6", startX:7.5, startY:5.5 },
  { name:"Method Man", alias:"Johnny Blaze", emoji:"💰", color:"#D4AF37", status:"building", mission:"Trading, UFC + Polymarket", fileCount:477, model:"claude-sonnet-4-6", startX:2.5, startY:1.5 },
  { name:"Ghostface Killah", alias:"Tony Starks", emoji:"👻", color:"#F59E0B", status:"building", mission:"E-commerce ops", fileCount:105, model:"claude-sonnet-4-6", startX:13.5, startY:2.5 },
  { name:"Raekwon", alias:"The Chef", emoji:"🍳", color:"#10B981", status:"building", mission:"Content + SEO", fileCount:127, model:"claude-sonnet-4-6", startX:2.5, startY:5.5 },
  { name:"Inspectah Deck", alias:"Rebel INS", emoji:"🔍", color:"#3B82F6", status:"building", mission:"WeBearish mission lead", fileCount:85, model:"claude-sonnet-4-6", startX:13.5, startY:5.5 },
  { name:"ODB", alias:"Ol' Dirty Bastard", emoji:"🤪", color:"#EF4444", status:"building", mission:"Memes + viral content", fileCount:76, model:"claude-sonnet-4-6", startX:3.5, startY:9.5 },
  { name:"Slim Shady", alias:"The Cable Guy", emoji:"😇", color:"#6EE7B7", status:"building", mission:"IT ops + security", fileCount:82, model:"claude-sonnet-4-6", startX:12.5, startY:9.5 },
  { name:"U-God", alias:"Golden Arms", emoji:"📖", color:"#6366F1", status:"building", mission:"u-god.com V2 incoming", fileCount:192, model:"claude-sonnet-4-6", startX:6.5, startY:1.5 },
  { name:"Masta Killa", alias:"The Silent Author", emoji:"📚", color:"#78716C", status:"building", mission:"Bear With Me book series", fileCount:35, model:"claude-sonnet-4-6", startX:10.5, startY:1.5 },
];

const THOUGHTS = [
  "C.R.E.A.M. 💰","Protect ya neck...","Wu-Tang is forever","Chess move...",
  "Diversify the bonds","36 chambers deep","Killa beez on attack","💎 Building...",
  "The sword is the mind","Data flowing...","Executing the plan","📊 Numbers up",
  "Content locked in","Strategy loaded","🔥 Next level","Patience...",
  "📜 Genesis 1:1...","In the beginning...","Proverbs 4:7, Wisdom first",
];

const ZONES = [
  { name:"War Table", emoji:"⚔️", col:6, row:3, w:4, h:3 },
  { name:"Trading Desk", emoji:"📈", col:1, row:1, w:3, h:2 },
  { name:"Content Lab", emoji:"✍️", col:12, row:1, w:3, h:2 },
  { name:"Ping Pong", emoji:"🏓", col:1, row:8, w:3, h:3 },
  { name:"Water Cooler", emoji:"💧", col:13, row:8, w:2, h:2 },
  { name:"Smoking Section", emoji:"🌿", col:10, row:9, w:3, h:2 },
  { name:"Server Rack", emoji:"🖥️", col:7, row:9, w:2, h:2 },
  { name:"Workstations", emoji:"💻", col:1, row:4, w:3, h:3 },
  { name:"Intel Corner", emoji:"🔍", col:12, row:4, w:3, h:3 },
  { name:"The Library", emoji:"📜", col:5, row:0, w:3, h:2 },
  { name:"Fireplace", emoji:"🔥", col:9, row:0, w:2, h:2 },
];

function iso(col: number, row: number, ox: number, oy: number) {
  return { x: ox + (col - row) * TW / 2, y: oy + (col + row) * TH / 2 };
}
function rz(zone: any) { return { col: zone.col + Math.random() * zone.w, row: zone.row + Math.random() * zone.h }; }
function shade(hex: string, p: number) {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.max(0, Math.min(255, (n >> 16) + p));
  const g = Math.max(0, Math.min(255, ((n >> 8) & 0xff) + p));
  const b = Math.max(0, Math.min(255, (n & 0xff) + p));
  return `rgb(${r},${g},${b})`;
}

export default function ChamberCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const spritesRef = useRef<any[]>([]);
  const frameRef = useRef(0);
  const animRef = useRef(0);
  const [hovered, setHovered] = useState<any>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width = canvas.parentElement!.clientWidth;
      canvas.height = canvas.parentElement!.clientHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    spritesRef.current = AGENTS_DEF.map((a, i) => {
      const zone = ZONES[i % ZONES.length];
      const pos = rz(zone);
      const ox = canvas.width / 2, oy = 60;
      const sc = iso(pos.col, pos.row, ox, oy);
      return { ...a, x: sc.x, y: sc.y, targetX: sc.x, targetY: sc.y, zone,
        idleTimer: 120 + i * 40, actTimer: 100 + i * 25, thoughtTimer: i * 60,
        thought: undefined as string | undefined, bobPhase: i * 0.7, speed: 0.5 + Math.random() * 0.3,
        facing: "right" as "left" | "right" };
    });

    function drawFloor(w: number) {
      const ox = w / 2, oy = 60;
      for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
          const { x, y } = iso(col, row, ox, oy);
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x + TW/2, y + TH/2);
          ctx.lineTo(x, y + TH);
          ctx.lineTo(x - TW/2, y + TH/2);
          ctx.closePath();
          ctx.fillStyle = (row + col) % 2 === 0 ? "#1a1a2e" : "#16162a";
          ctx.fill();
          ctx.strokeStyle = "#2a2a4a22";
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    function drawZones(w: number) {
      const ox = w / 2, oy = 60;
      ZONES.forEach(z => {
        const cx = z.col + z.w / 2, cr = z.row + z.h / 2;
        const { x, y } = iso(cx, cr, ox, oy);
        ctx.save();
        ctx.globalAlpha = 0.06;
        ctx.beginPath();
        const tl = iso(z.col, z.row, ox, oy);
        const tr = iso(z.col + z.w, z.row, ox, oy);
        const br = iso(z.col + z.w, z.row + z.h, ox, oy);
        const bl = iso(z.col, z.row + z.h, ox, oy);
        ctx.moveTo(tl.x, tl.y); ctx.lineTo(tr.x, tr.y);
        ctx.lineTo(br.x, br.y); ctx.lineTo(bl.x, bl.y);
        ctx.closePath();
        ctx.fillStyle = "#D4AF37"; ctx.fill();
        ctx.restore();
        ctx.font = "10px monospace";
        ctx.textAlign = "center";
        ctx.fillStyle = "#D4AF3755";
        ctx.fillText(`${z.emoji} ${z.name}`, x, y - 4);
      });
    }

    function drawFurniture(w: number, f: number) {
      const ox = w / 2, oy = 60;
      // War table
      const wt = iso(8, 4.5, ox, oy);
      ctx.beginPath(); ctx.ellipse(wt.x, wt.y, 60, 20, 0, 0, Math.PI*2);
      ctx.fillStyle = "#2D1B0E"; ctx.fill();
      ctx.strokeStyle = "#D4AF3744"; ctx.lineWidth = 1.5; ctx.stroke();
      // Server rack
      const sr = iso(8, 10, ox, oy);
      ctx.beginPath(); ctx.roundRect(sr.x-14, sr.y-28, 28, 32, 2);
      ctx.fillStyle = "#1a1a2e"; ctx.fill();
      ctx.strokeStyle = "#333366"; ctx.lineWidth = 1; ctx.stroke();
      for (let i = 0; i < 4; i++) {
        ctx.beginPath(); ctx.arc(sr.x - 6 + i*5, sr.y - 18, 2, 0, Math.PI*2);
        ctx.fillStyle = (f + i*30) % 120 < 60 ? "#00ff88" : "#004422"; ctx.fill();
      }
      // Fireplace
      const fp = iso(10, 0.8, ox, oy);
      ctx.beginPath(); ctx.roundRect(fp.x-28, fp.y-30, 56, 38, 3);
      ctx.fillStyle = "#2A1A0E"; ctx.fill();
      ctx.strokeStyle = "#5C3A1E"; ctx.lineWidth = 2; ctx.stroke();
      const fcs = ["#FF4500","#FF6600","#FFD700","#FF8C00","#FF2200"];
      for (let i = 0; i < 7; i++) {
        const fx = fp.x - 12 + i*4 + Math.sin(f*0.08 + i*1.3)*3;
        const fh = 8 + Math.sin(f*0.1 + i*0.9)*5;
        ctx.beginPath(); ctx.ellipse(fx, fp.y - 6 - fh/2, 3, fh/2, 0, 0, Math.PI*2);
        ctx.fillStyle = fcs[i % fcs.length] + "bb"; ctx.fill();
      }
      // Ping pong table
      const pp = iso(2.5, 9.5, ox, oy);
      ctx.beginPath(); ctx.ellipse(pp.x, pp.y, 40, 14, -0.4, 0, Math.PI*2);
      ctx.fillStyle = "#0D4F2B"; ctx.fill();
      ctx.strokeStyle = "#ffffff22"; ctx.lineWidth = 1; ctx.stroke();
      // Water cooler
      const wc = iso(14, 9, ox, oy);
      ctx.beginPath(); ctx.roundRect(wc.x-8, wc.y-20, 16, 24, 3);
      ctx.fillStyle = "#4488aa"; ctx.fill();
      ctx.strokeStyle = "#66aacc"; ctx.lineWidth = 1; ctx.stroke();
    }

    function drawAgent(sprite: any, t: number) {
      const bob = Math.sin(sprite.bobPhase + t * 0.05) * 2;
      const x = sprite.x, y = sprite.y + bob;
      const active = sprite.status === "active";
      const moving = Math.abs(sprite.x - sprite.targetX) > 2 || Math.abs(sprite.y - sprite.targetY) > 2;

      ctx.beginPath(); ctx.ellipse(x, sprite.y + 12, 12, 5, 0, 0, Math.PI*2);
      ctx.fillStyle = "#00000044"; ctx.fill();

      ctx.beginPath(); ctx.ellipse(x, y - 4, 10, 14, 0, 0, Math.PI*2);
      ctx.fillStyle = sprite.color + (active ? "cc" : "77"); ctx.fill();
      ctx.strokeStyle = active ? sprite.color : "#555"; ctx.lineWidth = 1.5; ctx.stroke();

      ctx.beginPath(); ctx.arc(x, y - 22, 8, 0, Math.PI*2);
      ctx.fillStyle = active ? "#2a2a3e" : "#1a1a2e"; ctx.fill();
      ctx.strokeStyle = sprite.color + (active ? "cc" : "55"); ctx.lineWidth = 1.5; ctx.stroke();

      ctx.font = "14px serif"; ctx.textAlign = "center";
      ctx.fillText(sprite.emoji, x, y - 34);

      ctx.font = "bold 9px monospace"; ctx.fillStyle = sprite.color; ctx.textAlign = "center";
      ctx.fillText(sprite.name.split(" ")[0], x, y + 22);

      if (active) {
        ctx.font = "8px monospace"; ctx.fillStyle = "#888";
        ctx.fillText(sprite.zone.name, x, y + 31);
      }

      const dotColor = sprite.status === "active" ? "#00ff88" : sprite.status === "building" ? "#3B82F6" : "#666";
      ctx.beginPath(); ctx.arc(x + 12, y - 28, 3, 0, Math.PI*2);
      ctx.fillStyle = dotColor; ctx.fill();

      if (moving) {
        const lp = t * 0.15;
        const ls = Math.sin(lp) * 4;
        ctx.beginPath();
        ctx.moveTo(x - 3, y + 8); ctx.lineTo(x - 3 + ls, y + 14);
        ctx.moveTo(x + 3, y + 8); ctx.lineTo(x + 3 - ls, y + 14);
        ctx.strokeStyle = sprite.color + "88"; ctx.lineWidth = 2; ctx.stroke();
      }

      if (sprite.thought && sprite.thoughtTimer > 0) {
        ctx.font = "9px monospace";
        const tw = ctx.measureText(sprite.thought).width + 14;
        const tx = x - tw/2, ty = y - 52;
        ctx.beginPath(); ctx.roundRect(tx, ty-8, tw, 18, 8);
        ctx.fillStyle = "#1a1a2eee"; ctx.fill();
        ctx.strokeStyle = sprite.color + "44"; ctx.lineWidth = 1; ctx.stroke();
        ctx.fillStyle = "#ddd"; ctx.textAlign = "center";
        ctx.fillText(sprite.thought, x, ty + 5);
      }
    }

    function tick() {
      const f = frameRef.current++;
      const w = canvas.width, h = canvas.height;
      const ox = w / 2, oy = 60;

      ctx.clearRect(0, 0, w, h);
      const grad = ctx.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0, "#0a0a1a"); grad.addColorStop(1, "#111122");
      ctx.fillStyle = grad; ctx.fillRect(0, 0, w, h);

      ctx.font = "bold 13px monospace"; ctx.fillStyle = "#D4AF37";
      ctx.textAlign = "center";
      ctx.fillText("⚔  THE 36TH CHAMBER  ⚔", w/2, 28);
      ctx.font = "9px monospace"; ctx.fillStyle = "#555";
      ctx.fillText("Wu-Tang AI War Room, Live View", w/2, 42);

      drawFloor(w); drawZones(w); drawFurniture(w, f);

      spritesRef.current.forEach(s => {
        const dx = s.targetX - s.x, dy = s.targetY - s.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist > 2) { s.x += dx/dist * s.speed; s.y += dy/dist * s.speed; s.facing = dx > 0 ? "right" : "left"; }
        else {
          s.idleTimer--;
          if (s.idleTimer <= 0) {
            if (Math.random() < 0.3) s.zone = ZONES[Math.floor(Math.random() * ZONES.length)];
            const pos = rz(s.zone);
            const sc = iso(pos.col, pos.row, ox, oy);
            s.targetX = sc.x; s.targetY = sc.y;
            s.idleTimer = 150 + Math.random() * 280;
          }
        }
        s.thoughtTimer--;
        if (s.thoughtTimer <= 0) {
          if (Math.random() < 0.15) {
            s.thought = THOUGHTS[Math.floor(Math.random() * THOUGHTS.length)];
            s.thoughtTimer = 120 + Math.random() * 80;
          } else { s.thought = undefined; s.thoughtTimer = 60 + Math.random() * 180; }
        }
      });

      const sorted = [...spritesRef.current].sort((a, b) => a.y - b.y);
      sorted.forEach(s => drawAgent(s, f));

      const pulse = 0.5 + 0.5 * Math.sin(f * 0.05);
      ctx.beginPath(); ctx.arc(w - 16, h - 16, 4, 0, Math.PI*2);
      ctx.fillStyle = `rgba(0,200,150,${0.4 + pulse * 0.6})`; ctx.fill();
      ctx.font = "8px monospace"; ctx.textAlign = "right";
      ctx.fillStyle = "rgba(0,200,150,0.4)"; ctx.fillText("LIVE", w - 22, h - 12);

      animRef.current = requestAnimationFrame(tick);
    }

    animRef.current = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(animRef.current); window.removeEventListener("resize", resize); };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const mx = (e.clientX - rect.left) * (canvasRef.current!.width / rect.width);
    const my = (e.clientY - rect.top) * (canvasRef.current!.height / rect.height);
    setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    let found: any = null;
    for (const s of spritesRef.current) {
      if (Math.sqrt((s.x - mx)**2 + (s.y - my)**2) < 20) { found = s; break; }
    }
    setHovered(found);
  };

  return (
    <div style={{ width:"100%", height:"100%", position:"relative" }} onMouseMove={handleMouseMove}>
      <canvas ref={canvasRef} style={{ width:"100%", height:"100%", display:"block", cursor:"crosshair" }} />
      {hovered && (
        <div style={{
          position:"absolute", left: mouse.x + 16, top: Math.max(0, mouse.y - 60),
          background:"rgba(10,10,20,0.97)", border:`1px solid ${hovered.color}44`,
          padding:"12px 14px", minWidth:180, pointerEvents:"none", zIndex:10,
        }}>
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
            <span style={{ fontSize:20 }}>{hovered.emoji}</span>
            <div>
              <div style={{ fontWeight:700, fontSize:13, color:hovered.color }}>{hovered.name}</div>
              <div style={{ fontSize:11, color:"rgba(255,255,255,0.35)" }}>{hovered.alias}</div>
            </div>
          </div>
          <div style={{ fontSize:11, color:"rgba(255,255,255,0.5)", lineHeight:1.7 }}>
            <div>📍 {hovered.zone?.name}</div>
            <div>🎯 {hovered.mission}</div>
            <div>📁 {hovered.fileCount} files</div>
            <div>🤖 {hovered.model}</div>
          </div>
        </div>
      )}
    </div>
  );
}
