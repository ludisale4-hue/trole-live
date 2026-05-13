import { motion } from "framer-motion";

const socials = [
  { name: "YouTube", handle: "@Trole", url: "https://www.youtube.com/@Trole" },
  { name: "Discord", handle: "Join server", url: "https://discord.gg/" },
  { name: "TikTok", handle: "@trole", url: "https://www.tiktok.com/@trole" },
  { name: "Instagram", handle: "@trole", url: "https://instagram.com/trole" },
];

export function SocialSection() {
  return (
    <section id="socials" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="mb-10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
          Socials
        </p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          Stay connected
        </h2>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {socials.map((s, i) => (
          <motion.a
            key={s.name}
            href={s.url}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className="card-premium group flex items-center justify-between p-5"
          >
            <div>
              <p className="text-sm font-semibold tracking-tight">{s.name}</p>
              <p className="text-xs text-muted-foreground">{s.handle}</p>
            </div>
            <span className="text-primary transition-transform duration-300 group-hover:translate-x-1.5">→</span>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
