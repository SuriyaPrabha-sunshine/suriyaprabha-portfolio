import { useEffect, useRef, useState } from "react";
import { ArrowRight, Code2, Database, FolderOpen, BarChart3, Laptop } from "lucide-react";
import { bootLines, profile, rotatingWords } from "@/data/profile";
import { scrollToId, useReducedMotion } from "@/lib/portfolio";
import { OutlineButton, PrimaryButton } from "./primitives";
import { cn } from "@/lib/utils";

const workspaceWindows = [
  {
    id: "code",
    label: "CODE",
    icon: Code2,
    items: ["Java", "JavaScript", "PHP", "HTML", "CSS"],
    target: "skills",
  },
  { id: "database", label: "DATABASE", icon: Database, items: ["SQL", "DBMS"], target: "skills" },
  { id: "analytics", label: "ANALYTICS", icon: BarChart3, items: ["Power BI"], target: "skills" },
  {
    id: "projects",
    label: "PROJECTS",
    icon: FolderOpen,
    items: ["Newspaper Advertising System", "Java Learning Portal"],
    target: "projects",
  },
] as const;

export function Hero() {
  const reduce = useReducedMotion();
  const [stage, setStage] = useState(reduce ? 3 : 0); // 0 desk, 1 open, 2 boot, 3 ready
  const [lines, setLines] = useState(reduce ? bootLines.length : 0);
  const [word, setWord] = useState(0);
  const [workspace, setWorkspace] = useState(false);
  const workspaceRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (reduce) return;
    const t1 = setTimeout(() => setStage(1), 500);
    const t2 = setTimeout(() => setStage(2), 1500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [reduce]);

  useEffect(() => {
    if (stage !== 2) return;
    const int = setInterval(() => {
      setLines((n) => {
        if (n >= bootLines.length) {
          clearInterval(int);
          setStage(3);
          return n;
        }
        return n + 1;
      });
    }, 320);
    return () => clearInterval(int);
  }, [stage]);

  useEffect(() => {
    if (reduce) return;
    const int = setInterval(() => setWord((w) => (w + 1) % rotatingWords.length), 2000);
    return () => clearInterval(int);
  }, [reduce]);

  const openWorkspace = () => {
    setWorkspace(true);
    requestAnimationFrame(() =>
      workspaceRef.current?.scrollIntoView({
        behavior: reduce ? "auto" : "smooth",
        block: "center",
      }),
    );
  };

  return (
    <section id="home" aria-labelledby="hero-heading" className="relative px-5 pt-28 pb-16 sm:px-8">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <p className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-[10px] tracking-[0.22em]">
            MCA STUDENT • HOLY CROSS COLLEGE • {profile.period}
          </p>
          <h1
            id="hero-heading"
            className="mt-6 text-4xl leading-[1.05] font-extrabold sm:text-5xl lg:text-6xl"
          >
            <span className="gradient-text">LEARN. BUILD.</span>
            <br />
            <span className="gradient-text">DESIGN. CONTRIBUTE.</span>
          </h1>
          <p className="text-foreground/85 mt-6 max-w-xl text-base leading-relaxed sm:text-lg">
            I&apos;m {profile.name} — an MCA student exploring web development, backend technologies,
            UI design, research, and creative digital experiences.
          </p>
          <p className="text-muted-foreground mt-3 max-w-xl text-sm leading-relaxed sm:text-base">
            I enjoy turning ideas into practical digital experiences while continuously learning,
            experimenting, and contributing.
          </p>

          <p className="mt-6 font-mono text-xs tracking-[0.24em] sm:text-sm" aria-live="polite">
            <span className="text-muted-foreground">CURRENTLY EXPLORING → </span>
            <span className="text-primary font-bold">{rotatingWords[word]}</span>
            <span className="animate-caret text-primary">_</span>
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <PrimaryButton onClick={() => scrollToId("education")}>
              EXPLORE MY JOURNEY <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </PrimaryButton>
            <OutlineButton onClick={() => scrollToId("projects")}>
              VIEW MY PROJECTS <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </OutlineButton>
            <OutlineButton onClick={() => scrollToId("contact")}>
              LET&apos;S CONNECT <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </OutlineButton>
            <OutlineButton onClick={openWorkspace} aria-expanded={workspace}>
              <Laptop className="h-4 w-4" aria-hidden="true" /> OPEN WORKSPACE
            </OutlineButton>
          </div>
        </div>

        <div className="scene relative">
          <Desk stage={stage} lines={lines} />
        </div>
      </div>

      {/* Interactive laptop workspace */}
      <div ref={workspaceRef} className="mx-auto mt-14 max-w-6xl">
        {workspace ? (
          <div className="glass animate-scale-in rounded-3xl p-5 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold sm:text-2xl">MY WORKSPACE</h2>
                <p className="text-muted-foreground mt-1 text-sm">
                  Four windows from my actual technical profile — open one to jump to that section.
                </p>
              </div>
              <OutlineButton onClick={() => setWorkspace(false)}>CLOSE WORKSPACE</OutlineButton>
            </div>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {workspaceWindows.map((w) => (
                <li key={w.id}>
                  <button
                    onClick={() => scrollToId(w.target)}
                    data-cursor="OPEN"
                    className="glass lift grad-border h-full w-full rounded-2xl p-5 text-left"
                  >
                    <span
                      className="text-primary-foreground inline-flex h-10 w-10 items-center justify-center rounded-xl"
                      style={{ backgroundImage: "var(--gradient-hero)" }}
                    >
                      <w.icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="mt-4 block font-mono text-xs tracking-[0.2em]">{w.label}</span>
                    <span className="text-muted-foreground mt-2 block space-y-1 text-sm">
                      {w.items.map((i) => (
                        <span key={i} className="block">
                          {i}
                        </span>
                      ))}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function Desk({ stage, lines }: { stage: number; lines: number }) {
  const open = stage >= 1;
  return (
    <div className="relative mx-auto w-full max-w-lg">
      {/* desk glow */}
      <div
        className={cn(
          "absolute -inset-8 rounded-full opacity-0 blur-3xl transition-opacity duration-1000",
          open && "opacity-70",
        )}
        style={{ background: "radial-gradient(circle, var(--lavender), transparent 70%)" }}
        aria-hidden="true"
      />

      <div
        className="relative transition-transform duration-1000"
        style={{ transform: open ? "translateY(0)" : "translateY(18px)" }}
      >
        {/* screen */}
        <div
          className="origin-bottom transition-transform duration-1000 ease-out"
          style={{
            transform: `rotateX(${open ? -4 : -78}deg)`,
            transformStyle: "preserve-3d",
          }}
        >
          <div className="glass overflow-hidden rounded-t-2xl border-2 p-2 shadow-[var(--shadow-lift)]">
            <div
              className="relative aspect-16/10 overflow-hidden rounded-xl p-4 font-mono text-[10px] leading-relaxed sm:text-xs"
              style={{ background: "linear-gradient(160deg, oklch(0.22 0.05 285), oklch(0.3 0.08 270))" }}
            >
              <div
                className={cn(
                  "absolute inset-0 opacity-0 transition-opacity duration-700",
                  open && "opacity-100",
                )}
                style={{
                  background:
                    "radial-gradient(120% 80% at 50% 0%, oklch(0.7 0.15 292 / 0.35), transparent 65%)",
                }}
                aria-hidden="true"
              />
              <div className="relative">
                <div className="mb-3 flex gap-1.5" aria-hidden="true">
                  <span className="h-2 w-2 rounded-full bg-[var(--blush)]" />
                  <span className="h-2 w-2 rounded-full bg-[var(--peach)]" />
                  <span className="h-2 w-2 rounded-full bg-[var(--mint)]" />
                </div>
                {stage < 3 ? (
                  <div className="text-[oklch(0.9_0.06_168)]">
                    {bootLines.slice(0, lines).map((l) => (
                      <p key={l}>{l}</p>
                    ))}
                    <span className="animate-caret">_</span>
                  </div>
                ) : (
                  <div className="animate-fade-in">
                    <p className="text-[oklch(0.9_0.06_168)]">
                      {bootLines[bootLines.length - 1]}
                    </p>
                    <p className="font-display mt-5 text-lg font-extrabold tracking-[0.14em] text-white sm:text-2xl">
                      SURIYA PRABHA
                    </p>
                    <p className="mt-2 text-[10px] tracking-[0.2em] text-[oklch(0.85_0.06_300)] sm:text-xs">
                      MCA • WEB DEVELOPMENT • DESIGN • RESEARCH
                    </p>
                    <div className="mt-4 grid grid-cols-3 gap-2 text-[9px] text-white/75">
                      {["EDUCATION", "SKILLS", "PROJECTS", "RESEARCH", "EXPERIENCE", "AWARDS"].map(
                        (t) => (
                          <span
                            key={t}
                            className="rounded-md border border-white/15 bg-white/10 px-2 py-1 text-center"
                          >
                            {t}
                          </span>
                        ),
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* base */}
        <div
          className="h-3 rounded-b-xl border-x-2 border-b-2 bg-[linear-gradient(180deg,oklch(0.95_0.02_290),oklch(0.88_0.03_290))]"
          aria-hidden="true"
        />
        <div
          className="mx-auto h-2 w-2/3 rounded-b-full bg-[oklch(0.85_0.03_290)]"
          aria-hidden="true"
        />
      </div>

      <p className="text-muted-foreground mt-6 text-center font-mono text-[10px] tracking-[0.2em]">
        I LEARN → I BUILD → I DESIGN → I RESEARCH → I CONTRIBUTE → I KEEP GROWING
      </p>
    </div>
  );
}
