import { useState } from "react";
import {
  BookOpen,
  Hammer,
  Palette,
  Microscope,
  HeartHandshake,
  RotateCcw,
  type LucideIcon,
} from "lucide-react";
import { profile, values } from "@/data/profile";
import profileAsset from "@/assets/profile.jpg.asset.json";
import { GlassCard, Section, OutlineButton } from "./primitives";
import { cn } from "@/lib/utils";
import { useTilt } from "@/lib/tilt";

const icons: Record<string, LucideIcon> = {
  learn: BookOpen,
  build: Hammer,
  design: Palette,
  research: Microscope,
  contribute: HeartHandshake,
};

export function About() {
  const [flipped, setFlipped] = useState(false);
  const tilt = useTilt<HTMLDivElement>(6);

  return (
    <Section
      id="about"
      eyebrow="Behind the code"
      title="MORE THAN JUST CODE"
      intro="I am an MCA student at Holy Cross College with a strong interest in web development, backend development, UI design, programming, databases, data analytics, and research."
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
        {/* 3D flip profile card */}
        <div
          className="scene"
          ref={tilt.ref}
          style={tilt.style}
          onPointerMove={tilt.handlers.onPointerMove}
          onPointerLeave={tilt.handlers.onPointerLeave}
        >
          <button
            onClick={() => setFlipped((v) => !v)}
            aria-pressed={flipped}
            data-cursor="FLIP"
            className="relative block h-72 w-full rounded-3xl text-left sm:h-80"
          >
            <div
              className="relative h-full w-full transition-transform duration-700"
              style={{
                transformStyle: "preserve-3d",
                transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
              }}
            >
              <div
                className="glass absolute inset-0 flex flex-col overflow-hidden rounded-3xl"
                style={{ backfaceVisibility: "hidden" }}
              >
                <div className="relative h-28 w-full overflow-hidden sm:h-32">
                  <img
                    src={profileAsset.url}
                    alt={profile.name}
                    className="h-full w-full object-cover"
                    style={{ objectPosition: "center 26%" }}
                    loading="lazy"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to bottom, transparent 55%, color-mix(in oklab, var(--card) 94%, transparent))",
                    }}
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <p className="font-display text-2xl font-extrabold sm:text-3xl">{profile.name}</p>
                    <p className="text-muted-foreground mt-2 text-sm">
                      {profile.role} • {profile.college}
                    </p>
                    <p className="mt-4 font-mono text-xs tracking-[0.16em]">
                      {profile.period} • CGPA {profile.cgpa}
                    </p>
                  </div>
                  <span className="text-muted-foreground inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.2em]">
                    <RotateCcw className="h-3 w-3" aria-hidden="true" /> CLICK TO FLIP
                  </span>
                </div>
              </div>
              <div
                className="absolute inset-0 flex flex-col justify-center gap-3 rounded-3xl p-6 text-white"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                  backgroundImage: "var(--gradient-hero)",
                }}
              >
                <p className="font-mono text-[10px] tracking-[0.24em] opacity-80">
                  WHAT I FOCUS ON
                </p>
                <p className="font-display text-lg leading-snug font-bold sm:text-xl">
                  Web Development • Backend Development • UI Design • Technology &amp; Research
                </p>
                <p className="text-sm leading-relaxed opacity-90">
                  Aspiring developer, web &amp; backend development enthusiast, UI / web design
                  enthusiast, technology learner and research contributor.
                </p>
              </div>
            </div>
          </button>
        </div>

        <div className="space-y-4">
          <GlassCard className="p-6">
            <h3 className="font-mono text-xs tracking-[0.2em] text-primary">MY JOURNEY SO FAR</h3>
            <p className="mt-3 text-sm leading-relaxed sm:text-base">
              My journey includes academic learning, internships, practical projects, technical
              certifications, workshops, research participation, and leadership as Secretary of the
              Research Club at Holy Cross College.
            </p>
          </GlassCard>
          <GlassCard className="p-6">
            <h3 className="font-mono text-xs tracking-[0.2em] text-primary">MY MINDSET</h3>
            <p className="mt-3 text-sm leading-relaxed sm:text-base">
              I am willing to learn, contribute, collaborate, and continuously improve.
            </p>
          </GlassCard>
          <div className="flex flex-wrap gap-3">
            <OutlineButton onClick={() => document.getElementById("values")?.scrollIntoView({ block: "center" })}>
              SEE WHAT DRIVES ME
            </OutlineButton>
          </div>
        </div>
      </div>

      <ul id="values" className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {values.map((v) => {
          const Icon = icons[v.key]!;
          return (
            <li key={v.key} className="scene">
              <GlassCard
                as="article"
                className={cn(
                  "group h-full p-5 transition-transform duration-500",
                  "hover:[transform:rotateX(6deg)_rotateY(-6deg)_translateY(-6px)]",
                )}
              >
                <span
                  className="text-primary-foreground inline-flex h-10 w-10 items-center justify-center rounded-xl transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-6"
                  style={{ backgroundImage: "var(--gradient-hero)" }}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-mono text-xs tracking-[0.2em]">{v.title}</h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{v.text}</p>
              </GlassCard>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
