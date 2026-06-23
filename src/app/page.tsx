'use client';

import { useEffect, useRef, useState, useCallback } from "react";

const basePath = process.env.NODE_ENV === 'production' ? '/portfolio-site' : '';

// ─── Click-to-squash wrapper ────────────────────────────────────────────────

function Squishable({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const handleClick = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.classList.remove('animate-squash');
    void el.offsetWidth;
    el.classList.add('animate-squash');
  }, []);
  return (
    <div ref={ref} onClick={handleClick} className={`cursor-pointer ${className}`} style={{ animation: 'none' }}>
      {children}
    </div>
  );
}

// ─── Sticker — draggable sticker component ───────────────────────────────────

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

// ─── Scroll Reveal ───────────────────────────────────────────────────────────

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('visible'); obs.unobserve(el); } }, { threshold: 0.06 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return <div ref={ref} className={`reveal min-w-0 ${delay ? `reveal-d${delay}` : ''} ${className}`}>{children}</div>;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const PROJECTS = [
  {
    title: "Baoli",
    role: "Lead Animation Director",
    year: "2025",
    summary: "Arjun, a young man grappling with the mysterious disappearance of his brother and his own struggles with drug use, players must unravel the mystery behind his brother's disappearance, confront terrifying visions, and explore the ominous secrets of Baoli, an ancient stepwell with a dark past.",
    stack: ["Unreal Engine", "C++", "Blender"],
    accent: "bg-butter",
    gif: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/3347710/56d235fce914d96a3c5198311bee29cb5698d7cd/capsule_616x353.jpg?t=1745152007",
    link: "https://store.steampowered.com/app/3347710/Baoli/",
  },
  {
    title: "Procedural Locomotion",
    role: "Animation Programmer",
    year: "2025",
    summary: "Maths-driven joint movement for human-like locomotion. Built a procedural animation system that generates natural walk and run cycles from parametric inputs in Unreal Engine.",
    stack: ["Unreal Engine", "C++", "Python"],
    accent: "bg-sakura",
    gif: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExdnkzbzFtcXFjMjZsNXY2cDAwNTh6aTRjdWRxMmJodmMyZTJtZjE1cSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/NKPx3RopZ7GZZJ49FB/giphy.gif",
  },
  {
    title: "AI Episode Generation",
    role: "Technical Animator",
    year: "2025",
    summary: "Sequences and cutscenes with AI voicelines. Developed an automated episode generation pipeline that combines LLM-driven narrative with real-time animation in Unreal Engine.",
    stack: ["Unreal Engine", "C++", "LLMs"],
    accent: "bg-mint",
    gif: "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExYXA0ZzI2Z2UxNDgzdnRvdGtlcW50a2NudzIwOHAwNjBxbnI1czJwZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/qaZjqbBLOtPM8mjKyb/giphy.gif",
  },

  {
    title: "Modular Character Rigs",
    role: "Tools Programmer",
    year: "2024",
    summary: "Automated rigging system that cut character setup time by 80%. Built modular rig components that snap together for rapid prototyping in Unreal Engine.",
    stack: ["Unreal Engine", "C++", "Blueprint"],
    accent: "bg-lavender",
    gif: "https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4cc043e6-bebf-4cc1-8947-eeaf8ed35efb/image_24.gif",
  },

  {
    title: "Motion Matching Systems",
    role: "Technical Animator",
    year: "2024",
    summary: "Various motion matching setups for different characters. Built reusable motion matching pipelines adaptable to diverse character types and movement styles.",
    stack: ["MotionBuilder", "Cascadeur", "Blender"],
    accent: "bg-mint",
    gif: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExNmxmNHlobjVxd2l1bDBtbWZ4ZWl6enFwZ2l1OW1kNm55YWc3c3JoaiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/KEfcE2RUMzEEX97syC/giphy.gif",
  },
];

const EXPERIENCE = [
  {
    role: "Animation Programmer & Plugin Developer",
    company: "Rifflix",
    period: "2025 — 2026",
    location: "Remote",
    bullets: [
      "Developed animation tools and pipelines for an automated episode generation system using AI in Unreal Engine.",
      "Built runtime animation state machines and blend tree systems for real-time character control.",
      "Integrated LLM-driven narrative with procedural animation pipelines.",
    ],
  },
  {
    role: "Animation Director & AI Programmer",
    company: "Shader Labs",
    period: "2023 — 2025",
    location: "India",
    bullets: [
      "Developed animation tools, runtime systems, and AAA quality animations for the game 'Baoli'.",
      "Directed the animation team and established production pipelines.",
      "Featured at Indie Game Utsav 2025.",
    ],
  },
  {
    role: "Specialist Instructor",
    company: "India Game Lab",
    period: "2024 — Present",
    location: "India",
    bullets: [
      "Instructed character rigging and animation in Blender, Cascadeur & Unreal Engine.",
      "Mentored students on procedural animation and runtime systems.",
    ],
  },
];

const EDUCATION = [
  {
    school: "India Game Lab",
    degree: "Professional Certificate — Unreal Engine Generalist",
    period: "2022 — 2024",
    note: "Unreal Engine, C++, Blueprint, Python, Lighting, VFX, Animation. Intensive program on game development and real-time animation.",
  },
  {
    school: "Various Courses",
    degree: "Certificate Program — Programming",
    period: "2019 — 2022",
    note: "CS50, CS50X, CS50G and various other courses on programming fundamentals and computer science.",
  },
];

const SKILLS = [
  { group: "Languages", items: ["C++", "C#", "Python", "Blueprint", "HLSL"] },
  { group: "Engines", items: ["Unreal Engine", "Unity", "Flax Engine", "Rygnome (WIP)"] },
  { group: "DCC Tools", items: ["Blender", "Maya", "ZBrush", "Houdini"] },
  { group: "Domains", items: ["Procedural Animation", "Motion Matching", "Runtime Rigs", "Tool Development"] },
];

const ANIMATIONS = [
  { title: "Walk Cycle", gif: "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExNmJ5dXFjY2xyc3draGx0N29tZ3RtbGM1eXR0eTd5cG5vdXBhMGJmcyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/5POKjGZK3nEgDDbKri/giphy.gif", rotate: -3 },
  { title: "TV Smack", gif: "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZTRjNGthZTZvb253M3ZvcXlzeWcyNGNwdTlka2FuaWpteGs3NTZtZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/HzL5ngJCFDWoMMtZ2S/giphy.gif", rotate: 2 },
  { title: "Waking Up", gif: "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExY2RmcGxoanY1M3RqZzY3ZGZjc29iNGRsOWt3emp5NGw5ZjFhNGs4eSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/V5YrXqn96hrqi6PPQS/giphy.gif", rotate: -1 },
  { title: "Glasses", gif: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbWN2a2lwcTFsNGhnOWw5eHczZTRjcmw2Z3FwNTJ0Z3lwNWt4YjN3cCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/grJUJHKWMMfrRTSZgH/giphy.gif", rotate: 3 },
  { title: "Lighter", gif: "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZXF0eDJjZzhjMzRsbmw0d2xoanAydXlrbzZndjZkbnl0Ym9ibjJqdSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/qLVmoR6q3NYhnJh4Qe/giphy.gif", rotate: -2 },
  { title: "Sit Down", gif: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExa3IyNDFqYm83MnR5OTJra2k4Mjlubm9qdTR0NHF0NHVvajkxaHdkYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/SH9uV4tjhmSYcVrFxv/giphy.gif", rotate: 1 },
];

// ─── Page ────────────────────────────────────────────────────────────────────

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [activeAnim, setActiveAnim] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">

      {/* ─── Top Navigation ──────────────────────────────────────────────── */}

      <nav className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/70 border-b border-foreground/5">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 lg:px-10 h-14">
          <a href="#top" className="font-display text-xl tracking-wide">
            PARTH<span className="text-sakura">.</span>SARTHI
          </a>
          <div className="hidden md:flex gap-6 font-mono text-[11px] tracking-widest uppercase">
            <a href="#about" className="hover:text-sakura transition-colors">About</a>
            <a href="#projects" className="hover:text-sakura transition-colors">Projects</a>
            <a href="#experience" className="hover:text-sakura transition-colors">Experience</a>
            <a href="#animations" className="hover:text-sakura transition-colors">Animations</a>
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

      {/* ─── Hero ────────────────────────────────────────────────────────── */}

      <header id="top" className="relative min-h-screen flex flex-col justify-center px-6 lg:px-10 pt-28 pb-16 overflow-hidden">
        {/* Background mascot */}
        <div className="absolute inset-0 flex items-start justify-end pointer-events-none pt-0 pr-[2%]">
          <img
            src={`${basePath}/mascot/mascot-strings.png`}
            alt=""
            width={800}
            height={800}
            className="w-[69vw] max-w-[48rem] rotate-6 object-contain translate-y-4"
            style={{ filter: 'drop-shadow(6px 10px 0 rgba(45, 36, 36, 0.10)) drop-shadow(12px 20px 12px rgba(45, 36, 36, 0.08))' }}
          />
        </div>

        <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-12 gap-10 items-center relative z-10">
          <div className="lg:col-span-8 relative">
            <span className="font-mono text-xs tracking-[0.3em] opacity-60">
              ANIMATION PROGRAMMER &nbsp;·&nbsp; TECHNICAL ANIMATOR
            </span>
            <h1 className="font-display text-[clamp(3rem,9vw,7.5rem)] leading-[0.9] tracking-tight animate-pop mt-4">
              I speak <span className="text-sakura">fluent</span><br />
              <span className="font-serif italic normal-case text-[0.78em] tracking-tight">motion.</span>
            </h1>
            <p className="mt-8 max-w-xl text-lg text-foreground/70 leading-relaxed">
              I&apos;m Parth — an animation programmer and technical animator based in Navi Mumbai, Maharashtra, India. I write animation systems, procedural tools, and the runtime glue that lets characters move with personality.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-foreground text-background rounded-full font-mono text-xs tracking-widest uppercase font-bold hover-squash"
              >
                See projects →
              </a>
              <a
                href={`${basePath}/CV.html`}
                download="Parth_Sarthi_CV.html"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-foreground/20 rounded-full font-mono text-xs tracking-widest uppercase font-bold hover:bg-card transition-colors"
              >
                Download CV
              </a>
            </div>
          </div>
        </div>

        {/* Decorative stickers */}
        <Sticker src={`${basePath}/mascot/sticker-star.png`} alt="" className="absolute top-32 left-6 hidden md:block" rotate={-12} size={64} />
        <Sticker src={`${basePath}/mascot/mascot-pink.png`} alt="" className="absolute bottom-32 right-16 hidden lg:block animate-wiggle" rotate={8} size={56} />
        <Sticker src={`${basePath}/mascot/mascot-mint.png`} alt="" className="absolute bottom-20 left-[15%] hidden lg:block animate-float-slow" rotate={-6} size={48} />

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50" style={{ animation: 'scroll-bounce 2s ease-in-out infinite' }}>
          <span className="font-mono text-[9px] tracking-widest uppercase">scroll</span>
          <svg width="12" height="20" viewBox="0 0 12 20" fill="none" className="opacity-60">
            <path d="M6 0V16M6 16L1 11M6 16L11 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'scroll-line 2s ease-in-out infinite' }} />
          </svg>
        </div>
      </header>

      {/* ─── 01 — About ──────────────────────────────────────────────────── */}

      <section id="about" className="px-6 lg:px-10 py-24 border-t border-foreground/5">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-10">
          <Reveal className="lg:col-span-4">
            <span className="font-mono text-xs tracking-widest opacity-60">01 — ABOUT</span>
            <h2 className="font-display text-4xl lg:text-5xl mt-2">Half engineer, half animator.</h2>
            <img
              src={`${basePath}/images/profile.png`}
              alt="Parth Sarthi"
              width={200}
              height={200}
              className="mt-6 w-40 h-40 rounded-2xl object-cover sticker-shadow"
            />
          </Reveal>
          <Reveal className="lg:col-span-8 space-y-5 text-foreground/80 leading-relaxed" delay={1}>
            <p>
              I started with Unreal Engine and C++, building animation blueprints and runtime tools. Over time I drifted deeper into code when I got tired of waiting for tools to catch up with ideas. Today I split my time between low-level runtime systems (procedural locomotion, motion matching, modular rigs) and the editor-side workflows that animators actually touch every day.
            </p>
            <p>
              I care about <em className="font-serif italic">snappy iteration loops</em>, readable APIs for non-engineers, and the small details — easing curves, anticipation, follow-through — that make characters feel handmade even when they&apos;re driven by math.
            </p>
            <div className="grid grid-cols-3 gap-4 pt-4">
                {[
                  { k: "4+", v: "Years shipping" },
                  { k: "3", v: "Projects shipped" },
                  { k: "5", v: "Roles held" },
                ].map((s) => (
                <div key={s.v} className="p-4 bg-card rounded-2xl border border-foreground/5">
                  <div className="font-display text-3xl text-sakura">{s.k}</div>
                  <div className="font-mono text-[10px] tracking-widest uppercase opacity-60 mt-1">{s.v}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── 02 — Projects ───────────────────────────────────────────────── */}

      <section id="projects" className="px-6 lg:px-10 py-24 border-t border-foreground/5 relative">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="flex items-end justify-between mb-12">
              <div>
                <span className="font-mono text-xs tracking-widest opacity-60">02 — PROJECTS</span>
                <h2 className="font-display text-4xl lg:text-5xl mt-2">Selected work</h2>
              </div>
              <span className="font-mono text-xs tracking-widest opacity-50 hidden sm:block">2023 — 2026</span>
            </div>
          </Reveal>

          <div className="space-y-10">
            {PROJECTS.map((p, i) => (
              <Reveal key={i} delay={(i % 3) + 1}>
                <article className={`group grid md:grid-cols-12 gap-6 p-6 bg-card rounded-3xl border border-foreground/5 hover:-translate-y-1 hover:shadow-2xl transition-all duration-500 ${p.link ? 'cursor-pointer' : ''}`} onClick={p.link ? () => window.open(p.link, '_blank') : undefined}>
                  <div className="md:col-span-5 relative overflow-hidden rounded-2xl aspect-[4/3]">
                    <div className={`absolute inset-0 ${p.accent} opacity-20`} />
                    <img
                      src={p.gif}
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
                    <div className="mt-auto pt-5 flex flex-wrap gap-2 items-center">
                      {p.stack.map((s) => (
                        <span
                          key={s}
                          className="font-mono text-[10px] tracking-widest uppercase px-2.5 py-1 bg-background border border-foreground/10 rounded-full"
                        >
                          {s}
                        </span>
                      ))}
                      {p.link && (
                        <a href={p.link} target="_blank" rel="noopener noreferrer" className="ml-auto font-mono text-[10px] tracking-widest uppercase text-sakura hover:underline" onClick={(e) => e.stopPropagation()}>
                          View on Steam →
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        <Sticker src={`${basePath}/mascot/mascot-pink.png`} alt="" className="absolute -right-2 top-20 hidden lg:block" rotate={12} size={80} />
      </section>

      {/* ─── 03 — Experience ─────────────────────────────────────────────── */}

      <section id="experience" className="px-6 lg:px-10 py-24 border-t border-foreground/5">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-10">
          <Reveal className="lg:col-span-4">
            <span className="font-mono text-xs tracking-widest opacity-60">03 — EXPERIENCE</span>
            <h2 className="font-display text-4xl lg:text-5xl mt-2">Where I&apos;ve worked</h2>
          </Reveal>
          <Reveal className="lg:col-span-8 space-y-6" delay={1}>
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
          </Reveal>
        </div>
      </section>

      {/* ─── Animation Showcase ─────────────────────────────────────────────── */}

      <section id="animations" className="px-6 lg:px-10 py-12 border-t border-foreground/5 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <span className="font-mono text-xs tracking-widest opacity-60">ANIMATIONS</span>
            <h2 className="font-display text-3xl lg:text-4xl mt-2 mb-8">Click to play</h2>
          </Reveal>
          <div className="flex gap-6 items-start justify-start flex-wrap lg:flex-nowrap">
            {ANIMATIONS.map((a, i) => (
              <Reveal key={i} delay={(i % 4) + 1}>
                <div
                  className="group relative cursor-pointer shrink-0"
                  style={{ transform: `rotate(${a.rotate}deg)`, transition: 'transform 0.3s var(--ease-bounce)' }}
                  onClick={() => setActiveAnim(i)}
                >
                  {/* Thumbnail with 3D shadow */}
                  <div
                    className="w-36 h-24 lg:w-44 lg:h-28 rounded-xl overflow-hidden border-2 border-foreground/10 bg-card relative transition-all duration-300 group-hover:border-sakura/40"
                    style={{ boxShadow: '8px 12px 0px rgba(0,0,0,0.10), 12px 16px 24px rgba(0,0,0,0.08)' }}
                  >
                    <img
                      src={a.gif}
                      alt={a.title}
                      loading="lazy"
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Animation Overlay ─────────────────────────────────────────────── */}
      {activeAnim !== null && (
        <div
          className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm flex items-center justify-center cursor-pointer"
          onClick={() => setActiveAnim(null)}
        >
          <div
            className="relative w-[80vw] max-w-2xl aspect-video rounded-2xl overflow-hidden border-2 border-white/10"
            style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.5)', animation: 'entrance-pop 0.4s var(--ease-bounce) both' }}
          >
            <img
              src={ANIMATIONS[activeAnim].gif}
              alt={ANIMATIONS[activeAnim].title}
              className="w-full h-full object-cover"
            />
            <span className="absolute bottom-4 left-4 font-mono text-xs tracking-widest uppercase bg-background/80 px-3 py-1.5 rounded-full">
              {ANIMATIONS[activeAnim].title}
            </span>
          </div>
        </div>
      )}

      {/* ─── 04 — Skills & Tools ─────────────────────────────────────────── */}

      <section className="px-6 lg:px-10 py-24 border-t border-foreground/5">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <span className="font-mono text-xs tracking-widest opacity-60">04 — TOOLBOX</span>
            <h2 className="font-display text-4xl lg:text-5xl mt-2 mb-10">Skills & tools</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SKILLS.map((s, i) => (
              <Reveal key={i} delay={i + 1}>
                <div
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
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 05 — Education ──────────────────────────────────────────────── */}

      <section id="education" className="px-6 lg:px-10 py-24 border-t border-foreground/5">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-10">
          <Reveal className="lg:col-span-4">
            <span className="font-mono text-xs tracking-widest opacity-60">05 — EDUCATION</span>
            <h2 className="font-display text-4xl lg:text-5xl mt-2">Where I learned</h2>
          </Reveal>
          <Reveal className="lg:col-span-8 space-y-5" delay={1}>
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
          </Reveal>
        </div>
      </section>

      {/* ─── Marquee ─────────────────────────────────────────────────────── */}

      <div className="w-full overflow-hidden bg-foreground py-3 border-y-2 border-sakura">
        <div className="flex whitespace-nowrap animate-marquee">
          {Array.from({ length: 4 }).map((_, i) => (
            <span
              key={i}
              className="text-background font-mono text-xs font-bold tracking-widest px-8 uppercase shrink-0"
            >
              OPEN TO NEW ROLES ✦ ANIMATOR ✦ RIGGING ARTIST ✦ TECHNICAL ARTIST ✦ TOOLS &amp; PIPELINE ✦
            </span>
          ))}
        </div>
      </div>

      {/* ─── 06 — Contact ────────────────────────────────────────────────── */}

      <footer
        id="contact"
        className="relative px-6 lg:px-10 py-28 bg-card border-t border-foreground/5 overflow-hidden"
      >
        <div className="absolute top-10 left-10 animate-float-slow hidden md:block">
          <Squishable>
            <img src={`${basePath}/mascot/mascot-mint.png`} alt="" width={120} height={120} className="w-24 h-24 sticker-shadow" />
          </Squishable>
        </div>

        <div className="max-w-3xl mx-auto text-center relative">
          <span className="font-mono text-xs tracking-[0.3em] opacity-60">06 — CONTACT</span>
          <h2 className="font-display text-5xl lg:text-7xl my-6">
            Let&apos;s build something <span className="text-sakura">animated</span>.
          </h2>
          <p className="text-foreground/70 max-w-md mx-auto mb-10">
            I&apos;m currently open to full-time roles and select contract work in
            animation tools, rigging, and runtime systems.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <a href="mailto:contact@parthsarthi.dev" className="px-6 py-3 bg-foreground text-background rounded-full font-mono text-xs tracking-widest uppercase font-bold hover-squash">
              contact@parthsarthi.dev
            </a>
            <a href="https://github.com/Braga1913" className="px-6 py-3 border border-foreground/20 rounded-full font-mono text-xs tracking-widest uppercase font-bold hover:bg-background transition-colors">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/parth-sarthi-9a1143289" className="px-6 py-3 border border-foreground/20 rounded-full font-mono text-xs tracking-widest uppercase font-bold hover:bg-background transition-colors">
              LinkedIn
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
            © 2026 PARTH SARTHI · BUILT WITH CODE &amp; IMAGINATION
          </p>
        </div>
      </footer>
    </div>
  );
}
