import { motion } from "framer-motion";
import survivalKnife from "@/assets/giveaway-survival-knife.png";
import ssg08 from "@/assets/giveaway-ssg08.png";
import m4a1s from "@/assets/giveaway-m4a1s.png";
import paracord from "@/assets/giveaway-paracord.png";

interface Giveaway {
  title: string;
  category: string;
  wear: string;
  image: string;
}

const giveaways: Giveaway[] = [
  {
    title: "Survival Knife | Tiger Tooth",
    category: "Knife",
    wear: "Factory New",
    image: survivalKnife,
  },
  {
    title: "SSG 08 | Dragonfire",
    category: "Sniper rifle",
    wear: "Factory New",
    image: ssg08,
  },
  {
    title: "M4A1-S | Printstream",
    category: "Rifle",
    wear: "Battle-Scarred",
    image: m4a1s,
  },
  {
    title: "Paracord Knife | Boreal Forest",
    category: "Knife",
    wear: "Field-Tested",
    image: paracord,
  },
];

function GiveawayCard({ g, i }: { g: Giveaway; i: number }) {
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
          {g.category}
        </span>
        <span className="rounded-full border border-border px-2.5 py-0.5 text-[10px] font-medium text-muted-foreground">
          Live
        </span>
      </div>

      <div className="relative mt-5 flex h-36 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-b from-foreground/[0.04] to-transparent">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-60 blur-2xl transition group-hover:opacity-90"
          style={{
            background:
              "radial-gradient(ellipse at center, color-mix(in oklab, var(--primary) 35%, transparent), transparent 65%)",
          }}
        />
        <img
          src={g.image}
          alt={g.title}
          loading="lazy"
          className="relative z-10 h-full w-full object-contain p-3 drop-shadow-[0_8px_18px_rgba(0,0,0,0.55)] transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <h3 className="mt-5 text-lg font-semibold leading-snug tracking-tight">
        {g.title}
      </h3>

      <div className="mt-5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Wear
        </p>
        <p className="mt-1 text-sm font-medium text-foreground/90">{g.wear}</p>
      </div>

      <button className="mt-6 rounded-full bg-foreground/5 py-2.5 text-xs font-semibold text-foreground transition group-hover:bg-primary group-hover:text-primary-foreground">
        Enter giveaway
      </button>
    </motion.div>
  );
}

export function GiveawaySection() {
  return (
    <section id="giveaways" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="mb-10 flex items-end justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
            Giveaways
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Active drops
          </h2>
        </div>
        <p className="hidden max-w-xs text-sm text-muted-foreground sm:block">
          Free CS2 skins and knives, given away across livestreams and socials.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {giveaways.map((g, i) => (
          <GiveawayCard key={g.title} g={g} i={i} />
        ))}
      </div>
    </section>
  );
}
