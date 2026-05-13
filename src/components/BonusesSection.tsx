import { motion } from "framer-motion";
import { useState } from "react";
import { Check, Copy } from "lucide-react";
import clashggImg from "@/assets/bonus-clashgg.webp";
import bsiteImg from "@/assets/bonus-bsite.png";

interface Bonus {
  name: string;
  image: string;
  code: string;
  perks: string[];
}

const bonuses: Bonus[] = [
  {
    name: "Clash.gg",
    image: clashggImg,
    code: "TROLE",
    perks: ["Free case battles", "3 free cases", "500 coins leaderboard"],
  },
  {
    name: "B.SITE",
    image: bsiteImg,
    code: "TROLE",
    perks: [],
  },
];

function BonusCard({ b, i }: { b: Bonus; i: number }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(b.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // ignore
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: i * 0.08 }}
      className="card-premium group relative flex flex-col p-6"
    >
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
          Partner
        </span>
        <span className="rounded-full border border-border px-2.5 py-0.5 text-[10px] font-medium text-muted-foreground">
          Bonus
        </span>
      </div>

      <h3 className="mt-4 text-center text-xl font-bold tracking-tight">{b.name}</h3>

      <div className="relative mt-4 flex h-36 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-b from-foreground/[0.04] to-transparent">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-60 blur-2xl transition group-hover:opacity-90"
          style={{
            background:
              "radial-gradient(ellipse at center, color-mix(in oklab, var(--primary) 35%, transparent), transparent 65%)",
          }}
        />
        <img
          src={b.image}
          alt={b.name}
          loading="lazy"
          className="relative z-10 max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <button
        onClick={handleCopy}
        aria-label={`Copy code ${b.code}`}
        className="mt-5 flex items-center justify-center gap-2 rounded-xl border border-primary/40 bg-primary/10 py-3 text-sm font-bold tracking-wider text-primary transition hover:bg-primary hover:text-primary-foreground"
      >
        <span>CODE: {b.code}</span>
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        {copied && <span className="text-[10px] font-semibold uppercase">Copied</span>}
      </button>

      <ul className="mt-5 space-y-2">
        {b.perks.map((p) => (
          <li key={p} className="flex items-start gap-2 text-sm text-foreground/90">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            <span>{p}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export function BonusesSection() {
  return (
    <section id="bonuses" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="mb-10 flex items-end justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
            Bonuses
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Partner codes
          </h2>
        </div>
        <p className="hidden max-w-xs text-sm text-muted-foreground sm:block">
          Use code TROLE for exclusive bonuses on partnered platforms.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 max-w-3xl mx-auto">
        {bonuses.map((b, i) => (
          <BonusCard key={b.name} b={b} i={i} />
        ))}
      </div>
    </section>
  );
}
