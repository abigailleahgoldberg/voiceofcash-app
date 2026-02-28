"use client";
import { useEffect, useRef } from "react";

const TW = 62, TH = 31;
const COLS = 8, ROWS = 8;

function iso(col: number, row: number, ox: number, oy: number) {
  return { x: ox + (col - row) * TW / 2, y: oy + (col + row) * TH / 2 };
}

const FLOOR_COLORS = ["#0d1f2d", "#0f2235"];

const STATIONS = [
  { col: 3, row: 0, label: "Trading", icon: "📈", color: "#1a3a2a" },
  { col: 6, row: 1, label: "Fireplace", icon: "🔥", color: "#2a1a0a" },
  { col: 0, row: 3, label: "Server Rack", icon: "⚙", color: "#1a1a2a" },
  { col: 6, row: 3, label: "Content Lab", icon: "✍", color: "#1a2a2a" },
  { col: 0, row: 5, label: "Ping Pong", icon: "🏓", color: "#0a1a1a" },
  { col: 5, row: 5, label: "Intel Corner", icon: "🔍", color: "#1a1a1a" },
  { col: 2, row: 6, label: "Smoking Section", icon: "💨", color: "#1a1a0a" },
  { col: 5, row: 7, label: "Water Cooler", icon: "💧", color: "#0a1a2a" },
];

interface Agent {
  name: string; color: string; headColor: string;
  gridX: number; gridY: number;
  targetX: number; targetY: number;
  activities: string[]; actIdx: number;
  bobOffset: number; bobSpeed: number;
  moveTimer: number; actTimer: number;
  bubble: string; bubbleAlpha: number;
}

const AGENT_DEFS = [
  { name:"GZA", color:"#7C3AED", headColor:"#A78BFA", startX:3.5, startY:3.5,
    activities:[
      "strategizing","hive sync complete","reading all 987 files",
      "overseeing ops","analyzing intel","sipping green tea",
      "staring at the ceiling (thinking)","deep in thought",
      "rereading Sun Tzu","playing chess vs. self",
      "writing in journal","meditating","reviewing the plan",
      "watching the agents work","everything under control"
    ]},
  { name:"Method Man", color:"#1E3A8A", headColor:"#60A5FA", startX:2.5, startY:1.5,
    activities:[
      "trading","monitoring BTC","running P&L",
      "portfolio review","BTC +2.3% 👀","grabbing coffee",
      "checking the charts again","on a smoke break",
      "reading WSJ","refreshing Coinbase",
      "calculating risk","setting stop-loss","Friday cycle prep",
      "staring at green candles","back in 5"
    ]},
  { name:"U-God", color:"#065F46", headColor:"#34D399", startX:1.5, startY:1.5,
    activities:[
      "researching","u-god.com live — 847 sessions","reading the Torah",
      "indexing sacred texts","translating Sanskrit",
      "cross-referencing sources","taking notes",
      "quietly reading","studying the Quran",
      "meditating (do not disturb)","comparing world religions",
      "writing a new holiday entry","answering a query",
      "deep in ancient scripture","returning from the library"
    ]},
  { name:"Raekwon", color:"#14532D", headColor:"#4ADE80", startX:1.5, startY:3.5,
    activities:[
      "writing content","SEO research","drafting article",
      "keyword clusters locked","content queued: 4 posts",
      "googling himself (it's research)","checking Google rankings",
      "editing a paragraph for the 5th time","making coffee",
      "reviewing meta descriptions","comparing competitors",
      "writing a blog intro","drafting headlines",
      "checking the content calendar","back at the keyboard"
    ]},
  { name:"Slim Shady", color:"#134E4A", headColor:"#2DD4BF", startX:0.5, startY:4.5,
    activities:[
      "monitoring systems","security scan in progress",
      "blocking 3 crawlers","firewall active",
      "on break (still watching)","pretending to be on break",
      "eating a sandwich","reading IT forums",
      "patching a vulnerability","running diagnostics",
      "checking the perimeter","logging suspicious activity",
      "I am always on break","updating blocklist","system nominal"
    ]},
  { name:"ODB", color:"#7F1D1D", headColor:"#F87171", startX:3.5, startY:6.5,
    activities:[
      "burning one 💨","meme drafted — fire","vibes: immaculate",
      "chaos theory in motion","awaiting approval",
      "freestyling at the water cooler","sending a vibe check",
      "posting something unpredictable","reading random Wikipedia",
      "dancing between tasks","not here right now",
      "somewhere in the building","making everyone laugh",
      "doing 3 things at once","energy = maximum"
    ]},
  { name:"Masta Killa", color:"#374151", headColor:"#9CA3AF", startX:5.5, startY:4.5,
    activities:[
      "outlining chapter 3","long-form draft in progress",
      "patient & precise","publishing queue: 2 ready",
      "researching quietly","reading a physical book",
      "making notes in the margin","reviewing the outline",
      "not rushing anything","editing with intention",
      "on page 247","drinking water mindfully",
      "thinking before writing","returning missed call from publisher",
      "writing the right sentence"
    ]},
  { name:"Ghostface", color:"#78350F", headColor:"#FBBF24", startX:6.5, startY:3.5,
    activities:[
      "copywriting","brand update pushed",
      "e-comm ops running","product copy: 6 SKUs",
      "conversion rate: up 4%","on the phone with a vendor",
      "reviewing the brand bible","updating the style guide",
      "checking competitor pricing","running a split test",
      "making the sale","building something valuable",
      "coffee in hand, ideas flowing","tweaking the CTA",
      "closing a loop"
    ]},
  { name:"Inspectah Deck", color:"#1E3A5F", headColor:"#38BDF8", startX:5.5, startY:3.5,
    activities:[
      "fact-checking","studying scripture","data validated ✓",
      "3 citations verified","source audit complete",
      "reading a research paper","cross-referencing data",
      "flagging an inconsistency","updating the intel file",
      "questioning everything (on purpose)","reviewing footnotes",
      "nothing gets past him","annotating a document",
      "back from the archive","submitting findings"
    ]},
];

export default function ThirtySixthChamber() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const agentsRef = useRef<Agent[]>([]);
  const frameRef = useRef(0);
  const tRef = useRef(0);

  useEffect(() => {
    agentsRef.current = AGENT_DEFS.map((d, i) => ({
      name: d.name, color: d.color, headColor: d.headColor,
      gridX: d.startX, gridY: d.startY,
      targetX: d.startX, targetY: d.startY,
      activities: d.activities, actIdx: 0,
      bobOffset: i * 0.7, bobSpeed: 0.8 + Math.random() * 0.4,
      moveTimer: 80 + i * 40, actTimer: 120 + i * 30,
      bubble: d.activities[0], bubbleAlpha: 1,
    }));

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const W = canvas.width, H = canvas.height;
    const OX = W / 2, OY = 52;

    function drawTile(col: number, row: number, fill: string, stroke = "rgba(0,200,150,0.08)") {
      const t = iso(col, row, OX, OY);
      ctx.beginPath();
      ctx.moveTo(t.x, t.y);
      ctx.lineTo(t.x + TW / 2, t.y + TH / 2);
      ctx.lineTo(t.x, t.y + TH);
      ctx.lineTo(t.x - TW / 2, t.y + TH / 2);
      ctx.closePath();
      ctx.fillStyle = fill;
      ctx.fill();
      ctx.strokeStyle = stroke;
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }

    function drawBlock(col: number, row: number, color: string, h = 18) {
      const t = iso(col, row, OX, OY);
      // top face
      ctx.beginPath();
      ctx.moveTo(t.x, t.y - h);
      ctx.lineTo(t.x + TW / 2, t.y + TH / 2 - h);
      ctx.lineTo(t.x, t.y + TH - h);
      ctx.lineTo(t.x - TW / 2, t.y + TH / 2 - h);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();
      // right face
      ctx.beginPath();
      ctx.moveTo(t.x + TW / 2, t.y + TH / 2 - h);
      ctx.lineTo(t.x + TW / 2, t.y + TH / 2);
      ctx.lineTo(t.x, t.y + TH);
      ctx.lineTo(t.x, t.y + TH - h);
      ctx.closePath();
      ctx.fillStyle = shadeColor(color, -25);
      ctx.fill();
      // left face
      ctx.beginPath();
      ctx.moveTo(t.x - TW / 2, t.y + TH / 2 - h);
      ctx.lineTo(t.x - TW / 2, t.y + TH / 2);
      ctx.lineTo(t.x, t.y + TH);
      ctx.lineTo(t.x, t.y + TH - h);
      ctx.closePath();
      ctx.fillStyle = shadeColor(color, -40);
      ctx.fill();
      ctx.strokeStyle = "rgba(0,200,150,0.15)";
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }

    function shadeColor(hex: string, pct: number) {
      const n = parseInt(hex.slice(1), 16);
      const r = Math.max(0, Math.min(255, (n >> 16) + pct));
      const g = Math.max(0, Math.min(255, ((n >> 8) & 0xff) + pct));
      const b = Math.max(0, Math.min(255, (n & 0xff) + pct));
      return `rgb(${r},${g},${b})`;
    }

    function drawAgent(agent: Agent, t: number) {
      const bob = Math.sin(t * agent.bobSpeed + agent.bobOffset) * 2.5;
      // Smooth lerp toward target
      agent.gridX += (agent.targetX - agent.gridX) * 0.04;
      agent.gridY += (agent.targetY - agent.gridY) * 0.04;
      const s = iso(agent.gridX, agent.gridY, OX, OY);
      const sx = s.x, sy = s.y + TH / 2 - 4 + bob;

      // Shadow
      ctx.beginPath();
      ctx.ellipse(sx, sy + 2, 11, 4, 0, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0,0,0,0.3)";
      ctx.fill();

      // Body
      ctx.beginPath();
      ctx.ellipse(sx, sy - 6, 9, 11, 0, 0, Math.PI * 2);
      ctx.fillStyle = agent.color;
      ctx.fill();
      ctx.strokeStyle = agent.headColor;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Head
      ctx.beginPath();
      ctx.arc(sx, sy - 20, 7, 0, Math.PI * 2);
      ctx.fillStyle = agent.headColor;
      ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,0.2)";
      ctx.lineWidth = 0.5;
      ctx.stroke();

      // Eyes
      ctx.beginPath();
      ctx.arc(sx - 2.5, sy - 21, 1.2, 0, Math.PI * 2);
      ctx.arc(sx + 2.5, sy - 21, 1.2, 0, Math.PI * 2);
      ctx.fillStyle = "#0A0A0A";
      ctx.fill();

      // Name label
      ctx.font = "bold 9px 'DM Sans', sans-serif";
      ctx.textAlign = "center";
      const shortName = agent.name.split(" ")[0];
      const tw2 = ctx.measureText(shortName).width + 10;
      ctx.fillStyle = "rgba(0,0,0,0.6)";
      ctx.beginPath();
      ctx.roundRect(sx - tw2 / 2, sy - 1, tw2, 12, 3);
      ctx.fill();
      ctx.fillStyle = agent.headColor;
      ctx.fillText(shortName, sx, sy + 9);

      // Activity bubble
      if (agent.bubbleAlpha > 0) {
        const txt = agent.bubble;
        ctx.font = "8px 'DM Sans', sans-serif";
        const bw = ctx.measureText(txt).width + 12;
        const bx = sx - bw / 2;
        const by = sy - 38;
        ctx.globalAlpha = Math.min(agent.bubbleAlpha, 0.92);
        ctx.fillStyle = "rgba(0,10,15,0.85)";
        ctx.beginPath();
        ctx.roundRect(bx, by, bw, 14, 4);
        ctx.fill();
        ctx.strokeStyle = "rgba(0,200,150,0.35)";
        ctx.lineWidth = 0.5;
        ctx.stroke();
        ctx.fillStyle = "#00C896";
        ctx.fillText(txt, sx, by + 10);
        ctx.globalAlpha = 1;
      }
    }

    function tick() {
      tRef.current += 0.016;
      const t = tRef.current;
      ctx.clearRect(0, 0, W, H);

      // Title
      ctx.font = "bold 11px 'Bebas Neue', sans-serif";
      ctx.letterSpacing = "3px";
      ctx.textAlign = "center";
      ctx.fillStyle = "rgba(0,200,150,0.7)";
      ctx.fillText("✕  THE 36TH CHAMBER  ✕", W / 2, 20);
      ctx.font = "9px monospace";
      ctx.fillStyle = "rgba(0,200,150,0.35)";
      ctx.fillText("Wu-Tang AI War Room — Live View", W / 2, 34);

      // Floor tiles (sort back-to-front)
      for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
          const even = (col + row) % 2 === 0;
          drawTile(col, row, FLOOR_COLORS[even ? 0 : 1]);
        }
      }

      // Stations
      for (const st of STATIONS) {
        drawBlock(st.col, st.row, st.color, 14);
        const p = iso(st.col + 0.5, st.row, OX, OY);
        ctx.font = "8px sans-serif";
        ctx.textAlign = "center";
        ctx.fillStyle = "rgba(0,200,150,0.5)";
        ctx.fillText(st.icon + " " + st.label, p.x, p.y - 4);
      }

      // Update + draw agents (sorted by row for correct overlap)
      const sorted = [...agentsRef.current].sort((a, b) => (a.gridX + a.gridY) - (b.gridX + b.gridY));
      for (const agent of sorted) {
        agent.moveTimer--;
        agent.actTimer--;
        if (agent.moveTimer <= 0) {
          agent.targetX = 0.5 + Math.floor(Math.random() * (COLS - 1));
          agent.targetY = 0.5 + Math.floor(Math.random() * (ROWS - 1));
          agent.moveTimer = 160 + Math.random() * 200;
        }
        if (agent.actTimer <= 0) {
          agent.actIdx = (agent.actIdx + 1) % agent.activities.length;
          agent.bubble = agent.activities[agent.actIdx];
          agent.bubbleAlpha = 1;
          agent.actTimer = 90 + Math.random() * 120;
        }
        agent.bubbleAlpha = Math.max(0.3, agent.bubbleAlpha - 0.001);
        drawAgent(agent, t);
      }

      // Live indicator
      const pulse = 0.5 + 0.5 * Math.sin(t * 3);
      ctx.beginPath();
      ctx.arc(W - 16, H - 16, 4, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0,200,150,${0.5 + pulse * 0.5})`;
      ctx.fill();
      ctx.font = "8px monospace";
      ctx.textAlign = "right";
      ctx.fillStyle = "rgba(0,200,150,0.4)";
      ctx.fillText("LIVE", W - 22, H - 12);

      frameRef.current = requestAnimationFrame(tick);
    }

    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={520}
      height={420}
      style={{
        width: "100%",
        maxWidth: 520,
        height: "auto",
        border: "1px solid rgba(0,200,150,0.15)",
        background: "#060d14",
        display: "block",
      }}
    />
  );
}
