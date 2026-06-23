import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

import mascotHero from "@/assets/mascot-hero.png";
import mascotPink from "@/assets/mascot-pink.png";
import mascotMint from "@/assets/mascot-mint.png";
import stickerStar from "@/assets/sticker-star.png";
import reelCloud from "@/assets/reel-cloud-hopper.jpg";
import reelBakery from "@/assets/reel-bakery.jpg";
import reelSquash from "@/assets/reel-squash.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Momo Tanaka — Animation Programmer & Technical Artist" },
      {
        name: "description",
        content:
          "Portfolio of Momo Tanaka — animation programmer building real-time character systems, procedural rigs, and playful interactive tools.",
      },
      { property: "og:title", content: "Momo Tanaka — Animation Programmer" },
      {
        property: "og:description",
        content:
          "Selected projects, experience, and writing on character pipelines, rigging tools, and runtime animation systems.",
      },
    ],
  }),
  component: Index,
});

/** Eyes that follow the cursor — kept as the one playful flourish. */
function FollowEyes({ size = 1 }: { size?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    function handle(e: MouseEvent) {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const d = Math.hypot(dx, dy) || 1;
      const max = 3 * size;
      setPos({ x: (dx / d) * max, y: (dy / d) * max });
    }
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, [size]);

  const eye = `${10 * size}px`;
  const pupil = `${4 * size}px`;
  return (
    <div ref={ref} className="flex items-center gap-2">
      {[0, 1].map((i) => (
        <div
          key={i}
          className="rounded-full bg-white grid place-items-center animate-blink"
          style={{ width: eye, height: eye }}
        >
          <div
            className="rounded-full bg-foreground transition-transform duration-100"
            style={{
              width: pupil,
              height: pupil,
              transform: `translate(${pos.x}px, ${pos.y}px)`,
            }}
          />
        </div>
      ))}
    </div>
  );
}

interface StickerProps {
  src: string;
  alt: string;
  className?: string;
  rotate?: number;
  size?: number;
}
function Sticker({ src, alt, className = "", rotate = 0, size = 96 }: StickerProps) {
  const [drag, setDrag] = useState({ x: 0, y: 0 });
  const [held, setHeld] = useState(false);
  const start = useRef({ x: 0, y: 0, ox: 0, oy: 0 });

  function onDown(e: React.PointerEvent<HTMLDivElement>) {
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    start.current = { x: e.clientX, y: e.clientY, ox: drag.x, oy: drag.y };
    setHeld(true);
  }
  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!held) return;
    setDrag({
      x: start.current.ox + (e.clientX - start.current.x),
      y: start.current.oy + (e.clientY - start.current.y),
    });
  }
  function onUp() { setHeld(false); }

  return (
    <div
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
      className={`group select-none touch-none ${held ? "cursor-grabbing" : "cursor-grab"} ${className}`}
      style={{
        transform: `translate(${drag.x}px, ${drag.y}px) rotate(${rotate}deg) scale(${held ? 1.08 : 1})`,
        transition: held ? "none" : "transform 0.4s var(--ease-bounce)",
        width: size,
        height: size,
      }}
    >
      <img
        src={src}
        alt={alt}
        width={size}
        height={size}
        loading="lazy"
        draggable={false}
        className="w-full h-full object-contain sticker-shadow hover-squash"
      />
    </div>
  );
}

// ---------- DATA ----------

const PROJECTS = [
  {
    title: "Rigflow",
    role: "Lead Programmer",
    year: "2025",
    summary:
      "A node-based rigging toolkit for Maya & Blender. Authored the runtime IK/FK blend solver and shipped a Python plugin used by a 12-person animation team.",
    stack: ["C++", "Python", "Maya API", "Qt"],
    image: reelSquash,
    accent: "bg-sakura",
  },
  {
    title: "Cloud Hopper",
    role: "Engine & Animation Tech",
    year: "2024",
    summary:
      "Indie platformer built in Unity. Wrote the procedural locomotion system, secondary motion (jiggle bones), and a custom 2D skeletal animation runtime.",
    stack: ["C#", "Unity", "HLSL", "DOTween"],
    image: reelCloud,
    accent: "bg-mint",
  },
  {
    title: "Bakery Naps",
    role: "Tools Programmer",
    year: "2023",
    summary:
      "Web-based sprite animation pipeline. Built an Electron tool that compiles Aseprite atlases into a typed JSON format for the team's React Three Fiber stack.",
    stack: ["TypeScript", "Electron", "R3F", "WebGL"],
    image: reelBakery,
    accent: "bg-butter",
  },
];

const EXPERIENCE = [
  {
    role: "Senior Animation Programmer",
    company: "Studio Komorebi",
    period: "2024 — Present",
    location: "Tokyo, JP",
    bullets: [
      "Own the character animation runtime across two unannounced titles.",
      "Designed a state-machine + blend-tree system replacing legacy timeline code.",
      "Mentor two junior engineers on tooling and code review.",
    ],
  },
  {
    role: "Gameplay & Tools Engineer",
    company: "Pastel Pixel Games",
    period: "2022 — 2024",
    location: "Remote",
    bullets: [
      "Built the in-house 2D skeletal rig editor used on three shipped games.",
      "Cut character iteration loop from minutes to seconds with hot-reloading rigs.",
    ],
  },
  {
    role: "Technical Artist (Intern)",
    company: "Frame by Frame",
    period: "2021 — 2022",
    location: "Osaka, JP",
    bullets: [
      "Authored Maya rigging utilities and shader docs for the production team.",
    ],
  },
];

const EDUCATION = [
  {
    school: "Tokyo Institute of Technology",
    degree: "B.Sc. Computer Science",
    period: "2018 — 2022",
    note: "Thesis: Real-time muscle deformation for stylized characters.",
  },
  {
    school: "Gobelins (Summer Workshop)",
    degree: "Character Animation Principles",
    period: "2021",
    note: "Two-month intensive on classical animation theory.",
  },
];

const SKILLS = [
  { group: "Languages", items: ["C++", "C#", "Python", "TypeScript", "HLSL/GLSL"] },
  { group: "Engines", items: ["Unity", "Unreal", "Godot", "Custom WebGL"] },
  { group: "DCC Tools", items: ["Maya API", "Blender Python", "Houdini", "Spine"] },
  { group: "Domains", items: ["Rigging", "IK Solvers", "State Machines", "Procedural Motion", "Pipeline"] },
];

// ---------- PAGE ----------

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Top bar */}
      <nav className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/70 border-b border-foreground/5">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 lg:px-10 h-14">
          <a href="#top" className="font-display text-xl tracking-wide">
            MOMO<span className="text-sakura">.</span>TANAKA
          </a>
          <div className="hidden md:flex gap-6 font-mono text-[11px] tracking-widest uppercase">
            <a href="#about" className="hover:text-sakura transition-colors">About</a>
            <a href="#projects" className="hover:text-sakura transition-colors">Projects</a>
            <a href="#experience" className="hover:text-sakura transition-colors">Experience</a>
            <a href="#education" className="hover:text-sakura transition-colors">Education</a>
            <a href="#contact" className="hover:text-sakura transition-colors">Contact</a>
          </div>
          <a
            href="#contact"
            className="font-mono text-[11px] font-bold tracking-widest uppercase px-3 py-1.5 bg-foreground text-background rounded-full hover:bg-sakura hover:text-foreground transition-colors"
          >
            Hire me
          </a>
        </div>
      </nav>

      {/* HERO */}
      <header id="top" className="relative min-h-[92vh] flex items-center px-6 lg:px-10 pt-28 pb-16">
        <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-8 relative">
            <span className="font-mono text-xs tracking-[0.3em] opacity-60">
              ANIMATION PROGRAMMER · TECHNICAL ARTIST
            </span>
            <h1 className="font-display text-[clamp(3rem,9vw,7.5rem)] leading-[0.9] tracking-tight animate-pop mt-4">
              I build the <span className="text-sakura">systems</span><br />
              that make characters
              <span className="font-serif italic normal-case text-[0.78em] tracking-tight"> feel alive.</span>
            </h1>
            <p className="mt-8 max-w-xl text-lg text-foreground/70 leading-relaxed">
              I&apos;m Momo — an animation programmer based in Tokyo. I write rigging
              tools, runtime animation systems, and the procedural glue that lets
              animators iterate fast and characters squash with personality.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-foreground text-background rounded-full font-mono text-xs tracking-widest uppercase font-bold hover-squash"
              >
                See projects →
              </a>
              <a
                href="/resume.pdf"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-foreground/20 rounded-full font-mono text-xs tracking-widest uppercase font-bold hover:bg-card transition-colors"
              >
                Download CV
              </a>
            </div>
          </div>

          {/* Mascot — single playful flourish */}
          <div className="lg:col-span-4 relative flex justify-center">
            <div className="relative animate-float hover-squash">
              <img
                src={mascotHero}
                alt="Momo's studio mascot"
                width={240}
                height={240}
                className="w-52 h-52 lg:w-60 lg:h-60 sticker-shadow rotate-6"
              />
              <div className="absolute top-[34%] left-1/2 -translate-x-1/2">
                <FollowEyes size={1.3} />
              </div>
              <div className="absolute -top-3 -right-1 bg-sakura text-foreground text-[10px] font-bold px-2.5 py-1 rounded-full font-mono tracking-wider shadow-md rotate-12">
                HI!
              </div>
            </div>
          </div>
        </div>

        <Sticker src={stickerStar} alt="" className="absolute top-32 left-6 hidden md:block" rotate={-12} size={64} />
      </header>

      {/* ABOUT */}
      <section id="about" className="px-6 lg:px-10 py-24 border-t border-foreground/5">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <span className="font-mono text-xs tracking-widest opacity-60">01 — ABOUT</span>
            <h2 className="font-display text-4xl lg:text-5xl mt-2">Half engineer, half animator.</h2>
          </div>
          <div className="lg:col-span-8 space-y-5 text-foreground/80 leading-relaxed">
            <p>
              I started as a 2D animator in college and slowly drifted into code when
              I got tired of waiting for tools to catch up with ideas. Today I split my
              time between low-level runtime systems (skeletal solvers, blend trees,
              IK, secondary motion) and the editor-side workflows that animators
              actually touch every day.
            </p>
            <p>
              I care about <em className="font-serif italic">snappy iteration loops</em>,
              readable APIs for non-engineers, and the small details — easing curves,
              anticipation, follow-through — that make characters feel handmade even
              when they&apos;re driven by math.
            </p>
            <div className="grid grid-cols-3 gap-4 pt-4">
              {[
                { k: "5+", v: "Years shipping" },
                { k: "8", v: "Titles contributed to" },
                { k: "12", v: "Open-source tools" },
              ].map((s) => (
                <div key={s.v} className="p-4 bg-card rounded-2xl border border-foreground/5">
                  <div className="font-display text-3xl text-sakura">{s.k}</div>
                  <div className="font-mono text-[10px] tracking-widest uppercase opacity-60 mt-1">{s.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="px-6 lg:px-10 py-24 border-t border-foreground/5 relative">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="font-mono text-xs tracking-widest opacity-60">02 — PROJECTS</span>
              <h2 className="font-display text-4xl lg:text-5xl mt-2">Selected work</h2>
            </div>
            <span className="font-mono text-xs tracking-widest opacity-50 hidden sm:block">2023 — 2026</span>
          </div>

          <div className="space-y-10">
            {PROJECTS.map((p, i) => (
              <article
                key={p.title}
                className="group grid md:grid-cols-12 gap-6 p-6 bg-card rounded-3xl border border-foreground/5 hover:-translate-y-1 hover:shadow-2xl transition-all duration-500"
              >
                <div className="md:col-span-5 relative overflow-hidden rounded-2xl aspect-[4/3]">
                  <div className={`absolute inset-0 ${p.accent} opacity-20`} />
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <span className="absolute top-3 left-3 font-mono text-[10px] tracking-widest bg-background/90 px-2 py-1 rounded-full">
                    0{i + 1}
                  </span>
                </div>
                <div className="md:col-span-7 flex flex-col">
                  <div className="flex items-center gap-3 font-mono text-[10px] tracking-widest uppercase opacity-60">
                    <span>{p.role}</span>
                    <span>·</span>
                    <span>{p.year}</span>
                  </div>
                  <h3 className="font-display text-3xl lg:text-4xl mt-2">{p.title}</h3>
                  <p className="mt-3 text-foreground/75 leading-relaxed">{p.summary}</p>
                  <div className="mt-auto pt-5 flex flex-wrap gap-2">
                    {p.stack.map((s) => (
                      <span
                        key={s}
                        className="font-mono text-[10px] tracking-widest uppercase px-2.5 py-1 bg-background border border-foreground/10 rounded-full"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <Sticker src={mascotPink} alt="" className="absolute -right-2 top-20 hidden lg:block" rotate={12} size={80} />
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="px-6 lg:px-10 py-24 border-t border-foreground/5">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <span className="font-mono text-xs tracking-widest opacity-60">03 — EXPERIENCE</span>
            <h2 className="font-display text-4xl lg:text-5xl mt-2">Where I&apos;ve worked</h2>
          </div>
          <div className="lg:col-span-8 space-y-6">
            {EXPERIENCE.map((job) => (
              <div
                key={job.role}
                className="p-6 bg-card rounded-2xl border border-foreground/5 hover:border-sakura/40 transition-colors"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-2xl">{job.role}</h3>
                  <span className="font-mono text-[11px] tracking-widest uppercase opacity-60">
                    {job.period}
                  </span>
                </div>
                <div className="font-serif italic text-foreground/70 mt-1">
                  {job.company} · {job.location}
                </div>
                <ul className="mt-4 space-y-2 text-foreground/75">
                  {job.bullets.map((b) => (
                    <li key={b} className="flex gap-3">
                      <span className="text-sakura mt-1.5">●</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section className="px-6 lg:px-10 py-24 border-t border-foreground/5">
        <div className="max-w-6xl mx-auto">
          <span className="font-mono text-xs tracking-widest opacity-60">04 — TOOLBOX</span>
          <h2 className="font-display text-4xl lg:text-5xl mt-2 mb-10">Skills & tools</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SKILLS.map((s, i) => (
              <div
                key={s.group}
                className={`p-6 rounded-2xl border border-foreground/10 ${
                  ["bg-sakura/30", "bg-mint/40", "bg-butter/40", "bg-lavender/40"][i]
                }`}
              >
                <h3 className="font-display text-xl mb-3">{s.group}</h3>
                <ul className="space-y-1.5 font-mono text-[12px]">
                  {s.items.map((it) => (
                    <li key={it}>— {it}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EDUCATION */}
      <section id="education" className="px-6 lg:px-10 py-24 border-t border-foreground/5">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <span className="font-mono text-xs tracking-widest opacity-60">05 — EDUCATION</span>
            <h2 className="font-display text-4xl lg:text-5xl mt-2">Where I learned</h2>
          </div>
          <div className="lg:col-span-8 space-y-5">
            {EDUCATION.map((e) => (
              <div key={e.school} className="p-6 bg-card rounded-2xl border border-foreground/5">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-2xl">{e.school}</h3>
                  <span className="font-mono text-[11px] tracking-widest uppercase opacity-60">
                    {e.period}
                  </span>
                </div>
                <div className="font-serif italic text-foreground/70 mt-1">{e.degree}</div>
                <p className="mt-3 text-foreground/75">{e.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="w-full overflow-hidden bg-foreground py-3 border-y-2 border-sakura">
        <div className="flex whitespace-nowrap animate-marquee">
          {Array.from({ length: 4 }).map((_, i) => (
            <span
              key={i}
              className="text-background font-mono text-xs font-bold tracking-widest px-8 uppercase shrink-0"
            >
              OPEN TO NEW ROLES ✦ ANIMATION PROGRAMMER ✦ TECHNICAL ARTIST ✦ TOOLS &amp; PIPELINE ✦
            </span>
          ))}
        </div>
      </div>

      {/* CONTACT */}
      <footer
        id="contact"
        className="relative px-6 lg:px-10 py-28 bg-card border-t border-foreground/5 overflow-hidden"
      >
        <div className="absolute top-10 left-10 animate-float-slow hover-squash hidden md:block">
          <div className="relative">
            <img src={mascotMint} alt="" width={120} height={120} className="w-24 h-24 sticker-shadow" />
            <div className="absolute top-[40%] left-1/2 -translate-x-1/2">
              <FollowEyes size={0.9} />
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto text-center relative">
          <span className="font-mono text-xs tracking-[0.3em] opacity-60">06 — CONTACT</span>
          <h2 className="font-display text-5xl lg:text-7xl my-6">
            Let&apos;s build something <span className="text-sakura">bouncy</span>.
          </h2>
          <p className="text-foreground/70 max-w-md mx-auto mb-10">
            I&apos;m currently open to full-time roles and select contract work in
            animation tools, rigging, and runtime systems.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <a href="mailto:hello@momotanaka.dev" className="px-6 py-3 bg-foreground text-background rounded-full font-mono text-xs tracking-widest uppercase font-bold hover-squash">
              hello@momotanaka.dev
            </a>
            <a href="#" className="px-6 py-3 border border-foreground/20 rounded-full font-mono text-xs tracking-widest uppercase font-bold hover:bg-background transition-colors">
              GitHub
            </a>
            <a href="#" className="px-6 py-3 border border-foreground/20 rounded-full font-mono text-xs tracking-widest uppercase font-bold hover:bg-background transition-colors">
              LinkedIn
            </a>
            <a href="#" className="px-6 py-3 border border-foreground/20 rounded-full font-mono text-xs tracking-widest uppercase font-bold hover:bg-background transition-colors">
              Twitter / X
            </a>
          </div>

          <div className="mt-16 p-5 border border-dashed border-foreground/15 rounded-2xl flex flex-col sm:flex-row items-center gap-4 sm:gap-0 justify-between">
            <div className="text-left">
              <span className="font-mono text-[10px] opacity-50 tracking-widest">CURRENT STATUS</span>
              <p className="font-bold mt-1">Available · Spring 2026</p>
            </div>
            <div className="flex -space-x-2">
              <div className="size-9 rounded-full bg-sakura border-2 border-card" />
              <div className="size-9 rounded-full bg-mint border-2 border-card" />
              <div className="size-9 rounded-full bg-butter border-2 border-card" />
              <div className="size-9 rounded-full bg-lavender border-2 border-card" />
            </div>
          </div>

          <p className="mt-10 font-mono text-[10px] tracking-widest opacity-40">
            © 2026 MOMO TANAKA · BUILT WITH REACT, TANSTACK & TOO MUCH MATCHA
          </p>
        </div>
      </footer>
    </div>
  );
}
