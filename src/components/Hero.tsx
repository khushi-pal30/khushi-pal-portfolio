import { motion } from "framer-motion";
import { useState, useEffect, type CSSProperties } from "react";
import {
  Code2,
  Server,
  Database,
  Zap,
  Boxes,
  GitBranch,
  Cloud,
  ShieldCheck,
  Users,
  Braces,
} from "lucide-react";

// Simple single-pass typewriter for the role line
const Typewriter = ({ text }: { text: string }) => {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(interval);
    }, 45);
    return () => clearInterval(interval);
  }, [text]);
  return (
    <span>
      {displayed}
      <span className="inline-block w-[2px] h-[0.9em] bg-primary ml-1 align-middle animate-pulse" />
    </span>
  );
};

const socials = [
  { label: "GitHub", url: "https://github.com/khushi-pal30" },
  { label: "LinkedIn", url: "https://www.linkedin.com/in/khushi-pal-a4422a280?utm_source=share_via&utm_content=profile&utm_medium=member_android" },
  { label: "Email", url: "mailto:palkhushi163@gmail.com" },
];

// ---- Tech stack architecture diagram (replaces the old photo block) ----
type Node = {
  key: string;
  x: number; y: number; w: number; h: number; // in a 760x760 design grid
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  badge?: string;
};

const GRID_W = 760;
const GRID_H = 760;

const nodes: Node[] = [
  { key: "python", x: 270, y: 25, w: 140, h: 90, title: "Python", icon: <Code2 style={{ width: "clamp(16px,5cqw,26px)", height: "clamp(16px,5cqw,26px)" }} /> },
  {
    key: "django", x: 170, y: 175, w: 340, h: 145, title: "Django", subtitle: "Django + Django REST Framework",
    badge: "DRF", icon: <Server style={{ width: "clamp(18px,5.5cqw,28px)", height: "clamp(18px,5.5cqw,28px)" }} />,
  },
  { key: "postgres", x: 40, y: 395, w: 180, h: 130, title: "PostgreSQL", subtitle: "SQL", icon: <Database style={{ width: "clamp(16px,5cqw,24px)", height: "clamp(16px,5cqw,24px)" }} /> },
  { key: "redis", x: 250, y: 395, w: 180, h: 130, title: "Redis", subtitle: "Caching", icon: <Zap style={{ width: "clamp(16px,5cqw,24px)", height: "clamp(16px,5cqw,24px)" }} /> },
  { key: "docker", x: 460, y: 395, w: 190, h: 130, title: "Docker", subtitle: "Containerization", icon: <Boxes style={{ width: "clamp(16px,5cqw,24px)", height: "clamp(16px,5cqw,24px)" }} /> },
  { key: "git", x: 250, y: 610, w: 180, h: 120, title: "Git", subtitle: "Version Ctrl", icon: <GitBranch style={{ width: "clamp(16px,5cqw,24px)", height: "clamp(16px,5cqw,24px)" }} /> },
];

const sidePanelItems = [
  { label: "REST API", icon: <Cloud style={{ width: "clamp(13px,3.8cqw,18px)", height: "clamp(13px,3.8cqw,18px)" }} /> },
  { label: "Authentication", icon: <ShieldCheck style={{ width: "clamp(13px,3.8cqw,18px)", height: "clamp(13px,3.8cqw,18px)" }} /> },
  { label: "Permissions", icon: <Users style={{ width: "clamp(13px,3.8cqw,18px)", height: "clamp(13px,3.8cqw,18px)" }} /> },
  { label: "JSON", icon: <Braces style={{ width: "clamp(13px,3.8cqw,18px)", height: "clamp(13px,3.8cqw,18px)" }} /> },
];

const pct = (v: number, total: number) => `${(v / total) * 100}%`;

// font sizes scale with the diagram's OWN rendered width (container query units),
// so they stay correct whether the diagram is full-width on mobile or a narrow
// column on tablet/laptop/desktop
const titleStyle: CSSProperties = { fontSize: "clamp(10.5px, 3.3cqw, 15px)", lineHeight: 1.15 };
const subtitleStyle: CSSProperties = { fontSize: "clamp(8.5px, 2.2cqw, 11px)", lineHeight: 1.5 };
const badgeStyle: CSSProperties = { fontSize: "clamp(7.5px, 2.1cqw, 10px)", lineHeight: 1 };
const panelLabelStyle: CSSProperties = { fontSize: "clamp(9.5px, 2.8cqw, 14px)", lineHeight: 1 };

const TechStackDiagram = () => {
  return (
    <div
      className="relative w-full [container-type:inline-size]"
      style={{ aspectRatio: `${GRID_W} / ${GRID_H}` }}
    >
      {/* outer frame with a clipped corner, like a blueprint sheet */}
      <div
        className="absolute inset-0 border-2 border-primary/60 bg-card/30 backdrop-blur-sm"
        style={{ clipPath: "polygon(6% 0, 100% 0, 100% 100%, 0 100%, 0 8%)" }}
      />

      {/* inner padded canvas — keeps every box/line clear of the frame border */}
      <div className="absolute inset-[3.5%]">
        {/* connector lines */}
        <svg
          className="absolute inset-0 w-full h-full text-primary/70"
          viewBox={`0 0 ${GRID_W} ${GRID_H}`}
          preserveAspectRatio="none"
          fill="none"
        >
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M0,0 L10,5 L0,10 z" fill="currentColor" />
            </marker>
          </defs>
          <g stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M340,115 L340,175" markerEnd="url(#arrow)" />
            <path d="M490,235 L520,235" markerEnd="url(#arrow)" />
            <path d="M340,305 L340,365" />
            <path d="M130,365 L550,365" />
            <path d="M130,365 L130,395" markerEnd="url(#arrow)" />
            <path d="M340,365 L340,395" markerEnd="url(#arrow)" />
            <path d="M550,365 L550,395" markerEnd="url(#arrow)" />
            <path d="M340,515 L340,605" markerEnd="url(#arrow)" />
            <path d="M130,515 L130,665 L250,665" markerEnd="url(#arrow)" />
            <path d="M550,515 L550,665 L430,665" markerEnd="url(#arrow)" />
          </g>
        </svg>

        {/* side panel (REST API / Auth / Permissions / JSON) */}
        <div
          className="absolute flex flex-col justify-center gap-2 rounded-xl border border-accent/50 bg-card/60 backdrop-blur-sm px-3 py-3 overflow-hidden"
          style={{ left: pct(520, GRID_W), top: pct(150, GRID_H), width: pct(250, GRID_W), height: pct(170, GRID_H) }}
        >
          {sidePanelItems.map((item) => (
            <div key={item.label} className="flex items-center gap-2 text-foreground/80 min-w-0">
              <span className="shrink-0 flex items-center justify-center text-primary">{item.icon}</span>
              <span style={panelLabelStyle} className="whitespace-nowrap">{item.label}</span>
            </div>
          ))}
        </div>

        {/* nodes */}
        {nodes.map((n, i) => (
          <motion.div
            key={n.key}
            className="absolute flex flex-col items-center justify-center text-center gap-1.5 rounded-xl border border-accent/60 bg-card/70 backdrop-blur-sm shadow-sm px-3 py-2"
            style={{ left: pct(n.x, GRID_W), top: pct(n.y, GRID_H), width: pct(n.w, GRID_W), height: pct(n.h, GRID_H) }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * i }}
          >
            <span className="text-primary">{n.icon}</span>
            <div className="flex items-center justify-center gap-1.5">
              <span style={titleStyle} className="font-semibold">{n.title}</span>
              {n.badge && (
                <span style={badgeStyle} className="px-1.5 py-0.5 rounded-full border border-accent/60 text-accent">
                  {n.badge}
                </span>
              )}
            </div>
            {n.subtitle && (
              <span style={subtitleStyle} className="text-muted-foreground max-w-[92%]">
                {n.subtitle}
              </span>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-28 pb-16 px-4 overflow-hidden"
    >
      {/* faint editorial frame */}
      <div className="pointer-events-none absolute inset-4 sm:inset-8 border border-border/60 rounded-sm hidden md:block" />

      {/* vertical scroll label */}
      <div className="pointer-events-none hidden lg:flex absolute right-10 bottom-16 items-center gap-3 text-muted-foreground">
        <span
          className="text-xs tracking-[0.3em] uppercase"
          style={{ writingMode: "vertical-rl" }}
        >
          Scroll
        </span>
        <span className="block h-16 w-px bg-border" />
      </div>

      <div className="container mx-auto relative z-10">
        {/* Name/text section always comes first in the DOM, so on mobile it
            stacks above the diagram; on desktop the grid places it on the left. */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Text column */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            

            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl leading-[1.05] mb-5">
              Khushi Pal
            </h1>

            <h2 className="text-lg sm:text-xl md:text-2xl font-medium text-primary mb-8 h-8">
              <Typewriter text="Python Developer" />
            </h2>

            <p className="text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed mb-10">
              Python Backend Developer specializing in Django, FastAPI, REST APIs, PostgreSQL, and Redis. I build scalable and reliable backend solutions for real-world applications.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-10">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-foreground text-background rounded-none font-medium transition-transform hover:-translate-y-0.5"
              >
                View My Work
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 border border-foreground/30 rounded-none font-medium transition-colors hover:border-foreground"
              >
                Contact Me
              </a>
              <a
                href="/Khushi_Pal_Resume_2.pdf"
                download
                className="inline-flex items-center gap-2 px-2 py-3.5 font-medium text-primary underline underline-offset-4 decoration-primary/40 hover:decoration-primary transition-colors"
              >
                Download Résumé ↓
              </a>
            </div>

            <div className="flex items-center gap-5 text-sm">
              {socials.map((s, i) => (
                <span key={s.label} className="flex items-center gap-5">
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tracking-wide uppercase text-muted-foreground hover:text-primary transition-colors"
                  >
                    {s.label}
                  </a>
                  {i < socials.length - 1 && <span className="w-1 h-1 rounded-full bg-border" />}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Tech stack diagram column — always after the text column */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <TechStackDiagram />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;