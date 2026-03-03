import { useState, useEffect, useRef, useCallback } from "react";

const NODES = [
  { id: "memories", label: "Memories", sub: "core", x: 0.5, y: 0.5, size: 70, primary: true },
  { id: "carto", label: "Carto", sub: "indexing", x: 0.5, y: 0.12, size: 52 },
  { id: "swarm", label: "Swarm", sub: "orchestration", x: 0.82, y: 0.28, size: 52 },
  { id: "apollo", label: "Apollo", sub: "governance", x: 0.18, y: 0.28, size: 52 },
  { id: "delphi", label: "Delphi", sub: "testing", x: 0.78, y: 0.72, size: 52 },
  { id: "hermes", label: "Hermes", sub: "docs", x: 0.22, y: 0.72, size: 52 },
  { id: "deck", label: "Deck", sub: "analytics", x: 0.5, y: 0.88, size: 52 },
  { id: "pencil", label: "Pencil", sub: "design", x: 0.9, y: 0.52, size: 42 },
  { id: "conductor", label: "Conductor", sub: "", x: 0.32, y: 0.08, size: 32, secondary: true },
  { id: "learning", label: "Learning", sub: "", x: 0.72, y: 0.1, size: 32, secondary: true },
  { id: "persona", label: "Persona", sub: "", x: 0.3, y: 0.92, size: 32, secondary: true },
];

const EDGES: [string, string][] = [
  ["memories", "carto"],
  ["memories", "swarm"],
  ["memories", "apollo"],
  ["memories", "delphi"],
  ["memories", "hermes"],
  ["memories", "deck"],
  ["carto", "swarm"],
  ["carto", "apollo"],
  ["swarm", "delphi"],
  ["apollo", "hermes"],
  ["hermes", "deck"],
  ["deck", "delphi"],
  ["carto", "conductor"],
  ["carto", "learning"],
  ["hermes", "persona"],
  ["apollo", "conductor"],
  ["swarm", "learning"],
  ["deck", "persona"],
  ["pencil", "delphi"],
  ["pencil", "swarm"],
];

interface NodeState {
  id: string;
  label: string;
  sub: string;
  x: number;
  y: number;
  size: number;
  primary?: boolean;
  secondary?: boolean;
  px: number;
  py: number;
  baseX: number;
  baseY: number;
  currentSize: number;
  baseSize: number;
  offsetX: number;
  offsetY: number;
  phase: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export default function NetworkGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const nodesRef = useRef<NodeState[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const hoveredRef = useRef<string | null>(null);
  const timeRef = useRef(0);
  const [hovered, setHovered] = useState<string | null>(null);

  const initNodes = useCallback((w: number, h: number) => {
    const scale = Math.min(w, h);

    nodesRef.current = NODES.map((n) => ({
      ...n,
      sub: n.sub || "",
      px: n.x * w,
      py: n.y * h,
      baseX: n.x * w,
      baseY: n.y * h,
      currentSize: n.size * (scale / 900),
      baseSize: n.size * (scale / 900),
      offsetX: 0,
      offsetY: 0,
      phase: Math.random() * Math.PI * 2,
    }));

    particlesRef.current = Array.from({ length: 40 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      size: Math.random() * 2.5 + 0.5,
      alpha: Math.random() * 0.5 + 0.1,
    }));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let w: number, h: number;

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas!.parentElement!.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      canvas!.style.width = w + "px";
      canvas!.style.height = h + "px";
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      initNodes(w, h);
    }

    resize();
    window.addEventListener("resize", resize);

    function getNodeMap() {
      const map: Record<string, NodeState> = {};
      nodesRef.current.forEach((n) => (map[n.id] = n));
      return map;
    }

    function draw() {
      timeRef.current += 0.014;
      const t = timeRef.current;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      ctx!.clearRect(0, 0, w, h);

      // Update particles
      particlesRef.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(212, 175, 55, ${p.alpha})`;
        ctx!.fill();
      });

      // Update node positions (subtle float)
      const nodes = nodesRef.current;
      let newHovered: string | null = null;

      nodes.forEach((n) => {
        const drift = n.primary ? 8 : n.secondary ? 14 : 11;
        n.offsetX = Math.sin(t + n.phase) * drift + Math.sin(t * 1.7 + n.phase * 2.3) * drift * 0.4;
        n.offsetY = Math.cos(t * 0.7 + n.phase + 1) * drift + Math.cos(t * 1.3 + n.phase * 1.8) * drift * 0.4;
        n.px = n.baseX + n.offsetX;
        n.py = n.baseY + n.offsetY;

        // Hover detection
        const dx = mx - n.px;
        const dy = my - n.py;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const hitRadius = n.baseSize + 10;

        if (dist < hitRadius) {
          newHovered = n.id;
          n.currentSize = lerp(n.currentSize, n.baseSize * 1.18, 0.12);
        } else {
          n.currentSize = lerp(n.currentSize, n.baseSize, 0.08);
        }
      });

      if (newHovered !== hoveredRef.current) {
        hoveredRef.current = newHovered;
        setHovered(newHovered);
      }

      const map = getNodeMap();

      // Draw edges
      EDGES.forEach(([a, b]) => {
        const na = map[a];
        const nb = map[b];
        if (!na || !nb) return;

        const isHighlighted =
          hoveredRef.current != null &&
          (a === hoveredRef.current || b === hoveredRef.current);

        ctx!.beginPath();
        ctx!.moveTo(na.px, na.py);
        ctx!.lineTo(nb.px, nb.py);
        ctx!.strokeStyle = isHighlighted
          ? "rgba(212, 175, 55, 0.7)"
          : "rgba(212, 175, 55, 0.15)";
        ctx!.lineWidth = isHighlighted ? 2 : 1;
        ctx!.stroke();

        // Animated dot traveling along edge
        const edgeT = ((t * 0.4 + a.charCodeAt(0) * 0.1) % 1);
        const dotX = lerp(na.px, nb.px, edgeT);
        const dotY = lerp(na.py, nb.py, edgeT);
        ctx!.beginPath();
        ctx!.arc(dotX, dotY, 2, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(212, 175, 55, ${isHighlighted ? 0.8 : 0.3})`;
        ctx!.fill();
      });

      // Draw nodes
      nodes.forEach((n) => {
        const isHov = hoveredRef.current === n.id;
        const r = n.currentSize;

        // Glow
        if (n.primary || isHov) {
          const glow = ctx!.createRadialGradient(n.px, n.py, r * 0.5, n.px, n.py, r * 2);
          glow.addColorStop(0, `rgba(212, 175, 55, ${isHov ? 0.15 : 0.08})`);
          glow.addColorStop(1, "rgba(212, 175, 55, 0)");
          ctx!.beginPath();
          ctx!.arc(n.px, n.py, r * 2, 0, Math.PI * 2);
          ctx!.fillStyle = glow;
          ctx!.fill();
        }

        // Circle fill
        ctx!.beginPath();
        ctx!.arc(n.px, n.py, r, 0, Math.PI * 2);
        const fill = ctx!.createRadialGradient(n.px - r * 0.3, n.py - r * 0.3, 0, n.px, n.py, r);
        fill.addColorStop(0, "rgba(30, 28, 15, 0.9)");
        fill.addColorStop(1, "rgba(10, 10, 10, 0.95)");
        ctx!.fillStyle = fill;
        ctx!.fill();

        // Circle border
        ctx!.beginPath();
        ctx!.arc(n.px, n.py, r, 0, Math.PI * 2);
        ctx!.strokeStyle = isHov
          ? "rgba(245, 208, 96, 0.9)"
          : n.primary
          ? "rgba(212, 175, 55, 0.7)"
          : n.secondary
          ? "rgba(212, 175, 55, 0.25)"
          : "rgba(212, 175, 55, 0.4)";
        ctx!.lineWidth = n.primary ? 2.5 : isHov ? 2 : 1.2;
        ctx!.stroke();

        // Label — size relative to node radius so text stays inside
        const labelSize = n.primary ? r * 0.32 : n.secondary ? r * 0.42 : r * 0.36;
        ctx!.font = `600 ${labelSize}px Inter, system-ui, sans-serif`;
        ctx!.textAlign = "center";
        ctx!.textBaseline = "middle";
        ctx!.fillStyle = isHov
          ? "#fff"
          : n.primary
          ? "#d4af37"
          : n.secondary
          ? "rgba(229, 229, 229, 0.5)"
          : "rgba(229, 229, 229, 0.85)";

        const labelY = n.sub ? n.py - labelSize * 0.35 : n.py;
        ctx!.fillText(n.label, n.px, labelY);

        // Sub-label
        if (n.sub) {
          const subSize = n.primary ? r * 0.22 : r * 0.26;
          ctx!.font = `400 ${subSize}px Inter, system-ui, sans-serif`;
          ctx!.fillStyle = isHov
            ? "rgba(212, 175, 55, 1)"
            : "rgba(212, 175, 55, 0.6)";
          ctx!.fillText(n.sub, n.px, n.py + labelSize * 0.5);
        }
      });

      animRef.current = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animRef.current);
    };
  }, [initNodes]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }, []);

  const handleMouseLeave = useCallback(() => {
    mouseRef.current = { x: -1000, y: -1000 };
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <canvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          cursor: hovered ? "pointer" : "default",
        }}
      />
    </div>
  );
}
